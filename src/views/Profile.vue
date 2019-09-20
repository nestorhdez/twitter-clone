<template>
    <div id="profile">
        <h1 v-if="username">@{{username}}</h1>
        <Slider :cssScroll="cssScroll" @slider="slider"/>
        <div id="tweets-container" :class="cssScroll.container">
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
import Slider from '../components/Slider';
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
            },
            likes: {
                array: [],
                error: {
				    status: false,
				    message: ''
                },
            },
            cssScroll: {
                slider: '',
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
        slider(selected, xCoord){
            selected == 'tweets' ? this.getTweets() : this.getLikes();
            let width = document.getElementById('tweets-container').offsetWidth;
            document.getElementById('tweets-container').scrollBy({left: xCoord + width, behavior: 'smooth'});
        }
    },
    created() {
        if(!this.jwt) {
            this.$router.replace('/login')
        }
        this.getTweets();
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
        Tweet,
        Navbar,
        Slider
    }
}
</script>

<style lang="scss" scoped>

$primary-color: #26364F;
$bg-color: #F8F8F8;

#profile {
    margin-top: 40px;
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