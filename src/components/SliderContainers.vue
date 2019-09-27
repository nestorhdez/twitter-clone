<template>
    <div id="tweets-container" :class="cssScroll.container">
        <div id="tweets" v-if="username">
            <h2 id="error" v-if="tweets.error.status">{{tweets.error.message}}</h2>
            <Tweet :tweet="tweet" :username="username" v-for="(tweet, i) in tweets.array" :key="i"/>
        </div>
        <div id="likes" v-if="username">
            <h2 id="error" v-if="likes.error.status">{{likes.error.message}}</h2>
            <Tweet :tweet="tweet" :username="username" v-for="(tweet, i) in likes.array" :key="i"/>
        </div>
    </div>
</template>

<script>
import Axios from '../interceptors';
import eventBus from '../main';
import Tweet from '../components/Tweet';
import { mapGetters } from 'vuex';

export default {
    name: 'slider-containers',
    props: {
        selected: Object,
        cssScroll: {
            containers: String
        }
    },
    data(){
        return{
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
        }
    },
    computed: mapGetters('profile', [
        'username'
    ]),
    methods: {
        getFromApi(endPoint, obj){
            obj.error.status = false;
            Axios.get(`http://localhost:3001/twitter/tweets/${endPoint}`)
                .then(res => {
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
    created(){
        this.getTweets();
        eventBus.$on('slider', this.slider)
    },
    components: {
        Tweet
    }
}
</script>

<style lang="scss" scoped>
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