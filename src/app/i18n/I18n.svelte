<script lang="ts">
	import {onDestroy} from 'svelte';
	import {AppStateStore} from '../../stores/app/app-state-store';
	import {I18nService} from './i18n.service';

	export let text = '';

	let translation = '';
	let _toTranslate = '';
	let slot;
	let translated = false;

	$: if (text) {
		_toTranslate = text;
	}

	$: if (slot && slot.textContent) {
		_toTranslate = slot.textContent;
	}

	$: if (_toTranslate) {
		translate();
	}

	// re-render if system locale changed
	let locale = '';
	const appStateUnsubscribe = AppStateStore.subscribe(value => {
		if (locale !== value.locale) {
			locale = value.locale;
			translate();
		}
	});

	onDestroy(() => {
		appStateUnsubscribe();
	});

	function translate() {
		if (!_toTranslate) {
			return;
		}
		translated = false;
		I18nService.translate(_toTranslate)
			.then(_translation => {
				translation = _translation;
				translated = true;
				return _translation;
			});
	}

</script>

<span class:translated>
	{#if translation}
		{translation}
	{/if}
	<i bind:this={slot} class="hide"><slot/></i>
</span>

<style>
	.hide {
		display: none;
	}

	span {
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.translated {
		opacity: 1;
	}
</style>
