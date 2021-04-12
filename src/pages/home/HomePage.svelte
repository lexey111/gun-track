<script lang="ts">
	import I18n from '../../components/i18n/I18n.svelte';
	import {Tab, TabHeader, TabPanel, Tabs} from '../../components/tabs';
</script>

<div class="app-page">
	<h1>
		<I18n>@Common.Welcome</I18n>
	</h1>
	<h2>
		<I18n text="@Common.Welcome"/>
	</h2>
	<h3>
		<I18n>@Common.ThisIsGunTrack</I18n>
	</h3>

	<Tabs>
		<TabHeader>
			<Tab>one</Tab>
			<Tab>two</Tab>
			<Tab>three</Tab>
		</TabHeader>

		<TabPanel>
			<h2>First panel</h2>
		</TabPanel>

		<TabPanel>
			<h2>Second panel</h2>
		</TabPanel>

		<TabPanel>
			<h2>Third panel</h2>
		</TabPanel>
	</Tabs>
</div>
