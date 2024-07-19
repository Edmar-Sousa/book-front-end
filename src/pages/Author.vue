<template>

    <div class="pt-10">
        <h1 class="text-3xl font-bold">Cadastro de Autores:</h1>
        
        <div class="mt-10 mb-5 text-right">
            <Button 
                label="Adicionar"
                @click="handlerCreateAuthor">
            </Button>
        </div>

        <table-component
            :is-loading="loading"
            :data="authors"
            :columns="columns" />
    </div>


    <Model
        ref="modalRef"
        title="Cadastrar um novo autor">
            <form @submit.prevent>
                <text-input
                    id="author-name"
                    type="text"
                    label="Nome do autor"
                    v-model="form.name"
                    :error="v$.name?.$errors[0]?.$message.toString" />

                <div class="text-right mt-4">
                    <Button 
                        label="Cadastrar"
                        @click="handlerPostForm">
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

import Button from 'primevue/button'

import { useQuery } from '@vue/apollo-composable'
import { AUTHORS_QUERY } from '@/querys/authors'
import { ColumnType } from '@/interfaces/TableColumnType'

import TableComponent from '@/components/TableComponent.vue'


const { result, loading } = useQuery(AUTHORS_QUERY)

const authors = computed(() => result.value ? result.value?.listAuthors : [])

const modalRef = ref()

const columns: Array<ColumnType> = [
    { field: 'id', header: 'Id' },
    { field: 'name', header: 'Title' },
    { field: 'bio', header: 'Ano' },
]

function handlerCreateAuthor() {
    if (modalRef.value)
        modalRef.value?.showModal()
}


const form = ref({
    name: '',
})


const rules = {
    name: {
        required: helpers.withMessage('O campo é obrigatorio', required)
    },
}


const v$ = useVuelidate(rules, form)


function handlerPostForm() {
    v$.value.$validate()

    if (v$.value.$error)
        return

    console.log(form.value)
}

</script>
