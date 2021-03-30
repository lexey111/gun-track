<script lang="ts">
	import {onDestroy, onMount, setContext} from 'svelte';

	import {Router} from 'svelte-routing';
	import AppMenu from '../components/AppMenu.svelte';
	import AppSpinnerComponent from '../components/AppSpinnerComponent.svelte';
	import Footer from '../components/Footer.svelte';
	import Routing from '../config/Routing.svelte';
	import {AppStateStore} from '../stores/app/app-state-store';

	import {AuthStore} from '../stores/auth/auth-store';
	import {TAuthState} from '../stores/auth/auth-store.interface';

	import {extendHistoryTracking} from './history-helper';
	import {I18nService} from './i18n/i18n.service';
	import './i18n/i18n.service.ts';
	import ModalComponent from './modal/ModalComponent.svelte';
	import NotifyComponent from './notifications/NotifyComponent.svelte';

	// auth store and state
	let auth_state: TAuthState;
	let authUnsubscribe;

	// app context (state)
	let app_state = {
		modal: {},
		path: '',
		locale: ''
	};

	let appStateUnsubscribe;

	onMount(() => {
		authUnsubscribe = AuthStore.subscribe(value => {
			auth_state = value;
		});

		appStateUnsubscribe = AppStateStore.subscribe(value => {
			app_state.modal = value.modal;
			app_state.path = value.path;
			app_state.locale = value.locale;

			I18nService.setLocale(value.locale);
		});

		['hashchange', 'locationchange'].forEach(eventName => {
			window.addEventListener(eventName, updateCurrentLocation)
		});
	});

	setContext('AppState', app_state);

	// routing ans history
	export let url = '';

	extendHistoryTracking();
	updateCurrentLocation();

	function updateCurrentLocation() {
		AppStateStore && AppStateStore.setPath(window.location.pathname);
	}

	// lifecycle
	onDestroy(() => {
		authUnsubscribe();
		if (appStateUnsubscribe) {
			appStateUnsubscribe();
		}
	});
</script>

<ModalComponent/>
<NotifyComponent/>
<AppSpinnerComponent/>

<main class={'app-content ' + (auth_state?.loggedIn ? 'logged-in' : 'logged-out')}>
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
