<script lang="ts">
	import {getContext, onDestroy, onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import {IConfirmDialog} from '../../components/modal/Confirm.interface';
	import Confirm from '../../components/modal/Confirm.svelte';
	import {showSuccess, showWarning} from '../../components/notifications/notify';
	import SpinnerComponent from '../../components/spinners/SpinnerComponent.svelte';
	import {ActionsStore} from '../../stores/actions/actions-store';
	import {TAction, TActionsState} from '../../stores/actions/actions-store.interface';
	import {AppStateStore} from '../../stores/app/app-state-store';
	import {TAppModal} from '../../stores/app/app-state-store.interface';
	import {GunsStore} from '../../stores/guns/guns-store';
	import {TGunsState} from '../../stores/guns/guns-store.interface';
	import {isEmpty} from '../../utils/objects';
	import ActionsFilter from './filter/ActionsFilter.svelte';
	import ActionList from './list/ActionList.svelte';
	import ActionModal from './modals/ActionModal.svelte';
	import GunNavigator from './navigator/GunNavigator.svelte';
	import ActionsSort from './sort/ActionsSort.svelte';
	import ActionsStat from './stat/ActionsStat.svelte';

	export let id;
	const modal = (getContext('AppState') as { modal: TAppModal }).modal;

	let gunsState: TGunsState;
	let gunsUnsubscribe;

	let actionsState: TActionsState;
	let actionsUnsubscribe;

	function subscribeToActions(gunId: string) {
		actionsUnsubscribe && actionsUnsubscribe();

		if (gunId) {
			ActionsStore.initStore(gunId);

			actionsUnsubscribe = ActionsStore.subscribe((value: TActionsState) => {
				if (!value) {
					return;
				}
				actionsState = value;
			});
		}
	}

	$: {
		if (id && gunsState?.fullReady) {
			subscribeToActions(id);
		}
	}
	$: {
		if (!actionsState || actionsState?.busy) {
			AppStateStore.showSpinner();
		} else {
			AppStateStore.hideSpinner();
		}
	}

	function processStore(value: TGunsState) {
		gunsState = value;
		if (!value?.guns || value.guns.length === 0) {
			if (id) {
				navigate('/track');
			}
			return; // empty Guns table
		}

		const storedId = localStorage.getItem('gun.current');

		const storedRecord = value.guns.find(item => item.id === storedId);
		const record = value.guns.find(item => item.id === id);

		const resetNeeded = (id && !record) || (storedId && !storedRecord) || (!id && !storedRecord);

		if (resetNeeded) {
			localStorage.setItem('gun.current', value.guns[0].id);
			navigate('/track/' + value.guns[0].id);
			return;
		}

		if (storedId && storedRecord && storedId !== id) {
			navigate('/track/' + storedId);
			return;
		}
	}

	const showNewActionDialog = () => {
		modal.open(ActionModal, {
			closeButton: true,
			// extraClass: 'almost-fullscreen',
			componentProps: {
				onConfirm: async (action: TAction) => {
					modal.close();
					console.log('action', action);
					if (await ActionsStore.registerAction(id, action)) {
						showSuccess('Action registered.');
					}
				},
				onCancel: () => modal.close(),
			}
		});
	}

	onMount(() => {
		gunsUnsubscribe = GunsStore.subscribe((value: TGunsState) => {
			if (!value) {
				return;
			}
			if (!value.fullReady) {
				return;
			}
			processStore(value);
		});
	})

	onDestroy(() => {
		gunsUnsubscribe && gunsUnsubscribe();
		actionsUnsubscribe && actionsUnsubscribe();
	});

	const handleEdit = (id: string) => {
		modal.open(ActionModal, {
			closeButton: true,
			componentProps: {
				action: actionsState.actions.find(a => a.id === id),
				onConfirm: async (action: TAction) => {
					modal.close();
					if (await ActionsStore.saveAction(action)) {
						showSuccess('Record updated.');
					}
				},
				onCancel: () => modal.close(),
			}
		});
	};

	let confirmDialog: IConfirmDialog;

	const handleDelete = (id: string) => {
		confirmDialog.showConfirmDialog({
			text: `Are you sure you want to delete this record? Operation cannot be undone!`,
			confirmText: 'Delete',
			onConfirm: async () => {
				const result = await ActionsStore.removeAction(id)
				if (result) {
					showWarning('Record was removed successfully', 'Done');
				}
			}
		});

	};
</script>

<Confirm bind:this={confirmDialog}/>

{#if (!gunsState || !gunsState.fullReady)}
	<p>
		<SpinnerComponent/>
		Loading...
	</p>
{:else }
	<GunNavigator id={id} gunsState={gunsState}/>

	<div class="top-panel">
		<div>
			<button class="press press-blue" on:click={showNewActionDialog}>Add an action</button>
		</div>


		{#if (!isEmpty(actionsState?.actions))}
			<ActionsStat actionsState={actionsState}/>
			<div class="stub"></div>

			{#if (actionsState?.actions?.length > 1)}
				<ActionsSort actionsState={actionsState}/>
			{/if}

		{:else }
			<div class="stub"></div>
		{/if}

		{#if (actionsState?.actions?.length > 1 || ActionsStore.isFiltered())}
			<ActionsFilter/>
		{/if}
	</div>

	{#if (!isEmpty(actionsState?.actions))}
		<ActionList
			onEdit={handleEdit}
			onDelete={handleDelete}
			actionsState={actionsState}/>
	{/if}
{/if}

<style lang="less">
	@import "track.less";
</style>
