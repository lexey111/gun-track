import {DataStore, Predicates, SortDirection} from '@aws-amplify/datastore';
import {writable} from 'svelte/store';
import {showError} from '../../components/notifications/notify';
import {Action} from '../../models';
import {getErrorText} from '../../utils/errors';
import {CompareStringArrays} from '../../utils/objects';
import {GunsStore} from '../guns/guns-store';
import type {ActionExtended, IActionsStore, TAction, TActionsState} from './actions-store.interface';
import {ActionCurrencies, ActionTypes} from './actions-store.types';


const gunNotFoundMessage = 'Gun not found!';

let currentOrder: SortDirection = SortDirection.DESCENDING;
let currentFiltering: Array<string> = [];
let currentGunId: string;

let _actions: Array<ActionExtended> = [];
// eslint-disable-next-line @typescript-eslint/unbound-method
const {
	subscribe,
	set,
	update
} = writable<TActionsState>({
	busy: true,
	sortOrder: 'desc',
	filteredBy: [],
	isEmpty: null,
	totalShots: 0,
	expenses: {},
	actions: _actions
});

function resetStore(): void {
	_actions = [];
	currentOrder = SortDirection.DESCENDING;
	currentFiltering = [];

	update(_ => ({
		actions: [],
		sortOrder: 'desc',
		filteredBy: [],
		totalShots: 0,
		expenses: {},
		isEmpty: null,
		busy: false
	}));
}

function getActionById(actionID: string): Action {
	return _actions.find(g => g.id === actionID);
}

// function getGraphQLError(e: any): string {
// 	if (Array.isArray(e?.errors)) {
// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
// 		return e.errors.map(x => x.message).join(', ');
// 	}
// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
// 	return e?.message ? e.message : e.toString();
// }
//
// function getActionFilter(gunId: string, typeFilter?: Array<string>, sortFn?: any): any {
// 	const variables = {
// 		filter: {
// 			gunID: {
// 				eq: gunId
// 			}
// 		}
// 	};
//
// 	if (typeFilter && typeFilter.length > 0) {
// 		if (typeFilter.length === 1 && typeFilter[0] !== 'other') {
// 			variables.filter = {...variables.filter, ...{type: {'eq': typeFilter[0]}}};
// 		}
//
// 		if (typeFilter.length > 1 || typeFilter[0] === 'other') {
// 			const conditions: Array<any> = typeFilter.map(c => ({type: {eq: c}}));
// 			if (typeFilter.includes('other')) {
// 				conditions.push({type: {attributeExists: false}});
// 			}
// 			variables.filter = {...variables.filter, ...{or: conditions}};
// 		}
// 	}
//
// 	if (sortFn) {
// 		variables['sort'] = sortFn;
// 	}
//
// 	console.log('var', JSON.stringify(variables, null, 4));
// 	return variables;
// }
//
// async function getActionsByGun(gunId: string, typeFilter?: Array<string>, sortFn?: any): Promise<[Action]> {
// 	let rawActions: any;
//
// 	const variables = getActionFilter(gunId, typeFilter, sortFn);
//
// 	try {
// 		rawActions = await API.graphql(graphqlOperation(listActions, variables));
// 	} catch (e) {
// 		throw new Error(getGraphQLError(e));
// 	}
// 	console.log('-==', rawActions?.data?.listActions);
// 	return rawActions?.data?.listActions?.items as [Action];
// }


async function countRecordsForGun(gunId: string): Promise<number> {
	const gun = GunsStore.getGunById(gunId);
	if (!gun) {
		throw new Error(gunNotFoundMessage);
	}
	const rawActions: Array<ActionExtended> = (await DataStore.query(Action, Predicates.ALL))
		.filter(c => c.gun?.id === gunId);

	return rawActions?.length || 0;
}

