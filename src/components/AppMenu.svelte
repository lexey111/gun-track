<script lang="ts">
	import {onDestroy} from 'svelte';
	import {Link} from 'svelte-routing';
	import {menuRoutes} from '../config/menu.config';
	import {AppStateStore} from '../stores/app/app-state-store';
	import {AuthStore} from '../stores/auth/auth-store';
	import {TAuthState} from '../stores/auth/auth-store.interface';

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
			.map(entry => [entry[0], entry[1], getActiveClass(entry[0])]);
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
	{#each activeRoutes as [path, name, className], i}
		<Link to={path} class={className}>{name}</Link>
	{/each}
</nav>

<style lang="less">
	:global {
		.logged-out nav.app-navigation {
			background-color: rgba(125, 128, 128, .5);
			backdrop-filter: blur(7px);

			a, a:visited {
				color: var(--app-menu-logged-out-text);

				&[aria-current="page"], &.active {
					background-color: rgba(242, 242, 242, .5);
					backdrop-filter: blur(7px);
					color: var(--app-text);
				}
			}
		}

		.app-navigation {
			display: flex;
			flex-flow: row wrap;

			background-color: rgba(52, 105, 132, 0.5);
			backdrop-filter: blur(7px);

			justify-content: center;
			font-size: .8rem;
			height: 40px;
			transition: background-color .2s ease, color .1s ease;

			a, a:visited {
				text-shadow: 0 1px 0 rgba(0, 0, 0, .2);
				display: flex;
				align-content: center;
				align-items: center;
				width: auto;
				padding: 8px 16px;
				color: var(--app-menu-logged-in-text);
				text-decoration: none;
				transition: background-color .2s ease, color .1s ease;

				&:hover, &:active {
					color: #fff;
					background-color: rgba(255, 255, 255, .2);
				}

				&[aria-current="page"] {
					background-color: #fff;
					color: var(--app-menu-logged-in-bg);
				}
			}
		}
	}
</style>
