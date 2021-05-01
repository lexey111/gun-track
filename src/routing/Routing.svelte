<script lang="ts">
	import {Route} from 'svelte-routing';
	import AppPage from '../components/AppPage.svelte';
</script>

<div class="app-pages">
	<Route path="profile">
		<AppPage pageId="profile" onlyLoggedIn={true} redirectTo="/login"/>
	</Route>

	<Route path="signin">
		<AppPage pageId="login" onlyLoggedOut={true} redirectTo="/home"/>
	</Route>
	<Route path="login">
		<AppPage pageId="login" onlyLoggedOut={true} redirectTo="/home"/>
	</Route>

	<Route path="login/signup">
		<AppPage pageId="signup" onlyLoggedOut={true} redirectTo="/home"/>
	</Route>

	<Route path="login/restore">
		<AppPage pageId="restore" onlyLoggedOut={true} redirectTo="/home"/>
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
		<AppPage pageId="guns" onlyLoggedIn={true} redirectTo="/login" class="no-paddings"/>
	</Route>

	<Route path="guns/:id/upload" let:params>
		<AppPage pageId="photo-upload" onlyLoggedIn={true} redirectTo="/login" {params}/>
	</Route>

	<Route path="guns/:id/edit" let:params>
		<AppPage pageId="gun-form" onlyLoggedIn={true} redirectTo="/login" {params}/>
	</Route>

	<Route path="track">
		<AppPage pageId="track" onlyLoggedIn={true} redirectTo="/login" class="no-paddings"/>
	</Route>

	<Route path="track/:id" let:params>
		<AppPage pageId="track" onlyLoggedIn={true} redirectTo="/login" class="no-paddings" {params}/>
	</Route>

	<Route path="ui">
		<AppPage pageId="ui"/>
	</Route>

	<Route path="home">
		<AppPage pageId="home" class="no-paddings"/>
	</Route>
	<Route path="/">
		<AppPage pageId="home" class="no-paddings"/>
	</Route>
</div>

