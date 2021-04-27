<script lang="ts">
	import AppOnlineComponent from './AppOnlineComponent.svelte';
	import {onDestroy, onMount, setContext} from 'svelte';

	import {Router} from 'svelte-routing';
	import Footer from '../components/Footer.svelte';
	import {I18nService} from '../components/i18n/i18n.service';
	import '../components/i18n/i18n.service.ts';
	import AppMenu from '../components/menu/AppMenu.svelte';
	import ModalComponent from '../components/modal/ModalComponent.svelte';
	import NotifyComponent from '../components/notifications/NotifyComponent.svelte';
	import AppSpinnerComponent from '../components/spinners/AppSpinnerComponent.svelte';
	import Routing from '../routing/Routing.svelte';
	import {AppStateStore} from '../stores/app/app-state-store';
	import {AppLocales} from '../stores/app/app-state-store.interface';

	import {AuthStore} from '../stores/auth/auth-store';
	import type {TAuthState} from '../stores/auth/auth-store.interface';

	import {extendHistoryTracking} from './history-helper';

	// auth store and state
	let auth_state: TAuthState;
	let authUnsubscribe: any;

	// app context (state)
	let app_state = {
		modal: {},
		path: '',
		locale: ''
	};

	let appStateUnsubscribe: any;

	onMount(() => {
		authUnsubscribe = AuthStore.subscribe(value => {
			auth_state = value;
		});
		let initialLocale = localStorage.getItem('app.locale');
		if (!AppLocales[initialLocale]) {
			initialLocale = 'en-EN';
		}

		AppStateStore.setLocale(initialLocale as any);

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

	// routing and history
	export let url = '';

	extendHistoryTracking();
	updateCurrentLocation();

	function updateCurrentLocation() {
		AppStateStore && AppStateStore.setPath(window.location.pathname);
	}

	onDestroy(() => {
		authUnsubscribe && authUnsubscribe();
		appStateUnsubscribe && appStateUnsubscribe();
	});
</script>

<ModalComponent/>
<NotifyComponent/>
<AppSpinnerComponent/>
<AppOnlineComponent/>

<main class={'app-content ' + (auth_state?.loggedIn ? 'logged-in' : 'logged-out')}>
	<h1>GUN | TRACK</h1>

	<Router url={url}>
		<AppMenu/>
		<Routing/>
	</Router>

	<Footer/>
</main>

<style lang="less">
	main {
		h1 {
			font-weight: 100;
			display: inline-flex;
			justify-content: flex-start;
			align-items: center;
			margin: 1em 0;
			padding: .5em 0;
			text-transform: uppercase;
			font-size: 2rem;

			color: var(--app-primary-text);
		}
	}
</style>
