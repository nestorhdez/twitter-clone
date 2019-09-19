<template>
    <div id="profile">
        <h1 v-if="username">@{{username}}</h1>
        <div id="nav" :class="style.nav">
            <button :class="tweets.selected ? 'selected' : '' " @click="(e) =>{getTweets(); slider(e, '-')}">Tweets</button>
            <button :class="likes.selected ? 'selected' : '' " @click="(e) => {getLikes(); slider(e, '+')}">Likes</button>
        </div>
        <div id="tweets-container" :class="style.container">
            <div id="tweets">
		        <h2 id="error" v-if="tweets.error.status">{{tweets.error.message}}</h2>
                <Tweet :tweet="tweet" :username="username" v-for="(tweet, i) in tweets.array" :key="i"/>
            </div>
            <div id="likes">
        		<h2 id="error" v-if="likes.error.status">{{likes.error.message}}</h2>
                <Tweet :tweet="tweet" :username="username" v-for="(tweet, i) in likes.array" :key="i"/>
            </div>
        </div>
        <Navbar/>
    </div>
</template>

<script>

import Tweet from '../components/Tweet';
import Navbar from '../components/Navbar';
import Axios from '../interceptors';

export default {
    name: 'profile',
    data() {
        return {
            jwt: localStorage.getItem('jwt'),
            username: '',
            tweets: {
                array: [],
                error: {
				    status: false,
				    message: ''
                },
                selected: true
            },
            likes: {
                array: [],
                error: {
				    status: false,
				    message: ''
                },
                selected: false
            },
            style: {
                nav: '',
                container: ''
            }
        }
    },
    methods:{
        getFromApi(endPoint, obj){
            obj.error.status = false;
            Axios.get(`http://localhost:3001/twitter/tweets/${endPoint}`)
                .then(res => {
                    this.username = res.data.username;
                    if(res.data.data.length > 0) {
                        obj.array = res.data.data;
                    }else {
                        obj.error.status = true;
                        obj.error.message = 'There is no tweets to show'
                    }
                })
                .catch(() => {
                    obj.error.status = true;
                    obj.error.message = 'Something wrong happend';
                })
        },
        getTweets(){
            this.getFromApi('user', this.tweets);
        },
        getLikes(){
            this.getFromApi('likes', this.likes);
        },
        slider(e, xCoord){
            let btn = e.target.innerText.toLowerCase();
            if(btn == 'tweets') {
                this.tweets.selected = true;
                this.likes.selected = false;
            } else {
                this.tweets.selected = false;
                this.likes.selected = true;
            }
            let width = document.getElementById('tweets-container').offsetWidth;
            document.getElementById('tweets-container').scrollBy({left: xCoord + width, behavior: 'smooth'});
        }
    },
    created() {
        if(!this.jwt) {
            this.$router.replace('/login')
        }else {
            this.getTweets();
            window.onscroll = () => {
                if(document.documentElement.scrollTop > 97){
                    this.style.nav = 'nav-fixed';
                    this.style.container = 'container-mt';
                }else{
                    this.style.nav = '';
                    this.style.container = '';
                }
            };
        }
    },
    components: {
        Tweet,
        Navbar
    }
}
</script>

<style lang="scss" scoped>

$primary-color: #26364F;
$bg-color: #F8F8F8;

#profile {
    margin-top: 40px;
}

#nav {
    padding-top: 30px;
    display: flex;
    border-bottom: 3px solid $primary-color;
}

#nav.nav-fixed {
    position: fixed;
    top: 0;
    width: 100%;
    padding-top: 15px;
    background-color: $bg-color;
}

#nav button {
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

#nav .selected {
    border-bottom: 3px solid $primary-color;
}

.container-mt {
    margin-top: 60px;
}

#tweets-container {
    display: flex;
    overflow-x: hidden;
    margin-bottom: 54px;
}

#tweets, #likes {
    flex: 0 0 100%;
}

#error {
    margin-top: calc(50vh - 103px);
    color: #F0825D;
    font-size: 1.2rem;
}

</style>