<template>
    <div class="bg-white rounded shadow p-4 m-2 w-full lg:w-3/3 lg:max-w-lg">
        <div class="mb-4">
            <div v-if="!editionMode">
                <h1 class="text-grey-darkest">
                    {{ project.name }}
                </h1>
                <div class="project-actions mt-3 flex">
                    <button 
                        type="button"
                        @click="toggleEditionMode"
                        class="inline-flex justify-center mr-1 flex-1 
                                py-2 px-4 border border-transparent 
                                shadow-sm text-sm font-medium rounded-md 
                                text-white bg-green-600 hover:bg-green-700
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                                    focus:ring-green-500">Update
                    </button>
                    <button 
                        type="button"
                        @click="deleteProject"
                        class="inline-flex justify-center flex-1 
                                py-2 px-4 border border-transparent 
                                shadow-sm text-sm font-medium rounded-md 
                                text-white bg-red-600 hover:bg-red-700
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                                    focus:ring-red-500">Delete
                    </button>                    
                </div>
            </div>
            <div v-if="editionMode">
                <input 
                    v-model="editionProjectName"
                    class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" 
                    placeholder="Project name">
                <div class="mt-4 flex">
                    <button 
                        type="button"   
                        @click="cancelProjectEdition"
                        class="inline-flex flex-1 mr-1 
                            justify-center py-2 px-4 border 
                            border-transparent shadow-sm text-sm 
                            font-medium rounded-md text-white 
                            bg-yellow-600 hover:bg-yellow-700 
                            focus:outline-none focus:ring-2 
                            focus:ring-offset-2 focus:ring-yellow-500">Cancel
                    </button>    
                    <button 
                        type="button"   
                        @click="saveProjectChanges"
                        class="inline-flex flex-1 
                            justify-center py-2 px-4 border 
                            border-transparent shadow-sm text-sm 
                            font-medium rounded-md text-white 
                            bg-blue-600 hover:bg-blue-700 
                            focus:outline-none focus:ring-2 
                            focus:ring-offset-2 focus:ring-blue-500">Save
                    </button>     
                </div>
            </div>
            <div class="flex mt-4">
                <input 
                    v-model="newTaskDescription"
                    class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" 
                    placeholder="Task name">

                    <button 
                        type="button"
                        @click="addTask"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add
                    </button>
            </div>
        </div>
        <div v-if="project.tasks && project.tasks.length > 0" >
            <Task v-for="task in project.tasks" :key="task.id" :task="task" />
        </div>
        <div v-else>
            <p class="text-base antialiased font-semibold text-opacity-70 text-gray-600 text-center">This project has no tasks yet... Create one with the form above.</p>
        </div>
    </div>
</template>

<script>
import Task from "./Task"

export default {
    props: [ 'project' ],
    data: () => {
        return {
            editionProjectName : null,
            newTaskDescription : null,
            editionMode : false
        }
    },
    components: {
        Task
    },
    methods : {
        addTask() {
            this.$store.dispatch('addTask', { newTaskDescription : this.newTaskDescription, project : this.project })
        },
        deleteProject() {
            this.$store.dispatch('deleteProject', { project : this.project });
        },
        toggleEditionMode() {
            this.editionMode = !this.editionMode;
            if (this.editionMode) {
                this.editionProjectName = this.project.name;
            } else {
                this.editionProjectName = null;
            }
        },
        cancelProjectEdition() {
            this.toggleEditionMode();
        },
        saveProjectChanges() {
            const changes = {
                name : this.editionProjectName
            };

            this.$store.dispatch('updateProject', { changes, project : this.project }).finally(() => {
                this.toggleEditionMode();
            });
        }
    }
}
</script>