<script lang="ts">
	import I18n from '../../components/i18n/I18n.svelte';
	import {NotifyStore} from '../../components/notifications/notify-store';
	import SpinnerComponent from '../../components/SpinnerComponent.svelte';
	import {AppStateStore} from '../../stores/app/app-state-store';
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
</div>
