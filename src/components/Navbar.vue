<template>
    <div id="navbar">
        <router-link to="/" class="nav-icon">
            <img class="nav-icon" :src="getSrc(icons.home)" alt="Home icon">
        </router-link>
        <router-link to="/search" class="nav-icon">
            <img class="nav-icon" :src="getSrc(icons.search)" alt="Search icon">
        </router-link>
        <router-link :to="`/${username}`" class="nav-icon">
            <img class="nav-icon" :src="getSrc(icons.profile)" alt="Profile icon">
        </router-link>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            user: '',
            icons: {
                home: this.$route.name != 'home' ? 'home.svg' : 'home-fill.svg',
                search: this.$route.name != 'search' ? 'search.svg' : 'search-fill.svg',
                profile: this.$route.name == 'profile' && this.user == this.username ? 'profile-fill.svg' : 'profile.svg'
            }
        }
    },
    computed: {
        ...mapGetters('profile', [ 'username'])
    },
    methods: {
        getSrc(img) {
            return require('../assets/icons/' + img)
        }
    },
    watch: {
        '$route'() {
            this.user = this.$route.params.user;
        },
        user(){
            this.icons.profile = this.$route.name == 'profile' && this.user == this.username ? 'profile-fill.svg' : 'profile.svg'
        },
        username(){
            this.icons.profile = this.$route.name == 'profile' && this.user == this.username ? 'profile-fill.svg' : 'profile.svg'
        }
    },
    created() {
        if(!this.username){
            this.$store.dispatch('profile/getUser');
        }
        this.user = this.$route.params.user;
    }
}
</script>

<style lang="scss" scoped>

	$primary-color: #26364F;
	$secondary-color: #F8F8F8;

    #navbar {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 55px;
        padding: 10px 0;
        background-color: $primary-color;

        * {
            color: $secondary-color;
            text-decoration: none;
        }

    }
    
    .nav-icon {
        width: 24px;
        height: 24px;
    }
</style>