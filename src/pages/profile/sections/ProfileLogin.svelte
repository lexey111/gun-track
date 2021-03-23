<script lang="ts">
	import {IAuthStore} from '../../../stores/auth/auth-store.interface';

	import {AUTH_PROVIDER} from '../../../stores/firestore/auth-firebase';

	export let authStore: IAuthStore;

	const handleLoginWithGoogle = () => {
		authStore.logIn(AUTH_PROVIDER.google);
	}
	const handleLoginWithFacebook = () => {
		authStore.logIn(AUTH_PROVIDER.facebook);
	}
	const handleLoginWithGithub = () => {
		authStore.logIn(AUTH_PROVIDER.github);
	}

	const loginButtonClass = 'press press-ghost press-blue'
</script>

<div class="app-page-profile-login">
	<h3>Please log in with</h3>
	<button on:click={handleLoginWithGoogle} class={loginButtonClass}>Google</button>
	<button on:click={handleLoginWithFacebook} class={loginButtonClass}>Facebook</button>
	<button on:click={handleLoginWithGithub} class={loginButtonClass}>GitHub</button>
</div>

<style lang="less">
	.app-page-profile-login {
		max-width: 400px;
		padding: 32px;
		margin: 64px auto;
		background-color: var(--app-background);
		text-align: center;

		h3 {
			margin: 0 0 1.5em 0;
		}
	}
</style>
