/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-misused-promises,no-console */
import {Auth} from '@aws-amplify/auth';
import {Amplify, Hub} from '@aws-amplify/core';
import {DataStore} from '@aws-amplify/datastore';
import awsconfig from './aws-exports';
import {ActionsStore} from './stores/actions/actions-store';

import {AuthStore} from './stores/auth/auth-store';
import {GunsStore} from './stores/guns/guns-store';

// copied from serviceWorker.js to know if it is localhost or not
const isLocalhost = Boolean(
	window.location.hostname === 'localhost' ||
	// [::1] is the IPv6 localhost address.
	window.location.hostname === '[::1]' ||
	// 127.0.0.1/8 is considered localhost for IPv4.
	/^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})){3}$/.exec(window.location.hostname)
);

// by default, say it's localhost
const oauth = {
	domain: 'lexey111-main.auth.eu-central-1.amazoncognito.com',
	scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
	redirectSignIn: 'http://localhost:3000/',
	redirectSignOut: 'http://localhost:3000/',
	responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
};

// if not, update the URLs
if (!isLocalhost) {
	oauth.redirectSignIn = 'https://gun-track.org/';
	oauth.redirectSignOut = 'https://gun-track.org/';
	// oauth.redirectSignIn = 'https://main.dnps7jkdt711v.amplifyapp.com/';
	// oauth.redirectSignOut = 'https://main.dnps7jkdt711v.amplifyapp.com/';
}

// copy the constant config (aws-exports.js) because config is read only.

const configUpdate = awsconfig;
// update the configUpdate constant with the good URLs
configUpdate.oauth = oauth;

// Configure Amplify with configUpdate
Amplify.configure(configUpdate);
DataStore.configure(configUpdate as any);

// Amplify.configure(awsconfig);
// DataStore.configure(awsconfig as any);

async function signoutStores(): Promise<void> {
	void await DataStore.clear();
	AuthStore.setLoggedOut();
	GunsStore.unloadGuns();
	ActionsStore.unloadActions();
}

async function processSignIn(user): Promise<any> {
	const identities = JSON.parse(user.attributes?.identities || '[]')[0];
	if (!identities && !user.attributes) {
		console.error('Empty response');
		return;
	}

	const userId = identities?.userId || user.attributes.email;
	const lastLoggedUser = localStorage.getItem('lastLoggedUser');

	if (lastLoggedUser !== userId) {
		localStorage.setItem('lastLoggedUser', userId);
		await DataStore.clear();
		indexedDB.deleteDatabase('amplify-datastore');

		dbExists = false;
	}

	AuthStore.setLoggedIn(
		userId,
		identities?.providerName || 'e-mail',
		user.attributes.email
	);

	GunsStore.initStore();
	await GunsStore.loadGuns();

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return user;
}

Hub.listen(
	'auth',
	async (
		{
			payload: {
				event,
				data
			}
		}
	) => {
		switch (event) {
			case 'signIn': {
				await processSignIn(data);
				break;
			}
			case 'signOut':
				void await signoutStores();
				break;
		}
	});

let dbExists = true;

function recheckDbExists(): void {
	const request = indexedDB.open('amplify-datastore');
	request.onupgradeneeded = function (e: any) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		e.target.transaction.abort();
		dbExists = false;
	};
}

recheckDbExists();

Hub.listen(
	'datastore',
	(
		{
			payload: {
				event,
			}
		}
	) => {

		if (dbExists && event === 'subscriptionsEstablished') {
			GunsStore.setSubscribed();
		}

		if (event === 'ready') {
			GunsStore.setFullReady();
		}
	});

Auth.currentAuthenticatedUser()
	.then(user => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return processSignIn(user);
	})
	.catch(err => {
		console.log('Not signed in'); // https://lexey111-dev.auth.eu-central-1.amazoncognito.com/oauth2/idpresponse
		console.log(err);

		void signoutStores();
	});
