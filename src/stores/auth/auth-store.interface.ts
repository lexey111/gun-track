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

	loginWithFacebook: () => Promise<any>
	loginWithGoogle: () => Promise<any>

	logout: () => Promise<any>

	signUp: (email: string, password: string) => Promise<any>
	confirmSignUp: (email: string, code: string) => Promise<boolean>

	signIn: (email: string, password: string) => Promise<any>
}
