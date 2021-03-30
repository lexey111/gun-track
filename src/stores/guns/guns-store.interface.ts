import {Writable} from 'svelte/store';
import {Gun} from '../../models';

export type TGunsState = {
	busy: boolean
	isEmpty: true | false | null
	guns: Array<Gun>
};

export interface IGunStore extends Writable<TGunsState> {
	initStore: () => void

	loadGuns: () => Promise<void>
	unloadGuns: () => void

	createGun: (name: string) => Promise<boolean>
	saveGun: (id: string, name: string) => Promise<boolean>
	removeGun: (id: string) => Promise<boolean>
}
