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
            <input id="email" type="email" v-model="form.email" placeholder="Email..." required>
            <label for="password">Password*<span>One lower case, one number and seven characters minimum.</span></label>
            <input id="password" type="password" v-model="form.password" placeholder="Password..." pattern="/^(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/" required>
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
        },
        jwt: localStorage.getItem('jwt')
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
        this.$axios.post('https://twitter-clone-eoi.herokuapp.com/twitter/signup', this.form)
            .then(res => {
                localStorage.setItem('jwt', JSON.stringify(res.data))
                this.$router.replace('/');
            })
            .catch(err => {
                this.error.status = true;
                if(err.request.status != 400){
                    this.error.message = 'Conection error';
                    return;
                }
                const res = err.response.request.response;
                const msg = JSON.parse(res).errmsg;
                if(msg && msg.includes('duplicate') && msg.includes('email')) {
                    this.error.message = 'This email has already an account';
                }else if (msg && msg.includes('duplicate') && msg.includes('username')) {
                    this.error.message = 'This username already exists';
                }
            });
    }
  },
  created(){
      if(this.jwt){
          this.$router.replace('/');
      }
  }
}
</script>

<style lang="scss" scoped>
    .signup {
        padding-top: 70px;
        padding-bottom: 40px;
    }

    $primary-color: #F8F8F8;
    $secondary-color: #26364F;

    #error {
        color: #F0825D;
        font-size: 1.2rem;
    }

    form {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
		width: 85%;
		margin: 0 auto;
	}

	form * {
		flex-basis: 100%;
	}

    label {
        color: $secondary-color;
        text-align: left;
        font-size: 1.2rem;
        font-weight: 500;
    }

    label span {
        font-size: .8rem;
        display: block;
        padding-right: 50px;
        margin-bottom: 10px;
    }

    input {
        background-color: $primary-color;
        border: none;
        border-bottom: 3px solid $secondary-color;
        padding: 10px;
        margin-bottom: 20px;
        outline: none;
    }
    input, input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: $secondary-color;
        opacity: 1; /* Firefox */
    }

    /* Change the white to any color ;) */
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active  {
        -webkit-box-shadow: 0 0 0 30px $primary-color inset !important;
    }

    /*Change text in autofill textbox*/
    input:-webkit-autofill {
        -webkit-text-fill-color: $secondary-color !important;
    }

    button {
        font-size: 1.1rem;
        color: $primary-color; 
        background-color: $secondary-color;
        border: 1px solid $secondary-color;
        padding: 10px;
        margin-top: 30px;
        border-radius: 25px;
        transition-duration: .1s;
    }

    button:active {
        background-color: $primary-color;
        color: $secondary-color;
    }

    @media(min-width: 768px){
		.signup {
			width: 436px;
			margin: 0 auto;
		}
		form {
			margin: 0;
			padding: 0;
			width: 100%;
		}
		form * {
			flex-basis: 50%;
		}
		label {
			padding-top: 6px;
		}

        label span {
            margin-bottom: 0;
        }
        h2 {
			margin-bottom: 20px;
		}
		form button {
			flex-basis: 30%;
			margin: 15px auto 0;
		}
	}
</style>
