<template>
    <div id="profile" :class="showProfileComponent ? '' : 'hide-scroll'">
        <Header @scroll="scrollHandler" :username="username" :followers="user.followers" :following="user.following" v-if="username"/>
        <Slider leftBtn="Tweets" rightBtn="Likes" :cssScroll="cssScroll"/>
        <SliderContainers :selected="selected" :cssScroll="cssScroll"/>
        <Navbar/>
    </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import Header from '../components/UserHeader';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import SliderContainers from '../components/SliderContainers';

export default {
    name: 'profile',
    data() {
        return {
            jwt: localStorage.getItem('jwt'),
            selected: {
                tweets: true,
                likes: false
            },
            cssScroll: {
                slider: '',
                container: ''
            },
            showProfileComponent: true
        }
    },
    computed: {
        ...mapGetters('profile', [ 'username']),
        ...mapState('profile', [ 'user' ])
    },
    methods: {
        scrollHandler(event){
            this.showProfileComponent = event;
        }
    },
    created() {
        if(!this.jwt) {
            this.$router.replace('/login');
        }
        if(!this.username){
            this.$store.dispatch('profile/getUser');
        }
        window.onscroll = () => {
            if(document.documentElement.scrollTop > 134){
                this.cssScroll.slider = 'slider-fixed';
                this.cssScroll.container = 'container-mt';
            }else{
                this.cssScroll.slider = '';
                this.cssScroll.container = '';
            }
        };
    },
    components: {
        Header,
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

#profile.hide-scroll {
    margin-top: 0;
    height: 100vh;
    overflow-y: hidden;
}

</style>