<template>
    <div id="search" :style="search.status ? 'padding-top: 70px' : ''">
        <div id="search-container" :class="search.status ? 'container-fixed' : ''">
            <h1 :class="search.status ? 'd-none' : ''">Search</h1>
            <input type="text" @keyup.enter="getSearch" v-model="search.text" id="search-input" placeholder="Search users and tweets"
                :class="search.status ? 'input-fixed' : ''">
            <button id="search-button" @click="getSearch" :class="search.status ? 'btn-fixed' : ''">Search</button>
        </div>
        <div id="results-container">
            <h2 id="error" v-if="error.status">No results</h2>
            <UserComponent :user="user.username" :userLogged="userLogged" v-for="(user, i) in users" :key="`user-${i}`"/>
            <Tweet :tweet="tweet" :username="userLogged.username" v-for="(tweet, i) in tweets" :key="`tweet-${i}`"/>
        </div>
        <Navbar/>    
    </div>
</template>

<script>

import UserComponent from '../components/User';
import Tweet from '../components/Tweet';
import Navbar from '../components/Navbar';
import Axios from '../interceptors';
import { mapState } from 'vuex';


export default {
    name: 'search',
    data(){
        return {
            search: {
                status: false,
                text: ''
            },
            users: [],
            tweets: [],
            error: {
                status: false
            }
        }
    },
    methods: {
        getSearch(){
            if (this.search.text) {
                this.error.status = false;
                Axios.get(`https://twitter-clone-eoi.herokuapp.com/twitter/search?search=${this.search.text}`)
                    .then(res => {
                        this.users = res.data.users;
                        this.tweets = res.data.tweets;
                        if (this.users.length == 0 && this.tweets.length == 0) {
                            this.error.status = true;
                            this.search.status = false;
                        }else{
                            this.search.status = true;
                        }
                    })
                    .catch( () => {
                        this.error.status = true;
                        this.search.status = false;
                    });
            }else {
                this.error.status = false;
                this.search.status = false;
                this.users = [];
                this.tweets = [];
            }
        }
    },
    computed: {
        ...mapState('profile', { userLogged: 'user' })
    },
    components: {
        UserComponent,
        Tweet,
        Navbar
    }
}
</script>

<style lang="scss" scoped>

    $primary-color: #26364F;
    $primary-light: #3a5073;
    $bg-color: #F8F8F8;
    $error: #F0825D;

    #search {
        padding: 120px 0 55px;
    }

    h1 {
        margin-bottom: 30px;
    }

    #search-input {
        padding: 10px;
        width: 80%;
        border-radius: 4px;
        font-size: 1rem;
        border-width: 1px;
        border-style: inset;
        border-color: initial;
        outline: none;
    }

    #search-button {
        width: 80%;
        padding: 10px 30px;
        height: 42px;
        margin-top: 20px;
        font-size: 1rem;
        border: none;
        border-radius: 4px;
        outline: none;
        background-color: $primary-color;
        color: $bg-color;
    }

    #search-button:active {
        background-color: $primary-light;
    }

    #error {
        margin-top: 50px;
		color: $error;
		font-size: 1.2rem;
	}

    #search-container.container-fixed {
        position: fixed;
        background-color: $bg-color;
        box-shadow: 0px -2px 6px 1px rgba(0, 0, 0, .8);
        width: 100%;
        top: 0;
        padding: 10px;
    }

    #search-input.input-fixed {
        width: 60%;
        margin-right: 15px;
    }

    #search-button.btn-fixed {
        width: 20%;
        padding: 10px;
        margin-top: 0;
    }

    .d-none {
        display: none;
    }

    @media (min-width: 768px) {
        #search-container {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }

        h1 {
            flex-basis: 100%;
        }

        #search-input {
            width: 40%;
        }
        #search-button {
            margin-top: 0;
            margin-left: 20px;
            width: auto;
        }
    }
</style>