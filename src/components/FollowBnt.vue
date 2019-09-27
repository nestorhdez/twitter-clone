<template>
    <button @click="followUnfollowAction">{{btnText}}</button>    
</template>

<script>
import { mapState } from 'vuex';
import Axios from '../interceptors';


export default {
    name: 'follow-btn',
    props: {
        userToCheck: String
    },
    computed: {
        ...mapState('profile', ['user']),
        btnText(){
            return this.user.following.find(followingUser => followingUser == this.userToCheck) ? 'Unfollow' : 'Follow';
        }
    },
    methods: {
        buttonText(userToCheck) {
            return this.user.following.find(followingUser => followingUser == userToCheck) ? 'Unfollow' : 'Follow';
        },
        followUnfollowAction(e){
            const btn = e.target.innerText.toLowerCase();
            Axios.patch(`http://localhost:3001/twitter/users/${btn}/${this.userToCheck}`)
                .then(() => {
                    let index = this.user.following.findIndex(username => username == this.userToCheck)
                    index != -1 ? this.user.following.splice(index, 1) : this.user.following.push(this.userToCheck);
                })
        }
    }
}
</script>

<style lang="scss" scoped>

    $primary-color: #26364F;
    $bg-color: #F8F8F8;
    
    button {
        background-color: $primary-color;
        color: $bg-color;
        padding: 5px;
        border-radius: 3px;
        border: none;
        font-weight: 500;
        outline: none;
    }
    button:active {
        background-color: $bg-color;
        color: $primary-color;
    }
</style>