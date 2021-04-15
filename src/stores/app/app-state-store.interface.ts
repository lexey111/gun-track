import {Writable} from 'svelte/store';

export const AppLocales = {'en-EN': 'English', 'ua-UA': 'Українська', 'ru-RU': 'Русский'};

export type TAppModal = {
	open?: (component: any, props?: {
		closeButton?: boolean
		closeOnEsc?: boolean
		closeOnOuterClick?: boolean
		extraClass?: string
		componentProps?: any
	}) => void

	close?: () => void
};

export type TAppLocale = keyof typeof AppLocales;

export type TAppState = {
	path: string
	modal: {
		open?: () => void
		close?: () => void
	}
	locale: TAppLocale
	dateLocale: string
	isGlobalSpinnerVisible: boolean
};

export interface IAppStateStore extends Writable<TAppState> {
	setPath: (path: string) => void

	setModal: (open, close) => void

	setLocale: (locale: TAppLocale) => void

	showSpinner: () => void
	hideSpinner: () => void
}
