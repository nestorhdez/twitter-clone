<template>

    <div id="modal">
        <div @click="() => this.$emit('hide')" id="hide">Close</div>
        <span id="modal-title">{{title}}</span>
        <div id="users-model-container">
            <div class="user" v-for="(user, i) in arrayOfUsers" :key="i">
                <router-link :to="`/user/${user}`">@{{user}}</router-link>
                <button>{{buttonText(user)}}</button>
            </div>
        </div>
    </div>

</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'modal',
    props: {
        username: String,
        title: String,
        arrayOfUsers: Array
    },
    computed: {
        ...mapState('profile', ['user'])
    },
    methods: {
        buttonText(user) {
            return this.user.following.find(followingUser => followingUser == user) ? 'Unfollow' : 'Follow';            
        }
    }
}
</script>

<style lang="scss" scoped>

    $primary-color: #26364F;
    $bg-color: #F8F8F8;

    #modal {
        width: 100vw;
        height: 100vh;
        overflow-y: scroll;
        padding: 50px 0;
    }

    #hide {
        display: inline;
        position: absolute;
        top: 15px;
        left: 15px;
        font-weight: 500;
    }

    #modal-title {
        display: block;
        font-size: 2rem;
        margin-bottom: 25px;
    }

    .user {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 50px;
        border-bottom: 1px solid rgba(128, 128, 128, 0.52);
        
        a {
            display: block;
            text-decoration: none;
            color: $primary-color;
            font-weight: 500;
        }

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
    }

    .user:nth-child(1) {
        border-top: 1px solid rgba(128, 128, 128, 0.52);
    }

</style>