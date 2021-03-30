<script lang="ts">
	import {Link} from 'svelte-routing';

	import {showError, showInfo} from '../../app/notifications/notify';
	import {AuthStore} from '../../stores/auth/auth-store';

	let email = '';
	let pwd = '';
	let pwd2 = '';
	let code = '';

	$: signupAllowed = !!email.trim() && !!pwd.trim() && pwd === pwd2;
	$: codeAllowed = !!email.trim() && !!code.trim();

	const signUp = async () => {
		const result = await AuthStore.signUp(email, pwd);
		if (result.message) {
			showError(`Registration failed: ${result.message}`);
		} else {
			showInfo('Successful registration. Verification code was send to email provided.');
		}
	}

	const signUpConfirm = async () => {
		const result = await AuthStore.confirmSignUp(email, code);
		if (result.message) {
			showError(`Confirmation failed: ${result.message}`);
		} else {
			showInfo('Successful registration. Now you can login with these credentials.');
		}
	}
</script>

<div class="app-page-signup">
	<h2>
		<Link class="back-link" to="login"/>
		Sign up
	</h2>
	<p>New user? Please fill the form to register:</p>

	<div class="form">
		<div class="form-group">
			<label for="email">E-mail</label>
			<input
				placeholder="some@server.com"
				autocomplete="off"
				maxlength="128"
				required
				bind:value={email}
				id="email"/>
		</div>

		<div class="form-group">
			<label for="pwd">Password</label>
			<input
				type="password"
				autocomplete="off"
				maxlength="32"
				required
				bind:value={pwd}
				id="pwd"/>
		</div>

		<div class="form-group">
			<label for="pwd2">Confirm password</label>
			<input
				type="password"
				autocomplete="off"
				maxlength="32"
				required
				bind:value={pwd2}
				id="pwd2"/>
		</div>

		<div class="form-group">
			<label/>
			<button
				class="press press-blue press-ghost"
				disabled={!signupAllowed}
				on:click={signUp}>
				Register
			</button>
		</div>
	</div>

	<h3>Confirm email</h3>
	{#if (!email && code)}
		<p>
			Please fill e-mail field:
		</p>
	{/if}

	{#if (!code && email)}
		<p>
			Please fill code field:
		</p>
	{/if}

	{#if (!email && !code)}
		<p>
			Please fill e-mail field and code:
		</p>
	{/if}

	<div class="form">
		<div class="form-group">
			<label for="code">Verification code</label>
			<input
				autocomplete="off"
				maxlength="32"
				required
				bind:value={code}
				id="code"/>
		</div>

		<div class="form-group">
			<label/>
			<button
				class="press press-blue press-ghost"
				disabled={!codeAllowed}
				on:click={signUpConfirm}>
				Confirm & sign in
			</button>
		</div>
	</div>

	<p class="return-to-login">
		<Link to="login">&larr; Return to login page</Link>
	</p>
</div>

<style lang="less">
	.app-page-signup {
		max-width: 500px;
		margin: 0 auto;

		h2 {
			margin-top: 0;
			display: flex;
			flex-flow: row nowrap;
			align-content: center;
			align-items: center;
		}

		h3 {
			margin: 3em 0 1.5em 0;
		}

		.return-to-login {
			text-align: right;
		}
	}
</style>
