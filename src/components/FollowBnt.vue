<template>
    <button id="follow-btn" @click="followUnfollowAction">{{btnText}}</button>    
</template>

<script>
import Axios from '../interceptors';


export default {
    name: 'follow-btn',
    props: {
        userToCheck: String,
        user: Object
    },
    computed: {
        btnText(){
            return this.user.following.find(followingUser => followingUser == this.userToCheck) ? 'Unfollow' : 'Follow';
        }
    },
    methods: {
        followUnfollowAction(e){
            const btn = e.target.innerText.toLowerCase();
            Axios.patch(`https://twitter-clone-eoi.herokuapp.com/twitter/users/${btn}/${this.userToCheck}`)
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
        width: 65px;
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