<template>
  <div>
    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Create a new Project</h3>
            <p class="mt-1 text-sm text-gray-600">
              Here you can create a new project, you just need to type its name and click, create button. 
              A card will be shown bellow, then you will be able to add tasks on it. o/
            </p>
            <p class="mt-1 text-sm text-gray-600">
              Let's work!
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-12 gap-12">
                  <div class="col-span-12 sm:col-span-12">
                    <label for="name" class="block text-sm font-medium text-gray-700">Project Name</label>
                    <input type="text" 
                     @input="setNewProjectName"
                      :value="name"
                      name="name" 
                      id="name" 
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                  </div>
                  <!-- <div class="col-span-6 sm:col-span-3">
                    <label for="country" class="block text-sm font-medium text-gray-700">Country / Region</label>
                    <select id="country" name="country" autocomplete="country" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div> -->
                </div>
              </div>
              <div class="px-4 py-5 bg-white sm:p-6" v-if="projectCreationErrors && projectCreationErrors.length > 0">
                <p class="text-red-600" v-for="(error, index) in projectCreationErrors" v-bind:key="index">- {{ error }}</p>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button 
                    type="button" 
                    @click="createProject"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Create Project
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
      computed: {
        ...mapGetters([
          'projectCreationErrors',
          'userIsLogged'
        ]),
        ...mapState({
          name: state => state.newProject.name,
        })
      },
      methods : {
        createProject() {
          this.$store.dispatch('createProject');
        },
        setNewProjectName (e) {
          this.$store.commit('setNewProjectName', e.target.value)
        },
      }
  }
</script>