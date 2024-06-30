<template>

    <Dialog 
        v-model:visible="visible"
        :header="title"
        modal
        class="w-full max-w-[600px]">
            <slot />
    </Dialog>

</template>

<script setup lang="ts">


import { shallowRef } from 'vue'
import Dialog from 'primevue/dialog'


const visible = shallowRef(false)


defineProps<{
    title: string
}>()


defineExpose({
    closeModal,
    showModal,
})

function closeModal() {
    visible.value = false
}


function showModal() {
    visible.value = true
}

</script>
