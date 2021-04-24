<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import {resolvePage} from '../routing/route-resolver';
	import {AuthStore} from '../stores/auth/auth-store';
	import type {TAuthState} from '../stores/auth/auth-store.interface';
	import SpinnerComponent from './spinners/SpinnerComponent.svelte';

	export let pageId = '';
	export let redirectTo = '';
	export let onlyLoggedIn = false;
	export let onlyLoggedOut = false;
	export let props = {};
	export let params: any;

	let cmp: any;

	const needAuth = onlyLoggedOut || onlyLoggedIn;

	const setComponent = (component: any) => {
		console.log('component assigned');
		cmp = component;
	}

	const logError = (err: any) => {
		console.error(err && err.stack || err);
	}

	let authProps = {
		authState: {} as TAuthState,
		authStore: AuthStore
	};

	const authUnsubscribe: any = AuthStore.subscribe(value => {
		authProps.authState = value;
		if (!needAuth) {
			return;
		}

		if (authProps.authState.started && !authProps.authState.fetching) {
			if (onlyLoggedOut && authProps.authState.loggedIn) {
				navigate(redirectTo);
				return;
			}
			if (onlyLoggedIn && !authProps.authState.loggedIn) {
				navigate(redirectTo);
				return;
			}
			if (!cmp) {
				console.log('auth resolved, loading:', pageId);
				void resolvePage(pageId)
					.then(setComponent);
			}
		}
	});

	onDestroy(() => {
		authUnsubscribe();
	});

	onMount(() => {
		if (!needAuth) {
			void resolvePage(pageId)
				.then(setComponent);
		}
	});
</script>

<div class={'app-page' + ($$props.class ? ' ' + $$props.class : '') + (cmp ? ' loaded' : ' not-loaded')}>
	{#if (cmp)}
		<svelte:component this={cmp} {...{...props, ...authProps, ...params}}/>
	{:else}
		<div class="wait-message">
			<SpinnerComponent/>
			Loading...
		</div>
	{/if}
</div>
