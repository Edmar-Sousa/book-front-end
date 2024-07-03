<template>

    <div class="pt-10">
        <h1 class="text-3xl font-bold">Cadastro de Categorias:</h1>
        
        <div class="mt-10 mb-5 text-right">
            <Button 
                label="Adicionar"
                @click="handlerCreateCategory"></Button>
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

import { ref } from 'vue'
import { helpers, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

import Model from '@/components/Modal.vue'
import TextInput from '@/components/TextInput.vue'

import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'


const products = [
    { code: '1231123312', title: 'Programação de computadores', year: '2023-06-23' },
    { code: '1231123312', title: 'Programação de computadores', year: '2023-06-23' },
    { code: '1231123312', title: 'Programação de computadores', year: '2023-06-23' },
    { code: '1231123312', title: 'Programação de computadores', year: '2023-06-23' },
    { code: '1231123312', title: 'Programação de computadores', year: '2023-06-23' },
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

    console.log(form.value)
}


</script>
