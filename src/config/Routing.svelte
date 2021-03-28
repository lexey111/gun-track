<script lang="ts">
	import {Route} from 'svelte-routing';
	import AuthGuardPage from '../components/AuthGuardPage.svelte';
	import About from '../pages/about/About.svelte';
	import Home from '../pages/home/Home.svelte';
	import Login from '../pages/profile/Login.svelte';
	import Signout from '../pages/profile/Signout.svelte';
	import Profile from '../pages/profile/Profile.svelte';
</script>

<div class="app-pages">
	<Route path="profile">
		<AuthGuardPage component={Profile} redirectTo="login"/>
	</Route>
	<Route path="signin">
		<AuthGuardPage logout={true} component={Login}/>
	</Route>
	<Route path="signout" component={Signout}/>
	<Route path="about" component={About}/>
	<Route path="home" component={Home}/>
	<Route path="/">
		<Home/>
	</Route>
</div>

