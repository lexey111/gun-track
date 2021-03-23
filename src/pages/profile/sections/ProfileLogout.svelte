<script lang="ts">
	import {IAuthStore} from '../../../stores/auth/auth-store.interface';

	export let authStore: IAuthStore;

	const handleLogout = () => {
		authStore.logOut();
	}
</script>

<div class="profile-logout">
	<button on:click={handleLogout} class="press press-ghost press-red">Logout</button>
</div>

<style>
	.profile-logout {
		 margin: 2em 0;
	}
</style>
