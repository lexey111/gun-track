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
	:global {
		.tab-panel {
			background-color: var(--app-background);
			margin: 0;
			padding: 16px 0;
			position: relative;
			display: flex;
			flex-grow: 2;
			flex-flow: column nowrap;
			justify-content: stretch;
			box-sizing: border-box;

			.tab-content {
				padding: 16px 32px;
				height: 100%;
				box-sizing: border-box;

				overflow: visible;
			}
		}
	}
</style>
