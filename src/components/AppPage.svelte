<script>
	import {onMount} from 'svelte';
	import SpinnerComponent from './spinners/SpinnerComponent.svelte';

	export let pageId = '';
	let cmp;
	let loaded = false;

	const setComponent = ({default: module}) => {
		loaded = true;
		return module;
	}

	const logError = (err) => {
		console.error(err && err.stack || err);
	}

	async function resolvePage() {
		switch (pageId) {
			case 'home':
				cmp = await import('/pages/home/HomePage.svelte')
					.then(setComponent)
					.catch(logError);
				break;
			case 'about':
				cmp = await import('/pages/about/AboutPage.svelte')
					.then(setComponent)
					.catch(logError);
				break;
			case 'tos':
				cmp = await import('/pages/tos/TosPage.svelte')
					.then(setComponent)
					.catch(logError);
				break;
			case 'signout':
				cmp = await import('/pages/user/SignoutPage.svelte')
					.then(setComponent)
					.catch(logError);
				break;
		}
	}

	onMount(() => {
		void resolvePage();
	});
</script>

<div class={'app-page' + ($$props.class ? ' ' + $$props.class : '') + (loaded ? ' loaded' : ' not-loaded')}>
	{#if (loaded)}
		<svelte:component this={cmp}/>
	{:else}
		<div class="wait-message">
			<SpinnerComponent/>
			Loading...
		</div>
	{/if}
</div>
