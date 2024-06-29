<template>

    <div class="w-full">
        <label 
            for=""
            class="text-gray-200">
                {{ label }}
        </label>

        <input
            :type="type"
            class="w-full h-10 rounded-lg mt-3 border border-[#3f3f46] px-4 focus:outline-none focus:ring focus:ring-[#34d399]"
    </div>

</template>

<script setup lang="ts">


defineProps<{
    label: string,
    type: 'text' | 'number',
}>()


</script>
