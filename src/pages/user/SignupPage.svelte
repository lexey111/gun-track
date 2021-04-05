<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {Link} from 'svelte-routing';

	import {showError, showInfo} from '../../components/notifications/notify';
	import {IAuthStore} from '../../stores/auth/auth-store.interface';

	export let authStore: IAuthStore = null;

	let email = '';
	let pwd = '';
	let pwd2 = '';
	let code = '';

	$: signupAllowed = !!email.trim() && !!pwd.trim() && pwd === pwd2;
	$: codeAllowed = !!email.trim() && !!code.trim();

	const signUp = async () => {
		const result: unknown = await authStore.signUp(email, pwd);
		if (result.message) {
			showError(`Registration failed: ${result.message}`);
		} else {
			showInfo('Successful registration. Verification code was send to email provided.');
		}
	}

	const signUpVerify = async () => {
		const result: unknown = await authStore.confirmSignUp(email, code);
		if (result.message) {
			showError(`Confirmation failed: ${result.message}`);
		} else {
			showInfo('Successful registration. Now you can login with these credentials.');
		}
	}

	onMount(() => {
		document.body.classList.add('page-semitransparent');
	});

	onDestroy(() => {
		document.body.classList.remove('page-semitransparent');
	});

</script>

<div class="app-page-signup">
	<h2>
		Sign up
	</h2>

	<p>
		<span class="circle-badge success">1</span> New user? Please fill the form to register:
	</p>

	<section class="success">
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
				class="press press-green press-ghost"
				disabled={!signupAllowed}
				on:click={signUp}>
				Register
			</button>
		</div>
	</section>

	<p>
		<span class="circle-badge success">2</span> Verify your e-mail:
	</p>

	<section class="success">
		<div class="form">

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
					class="press press-green press-ghost"
					disabled={!codeAllowed}
					on:click={signUpVerify}>
					Confirm & Sign in
				</button>
			</div>
		</div>
	</section>

	<p class="return-to-login">
		<Link to="login">&larr; Back to login page</Link>
	</p>
</div>
