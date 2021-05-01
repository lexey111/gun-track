/* eslint-disable no-console */
const getModule = (module: { default: any }): any => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return module.default;
};

const logError = (err: any): any => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	console.error(err && err.stack || err);
	return Promise.reject(err);
};

export async function resolvePage(pageId: string): Promise<any> {
	switch (pageId) {
		case 'home':
			return import('./../pages/home/HomePage.svelte')
				.then(getModule)
				.catch(logError);

		case 'ui':
			return import('./../pages/home/UIPage.svelte')
				.then(getModule)
				.catch(logError);

		case 'about':
			return import('./../pages/about/AboutPage.svelte')
				.then(getModule)
				.catch(logError);

		case 'tos':
			return import('./../pages/tos/TosPage.svelte')
				.then(getModule)
				.catch(logError);

		case 'signout':
			return import('./../pages/user/SignoutPage.svelte')
				.then(getModule)
				.catch(logError);

		case 'profile':
			return import('./../pages/user/ProfilePage.svelte')
				.then(getModule)
				.catch(logError);

		case 'login':
			return import('./../pages/user/LoginPage.svelte')
				.then(getModule)
				.catch(logError);

		case 'signup':
			return import('./../pages/user/SignupPage.svelte')
				.then(getModule)
				.catch(logError);

		case 'restore':
			return import('./../pages/user/ResetPasswordPage.svelte')
				.then(getModule)
				.catch(logError);

		case 'guns':
			return import('./../pages/guns/GunsPage.svelte')
				.then(getModule)
				.catch(logError);

		case 'guns-upload':
			return import('../pages/guns/forms/PhotoUploadWrapper.svelte')
				.then(getModule)
				.catch(logError);

		case 'track':
			return import('./../pages/track/TrackPage.svelte')
				.then(getModule)
				.catch(logError);
	}
}
