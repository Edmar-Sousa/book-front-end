import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [

    { path: '/', redirect: { name: 'book' } },
    { path: '/books', component: () => import('@/pages/Books.vue'), name: 'book' },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


export { router }

