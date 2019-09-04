<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

$dark-color: #26364F;
$light-color: #F8F8F8;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: $dark-color;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $light-color;
}
</style>
