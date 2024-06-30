<template>

    <div class="pt-10">
        <h1 class="text-3xl font-bold">Cadastro de Livros:</h1>
        
        <div class="mt-10 mb-5 text-right">
            <Button label="Adicionar"></Button>
        </div>

        <data-table 
            :value="products"
            striped-rows
            paginator
            :rows="5"
            :rows-per-page-options="[5, 10, 20, 50]">
                <column field="code" header="Id" />
                <column field="title" header="Title" />
                <column field="year" header="Ano" />
        </data-table>
    </div>

    <Model
        title="Cadastrar um novo livro">
            <form @submit.prevent>
                <text-input
                    id="title-book"
                    type="text"
                    label="Titulo do livro:" />
    
                <area-input
                    id="description"
                    label="Descrição:" />
    
                <select-input
                    id="author-select"
                    label="Selecione os autores:"
                    :options="authors"
                    option-label="name"
                    option-value="id" />
    
                <select-input
                    id="category-select"
                    label="Selecione as categorias:"
                    :options="categorias"
                    option-label="name" 
                    option-value="id"
                    v-model="form.category" />

                <div class="text-right mt-4">
                    <Button label="Cadastrar"></Button>
                </div>
            </form>
    </Model>
</template>

<script setup lang="ts">

import { ref } from 'vue'

import Model from '@/components/Modal.vue'
import TextInput from '@/components/TextInput.vue'
import AreaInput from '@/components/AreaInput.vue'
import SelectInput from '@/components/SelectInput.vue'

import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'


const products = [
    { code: '1231123312', title: 'O codificador limpo', year: '2023-06-23' },
    { code: '1231123312', title: 'O codificador limpo', year: '2023-06-23' },
    { code: '1231123312', title: 'O codificador limpo', year: '2023-06-23' },
    { code: '1231123312', title: 'O codificador limpo', year: '2023-06-23' },
    { code: '1231123312', title: 'O codificador limpo', year: '2023-06-23' },
]


const authors = [
    { id: 1, name: 'Robert C. Martin' },
    { id: 2, name: 'Robert C. Martin' },
    { id: 3, name: 'Robert C. Martin' },
    { id: 4, name: 'Robert C. Martin' },
    { id: 5, name: 'Robert C. Martin' },
]

const categorias = [
    { id: 1, name: 'Robert C. Martin' },
    { id: 2, name: 'Robert C. Martin' },
    { id: 3, name: 'Robert C. Martin' },
    { id: 4, name: 'Robert C. Martin' },
    { id: 5, name: 'Robert C. Martin' },
]


const form = ref({
    category: [],
})

</script>
