<script lang="ts">
	import {onDestroy, onMount, setContext} from 'svelte';
	import {Router} from 'svelte-routing';
	import AppMenu from '../components/AppMenu.svelte';
	import Footer from '../components/Footer.svelte';
	import Routing from '../config/Routing.svelte';
	import {AppStateStore} from '../stores/app/app-state-store';

	import {AuthStore} from '../stores/auth/auth-store';
	import {TAuthState} from '../stores/auth/auth-store.interface';

	import {extendHistoryTracking} from './history-helper';
	import ModalComponent from './modal/ModalComponent.svelte';

	// auth store and state
	let auth_state: TAuthState;
	const authUnsubscribe = AuthStore.subscribe(value => {
		auth_state = value;
	});

	// app context (state)
	let app_state = {
		modal: {},
		path: ''
	};
	const appStateUnsubscribe = AppStateStore.subscribe(value => {
		app_state.modal = value.modal;
		app_state.path = value.path;
	});
	setContext('AppState', app_state);

	// routing ans history
	export let url = '';

	extendHistoryTracking();
	updateCurrentLocation();

	function updateCurrentLocation() {
		AppStateStore.setPath(window.location.pathname);
	}

	['hashchange', 'locationchange'].forEach(eventName => {
		window.addEventListener(eventName, updateCurrentLocation)
	});

	// lifecycle
	onMount(() => {
		AuthStore.init();
	});

	onDestroy(() => {
		authUnsubscribe();
		appStateUnsubscribe();
	});
</script>

<ModalComponent/>

<main class={'app-content ' + (auth_state.loggedIn ? 'logged-in' : 'logged-out')}>
	<h1>GUN | TRACK</h1>

	<Router url="{url}">
		<AppMenu/>
		<Routing/>
	</Router>

	<Footer/>
</main>

<style lang="less">
	main {
		h1 {
			color: #1f3e5f;
			font-weight: 100;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			margin: .5em 0;
			padding: 0;
			text-transform: uppercase;
			font-size: 2rem;
		}
	}
</style>
