import {Writable} from 'svelte/store';
import {Action} from '../../models';

export const ActionTypes = [
	{
		id: 'other',
		color: '#bababa'
	},
	{
		id: 'training',
		color: '#06acd0'
	},
	{
		id: 'dry_training',
		color: '#04c2c2'
	},
	{
		id: 'pers_training',
		color: '#2a59d4'
	},
	{
		id: 'competition',
		color: '#f52138'
	},
	{
		id: 'tuning',
		color: '#f158ef'
	},
	{
		id: 'spare_parts',
		color: '#3ef855'
	},
	{
		id: 'bullets',
		color: '#fa934e'
	},
	{
		id: 'purchase',
		color: '#f88570'
	},
	{
		id: 'selling',
		color: '#9b6df6'
	},
	{
		id: 'cleanup',
		color: '#cbc44c'
	}
];

const typeColors = {};
ActionTypes.forEach(type => {
	typeColors[type.id] = type.color;
});

export const getTypeColor = (type: string): string => {
	return typeColors[type] as string || typeColors['other'] as string;
};

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
