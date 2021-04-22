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
	<h1>Sign in</h1>

	<section>
		<ProfileLogin authStore={authStore}/>
	</section>

	<h3>Or with local credentials</h3>
	<section>
		<EmailLogin authStore={authStore}/>
	</section>

	<h3>New user?</h3>
	<section>
		<p>
			Register new local user with e-mail:
		</p>
		<Button onClick={() => navigate('login/signup')}>
			<Icon type="user-add" class="inline" size="24px"/>
			Sign up!
		</Button>
	</section>
</div>

<style lang="less">
	@import "user.less";
</style>
