<template>

    <div class="pt-10">
        <h1 class="text-3xl font-bold">Cadastro de Autores:</h1>
        
        <div class="mt-10 mb-5 text-right">
            <Button 
                label="Adicionar"
                @click="handlerCreateAuthor">
            </Button>
        </div>

        <!-- MY Suspense component ;) -->
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
                :value="authors"
                striped-rows
                paginator
                :rows="5"
                :rows-per-page-options="[5, 10, 20, 50]">
                    <column field="id" header="Id" />
                    <column field="name" header="Title" />
                    <column field="bio" header="Ano" />
            </data-table>
        </template>
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

import Skeleton from 'primevue/skeleton'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'

import { useQuery } from '@vue/apollo-composable'
import { AUTHORS_QUERY } from '@/querys/authors'


const { result, loading } = useQuery(AUTHORS_QUERY)

const authors = computed(() => result.value?.listAuthors)
const loaddingSkeletonTable = new Array(4)

const modalRef = ref()


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
