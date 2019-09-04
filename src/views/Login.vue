<template>
  <div class="login">
		<h1>Twitter clone</h1>
		<Nav/>
		<form>
			<label for="email">Email</label>
			<input id="email" type="email" v-model="form.email" placeholder="Email..." required>
			<label for="password">Password</label>
			<input id="password" type="password" v-model="form.password" placeholder="Password..." required>
			<h2 id="error" v-if="error.status" >{{error.message}}</h2>
			<button @click="login">Log in</button>
		</form>
  	</div>
</template>

<script>
import Nav from '../components/NavLogin'

export default {
	data() {
		return {
			form: {
				email: '',
				password: ''
			},
			error: {
				status: false,
				message: ''
			}
		}
	},
	methods: {
		login() {
			if(this.form.email == '' || this.form.password == ''){
				return
			}
			this.error.status = false;
			this.error.message = '';
			this.$axios.post('http://localhost:3001/twitter/login', this.form)
				.then(res => {
				localStorage.setItem('jwt', JSON.stringify(res.data))
				this.$router.replace('/');
				})
				.catch(err => {
					if(err.response.status == 400) {
						this.error.status = true;
						this.error.message = "Email or password wrong"
					}else if(err.response.status == 401) {
						this.error.status = true;
						this.error.message = "Connection error"
					}
				})
		}
	},
	components: {
		Nav
	}
}
</script>

<style lang="scss" scoped>

	$primary-color: #66A8A6;
	$dark-color: #26364F;
	$light-color: #F8F8F8;

	.login {
		padding-top: 70px;
	}

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