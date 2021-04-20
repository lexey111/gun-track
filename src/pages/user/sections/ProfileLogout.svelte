<script lang="ts">
	import Button from '../../../components/buttons/Button.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import type {IConfirmDialog} from '../../../components/modal/Confirm.interface';
	import Confirm from '../../../components/modal/Confirm.svelte';
	import type {IAuthStore} from '../../../stores/auth/auth-store.interface';

	let confirmDialog: IConfirmDialog;

	export let authStore: IAuthStore;

	const handleConfirmLogoutDialog = () => {
		confirmDialog.showConfirmDialog({
			text: 'Are you sure you want to logout?',
			confirmIcon: 'logout',
			confirmText: 'Logout',
			onConfirm: () => authStore.logout()
		});
	}

</script>

<Confirm bind:this={confirmDialog}/>

<Button
	type="danger"
	onClick={handleConfirmLogoutDialog}>
	<Icon type="logout" size="24px" class="inline"/>
	Logout
</Button>
