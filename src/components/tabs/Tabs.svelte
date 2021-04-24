<script context="module" lang="ts">
	export const TABS = {};
</script>

<script lang="ts">
	import {setContext, onDestroy, onMount} from 'svelte';
	import {writable} from 'svelte/store';

	const tabs = [];
	const panels = [];
	let idx = 0;
	const selectedTab = writable(null);
	const selectedPanel = writable(null);

	setContext(TABS, {
		registerTab: (tab: any) => {
			tabs.push(tab);
			selectedTab.update(current => current || tab);

			onDestroy(() => {
				const i = tabs.indexOf(tab);
				tabs.splice(i, 1);
				selectedTab.update(current => current === tab ? (tabs[i] || tabs[tabs.length - 1]) : current);
			});
		},

		registerPanel: (panel: any) => {
			panels.push(panel);
			selectedPanel.update(current => current || panel);

			onDestroy(() => {
				const i = panels.indexOf(panel);
				panels.splice(i, 1);
				selectedPanel.update(current => current === panel ? (panels[i] || panels[panels.length - 1]) : current);
			});
		},

		selectTab: (tab: any) => {
			const i = tabs.indexOf(tab);

			if (idx >= 0 && panels[idx].onDeactivate) {
				panels[idx].onDeactivate();
			}

			idx = i;
			selectedTab.set(tab);

			selectedPanel.set(panels[i]);

			if (panels[i].onActivate) {
				panels[i].onActivate();
			}
		},

		selectedTab,
		selectedPanel
	});

	onMount(() => {
		if (panels && panels.length > 0) {
			if (panels[0].onActivate) {
				panels[0].onActivate();
			}
		}
	});
</script>

<div class="tabs">
	<slot></slot>
</div>

<style lang="less">
	.tabs {
		margin: 0;
		padding-top: 8px;
		background-color: var(--app-white-bg);
	}
</style>
