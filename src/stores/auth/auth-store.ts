/* eslint-disable no-console */
import {Auth, CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import {DataStore} from '@aws-amplify/datastore';
import * as Md5 from 'md5';
import {writable} from 'svelte/store';
import {AppStateStore} from '../app/app-state-store';
import {IAuthStore, TAuthState} from './auth-store.interface';
import {USER_INITIAL} from './user-model';

export let userId = '';
// eslint-disable-next-line @typescript-eslint/unbound-method
const {
	subscribe,
	set,
	update
} = writable<TAuthState>({
	...USER_INITIAL,
	fetching: false,
	started: false
});

function resetUser(): TAuthState {
	userId = '';
	return {
		...USER_INITIAL,
		started: true,
		fetching: false
	};
}

function loginWithFacebook(): Promise<any> {
	AppStateStore.showSpinner();
	return Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook});
}

function loginWithGoogle(): Promise<any> {
	AppStateStore.showSpinner();
	return Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google});
}

async function logout(): Promise<any> {
	userId = '';
	AppStateStore.showSpinner();
	update(state => {
		return {
			...state,
			fetching: true
		};
	});
	return Auth.signOut();
}

async function signUp(email: string, password: string): Promise<any> {
	let result;
	AppStateStore.showSpinner();
	try {
		result = await Auth.signUp({
			username: email,
			password,
			attributes: {
				email
			}
		});
	} catch (error) {
		AppStateStore.hideSpinner();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return error;
	}
	AppStateStore.hideSpinner();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return result;
}

async function signIn(email: string, password: string): Promise<any> {
	let user;
	AppStateStore.showSpinner();
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		user = await Auth.signIn(email, password);
	} catch (error) {
		AppStateStore.hideSpinner();
		console.log('Error signing in', error);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return error;
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return user;
}

async function confirmSignUp(email: string, code: string): Promise<boolean> {
	let result;
	AppStateStore.showSpinner();
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		result = await Auth.confirmSignUp(email, code);
	} catch (error) {
		AppStateStore.hideSpinner();
		console.log('Error confirming sign up', error);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return error;
	}
	AppStateStore.hideSpinner();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return result;
}

async function changePassword(oldPwd: string, newPwd: string): Promise<boolean> {
	let result;
	AppStateStore.showSpinner();
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const user = await Auth.currentAuthenticatedUser();
		result = await Auth.changePassword(user, oldPwd, newPwd);
	} catch (error) {
		AppStateStore.hideSpinner();
		console.log('Error changing password', error);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return error;
	}
	AppStateStore.hideSpinner();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return result;
}

async function forgotPassword(email: string): Promise<boolean> {
	let result;
	AppStateStore.showSpinner();
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		result = await Auth.forgotPassword(email);
	} catch (error) {
		AppStateStore.hideSpinner();
		console.log('Error sending reset code', error);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return error;
	}
	AppStateStore.hideSpinner();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return result;
}

async function confirmForgotPassword(email: string, code: string, newPassword: string): Promise<boolean> {
	let result;
	AppStateStore.showSpinner();
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		result = await Auth.forgotPasswordSubmit(email, code, newPassword);
	} catch (error) {
		AppStateStore.hideSpinner();
		console.log('Error setting up new password', error);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return error;
	}
	AppStateStore.hideSpinner();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return result;
}

export const AuthStore: IAuthStore = {
	subscribe,
	set,
	update,

	setFetching: (fetching: boolean) => {
		update(state => ({
			...state,
			fetching
		}));
	},

	setLoggedIn: (id: string, provider: string, email: string) => {
		AppStateStore.hideSpinner();
		userId = id;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
		const md5Email: string = Md5(email);

		update(state => {
			return {
				...state,
				fetching: false,
				started: true,
				id,
				providerId: provider,
				email,
				profileImageUrl: `https://www.gravatar.com/avatar/${md5Email}`,
				loggedIn: true
			};
		});
	},

	setLoggedOut: () => {
		void DataStore.clear();
		AppStateStore.hideSpinner();
		update(state => {
			return {
				...state,
				...resetUser()
			};
		});
	},

	loginWithFacebook,
	loginWithGoogle,

	logout,

	signUp,
	confirmSignUp,
	signIn,

	forgotPassword,
	confirmForgotPassword,
	changePassword
};
