<script lang="ts">
	import {navigate} from 'svelte-routing';
	import {IAuthStore} from '../../stores/auth/auth-store.interface';
	import EmailLogin from './sections/EmailLogin.svelte';
	import ProfileLogin from './sections/SocialLogin.svelte';

	export let authStore: IAuthStore = null;
</script>

<div class={"app-page"}>
	<div class="app-page-login">
		<ProfileLogin authStore={authStore}/>
		<EmailLogin authStore={authStore}/>

		<p>
			New user and want to use e-mail to login?
		</p>

		<button class="press press-deeppurple" on:click={() => navigate('login/signup')}>
			Register here
		</button>
	</div>
</div>

<style lang="less">
	.app-page-login {
		max-width: 500px;
		margin: 0 auto;
		display: flex;
		flex-flow: column wrap;
		align-items: center;
	}
</style>
