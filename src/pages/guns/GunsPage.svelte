<script lang="ts">
	import {getContext, onDestroy, onMount} from 'svelte';
	import Button from '../../components/buttons/Button.svelte';
	import Icon from '../../components/icons/Icon.svelte';
	import type {IConfirmDialog} from '../../components/modal/Confirm.interface';
	import Confirm from '../../components/modal/Confirm.svelte';
	import {showError, showSuccess, showWarning} from '../../components/notifications/notify';
	import type {Gun} from '../../models';
	import {ActionsStore} from '../../stores/actions/actions-store';
	import {AppStateStore} from '../../stores/app/app-state-store';
	import type {TAppModal} from '../../stores/app/app-state-store.interface';
	import {GunsStore} from '../../stores/guns/guns-store';
	import type {TGunsState} from '../../stores/guns/guns-store.interface';
	import {getErrorText} from '../../utils/errors';
	import Guns from './guns/Guns.svelte';
	import GunModal from './modals/GunModal.svelte';

	const modal = (getContext('AppState') as { modal: TAppModal }).modal;
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

	const showNewGunDialog = () => {
		modal.open(GunModal, {
			closeButton: true,
			componentProps: {
				gun: null,
				onConfirm: async (gun: Gun) => {
					modal.close();
					AppStateStore.showSpinner();
					if (await GunsStore.createGun(gun)) {
						showSuccess('New gun was successfully registered.', gun.name || gun.make || gun.model);
					}
					AppStateStore.hideSpinner();

				},
				onCancel: () => modal.close(),
			}
		});
	}

	const showGunEditDialog = (id: string) => {
		const gun: Gun = gunsState.guns.find(x => x.id === id);
		if (!gun) {
			showError(`Gun not found: ${id}!`, 'Error');
			return;
		}

		modal.open(GunModal, {
			closeButton: true,
			componentProps: {
				gun,
				onConfirm: async (gun: Gun) => {
					modal.close();
					AppStateStore.showSpinner();
					await GunsStore.saveGun(gun);
					AppStateStore.hideSpinner();
				},
				onCancel: () => modal.close(),
			}
		});
	}

	const doRemoveGun = async (id: string) => {
		try {
			const result = await GunsStore.removeGun(id);
			if (result) {
				showWarning('Record was removed successfully', 'Done');
			}
		} catch (e) {
			showError(getErrorText(e));
		}
	};

	const handleRemoveGun = async (id: string) => {
		try {
			const gun = GunsStore.getGunById(id);
			if (!gun) {
				throw new Error('Gun not found!');
			}
			AppStateStore.showSpinner();
			const actionsCount = await ActionsStore.countRecordsForGun(id);
			console.log('Records count', actionsCount);

			confirmDialog.show({
				text: `Are you sure you want to delete this gun? Operation cannot be undone!
\n
Gun to delete: [${gun.name}], records: ${actionsCount}.
			`,
				confirmText: 'Delete',
				onConfirm: () => doRemoveGun(id)
			});
		} catch (e) {
			showError(getErrorText(e));
		} finally {
			AppStateStore.hideSpinner();
		}
	};

	onMount(() => {
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
<input type="file" style="display: none" accept=".jpg, .jpeg, .png" id="photoFileInput">

{#if (gunsState?.isEmpty !== null)}
	{#if (gunsState?.isEmpty === true)}
		<div class="page-content extra-paddings">
			<h2>No guns is registered yet.</h2>
			<p>
				But it is the best time to start, you're lucky!
			</p>
			<p>
				<Button onClick={showNewGunDialog}>
					<Icon type="plus-circle" size="24px" class="inline"/>
					Register a Gun
				</Button>
			</p>
		</div>
	{/if}

	{#if (gunsState?.isEmpty === false)}
		<div class="top-panel">
			<div class="top-panel-content">
				<div class="block block-left">
					<Button
						type="toolbar"
						onClick={showNewGunDialog}>
						<Icon type="plus-circle" size="24px" class="inline"/>
						Register one more...
					</Button>
				</div>

				<div class="block block-info">
					<div class="stat-exp">
						Registered
					</div>
					<div class="block-content">
						<ul>
							<li>{gunsState?.guns?.length}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div class="page-content extra-paddings">
			<Guns
				guns={gunsState?.guns}
				dateLocale={state.dateLocale}
				onRemove={handleRemoveGun}
				onEdit={showGunEditDialog}/>
		</div>
	{/if}
{/if}
