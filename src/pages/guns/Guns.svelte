<script lang="ts">
	import * as dayjs from 'dayjs'
	import {getContext, onDestroy, onMount} from 'svelte';
	import {NotifyStore} from '../../app/notifications/notify-store';
	import {Gun} from '../../models';
	import {TAppModal} from '../../stores/app/app-state-store.interface';
	import {GunsStore} from '../../stores/guns/guns-store';
	import {TGunsState} from '../../stores/guns/guns-store.interface';
	import EditGunModal from './modals/EditGunModal.svelte';
	import NewGunModal from './modals/NewGunModal.svelte';
	import GunList from './sections/GunList.svelte';

	const modal = (getContext('AppState') as { modal: TAppModal }).modal;

	let gunsUnsubscribe;
	let gunsState: TGunsState = {
		busy: true,
		isEmpty: null,
		guns: []
	};

	const showNewGunDialog = () => {
		modal.open(NewGunModal, {
			closeButton: true,
			componentProps: {
				onConfirm: async (name: string) => {
					modal.close();
					if (await GunsStore.createGun(name)) {
						NotifyStore.push({
							title: name,
							type: 'success',
							text: 'New gun was successfully registered.'
						});
					}
				},
				onCancel: () => modal.close(),
			}
		});
	}

	const showGunEditDialog = (id: string) => {
		const gun: Gun = gunsState.guns.find(x => x.id === id);
		if (!gun) {
			NotifyStore.push({
				title: 'Error',
				type: 'error',
				text: `Gun not found: ${id}!`
			});
			return;
		}
		modal.open(EditGunModal, {
			closeButton: true,
			componentProps: {
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
			NotifyStore.push({
				title: 'Done',
				type: 'warn',
				text: 'Record was removed successfully'
			});
		}
	};

	onMount(() => {
		gunsUnsubscribe = GunsStore.subscribe(value => {
			gunsState.guns = value.guns;
			gunsState.isEmpty = value.isEmpty;
			gunsState.busy = value.busy;
		});
	});

	onDestroy(() => {
		if (gunsUnsubscribe) {
			gunsUnsubscribe();
		}
	});
</script>

<div class="app-page">
	{#if (gunsState.isEmpty === true)}
		<h2>There is no guns here yet</h2>
		<p>
			So it's the best time to register the first one!
		</p>
	{/if}

	<button class="press press-ghost press-blue" on:click={showNewGunDialog}>Register a Gun</button>

	{#if (gunsState.isEmpty === false)}
		<h2>Registered guns</h2>

		<GunList
			guns={gunsState.guns}
			onRemove={handleRemoveGun}
			onEdit={showGunEditDialog}/>
	{/if}
</div>
