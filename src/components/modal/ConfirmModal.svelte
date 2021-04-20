<script lang="ts">
	import Button from '../buttons/Button.svelte';
	import Icon from '../icons/Icon.svelte';

	export let title = 'Confirmation';
	export let text = 'Are you sure?';
	export let confirmText = 'Confirm';
	export let confirmIcon = '';

	export let onConfirm: () => void;
	export let onCancel: () => void;
</script>

<div class="modal-header">{title}</div>

<div class="modal-content">
	{#each text.split('\n') as line}
		<p>{line}</p>
	{/each}
</div>

<div class="modal-footer">
	<Button type="text"
	        onClick={onCancel}>Cancel
	</Button>
	<Button type="danger"
	        onClick={onConfirm}>
		{#if confirmIcon}
			<Icon type={confirmIcon} class="inline"/>
		{/if}{confirmText}
	</Button>
</div>
