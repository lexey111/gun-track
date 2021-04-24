/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import dayjs from 'dayjs';

import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';

import {writable} from 'svelte/store';
import type {IAppStateStore, TAppLocale, TAppState} from './app-state-store.interface';

export let dateLocale;
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
	let _dateLocale = locale.split('-')[0];
	if (_dateLocale === 'ua') {
		_dateLocale = 'uk'; // f* this mapping
	}
	dayjs.locale(_dateLocale);
	dateLocale = _dateLocale;
	return _dateLocale;
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
		const _dateLocale = setDayJSLocale(locale);

		update(state => ({
			...state,
			locale,
			dateLocale: _dateLocale
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
