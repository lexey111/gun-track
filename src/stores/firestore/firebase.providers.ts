/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

import {firebaseSettings} from './config';

const firestoreSettings = {};

firebase.initializeApp(firebaseSettings.authConfig);

export const firestore = firebase.firestore();
firestore.settings(firestoreSettings);

// eslint-disable-next-line @typescript-eslint/unbound-method
export const getServerTimeStamp = firebase.firestore.FieldValue.serverTimestamp;

export const firebaseAuth = firebase.auth;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getDoc(recordRef: any): Promise<any> {
	let doc: any;

	try {
		doc = await recordRef.get({source: 'cache'});
	} catch {
		doc = null;
	}
	if (!doc || !doc?.exists) {
		try {
			doc = await recordRef.get({source: 'server'});
		} catch {
			doc = null;
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return doc;
}
