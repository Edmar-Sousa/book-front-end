<template>

    <div class="w-full">
        <label 
            for=""
            class="text-gray-200">
                {{ label }}
        </label>

        <textarea
            class="w-full min-h-[200px] rounded-lg mt-3 border border-[#3f3f46] p-4 focus:outline-none focus:ring focus:ring-[#34d399] bg-[#09090b]"></textarea>
    </div>


</template>


<script setup lang="ts">



defineProps<{
    label: string
}>()

</script>
