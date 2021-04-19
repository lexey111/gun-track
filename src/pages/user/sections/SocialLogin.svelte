<script lang="ts">
	import Button from '../../../components/buttons/Button.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import {IAuthStore} from '../../../stores/auth/auth-store.interface';

	export let authStore: IAuthStore = null;

	const handleLoginWithFacebook = () => {
		authStore.loginWithFacebook();
	}

	const handleLoginWithGoogle = () => {
		authStore.loginWithGoogle();
	}
</script>

<div class="form-group button-row">
	<label>
		Via social network
	</label>

	<Button onClick={handleLoginWithFacebook}>
		<Icon type="facebook" class="inline" size="24px"/>
		Facebook
	</Button>
	<Button onClick={handleLoginWithGoogle}>
		<Icon type="google" class="inline" size="24px"/>
		Google
	</Button>
</div>
