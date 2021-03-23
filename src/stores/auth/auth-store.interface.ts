import {Writable} from 'svelte/store';
import {TUser} from './user-model';

export type TAuthState = TUser & {
	fetching: boolean
	started: boolean
};

export interface IAuthStore extends Writable<TAuthState> {
	init: () => void

	logIn: (provider: string) => void
	logOut: () => void
}
