import {Writable} from 'svelte/store';
import {Action} from '../../models';

export type TActionsState = {
	busy: boolean
	isEmpty: true | false | null
	fullReady: boolean
	actions: Array<Action>
};

export interface IActionsStore extends Writable<TActionsState> {
	initStore: (gunId: string) => void
	setSubscribed: () => void
	setFullReady: () => void

	loadActions: (gunId: string) => Promise<void>
	unloadActions: () => void

	registerAction: (action: Action) => Promise<boolean>
	saveAction: (id: string, name: string) => Promise<boolean>
	removeAction: (id: string) => Promise<boolean>
}
