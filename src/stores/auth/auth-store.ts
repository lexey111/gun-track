import {Auth, CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import {DataStore} from '@aws-amplify/datastore';
import * as Md5 from 'md5';
import {writable} from 'svelte/store';
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
	return Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook});
}

async function logout(): Promise<any> {
	userId = '';
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
	try {
		result = await Auth.signUp({
			username: email,
			password,
			attributes: {
				email
			}
		});
	} catch (error) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return error;
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return result;
}

async function signIn(email: string, password: string): Promise<any> {
	let user;
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		user = await Auth.signIn(email, password);
	} catch (error) {
		console.log('error signing in', error);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return error;
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return user;
}

async function confirmSignUp(email: string, code: string): Promise<boolean> {
	let result;
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		result = await Auth.confirmSignUp(email, code);
	} catch (error) {
		console.log('error confirming sign up', error);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return error;
	}
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
		console.log('******* LOGIN ********');
		console.log('id', id);
		console.log('provider', provider);
		console.log('email', email);
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
		console.log('Log out - cleanup');
		void DataStore.clear();
		update(state => {
			return {
				...state,
				...resetUser()
			};
		});
	},

	loginWithFacebook,
	logout,
	signUp,
	confirmSignUp,
	signIn
};
