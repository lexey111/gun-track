<script lang="ts">
	import {Route} from 'svelte-routing';
	import AppPage from '../components/AppPage.svelte';
	import AuthGuardPage from '../components/AuthGuardPage.svelte';
	import GunsPage from '../pages/guns/GunsPage.svelte';
	import TrackPage from '../pages/track/TrackPage.svelte';

	import LoginPage from '../pages/user/LoginPage.svelte';

	import ProfilePage from '../pages/user/ProfilePage.svelte';
	import ResetPasswordPage from '../pages/user/ResetPasswordPage.svelte';
	import SignupPage from '../pages/user/SignupPage.svelte';
</script>

<div class="app-pages">
	<Route path="profile">
		<AuthGuardPage component={ProfilePage} redirectTo="login"/>
	</Route>

	<Route path="signin">
		<AuthGuardPage logout={true} component={LoginPage}/>
	</Route>

	<Route path="login">
		<AuthGuardPage logout={true} component={LoginPage}/>
	</Route>

	<Route path="login/signup">
		<AuthGuardPage logout={true} component={SignupPage}/>
	</Route>

	<Route path="login/restore">
		<AuthGuardPage logout={true} component={ResetPasswordPage}/>
	</Route>

	<Route path="signout">
		<AppPage pageId="signout"/>
	</Route>
	<Route path="logout">
		<AppPage pageId="signout"/>
	</Route>

	<Route path="about">
		<AppPage pageId="about"/>
	</Route>

	<Route path="tos">
		<AppPage pageId="tos"/>
	</Route>

	<Route path="guns">
		<AuthGuardPage component={GunsPage} redirectTo="/login" class="no-paddings"/>
	</Route>

	<Route path="track">
		<AuthGuardPage component={TrackPage} redirectTo="/login" class="no-paddings"/>
	</Route>

	<Route path="track/:id" let:params>
		<AuthGuardPage component={TrackPage} redirectTo="/login" class="no-paddings" params={params}/>
	</Route>

	<Route path="home">
		<AppPage pageId="home"/>
	</Route>
	<Route path="/">
		<AppPage pageId="home"/>
	</Route>
</div>

