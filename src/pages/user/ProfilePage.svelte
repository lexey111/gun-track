<script lang="ts">
	import {IAuthStore, TAuthState} from '../../stores/auth/auth-store.interface';
	import ChangePassword from './sections/ChangePassword.svelte';
	import ProfileDetails from './sections/ProfileDetails.svelte';

	export let authState: TAuthState = null;
	export let authStore: IAuthStore = null;

</script>

<div class="app-page-profile">
	<section>
		<ProfileDetails authState={authState} authStore={authStore}/>
	</section>

	{#if (authState.providerId === 'e-mail')}
		<section>
			<h2>Change password</h2>
			<ChangePassword authStore={authStore}/>
		</section>
	{/if}
</div>

<style lang="less">
	.app-page-profile {
		padding: 32px;
		max-width: 500px;
		margin: 0 auto;
	}
</style>
