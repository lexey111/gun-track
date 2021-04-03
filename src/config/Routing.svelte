<script lang="ts">
	import {Route} from 'svelte-routing';
	import AuthGuardPage from '../components/AuthGuardPage.svelte';

	import AboutPage from '../pages/about/AboutPage.svelte';
	import GunsPage from '../pages/guns/Guns.svelte';

	import HomePage from '../pages/home/HomePage.svelte';
	import TosPage from '../pages/tos/TosPage.svelte';

	import LoginPage from '../pages/user/LoginPage.svelte';

	import ProfilePage from '../pages/user/ProfilePage.svelte';
	import ResetPasswordPage from '../pages/user/ResetPasswordPage.svelte';

	import SignoutPage from '../pages/user/SignoutPage.svelte';
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

	<Route path="signout" component={SignoutPage}/>
	<Route path="logout" component={SignoutPage}/>

	<Route path="about" component={AboutPage}/>

	<Route path="tos" component={TosPage}/>

	<Route path="guns">
		<AuthGuardPage component={GunsPage} redirectTo="login"/>
	</Route>

	<Route path="home" component={HomePage}/>

	<Route path="/">
		<HomePage/>
	</Route>
</div>

