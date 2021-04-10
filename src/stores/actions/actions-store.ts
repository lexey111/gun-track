/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-call */
import {DataStore, Predicates, SortDirection} from '@aws-amplify/datastore';
import {writable} from 'svelte/store';
import {showError} from '../../components/notifications/notify';
import {Action} from '../../models';
import {getErrorText} from '../../utils/errors';
import {GunsStore} from '../guns/guns-store';
import {IActionsStore, TAction, TActionsState} from './actions-store.interface';

let currentOrder: SortDirection = SortDirection.DESCENDING;
let currentGunId: string;

let _actions: Array<Action> = [];
// eslint-disable-next-line @typescript-eslint/unbound-method
const {
	subscribe,
	set,
	update
} = writable<TActionsState>({
	busy: true,
	sortOrder: 'desc',
	isEmpty: null,
	actions: _actions
});

function resetStore(): void {
	_actions = [];
	currentOrder = SortDirection.DESCENDING;

	update(_ => ({
		actions: [],
		sortOrder: 'desc',
		isEmpty: null,
		busy: false
	}));
}

async function loadActions(gunId?: string): Promise<void> {
	if (gunId) {
		currentGunId = gunId;
	}

	update(state => ({
		...state,
		busy: true
	}));

	try {
		const _rawActions = (await DataStore.query(Action, Predicates.ALL, {
			sort: a => a.date(currentOrder)
		}))
			.filter((c: any) => c.gun?.id === currentGunId);

		_actions = _rawActions.map(item => item); // TODO: summarization
		console.log('local action', _actions);

		update(_ => ({
			actions: _actions,
			sortOrder: currentOrder === SortDirection.ASCENDING ? 'asc' : 'desc',
			isEmpty: _actions.length === 0,
			busy: false
		}));
	} catch (error) {
		showError(`Error on retrieving actions:\n ${getErrorText(error)}`, 'Error');
		resetStore();
	}
}

async function registerAction(gunId: string, action: TAction): Promise<boolean> {
	update(state => ({
		...state,
		busy: true
	}));

	console.log('action to save', action);
	const gun = GunsStore.getGunById(gunId);
	try {
		if (!gun) {
			throw new Error('Gun not found!');
		}
		await DataStore.save(
			new Action({
				...action,
				gun
			})
		);
	} catch (error) {
		showError(`Error on registering action:\n ${getErrorText(error)}`, 'Error');
		return false;
	}
	return true;
}

async function saveAction(action: TAction): Promise<boolean> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const _action: TAction = _actions.find(x => x.id === action.id);
	if (!_action) {
		throw new Error('Action not found!');
	}

	update(state => ({
		...state,
		busy: true
	}));

	try {
		await DataStore.save(
			Action.copyOf(action, updated => {
				updated.title = action.title;
				updated.color = action.color;
				updated.date = action.date;
				updated.comment = action.comment;
				updated.currency = action.currency;
				updated.expenses = action.expenses;
				updated.shots = action.shots;
				updated.trainingNotes = action.trainingNotes;
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

function setOrder(order: 'asc' | 'desc'): void {
	let newOrder: SortDirection;

	if (order === 'asc') {
		newOrder = SortDirection.ASCENDING;
	}
	if (order === 'desc') {
		newOrder = SortDirection.DESCENDING;
	}

	if (newOrder !== currentOrder) {
		currentOrder = newOrder;

		void loadActions();
	}
}

function getOrder(): 'asc' | 'desc' {
	if (currentOrder === SortDirection.ASCENDING) {
		return 'asc';
	}
	return 'desc';
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
		resetStore();

		void loadActions(gunId);
		actionsSubscription = DataStore.observe(Action).subscribe(_ => {
			void loadActions(gunId);
		});
	},

	loadActions,
	registerAction,
	saveAction,
	removeAction,

	getOrder,
	setOrder
};
