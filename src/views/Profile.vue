<template>
    <div id="profile">
        <h1 v-if="username">@{{username}}</h1>
        <Slider leftBtn="Tweets" rightBtn="Likes" :cssScroll="cssScroll"/>
        <SliderContainers :selected="selected" :cssScroll="cssScroll"/>
        <Navbar/>
    </div>
</template>

<script>

import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import SliderContainers from '../components/SliderContainers';

export default {
    name: 'profile',
    data() {
        return {
            jwt: localStorage.getItem('jwt'),
            username: '',
            selected: {
                tweets: true,
                likes: false
            },
            cssScroll: {
                slider: '',
                container: ''
            }
        }
    },
    created() {
        if(!this.jwt) {
            this.$router.replace('/login')
        }
        window.onscroll = () => {
            if(document.documentElement.scrollTop > 97){
                this.cssScroll.slider = 'slider-fixed';
                this.cssScroll.container = 'container-mt';
            }else{
                this.cssScroll.slider = '';
                this.cssScroll.container = '';
            }
        };        
    },
    components: {
        Navbar,
        Slider,
        SliderContainers
    }
}
</script>

<style lang="scss" scoped>

$primary-color: #26364F;
$bg-color: #F8F8F8;

#profile {
    margin-top: 40px;
}

</style>