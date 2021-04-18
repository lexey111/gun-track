<script>
	import Done from './Done.svelte';
</script>

<div class="app-page">
	<h1>About</h1>

	<h2>TODO</h2>

	<div class="three-columns">

		<h3>Tech</h3>
		<ul>
			<li>
				<Done>Remove favicons plugin</Done>
			</li>
		</ul>

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
			<li>
				<Done>Icons</Done>
			</li>
			<li>Modal - reserve scrollbar's place</li>
			<li>
				<Done>Table</Done>
			</li>
			<li>
				<Done>Notifications</Done>
			</li>
			<li>
				<Done>Backgrounds</Done>
			</li>
			<li>
				<Done>Language switcher</Done>
			</li>
			<li>
				<Done>Better colors for track</Done>
			</li>
			<li>
				<Done>Buttons</Done>
			</li>
			<li>
				<Done>Buttons in login</Done>
			</li>
			<li>Better login with tabs</li>
			<li>
				<Done>Dropdowns</Done>
			</li>
			<li>Stats on Home</li>
			<li>Contacts page</li>
			<li>Navigator offline mode (disable requests)</li>
		</ul>

		<h3>Track list</h3>
		<ul>
			<li>
				Dropdown gun navigator
			</li>
			<li>
				<Done>Filter by type (dropdown menu)</Done>
			</li>
			<li>
				<Done>Expenses display</Done>
			</li>
			<li>
				<Done>Expenses and shots total</Done>
			</li>
			<li>
				<Done>Better hover</Done>
			</li>
			<li>Stat cards</li>
			<li>Floating add button</li>
			<li>Block UI when busy state</li>
			<li>Compact view</li>
			<li>
				<Done>Add repair</Done>
			</li>
			<li>Restrict string lengths</li>
			<li>
				<Done>Date editor</Done>
			</li>
			<li>Groups in type</li>
		</ul>

		<h3>Gun list</h3>
		<ul>
			<li>
				<Done>"Make"/"Model" fields</Done>
			</li>
			<li>Caliber field</li>
			<li>Notes editor</li>
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
			<li>
				<Done>Cards</Done>
			</li>
			<li>Delete gun with records</li>
			<li>Extra confirmation if records</li>
			<li>SS selectors? delete actions?</li>
			<li>Photo uploading for guns</li>
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
			<li>
				<Done>Replace cancelled requests with smth. other</Done>
			</li>
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

		<h3>Home</h3>
		<ul>
			<li>BTS photo with price tags</li>
			<li>Gun selector if > 1</li>
			<li>Gun stat (async)</li>
			<li>- Dynamic bg</li>
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
			<li>Schema cleanup (- gunid)</li>
			<li>graph ql</li>
		</ul>
	</div>
</div>


<style>
    .three-columns {
        column-count: 3;
    }
</style>
