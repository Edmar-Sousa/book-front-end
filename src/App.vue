<template>

    <div class="w-screen h-screen px-4 py-10">
        <Menu />

        <div class="w-full max-w-[900px] mx-auto">
            <router-view>
            </router-view>
        </div>
    </div>

</template>

<script setup lang="ts">

import Menu from '@/components/Menu.vue'

</script>
