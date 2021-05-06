<script lang="ts">
	import {navigate} from 'svelte-routing';
	import I18n from '../../components/i18n/I18n.svelte';
	import type {IAuthStore, TAuthState} from '../../stores/auth/auth-store.interface';
	import ChangePassword from './sections/ChangePassword.svelte';
	import ProfileDetails from './sections/ProfileDetails.svelte';

	const email = 'admin@gun-track.org';

	export let authState: TAuthState = null;
	export let authStore: IAuthStore = null;

	const gotoTOS = () => {
		navigate('/tos');
	};
</script>

<div class="app-page-profile">
	<h1>
		<I18n>@User.Profile</I18n>
	</h1>
	<ProfileDetails authState={authState} authStore={authStore}/>

	{#if (authState.providerId === 'e-mail')}
		<h2>
			<I18n>@User.ChangePassword</I18n>
		</h2>
		<ChangePassword authStore={authStore}/>
	{/if}

	<h2>
		<I18n>@User.UsefulLinks</I18n>
	</h2>
	<ul>
		<!--  svelte-ignore a11y-invalid-attribute-->
		<li><a href="#" on:click={gotoTOS}>
			<I18n>@User.TermsOfService</I18n>
		</a></li>
		<li>
			<I18n>@User.Contacts</I18n>
			: <a href="mailto:{email}">{email}</a></li>
	</ul>
</div>

<style lang="less">
	.app-page-profile {
		max-width: 500px;
		margin: 0 auto;
	}
</style>
