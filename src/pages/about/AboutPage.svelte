<script>
	import Done from './Done.svelte';
</script>

<div class="app-page">
	<h1>About</h1>

	<h2>TODO</h2>

	<div class="three-columns">

		<h3>UI</h3>
		<ul>
			<li>Design system - colors etc.</li>
			<li>
				<Done>Modal</Done>
			</li>
			<li>
				<Done>I18n - component</Done>
			</li>
			<li>
				<Done>I18n - infrastructure</Done>
			</li>
			<li>
				<Done>I18n - interface</Done>
			</li>
			<li>
				<Done>I18n - translations</Done>
			</li>
			<li>
				<Done>I18n - dates</Done>
			</li>
			<li>
				<Done>Spinner on busy</Done>
			</li>
			<li>
				<Done>Fullscreen spinner</Done>
			</li>
			<li>Icons</li>
			<li>
				<Done>Table</Done>
			</li>
			<li>
				<Done>Notifications</Done>
			</li>
			<li>
				<Done>Backgrounds</Done>
			</li>
			<li>Language switcher</li>
			<li>
				<Done>Better colors for track</Done>
			</li>
			<li>Compact view</li>
		</ul>

		<h3>Functionality</h3>
		<ul>
			<li>
				<Done>Guns to store</Done>
			</li>
			<li>
				<Done>Single home page/login</Done>
			</li>
			<li>
				<Done>Edit action</Done>
			</li>
			<li>
				<Done>New action</Done>
			</li>
			<li>
				<Done>Single Modal for gun</Done>
			</li>
			<li>
				<Done>Delete action</Done>
			</li>
			<li>Delete gun with records</li>
			<li>SS selectors? delete actions?</li>
			<li>Photo uploading for guns</li>
			<li>Floating button if records > 5</li>
			<li>
				<Done>Big text editor</Done>
			</li>
			<li>Dashboard and graphs</li>
			<li>CSV export</li>
			<li>Mobile views</li>
		</ul>

		<h3>i18n</h3>
		<ul>
			<li>Translations</li>
		</ul>

		<h3>Routing</h3>
		<ul>
			<li>
				<Done>Hide non-auth routes</Done>
			</li>
			<li>
				<Done>Dynamic routes (rebuild on login)</Done>
			</li>
			<li>
				<Done>Route guard</Done>
			</li>
		</ul>

		<h3>Database</h3>
		<ul>
			<li>
				<Done>Auth database - AWS</Done>
			</li>
			<li>
				<Done>Gravatar image</Done>
			</li>
			<li>
				<Done>Auth with Google</Done>
			</li>
			<li>
				<Done>Auth with local credentials</Done>
			</li>
			<li>
				<Done>Forgot password, reset</Done>
			</li>
			<li>
				<Done>Change password</Done>
			</li>
			<li>
				<Done>Own database - AWS</Done>
			</li>
			<li>
				<Done>Gun records editor</Done>
			</li>
			<li>
				<Done>Gun records table</Done>
			</li>
			<li>Gun records stats</li>
		</ul>
	</div>
</div>


<style>
    .three-columns {
        column-count: 3;
    }
</style>
