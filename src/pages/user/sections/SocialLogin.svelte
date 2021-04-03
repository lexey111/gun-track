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

<div class="form-group button-row">
	<label>
		Via social network
	</label>

	<button on:click={handleLoginWithFacebook} class="press press-ghost press-blue">Facebook</button>
	<button on:click={handleLoginWithGoogle} class="press press-ghost press-blue">Google</button>
</div>
