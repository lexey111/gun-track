import {DataStore, Predicates} from '@aws-amplify/datastore';
import {writable} from 'svelte/store';
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

async function loadGuns(): Promise<void> {
	update(state => ({
		...state,
		busy: true
	}));

	try {
		_guns = await DataStore.query(Gun, Predicates.ALL, {
			page: 0,
			limit: 100
		});

		update(_ => ({
			guns: _guns,
			isEmpty: _guns.length === 0,
			busy: false
		}));
	} catch (error) {
		console.error('Error retrieving Guns', error);
		resetStore();
	}
}

async function createGun(name: string): Promise<void> {
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
		console.log('Error on registering gun', error);
	}
}

async function saveGun(id: string, name: string): Promise<void> {
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
		console.log('Error on storing gun', error);
	}
}

async function removeGun(id: string): Promise<void> {
	try {
		await DataStore.delete(Gun, id);
	} catch (error) {
		console.log('Error removing posts', error);
	}
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
			// console.log(msg.model, msg.opType, msg.element);
			console.log('-==== update by subscription ===-');
			void loadGuns();
		});
	},

	loadGuns,
	createGun,
	saveGun,
	removeGun
};
