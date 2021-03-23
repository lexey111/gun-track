/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import {TUser, USER_INITIAL} from './user-model';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function mapFirebaseUserToUser(userData: any): TUser {
	const newUser = {...USER_INITIAL};

	newUser.id = userData.uid;

	if (!newUser.id) {
		newUser.id = userData.providerData && userData.providerData.length ? userData.providerData[0].uid : void 0;
	}

	if (!newUser.id) {
		throw new Error('User ID is empty.');
	}

	newUser.loggedIn = Boolean(userData.uid);
	newUser.displayName = userData.displayName || '';
	newUser.phoneNumber = userData.phoneNumber || '';
	newUser.email = userData.email || '';
	newUser.emailVerified = userData.emailVerified;
	newUser.profileImageUrl = userData.photoURL || '';
	newUser.providerId = userData.providerData && userData.providerData.length ? userData.providerData[0].providerId : 'unknown';
	newUser.providerData = userData.providerData && userData.providerData.length ? userData.providerData[0] : {};

	if (Array.isArray(userData.providerData) && userData.providerData.length && !newUser.email) {
		newUser.email = userData.providerData[0].email;
	}
	return newUser;
}
