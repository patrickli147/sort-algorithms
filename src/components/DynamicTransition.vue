<template>
    <div>
        <transition :name="name" :mode='mode'>
            <slot></slot>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        mode: String,
    }
}
</script>

<style lang='scss' scoped>
.fade-enter-active, .fade-leave-active {
    transition: all .1s;
    opacity: 1;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
    transform-origin: 0 0;
    transform: rotate(90deg);
}
</style>