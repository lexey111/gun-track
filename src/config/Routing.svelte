<script lang="ts">
	import {Route} from 'svelte-routing';
	import AuthGuardPage from '../components/AuthGuardPage.svelte';

	import AboutPage from '../pages/about/AboutPage.svelte';
	import GunsPage from '../pages/guns/Guns.svelte';

	import HomePage from '../pages/home/HomePage.svelte';

	import LoginPage from '../pages/profile/LoginPage.svelte';
	import ProfilePage from '../pages/profile/ProfilePage.svelte';
	import SignoutPage from '../pages/profile/SignoutPage.svelte';
	import SignupPage from '../pages/profile/SignupPage.svelte';
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

	<Route path="signout" component={SignoutPage}/>
	<Route path="logout" component={SignoutPage}/>

	<Route path="about" component={AboutPage}/>

	<Route path="guns">
		<AuthGuardPage component={GunsPage} redirectTo="login"/>
	</Route>

	<Route path="home" component={HomePage}/>

	<Route path="/">
		<HomePage/>
	</Route>
</div>