async function loadActions(gunId?: string): Promise<void> {
	const gun = GunsStore.getGunById(gunId || currentGunId);
	if (!gun) {
		return;
	}

	if (gunId) {
		currentGunId = gunId;
	}

	update(state => ({
		...state,
		busy: true
	}));

	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		// const rawActions = await getActionsByGun(currentGunId, currentFiltering, a => a.date(currentOrder));
		const rawActions: Array<ActionExtended> = (await DataStore.query(Action, Predicates.ALL, {
			sort: a => a.date(currentOrder)
		}))
			.filter(c => c.gun?.id === currentGunId)
			.filter(c => {
				if (!currentFiltering.length) {
					return true;
				}
				return currentFiltering.includes(c.type);
			});

		const data = rawActions.map(i => ({
			...i,
			sum: 0,
			totalExpenses: null
		}));

		const expenses = {};
		let totalShots = 0;
		const totalExpenses = {};
		Object.values(ActionCurrencies).forEach(item => {
			totalExpenses[item.id] = 0;
		});

		if (data && data.length > 0) {
			let startIdx = 0;
			let lastIdx = data.length;
			let inc = 1;

			if (currentOrder === SortDirection.DESCENDING) {
				startIdx = data.length - 1;
				lastIdx = -1;
				inc = -1;
			}

			for (let i = startIdx; i !== lastIdx; i += inc) {
				if (data[i].expenses) {
					const currency = data[i].currency || 'OTH';
					if (typeof expenses[currency] === 'undefined') {
						expenses[currency] = 0;
					}
					expenses[currency] += data[i].expenses;
					totalExpenses[currency] += data[i].expenses;
				}
				if (data[i].shots) {
					totalShots += data[i].shots;
				}
				data[i].sum = totalShots;
				data[i].totalExpenses = {...expenses};
			}
		}

		_actions = rawActions; // for sync access

		update(_ => ({
			actions: data,
			sortOrder: currentOrder === SortDirection.ASCENDING ? 'asc' : 'desc',
			isEmpty: data.length === 0,
			filteredBy: currentFiltering,
			totalShots,
			expenses,
			busy: false
		}));
	} catch (error) {
		showError(`Error on retrieving actions:\n${getErrorText(error)}`, 'Error');
		resetStore();
	}
}

async function registerAction(gunId: string, action: TAction): Promise<boolean> {
	update(state => ({
		...state,
		busy: true
	}));

	const gun = GunsStore.getGunById(gunId);
	try {
		if (!gun) {
			throw new Error(gunNotFoundMessage);
		}

		if (!action.type) {
			action.type = 'other';
		}

		await DataStore.save(
			new Action({
				...action,
				gun
			})
		);
	} catch (error) {
		showError(`Error on registering action:\n${getErrorText(error)}`, 'Error');
		update(state => ({
			...state,
			busy: false
		}));

		return false;
	}
	return true;
}

async function saveAction(action: Action): Promise<boolean> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	update(state => ({
		...state,
		busy: true
	}));

	try {
		const _action: TAction = _actions.find(a => a.id === action.id);
		if (!_action) {
			throw new Error('Action not found!');
		}

		await DataStore.save(
			Action.copyOf(_action, updated => {
				updated.title = action.title;
				updated.type = action.type || 'other';
				updated.date = action.date;
				updated.comment = action.comment;
				updated.currency = action.currency;
				updated.expenses = action.expenses;
				updated.shots = action.shots;
				updated.trainingNotes = action.trainingNotes;
			})
		);
	} catch (error) {
		showError(`Error on storing the action:\n${getErrorText(error)}`, 'Error');
		update(state => ({
			...state,
			busy: false
		}));

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
		showError(`Error on removing the action:\n${getErrorText(error)}`, 'Error');
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

function setFilter(types?: Array<string> | 'all'): void {
	if (!types || types === 'all' || types.length === 0 || types.length === ActionTypes.length) {
		if (currentFiltering.length) {
			currentFiltering = [];
			void loadActions();
		}
		return;
	}

	if (!CompareStringArrays(types, currentFiltering)) {
		currentFiltering = [...types];
		void loadActions();
	}
}

function getFilter(): Array<string> {
	return currentFiltering;
}

function isFiltered(): boolean {
	return currentFiltering.length > 0;
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

	initStore: (gunId: string, options?: { sort?: string; filters?: [string] }) => {
		resetStore();

		if (options?.sort) {
			currentOrder = options.sort === 'asc' ? SortDirection.ASCENDING : SortDirection.DESCENDING;
		}

		if (options?.filters) {
			currentFiltering = options.filters;
		}

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
	setOrder,

	getFilter,
	setFilter,
	isFiltered,

	getActionById,
	countRecordsForGun
};
