/* eslint-disable no-console */
import type {TAppLocale} from '../../stores/app/app-state-store.interface';

const memoryCache: Record<string, Promise<unknown>> = {};
let currentLocale: TAppLocale;

function loadLocale(locale: TAppLocale): Promise<Record<string, any>> {
	const localeToLoad = !locale ? 'en-EN' : locale;

	currentLocale = locale;

	if (typeof memoryCache[localeToLoad] !== 'undefined') {
		return memoryCache[localeToLoad];
	}

	memoryCache[localeToLoad] = fetch('/i18n/' + localeToLoad + '.json')
		.then(response => {
			if (response && response.status === 200 || response.status === 204) {
				return response.json();
			}
			if (response.status === 404) {
				throw new Error(`Locale "${localeToLoad}" not found!`);
			}
			throw new Error('Invalid Locale response!');
		})
		.catch(e => {
			console.error('Error on loading locale', localeToLoad);
			console.error(e);
			throw new Error(e);
		});

	return memoryCache[localeToLoad];
}

export const I18nService = {
	setLocale: (locale: TAppLocale): void => {
		if (locale !== currentLocale) {
			void loadLocale(locale);
		}
	},

	translate: (textToTranslate: string): Promise<string> => {
		const [namespace, key] = textToTranslate.split('.'); // @Common.Welcome

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return loadLocale(currentLocale)
			.then(data => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
				return data?.[namespace]?.[key] || '';
			})
			.catch(_ => {
				return textToTranslate;
			});
	}
};
