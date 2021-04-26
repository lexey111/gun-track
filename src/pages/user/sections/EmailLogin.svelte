<script lang="ts">
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import {showError} from '../../../components/notifications/notify';
	import type {IAuthStore} from '../../../stores/auth/auth-store.interface';
	import {validateEmail} from '../../../utils/validation';

	export let authStore: IAuthStore = null;

	let email = '';
	let pwd = '';

	let emailError: boolean;
	$: {
		emailError = !!email ? !validateEmail(email) : false;
	}

	let signinAllowed: boolean;
	$: signinAllowed = !!email.trim() && !emailError && !!pwd.trim();

	const signIn = async () => {
		const result = await authStore.signIn(email, pwd);
		if (result.message) {
			showError(`Login failed: ${result.message}`);
		}
	}
</script>

<div class="email-login">
	<div class="form-group" class:error={emailError}>
		<label for="s_email">E-mail</label>
		<input
			type="email"
			placeholder="some@server.com"
			autocomplete="off"
			maxlength="128"
			required
			autofocus
			bind:value={email}
			id="s_email"/>
	</div>

	<div class="form-group">
		<label for="s_pwd">Password</label>
		<input
			type="password"
			autocomplete="off"
			maxlength="32"
			required
			bind:value={pwd}
			id="s_pwd"/>
	</div>

	<div class="form-group button-row">
		<!--  svelte-ignore a11y-label-has-associated-control -->
		<label/>

		<!--  svelte-ignore a11y-invalid-attribute-->
		<a href="#" on:click={() => navigate('login/restore')}>Forgot password?</a>

		<span class="stub"></span>

		<Button
			disabled={!signinAllowed}
			onClick={signIn}>
			<Icon type="login" class="inline" size="18px"/>
			Sign in
		</Button>
	</div>
</div>

<style>
    .email-login {
        margin-bottom: 32px;
    }
</style>
