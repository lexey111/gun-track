<script lang="ts">
	import {onMount} from 'svelte';
	import {Link, navigate} from 'svelte-routing';
	import Button from '../../components/buttons/Button.svelte';
	import {I18nService} from '../../components/i18n/i18n.service';
	import I18n from '../../components/i18n/I18n.svelte';
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

	let signupAllowed: boolean;
	$: signupAllowed = !!email.trim() && !!pwd.trim() && !emailError && !passwordError;
	let codeAllowed: boolean;
	$: codeAllowed = !!email.trim() && !!code.trim() && !emailError && !codeError;

	const signUp = async () => {
		const result: any = await authStore.signUp(email, pwd);
		if (result.message) {
			showError(registrationFailed + ': ' + result.message);
		} else {
			showInfo(registrationCodeSent);
		}
	}

	const signUpVerify = async () => {
		const result: any = await authStore.confirmSignUp(email, code);
		if (result.message) {
			showError(confirmationFailed + ': ' + result.message);
		} else {
			showInfo(registrationDone);
			navigate('/login');
		}
	}

	let placeholderAtLeast8: string;
	let registrationFailed: string;
	let registrationCodeSent: string;
	let confirmationFailed: string;
	let registrationDone: string;

	onMount(() => {
		void I18nService.translate('@User.placeholderAtLeast8').then(s => placeholderAtLeast8 = s);

		void I18nService.translate('@User.registrationFailed').then(s => registrationFailed = s);
		void I18nService.translate('@User.registrationCodeSent').then(s => registrationCodeSent = s);
		void I18nService.translate('@User.confirmationFailed').then(s => confirmationFailed = s);
		void I18nService.translate('@User.registrationDone').then(s => registrationDone = s);
	});
</script>

<div class="app-page-signup">
	<h1>
		<Link to="/login" class="outlink">
			<Icon type="arrow-left" size="24px"/>
		</Link>
		<I18n>@User.SignUp</I18n>
	</h1>

	<p>
		<I18n>@User.SignUpLine1</I18n>
	</p>

	<p>
		<I18n>@User.SignUpLine2</I18n>
	</p>

	<hr/>

	<h3 class="highlight-mark">
		<I18n>@User.SignUpFillForm</I18n>
	</h3>

	<div class="form-group" class:error={emailError}>
		<label for="email">E-mail</label>
		<!-- svelte-ignore a11y-autofocus-->
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
		<label for="pwd">
			<I18n>@User.Password</I18n>
		</label>
		<input
			type="password"
			placeholder={placeholderAtLeast8}
			autocomplete="off"
			maxlength="32"
			required
			bind:value={pwd}
			id="pwd"/>
	</div>

	<div class="form-group" class:error={passwordError}>
		<label for="pwd2">
			<I18n>@User.ConfirmPassword</I18n>
		</label>
		<input
			type="password"
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
			on:click={signUp}>
			<I18n>@User.Register</I18n>
		</Button>
	</div>

	<h3 class="highlight-mark">
		<I18n>@User.ConfirmYourEmail</I18n>
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
			<label for="code">
				<I18n>@User.VerificationCode</I18n>
			</label>
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
				on:click={signUpVerify}>
				<I18n>@User.ConfirmSignIn</I18n>
			</Button>
		</div>
	</div>

	<p class="return-to-login">
		<Link to="login">&larr;
			<I18n>@User.BackToLogin</I18n>
		</Link>
	</p>
</div>

<style lang="less">
	.app-page-signup {
		max-width: 500px;
		margin: 0 auto;
	}
</style>
