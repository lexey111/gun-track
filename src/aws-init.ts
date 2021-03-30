/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-misused-promises */
import {DataStore} from '@aws-amplify/datastore';
import Amplify, {Auth, Hub} from 'aws-amplify';
import awsconfig from './aws-exports';

import {AuthStore} from './stores/auth/auth-store';
import {GunsStore} from './stores/guns/guns-store';
import './styles/index.less';

Amplify.configure(awsconfig);

function processSignIn(user): any {
	console.log('user log in', user);

	const identities = JSON.parse(user.attributes?.identities || '[]')[0];
	if (!identities && !user.attributes) {
		console.log('Empty response');
		return;
	}

	console.log('identities', identities);
	console.log('attrs', user.attributes);

	AuthStore.setLoggedIn(
		identities?.userId || user.attributes.email,
		identities?.providerName || 'e-mail',
		user.attributes.email
	);

	void GunsStore.initStore();
	void GunsStore.loadGuns();

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
				processSignIn(data);
				break;
			}
			case 'signOut':
				void await DataStore.clear();
				AuthStore.setLoggedOut();
				GunsStore.unloadGuns();
				break;
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
