<script lang="ts">
	import {showError} from '../../../app/notifications/notify';
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

<div class="app-page-signin">
	<h3>Sign in</h3>
	<h4>Enter your credentials:</h4>

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

	<div class="form-group">
		<label/>
		<button
			class="press press-blue press-ghost"
			disabled={!signinAllowed}
			on:click={signIn}>
			Sign in
		</button>
	</div>

</div>

<style lang="less">
	.app-page-signin {
		margin: 1em 0;
		padding: 32px;
		width: 100%;
		background-color: var(--app-page-background);
		box-shadow: 0 2px 4px rgba(0, 0, 0, .2);

		h3 {
			margin: 0 0 1.5em 0;
		}
	}
</style>
