<template>

    <div class="pt-10">
        <h1 class="text-3xl font-bold">Cadastro de Categorias:</h1>
        
        <div class="mt-10 mb-5 text-right">
            <Button 
                label="Adicionar"
                @click="handlerCreateCategory"></Button>
        </div>

        <!-- <template v-if="loading">
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
                :value="category"
                striped-rows
                paginator
                :rows="5"
                :rows-per-page-options="[5, 10, 20, 50]">
                    <column field="id" header="Id" />
                    <column field="title" header="Title" />
            </data-table>
        </template> -->

        <table-component
            :is-loading="loading"
            :data="category"
            :columns="columns" />
    </div>

    <Model
        ref="modalRef"
        title="Cadastrar uma nova categoria">
            <form @submit.prevent>
                <text-input
                    id="category-name"
                    type="text"
                    label="Titulo da categoria"
                    v-model="form.name"
                    :error="v$.name?.$errors[0]?.$message.toString" />

                <div class="text-right mt-4">
                    <Button 
                        label="Cadastrar"
                        @click="handlerCategoryForm"></Button>
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

import TableComponent from '@/components/TableComponent.vue'

import { useQuery } from '@vue/apollo-composable'
import { CATEGORYS_QUERY } from '@/querys/category'
import { ColumnType } from '@/interfaces/TableColumnType'



const { result, loading } = useQuery(CATEGORYS_QUERY)
const category = computed(() => result.value.listCategory)

const columns: Array<ColumnType> = [
    { field: 'id', header: 'ID' },
    { field: 'title', header: 'Titulo' },
]



const modalRef = ref()


function handlerCreateCategory() {
    if (modalRef.value)
        modalRef.value?.showModal()
}


const form = ref({
    name: null,
})

const rules = {
    name: {
        required: helpers.withMessage('O campo é obrigatorio', required)
    },
}


const v$ = useVuelidate(rules, form)


function handlerCategoryForm() {
    v$.value.$validate()


    if (v$.value.$error)
        return

}


</script>
