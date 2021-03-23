<script lang="ts">
	import {IAuthStore} from '../../../stores/auth/auth-store.interface';

	export let authStore: IAuthStore;

	const handleLogout = () => {
		authStore.logOut();
	}
</script>

<div>
	<hr/>

	<div>
		<button on:click={handleLogout} class="press press-ghost press-red">Logout</button>
	</div>
</div>

<style lang="less">
</style>
