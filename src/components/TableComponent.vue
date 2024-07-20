<template>

    <template v-if="isLoading">
        <data-table 
            :value="loaddingSkeletonTable"
            striped-rows
            paginator
            :rows="5"
            :rows-per-page-options="[5, 10, 20, 50]">
                <column 
                    v-for="(column, index) in columns"
                    :key="index"
                    :field="column.field" 
                    :header="column.header">
                        <template #body>
                            <skeleton />
                        </template>
                </column>
        </data-table>
    </template>

    <template v-else>
        <data-table 
            :value="data"
            striped-rows
            paginator
            :rows="rows"
            :rows-per-page-options="paginatorPerPages">
                <column 
                    v-for="(column, index) in columns"
                    :key="index"
                    :field="column.field" 
                    :header="column.header">

                        <template #body="slotProps" v-if="$slots[column.field]">
                            <slot :name="column.field" v-bind="slotProps.data"></slot>
                        </template>
                </column>
        </data-table>
    </template>

</template>

<script setup lang="ts">


import { ColumnType } from '@/interfaces/TableColumnType'

import Skeleton from 'primevue/skeleton'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'


defineProps({
    isLoading: {
        type: Boolean,
        default: false,
        required: false,
    },

    paginatorPerPages: {
        type: Array<Number>,
        default: [5, 10, 20, 50],
        required: false,
    },

    rows: {
        type: Number,
        default: 5,
        required: false,
    },

    columns: {
        type: Array<ColumnType>,
        required: true,
    },

    data: {
        type: Array<any>,
    },
})


const loaddingSkeletonTable = new Array(4)

</script>
