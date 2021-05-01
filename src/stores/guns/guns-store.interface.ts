import type {Writable} from 'svelte/store';
import type {Gun} from '../../models';

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

	createGun: (gun: Gun) => Promise<boolean>
	saveGun: (gun: Gun) => Promise<boolean>
	removeGun: (id: string) => Promise<boolean>

	getGunById: (gunId: string) => Gun
	gunCount: () => number
	savePhoto: (gunId: string, photoName: string) => Promise<boolean>
}
