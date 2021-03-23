<script lang="ts">
	import {IAuthStore} from '../../stores/auth/auth-store.interface';
	import ProfileLogin from './sections/ProfileLogin.svelte';

	export let authStore: IAuthStore = null;
</script>

<div class={"app-page"}>
	<ProfileLogin authStore={authStore}/>
</div>
