<template>

    <div class="pt-10">
        <h1 class="text-3xl font-bold">Cadastro de Livros:</h1>
        
        <div class="mt-10 mb-5 text-right">
            <Button label="Adicionar"></Button>
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

</template>

<script setup lang="ts">

import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'


const products = [
    { code: '1231123312', title: 'Robert C. Martin', year: '2023-06-23' },
    { code: '1231123312', title: 'Robert C. Martin', year: '2023-06-23' },
    { code: '1231123312', title: 'Robert C. Martin', year: '2023-06-23' },
    { code: '1231123312', title: 'Robert C. Martin', year: '2023-06-23' },
    { code: '1231123312', title: 'Robert C. Martin', year: '2023-06-23' },
]

</script>
