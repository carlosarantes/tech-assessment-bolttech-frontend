<template>
    <div>
        <div class="flex mb-4 items-center" v-tooltip.bottom-start="tooltipMessage">
            <label class="inline-flex items-center mt-3">
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

            <button 
                v-if="!task.finished_at"
                @click="removeTask"
                class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" height="18" 
                    viewBox="0 0 24 24">
                    <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
                </svg>
            </button>
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
        }
    }
}
</script>