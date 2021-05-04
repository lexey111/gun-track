<script lang="ts">
	import {onMount} from 'svelte';
	import {I18nService} from '../../../components/i18n/i18n.service';
	import I18n from '../../../components/i18n/I18n.svelte';
	import Button from '../../../components/buttons/Button.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import type {IConfirmDialog} from '../../../components/modal/Confirm.interface';
	import Confirm from '../../../components/modal/Confirm.svelte';
	import type {IAuthStore} from '../../../stores/auth/auth-store.interface';

	let confirmDialog: IConfirmDialog;

	export let authStore: IAuthStore;

	let confirmationText: string;
	let confirmationButton: string;

	const handleConfirmLogoutDialog = () => {
		confirmDialog.show({
			text: confirmationText,
			confirmIcon: 'logout',
			confirmText: confirmationButton,
			onConfirm: () => authStore.logout()
		});
	}

	onMount(() => {
		void I18nService.translate('@User.LogoutMessage').then(s => confirmationText = s);
		void I18nService.translate('@User.Logout').then(s => confirmationButton = s);
	});
</script>

<Confirm bind:this={confirmDialog}/>

<Button
	type="ghost-danger"
	on:click={handleConfirmLogoutDialog}>
	<Icon type="logout" size="18px" class="inline"/>
	<I18n>@User.Logout</I18n>
</Button>
