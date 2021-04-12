import {Writable} from 'svelte/store';
import {Action} from '../../models';

export type TAction = {
	id: string
	title?: string
	type?: string
	comment?: string
	shots: number
	date: string
	expenses?: number
	currency?: string
	trainingNotes?: string
	color?: string
};

export type ActionExtended = Action & { sum?: number };

export type TActionsState = {
	busy: boolean
	sortOrder: 'asc' | 'desc'
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

	getOrder: () => 'asc' | 'desc'
	setOrder: (order: 'asc' | 'desc') => void
}
