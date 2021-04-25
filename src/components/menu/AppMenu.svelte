<script lang="ts">
	import {onDestroy} from 'svelte';
	import {Link} from 'svelte-routing';
	import {menuRoutes} from '../../routing/menu.config';
	import {AppStateStore} from '../../stores/app/app-state-store';
	import {AuthStore} from '../../stores/auth/auth-store';
	import type {TAuthState} from '../../stores/auth/auth-store.interface';
	import Icon from '../icons/Icon.svelte';
	import LocaleMenu from './LocaleMenu.svelte';
	import ProfileMenu from './ProfileMenu.svelte';

	let activeRoutes = [];
	let current_path = 'home';

	let auth_state: TAuthState = null;

	function getActiveClass(route: string): string {
		return current_path.includes(route) ? 'active' : '';
	}

	function getActiveRoutes() {
		activeRoutes = menuRoutes
			.filter(entry => {
				let result = true;
				if (!auth_state?.loggedIn && entry[2] === true) {
					result = false;
				}
				if (auth_state?.loggedIn && entry[2] === false) {
					result = false;
				}
				return result;
			})
			.map((entry: any) => [entry[0], entry[1], getActiveClass(entry[0])]);
	}

	// initial state
	getActiveRoutes();

	const authUnsubscribe = AuthStore.subscribe(value => {
		auth_state = value;
		getActiveRoutes();
	});

	// react on location change
	const appStateUnsubscribe = AppStateStore.subscribe(value => {
		if (current_path !== value.path) {
			current_path = value.path || 'home';
			getActiveRoutes();
		}
	});

	onDestroy(() => {
		appStateUnsubscribe();
		authUnsubscribe();
	});
</script>

<nav class="app-navigation">
	{#each activeRoutes as [path, name, className]}
		<Link to={path} class={className}>
			{#if (path === 'home')}
				<Icon type="home"/> &nbsp;
			{/if}
			{name}
		</Link>
	{/each}
	<LocaleMenu/>
	<ProfileMenu/>
</nav>

<style lang="less">
	:global {
		.app-navigation {
			display: flex;
			flex-flow: row wrap;
			z-index: 2;

			justify-content: flex-start;
			align-items: center;
			font-size: .8rem;
			height: 70px;
			transition: background-color .2s ease, color .1s ease;

			& > a, a:visited {
				text-shadow: 0 1px 0 rgba(0, 0, 0, .2);
				display: flex;
				align-content: center;
				align-items: center;
				width: auto;
				height: 50px;
				padding: 0 16px;
				margin: 8px;
				color: var(--app-primary-text);
				text-decoration: none;
				transition: background-color .2s ease, color .1s ease;
				border-radius: 7px;
				text-transform: uppercase;

				&:hover, &:active, &:focus {
					color: #fff;
					background-color: rgba(255, 255, 255, .1);
					outline: none !important;
				}

				&[aria-current="page"], &.active {
					background-color: var(--app-primary-bg-light);
					color: var(--app-primary-text);
					font-weight: bold;
				}
			}
		}
	}
</style>
