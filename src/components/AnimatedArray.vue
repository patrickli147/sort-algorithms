<template>
    <div class="array-wrap">   
        <div class="speed-controller">
            fast
            <input type="range" step="1" min="50" max="150" v-model="speed">
            slow
        </div>
        <div class="array-container">
            <div class="array-item"
                v-for="(item, index) in proxyObj.data"
                :key="index"
                :ref="'animated' + item.id"
            >
                {{item.val}}
            </div>    
        </div>
    </div>
</template>

<script>
export default {
    props: {
        animateArray: Array,
    },
    data() {
        return {
            array: this.animateArray,
            proxyObj: null,
            toAnimate: 0,
            Animated: 0,
            toSet: null,
            toClear: [],
            add: [],
            toAdd: 0,
            added: 0,
            speed: 50,
        }
    },
    created() {
        this.init();
    },
    watch: {
        array(newVal) {
            this.updateArray(newVal);
        },
        Animated(newVal) {
            if (newVal > 0 && newVal == this.toAnimate) {
                //clear animation and transform
                for (let i = 0; i < this.toClear.length; i ++) {
                    this.toClear[i].className = 'array-item';
                    this.toClear[i].style.transform = '';
                }
                this.toClear = [];
                

                //set real value
                this.proxyObj.data = this.toSet;

                this.toAnimate = 0;
                this.Animated = 0;

                //todo add animation
                if (this.add.length > 0) {
                    this.$nextTick(() => {
                        this.playAddAnimation();
                    });
                }   
                else {
                    this.$emit("finish");
                }   
            }
        },
        animateArray(newVal) {
            this.array = [...newVal];
        },
        added(newVal) {
            if (newVal > 0 && newVal == this.toAdd) {
                //add finished
                this.$emit("finish");

                this.toAdd = 0;
                this.added = 0;
            }
        }
    },
    methods: {
        updateArray(newVal) {
            this.proxyObj.data = newVal;
        },
        init() {
            let context = this;
            this.proxyObj = new Proxy({data: []}, {
                set(target, propKey, value) {
 
                    let oldValue = target[propKey];
                    
                    if (context.toAnimate == 0) {
                        
                        context.toSet = value;
                        context.animate(oldValue, value);

                        if (oldValue.length == 0 && value.length > 0) {
                            //console.log("add directly")
                            target[propKey] = value;
                            context.$nextTick(() => {
                                context.playAddAnimation();
                            });
                            return true;
                        }

                        if (context.toAnimate == 0 && context.toAdd == 0) {
                            //no action
                            target[propKey] = value;
                            context.$emit('finish');
                            return true;
                        }

                        return true;
                    }

                    if (context.toAnimate > 0 && (context.toAnimate !== context.Animated)) {
                        //console.log("set to old value")
                        target[propKey] = oldValue;
                        
                        //record value
                        context.toSet = value;
                        
                        return true;
                    }
                    else {
                        //console.log("set to real value")
                        target[propKey] = value;
                        context.toAnimate = 0;
                        context.Animated = 0;

                        //context.proxyObj = Object.assign({}, context.proxyObj);
                        return true;
                    }
                },
                get(target, propKey) {
                    return target[propKey];
                }
            });

            this.proxyObj.data = this.array;
        },
        animate(oldValue, newValue) {
            let changed = [];
            let added = [];
            for (let i = 0; i < oldValue.length; i ++) {
                let current = oldValue[i];
                
                let isDeleted = true;
                for (let j = 0; j < newValue.length; j ++) {
                    if (newValue[j].id === current.id) {
                        if (j !== i) {
                            current.to = oldValue[j].id;
                            changed.push(current);
                        }
                        
                        isDeleted = false;
                        break;
                    }
                        
                }
                if (isDeleted) {
                    //deleted i
                    current.to = -1;
                    changed.push(current);
                }    
            }

            //console.log(changed.map(v=>v.val));

            for (let i = 0; i < newValue.length; i ++) {
                let isFound = false;
                for (let j = 0; j < oldValue.length; j ++) {
                    if (oldValue[j].id === newValue[i].id) {
                        isFound = true;
                        break;
                    }
                }
                if (!isFound) {
                    //added
                    newValue[i].to = newValue[i].id;
                    added.push(newValue[i]);
                }
            }
            
            //console.log(added.map(v=>v.to));
            this.add = added;

            this.toAnimate = changed.length;
            this.Animated = 0;

            for (let i = 0; i < changed.length; i ++) {
                let from = this.$refs['animated' + changed[i].id][0];
                if (changed[i].to == -1) {
                    //deleted
                    this.deleteAnimation(from);
                }
                else {
                    let to = this.$refs['animated' + changed[i].to][0];
                    let destination = this.getOffsetToBody(to);
                    this.playAnimation(from, destination);
                }
                
            }
        },
        getOffsetToBody(element) {
            let offsetObj = {
                x: 0,
                y: 0
            };
            
            while (element) {
                //console.log(element.offsetLeft);
                offsetObj.x += element.offsetLeft;
                offsetObj.y += element.offsetTop;
                element = element.offsetParent;
            }

            //得到相对坐标
            offsetObj.x -= document.body.scrollLeft;
            offsetObj.y -= document.body.scrollTop;

            return offsetObj;
        },
        playAnimation(from, destination) {
            //let timer = null;
            let fromX = this.getOffsetToBody(from).x;
            let toX = destination.x;
            let gap = toX - fromX;
            let step = Math.ceil(Math.abs(gap) / this.speed);

            let timer = requestAnimationFrame(
                () => {
                    this.animationCallback(from, gap, timer, step)
                }
            );
        },
        animationCallback(from, gap, timer, step) {
            let fromTransform = from.style.transform;
            let currentX;
            
            if (fromTransform.length > 0) {
                currentX = parseInt(from.style.transform.match(/(\+|-)?\d+/)[0]);
            }
            else {
                currentX = 0;
            }
            if (gap > 0) {
                if (currentX < gap) {
                    if (from.style.backgroundColor !== 'red') {
                        from.style.backgroundColor = 'red';
                    }

                    if (currentX + step <= gap) {
                        currentX += step;
                    }
                    else {
                        currentX = gap;
                    }

                    from.style.transform = `translateX(${currentX}px)`;
                    requestAnimationFrame(() => {
                        this.animationCallback(from, gap, timer, step)
                    });
                }
                else {
                    from.style.backgroundColor = 'blue';
                    //from.style.transform = '';
                    this.toClear.push(from);
                    this.Animated ++;
                    cancelAnimationFrame(timer);
                }
            }
            else if (gap < 0) {
                if (currentX > gap) {
                    if (from.style.backgroundColor !== 'red') {
                        from.style.backgroundColor = 'red';
                    }

                    if (currentX - step > gap) {
                        currentX -= step;
                    }
                    else {
                        currentX = gap;
                    }

                    from.style.transform = `translateX(${currentX}px)`;
                    requestAnimationFrame(() => {
                        this.animationCallback(from, gap, timer, step)
                    });
                }
                else {
                    from.style.backgroundColor = 'blue';
                    //from.style.transform = '';
                    this.toClear.push(from);
                    this.Animated ++;
                    cancelAnimationFrame(timer);
                }
            }
            else {
                cancelAnimationFrame(timer);
            }
        },
        deleteAnimation(from) {
            from.className = 'array-item delete';
            this.toClear.push(from);
            this.Animated ++;
        },
        playAddAnimation() {
            //console.log(this.proxyObj.data.map(v=>v.val));
            this.toAdd = this.add.length;
            this.added = 0;
            for (let i = 0; i < this.add.length; i ++) {
                //console.log("add animation")
                let element = this.$refs['animated' + this.add[i].id][0];
                element.style.backgroundColor = 'pink';
                element.style.transform = "translateY(50px)";
                let timer = requestAnimationFrame(() => {
                    this.addAnimation(element, timer);
                })
            }
        },
        addAnimation(e, timer) {
            let current = parseInt(e.style.transform.match(/(\+|-)?\d+/)[0]);
            if (current > 0) {
                if (current - 1 > 0) {
                    current -= 1;
                }
                else {
                    current = 0;
                }
                e.style.transform = `translateY(${current}px)`;
                requestAnimationFrame(() => {
                    this.addAnimation(e, timer);
                })
            }
            else {
                this.added ++;
                e.style.backgroundColor = 'blue';
                e.style.transform = '';
                cancelAnimationFrame(timer);
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.array-wrap {
    min-width: 600px;
    color: #fff;

    .array-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;

        .array-item {
            width: 50px;
            height: 50px;
            border-radius: 10px;
            margin: 0 10px;
            background-color: blue;
            transform: translateX(0);

            display: flex;
            justify-content: center;
            align-items: center;
        }
        .delete {
            background-color: #ccc;
            animation: delete 1s;
            animation-fill-mode: forwards;
            //animation-play-state: paused;
        }
        @keyframes delete {
            0% {
                opacity: 1;
                
                transform: translateY(0);
            }
            100% {
                opacity: 0;
                transform: translateY(50px);
            }
        }
    }

    .speed-controller {
        color: #000;
        margin-bottom: 20px;
        font-size: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>