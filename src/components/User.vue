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
    }

    @media (min-width: 768px) {
        .user{
            width: 50%;
            margin: 0 auto;
            border-right: 1px solid $primary-color;
            border-left: 1px solid $primary-color;
        }
    }

</style>