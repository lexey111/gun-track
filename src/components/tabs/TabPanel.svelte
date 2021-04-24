<script lang="ts">
	import {getContext} from 'svelte';
	import {TABS} from './Tabs.svelte';

	export let className = '';
	export let onActivate: () => void = null;
	export let onDeactivate: () => void = null;
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

<style lang="less">
	.tab-panel {
		background-color: var(--app-background);
		z-index: 1;
		margin: 0;

		.tab-content {
			padding: 16px 32px;
			overflow: visible;
		}
	}
</style>
