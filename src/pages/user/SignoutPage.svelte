<script lang="ts">
	import {onMount} from 'svelte';
	import {navigate} from 'svelte-routing';

	onMount(() => {
		setTimeout(() => {
			navigate('/home');
		}, 500);
	});
</script>

<div class={"app-page"}>
	<h1>Sign out</h1>
	<p>
		You will be redirected to Home page in a moment...
	</p>
</div>
