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
                    :error="v$.title?.$errors[0]?.$message.toString()" />

                <text-input
                    id="title-year"
                    type="text"
                    label="Ano:"
                    v-model="form.year"
                    :error="v$.year?.$errors[0]?.$message.toString()" />
    
                <area-input
                    id="description"
                    label="Descrição:"
                    v-model="form.description"
                    :error="v$.description?.$errors[0]?.$message.toString()" />
    
                <select-input
                    id="author-select"
                    label="Selecione os autores:"
                    :options="authors"
                    option-label="name"
                    option-value="id"
                    v-model="form.authors"
                    :error="v$.authors?.$errors[0]?.$message.toString()" />
    
                <select-input
                    id="category-select"
                    label="Selecione as categorias:"
                    :options="categorias"
                    option-label="name" 
                    option-value="id"
                    v-model="form.categorys"
                    :error="v$.categorys?.$errors[0]?.$message.toString()" />

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

import { useQuery, useMutation } from '@vue/apollo-composable'
import { ColumnType } from '@/interfaces/TableColumnType'

import { BOOKS_QUERY, BOOKS_STORE } from '@/querys/books'
import { AUTHORS_OPTINS } from '@/querys/authors'


const { result, loading, refetch: refetchBooks } = useQuery(BOOKS_QUERY)

const books = computed(() => result.value ? result.value.listBooks : [])


const columns : Array<ColumnType> = [
    { field: 'id', header: 'Id' },
    { field: 'title', header: 'Titulo' },
    { field: 'year', header: 'Ano' },
]

const { result: authorsOptions } = useQuery(AUTHORS_OPTINS)

const authors = computed(() => authorsOptions.value ? authorsOptions.value.listAuthors : [])


const categorias = [
    { id: 1, name: 'Robert C. Martin' },
    { id: 2, name: 'Robert C. Martin' },
    { id: 3, name: 'Robert C. Martin' },
    { id: 4, name: 'Robert C. Martin' },
    { id: 5, name: 'Robert C. Martin' },
]


const form = ref({
    title: null,
    year: null,
    description: null,
    categorys: [],
    authors: [],
})

const rules = {
    title: {
        required: helpers.withMessage('O campo é obrigatorio', required)
    },
    year: {
        required: helpers.withMessage('O campo é obrigatorio', required)
    },
    description: {
        required: helpers.withMessage('O campo é obrigatorio', required)
    },
    categorys: {
        required: helpers.withMessage('O campo é obrigatorio', required)
    },
    authors: {
        required: helpers.withMessage('O campo é obrigatorio', required)
    },
}


const modalRef = ref()
const v$ = useVuelidate(rules, form)

const { mutate: storeBook, onDone } = useMutation(BOOKS_STORE)


onDone(() => {
    if (modalRef.value)
        modalRef.value.closeModal()

    form.value = {
        title: null,
        year: null,
        description: null,
        categorys: [],
        authors: [],
    }

    refetchBooks()
})

function handlerBookForm() {
    v$.value.$validate()


    if (v$.value.$error)
        return

    storeBook({
        title: form.value.title,
        description: form.value.description,
        year: form.value.year,
        categorys: form.value.categorys[0],
        authors: form.value.authors[0],
    })
}




function handlerCreateBooks() {
    if (modalRef.value)
        modalRef.value?.showModal()
}

</script>
