<template>
    <div>
        <Loader v-if="loading"/>
        <div id="profile" :class="showProfileComponent ? '' : 'hide-scroll'">
            <Header @scroll="scrollHandler" :username="user.username" :userLogged="userLogged" :followers="user.followers" :following="user.following" v-if="user && userLogged.username"/>
            <Slider leftBtn="Tweets" rightBtn="Likes" :cssScroll="cssScroll" v-if="user"/>
            <SliderContainers :username="user.username" :userNameLogged="userLogged.username" :cssScroll="cssScroll" v-if="user && userLogged.username"/>
        </div>
        <Navbar/>
    </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import Axios from '../interceptors';
import Header from '../components/UserHeader';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import Slider from '../components/Slider';
import SliderContainers from '../components/SliderContainers';

export default {
    name: 'profile',
    data() {
        return {
            user: '',
            jwt: localStorage.getItem('jwt'),
            cssScroll: {
                slider: '',
                container: ''
            },
            showProfileComponent: true,
            loading: false
        }
    },
    computed: {
        ...mapState('profile', {userLogged: 'user'}),
        ...mapGetters('profile', { userNameLogged: 'username' }),
    },
    methods: {
        scrollHandler(event){
            this.showProfileComponent = event;
        },
        getUser() {
            this.loading = true;
            
            Axios.get(`https://twitter-clone-eoi.herokuapp.com/twitter/users/user/${this.$route.params.user}`)
                .then(res => {
                    this.loading = false;
                    this.user = res.data;
                })
                .catch(() => {
                    this.loading = false;
                    this.$router.replace('/');
                });
        }
    },
    watch: {
        '$route'() {
            this.showProfileComponent = true;
            this.user = '';
            this.getUser();
        }
    },
    created() {
        if(!this.jwt) {
            this.$router.replace('/login');
        }
        this.getUser();
        
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
        SliderContainers,
        Loader
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