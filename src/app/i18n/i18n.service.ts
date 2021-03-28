/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */
import {TAppLocale} from '../../stores/app/app-state-store.interface';

let controller = new AbortController();
let actualPromise;
let {signal} = controller;

const memoryCache = {};
let currentLocale: TAppLocale;

function loadLocale(locale: TAppLocale): Promise<any> {
	const localeToLoad = locale === 'fallback' || !locale ? 'en-EN' : locale;

	currentLocale = locale;

	if (memoryCache[localeToLoad]) {
		return Promise.resolve();
	}

	controller.abort(); // stop obsolete
	controller = new AbortController(); // start new
	signal = controller.signal;
	actualPromise = fetch('/i18n/' + localeToLoad + '.json', {signal})
		.then(response => {
			if (response && response.status === 200 || response.status === 204) {
				return response.json();
			}
			if (response.status === 404) {
				throw new Error(`Locale "${localeToLoad}" not found!`);
			}
			throw new Error('Invalid Locale response!');
		})
		.then(data => {
			if (data && typeof data === 'object') {
				memoryCache[localeToLoad] = data;
			}
			return data;
		})
		.catch(e => {
			if (e.name !== 'AbortError') {
				console.error('Error on loading locale', localeToLoad);
				console.error(e);
				throw new Error(e);
			}
			return actualPromise;
		});

	return actualPromise;
}

export const I18nService = {
	setLocale: (locale: TAppLocale): void => {
		if (locale !== currentLocale) {
			void loadLocale(locale);
		}
	},

	translate: (textToTranslate: string): Promise<string> => {
		const [namespace, key] = textToTranslate.split('.'); // @Common.Welcome
		return loadLocale(currentLocale)
			.then(_ => {
				return memoryCache[currentLocale]?.[namespace]?.[key] || '';
			})
			.catch(_ => {
				return textToTranslate;
			});
	}
};
