<template>

    <div class="pt-10">
        <h1 class="text-3xl font-bold">Cadastro de Livros:</h1>
        
        <div class="mt-10 mb-5 text-right">
            <Button 
                @click="handlerCreateBooks"
                label="Adicionar">
            </Button>
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
        ref="modalRef"
        title="Cadastrar um novo livro">
            <div>
                {{ v$.authors?.$errors[0]?.$message }}
            </div>

            <form @submit.prevent>
                <text-input
                    id="title-book"
                    type="text"
                    label="Titulo do livro:"
                    v-model="form.title"
                    :error="v$.title?.$errors[0]?.$message" />
    
                <area-input
                    id="description"
                    label="Descrição:"
                    v-model="form.description"
                    :error="v$.description?.$errors[0]?.$message" />
    
                <select-input
                    id="author-select"
                    label="Selecione os autores:"
                    :options="authors"
                    option-label="name"
                    option-value="id"
                    v-model="form.authors"
                    :error="v$.authors?.$errors[0]?.$message" />
    
                <select-input
                    id="category-select"
                    label="Selecione as categorias:"
                    :options="categorias"
                    option-label="name" 
                    option-value="id"
                    v-model="form.categorys"
                    :error="v$.categorys?.$errors[0]?.$message" />

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

import { ref } from 'vue'

import { helpers, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

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
