<script lang="ts">
	import {Auth, CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';

	const handleLoginWithFacebook = () => {
		Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook});
	}

	const loginButtonClass = 'press press-ghost press-blue'
</script>

<div class="app-page-profile-login">
	<h3>Please log in with</h3>
	<button on:click={handleLoginWithFacebook} class={loginButtonClass}>Facebook</button>
</div>

<style lang="less">
	.app-page-profile-login {
		max-width: 400px;
		padding: 32px;
		margin: 64px auto;
		background-color: var(--app-page-background);
		text-align: center;

		h3 {
			margin: 0 0 1.5em 0;
		}
	}
</style>
