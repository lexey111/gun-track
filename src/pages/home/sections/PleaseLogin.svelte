<script lang="ts">
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import Icon from '../../../components/icons/Icon.svelte';

	const gotoLogin = () => {
		navigate('/login');
	};

</script>

<div class="please-login">
	<h1>
		Please sign in.
	</h1>
	<p>
		You need to be logged in to work with the site.
	</p>

	<p>
		<Button type="ghost" onClick="{gotoLogin}">
			<Icon type="login"/> &nbsp;
			Go to Sign in page
		</Button>
	</p>

	<p>
		There you can use your local credentials or social networks account to log in, create new account or restore forgotten password.
	</p>
</div>

<style lang="less">
	.please-login {
		display: flex;
		flex-flow: column wrap;
		margin-bottom: 32px;
	}
</style>
