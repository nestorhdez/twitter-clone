<template>

    <div id="modal">
        <div @click="$emit('hide')" id="hide">Close</div>
        <span id="modal-title">{{title}}</span>
        <div id="users-model-container">
            <UserComponent :user="user" :userLogged="userLogged" v-for="(user, i) in arrayOfUsers" :key="i"/>
        </div>
    </div>

</template>

<script>
import UserComponent from './User';

export default {
    name: 'modal',
    props: {
        userLogged: Object,
        title: String,
        arrayOfUsers: Array
    },
    components:{
        UserComponent
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
        cursor: default;
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
    }

    .user:nth-child(1) {
        border-top: 1px solid rgba(128, 128, 128, 0.52);
    }

</style>