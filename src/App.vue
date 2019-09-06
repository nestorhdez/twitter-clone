<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

$primary-color: #F8F8F8;
$secondary-color: #26364F;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: $primary-color;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $secondary-color;
}
</style>
