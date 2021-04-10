import {Writable} from 'svelte/store';
import {Action} from '../../models';

export type TAction = {
	id: string
	title?: string
	comment?: string
	shots: number
	date: string
	expenses?: number
	currency?: string
	trainingNotes?: string
	color?: string
};

export type TActionsState = {
	busy: boolean
	isEmpty: true | false | null
	actions: Array<Action>
};

export interface IActionsStore extends Writable<TActionsState> {
	initStore: (gunId: string) => void

	loadActions: (gunId: string) => Promise<void>
	unloadActions: () => void

	registerAction: (gunId: string, action: TAction) => Promise<boolean>
	saveAction: (action: TAction) => Promise<boolean>
	removeAction: (id: string) => Promise<boolean>
}