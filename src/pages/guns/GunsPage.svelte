<script lang="ts">
	import * as dayjs from 'dayjs'
	import {getContext, onDestroy, onMount} from 'svelte';
	import {showError, showSuccess, showWarning} from '../../components/notifications/notify';
	import SpinnerComponent from '../../components/SpinnerComponent.svelte';
	import {Gun} from '../../models';
	import {TAppModal} from '../../stores/app/app-state-store.interface';
	import {GunsStore} from '../../stores/guns/guns-store';
	import {TGunsState} from '../../stores/guns/guns-store.interface';
	import GunModal from './modals/GunModal.svelte';
	import GunList from './sections/GunList.svelte';

	const modal = (getContext('AppState') as { modal: TAppModal }).modal;

	let gunsUnsubscribe;
	let gunsState: TGunsState = {
		busy: true,
		fullReady: false,
		isEmpty: null,
		guns: []
	};

	const showNewGunDialog = () => {
		modal.open(GunModal, {
			closeButton: true,
			componentProps: {
				isNew: true,
				onConfirm: async (name: string) => {
					modal.close();
					if (await GunsStore.createGun(name)) {
						showSuccess('New gun was successfully registered.', name);
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
				isNew: false,
				name: gun.name,
				registered: dayjs().format(gun.dateCreated),
				onConfirm: (name: string) => {
					modal.close();
					GunsStore.saveGun(id, name);
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
		gunsUnsubscribe = GunsStore.subscribe(value => {
			if (!value || value.isEmpty === null) {
				return;
			}
			gunsState = value;
		});
	});

	onDestroy(() => {
		gunsUnsubscribe && gunsUnsubscribe();
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

{#if (gunsState.isEmpty !== null)}
	<button class="press press-ghost press-blue" on:click={showNewGunDialog}>Register a Gun</button>
{/if}

{#if (gunsState.isEmpty === false)}
	<h2>Registered guns</h2>

	<GunList
		guns={gunsState.guns}
		onRemove={handleRemoveGun}
		onEdit={showGunEditDialog}/>
{/if}
