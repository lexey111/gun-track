<script lang="ts">
	import {getContext, onDestroy, onMount} from 'svelte';

	import {navigate} from 'svelte-routing';
	import Button from '../../components/buttons/Button.svelte';
	import Icon from '../../components/icons/Icon.svelte';
	import type {IConfirmDialog} from '../../components/modal/Confirm.interface';
	import Confirm from '../../components/modal/Confirm.svelte';
	import {showWarning} from '../../components/notifications/notify';
	import {ActionsStore} from '../../stores/actions/actions-store';
	import type {TActionsState} from '../../stores/actions/actions-store.interface';
	import {AppStateStore} from '../../stores/app/app-state-store';
	import type {TAppModal} from '../../stores/app/app-state-store.interface';
	import type {TAuthState} from '../../stores/auth/auth-store.interface';
	import {GunsStore} from '../../stores/guns/guns-store';
	import type {TGunsState} from '../../stores/guns/guns-store.interface';
	import {isEmpty} from '../../utils/objects';
	import ActionsFilter from './filter/ActionsFilter.svelte';
	import ActionList from './list/ActionList.svelte';
	import NoGuns from './sections/NoGuns.svelte';
	import NoRecords from './sections/NoRecords.svelte';
	import NoRecordsByFilter from './sections/NoRecordsByFilter.svelte';
	import ActionsSort from './sort/ActionsSort.svelte';
	import ActionsStat from './stat/ActionsStat.svelte';

	export let id: string;
	export let authState: TAuthState;

	const modal = (getContext('AppState') as { modal: TAppModal }).modal;

	let gunsState: TGunsState;
	let gunsUnsubscribe: any;

	let actionsState: TActionsState;
	let actionsUnsubscribe: any;

	type TStoredState = {
		sort: string
		filters: Array<string>
	};

	function restoreState(id: string): TStoredState {
		if (!id) {
			return;
		}
		const restoredData = localStorage.getItem('state.' + authState.id + '-' + id);
		let restored: any;
		try {
			let _raw: any;
			if (restoredData) {
				_raw = JSON.parse(restoredData);
			}
			if (!_raw.sort && !_raw.filters) {
				throw new Error('Invalid data format');
			}
			restored = {
				sort: _raw.sort || 'desc',
				filters: _raw.filters || []
			};
		} catch {
			restored = null;
		}
		return restored as TStoredState;
	}

	function storePageState(id?: string, options?: { sort?: string; filters?: Array<string> }) {
		if (!id) {
			return;
		}
		const storedState: TStoredState = {
			sort: options.sort,
			filters: options.filters
		}

		localStorage.setItem('state.' + authState.id + '-' + id, JSON.stringify(storedState));
	}

	function subscribeToActions(gunId: string) {
		actionsUnsubscribe && actionsUnsubscribe();

		if (gunId) {
			const lastState: TStoredState = restoreState(id);
			ActionsStore.initStore(gunId, lastState);

			const storedId = localStorage.getItem('gun.current');
			if (storedId !== gunId) {
				localStorage.setItem('gun.current', gunId);
			}

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
		if (actionsUnsubscribe && !actionsState || actionsState?.busy) {
			AppStateStore.showSpinner();
		} else {
			AppStateStore.hideSpinner();
		}
	}

	function processStore(value: TGunsState) {
		AppStateStore.hideSpinner();
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

	const addRecord = () => {
		navigate('/track/' + id + '/new/edit');
	}

	onMount(() => {
		AppStateStore.showSpinner();
		gunsUnsubscribe = GunsStore.subscribe((value: TGunsState) => {
			if (!value?.fullReady) {
				return;
			}
			processStore(value);
		});
	})

	onDestroy(() => {
		gunsUnsubscribe && gunsUnsubscribe();
		actionsUnsubscribe && actionsUnsubscribe();
	});

	let confirmDialog: IConfirmDialog;

	const handleDelete = (id: string) => {
		confirmDialog.show({
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

	const onResetFilters = () => {
		storePageState(id, {
			sort: actionsState.sortOrder,
			filters: []
		});
		ActionsStore.setFilter('all');
	};

</script>

<Confirm bind:this={confirmDialog}/>

{#if (gunsState && gunsState.fullReady)}
	{#if (!isEmpty(actionsState?.actions) || ActionsStore.isFiltered())}
		<div class="top-panel">
			<div class="top-panel-content">
				<div class="block block-left block-min">
					<div class="block-content">
						<Button on:click={addRecord} type="toolbar">
							<Icon type="plus-circle" class="inline" size="24px"/>
							Add a record...
						</Button>
					</div>
				</div>

				{#if (actionsState?.actions?.length > 1)}
					<ActionsSort
						actionsState={actionsState}
						onApply={(sort) => storePageState(id, {sort})}/>
				{/if}

				{#if (actionsState?.actions?.length > 1 || actionsState?.filteredBy.length > 0)}
					<ActionsFilter
						storeFilters={actionsState?.filteredBy || []}
						onApply={(filters) => storePageState(id, {filters: filters})}/>
				{/if}
				<ActionsStat actionsState={actionsState}/>
			</div>
		</div>
	{/if}

	<div class="page-content">
		{#if (!id)}
			<NoGuns/>
		{/if}
		{#if (!isEmpty(actionsState?.actions))}
			<ActionList
				{id}
				{gunsState}
				onDelete={handleDelete}
				actionsState={actionsState}/>
		{:else }
			{#if (actionsState?.isEmpty === true && !ActionsStore.isFiltered() && !actionsState.busy)}
				<NoRecords
					{id}
					{gunsState}
					{addRecord}
				/>
			{/if}
			{#if (actionsState?.isEmpty === true && ActionsStore.isFiltered() && !actionsState.busy)}
				<NoRecordsByFilter
					{id}
					{gunsState}
					{actionsState}
					{onResetFilters}
				/>
			{/if}
		{/if}

		{#if (actionsState?.actions?.length > 4)}
			<div class="container-floating">
				<div class="floating-add-action" on:click={addRecord}>
					<Icon type="plus-circle" size="48px"/>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style lang="less">
	:global {
		.no-records {
			padding: 16px 32px;
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

			transform-origin: center center;
			animation-name: floating-appear;
			animation-duration: 1s;
			animation-timing-function: ease;

			&:hover {
				background-color: var(--app-primary-bg-darken);
				box-shadow: 0 0 12px rgba(0, 0, 0, .5);
				opacity: 1;
				transform: scale(1.2);
			}
		}

		@keyframes floating-appear {
			0% {
				opacity: 0;
				transform: translateY(15px);
				box-shadow: 0 -8px 2px rgba(0, 0, 0, .2);
			}
			100% {
				opacity: .8;
				transform: translateY(0);
				box-shadow: 0 2px 8px rgba(0, 0, 0, .4);
			}
		}
	}
</style>
