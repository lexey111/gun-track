<script lang="ts">
	import {TAuthState} from '../../../stores/auth/auth-store.interface';

	export let authState: TAuthState;
</script>

<div>
	<h1>{authState.displayName}</h1>

	{#if (authState.email)}
		<p>
			Email: {authState.email}
			{#if (authState.emailVerified)}
				&mdash; verified
			{/if}
		</p>
	{/if}

	<p>
		Authorized via {authState.providerId}
	</p>

	<pre>{JSON.stringify(authState, null, 4)}</pre>
</div>

<style lang="less">
</style>
