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

        <small 
            v-if="hasError" 
            class="text-red-600 mt-1">
                {{ error }}
        </small>
    </div>

</template>


<script setup lang="ts">

import { computed } from 'vue'
import MultiSelect from 'primevue/multiselect'


const props = defineProps({
    id: {
        type: String,
        required: true,
    },

    label: {
        type: String,
        required: false,
    },

    options: {
        required: true,
    },

    error: {
        type: String,
        required: false,
    }
})


const modal = defineModel()


const hasError = computed(() => props.error && props.error.length)

</script>
