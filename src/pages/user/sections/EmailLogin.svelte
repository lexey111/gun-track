<script lang="ts">
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import {showError} from '../../../components/notifications/notify';
	import {IAuthStore} from '../../../stores/auth/auth-store.interface';

	export let authStore: IAuthStore = null;

	let email = '';
	let emailCode = '';
	let pwd = '';

	$: signinAllowed = !!email.trim() && !!pwd.trim();

	const signIn = async () => {
		const result = await authStore.signIn(email, pwd);
		if (result.message) {
			showError(`Login failed: ${result.message}`);
		}
	}
</script>

<div class="form-group">
	<label for="s_email">E-mail</label>
	<input
		placeholder="some@server.com"
		autocomplete="off"
		maxlength="128"
		required
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
	<label/>

	<a href="javascript:void(0)" on:click={() => navigate('login/restore')}>Forgot password?</a>

	<span class="stub"></span>

	<Button
		disabled={!signinAllowed}
		onClick={signIn}>
		Sign in
	</Button>
</div>
