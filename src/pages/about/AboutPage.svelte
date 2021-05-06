<script>
	import Done from './Done.svelte';
</script>

<h1>About</h1>

<h2>TODO</h2>

<div class="three-columns">

	<h3>Tech</h3>
	<ul>
		<li>
			Login by enter on pwd field in email tab
		</li>
		<li>
			Current password autocomplete off
		</li>
		<li>
			Fix extra scroll on short pages
		</li>
		<li>
			<Done>Domain</Done>
		</li>
		<li>
			<Done>Deploy</Done>
		</li>
		<li>
			<Done>CI/CD</Done>
		</li>
		<li>
			Update OG in html
		</li>
		<li>
			<Done>Register contact email</Done>
		</li>
	</ul>

	<h3>UI</h3>
	<ul>
		<li>
			Page scroll position store/restore
		</li>
		<li>Gun cards default image</li>
	</ul>

	<h3>Login</h3>
	<ul>
		<li>Telegram channel</li>
		<li>Support email</li>
	</ul>

	<h3>Home</h3>
	<ul>
		<li>Last gun stat (async)</li>
	</ul>
</div>


<style>
    .three-columns {
        column-count: 3;
    }
</style>
