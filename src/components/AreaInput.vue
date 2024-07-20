<template>

    <div class="w-full">
        <label 
            :for="id"
            class="text-gray-200">
                {{ label }}
        </label>

        <textarea
            :id="id"
            class="w-full min-h-[200px] rounded-lg mt-3 border border-[#3f3f46] p-4 focus:outline-none focus:ring focus:ring-[#34d399] bg-[#09090b]"
            v-model="model"></textarea>
    
        <small 
            v-if="hasError" 
            class="text-red-600 mt-1">
                {{ error }}
        </small>
    </div>


</template>


<script setup lang="ts">

import { computed } from 'vue'


const props = defineProps({
    id: {
        type: String,
        required: true,
    },

    label: {
        type: String,
        required: false,
    },

    error: {
        type: String,
        required: false,
    }
})


const model = defineModel()

const hasError = computed(() => props.error && props.error.length)

</script>
