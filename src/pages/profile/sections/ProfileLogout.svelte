<script lang="ts">
	import {Auth} from '@aws-amplify/auth';
	import {getContext} from 'svelte';
	import {TAppModal} from '../../../../../svelte-min-starter/src/stores/app/app-state-store.interface';
	import {IAuthStore, TAuthState} from '../../../stores/auth/auth-store.interface';
	import LogoutConfirmModal from './LogoutConfirmModal.svelte';

	const modal = (getContext('AppState') as { modal: TAppModal }).modal;

	export let authStore: IAuthStore;
	export let authState: TAuthState;

	const doLogout = async () => {
		try {
			authStore.setFetching(true);
			await Auth.signOut();
		} catch (error) {
			console.log('error signing out: ', error);
		}
		authStore.logOut();
	}

	const handleConfirmLogoutDialog = () => {
		modal.open(LogoutConfirmModal, {
			closeButton: true,
			componentProps: {
				onConfirm: () => {
					modal.close();
					doLogout();
				},
				onCancel: () => modal.close(),
			}
		});
	}

</script>

<div class="profile-logout">
	<button
		on:click={handleConfirmLogoutDialog}
		class="press press-ghost press-red"
		disabled="{authState.fetching ? 'fetching' : false}">
		Logout
	</button>
</div>

<style>
	.profile-logout {
		margin: 2em 0;
	}
</style>
