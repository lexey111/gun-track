<script>
	import Done from './Done.svelte';
</script>

<div class="app-page">
	<h1>About</h1>

	<h2>TODO</h2>

	<h3>UI</h3>
	<ul>
		<li>
			<Done>Modal</Done>
		</li>
		<li>
			<Done>I18n - component</Done></li>
		<li>I18n - infrastructure</li>
		<li>I18n - interface</li>
		<li>I18n - translations</li>
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
		<li>Auth database - AWS</li>
		<li>Own database - AWS</li>
	</ul>
</div>
