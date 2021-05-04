<script lang="ts">
	import Storage from '@aws-amplify/storage';
	import {onDestroy, onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import Button from '../../components/buttons/Button.svelte';
	import {I18nService} from '../../components/i18n/i18n.service';
	import I18n from '../../components/i18n/I18n.svelte';
	import Icon from '../../components/icons/Icon.svelte';
	import type {IConfirmDialog} from '../../components/modal/Confirm.interface';
	import Confirm from '../../components/modal/Confirm.svelte';
	import {showError, showWarning} from '../../components/notifications/notify';
	import {ActionsStore} from '../../stores/actions/actions-store';
	import {AppStateStore} from '../../stores/app/app-state-store';
	import {GunsStore} from '../../stores/guns/guns-store';
	import type {TGunsState} from '../../stores/guns/guns-store.interface';
	import {getErrorText} from '../../utils/errors';
	import Guns from './guns/Guns.svelte';

	let confirmDialog: IConfirmDialog;

	let gunsState$: any;
	let gunsState: TGunsState = {
		busy: true,
		fullReady: false,
		isEmpty: null,
		guns: []
	};
	let appState$: any;
	const state = {dateLocale: 'en'};

	const addGun = () => {
		navigate('/guns/new/edit');
	}

	let gunNotFound: string;
	let recordWasRemoved: string;
	let doneCaption: string;
	let areYouSurePart1: string;
	let areYouSurePart2: string;
	let areYouSurePart3: string;
	let deleteText: string;

	const doRemoveGun = async (id: string) => {
		AppStateStore.showSpinner();
		try {
			const gun = GunsStore.getGunById(id);
			if (!gun) {
				throw new Error(gunNotFound);
			}
			if (gun.photo) {
				await Storage.remove(gun.photo, {
					level: 'private',
				});
			}
			//
			const result = await GunsStore.removeGun(id);
			if (result) {
				showWarning(recordWasRemoved, doneCaption);
			}
		} catch (e) {
			showError(getErrorText(e));
		} finally {
			AppStateStore.hideSpinner();
		}
	};

	const handleRemoveGun = async (id: string) => {
		try {
			const gun = GunsStore.getGunById(id);
			if (!gun) {
				throw new Error(gunNotFound);
			}
			AppStateStore.showSpinner();

			const actionsCount = await ActionsStore.countRecordsForGun(id);

			AppStateStore.hideSpinner();

			confirmDialog.show({
				text: areYouSurePart1 + `\n${areYouSurePart2}: [${gun.name}], ${areYouSurePart3}: ${actionsCount}.
			`,
				confirmText: deleteText,
				onConfirm: () => doRemoveGun(id)
			});
		} catch (e) {
			showError(getErrorText(e));
		} finally {
			AppStateStore.hideSpinner();
		}
	};

	onMount(() => {
		void I18nService.translate('@Common.gunNotFound').then(s => gunNotFound = s);
		void I18nService.translate('@Common.recordWasRemoved').then(s => recordWasRemoved = s);
		void I18nService.translate('@Common.Done').then(s => doneCaption = s);
		void I18nService.translate('@Common.Delete').then(s => deleteText = s);
		void I18nService.translate('@Guns.AreYouSurePart1').then(s => areYouSurePart1 = s);
		void I18nService.translate('@Guns.AreYouSurePart2').then(s => areYouSurePart2 = s);
		void I18nService.translate('@Guns.AreYouSurePart3').then(s => areYouSurePart3 = s);

		AppStateStore.showSpinner();
		gunsState$ = GunsStore.subscribe(value => {
			if (!value || value.isEmpty === null) {
				return;
			}
			AppStateStore.hideSpinner();
			gunsState = value;
		});

		appState$ = AppStateStore.subscribe(value => {
			if (value.dateLocale && value.dateLocale !== state.dateLocale) {
				state.dateLocale = value.dateLocale;
			}
		})
	});

	onDestroy(() => {
		gunsState$ && gunsState$();
		appState$ && appState$();
	});
</script>

<Confirm bind:this={confirmDialog}/>

{#if (gunsState?.isEmpty !== null)}
	{#if (gunsState?.isEmpty === true)}
		<div class="page-content extra-paddings-2">
			<h2>
				<I18n>@Guns.NothingRegistered</I18n>
			</h2>
			<p>
				<I18n>@Guns.RegisterFirst</I18n>
			</p>
			<p>
				<Button on:click={addGun}>
					<Icon type="plus-circle" size="24px" class="inline"/>
					<I18n>@Guns.RegisterAGun</I18n>
				</Button>
			</p>
		</div>
	{/if}

	{#if (gunsState?.isEmpty === false)}
		{#if (gunsState.guns.length < 7)}
			<div class="top-panel">
				<div class="top-panel-content">
					<div class="block block-left">
						<Button
							type="toolbar"
							on:click={addGun}>
							<Icon type="plus-circle" size="24px" class="inline"/>
							<I18n>@Guns.RegisterOneMore</I18n>
						</Button>
					</div>

					<div class="block block-info">
						<div class="stat-exp">
							<I18n>@Guns.Registered</I18n>
						</div>
						<div class="block-content">
							<ul>
								<li>{gunsState?.guns?.length}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<div class="page-content extra-paddings">
			<Guns
				guns={gunsState?.guns}
				dateLocale={state.dateLocale}
				onRemove={handleRemoveGun}/>
		</div>
	{/if}
{/if}


<style>
    .extra-paddings-2 {
        padding: 16px 32px !important;
    }
</style>
