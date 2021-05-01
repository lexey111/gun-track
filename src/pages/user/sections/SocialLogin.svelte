<script lang="ts">
	import Button from '../../../components/buttons/Button.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import type {IAuthStore} from '../../../stores/auth/auth-store.interface';

	export let authStore: IAuthStore = null;

	const handleLoginWithFacebook = () => {
		authStore.loginWithFacebook();
	}

	const handleLoginWithGoogle = () => {
		authStore.loginWithGoogle();
	}
</script>

<div class="form-group button-row">
	<!--  svelte-ignore a11y-label-has-associated-control -->
	<label>
		Using social network
	</label>

	<Button on:click={handleLoginWithFacebook} type="ghost">
		<Icon type="facebook" class="inline" size="18px"/>
		Facebook
	</Button>
	<Button on:click={handleLoginWithGoogle} type="ghost">
		<Icon type="google" class="inline" size="18px"/>
		Google
	</Button>
</div>

<style>
    .form-group {
        margin-bottom: 32px;
    }
</style>
