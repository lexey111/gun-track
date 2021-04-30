<script lang="ts">
	import {getContext} from 'svelte';
	import {TABS} from './Tabs.svelte';

	const tab = {};
	const {
		registerTab,
		selectTab,
		selectedTab
	} = getContext(TABS);

	registerTab(tab);
</script>

<button class="tabs" class:selected="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
	<slot></slot>
</button>

<style lang="less">
	button.tabs {
		width: auto;
		flex-grow: 0;
		background: none;
		border: none;
		font-size: var(--app-small-font-size);
		color: var(--app-primary-bg);
		border-radius: 7px 7px 0 0;
		margin: 0;
		padding: 16px 32px 13px 32px;
		outline: none;
		cursor: pointer;
		position: relative;
		z-index: 2;
		transition: color .2s ease;

		&:first-child {
			margin-left: 16px;
		}

		&:hover, &:focus {
			color: var(--app-primary-bg-darken);
			text-decoration: underline;
		}

		&.selected {
			color: var(--app-primary-text);
			background-color: var(--app-primary-bg);
			font-weight: bold;
			box-shadow: 0 -2px 4px rgba(0, 0, 0, .2);
		}
	}
</style>
