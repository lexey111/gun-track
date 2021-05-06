<script lang="ts">
	import {onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import {I18nService} from '../../../components/i18n/i18n.service';
	import I18n from '../../../components/i18n/I18n.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import {showError} from '../../../components/notifications/notify';
	import {AppStateStore} from '../../../stores/app/app-state-store';
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
		AppStateStore.showSpinner();

		const result = await authStore.signIn(email, pwd);

		if (result.message) {
			showError(loginFailed + ': ' + result.message);
		}

		AppStateStore.hideSpinner();
	}

	const handleEnter = (e) => {
		if (e?.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
			signIn();
			return false;
		}
	};

	let loginFailed: string;
	onMount(() => {
		void I18nService.translate('@User.loginFailed').then(s => loginFailed = s);
	});
</script>

<div class="email-login">
	<div class="form-group" class:error={emailError}>
		<label for="s_email">E-mail</label>
		<!-- svelte-ignore a11y-autofocus-->
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
		<label for="s_pwd">
			<I18n>@User.Password</I18n>
		</label>
		<input
			type="password"
			autocomplete="off"
			maxlength="32"
			required
			bind:value={pwd}
			on:keydown={handleEnter}
			id="s_pwd"/>
	</div>

	<div class="form-group button-row">
		<!--  svelte-ignore a11y-label-has-associated-control -->
		<label/>

		<Button
			disabled={!signinAllowed}
			on:click={signIn}>
			<Icon type="login" class="inline" size="18px"/>
			<I18n>@User.SignIn</I18n>
		</Button>
		<span class="stub"></span>

		<!--  svelte-ignore a11y-invalid-attribute-->
		<a href="#" on:click={() => navigate('login/restore')}>
			<I18n>@User.ForgotPasswordQuestion</I18n>
		</a>

	</div>
</div>

<style>
    .email-login {
        margin-bottom: 32px;
    }
</style>
