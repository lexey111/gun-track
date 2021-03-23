import {Writable} from 'svelte/store';

export type TAppModal = {
	open?: (component: any, props?: {
		closeButton?: boolean
		closeOnEsc?: boolean
		closeOnOuterClick?: boolean
		componentProps?: any
	}) => void
	close?: () => void
};

export type TAppState = {
	path: string
	modal: {
		open?: () => void
		close?: () => void
	}
};

export interface IAppStateStore extends Writable<TAppState> {
	setPath: (path: string) => void
	setModal: (open, close) => void
}
