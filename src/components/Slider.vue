<template>
    <div id="slider" :class="cssScroll.slider">
        <button :class="selected.tweets ? 'selected' : '' " @click="(e) =>{handler(e, '-')}">Tweets</button>
        <button :class="selected.likes ? 'selected' : '' " @click="(e) => {handler(e, '+')}">Likes</button>
    </div>
</template>

<script>
export default {
    name: 'slider',
    props: {
        cssScroll: {
            slider: String
        }
    },
    data(){
        return {
            selected: {
                tweets: true,
                likes: false
            }
        }
    },
    methods: {
        handler(e, xCoord){
            let btn = e.target.innerText.toLowerCase();
            this.$emit('slider', btn, xCoord);
            if(btn == 'tweets') {
                this.selected.tweets = true;
                this.selected.likes = false;
            } else {
                this.selected.tweets = false;
                this.selected.likes = true;
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