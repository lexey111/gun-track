<script lang="ts">
	import {getContext, onDestroy, onMount} from 'svelte';
	import {showError, showSuccess, showWarning} from '../../components/notifications/notify';
	import SpinnerComponent from '../../components/spinners/SpinnerComponent.svelte';
	import {Gun} from '../../models';
	import {AppStateStore} from '../../stores/app/app-state-store';
	import {TAppModal} from '../../stores/app/app-state-store.interface';
	import {GunsStore} from '../../stores/guns/guns-store';
	import {TGunsState} from '../../stores/guns/guns-store.interface';
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
					if (await GunsStore.createGun(gun)) {
						showSuccess('New gun was successfully registered.', gun.name || gun.make || gun.model);
					}
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
				onConfirm: (gun: Gun) => {
					modal.close();
					GunsStore.saveGun(gun);
				},
				onCancel: () => modal.close(),
			}
		});
	}

	const handleRemoveGun = async (id) => {
		const result = await GunsStore.removeGun(id)
		if (result) {
			showWarning('Record was removed successfully', 'Done');
		}
	};

	onMount(() => {
		gunsState$ = GunsStore.subscribe(value => {
			if (!value || value.isEmpty === null) {
				return;
			}
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

{#if (gunsState?.isEmpty === true)}
	<h2>There is no guns here yet</h2>
	<p>
		So it's the best time to register the first one!
	</p>
{/if}

{#if (!gunsState || gunsState?.isEmpty === null)}
	<p>
		<SpinnerComponent/>
		Please wait, loading data from server...
	</p>
{/if}

{#if (gunsState.isEmpty === true)}
	<h2>No guns is registered yet.</h2>
	<p>
		But it is the best time to start, you're lucky!
	</p>
	<p>
		<button class="press press-ghost press-blue" on:click={showNewGunDialog}>Register a Gun</button>
	</p>
{/if}

{#if (gunsState.isEmpty === false)}
	<h2>
		Registered guns [{gunsState?.guns?.length}]
		<span>
			<a href="#" on:click={showNewGunDialog}>Add one more</a>
		</span>
	</h2>
	<Guns
		guns={gunsState.guns}
		dateLocale={state.dateLocale}
		onRemove={handleRemoveGun}
		onEdit={showGunEditDialog}/>
{/if}

<style lang="less">
	@import "guns.less";

	h2 {
		display: flex;
		flex-flow: row nowrap;

		span {
			display: flex;
			flex-flow: row nowrap;
			align-content: center;
			align-items: center;
			margin-left: 32px;
			padding-left: 32px;
			border-left: 1px dashed var(--app-border-color);

			a {
				padding: 0;
				margin: 0;
				font-size: var(--app-font-size);
			}
		}
	}
</style>
