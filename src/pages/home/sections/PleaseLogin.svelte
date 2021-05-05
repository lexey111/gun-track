<script lang="ts">
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import I18n from '../../../components/i18n/I18n.svelte';
	import Icon from '../../../components/icons/Icon.svelte';

	const gotoLogin = () => {
		navigate('/login');
	};

</script>

<div class="please-login">
	<h1>
		<I18n>@Home.PleaseSignIn</I18n>
	</h1>
	<p>
		<I18n>@Home.YouNeedLogin</I18n>
	</p>

	<p>
		<Button type="ghost" on:click="{gotoLogin}">
			<Icon type="login"/> &nbsp;
			<I18n>@Home.GotoSignIn</I18n>
		</Button>
	</p>

	<p>
		<I18n>@Home.SignInOps</I18n>
	</p>
</div>

<style lang="less">
	.please-login {
		display: flex;
		flex-flow: column wrap;
		margin-bottom: 32px;
	}
</style>
