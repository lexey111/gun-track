/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment */
import {DataStore} from '@aws-amplify/datastore';
import {writable} from 'svelte/store';
import {showError} from '../../components/notifications/notify';
import {Gun} from '../../models';
import {getErrorText} from '../../utils/errors';
import type {IGunStore, TGunsState} from './guns-store.interface';

let _guns: Array<Gun> = [];
let storeSubscribed = false;
let storeFullReady = false;
// eslint-disable-next-line @typescript-eslint/unbound-method
const {
	subscribe,
	set,
	update
} = writable<TGunsState>({
	busy: true,
	isEmpty: null,
	fullReady: false,
	guns: _guns
});

function resetStore(): void {
	_guns = [];

	update(_ => ({
		guns: [],
		isEmpty: null,
		fullReady: false,
		busy: false
	}));
}

function getGunById(gunId: string): Gun {
	return _guns.find(g => g.id === gunId);
}

async function loadGuns(): Promise<void> {
	update(state => ({
		...state,
		busy: true
	}));

	try {
		_guns = await DataStore.query(Gun);

		update(_ => ({
			guns: _guns,
			isEmpty: storeSubscribed === true ? _guns.length === 0 : null,
			fullReady: storeFullReady,
			busy: false
		}));
	} catch (error) {
		showError(`Error on retrieving guns:\n${getErrorText(error)}`, 'Error');
		resetStore();
	}
}

async function createGun(gun: Gun): Promise<boolean> {
	update(state => ({
		...state,
		busy: true
	}));

	try {
		await DataStore.save(
			new Gun({
				...gun,
				dateCreated: new Date().toISOString()
			})
		);
	} catch (error) {
		showError(`Error on registering the gun:\n${getErrorText(error)}`, 'Error');
		return false;
	}
	return true;
}

async function saveGun(gun: Gun): Promise<boolean> {
	const _gun = getGunById(gun?.id);
	if (!_gun) {
		throw new Error('Gun not found!');
	}

	update(state => ({
		...state,
		busy: true
	}));

	try {
		await DataStore.save(
			Gun.copyOf(_gun, updated => {
				updated.name = (gun.name || '').substring(0, 64);
				updated.make = (gun.make || '').substring(0, 64);
				updated.model = (gun.model || '').substring(0, 64);
				updated.notes = (gun.notes || '').substring(0, 2048);
				updated.caliber = (gun.caliber || '').substring(0, 32);
				updated.photo = (gun.photo || '').substring(0, 128);
			})
		);
	} catch (error) {
		showError(`Error on storing the gun:\n${getErrorText(error)}`, 'Error');
		return false;
	}
	return true;
}

async function savePhoto(gunId: string, photoName: string): Promise<boolean> {
	const _gun = getGunById(gunId);
	if (!_gun) {
		throw new Error('Gun not found!');
	}

	update(state => ({
		...state,
		busy: true
	}));

	try {
		await DataStore.save(
			Gun.copyOf(_gun, updated => {
				updated.photo = (photoName || '').substring(0, 128);
			})
		);
	} catch (error) {
		showError(`Error on storing the gun:\n${getErrorText(error)}`, 'Error');
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
		showError(`Error on removing the gun:\n${getErrorText(error)}`, 'Error');
		return false;
	}
	return true;
}

function setSubscribed(): void {
	storeSubscribed = true;
	update(state => {
		return {
			...state,
			isEmpty: state.guns.length === 0
		};
	});
}

function setFullReady(): void {
	storeSubscribed = true;
	storeFullReady = true;
	update(state => {
		return {
			...state,
			isEmpty: state.guns.length === 0,
			fullReady: true
		};
	});
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
		storeSubscribed = false;
		resetStore();

		gunSubscription = DataStore.observe(Gun).subscribe(_ => {
			void loadGuns();
		});
	},
	setSubscribed, // db answered
	setFullReady, // connection established

	loadGuns,
	createGun,
	saveGun,
	removeGun,

	getGunById,
	savePhoto
};
