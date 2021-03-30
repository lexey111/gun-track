<script lang="ts">
	import I18n from '../../app/i18n/I18n.svelte';
	import {NotifyStore} from '../../app/notifications/notify-store';
	import SpinnerComponent from '../../components/SpinnerComponent.svelte';
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

	<p>
		<SpinnerComponent/>
		Some text
		<SpinnerComponent/>
	</p>

	<button class="press press-ghost press-blue" on:click={() => {
		AppStateStore.showSpinner();
		setTimeout(AppStateStore.hideSpinner, 5000);
	}}>Show spinner for 5s
	</button>

	<p>&nbsp;</p>

	<div>
		<button
			class="press press-ghost press-green"
			on:click={() => NotifyStore.push({title: 'Sample title', text: 'Sample text'})}>
			Add default
		</button>

		<button
			class="press press-ghost press-green"
			on:click={() => NotifyStore.push({title: 'Sample title', text: 'Sample more long text', type: 'info'})}>
			Add info
		</button>

		<button
			class="press press-ghost press-green"
			on:click={() => NotifyStore.push({
			title: 'Sample title',
			text: 'Sample long text probably multiline one jhd hask fkjdshf sdlkjf jsdkfj skdj fsdkljfklsdjf jsj ljdsklf sdkfjlskd',
			type: 'warn'})}>
			Add warn
		</button>

		<button
			class="press press-ghost press-green"
			on:click={() => NotifyStore.push({title: 'Sample title', text: 'Sample text', type: 'error'})}>
			Add error
		</button>

		<button
			class="press press-ghost press-green"
			on:click={() => NotifyStore.push({title: 'Sample title', text: 'Sample text', type: 'success'})}>
			Add success
		</button>

		<button
			class="press press-ghost press-green"
			on:click={() => NotifyStore.push({title: 'Sample title', text: 'Sample text', type: 'error', ttl: 10})}>
			Add error [10s]
		</button>

		<button
			class="press press-ghost press-green"
			on:click={() => NotifyStore.push({title: 'Permanent title', text: 'Sample text', type: 'info', ttl: 0})}>
			Add info [permanent]
		</button>
	</div>
</div>
