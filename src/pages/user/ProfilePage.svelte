<script lang="ts">
	import {navigate} from 'svelte-routing';
	import type {IAuthStore, TAuthState} from '../../stores/auth/auth-store.interface';
	import ChangePassword from './sections/ChangePassword.svelte';
	import ProfileDetails from './sections/ProfileDetails.svelte';

	const email = 'lexey111@gmail.com';
	export let authState: TAuthState = null;
	export let authStore: IAuthStore = null;

	const gotoTOS = () => {
		navigate('/tos');
	};
</script>

<div class="app-page-profile">
	<h1>Profile</h1>
	<ProfileDetails authState={authState} authStore={authStore}/>

	{#if (authState.providerId === 'e-mail')}
		<h2>Change password</h2>
		<ChangePassword authStore={authStore}/>
	{/if}

	<h2>Useful links</h2>
	<ul>
		<!--  svelte-ignore a11y-invalid-attribute-->
		<li><a href="#" on:click={gotoTOS}>Terms of service</a></li>
		<li>Contacts: <a href="mailto:{email}">{email}</a></li>
		<li>Telegram channel:</li>
	</ul>
</div>

<style lang="less">
	.app-page-profile {
		max-width: 500px;
		margin: 0 auto;
	}
</style>
