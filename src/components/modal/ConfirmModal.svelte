<script lang="ts">
	import Button from '../buttons/Button.svelte';
	import I18n from '../i18n/I18n.svelte';
	import Icon from '../icons/Icon.svelte';

	export let text = 'Are you sure?';
	export let confirmText = 'Confirm';
	export let confirmIcon = '';

	export let onConfirm: () => void;
	export let onCancel: () => void;
</script>

<div class="modal-header"><I18n>@Common.Confirm</I18n></div>

<div class="modal-content">
	<div class="modal-content-wrapper with-paddings">
		{#each text.split('\n') as line}
			<p>{line}</p>
		{/each}
	</div>
</div>

<div class="modal-footer">
	<Button type="link"
	        on:click={onCancel}>
		<I18n>@Common.Cancel</I18n>
	</Button>
	<Button type="danger"
	        on:click={onConfirm}>
		{#if confirmIcon}
			<Icon type={confirmIcon} class="inline"/>
		{/if}{confirmText}
	</Button>
</div>
