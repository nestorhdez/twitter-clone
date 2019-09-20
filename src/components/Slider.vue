<template>
    <div id="slider" :class="cssScroll.slider">
        <button id="left-btn" :class="selected.left ? 'selected' : '' " @click="(e) =>{handler(e, '-')}">{{leftBtn}}</button>
        <button :class="selected.right ? 'selected' : '' " @click="(e) => {handler(e, '+')}">{{rightBtn}}</button>
    </div>
</template>

<script>
export default {
    name: 'slider',
    props: {
        leftBtn: String,
        rightBtn: String,
        cssScroll: {
            slider: String
        }
    },
    data(){
        return {
            selected: {
                left: true,
                right: false
            }
        }
    },
    methods: {
        handler(e, xCoord){
            let btn = e.target.id;
            this.$emit('slider', btn, xCoord);
            if(btn == 'left-btn') {
                this.selected.left = true;
                this.selected.right = false;
            } else {
                this.selected.left = false;
                this.selected.right = true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>

$primary-color: #26364F;
$bg-color: #F8F8F8;

#slider {
    padding-top: 30px;
    display: flex;
    border-bottom: 3px solid $primary-color;
}

#slider.slider-fixed {
    position: fixed;
    top: 0;
    width: 100%;
    padding-top: 15px;
    background-color: $bg-color;
}

#slider button {
    font-weight: bold;
    font-size: 1.1rem;
    color: $primary-color;
    display: inline-block;
    width: 50vw;
    padding-bottom: 5px;
    background: none;
    border: none;
    outline: none;
}

#slider .selected {
    border-bottom: 3px solid $primary-color;
}

</style>