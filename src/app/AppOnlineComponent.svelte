<script lang="ts">
	import {onMount} from 'svelte';
	import Icon from '../components/icons/Icon.svelte';

	let online = true;

	function updateOnlineStatus() {
		online = navigator.onLine;
	}

	onMount(() => {
		window.addEventListener('online', updateOnlineStatus);
		window.addEventListener('offline', updateOnlineStatus);
	});
</script>

{#if (!online)}
	<div id="offline-mode">
		<div id="offline-mode-content">
			<h1>
				<Icon type="power"/> &nbsp; Seems you are offline.
			</h1>

			<p>
				Application can work without active Internet connection, but not all the operations will be available. Changes will be
				synced to cloud when you return online.
			</p>
		</div>
	</div>
{/if}

<style lang="less">
	#offline-mode {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-items: center;
		padding: 8px 16px;
		background-color: var(--app-warn-bg);
		opacity: .9;
		color: var(--app-warn-text);
		font-size: var(--app-very-small-font-size);
		z-index: 100;

		h1 {
			font-size: 1.5em;
		}
	}
</style>
