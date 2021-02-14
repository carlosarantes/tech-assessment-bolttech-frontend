<template>
<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="project-name">
        Project name
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="project-name" type="text" placeholder="Project name">
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button">
        Create
      </button>
    </div>
</div>
</template>

<script>
export default {
    
}
</script>