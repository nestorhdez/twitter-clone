<template>
    <div class="home">
        <h1>Home page</h1>
        <Navbar/>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'

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
    },
    components: {
        Navbar
    }
}
</script>