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
                Axios.patch(`http://localhost:3001/twitter/tweets/like/${this.tweet._id}`)
                    .then(() => {
                        this.icon = 'like-fill.svg';
                        this.tweet.likes.push(1);
                    })
                    .catch(() => {});
            }else {
                Axios.patch(`http://localhost:3001/twitter/tweets/dislike/${this.tweet._id}`)
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

    .tweet {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-bottom: 1px solid #26364f;
        padding: 10px;

        div {
            display: flex;
            width: 100%;
        }
    }

    .username {
        text-decoration: none;
        color: #26364f;
        font-weight: 500;
    }

    .text {
        margin: 10px 0;
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

</style>