<script lang="ts">
	import Button from '../../../components/buttons/Button.svelte';
	import {showError, showInfo} from '../../../components/notifications/notify';
	import type {IAuthStore} from '../../../stores/auth/auth-store.interface';

	export let authStore: IAuthStore = null;

	let oldPwd = '';
	let pwd = '';
	let pwd2 = '';

	$: newPasswordAllowed = !!oldPwd.trim() && !!pwd.trim() && pwd === pwd2;

	const changePassword = async () => {
		const result: any = await authStore.changePassword(oldPwd, pwd);
		if (result?.message) {
			showError(`Change password failed: ${result.message}`);
		} else {
			showInfo('Password updated. Now you can login with these credentials.');
		}
	}
</script>

<div class="form-group">
	<label for="oldPwd">Current password</label>
	<input
		type="password"
		autocomplete="off"
		maxlength="32"
		required
		bind:value={oldPwd}
		id="oldPwd"/>
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
		onClick={changePassword}>
		Change password
	</Button>
</div>
