<script lang="ts">
	import {IConfirmDialog} from '../../../app/modal/Confirm.interface';
	import Confirm from '../../../app/modal/Confirm.svelte';
	import {IAuthStore} from '../../../stores/auth/auth-store.interface';

	let confirmDialog: IConfirmDialog;

	export let authStore: IAuthStore;

	const handleConfirmLogoutDialog = () => {
		confirmDialog.showConfirmDialog({
			text: 'Are you sure you want to logout?',
			confirmText: 'Logout',
			onConfirm: () => authStore.logout()
		});
	}

</script>

<div class="profile-logout">
	<Confirm bind:this={confirmDialog}/>

	<button
		on:click={handleConfirmLogoutDialog}
		class="press press-ghost press-red">
		Logout
	</button>
</div>

<style>
    .profile-logout {
        margin: 2em 0;
    }
</style>
