<template>

    <div class="pt-10">
        <h1 class="text-3xl font-bold">Cadastro de Autores:</h1>
        
        <div class="mt-10 mb-5 text-right">
            <Button 
                label="Adicionar"
                @click="handlerOpenModalAuthor">
            </Button>
        </div>

        <table-component
            :is-loading="loading"
            :data="authors"
            :columns="columns">

                <template #actions="slotProps">
                    <Button 
                        class="w-10 h-10 inline-block mr-4" 
                        @click="handlerUpdateAuthor(slotProps)">
                            <Pen :size="24" />
                    </Button>

                    <Button 
                        class="w-10 h-10" 
                        @click="handlerDeleteAuthor(slotProps.id)">
                            <Trash :size="24" />
                    </Button>
                </template>
        </table-component>
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
                    :error="v$.name?.$errors[0]?.$message.toString()" />

                <text-input
                    id="author-bio"
                    type="text"
                    label="Bibliografia do autor"
                    v-model="form.bio"
                    :error="v$.bio?.$errors[0]?.$message.toString()" />

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

import { Pen, Trash } from 'lucide-vue-next'


import useVuelidate from '@vuelidate/core'
import Model from '@/components/Modal.vue'
import TextInput from '@/components/TextInput.vue'

import Button from 'primevue/button'

import { useQuery, useMutation } from '@vue/apollo-composable'
import { AUTHORS_QUERY, AUTHORS_STORE, AUTHOR_DELETE, AUTHOR_UPDATE } from '@/querys/authors'
import { ColumnType } from '@/interfaces/TableColumnType'

import TableComponent from '@/components/TableComponent.vue'
import { AuthorType } from '@/interfaces/Author'


const { result, loading, refetch: refetchAuthors } = useQuery(AUTHORS_QUERY)

const authors = computed(() => result.value ? result.value?.listAuthors : [])

const modalRef = ref()

const columns: Array<ColumnType> = [
    { field: 'id', header: 'Id' },
    { field: 'name', header: 'Title' },
    { field: 'bio', header: 'Ano' },
    { field: 'actions', header: 'Ações' },
]

function handlerOpenModalAuthor() {
    if (modalRef.value)
        modalRef.value?.showModal()
}


const form = ref<AuthorType>({
    id: null,
    name: '',
    bio: '',
})


const rules = {
    name: {
        required: helpers.withMessage('O campo é obrigatorio', required)
    },

    bio: {
        required: helpers.withMessage('O campo é obrigatorio', required)
    }
}


const v$ = useVuelidate(rules, form)


const {mutate: addAuthor, onDone: doneStoreAuthor} = useMutation(AUTHORS_STORE)
const {mutate: deleteAuthor, onDone: doneDeleteAuthor} = useMutation(AUTHOR_DELETE)
const {mutate: updateAuthor, onDone: doneUpdateAuthor} = useMutation(AUTHOR_UPDATE)


doneStoreAuthor(handlerFinishRequest)
doneUpdateAuthor(handlerFinishRequest)
doneDeleteAuthor(handlerFinishRequest)


function handlerPostForm() {
    v$.value.$validate()

    if (v$.value.$error)
        return

    if (form.value.id) {
        updateAuthor({
            id: form.value.id,
            name: form.value.name,
            bio: form.value.bio,
        })
    }

    else {
        addAuthor({
            name: form.value.name, 
            bio: form.value.bio,
        })
    }
    
}

function handlerFinishRequest() {
    if (modalRef.value)
        modalRef.value.closeModal()

    form.value = {
        id: null,
        name: '',
        bio: '',
    }

    refetchAuthors()
}

function handlerUpdateAuthor(author: AuthorType) {
    form.value = {
        id: author.id,
        name: author.name,
        bio: author.bio,
    }

    handlerOpenModalAuthor()
}

function handlerDeleteAuthor(author: AuthorType) {
    deleteAuthor({
        id: author.id,
    })
}

</script>
