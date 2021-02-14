import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);
 
export default new Vuex.Store({
    state: {
      newProject : {
        name : null,
        user_id : null
      },
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
      }
    },
    getters:{
        authEmail(state) {
            return state.auth.email;
        },
        authPassword(state) {
            return state.auth.password;
        },
        authErrors(state){
            return state.auth.authErros;
        },
        userData(state) {
            return state.userData;
        }
    },
    actions:{
        async login({ state, commit }) {
            try {
                const result = await axios.post('http://localhost:3338/api/v1/users/login', { 
                    email : state.auth.email,
                    password : state.auth.password
                });

                if (result.data.user) {
                    commit('setUserData', result.data.user);
                }
                
                if (result.data.token) {
                    commit('setToken', result.data.token);
                    commit('setLogged', true);
                    commit('setAuthErrors', []);
                } else {
                    commit('setToken', null);
                    commit('setLogged', false);
                }
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
            }
        },
        register() {

        }
    },
    mutations: {
        setAuthEmail(state, email) {
            state.auth.email = email;
        },
        setAuthPassword(state, password) {
            state.auth.password = password;
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
        setUserData(state, user) {
            state.userData.id = user.id;
            state.userData.name = user.name;
            state.userData.email = user.email;
        }
    }
});