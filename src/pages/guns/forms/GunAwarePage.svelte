<script type="ts">
	import {onDestroy, onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import {I18nService} from '../../../components/i18n/i18n.service';
	import I18n from '../../../components/i18n/I18n.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import type {Gun} from '../../../models';
	import {AppStateStore} from '../../../stores/app/app-state-store';
	import {GunsStore} from '../../../stores/guns/guns-store';
	import type {TGunsState} from '../../../stores/guns/guns-store.interface';

	export let id: string;
	export let component: any;

	let gun: Gun;
	let loadingError: string;
	let gunsState$: any;
	let gunsState: TGunsState = {
		busy: true,
		fullReady: false,
		isEmpty: null,
		guns: []
	};

	const gotoGuns = () => {
		navigate('/guns');
	}

	let gunNotFound: string;
	let tooManyGuns: string;

	onMount(() => {
		AppStateStore.showSpinner();

		void I18nService.translate('@Common.gunNotFound').then(s => gunNotFound = s);
		void I18nService.translate('@Guns.TooManyGuns').then(s => tooManyGuns = s);

		gunsState$ = GunsStore.subscribe(value => {
			if (!value || value.isEmpty === null) {
				return;
			}
			AppStateStore.hideSpinner();
			gunsState = value;

			gun = GunsStore.getGunById(id);

			if (id === 'new' && GunsStore.gunCount() >= 7) {
				loadingError = tooManyGuns || 'There are only 7 guns could be registered, sorry.';
				return;
			}

			if (!gun && id !== 'new') {
				loadingError = gunNotFound || 'Gun not found.';
			}
		});
	});

	onDestroy(() => {
		gunsState$ && gunsState$();
	});
</script>

{#if (loadingError)}
	<h1 class="error">
		<I18n>@Common.Error</I18n>
	</h1>
	<p>{loadingError}</p>
	<p>&nbsp;</p>
	<Button type="ghost" on:click={gotoGuns}>
		<Icon type="arrow-left"/> &nbsp;
		<I18n>@Guns.ReturnToGuns</I18n>
	</Button>
{/if}

{#if (gunsState?.fullReady && !loadingError)}
	<svelte:component this={component} {gun}/>
{/if}
