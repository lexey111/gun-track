<script lang="ts">
	import {onDestroy} from 'svelte';
	import {navigate} from 'svelte-routing';
	import {AuthStore} from '../stores/auth/auth-store';
	import {TAuthState} from '../stores/auth/auth-store.interface';

	export let redirectTo = '/home';
	export let logout = false;
	export let component = void 0;
	export let props = {};

	export let params;

	let authRequested = false;

	let authProps = {
		authState: {} as TAuthState,
		authStore: AuthStore
	};

	const authUnsubscribe = AuthStore.subscribe(value => {
		authProps.authState = value;
		authRequested = value.started;

		if (logout) {
			if (authProps.authState.started && !authProps.authState.fetching && authProps.authState.loggedIn) {
				navigate(redirectTo);
			}
			return;
		}
		if (!logout) {
			if (authProps.authState.started && !authProps.authState.fetching && !authProps.authState.loggedIn) {
				navigate(redirectTo);
			}
		}
	});

	onDestroy(() => {
		authUnsubscribe();
	});
</script>

<div class="app-page">
	{#if (!authProps.authState.started || authProps.authState.fetching)}
		<div class="wait-message">Getting authorization, please wait...</div>
	{:else}
		{#if (!logout && authProps.authState.loggedIn)}
			<svelte:component this={component} {...{...props, ...authProps, ...params}}/>
		{/if}
		{#if (logout && !authProps.authState.loggedIn)}
			<svelte:component this={component} {...{...props, ...authProps, ...params}}/>
		{/if}
	{/if}
</div>

<style lang="less">
	.wait-message {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 1px;
		color: var(--app-remark-text);
		font-style: italic;
		font-size: .8em;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
