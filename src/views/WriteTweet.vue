<template>
    <div id="write-tweet">
        <div class="nav">
            <span id="close" @click="$router.go(-1)">Close</span>
            <span>@{{username}}</span>
            <button @click="postTweet">Tweet</button>
        </div>
        <div id="tweet">
            <span id="error" v-if="error">Something wrong happend. Try it again.</span>
            <textarea v-bind:value="text" v-on:input="text = $event.target.value" cols="30" rows="5" maxlength="150" placeholder="What's new?"></textarea>
            <span>{{text.length}} / 150</span>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import Axios from '../interceptors';

export default {
    name: 'write-tweet',
    data() {
        return {
            text: '',
            error: false
        }
    },
    computed: {
        ...mapGetters('profile', ['username'])
    },
    methods: {
        postTweet() {
            this.error = false;
            if(this.text){
                Axios.post('https://twitter-clone-eoi.herokuapp.com/twitter/tweets', { text: this.text, owner: this.username })
                    .then(() => this.$router.go(-1))
                    .catch(() => this.error = true);
            }
        }
    },
    created(){
        if(!this.username){
            this.$store.dispatch('profile/getUser');
        }
    }
}
</script>

<style lang="scss" scoped>

    $primary-color: #26364F;

    .nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        margin-bottom: 10px;
        box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.3);

        #close{
            cursor: default;
        }

        button{
            color: $primary-color;
            font-size: 1rem;
            border: none;
            padding: 2px 5px;
            background: none;
            outline: none;
        }

    }

    textarea{
        width: 100%;
        padding: 10px 15px;
        color: $primary-color;
        font-size: 1rem;
        outline: none;
        background-color: #f8f8f8;
        border: none;
        resize: none;
    }

    #error{
        font-weight: 500;
        color: #F0825D;
        margin: 10px 0;
        display: inline-block;
    }
    
    @media (min-width: 768px){
        
        .nav{
            justify-content: space-around;
        }
            
        #tweet{
            width: 60%;
            margin: 60px auto;
        }
    }


</style>