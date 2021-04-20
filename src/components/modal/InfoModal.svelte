<script lang="ts">
	import Button from '../buttons/Button.svelte';

	export let title = 'Information';
	export let html = '';
	export let onCancel: () => void;
</script>

<div class="modal-header">{title}</div>

<div class="modal-content">
	<div class="modal-content-wrapper">
		{@html html}
	</div>
</div>

<div class="modal-footer">
	<Button onClick={onCancel}>Ok
	</Button>
</div>
