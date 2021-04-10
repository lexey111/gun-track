/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-call */
import {DataStore} from '@aws-amplify/datastore';
import {writable} from 'svelte/store';
import {showError} from '../../components/notifications/notify';
import {Action} from '../../models';
import {getErrorText} from '../../utils/errors';
import {IActionsStore, TActionsState} from './actions-store.interface';

let _actions: Array<Action> = [];
let storeSubscribed = false;
let storeFullReady = false;
// eslint-disable-next-line @typescript-eslint/unbound-method
const {
	subscribe,
	set,
	update
} = writable<TActionsState>({
	busy: true,
	isEmpty: null,
	fullReady: false,
	actions: _actions
});

function resetStore(): void {
	_actions = [];

	update(_ => ({
		actions: [],
		isEmpty: null,
		fullReady: false,
		busy: false
	}));
}

async function loadActions(gunId: string): Promise<void> {
	update(state => ({
		...state,
		busy: true
	}));

	try {
		const _rawActions = await DataStore.query(Action);
		console.log('rawActions', _rawActions);
		_actions = _rawActions.filter((c: any) => c.gunID = gunId);

		update(_ => ({
			actions: _actions,
			isEmpty: storeSubscribed === true ? _actions.length === 0 : null,
			fullReady: storeFullReady,
			busy: false
		}));
	} catch (error) {
		showError(`Error on retrieving actions:\n ${getErrorText(error)}`, 'Error');
		resetStore();
	}
}

async function registerAction(action: Action): Promise<boolean> {
	update(state => ({
		...state,
		busy: true
	}));

	try {
		await DataStore.save(
			new Action({
				...action,
			})
		);
	} catch (error) {
		showError(`Error on registering action:\n ${getErrorText(error)}`, 'Error');
		return false;
	}
	return true;
}

async function saveAction(id: string, name: string): Promise<boolean> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const action: Action = _actions.find(x => x.id === id);
	if (!action) {
		throw new Error('Action not found!');
	}

	update(state => ({
		...state,
		busy: true
	}));

	try {
		await DataStore.save(
			Action.copyOf(action, updated => {
				updated.title = name;
			})
		);
	} catch (error) {
		showError(`Error on storing the action:\n ${getErrorText(error)}`, 'Error');
		return false;
	}
	return true;
}

async function removeAction(id: string): Promise<boolean> {
	try {
		const result: any = await DataStore.delete(Action, id);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (!result || result.length === 0) {
			throw new Error('Something went wrong');
		}
	} catch (error) {
		showError(`Error on removing the action:\n ${getErrorText(error)}`, 'Error');
		return false;
	}
	return true;
}

function setSubscribed(): void {
	storeSubscribed = true;
	update(state => {
		return {
			...state,
			isEmpty: state.actions.length === 0
		};
	});
}

function setFullReady(): void {
	storeSubscribed = true;
	storeFullReady = true;
	update(state => {
		return {
			...state,
			isEmpty: state.actions.length === 0,
			fullReady: true
		};
	});
}

let actionsSubscription: { unsubscribe: () => void };

export const ActionsStore: IActionsStore = {
	subscribe,
	set,
	update,

	unloadActions: () => {
		resetStore();
		if (actionsSubscription) {
			actionsSubscription.unsubscribe();
		}
	},

	initStore: (gunId: string) => {
		storeSubscribed = false;
		resetStore();

		console.log('actions: subscribe', gunId);
		actionsSubscription = DataStore.observe(Action).subscribe(_ => {
			console.log('_', _);
			void loadActions(gunId);
		});
	},
	setSubscribed, // db answered
	setFullReady, // connection established

	loadActions,
	registerAction,
	saveAction,
	removeAction
};
