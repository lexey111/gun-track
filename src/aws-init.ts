/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-misused-promises */
import {Auth} from '@aws-amplify/auth';
import {Amplify, Hub} from '@aws-amplify/core';
import {DataStore} from '@aws-amplify/datastore';
import awsconfig from './aws-exports';

import {AuthStore} from './stores/auth/auth-store';
import {GunsStore} from './stores/guns/guns-store';
import './styles/index.less';

Amplify.configure(awsconfig);
DataStore.configure(awsconfig);

async function processSignIn(user): Promise<any> {
	const identities = JSON.parse(user.attributes?.identities || '[]')[0];
	if (!identities && !user.attributes) {
		console.log('Empty response');
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
				void await DataStore.clear();
				AuthStore.setLoggedOut();
				GunsStore.unloadGuns();
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
				event
			}
		}
	) => {

		if (dbExists && event === 'storageSubscribed') {
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

		AuthStore.setLoggedOut();
		GunsStore.unloadGuns();
	});
