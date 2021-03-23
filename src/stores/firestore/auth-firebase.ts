/* eslint-disable @typescript-eslint/no-unsafe-return */
import firebase from 'firebase';
import {firebaseAuth} from './firebase.providers';
import UserCredential = firebase.auth.UserCredential;

export const AUTH_PROVIDER = {
	google: 'google',
	facebook: 'facebook',
	github: 'github',
};

export interface IUserFirebase {
	attachToFirebaseAuth(success: (any) => void, error: (any) => void): void

	getRedirectResult(): Promise<UserCredential | Error>

	loginWith(providerName: string): Promise<any>

	logout(): Promise<any>
}

export const AuthFirebase: IUserFirebase = {
	attachToFirebaseAuth(success, error) {
		firebaseAuth()
			.onAuthStateChanged(
				data => {
					// unsubscribe();
					success(data);
				},
				err => {
					// unsubscribe();
					error(err);
				});
	},

	getRedirectResult() {
		return firebaseAuth()
			.getRedirectResult()
			.then((result) => {
				return result;
			}).catch(error => error);
	},

	loginWith(providerName) {
		let provider;
		if (providerName === AUTH_PROVIDER.google) {
			provider = new firebaseAuth.GoogleAuthProvider();
		}
		if (providerName === AUTH_PROVIDER.facebook) {
			provider = new firebaseAuth.FacebookAuthProvider();
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
			provider.addScope('email');
		}
		if (providerName === AUTH_PROVIDER.github) {
			provider = new firebaseAuth.GithubAuthProvider();
		}
		if (!provider) {
			throw new Error('Unknown auth provider');
		}

		return firebaseAuth()
			.signInWithRedirect(provider);
	},

	logout() {
		return firebaseAuth().signOut();
	}
};
