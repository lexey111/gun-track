import * as Md5 from 'md5';
import {writable} from 'svelte/store';
import {IAuthStore, TAuthState} from './auth-store.interface';
import {USER_INITIAL} from './user-model';

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

	setFetching: (fetching: boolean) => {
		update(state => ({
			...state,
			fetching
		}));
	},

	logIn: (id: string, provider: string, email: string) => {
		console.log('******* LOGIN ********');
		console.log('id', id);
		console.log('provider', provider);
		console.log('email', email);

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

	logOut: () => {
		update(state => {
			return {
				...state,
				...resetUser()
			};
		});
	},
};
