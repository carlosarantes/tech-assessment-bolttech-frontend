import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

import moment from 'moment';

Vue.use(Vuex);
 
export default new Vuex.Store({
    state: {
      newProject : {
        name : null,
        user_id : null
      },
      isLoading : false,
      projectCreationErrors : [],
      newTask : {
        description : null,
        project_id : null,
        finished_at : null
      },
      projects: [],
      userData : {
        id : null,
        name : null,
        email : null
      },
      auth : {
          email: "bryan.watson@gmail.com",
          password: "10203040",
          jwt: null,
          logged : false,
          authErros : [ ]
      },
      registration : {
          user : {
            name : null,
            email : null,
            password : null
          },
          errors : []
      }
    },
    getters:{
        isLoading(state) {
            return state.isLoading;
        },
        authEmail(state) {
            return state.auth.email;
        },
        authPassword(state) {
            return state.auth.password;
        },
        authErrors(state){
            return state.auth.authErros;
        },
        registrationErrors(state){
            return state.registration.errors;
        },
        projectCreationErrors(state) {
            return state.projectCreationErrors;
        },
        userData(state) {
            return state.userData;
        },
        userIsLogged(state) {
            return state.auth.logged;
        },
        projects(state) {
            return state.projects;
        }
    },
    actions:{
        async login({ state, commit }) {
            try {
                commit('setIsLoading', true);

                const user = {
                    email : state.auth.email,
                    password : state.auth.password
                };

                const result = await axios.post('http://localhost:3338/api/v1/users/login', user);
                const data = result.data;

                if (data.user && data.token) {
                    commit('setUserData', data.user);
                    commit('setToken', data.token);
                    commit('setLogged', true);
                    commit('setAuthErrors', []);

                    localStorage.setItem('jwt', data.token);
                    localStorage.setItem('userData', JSON.stringify(data.user));
                } else {
                    commit('setToken', null);
                    commit('setLogged', false);
                }

                commit('setIsLoading', false);
            } catch (e) {
                const data = e.response.data; 
                let errors = []; 
                if(data.message) {
                    errors.push(data.message);
                }
                if(data.errors) { 
                    errors = errors.concat(data.errors);
                }

                commit('setAuthErrors', errors);
                commit('setIsLoading', false);
            }
        },
        async register({ state, commit }) {
            try {
                commit('setIsLoading', true);

                const result = await axios.post('http://localhost:3338/api/v1/users/registration', state.registration.user);
                const data = result.data;
                
                if (data.user && data.token) {
                    commit('setUserData', data.user);
                    commit('setToken', data.token);
                    commit('setLogged', true);
                    commit('setRegistrationErrors', []);

                    localStorage.setItem('jwt', data.token);
                    localStorage.setItem('userData', JSON.stringify(data.user));
                } else {
                    commit('setToken', null);
                    commit('setLogged', false);
                }
                commit('setIsLoading', false);
            } catch (e) {
                const data = e.response.data; 
                let errors = []; 
                if(data.message) {
                    errors.push(data.message);
                }
                if(data.errors) { 
                    errors = errors.concat(data.errors);
                }

                commit('setRegistrationErrors', errors);
                commit('setIsLoading', false);
            }
        },
        async createProject({ state, commit }) {
            try {
                commit('setIsLoading', true);

                const jwt = state.auth.jwt || "";
                const user = state.userData;
                const project = state.newProject; 

                project.user_id = user.id || null;

                const result = await axios.post('http://localhost:3338/api/v1/projects', project, {
                    headers : {
                        'Authorization' : "Bearer " + jwt
                    }
                });

                const data = result.data; 
                if (data.project) {
                    commit('addProject', data.project);
                }

                commit('setProjectCreationErrors', []);
                Vue.$vToastify.success("Project successfully created.", "Yeaaah!");
                commit('setIsLoading', false);
            } catch (e) {
                const data = e.response.data; 
                let errors = []; 
                if(data.message) {
                    errors.push(data.message);
                }
                if(data.errors) { 
                    errors = errors.concat(data.errors);
                }
                
                commit('setProjectCreationErrors', errors);
                Vue.$vToastify.error("It was not possible to create the project.", "Oops!"); 
                commit('setIsLoading', false);
            }
        },
        async fetchUserProjects({ state, commit }) {
            try {
                commit('setIsLoading', true);

                const jwt = state.auth.jwt || "";
                const user = state.userData;

                if (!user.id) {
                    throw new Error("You are not logged");
                }

                const url = 'http://localhost:3338/api/v1/users/' + user.id + '/projects';
                const result = await axios.get(url, {
                    headers : {
                        'Authorization' : "Bearer " + jwt
                    }
                });

                const data = result.data;
                if (data.projects) {
                    commit('setProjects', data.projects);
                }
                commit('setIsLoading', false);
            } catch(e) {
                console.log(e);
                Vue.$vToastify.error("It was not possible to get your projects.", "Oops!"); 
                commit('setIsLoading', false);
            }
        },
        async addTask({ state, commit }, payload){
            try {
                commit('setIsLoading', true);

                const jwt = state.auth.jwt || "";
                const project = payload.project || null;

                const task = {
                    description: payload.newTaskDescription,
                    project_id: project.id
                };

                const result = await axios.post('http://localhost:3338/api/v1/tasks', task, {
                    headers : {
                        'Authorization' : "Bearer " + jwt
                    }
                });

                const data = result.data;
                if (data.task) {
                    commit('addTaskToProject', { project, task : data.task });
                    Vue.$vToastify.success("Task has been successfully added.", "Nice :)");
                }

                commit('setIsLoading', false);
            } catch (e) {
                console.log(e);
                Vue.$vToastify.error("It was not possible to add a task to the project.", "Oops!"); 
                commit('setIsLoading', false);
            }
        },
        async removeTask({ state, commit }, payload) {
            try {
                commit('setIsLoading', true);

                const { task } = payload;
                const jwt = state.auth.jwt || "";
              
                const url = 'http://localhost:3338/api/v1/tasks/' + task.id;
                await axios.delete(url, {
                    headers : {
                        'Authorization' : "Bearer " + jwt
                    }
                });

                commit('removeTask', task);
                Vue.$vToastify.success("Task has been successfully removed.", "Uoou..");
                commit('setIsLoading', false);
            } catch (e) {
                console.log(e);
                Vue.$vToastify.error("It was not possible to remove the task.", "Oops!"); 
                commit('setIsLoading', false);
            }
        },
        async finishTask({ state, commit }, payload) {
            try {
                commit('setIsLoading', true);

                const { task } = payload;
                const jwt = state.auth.jwt || "";

                const url = 'http://localhost:3338/api/v1/tasks/' + task.id + '/finish';
                await axios.patch(url, null, {
                    headers : {
                        'Authorization' : "Bearer " + jwt
                    }
                });

                commit('finishTask', task);
                Vue.$vToastify.success("Nice, it looks like you finished the task.", "Congrats :)");
                commit('setIsLoading', false);
            } catch (e) {
                console.log(e);
                Vue.$vToastify.error("It was not possible to finish the task.", "Oops!"); 
                commit('setIsLoading', false);
            }
        },
        async deleteProject({ state, commit }, payload) {
            try {
                commit('setIsLoading', true);

                const { project } = payload;
                const jwt = state.auth.jwt || "";

                const url = 'http://localhost:3338/api/v1/projects/' + project.id;
                await axios.delete(url, {
                    headers : {
                        'Authorization' : "Bearer " + jwt
                    }
                });

                commit('deleteProject', project);
                Vue.$vToastify.success("Project successfully deleted.", "Goodbye ...");

                commit('setIsLoading', false);
            } catch (e) {
                console.log(e);
                Vue.$vToastify.error("It was not possible to delete the project.", "Oops!"); 
                commit('setIsLoading', false);
            }
        },
        async updateProject({ state, commit }, payload) {
            try {
                commit('setIsLoading', true);
                const jwt = state.auth.jwt || "";

                const project = {
                    id : payload.project.id,
                    name : payload.changes.name,
                };

                const url = 'http://localhost:3338/api/v1/projects/' + project.id;
                await axios.put(url, project, {
                    headers : {
                        'Authorization' : "Bearer " + jwt
                    }
                });

                commit('setIsLoading', false);
                commit('updateProjectName', project);
                Vue.$vToastify.success("The project was updated successfully.", "Yeaaah!"); 
            } catch (e) {
                console.log(e);
                Vue.$vToastify.error("It was not possible to update the project.", "Oops!"); 
                commit('setIsLoading', false);
            }
        },
        async updateTask({ state, commit }, payload) {
            try {
                commit('setIsLoading', true);
                const jwt = state.auth.jwt || "";

                const task = {
                    id : payload.task.id,
                    description : payload.changes.description,
                };

                const url = 'http://localhost:3338/api/v1/tasks/' + task.id;
                await axios.put(url, task, {
                    headers : {
                       'Authorization' : "Bearer " + jwt
                    }
                });

                commit('setIsLoading', false);
                Vue.$vToastify.success("The task was updated successfully.", "Yeaaah!"); 
            } catch (e) {
                console.log(e);
                Vue.$vToastify.error("It was not possible to update the task.", "Oops!"); 
                commit('setIsLoading', false);
            }
        }
    },
    mutations: {
        setAuthEmail(state, email) {
            state.auth.email = email;
        },
        setAuthPassword(state, password) {
            state.auth.password = password;
        },
        setRegistrationName(state, name) {
            state.registration.user.name = name;
        },
        setRegistrationEmail(state, email) {
            state.registration.user.email = email;
        },
        setRegistrationPassword(state, password) {
            state.registration.user.password = password;
        },
        setProjectCreationErrors(state, projectCreationErrors) {
            state.projectCreationErrors = projectCreationErrors;
        },
        setToken(state, token) {
            state.auth.jwt = token;
        },
        setLogged(state, logged) {
            state.auth.logged = logged;
        },
        setAuthErrors(state, errors) {
            state.auth.authErros = errors;
        },
        setRegistrationErrors(state, errors) {
            state.registration.errors = errors;
        },
        setUserData(state, user) {
            state.userData.id = user.id;
            state.userData.name = user.name;
            state.userData.email = user.email;
        },
        setNewProjectName(state, name) {
            state.newProject.name = name;
        },
        addProject(state, project) {
            state.projects.push(project);
        },
        setProjects(state, projects) {
            state.projects = projects;
        },
        addTaskToProject(state, payload) {
            const { project, task } = payload;
            const index = state.projects.findIndex(p => {
                return p.id == project.id;
            });

            if (index >= 0) {
                if(!state.projects[index].tasks || !Array.isArray(state.projects[index].tasks)){
                    state.projects[index].tasks = [];
                }

                state.projects[index].tasks.push(task);
            }
        },
        removeTask(state, task) {
            const { project_id } = task;

            const projectIndex = state.projects.findIndex(p => {
                return p.id == project_id;
            });

            if (projectIndex >= 0) {
                const taskIndex = state.projects[projectIndex].tasks.findIndex(t => {
                    return t.id == task.id;
                });
                
                if (taskIndex >= 0) {
                    state.projects[projectIndex].tasks.splice(taskIndex, 1);
                }
            }
        },
        finishTask(state, task) {
            const { project_id } = task;

            const projectIndex = state.projects.findIndex(p => {
                return p.id == project_id;
            });

            if (projectIndex >= 0) {
                const taskIndex = state.projects[projectIndex].tasks.findIndex(t => {
                    return t.id == task.id;
                });
                
                if (taskIndex >= 0) {
                    state.projects[projectIndex].tasks[taskIndex].finished_at = moment().format();
                }
            }
        },
        deleteProject(state, project) {
            const projectIndex = state.projects.findIndex(p => {
                return p.id == project.id;
            });

            if (projectIndex >= 0) {
                state.projects.splice(projectIndex, 1);
            }
        },
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading;
        },
        updateProjectName(state, project) {
            const { id, name } = project;

            const projectIndex = state.projects.findIndex(p => {
                return p.id == id;
            });

            if (projectIndex >= 0) {
                state.projects[projectIndex].name = name;
            }
        }
    }
});