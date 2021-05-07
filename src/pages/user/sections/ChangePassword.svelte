<script lang="ts">
	import {onMount} from 'svelte';
	import Button from '../../../components/buttons/Button.svelte';
	import {I18nService} from '../../../components/i18n/i18n.service';
	import I18n from '../../../components/i18n/I18n.svelte';
	import {showError, showInfo} from '../../../components/notifications/notify';
	import type {IAuthStore} from '../../../stores/auth/auth-store.interface';

	export let authStore: IAuthStore = null;

	let oldPwd = '';
	let pwd = '';
	let pwd2 = '';

	$: newPasswordAllowed = !!oldPwd.trim() && !!pwd.trim() && pwd === pwd2;

	let failedMessage: string;
	let doneMessage: string;

	const changePassword = async () => {
		const result: any = await authStore.changePassword(oldPwd, pwd);
		if (result?.message) {
			showError(failedMessage + ': ' + result.message);
		} else {
			showInfo(doneMessage);
		}
	}

	onMount(() => {
		void I18nService.translate('@User.ChangePasswordFailed').then(s => failedMessage = s);
		void I18nService.translate('@User.ChangePasswordDone').then(s => doneMessage = s);
	});

</script>

<div class="form-group">
	<label for="oldPwd">
		<I18n>@User.CurrentPassword</I18n>
	</label>
	<input
		type="password"
		name="oldPwd"
		autocomplete="off"
		maxlength="32"
		required
		bind:value={oldPwd}
		id="oldPwd"/>
</div>

<div class="form-group">
	<label for="pwd">
		<I18n>@User.NewPassword</I18n>
	</label>
	<input
		type="password"
		autocomplete="new-password"
		maxlength="32"
		required
		bind:value={pwd}
		id="pwd"/>
</div>

<div class="form-group">
	<label for="pwd2">
		<I18n>@User.ConfirmPassword</I18n>
	</label>
	<input
		type="password"
		autocomplete="new-password"
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
		on:click={changePassword}>
		<I18n>@User.ChangePassword</I18n>
	</Button>
</div>
