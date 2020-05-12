<template>
    <div class="tweet">
        <router-link :to="`/${tweet.owner}`" class="username">@{{tweet.owner}}</router-link>
        <p class="text">{{tweet.text}}</p>
        <div>
            <span class="date">{{dateFormated}}</span>
            <span class="num-likes">{{tweet.likes.length}}</span>
            <img @click="like" :src="getSrc(icon)" class="like" alt="Like icon">
        </div>
    </div>    
</template>

<script>

import Axios from '../interceptors';

const moment = require('moment');

export default {
    name: 'tweet',
    props: {
        tweet: {
            text: String,
            owner: String,
            createdDate: Date,
            likes: Array,
            _id: String
        },
        username: String
    },
    data(){
        return {
            icon: this.tweet.likes.includes(this.username) ? 'like-fill.svg' : 'like.svg'
        }
    },
    methods: {
        getSrc(img) {
            return require('../assets/icons/' + img)
        },
        like() {
            if(this.icon == 'like.svg') {
                Axios.patch(`https://twitter-clone-eoi.herokuapp.com/twitter/tweets/like/${this.tweet._id}`)
                    .then(() => {
                        this.icon = 'like-fill.svg';
                        this.tweet.likes.push(1);
                    })
                    .catch(() => {});
            }else {
                Axios.patch(`https://twitter-clone-eoi.herokuapp.com/twitter/tweets/dislike/${this.tweet._id}`)
                    .then(() => {
                        this.icon = 'like.svg'
                        this.tweet.likes.pop();
                    })
                    .catch(() => {});
            }
        },
        moment() {
            return moment();
        }
    },
    computed: {
        dateFormated() {
            return moment(this.tweet.createdDate).format('DD MMM YY')
        }
    }
}

</script>

<style lang="scss" scoped>

    $primary-color: #26364f;

    .tweet {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-color: $primary-color;
        border-bottom: 1px solid;
        padding: 10px;

        div {
            display: flex;
            width: 100%;
        }
    }

    .username {
        text-decoration: none;
        color: $primary-color;
        font-weight: 500;
    }

    .text {
        margin: 15px 0;
        text-align: left;
    }

    .date {
        font-size: small;
    }

    .num-likes {
        margin-left: auto;
        margin-right: 5px;
    }

    .like {
        height: 20px;
        width: 20px;
    }

    @media (min-width: 768px) {
        .tweet{
            width: 50%;
            margin: 0 auto;
            border-right: 1px solid;
            border-left: 1px solid;
        }
    }

</style>