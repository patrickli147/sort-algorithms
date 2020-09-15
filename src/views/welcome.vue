<template>
    <div class="welcome-wrap">
        <header class="header">
            <h1>{{selected}}</h1>
        </header>

        <nav class="nav">
            <div class="menu"  key="menu">
                <div class="collapse">
                    <span v-if="!isCollapsed" @click="isCollapsed = !isCollapsed">←</span> 
                    <span v-else @click="isCollapsed = !isCollapsed">→</span>
                </div>

                <transition name='fade' mode="in-out">
                    <div class="sortname-wrap" v-if="!isCollapsed">
                        <div :class="selected == name ? 'sortname selected' : 'sortname'"
                            v-for="(name, index) in sortNames"
                            :key="index"
                            @click="handleNameClicked(name)"
                        >
                            {{name}}
                        </div>
                    </div>
                </transition>
            </div>
        </nav>

        <article class="article">
            <div class="show">
                <router-view></router-view>
            </div>

        </article>

        <footer class="footer">
            footer
        </footer>

    </div>
</template>

<script>
//
export default {
    components: {
        
    },
    data() {
        return {
            sortName: '选择',
            array: [
                {
                    id: 0,
                    val: 0,
                },
                {
                    id: 1,
                    val: 1,
                },
                {
                    id: 2,
                    val: 2,
                },
                {
                    id: 3,
                    val: 3,
                },
                {
                    id: 4,
                    val: 4,
                },
            ],
            sortNames: [
                '选择排序',
                '冒泡排序',
                '归并排序',
                '插入排序',
                '快速排序',
            ],
            isCollapsed: false,
            selected: '选择排序',
            sortNamesEN: [
                'selectsort',
                'bubblesort',
                'mergesort',
                'insertionsort',
                'quicksort',
            ]
        }
    },
    methods: {
        handleNameClicked(name) {
            if (this.selected == name) {
                return;
            }

            this.selected = name;
            this.$router.push('/welcome/' + this.sortNamesEN[this.sortNames.indexOf(name)]);
        }
    },
    mounted() {
        let path = this.$route.path;
        let currentName = path.split('/').pop();
        this.selected = this.sortNames[this.sortNamesEN.indexOf(currentName)];
    }
}
</script>

<style lang='scss' scoped>
.welcome-wrap {
    position: relative;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    .header {
        width: 100%;
    }

    .nav {
        //width: 10%;
        max-width: 300px;
        //min-height: 500px;
        border-right: 2px solid #ccc;
        background-color: rgb(81,97,105);
        cursor: pointer;
        user-select: none;
        color: #fff;

        .collapse {
            //padding-bottom: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                padding: 2px 10px;
            }
            span:hover {
                background-color: rgb(144, 198, 224);
            }
        }

        .sortname-wrap {
            .sortname {
                min-width: 100px;
                padding: 5px 0;
            }
            .sortname:hover {
                background-color: rgb(58,72,79);
            }
            .selected {
                background-color: rgb(58,72,79);
            }
        }

    }
    // transition部分
    .fade-enter-active, .fade-leave-active {
        transition: all .1s;
        opacity: 1;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: translateX(-100px) scale(0);
    }
    
    .article {
        flex: 1;
    }
    
    .footer {
        width: 100%;
    }
}
</style>