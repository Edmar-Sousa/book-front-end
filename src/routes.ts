import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [

    { path: '/', redirect: { name: 'book' } },
    { path: '/books', component: () => import('@/pages/Books.vue'), name: 'book' },
    { path: '/authors', component: () => import('@/pages/Author.vue'), name: 'author' },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


export { router }

