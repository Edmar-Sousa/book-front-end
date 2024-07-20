<template>

    <div class="pt-10">
        <h1 class="text-3xl font-bold">Cadastro de Categorias:</h1>
        
        <div class="mt-10 mb-5 text-right">
            <Button 
                label="Adicionar"
                @click="handlerCreateCategory"></Button>
        </div>


        <table-component
            :is-loading="loading"
            :data="category"
            :columns="columns">

                <template #actions="slotProps">
                    <Button class="w-10 h-10 inline-block mr-4" @click="handlerUpdateCategory(slotProps)">
                        <Pen :size="24" />
                    </Button>

                    <Button class="w-10 h-10" @click="handlerDeleteCategory(slotProps)">
                        <Trash :size="24" />
                    </Button>
                </template>
        </table-component>
    </div>

    <Model
        ref="modalRef"
        title="Cadastrar uma nova categoria">
            <form @submit.prevent>
                <text-input
                    id="category-name"
                    type="text"
                    label="Titulo da categoria"
                    v-model="form.title"
                    :error="v$.title?.$errors[0]?.$message.toString" />

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
import { Pen, Trash } from 'lucide-vue-next'

import { helpers, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

import Model from '@/components/Modal.vue'
import TextInput from '@/components/TextInput.vue'

import Button from 'primevue/button'

import TableComponent from '@/components/TableComponent.vue'

import { CATEGORYS_QUERY, CATEGORYS_STORE, CATEGORYS_UPDATE, CATEGORYS_DELETE } from '@/querys/category'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { ColumnType } from '@/interfaces/TableColumnType'
import { CategoryType } from '@/interfaces/Category'



const { result, loading, refetch: refetchCategory } = useQuery(CATEGORYS_QUERY)
const category = computed(() =>  result.value ? result.value.listCategory : [])

const columns: Array<ColumnType> = [
    { field: 'id', header: 'ID' },
    { field: 'title', header: 'Titulo' },
    { field: 'actions', header: 'Ações' },
]



const modalRef = ref()


function handlerCreateCategory() {
    if (modalRef.value)
        modalRef.value?.showModal()
}


const form = ref<CategoryType>({
    id: null,
    title: null,
})

const rules = {
    title: {
        required: helpers.withMessage('O campo é obrigatorio', required)
    },
}

const { mutate: storeCategory, onDone: doneStoreCategory } = useMutation(CATEGORYS_STORE)
const { mutate: updateCategory, onDone: doneUpdateCategory } = useMutation(CATEGORYS_UPDATE)
const { mutate: deleteCategory, onDone: doneDeleteCategory } = useMutation(CATEGORYS_DELETE)

doneStoreCategory(handlerFinishRequest)
doneUpdateCategory(handlerFinishRequest)
doneDeleteCategory(handlerFinishRequest)


const v$ = useVuelidate(rules, form)


function handlerCategoryForm() {
    v$.value.$validate()


    if (v$.value.$error)
        return

    if (form.value.id) {
        updateCategory({
            id: form.value.id,
            title: form.value.title
        })
    }

    else {
        storeCategory({
            title: form.value.title,
        })
    }

}



function handlerUpdateCategory(category: CategoryType) {
    form.value = {
        id: category.id,
        title: category.title
    }

    if (modalRef.value)
        modalRef.value.showModal()
}



function handlerFinishRequest() {
    if (modalRef.value)
        modalRef.value.closeModal()

    form.value = {
        id: null,
        title: null
    }

    refetchCategory()
}

function handlerDeleteCategory(category: CategoryType) {
    deleteCategory({
        id: category.id,
    })
}

</script>
