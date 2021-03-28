<script lang="ts">
	import {IAuthStore, TAuthState} from '../../stores/auth/auth-store.interface';
	import ProfileDetails from './sections/ProfileDetails.svelte';
	import ProfileLogout from './sections/ProfileLogout.svelte';

	export let authState: TAuthState = null;
	export let authStore: IAuthStore = null;
</script>

<div class={"app-page"}>
	<div class="profile-details">
		<ProfileDetails authState={authState}/>
		<ProfileLogout authStore={authStore} authState="{authState} "/>
	</div>
</div>

<style lang="less">
	.profile-details {
		max-width: 450px;
		margin: 0 auto;
	}
</style>
