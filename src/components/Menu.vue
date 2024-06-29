<template>

    <Menubar 
        :model="items"
        class="w-min min-w-[300px] mx-auto">
    </Menubar>

</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'


const router = useRouter()


const items = [
    {
        label: 'Books',
        command: () => router.push('/books')
    },

    {
        label: 'Autores',
        command: () => router.push('/authors')
    },

    {
        label: 'Categorias',
        command: () => router.push('/categorys')
    },
];

</script>
