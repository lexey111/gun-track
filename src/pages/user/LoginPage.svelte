<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import Button from '../../components/buttons/Button.svelte';
	import {IAuthStore} from '../../stores/auth/auth-store.interface';
	import EmailLogin from './sections/EmailLogin.svelte';
	import ProfileLogin from './sections/SocialLogin.svelte';

	export let authStore: IAuthStore = null;

	onMount(() => {
		document.body.classList.add('page-semitransparent');
	});

	onDestroy(() => {
		document.body.classList.remove('page-semitransparent');
	});
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
			Sign up!
		</Button>
	</section>
</div>

<style lang="less">
	@import "user.less";
</style>
