<template>
    <div class="user">
        <router-link :to="`/${user}`">@{{user}}</router-link>
        <FollowBtn :userToCheck="user" :user="userLogged" v-if="user != userLogged.username"/>
    </div>    
</template>

<script>

import FollowBtn from './FollowBnt';

export default {
    name: 'user-component',
    props: {
        user: String,
        userLogged: Object
    },
    components: {
        FollowBtn
    }
}
</script>

<style lang="scss" scoped>

    $primary-color: #26364F;
    $light-color: #e6ecf0;

    .user {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 25px;
        border-bottom: 1px solid $light-color;
        
        a {
            display: block;
            text-decoration: none;
            color: $primary-color;
            font-weight: 500;
        }
    }

    @media (min-width: 650px) {
        .user{
            width: 50%;
            margin: 0 auto;
            border-right: 1px solid $light-color;
            border-left: 1px solid $light-color;
        }
    }

    @media (min-width: 1000px) {
        .user{
            width: 45%;
        }
    }

</style>