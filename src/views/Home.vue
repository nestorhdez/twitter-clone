<template>
    <div class="home" v-if="username">
		<h2 id="error" v-if="error.status" >{{error.message}}</h2>
        <Tweet :tweet="tweet" :username="username" v-for="(tweet, i) in tweets" :key="i"/>
        <Navbar/>
    </div>
</template>

<script>
import Tweet from '../components/Tweet';
import Navbar from '../components/Navbar';
import Axios from '../interceptors';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            jwt: localStorage.getItem('jwt'),
            tweets: [],
            error: {
				status: false,
				message: ''
			}
        }
    },
    computed: mapState({
        username: state => state.profile.user.username,
    }),
    created(){
        if(!this.jwt) {
            this.$router.replace('/login')
        }
        if(!this.username){
            this.$store.dispatch('profile/getUser');
        }
        this.error.status = false;
        Axios.get('http://localhost:3001/twitter/tweets/timeline')
            .then(res => {
                if(res.data.data.length > 0) {
                    this.tweets = res.data.data;
                }else {
                    this.error.status = true;
                    this.error.message = 'There is no tweets to show'
                }
            })
            .catch(() => {
                this.error.status = true;
                this.error.message = 'Something wrong happend';
            })
    },
    components: {
        Tweet,
        Navbar
    }
}
</script>

<style lang="scss" scoped>
    .home {
        padding-bottom: 55px;
    }
    #error {
        margin-top: calc(50vh - 55px);
		color: #F0825D;
		font-size: 1.2rem;
	}
</style>