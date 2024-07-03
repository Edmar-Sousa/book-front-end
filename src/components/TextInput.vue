<template>

    <div class="w-full">
        <label 
            :for="id"
            class="text-gray-200">
                {{ label }}
        </label>

        <input
            :id="id"
            :type="type"
            class="w-full h-10 rounded-lg my-3 border border-[#3f3f46] px-4 focus:outline-none focus:ring focus:ring-[#34d399] bg-[#09090b]" />

        <small 
            v-if="hasError" 
            class="text-red-600 mt-1">
                {{ error }}
        </small>
    </div>

</template>

<script setup lang="ts">

import { computed } from 'vue'


const props = defineProps<{
    id: string,
    label?: string,
    type: string,
    error?: string
}>()


const hasError = computed(() => props.error && props.error.length)

</script>
