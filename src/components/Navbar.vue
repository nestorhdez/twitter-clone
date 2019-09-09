<template>
    <div id="navbar">
        <router-link to="/" class="nav-icon">
            <img class="nav-icon" :src="getSrc(icons.home)" alt="Home icon">
        </router-link>
        <router-link to="/search" class="nav-icon">
            <img class="nav-icon" :src="getSrc(icons.search)" alt="Search icon">
        </router-link>
        <router-link :to="`/user/${user.username}`" class="nav-icon">
            <img class="nav-icon" :src="getSrc(icons.profile)" alt="Profile icon">
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                username: ''
            },
            icons: {
                home: this.$route.name != 'home' ? 'home.svg' : 'home-fill.svg',
                search: this.$route.name != 'search' ? 'search.svg' : 'search-fill.svg',
                profile: this.$route.name != 'profile' ? 'profile.svg' : 'profile-fill.svg'
            }
        }
    },
    methods: {
        getSrc(img) {
            return require('../assets/icons/' + img)
        }
    },
    watch: {
        '$route'() {
            this.$route.name != 'home' ? this.icons.home = 'home.svg' : this.icons.home = 'home-fill.svg';
            this.$route.name != 'search' ? this.icons.search = 'search.svg' : this.icons.search = 'search-fill.svg';
            this.$route.name != 'profile' ? this.icons.profile = 'profile.svg' : this.icons.profile = 'profile-fill.svg';
        }
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