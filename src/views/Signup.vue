<template>
    <div class="signup">
        <h1>Twitter clone</h1>
        <Nav/>
        <h2 id="error" v-if="error.status" >{{error.message}}</h2>
        <form>
            <label for="name">Name</label>
            <input id="name" type="text" v-model="form.name" placeholder="Name..." pattern="[A-Za-z]{3,}">
            <label for="username">Username*</label>
            <input id="username" type="text" v-model="form.username" placeholder="Username..." required>
            <label for="email">Email*</label>
            <input id="email" type="email" v-model="form.email" placeholder="Email..." pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/" required>
            <label for="password">Password*</label>
            <input id="password" type="password" v-model="form.password" placeholder="One uppercase, one number and 7 min" pattern="/^(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/" required>
            <button @click="signup">Sign up</button>
        </form>
    </div>
</template>

<script>
import Nav from '../components/NavLogin'

export default {
data() {
    return {
        form: {
            name: '',
            username: '',
            email: '',
            password: ''
        },
      error: {
        status: false,
        message: ''
      }
    }
},
components: {
    Nav
},
methods: {
    signup() {
        this.error.status = false;
        this.error.message = '';
        if(this.form.username == '' || this.form.email == '' || this.form.password == ''){
            return;
        }
        if(this.form.name == ''){
            delete this.form.name;
        }
        this.$axios.post('http://localhost:3001/twitter/signup', this.form)
            .then(res => {
                localStorage.setItem('jwt', JSON.stringify(res.data))
                this.$router.replace('/');
            })
            .catch(error => {                
                this.error.status = true;
                const res = error.response.request.response;
                const msg = JSON.parse(res).errmsg
                if(msg.includes('duplicate') && msg.includes('email')) {
                    this.error.message = 'This email has already an account'
                }else if (msg.includes('duplicate') && msg.includes('username')) {
                    this.error.message = 'This username already exists'
                }
            })
    }
  }
}
</script>

<style lang="scss" scoped>
    .signup {
        padding-top: 70px;
        padding-bottom: 40px;
    }

    $primary-color: #66A8A6;
    $dark-color: #26364F;
    $light-color: #F8F8F8;

    #error {
        color: #F0825D;
        font-size: 1.2rem;
    }

    form {
        display: flex;
        flex-direction: column;
        padding: 20px;
        width: 85%;
        margin: 0 auto;
    }

    label {
        color: $light-color;
        text-align: left;
        font-size: 1.2rem;
        font-weight: 500;
    }

    input {
        background-color: $dark-color;
        border: none;
        border-bottom: 3px solid $light-color;
        padding: 10px;
        margin-bottom: 20px;
    }
    input, input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: $light-color;
        opacity: 1; /* Firefox */
    }

    /* Change the white to any color ;) */
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active  {
        -webkit-box-shadow: 0 0 0 30px $dark-color inset !important;
    }

    /*Change text in autofill textbox*/
    input:-webkit-autofill {
        -webkit-text-fill-color: $light-color !important;
    }

    button {
        font-size: 1.1rem;
        color: $dark-color; 
        background-color: $light-color;
        border: 1px solid $light-color;
        padding: 10px;
        margin-top: 30px;
        border-radius: 25px;
        transition-duration: .1s;
    }

    button:active {
        background-color: $dark-color;
        color: $light-color;
    }
</style>
