<script lang="ts">
	import {showError, showInfo} from '../../../components/notifications/notify';
	import {IAuthStore} from '../../../stores/auth/auth-store.interface';

	export let authStore: IAuthStore = null;

	let oldPwd = '';
	let pwd = '';
	let pwd2 = '';
	let code = '';

	$: newPasswordAllowed = !!oldPwd.trim() && !!pwd.trim() && pwd === pwd2;

	const changePassword = async () => {
		const result: unknown = await authStore.changePassword(oldPwd, pwd);
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
	<label/>
	<button
		class="press press-amber press-ghost"
		disabled={!newPasswordAllowed}
		on:click={changePassword}>
		Change password
	</button>
</div>
