<script lang="ts">
	import {getContext} from 'svelte';
	import {TABS} from './Tabs.svelte';

	const panel = {};
	const {
		registerPanel,
		selectedPanel
	} = getContext(TABS);

	registerPanel(panel);
</script>

{#if $selectedPanel === panel}
	<div class="tab-panel">
		<div class="tab-content">
			<slot></slot>
		</div>
	</div>
{/if}
