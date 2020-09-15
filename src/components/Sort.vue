<template>
    <div>
        <Controller
            @random="receiveRandom"
            @nextstep="nextStep"
            @modechange="modeChange"
        ></Controller>
        <Animated-Array 
            @finish="animationFinished"
            :animateArray="array"
        ></Animated-Array>
    </div>
</template>

<script>
import AnimatedArray from '@/components/AnimatedArray.vue'
import Controller from '@/components/Controller.vue'

export default {
    props: {
        sortname: String,
    },
    components: {
        AnimatedArray,
        Controller,
    },
    methods: {
        receiveRandom(array) {
            if (!this.isAnimationFinished || !this.getGenerator) {
                return;
            }

            this.array = [...array];
            this.gen = this.getGenerator();
            
        },
        nextStep() {
            if (!this.isAnimationFinished) {
                //todo
                //toast 
                //console.log("is animation")
                return;
            }
            
            if (this.array.length === 0) {
                return;
            }

            this.isAnimationFinished = false;
            let res = this.gen.next();
            if (res.done) {
                //finished
                this.isAnimationFinished = true;

                alert("完成");

                return;
            }
            let newArray = res.value;
            this.array = [...newArray];
        },
        animationFinished() {
            this.isAnimationFinished = true;
            if (this.mode) {
                //is auto
                setTimeout(() => {
                    this.nextStep();
                }, 500);
            }
        },
        modeChange(mode) {
            this.mode = mode;
            if (this.mode && this.isAnimationFinished) {
                this.nextStep();
            }
        },
    },
    data() {
        return {
            array: [],
            gen: null,
            mode: false,
            isAnimationFinished: true,
        }
    },
    async mounted() {
        let module = await import(`../sortAlgorithms/${this.sortname}.js`);
        this.getGenerator = module.default;
    }
}
</script>

<style lang='scss' scoped>

</style>