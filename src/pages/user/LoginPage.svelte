<script lang="ts">
	import {navigate} from 'svelte-routing';
	import Button from '../../components/buttons/Button.svelte';
	import Icon from '../../components/icons/Icon.svelte';
	import type {IAuthStore} from '../../stores/auth/auth-store.interface';
	import EmailLogin from './sections/EmailLogin.svelte';
	import ProfileLogin from './sections/SocialLogin.svelte';

	export let authStore: IAuthStore = null;

</script>

<div class={"app-page-login"}>
	<h1 class="highlight-mark">Sign in</h1>

	<ProfileLogin authStore={authStore}/>

	<hr/>

	<h3 class="highlight-mark">Or with local credentials</h3>
	<EmailLogin authStore={authStore}/>

	<hr/>

	<div class="new-user">
		<h3 class="highlight-mark">Want to register?</h3>
		<div class="form-group button-row">
			<!--  svelte-ignore a11y-label-has-associated-control -->
			<label>
				Register with e-mail
			</label>

			<Button on:click={() => navigate('login/signup')} type="ghost">
				<Icon type="user-add" class="inline" size="18px"/>
				Sign up!
			</Button>
		</div>
	</div>
</div>

<style lang="less">
	.app-page-login {
		max-width: 500px;
		margin: 0 auto;
	}

	.new-user {
		margin-bottom: 64px;
	}
</style>
