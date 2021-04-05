<script lang="ts">
	export let title = 'Confirmation';
	export let text = 'Are you sure?';
	export let confirmText = 'Confirm';

	export let onConfirm: (name: string) => void;
	export let onCancel: () => void;
</script>

<div class="modal-header">{title}</div>

<div class="modal-content">
	{#each text.split('\n') as line}
		<p>{line}</p>
	{/each}
</div>

<div class="modal-footer">
	<button class="press press-blue press-ghost"
	        on:click={onCancel}>Cancel
	</button>
	<button class="press press-red"
	        on:click={onConfirm}>{confirmText}
	</button>
</div>
