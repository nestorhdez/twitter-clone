<template>
    <div id="search">
        <div id="search-container">
            <input type="text" v-model="searchInput" id="search-input" placeholder="Search users and tweets">
            <button id="search-button">Search</button>
        </div>
        <div id="search-container"></div>
        <Navbar/>    
    </div>
</template>

<script>
import Navbar from '../components/Navbar';

export default {
    name: 'search',
    data(){
        return {
            searchInput: ''
        }
    },
    components: {
        Navbar
    }
}
</script>

<style lang="scss" scoped>
    #search {
        padding: 120px 0;
    }
    #search-input {
        padding: 10px;
        width: 80%;
        border-radius: 4px;
        font-size: 1rem;
        border-width: 2px;
        border-style: inset;
        border-color: initial;
    }

    #search-button {
        display: flex;
        align-items: center;
        padding: 10px 30px;
        height: 42px;
        border-width: 2px;
        border-style: inset;
        border-color: initial;
        margin-left: 20px;
        font-size: 0.8rem;
        border-radius: 4px;
        display: none;
    }

    @media (min-width: 768px) {
        #search-container {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #search-input {
            width: 40%;
        }
        #search-button {
            display: block;
        }
    }
</style>