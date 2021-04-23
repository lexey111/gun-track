<script lang="ts">
	import {getContext, onDestroy, onMount} from 'svelte';

	import {navigate} from 'svelte-routing';
	import Button from '../../components/buttons/Button.svelte';
	import Icon from '../../components/icons/Icon.svelte';
	import type {IConfirmDialog} from '../../components/modal/Confirm.interface';
	import Confirm from '../../components/modal/Confirm.svelte';
	import {showSuccess, showWarning} from '../../components/notifications/notify';
	import {Gun} from '../../models';
	import {ActionsStore} from '../../stores/actions/actions-store';
	import type {TAction, TActionsState} from '../../stores/actions/actions-store.interface';
	import {AppStateStore} from '../../stores/app/app-state-store';
	import type {TAppModal} from '../../stores/app/app-state-store.interface';
	import {GunsStore} from '../../stores/guns/guns-store';
	import type {TGunsState} from '../../stores/guns/guns-store.interface';
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

		if (id && record && (storedId !== id)) {
			localStorage.setItem('gun.current', id);
			return;
		}

		if (id && record) {
			return;
		}

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
					AppStateStore.showSpinner();
					if (await ActionsStore.registerAction(id, action)) {
						showSuccess('Action registered.');
					}
					AppStateStore.hideSpinner();
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
					AppStateStore.showSpinner();
					if (await ActionsStore.saveAction(action)) {
						showSuccess('Record updated.');
					}
					AppStateStore.hideSpinner();
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
				AppStateStore.showSpinner();
				const result = await ActionsStore.removeAction(id)
				AppStateStore.hideSpinner();
				if (result) {
					showWarning('Record was removed successfully', 'Done');
				}
			}
		});

	};


	let currentGun: Gun;
	let currentGunTitle;
	$: {
		currentGun = GunsStore.getGunById(id || '');
		currentGunTitle = currentGun?.name || currentGun?.make || currentGun?.model || 'unknown';
	}

</script>

<Confirm bind:this={confirmDialog}/>

{#if (gunsState && gunsState.fullReady)}
	{#if (!isEmpty(actionsState?.actions) || ActionsStore.isFiltered())}
		<div class="top-panel">
			<div class="top-panel-content">
				<div class="stat">
					<div class="stat-content">
						<Button onClick={showNewActionDialog} type="text">
							<Icon type="plus-circle" class="inline" size="24px"/>
							Add record...
						</Button>
					</div>
				</div>

				<ActionsStat actionsState={actionsState}/>

				{#if (actionsState?.actions?.length > 1)}
					<ActionsSort actionsState={actionsState}/>
				{/if}

				{#if (actionsState?.actions?.length > 1 || ActionsStore.isFiltered())}
					<ActionsFilter/>
				{/if}
			</div>
		</div>
	{/if}

	<div class="page-content">
		{#if (!isEmpty(actionsState?.actions))}
			<ActionList
				{id} {gunsState}
				onEdit={handleEdit}
				onDelete={handleDelete}
				actionsState={actionsState}/>
		{:else }
			{#if (actionsState?.isEmpty === true && !ActionsStore.isFiltered())}
				<div class="no-records">
					<h2>No records here for <i>{currentGunTitle}</i>, yet.</h2>
					<p>
						But it is the best time to create one!
					</p>
					<p>
						<Button onClick={showNewActionDialog}>
							<Icon type="plus-circle" size="24px" class="inline"/>
							Add record...
						</Button>
					</p>
					{#if gunsState.guns.length > 1}
						<div>
							<p>Or you can select another gun:</p>
							<GunNavigator id={id} gunsState={gunsState}/>
						</div>
					{/if}
				</div>
			{/if}
			{#if (actionsState?.isEmpty === true && ActionsStore.isFiltered())}
				<div class="no-records">
					<h2>No data to display</h2>
					<p>
						There are no records here for <i>{currentGunTitle}</i> with filtering applied.
					</p>
				</div>
			{/if}
		{/if}

		{#if (actionsState?.actions?.length > 4)}
			<div class="container-floating">
				<div class="floating-add-action" on:click={showNewActionDialog}>
					<Icon type="plus-circle" size="48px"/>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style lang="less">
	:global {
		.no-records {
			padding: 32px;
		}

		.top-panel {
			.top-panel-content {
				grid-template-columns: 1fr 2fr 1fr 1fr;
			}
		}
	}

	.container-floating {
		position: fixed;
		margin: 0 auto;
		min-width: 600px;
		max-width: 80vw;
		width: 100%;
		bottom: 64px;
		z-index: 10;

		.floating-add-action {
			position: absolute;
			right: 40px;
			bottom: 0;
			background-color: var(--app-primary-bg);
			width: 48px;
			height: 48px;
			border-radius: 48px;
			cursor: pointer;
			color: #fff;
			transition: all .2s ease;
			box-shadow: 0 2px 8px rgba(0, 0, 0, .4);
			opacity: .8;
			backdrop-filter: blur(8px);
			padding: 2px;

			&:hover {
				background-color: var(--app-primary-bg-lighten);
				box-shadow: 0 0 12px rgba(0, 0, 0, .5);
				opacity: 1;
				transform: scale(1.2);
			}
		}
	}
</style>
