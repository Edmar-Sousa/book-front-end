<template>

    <div class="pt-10">
        <h1 class="text-3xl font-bold">Cadastro de Livros:</h1>
        
        <div class="mt-10 mb-5 text-right">
            <Button 
                @click="handlerCreateBooks"
                label="Adicionar">
            </Button>
        </div>

        <table-component
            :is-loading="loading"
            :data="books"
            :columns="columns" />
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

import TableComponent from '@/components/TableComponent.vue'

import Button from 'primevue/button'

import { useQuery } from '@vue/apollo-composable'
import { BOOKS_QUERY } from '@/querys/books'
import { ColumnType } from '@/interfaces/TableColumnType'


const { result, loading } = useQuery(BOOKS_QUERY)

const books = computed(() => result.value ? result.value.listBooks : [])


const columns : Array<ColumnType> = [
    { field: 'id', header: 'Id' },
    { field: 'title', header: 'Titulo' },
    { field: 'year', header: 'Ano' },
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
