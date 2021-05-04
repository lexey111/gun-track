<script lang="ts">
	import {onMount} from 'svelte';
	import {Link} from 'svelte-routing';
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

	let sendResetCodeAllowed: boolean;
	$: sendResetCodeAllowed = !!email.trim() && !emailError;

	let newPasswordAllowed: boolean;
	$: newPasswordAllowed = !!email.trim() && !!code.trim() && !!pwd.trim() && !emailError && !codeError && !passwordError;

	let resetCodeFailed: string;
	let resetCodeSent: string;
	let confirmationFailed: string;
	let passwordUpdated: string;

	const sendResetCode = async () => {
		const result: any = await authStore.forgotPassword(email);
		if (result?.message) {
			showError(resetCodeFailed + ': ' + result.message);
		} else {
			showInfo(resetCodeSent);
		}
	}

	const sendResetCodeConfirm = async () => {
		const result: any = await authStore.confirmForgotPassword(email, code, pwd);
		if (result?.message) {
			showError(confirmationFailed + ': ' + result.message);
		} else {
			showInfo(passwordUpdated);
		}
	}

	onMount(() => {
		void I18nService.translate('@User.resetCodeFailed').then(s => resetCodeFailed = s);
		void I18nService.translate('@User.resetCodeSent').then(s => resetCodeSent = s);
		void I18nService.translate('@User.confirmationFailed').then(s => confirmationFailed = s);
		void I18nService.translate('@User.passwordUpdated').then(s => passwordUpdated = s);
	});
</script>

<div class="app-page-reset">
	<h1>
		<Link to="/login" class="outlink">
			<Icon type="arrow-left" size="24px"/>
		</Link>
		<I18n>@User.ResetPassword</I18n>
	</h1>

	<p>
		<I18n>@User.ResetPasswordLine1</I18n>
	</p>

	<p>
		<I18n>@User.ResetPasswordLine2</I18n>
	</p>

	<hr/>

	<h3 class="highlight-mark">
		<I18n>@User.RequestCode</I18n>
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
			on:click={sendResetCode}>
			<I18n>@User.GetCode</I18n>
		</Button>
	</div>

	<h3 class="highlight-mark">
		<I18n>@User.EnterCode</I18n>
	</h3>

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
			<I18n>@User.Code</I18n>
		</label>
		<input
			type="text"
			autocomplete="off"
			maxlength="32"
			required
			bind:value={code}
			id="code"/>
	</div>

	<div class="form-group" class:error={passwordError}>
		<label for="pwd">
			<I18n>@User.NewPassword</I18n>
		</label>
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

	<div class="form-group button-row">
		<!--  svelte-ignore a11y-label-has-associated-control -->
		<label/>
		<Button
			disabled={!newPasswordAllowed}
			on:click={sendResetCodeConfirm}>
			<I18n>@User.ChangePassword</I18n>
		</Button>
	</div>

	<p class="return-to-login">
		<Link to="login">&larr;
			<I18n>@User.BackToLogin</I18n>
		</Link>
	</p>
</div>

<style lang="less">
	.app-page-reset {
		max-width: 500px;
		margin: 0 auto;
	}
</style>
