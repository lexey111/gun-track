/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as dayjs from 'dayjs';

import 'dayjs/locale/en';
import 'dayjs/locale/uk';
import 'dayjs/locale/ru';

import {writable} from 'svelte/store';
import {AppLocales, IAppStateStore, TAppLocale, TAppState} from './app-state-store.interface';

// restore last locale
let initialLocale = localStorage.getItem('app.locale');
if (!AppLocales[initialLocale]) {
	initialLocale = 'en-EN';
}

setDayJSLocale(initialLocale as TAppLocale);
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
	locale: initialLocale as TAppLocale
});

function setDayJSLocale(locale: TAppLocale): void {
	let dateLocale = locale.split('-')[0];
	if (dateLocale === 'ua') {
		dateLocale = 'uk'; // f* this mapping
	}
	dayjs.locale(dateLocale);
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
		setDayJSLocale(locale);

		update(state => ({
			...state,
			locale
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
	}
};
