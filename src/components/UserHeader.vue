<template>
    <div id="header">
        <Modal @hide="hideModal" v-if="btnFollowers || btnFollwing" :arrayOfUsers="arrayOfUsers" :userLogged="userLogged" :title="modalTitle"/>
        <BtnFollow :userToCheck="username" :user="userLogged" v-if="userLogged.username != username && !btnFollowers && !btnFollwing"/>
        <button @click="logOut" class="log-out btn" v-else>Log out</button>
        <h1 >@{{username}}</h1>
        <div id="followers-container">
            <span @click="showModal"><strong>Followers</strong> {{followers.length}}</span>
            <span @click="showModal"><strong>Following</strong> {{following.length}}</span>
        </div>
    </div>
</template>

<script>

import Modal from '../components/ModalHeader';
import BtnFollow from '../components/FollowBnt';

export default {
    name: 'user-header',
    props: {
        userLogged: Object,
        username: String,
        followers: Array,
        following: Array
    },
    data() {
        return {
            btnFollowers: false,
            btnFollwing: false
        }
    },
    computed: {
        arrayOfUsers(){
            return this.btnFollowers ? this.followers : this.following;
        },
        modalTitle(){
            return this.btnFollowers ? 'Followers' : 'Following';
        }
    },
    methods: {
        hideModal(){
            this.$emit('scroll', true);
            this.btnFollowers = false;
            this.btnFollwing = false;
        },
        showModal(e) {
            this.$emit('scroll', false);
            if(e.target.innerText.startsWith('Followers')) {
                this.btnFollowers = true;
                this.btnFollwing = false;
            }else {
                this.btnFollowers = false;
                this.btnFollwing = true;
            }
        },
        logOut(){
            localStorage.removeItem('jwt');
            this.$router.replace('/login');
        }
    },
    components: {
        Modal,
        BtnFollow
    }
}
</script>

<style lang="scss" scoped>

    $primary-color: #26364F;
    $bg-color: #F8F8F8;

    #follow-btn, .log-out {
        position: absolute;
        top: 15px;
        right: 15px;
    }

    .btn {
        background-color: #26364F;
        color: #F8F8F8;
        padding: 5px;
        width: 65px;
        border-radius: 3px;
        border: none;
        font-weight: 500;
        outline: none;
    }
    
    #followers-container {
        margin-top: 15px;
        span:first-child {
            margin-right: 20px;
        }
        strong {
            margin-right: 10px;
        }
    }

    span{
        cursor: default;
    }

    @media (min-width: 768px) {
        #follow-btn, .log-out {
            right: 25vw;
        }
    }
</style>