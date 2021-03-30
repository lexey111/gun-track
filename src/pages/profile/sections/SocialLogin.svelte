<script lang="ts">
	import {IAuthStore} from '../../../stores/auth/auth-store.interface';

	export let authStore: IAuthStore = null;

	const handleLoginWithFacebook = () => {
		authStore.loginWithFacebook();
	}

	const handleLoginWithGoogle = () => {
		authStore.loginWithGoogle();
	}
</script>

<div class="app-page-profile-login">
	<h3>Please log in with</h3>
	<button on:click={handleLoginWithFacebook} class="press press-ghost press-blue">Facebook</button>
	<button on:click={handleLoginWithGoogle} class="press press-ghost press-blue">Google</button>
</div>

<style lang="less">
	.app-page-profile-login {
		padding: 32px;
		margin: 1em 0;
		width: 100%;
		background-color: var(--app-page-background);
		box-shadow: 0 2px 4px rgba(0, 0, 0, .2);

		h3 {
			margin: 0 0 1.5em 0;
		}
	}
</style>
