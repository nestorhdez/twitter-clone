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

$light-color: #F8F8F8;

#nav {
  padding-top: 30px;
  margin-bottom: 30px;
  display: flex;
  border-bottom: 3px solid $light-color;
}

#nav a {
  font-weight: bold;
  color: $light-color;
  display: inline-block;
  width: 50vh;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: $light-color;
  border-bottom: 6px solid $light-color;
}
</style>
