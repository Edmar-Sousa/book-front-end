<template>

    <div class="pt-10">
        <h1 class="text-3xl font-bold">Cadastro de Livros:</h1>
        
        <div class="mt-10 mb-5 text-right">
            <Button 
                @click="handlerCreateBooks"
                label="Adicionar">
            </Button>
        </div>

        <template v-if="loading">
            <data-table 
                :value="loaddingSkeletonTable"
                striped-rows
                paginator
                :rows="5"
                :rows-per-page-options="[5, 10, 20, 50]">
                    <column field="id" header="Id">
                        <template #body>
                            <skeleton />
                        </template>
                    </column>

                    <column field="name" header="Title">
                        <template #body>
                            <skeleton />
                        </template>
                    </column>
                    
                    <column field="bio" header="Ano">
                        <template #body>
                            <skeleton />
                        </template>
                    </column>
            </data-table>
        </template>

        <template v-else>
            <data-table 
                :value="books"
                striped-rows
                paginator
                :rows="5"
                :rows-per-page-options="[5, 10, 20, 50]">
                    <column field="id" header="Id" />
                    <column field="title" header="Title" />
                    <column field="year" header="Ano" />
            </data-table>
        </template>

    </div>

    <Model
        ref="modalRef"
        title="Cadastrar um novo livro">

            <form @submit.prevent>
                <text-input
                    id="title-book"
                    type="text"
                    label="Titulo do livro:"
                    v-model="form.title"
                    :error="v$.title?.$errors[0]?.$message.toString" />
    
                <area-input
                    id="description"
                    label="Descrição:"
                    v-model="form.description"
                    :error="v$.description?.$errors[0]?.$message.toString" />
    
                <select-input
                    id="author-select"
                    label="Selecione os autores:"
                    :options="authors"
                    option-label="name"
                    option-value="id"
                    v-model="form.authors"
                    :error="v$.authors?.$errors[0]?.$message.toString" />
    
                <select-input
                    id="category-select"
                    label="Selecione as categorias:"
                    :options="categorias"
                    option-label="name" 
                    option-value="id"
                    v-model="form.categorys"
                    :error="v$.categorys?.$errors[0]?.$message.toString" />

                <div class="text-right mt-4">
                    <Button 
                        label="Cadastrar"
                        @click="handlerBookForm">
                    </Button>
                </div>
            </form>
    </Model>
</template>

<script setup lang="ts">

import { computed, ref } from 'vue'

import { helpers, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

import Model from '@/components/Modal.vue'
import TextInput from '@/components/TextInput.vue'
import AreaInput from '@/components/AreaInput.vue'
import SelectInput from '@/components/SelectInput.vue'


import Skeleton from 'primevue/skeleton'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'

import { useQuery } from '@vue/apollo-composable'
import { BOOKS_QUERY } from '@/querys/books'


const { result, loading } = useQuery(BOOKS_QUERY)
const loaddingSkeletonTable = new Array(4)

const books = computed(() => result.value.listBooks)


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
    title: null,
    description: null,
    categorys: [],
    authors: [],
})

const rules = {
    title: {
        required: helpers.withMessage('O campo é obrigatorio', required)
    },
    description: {
        required: helpers.withMessage('O campo é obrigatorio', required),
    },
    categorys: {
        required: helpers.withMessage('O campo é obrigatorio', required)
    },
    authors: {
        required: helpers.withMessage('O campo é obrigatorio', required)
    },
}


const v$ = useVuelidate(rules, form)


function handlerBookForm() {
    v$.value.$validate()


    if (v$.value.$error)
        return

    console.log(form.value)
}


const modalRef = ref()


function handlerCreateBooks() {
    if (modalRef.value)
        modalRef.value?.showModal()
}

</script>
