<script lang="ts">
	import {navigate} from 'svelte-routing';
	import Button from '../../components/buttons/Button.svelte';
	import I18n from '../../components/i18n/I18n.svelte';
	import Icon from '../../components/icons/Icon.svelte';
	import type {IAuthStore} from '../../stores/auth/auth-store.interface';
	import EmailLogin from './sections/EmailLogin.svelte';
	import ProfileLogin from './sections/SocialLogin.svelte';

	export let authStore: IAuthStore = null;

</script>

<div class={"app-page-login"}>
	<h1 class="highlight-mark">
		<I18n>@User.SignIn</I18n>
	</h1>

	<ProfileLogin authStore={authStore}/>

	<hr/>

	<h3 class="highlight-mark">
		<I18n>@User.OrWithLocal</I18n>
	</h3>
	<EmailLogin authStore={authStore}/>

	<hr/>

	<div class="new-user">
		<h3 class="highlight-mark">
			<I18n>@User.WantToRegister</I18n>
		</h3>
		<div class="form-group button-row">
			<!--  svelte-ignore a11y-label-has-associated-control -->
			<label>
				<I18n>@User.RegisterWithEmail</I18n>
			</label>

			<Button on:click={() => navigate('login/signup')} type="ghost">
				<Icon type="user-add" class="inline" size="18px"/>
				<I18n>@User.SignUp</I18n>
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
