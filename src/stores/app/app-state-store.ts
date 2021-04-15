/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as dayjs from 'dayjs';

import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';

import {writable} from 'svelte/store';
import {IAppStateStore, TAppLocale, TAppState} from './app-state-store.interface';

// eslint-disable-next-line @typescript-eslint/unbound-method
const {
	subscribe,
	set,
	update
} = writable<TAppState>({
	path: '',
	modal: {
		open: null,
		close: null
	},
	locale: 'en-EN',
	dateLocale: 'en',
	isGlobalSpinnerVisible: false
});

function setDayJSLocale(locale: TAppLocale): string {
	let dateLocale = locale.split('-')[0];
	if (dateLocale === 'ua') {
		dateLocale = 'uk'; // f* this mapping
	}
	dayjs.locale(dateLocale);
	return dateLocale;
}

export const AppStateStore: IAppStateStore = {
	subscribe,
	set,
	update,

	setPath: (path: string) => {
		update(state => ({
			...state,
			path
		}));
	},

	setLocale: (locale: TAppLocale) => {
		localStorage.setItem('app.locale', locale);
		const dateLocale = setDayJSLocale(locale);

		update(state => ({
			...state,
			locale,
			dateLocale
		}));
	},

	setModal: (open, close) => {
		update(state => ({
			...state,
			modal: {
				open,
				close
			}
		}));
	},

	showSpinner: () => {
		update(state => ({
			...state,
			isGlobalSpinnerVisible: true
		}));
	},

	hideSpinner: () => {
		update(state => ({
			...state,
			isGlobalSpinnerVisible: false
		}));
	}
};
