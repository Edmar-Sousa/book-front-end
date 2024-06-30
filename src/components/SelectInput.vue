<template>

    <div class="w-full mt-3">
        <label 
            :for="id"
            class="text-gray-200">
                {{ label }}
        </label>    
    
        <multi-select 
            v-model="modal"
            v-bind="$attrs"
            :options="options"
            :id="id"
            class="w-full h-10 rounded-lg mt-3 border border-[#3f3f46] px-4 focus:outline-none focus:ring focus:ring-[#34d399]">
        </multi-select>
    </div>

</template>


<script setup lang="ts">

import MultiSelect from 'primevue/multiselect'


defineProps<{
    id: string,
    options: Array<Object>,
    label: string,
}>()


const modal = defineModel()


</script>
