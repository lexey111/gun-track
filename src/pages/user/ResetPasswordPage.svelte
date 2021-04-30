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

	let sendResetCodeAllowed: boolean;
	$: sendResetCodeAllowed = !!email.trim() && !emailError;
	let newPasswordAllowed: boolean;
	$: newPasswordAllowed = !!email.trim() && !!code.trim() && !!pwd.trim() && !emailError && !codeError && !passwordError;

	const sendResetCode = async () => {
		const result: any = await authStore.forgotPassword(email);
		if (result?.message) {
			showError(`Sending code failed: ${result.message}`);
		} else {
			showInfo('Reset code was send to the email provided.');
		}
	}

	const sendResetCodeConfirm = async () => {
		const result: any = await authStore.confirmForgotPassword(email, code, pwd);
		if (result?.message) {
			showError(`Confirmation failed: ${result.message}`);
		} else {
			showInfo('Password updated. Now you can login with these credentials.');
		}
	}
</script>

<div class="app-page-reset">
	<h1>
		<Link to="/login" class="outlink">
			<Icon type="arrow-left" size="24px"/>
		</Link>
		Reset password
	</h1>

	<p>
		You need to request the reset code first. We will send it to the email provided.
	</p>

	<p>
		Then you need to enter the code sent, and new password.
	</p>

	<hr/>

	<h3 class="highlight-mark">
		1. Request reset code
	</h3>

	<div class="form-group" class:error={emailError}>
		<label for="email">E-mail</label>
		<input
			type="email"
			placeholder="some@server.com"
			autocomplete="off"
			maxlength="128"
			required
			bind:value={email}
			id="email"/>
	</div>

	<div class="form-group button-row">
		<!--  svelte-ignore a11y-label-has-associated-control -->
		<label/>
		<Button
			disabled={!sendResetCodeAllowed}
			type="ghost"
			onClick={sendResetCode}>
			Get password reset code
		</Button>
	</div>

	<h3 class="highlight-mark">2. Enter the code and new password</h3>

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
		<label for="code">Code</label>
		<input
			type="text"
			autocomplete="off"
			maxlength="32"
			required
			bind:value={code}
			id="code"/>
	</div>

	<div class="form-group" class:error={passwordError}>
		<label for="pwd">New password</label>
		<input
			type="password"
			placeholder="at least 8 characters"
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
			autocomplete="off"
			maxlength="32"
			required
			bind:value={pwd2}
			id="pwd2"/>
	</div>

	<div class="form-group button-row">
		<!--  svelte-ignore a11y-label-has-associated-control -->
		<label/>
		<Button
			disabled={!newPasswordAllowed}
			onClick={sendResetCodeConfirm}>
			Change password
		</Button>
	</div>

	<p class="return-to-login">
		<Link to="login">&larr; Back to login page</Link>
	</p>
</div>

<style lang="less">
	.app-page-reset {
		max-width: 500px;
		margin: 0 auto;
	}
</style>
