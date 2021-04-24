import type {Writable} from 'svelte/store';
import type {TUser} from './user-model';

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

	forgotPassword: (email: string) => Promise<boolean>
	confirmForgotPassword: (email: string, code: string, newPassword: string) => Promise<any>
	changePassword: (oldPwd: string, newPwd: string) => Promise<boolean>

	signIn: (email: string, password: string) => Promise<any>
}
