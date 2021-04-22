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
		currentGun = GunsStore.getGunById(id);
		currentGunTitle = currentGun?.name || currentGun?.make || currentGun?.model || 'unknown';
	}

</script>

<Confirm bind:this={confirmDialog}/>

{#if (gunsState && gunsState.fullReady)}
	{#if (!isEmpty(actionsState?.actions))}
		<div class="top-panel">
			<div class="top-panel-content">
				<div class="row">
					<GunNavigator id={id} gunsState={gunsState}/>

					<div>
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
				onEdit={handleEdit}
				onDelete={handleDelete}
				actionsState={actionsState}/>
		{:else }
			{#if (actionsState?.isEmpty === true)}
				<div class="no-records">
					<h2>No records here for {currentGunTitle}, yet.</h2>
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
			padding: 0 32px;
		}

		.top-panel {
			button.press-ghost {
				color: var(--app-primary-text);

				&:hover {
					color: var(--app-primary-text) !important;
				}
			}
		}

		.top-panel {
			display: flex;
			align-items: flex-start;
			width: 100%;
			white-space: nowrap;
			font-size: var(--app-small-font-size);

			background-color: var(--app-primary-bg);
			color: var(--app-primary-text);
			padding: 0;

			.top-panel-content {
				display: grid;
				grid-template-columns: 2fr 3fr 1fr 1fr;
				grid-gap: 8px;
				align-items: stretch;
				width: 100%;
				max-width: 100%;
				white-space: nowrap;
				margin: 0 0 8px 0;

				.row {
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					align-content: center;
					background-color: var(--app-primary-bg-light);
					color: var(--app-primary-text);
					padding: 0 16px;
					min-height: 80px;
					border-radius: 7px;
					transform-origin: top left;

					height: 100%;
					animation-name: top-panel-appear;
					animation-duration: .4s;
					animation-timing-function: ease-in-out;
				}

				.stat {
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					justify-content: flex-end;
					padding: 0 16px;
					min-height: 40px;
					height: 100%;

					background-color: var(--app-primary-bg-light);
					color: var(--app-primary-text);
					border-radius: 7px;
					transform-origin: top left;

					animation-name: top-panel-appear;
					animation-duration: .4s;
					animation-timing-function: ease-in-out;
				}

				.stat-content {
					display: flex;
					flex-flow: row nowrap;
					padding: 16px 0;
				}
			}

			position: relative;

			&:after {
				content: '';
				display: block;
				position: absolute;
				top: -32px;
				z-index: -1;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: var(--app-primary-bg);
				animation: none;
			}

			transform-origin: top left;
			animation-name: top-panel-appear;
			animation-duration: .4s;
			animation-timing-function: ease-in-out;
		}

		.page-content {
			animation-name: page-panel-appear;
			animation-duration: .4s;
			animation-timing-function: ease-in-out;
			position: relative;
			background-color: var(--app-background);
			border-radius: 17px 17px 0 0;

			&:after {
				content: '';
				display: block;
				position: absolute;
				top: -32px;
				z-index: 1;
				left: 0;
				right: 0;
				height: 32px;
				background-color: var(--app-primary-bg);
			}

			&:before {
				content: '';
				display: block;
				position: absolute;
				top: -32px;
				z-index: 2;
				left: 0;
				right: 0;
				height: 32px;
				background-color: var(--app-background);
				border-radius: 17px 17px 0 0;
			}
		}

		@keyframes top-panel-appear {
			0% {
				transform: translateY(15px);
			}
			100% {
				transform: translateY(0);
			}
		}

		@keyframes page-panel-appear {
			0% {
				opacity: 0;
				transform: translateY(-15px);
			}
			100% {
				opacity: 1;
				transform: translateY(0);
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
			background-color: var(--app-link-text);
			width: 48px;
			height: 48px;
			border-radius: 48px;
			cursor: pointer;
			color: #fff;
			transition: all .2s ease;
			box-shadow: 0 2px 8px rgba(0, 0, 0, .2);
			opacity: .8;
			backdrop-filter: blur(8px);
			padding: 2px;

			&:hover {
				background-color: var(--app-link-text-active);
				box-shadow: 0 0 12px rgba(0, 0, 0, .3);
				opacity: 1;
				transform: scale(1.2);
			}
		}
	}
</style>
