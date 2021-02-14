<template>
    <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div class="mb-4">
            <h1 class="text-grey-darkest">{{ project.name }}</h1>
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
            <Task v-for="task in project.tasks" :key="task.id" />
        </div>
    </div>
</template>

<script>
import Task from "./Task"

export default {
    props: [ 'project' ],
    data: () => {
        return {
            newTaskDescription : null
        }
    },
    components: {
        Task
    },
    methods : {
        addTask() {
            this.$store.dispatch('addTask', { newTaskDescription : this.newTaskDescription, project : this.project })
        }
    }
}
</script>