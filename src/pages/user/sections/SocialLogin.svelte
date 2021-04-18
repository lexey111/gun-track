<script lang="ts">
	import Button from '../../../components/buttons/Button.svelte';
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

	<Button onClick={handleLoginWithFacebook}>Facebook</Button>
	<Button onClick={handleLoginWithGoogle}>Google</Button>
</div>
