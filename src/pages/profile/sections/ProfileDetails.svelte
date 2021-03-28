<script lang="ts">
	import Image from '../../../components/Image.svelte';
	import {TAuthState} from '../../../stores/auth/auth-store.interface';

	export let authState: TAuthState;
</script>

<div>
	<h3>Authorized via {authState.providerId}</h3>

	{#if (authState.email)}
		<p>
			Email: {authState.email}
		</p>
	{/if}

	{#if authState.profileImageUrl}
		<div class="avatar">
			<Image src="{authState.profileImageUrl}" alt="avatar"/>
		</div>
	{/if}


	<!--	<pre>{JSON.stringify(authState, null, 4)}</pre>-->
</div>

<style lang="less">
	.avatar {
		width: 96px;
		height: 96px;
		border: 3px solid var(--app-border-color);
		border-radius: 100%;
		overflow: hidden;
	}
</style>
