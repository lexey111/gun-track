import {Writable} from 'svelte/store';
import {TUser} from './user-model';

export type TAuthState = TUser & {
	fetching: boolean
	started: boolean
};

export interface IAuthStore extends Writable<TAuthState> {
	setFetching: (fetching: boolean) => void

	setLoggedIn: (id: string, provider: string, email: string) => void

	setLoggedOut: () => void
}
