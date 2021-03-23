<script lang="ts">
	import {IAuthStore, TAuthState} from '../../stores/auth/auth-store.interface';
	import ProfileDetails from './sections/ProfileDetails.svelte';
	import ProfileLogout from './sections/ProfileLogout.svelte';

	export let authState: TAuthState = null;
	export let authStore: IAuthStore = null;
</script>

<div class={"app-page"}>
	<ProfileDetails authState={authState}/>
	<ProfileLogout authStore={authStore}/>
</div>
