<script lang="ts">
	import {getContext, onDestroy, onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import {showSuccess} from '../../components/notifications/notify';
	import SpinnerComponent from '../../components/SpinnerComponent.svelte';
	import {ActionsStore} from '../../stores/actions/actions-store';
	import {TAction, TActionsState} from '../../stores/actions/actions-store.interface';
	import {AppStateStore} from '../../stores/app/app-state-store';
	import {TAppModal} from '../../stores/app/app-state-store.interface';
	import {GunsStore} from '../../stores/guns/guns-store';
	import {TGunsState} from '../../stores/guns/guns-store.interface';
	import GunActions from './actions/GunActions.svelte';
	import ActionsList from './list/ActionsList.svelte';
	import NewActionModal from './modals/NewActionModal.svelte';
	import GunNavigator from './navigator/GunNavigator.svelte';

	export let id;
	const modal = (getContext('AppState') as { modal: TAppModal }).modal;

	let gunsState: TGunsState;
	let gunsUnsubscribe;

	let actionsState: TActionsState;
	let actionsUnsubscribe;

	function subscribeToActions(gunId: string) {
		console.log('update actions', gunId);
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
			console.log('need to update');
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
		modal.open(NewActionModal, {
			closeButton: true,
			extraClass: 'almost-fullscreen',
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
</script>

{#if (!gunsState || !gunsState.fullReady)}
	<p>
		<SpinnerComponent/>
		Loading...
	</p>
{:else }
	<GunNavigator id={id} gunsState={gunsState}/>
	<button class="press press-ghost press-blue" on:click={showNewActionDialog}>Add an action</button>
	<GunActions id={id}/>
	<ActionsList actionsState={actionsState}/>
{/if}

<style lang="less">
	@import "track.less";
</style>
