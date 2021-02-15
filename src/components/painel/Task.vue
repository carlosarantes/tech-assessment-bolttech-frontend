<template>
    <div>
        <div class="flex mb-4 items-center" v-tooltip.bottom-start="tooltipMessage">
            <label class="inline-flex items-center mt-3 flex-auto ">
                <input 
                    @dblclick="setTaskEditionMode"
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


            <div v-if="!task.finished_at" class="flex-end ">
                <button 
                    type="button"
                
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
    </div>
</template>

<script>
import moment from "moment";

export default {
    props: [ 'task' ],
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
        setTaskEditionMode() {
            alert('aaaaaaaaaaa')
        }
    }
}
</script>