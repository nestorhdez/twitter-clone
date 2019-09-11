<template>
    <div class="tweet">
        <router-link :to="`/user/${tweet.owner}`" class="username">@{{tweet.owner}}</router-link>
        <p class="text">{{tweet.text}}</p>
        <div>
            <span class="date">{{dateFormated}}</span>
            <img @click="like" :src="getSrc(icon)" class="like" alt="Like icon">
        </div>
    </div>    
</template>

<script>

const moment = require('moment');

export default {
    name: 'tweet',
    props: {
        tweet: {
            text: String,
            owner: String,
            createdDate: Date,
            likes: Array
        }
    },
    data(){
        return {
            username: '',
            icon: this.tweet.likes.includes(this.username) ? 'like-fill.svg' : 'like.svg'
        }
    },
    methods: {
        getSrc(img) {
            return require('../assets/icons/' + img)
        },
        like() {
            this.icon == 'like.svg' ? this.icon = 'like-fill.svg' : this.icon = 'like.svg'
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

    .like {
        height: 20px;
        width: 20px;
        margin-left: auto;
    }
</style>