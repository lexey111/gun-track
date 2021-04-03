<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {IAuthStore, TAuthState} from '../../stores/auth/auth-store.interface';
	import ChangePassword from './sections/ChangePassword.svelte';
	import ProfileDetails from './sections/ProfileDetails.svelte';

	export let authState: TAuthState = null;
	export let authStore: IAuthStore = null;

	onMount(() => {
		document.body.classList.add('page-semitransparent');
	});

	onDestroy(() => {
		document.body.classList.remove('page-semitransparent');
	});
</script>

<div class="app-page-profile">
	<section>
		<ProfileDetails authState={authState} authStore={authStore}/>
	</section>

	{#if (authState.providerId === 'e-mail')}
		<section>
			<h3>Change password</h3>
			<ChangePassword authStore={authStore}/>
		</section>
	{/if}
</div>
