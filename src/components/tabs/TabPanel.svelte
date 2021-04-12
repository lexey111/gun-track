<script lang="ts">
	import {getContext} from 'svelte';
	import {TABS} from './Tabs.svelte';

	export let className = '';
	export let onActivate: () => {} = null;
	export let onDeactivate: () => {} = null;
	const panel = {
		onActivate,
		onDeactivate
	};
	const {
		registerPanel,
		selectedPanel
	} = getContext(TABS);

	registerPanel(panel);
</script>

{#if ($selectedPanel === panel)}
	<div class={'tab-panel' + (className ? ' ' + className : '')}>
		<div class="tab-content">
			<slot></slot>
		</div>
	</div>
{/if}
