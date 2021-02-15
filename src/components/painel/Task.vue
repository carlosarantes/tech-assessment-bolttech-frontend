<template>
    <div>
        <div class="flex mb-4 items-center" v-if="!editionMode" v-tooltip.bottom-start="tooltipMessage">
            <label class="inline-flex items-center mt-3 flex-auto ">
                <input 
                    type="checkbox" 
                    class="form-checkbox h-5 w-5 text-blue-600" 
                    :checked="task.finished_at"
                    :disabled="task.finished_at"
                    :readonly="task.finished_at"
                    @change="finishTask($event)">
                <span 
                    class="ml-2 text-gray-700"
                    :class="task.finished_at ? `line-through` : ''"
                    >{{ task.description }}</span>
            </label>
            <div v-if="!task.finished_at" class="flex-end">
                <button 
                    type="button"
                    @click="toggleTaskEditionMode"
                    class="inline-flex justify-center py-2 px-4 mr-1
                        border border-transparent shadow-sm text-sm 
                        font-medium rounded-md text-white bg-gray-600 
                        hover:bg-gray-700 focus:outline-none 
                        focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        <font-awesome-icon :icon="[ 'fas', 'edit' ]" size="lg" />
                </button>
                <button 
                    type="button"
                    @click="removeTask"
                    class="inline-flex justify-center py-2 px-4 
                        border border-transparent shadow-sm text-sm 
                        font-medium rounded-md text-white bg-red-600 
                        hover:bg-red-700 focus:outline-none 
                        focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <font-awesome-icon :icon="[ 'fas', 'trash-alt' ]" size="lg"  />
                </button>            
            </div>
        </div>

        <div v-if="editionMode" class="flex mb-4 ">
            <input 
                v-model="taskEditionDescription"
                class="flex-auto inline-flex shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" 
                placeholder="Task name">

            <div class="task-edition-actions flex-end"> 
                <button 
                    type="button"
                    @click="cancelEdition"
                    class="inline-flex justify-center py-2 px-4 mb-1
                        border border-transparent shadow-sm text-sm 
                        font-medium rounded-md text-white bg-yellow-600 
                        hover:bg-yellowv-700 focus:outline-none 
                        focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        <font-awesome-icon :icon="[ 'fas', 'arrow-left' ]" size="lg" />
                </button>
                <button 
                    type="button"
                    @click="saveTaskChanges"
                    class="inline-flex justify-center py-2 px-4 
                        border border-transparent shadow-sm text-sm 
                        font-medium rounded-md text-white bg-blue-600 
                        hover:bg-blue-700 focus:outline-none 
                        focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <font-awesome-icon :icon="[ 'fas', 'check-circle' ]" size="lg"  />
                </button> 
            </div>    
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
    props: [ 'task' ],
    data: () => {
        return {
            editionMode : false,
            taskEditionDescription : null
        }
    },
    computed : {
        tooltipMessage: function () { 
            let message = "<b>Started at: </b> " + moment(this.task.createdAt).format('DD/MM/YYYY H:m:ss');
            if(this.task.finished_at) {
                message += "<br><b>Finished at: </b> " + moment(this.task.finished_at).format('DD/MM/YYYY H:m:ss');
                message += "<br><b>Status: </b>Finished (You can't delete or update it anymore)";
            } else {
                message += "<br><b>Status: </b>Running";
            }

            return { content: message, html: true };
        }
    },
    methods : {
        removeTask() {
            this.$store.dispatch('removeTask', { task : this.task });
        },
        finishTask(e) {
            if (this.task.finished_at) {
                e.preventDefault();
                return false;
            }

            if (e.target.checked) {
                this.$store.dispatch('finishTask', { task : this.task });
            }
        },
        toggleTaskEditionMode() {
            this.editionMode = !this.editionMode;

            if (this.editionMode) {
                this.taskEditionDescription = this.task.description;
            } else {
                this.taskEditionDescription = null;
            }
        },
        cancelEdition() {
            this.toggleTaskEditionMode();
        },
        saveTaskChanges() {
            const changes = {
                description : this.taskEditionDescription
            };

            this.$store.dispatch('updateTask', { changes, task : this.task }).finally(() => {
                this.toggleTaskEditionMode();
            });
        }
    }
}
</script>