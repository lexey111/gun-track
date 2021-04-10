import {Writable} from 'svelte/store';
import {Gun} from '../../models';

export type TGunsState = {
	busy: boolean
	isEmpty: true | false | null
	fullReady: boolean
	guns: Array<Gun>
};

export interface IGunStore extends Writable<TGunsState> {
	initStore: () => void
	setSubscribed: () => void
	setFullReady: () => void

	loadGuns: () => Promise<void>
	unloadGuns: () => void

	createGun: (name: string) => Promise<boolean>
	saveGun: (id: string, name: string) => Promise<boolean>
	removeGun: (id: string) => Promise<boolean>

	getGunById: (gunId: string) => Gun
}
