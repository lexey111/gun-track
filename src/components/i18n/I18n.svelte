<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {AppStateStore} from '../../stores/app/app-state-store';
	import {I18nService} from './i18n.service';

	export let text = '';

	let translation = '';
	let _toTranslate = '';
	let slot: any;
	let translated = false;
	let _inTranslation = false;

	$: if (text) {
		_toTranslate = text;
	}

	$: if (slot && slot.textContent && !text) {
		_toTranslate = slot.textContent;
	}

	$: if (_toTranslate) {
		translate();
	}

	// re-render if system locale changed
	let locale = '';
	let appStateUnsubscribe: any;
	onMount(() => {
		appStateUnsubscribe = AppStateStore.subscribe(value => {
			if (locale !== value.locale) {
				locale = value.locale;
				translate();
			}
		});
	});

	onDestroy(() => {
		appStateUnsubscribe && appStateUnsubscribe();
	});

	function translate() {
		if (!_toTranslate || _inTranslation) {
			return;
		}
		_inTranslation = true;
		translated = false;
		I18nService.translate(_toTranslate)
			.then(_translation => {
				translation = _translation;
				return _translation;
			})
			.finally(() => {
				_inTranslation = false;
				translated = !!translation;
			})
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
        visibility: collapse;
        position: fixed;
        top: -1000px;
        left: -1000px;
    }

    span {
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    .translated {
        opacity: 1;
    }
</style>
