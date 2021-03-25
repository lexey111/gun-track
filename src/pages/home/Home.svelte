<script lang="ts">
	import I18n from '../../app/i18n/I18n.svelte';
	import {AppStateStore} from '../../stores/app/app-state-store';

	const setEN = () => {
		AppStateStore.setLocale('en-EN');
	}

	const setUA = () => {
		AppStateStore.setLocale('ua-UA');
	}

	const setRU = () => {
		AppStateStore.setLocale('ru-RU');
	}
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

	<div>
		<button class="press press-ghost press-blue" on:click={setEN}>Set en-EN</button>
		<button class="press press-ghost press-blue" on:click={setUA}>Set ua-UA</button>
		<button class="press press-ghost press-blue" on:click={setRU}>Set ru-RU</button>
	</div>
</div>
