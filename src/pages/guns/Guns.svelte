<script lang="ts">
	import {DataStore, Predicates} from '@aws-amplify/datastore';
	import {getContext, onDestroy, onMount} from 'svelte';
	import {Gun} from '../../models';
	import {TAppModal} from '../../stores/app/app-state-store.interface';
	import EditGunModal from './modals/EditGunModal.svelte';
	import NewGunModal from './modals/NewGunModal.svelte';
	import GunList from './sections/GunList.svelte';

	const modal = (getContext('AppState') as { modal: TAppModal }).modal;

	let busy = true;
	let guns: Array<Gun> = [];

	async function loadGuns() {
		busy = true;
		try {
			guns = await DataStore.query(Gun, Predicates.ALL, {
				page: 0,
				limit: 100
			});
		} catch (error) {
			console.log('Error retrieving posts', error);
		}
		busy = false;
	}

	async function createGun(name: string) {
		try {
			await DataStore.save(
				new Gun({name})
			);
		} catch (error) {
			console.log('Error on registering gun', error);
		}
	}

	async function saveGun(id: string, name: string) {
		const gun = guns.find(x => x.id === id);
		if (!gun) {
			console.log('Gun not found!');
			return;
		}

		try {
			await DataStore.save(
				Gun.copyOf(gun, updated => {
					updated.name = name;
				})
			);
		} catch (error) {
			console.log('Error on storing gun', error);
		}
	}

	async function removeGun(id: string) {
		busy = true;
		try {
			guns = await DataStore.delete(Gun, id);
		} catch (error) {
			console.log('Error removing posts', error);
		}
		busy = false;
	}

	const showNewGunDialog = () => {
		modal.open(NewGunModal, {
			closeButton: true,
			componentProps: {
				onConfirm: (name: string) => {
					modal.close();
					createGun(name);
				},
				onCancel: () => modal.close(),
			}
		});
	}

	const showGunEditDialog = (id: string) => {
		const gun = guns.find(x => x.id === id);
		if (!gun) {
			console.log('Gun not found!');
			return;
		}
		modal.open(EditGunModal, {
			closeButton: true,
			componentProps: {
				name: gun.name,
				onConfirm: (name: string) => {
					modal.close();
					saveGun(id, name);
				},
				onCancel: () => modal.close(),
			}
		});
	}

	let subscription;

	onMount(() => {
		subscription = DataStore.observe(Gun).subscribe(msg => {
			// console.log(msg.model, msg.opType, msg.element);
			void loadGuns();
		});
		void loadGuns();
	});

	onDestroy(() => {
		if (subscription) {
			subscription.unsubscribe();
		}
	});
</script>

<div class="app-page">
	{#if (guns.length === 0)}
		<h2>There is no guns here yet</h2>
		<p>
			So it's the best time to register the first one!
		</p>

	{/if}

	<button class="press press-ghost press-blue" on:click={showNewGunDialog}>Register a Gun</button>

	{#if (guns.length > 0)}
		<h2>Registered guns</h2>

		<GunList
			guns={guns}
			busy={busy}
			onRemove={removeGun}
			onEdit={showGunEditDialog}/>
	{/if}
</div>
