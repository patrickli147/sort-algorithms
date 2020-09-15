<template>
    <div class="controller">
        <div class="btn">
            <dynamic-transition name='fade' mode='out-in'>
                <div v-if="!isAuto" key="manual">
                    <button  @click="isAuto = true">自动</button>
                    <button @click="$emit('nextstep')" key="next">下一步</button>
                </div>
                <div v-else key="auto">
                    <button  @click="isAuto = false">手动</button>
                </div>
            </dynamic-transition>   

            <div class="random">
                <button @click="getRandomArray">随机生成</button>
            </div>
        </div>
    </div>
</template>

<script>
import DynamicTransition from '@/components/DynamicTransition.vue';

export default {
    methods: {
        getRandomArray() {
            let array = [];
            for (let i = 0; i < 10; i ++) {
                let value = Math.floor(Math.random() * 100);
                array.push({
                    val: value,
                    id: i
                });
            }
            this.$emit("random", array);
        }
    },
    data() {
        return {
            isAuto: false,
        }
    },
    watch: {
        isAuto(newVal) {
            this.$emit('modechange', newVal);
        }
    },
    components: {
        DynamicTransition,
    }
}
</script>

<style lang='scss' scoped>
.controller {
    padding: 10px 10px;

    .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
    }   
}

button {
    width: 100px;
    height: 50px;
    margin: 0 5px;
    border-radius: 10px;
    background-color: #eee;
    outline: none;
    //border: none;
    opacity: .7;
    transition: all .5s;
}
button:hover {
    opacity: 1;
    background: rgb(11, 157, 241);
}
</style>