<script lang="ts">
	import {Link} from 'svelte-routing';
	import Button from '../../components/buttons/Button.svelte';

	import {showError, showInfo} from '../../components/notifications/notify';
	import type {IAuthStore} from '../../stores/auth/auth-store.interface';

	export let authStore: IAuthStore = null;

	let email = '';
	let pwd = '';
	let pwd2 = '';
	let code = '';

	$: sendResetCodeAllowed = !!email.trim();
	$: newPasswordAllowed = !!email.trim() && !!code.trim() && !!pwd.trim() && pwd === pwd2;

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
	<h2>
		Reset password
	</h2>
	<p>
		<span class="circle-badge warn">1</span> Enter your e-mail address and request reset code:
	</p>
	<section class="warn">
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

		<div class="form-group button-row">
			<!--  svelte-ignore a11y-label-has-associated-control -->
			<label/>
			<Button
				disabled={!sendResetCodeAllowed}
				onClick={sendResetCode}>
				Get password reset code
			</Button>
		</div>
	</section>

	<p>
		<span class="circle-badge warn">2</span> Enter the code and new password:
	</p>

	<section class="warn">
		<div class="form-group">
			<label for="email2">E-mail</label>
			<input
				placeholder="some@server.com"
				autocomplete="off"
				maxlength="128"
				required
				bind:value={email}
				id="email2"/>
		</div>

		<div class="form-group">
			<label for="code">Code</label>
			<input
				type="link"
				autocomplete="off"
				maxlength="32"
				required
				bind:value={code}
				id="code"/>
		</div>

		<div class="form-group">
			<label for="pwd">New password</label>
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

		<div class="form-group button-row">
			<!--  svelte-ignore a11y-label-has-associated-control -->
			<label/>
			<Button
				disabled={!newPasswordAllowed}
				onClick={sendResetCodeConfirm}>
				Change password
			</Button>
		</div>
	</section>

	<p class="return-to-login">
		<Link to="login">&larr; Back to login page</Link>
	</p>
</div>
