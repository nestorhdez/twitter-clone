<template>
  <div id="loader">
     <div class="loader"></div> 
  </div>
</template>

<style lang="scss" scoped>

  $secondary-color: #A2A4A8;
  $light-color: #e6ecf0;

  #loader {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .loader {
    border: 8px solid #fff;
    border-top-color: rgb(255, 255, 255);
    border-top-style: solid;
    border-top-width: 8px;
    border-top: 8px solid #26364f;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    -webkit-animation: spin-data-v-04a0d67a 1.4s linear infinite;
    animation: spin-data-v-04a0d67a 1.4s linear infinite;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.4);
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

</style>