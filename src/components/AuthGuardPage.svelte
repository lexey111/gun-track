<script lang="ts">
	import {onDestroy} from 'svelte';
	import {navigate} from 'svelte-routing';
	import {AuthStore} from '../stores/auth/auth-store';
	import type {TAuthState} from '../stores/auth/auth-store.interface';

	export let redirectTo = '/home';
	export let logout = false;
	export let component = void 0;
	export let props = {};

	export let params: any;

	let authProps = {
		authState: {} as TAuthState,
		authStore: AuthStore
	};

	const authUnsubscribe: any = AuthStore.subscribe(value => {
		authProps.authState = value;

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

<div class={'app-page' + ($$props.class ? ' ' + $$props.class : '')}>
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
