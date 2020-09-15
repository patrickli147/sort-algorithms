import Vue from 'vue'
import Router from 'vue-router'

import welcome from '@/views/welcome.vue'
import selectSort from '@/views/selectSort.vue'
import bubbleSort from '@/views/bubbleSort.vue'
import mergeSort from '@/views/mergeSort.vue'
import insertionSort from '@/views/insertionSort.vue'
import quickSort from '@/views/quickSort.vue'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/welcome',
            component: welcome,
            children: [
                {
                    path: 'selectsort',
                    component: selectSort,
                },
                {
                    path: 'bubblesort',
                    component: bubbleSort,
                },
                {
                    path: 'mergesort',
                    component: mergeSort,
                },
                {
                    path: 'insertionsort',
                    component: insertionSort,
                },
                {
                    path: 'quicksort',
                    component: quickSort,
                },
                {
                    path: '',
                    component: selectSort,
                }
            ]
        },
        {
            path: '/hello',
            component: HelloWorld,
        },
        {
            path: '/',
            component: welcome,
        },
        
    ]
})

export default router