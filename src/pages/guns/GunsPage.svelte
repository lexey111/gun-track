<script lang="ts">
	import {getContext, onDestroy, onMount} from 'svelte';
	import Button from '../../components/buttons/Button.svelte';
	import Icon from '../../components/icons/Icon.svelte';
	import {showError, showSuccess, showWarning} from '../../components/notifications/notify';
	import type {Gun} from '../../models';
	import {AppStateStore} from '../../stores/app/app-state-store';
	import type {TAppModal} from '../../stores/app/app-state-store.interface';
	import {GunsStore} from '../../stores/guns/guns-store';
	import type {TGunsState} from '../../stores/guns/guns-store.interface';
	import Guns from './guns/Guns.svelte';
	import GunModal from './modals/GunModal.svelte';

	const modal = (getContext('AppState') as { modal: TAppModal }).modal;

	let gunsState$;
	let gunsState: TGunsState = {
		busy: true,
		fullReady: false,
		isEmpty: null,
		guns: []
	};
	let appState$;
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

	const handleRemoveGun = async (id) => {
		AppStateStore.showSpinner();
		const result = await GunsStore.removeGun(id)
		if (result) {
			showWarning('Record was removed successfully', 'Done');
		}
		AppStateStore.hideSpinner();
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
				<div class="stat">
					<Button
						type="text"
						onClick={showNewGunDialog}>
						<Icon type="plus-circle" size="24px" class="inline"/>
						Register one more...
					</Button>
				</div>

				<div class="stat stat-info">
					<div class="stat-exp">
						Registered
					</div>
					<ul>
						<li>{gunsState?.guns?.length}</li>
					</ul>
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

<style lang="less">
	.top-panel {
		.top-panel-content {
			grid-template-columns: 1fr 1fr 4fr;

			.stat, .stat.stat-info {
				text-align: left;
				justify-items: flex-start;
				justify-content: flex-start;
			}
		}
	}

	h2 {
		display: flex;
		flex-flow: row nowrap;
		align-content: center;
		align-items: center;

		span {
			display: flex;
			flex-flow: row nowrap;
			align-content: center;
			align-items: center;
			margin-left: 32px;
			padding-left: 16px;
			border-left: 1px dashed #ccc;
		}
	}
</style>
