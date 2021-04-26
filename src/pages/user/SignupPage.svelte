<script lang="ts">
	import {Link} from 'svelte-routing';
	import Button from '../../components/buttons/Button.svelte';
	import Icon from '../../components/icons/Icon.svelte';

	import {showError, showInfo} from '../../components/notifications/notify';
	import type {IAuthStore} from '../../stores/auth/auth-store.interface';
	import {validateEmail} from '../../utils/validation';

	export let authStore: IAuthStore = null;

	let email = '';
	let pwd = '';
	let pwd2 = '';
	let code = '';

	let emailError: boolean;
	$: {
		emailError = !!email ? !validateEmail(email) : false;
	}

	let passwordError: boolean;
	$: {
		passwordError = (!!pwd || !!pwd2) ? (pwd.length < 8 || pwd !== pwd2) : false;
	}

	let codeError: boolean;
	$: {
		codeError = !!code ? code.length < 3 : false;
	}

	$: signupAllowed = !!email.trim() && !!pwd.trim() && !emailError && !passwordError;
	$: codeAllowed = !!email.trim() && !!code.trim() && !emailError && !codeError;

	const signUp = async () => {
		const result: any = await authStore.signUp(email, pwd);
		if (result.message) {
			showError(`Registration failed: ${result.message}`);
		} else {
			showInfo('Successful registration. Verification code was send to email provided.');
		}
	}

	const signUpVerify = async () => {
		const result: any = await authStore.confirmSignUp(email, code);
		if (result.message) {
			showError(`Confirmation failed: ${result.message}`);
		} else {
			showInfo('Successful registration. Now you can login with these credentials.');
		}
	}
</script>

<div class="app-page-signup">
	<h1>
		<Link to="/login" class="outlink">
			<Icon type="arrow-left" size="24px"/>
		</Link>
		Sign up
	</h1>

	<p>
		To be registered you need to provide valid e-mail address you have access to, and the credentials.
	</p>

	<p>
		Then we will send you a verification code you need to use within 15 minutes to confirm the email.
	</p>

	<hr/>

	<h3 class="highlight-mark">
		1. Please fill the form to register:
	</h3>

	<div class="form-group" class:error={emailError}>
		<label for="email">E-mail</label>
		<input
			type="email"
			placeholder="some@server.com"
			autocomplete="off"
			maxlength="128"
			autofocus
			required
			bind:value={email}
			id="email"/>
	</div>

	<div class="form-group" class:error={passwordError}>
		<label for="pwd">Password</label>
		<input
			type="password"
			autocomplete="off"
			maxlength="32"
			required
			bind:value={pwd}
			id="pwd"/>
	</div>

	<div class="form-group" class:error={passwordError}>
		<label for="pwd2">Confirm password</label>
		<input
			type="password"
			placeholder="at least 8 characters"
			autocomplete="off"
			maxlength="32"
			required
			bind:value={pwd2}
			id="pwd2"/>
	</div>

	<div class="form-group">
		<!--  svelte-ignore a11y-label-has-associated-control -->
		<label/>
		<Button
			disabled={!signupAllowed}
			type="ghost"
			onClick={signUp}>
			Register
		</Button>
	</div>

	<h3 class="highlight-mark">
		2. Confirm your e-mail:
	</h3>

	<div class="form">

		<div class="form-group" class:error={emailError}>
			<label for="email2">E-mail</label>
			<input
				type="email"
				placeholder="some@server.com"
				autocomplete="off"
				maxlength="128"
				required
				bind:value={email}
				id="email2"/>
		</div>

		<div class="form-group" class:error={codeError}>
			<label for="code">Verification code</label>
			<input
				autocomplete="off"
				maxlength="32"
				required
				bind:value={code}
				id="code"/>
		</div>

		<div class="form-group">
			<!--  svelte-ignore a11y-label-has-associated-control -->
			<label/>
			<Button
				disabled={!codeAllowed}
				onClick={signUpVerify}>
				Confirm & Sign in
			</Button>
		</div>
	</div>

	<p class="return-to-login">
		<Link to="login">&larr; Back to login page</Link>
	</p>
</div>

<style lang="less">
	.app-page-signup {
		max-width: 500px;
		margin: 0 auto;
	}
</style>
