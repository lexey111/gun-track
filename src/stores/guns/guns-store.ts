/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-call */
import {DataStore, Predicates} from '@aws-amplify/datastore';
import {writable} from 'svelte/store';
import {NotifyStore} from '../../app/notifications/notify-store';
import {Gun} from '../../models';
import {IGunStore, TGunsState} from './guns-store.interface';

let _guns: Array<Gun> = [];
// eslint-disable-next-line @typescript-eslint/unbound-method
const {
	subscribe,
	set,
	update
} = writable<TGunsState>({
	busy: true,
	isEmpty: null,
	guns: _guns
});

function resetStore(): void {
	update(_ => ({
		guns: [],
		isEmpty: null,
		busy: false
	}));
}

function getErrorText(error: any): string {
	console.error(error);

	if (typeof error === 'string') {
		return error;
	}

	if (typeof error.message === 'string') {
		return error.message as string;
	}

	if (error.toString) {
		return error.toString() as string;
	}
	return 'Unknown error';
}

async function loadGuns(): Promise<void> {
	update(state => ({
		...state,
		busy: true
	}));

	try {
		_guns = await DataStore.query(Gun, Predicates.ALL, {
			page: 0,
			limit: 100 // looks reasonable
		});

		update(_ => ({
			guns: _guns,
			isEmpty: _guns.length === 0,
			busy: false
		}));
	} catch (error) {
		NotifyStore.push({
			title: 'Error',
			type: 'error',
			text: `Error on retrieving guns:\n ${getErrorText(error)}`
		});
		resetStore();
	}
}

async function createGun(name: string): Promise<boolean> {
	update(state => ({
		...state,
		busy: true
	}));

	try {
		await DataStore.save(
			new Gun({
				name,
				dateCreated: new Date().toISOString()
			})
		);
	} catch (error) {
		NotifyStore.push({
			title: 'Error',
			type: 'error',
			text: `Error on registering the gun:\n ${getErrorText(error)}`
		});
		return false;
	}
	return true;
}

async function saveGun(id: string, name: string): Promise<boolean> {
	const gun = _guns.find(x => x.id === id);
	if (!gun) {
		throw new Error('Gun not found!');
	}

	update(state => ({
		...state,
		busy: true
	}));

	try {
		await DataStore.save(
			Gun.copyOf(gun, updated => {
				updated.name = name;
			})
		);
	} catch (error) {
		NotifyStore.push({
			title: 'Error',
			type: 'error',
			text: `Error on storing the gun:\n ${getErrorText(error)}`
		});
		return false;
	}
	return true;
}

async function removeGun(id: string): Promise<boolean> {
	try {
		const result: any = await DataStore.delete(Gun, id);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (!result || result.length === 0) {
			throw new Error('Something went wrong');
		}
	} catch (error) {
		NotifyStore.push({
			title: 'Error',
			type: 'error',
			text: `Error on removing the gun:\n ${getErrorText(error)}`
		});
		return false;
	}
	return true;
}

let gunSubscription: { unsubscribe: () => void };

export const GunsStore: IGunStore = {
	subscribe,
	set,
	update,

	unloadGuns: () => {
		resetStore();
		if (gunSubscription) {
			gunSubscription.unsubscribe();
		}
	},

	initStore: () => {
		gunSubscription = DataStore.observe(Gun).subscribe(_ => {
			void loadGuns();
		});
	},

	loadGuns,
	createGun,
	saveGun,
	removeGun
};
