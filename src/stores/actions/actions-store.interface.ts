import {Writable} from 'svelte/store';
import {Actions} from '../../models';

export type TActionsState = {
	busy: boolean
	isEmpty: true | false | null
	fullReady: boolean
	actions: Array<Actions>
};

export interface IActionsStore extends Writable<TActionsState> {
	initStore: () => void
	setSubscribed: () => void
	setFullReady: () => void

	loadActions: () => Promise<void>
	unloadActions: () => void

	registerAction: (name: string) => Promise<boolean>
	saveAction: (id: string, name: string) => Promise<boolean>
	removeAction: (id: string) => Promise<boolean>
}
