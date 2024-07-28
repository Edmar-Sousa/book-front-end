<template>

    <div class="pt-10">
        <h1 class="text-3xl font-bold">Cadastro de Livros:</h1>
        
        <div class="mt-10 mb-5 text-right">
            <Button 
                @click="handlerOpenModalBooks"
                label="Adicionar">
            </Button>
        </div>

        <table-component
            :is-loading="loading"
            :data="books"
            :columns="columns">
                <template #actions="slotProps">
                    <Button 
                        class="w-10 h-10 inline-block mr-4" 
                        @click="handlerUpdateBook(slotProps)">
                            <Pen :size="24" />
                    </Button>

                    <Button 
                        class="w-10 h-10"
                         @click="handlerDeleteBook(slotProps)">
                            <Trash :size="24" />
                    </Button>
                </template>
        </table-component>
    </div>

    {{ form }}

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
                    v-model="form.author_id"
                    :error="v$.authors?.$errors[0]?.$message.toString()" />
    
                <select-input
                    id="category-select"
                    label="Selecione as categorias:"
                    :options="categorias"
                    option-label="title" 
                    option-value="id"
                    v-model="form.category_id"
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
import { Pen, Trash } from 'lucide-vue-next'

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

import { BOOKS_QUERY, BOOKS_STORE, BOOKS_DELETE, BOOKS_UPDATE } from '@/querys/books'
import { AUTHORS_OPTINS } from '@/querys/authors'
import { CATEGORYS_OPTINS } from '@/querys/category'
import { BookType } from '@/interfaces/Book'


const { result, loading, refetch: refetchBooks } = useQuery(BOOKS_QUERY)

const books = computed(() => result.value ? result.value.listBooks : [])


const columns : Array<ColumnType> = [
    { field: 'id', header: 'Id' },
    { field: 'title', header: 'Titulo' },
    { field: 'year', header: 'Ano' },
    { field: 'actions', header: 'Ações' },
]

const { result: authorsOptions } = useQuery(AUTHORS_OPTINS)
const { result: categorysOptions } = useQuery(CATEGORYS_OPTINS)

const authors = computed(() => authorsOptions.value ? authorsOptions.value.listAuthors : [])
const categorias = computed(() => categorysOptions.value ? categorysOptions.value.listCategory : [])


const form = ref<BookType>({
    id: null,
    title: null,
    year: null,
    description: null,
    category_id: [],
    author_id: [],
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
    category_id: {
        required: helpers.withMessage('O campo é obrigatorio', required)
    },
    author_id: {
        required: helpers.withMessage('O campo é obrigatorio', required)
    },
}


const modalRef = ref()
const v$ = useVuelidate(rules, form)

const { mutate: storeBook, onDone: doneStoreBook } = useMutation(BOOKS_STORE)
const { mutate: deleteBook, onDone: doneDeleteBook } = useMutation(BOOKS_DELETE)
const { mutate: updateBook, onDone: doneUpdateBook } = useMutation(BOOKS_UPDATE)

doneStoreBook(handlerFinishRequest)
doneDeleteBook(handlerFinishRequest)
doneUpdateBook(handlerFinishRequest)


function handlerFinishRequest () {
    if (modalRef.value)
        modalRef.value.closeModal()

    form.value = {
        id: null,

        title: null,
        year: null,
        description: null,
        category_id: [],
        author_id: [],
    }

    refetchBooks()
}

function handlerBookForm() {
    v$.value.$validate()


    if (v$.value.$error)
        return


    if (form.value.id) {
        updateBook({
            id: form.value.id,
            title: form.value.title,
            description: form.value.description,
            year: form.value.year,
            categorys: (form.value.category_id as number[])[0],
            authors: (form.value.author_id as number[])[0],
        })
    }

    else {
        storeBook({
            title: form.value.title,
            description: form.value.description,
            year: form.value.year,
            categorys: (form.value.category_id as number[])[0],
            authors: (form.value.author_id as number[])[0],
        })
    }

}


function handlerUpdateBook(book: BookType) {
    
    let categorisId = form.value.category_id
    let authorId = form.value.author_id

    if (typeof book.category_id == 'number' && typeof book.author_id == 'number') {
        categorisId = [book.category_id]
        authorId = [book.author_id]
    }


    form.value = {
        id: book.id,
        title: book.title,
        year: book.year,
        description: book.description,
        category_id: categorisId,
        author_id: authorId,
    }

    handlerOpenModalBooks()

}

function handlerOpenModalBooks() {
    if (modalRef.value)
        modalRef.value?.showModal()
}


function handlerDeleteBook(book: BookType) {
    deleteBook({
        id: book.id
    })
}

</script>
