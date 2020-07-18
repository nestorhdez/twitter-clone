<template>
	<div class="login">
		<h1>Twitter clone</h1>
		<Nav/>
		<h2 id="error" v-if="error.status" >{{error.message}}</h2>
		<form>
			<label for="email">Email</label>
			<input id="email" type="email" v-model="form.email" placeholder="Email..." required>
			<label for="password">Password</label>
			<input id="password" type="password" v-model="form.password" placeholder="Password..." required>
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
			},
            jwt: localStorage.getItem('jwt')
		}
	},
	methods: {
		async login() {
			if(this.form.email == '' || this.form.password == ''){
				return;
			}

			this.error.status = false;
			this.error.message = '';

			try {
				const { data } = await this.$axios.post('https://twitter-clone-eoi.herokuapp.com/twitter/login', this.form);
				localStorage.setItem('jwt', JSON.stringify(data) );
				this.$router.replace('/');
			} catch({ response: err }) {
				this.error.status = true;
				this.error.message = err ? "Wrong email or password" : "Connection error";
			}
		}
	},
	components: {
		Nav
	},
	created(){
		if(this.jwt){
			this.$router.replace('/');
		}
	}
}
</script>

<style lang="scss" scoped>

	$primary-color: #F8F8F8;
	$secondary-color: #26364F;

	.login {
		padding-top: 70px;
	}

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
		.login {
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
		h2 {
			margin-bottom: 20px;
		}
		button {
			flex-basis: 30%;
			margin: 0 auto;
		}
	}

</style>