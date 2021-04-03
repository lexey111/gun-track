<script lang="ts">
	import Image from '../../../components/Image.svelte';
	import {IAuthStore, TAuthState} from '../../../stores/auth/auth-store.interface';
	import ProfileLogout from './ProfileLogout.svelte';

	export let authStore: IAuthStore = null;
	export let authState: TAuthState;
</script>


<h2>Authorized via {authState.providerId}</h2>

{#if (authState.email)}
	<p>
		<b>User ID:</b> {authState.email}
	</p>
	<hr>
{/if}

{#if authState.profileImageUrl}
	<div class="avatar">
		<Image src="{authState.profileImageUrl}" alt="avatar"/>
	</div>
	<hr>
{/if}
<ProfileLogout authStore={authStore} authState="{authState} "/>
<!--	<pre>{JSON.stringify(authState, null, 4)}</pre>-->

<style lang="less">
	.avatar {
		width: 96px;
		height: 96px;
		border: 3px solid var(--app-border-color);
		border-radius: 100%;
		overflow: hidden;
	}
</style>
