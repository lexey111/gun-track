import {writable} from 'svelte/store';
import {AuthFirebase} from '../firestore/auth-firebase';
import {IAuthStore, TAuthState} from './auth-store.interface';
import {USER_INITIAL} from './user-model';
import {mapFirebaseUserToUser} from './user-utils';

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

function reportError(err): TAuthState {
	// eslint-disable-next-line no-console
	console.error(err);

	return {
		...USER_INITIAL,
		started: true,
		fetching: false
	};
}

function resetUser(): TAuthState {
	return {
		...USER_INITIAL,
		started: true,
		fetching: false
	};
}

export const AuthStore: IAuthStore = {
	subscribe,
	set,
	update,

	logIn: (provider: 'google' | 'facebook' | 'github') => {
		AuthFirebase
			.loginWith(provider)
			.catch(reportError);
	},

	logOut: () => {
		AuthFirebase
			.logout()
			.then(resetUser)
			.catch(reportError);
	},

	init: () => {
		update(current => {
			AuthFirebase.attachToFirebaseAuth(
				result => {
					update(state => {
						// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
						if (result && state.id !== result.uid) {
							return {
								...mapFirebaseUserToUser(result),
								started: true,
								fetching: false
							};
						}
						return {
							...USER_INITIAL,
							started: true,
							fetching: false
						};
					});
				},
				() => {
					update(resetUser);
				});

			return {
				...current,
				fetching: true
			};
		});
	}
};
