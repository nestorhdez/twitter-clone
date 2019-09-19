<template>
    <div id="nav">
        <router-link to="/login">Log in</router-link>
        <router-link to="/signup">Sign up</router-link>
    </div>
</template>

<script>
export default {
    name: 'navlogin'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

$primary-color: #26364F;

#nav {
    padding-top: 30px;
    margin-bottom: 30px;
    display: flex;
    border-bottom: 3px solid $primary-color;
}

#nav a {
    font-weight: bold;
    color: $primary-color;
    display: inline-block;
    width: 50vw;
    text-decoration: none;
    padding-bottom: 5px;
}

#nav a.router-link-exact-active {
    color: $primary-color;
    border-bottom: 6px solid $primary-color;
}
</style>
