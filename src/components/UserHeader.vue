<template>
    <div id="header">
        <Modal @hide="hideModal" v-if="btnFollowers || btnFollwing" :arrayOfUsers="arrayOfUsers" :title="modalTitle"/>
        <h1 >@{{username}}</h1>
        <div id="followers-container">
            <span @click="showModal"><strong>Followers</strong> {{followers.length}}</span>
            <span @click="showModal"><strong>Following</strong> {{following.length}}</span>
        </div>
    </div>
</template>

<script>

import Modal from '../components/ModalHeader';

export default {
    name: 'user-header',
    props: {
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
        }
    },
    components: {
        Modal
    }
}
</script>

<style lang="scss" scoped>

    $primary-color: #26364F;
    $bg-color: #F8F8F8;
    
    #followers-container {
        margin-top: 15px;
        span:first-child {
            margin-right: 20px;
        }
        strong {
            margin-right: 10px;
        }
    }
</style>