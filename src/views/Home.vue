<template>
    <div class="home">
        <h1>Home page</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            jwt: localStorage.getItem('jwt')
        }
    },
    created(){
        if(!this.jwt) {
            this.$router.replace('/login')
        }
    }
}
</script>