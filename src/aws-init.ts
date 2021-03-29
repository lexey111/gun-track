/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-misused-promises */
import {DataStore} from '@aws-amplify/datastore';
import Amplify, {Auth, Hub} from 'aws-amplify';
import awsconfig from './aws-exports';

import {AuthStore} from './stores/auth/auth-store';
import {GunsStore} from './stores/guns/guns-store';
import './styles/index.less';

Amplify.configure(awsconfig);

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
				console.log('signIn', data);
				break;
			}
			case 'signOut':
				console.log('signOut');
				void await DataStore.clear();
				AuthStore.setLoggedOut();
				break;
			case 'customOAuthState':
				console.log('customOAuthState', data);
		}
	});

Auth.currentAuthenticatedUser()
	.then(user => {
		console.log('user log in', user);

		const identities = JSON.parse(user.attributes?.identities || '[]')[0];

		console.log('identities', identities);
		console.log('attrs', user.attributes);

		AuthStore.setLoggedIn(
			identities.userId,
			identities.providerName,
			user.attributes.email
		);

		void GunsStore.initStore();
		void GunsStore.loadGuns();

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return user;
	})
	.catch(err => {
		console.log('Not signed in'); // https://lexey111-dev.auth.eu-central-1.amazoncognito.com/oauth2/idpresponse
		console.log(err);

		AuthStore.setLoggedOut();
		GunsStore.unloadGuns();
	});
