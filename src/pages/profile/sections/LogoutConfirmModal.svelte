<script lang="ts">
	export let onConfirm: () => void;
	export let onCancel: () => void;
</script>

<div class="modal-header">Confirmation</div>

<div class="modal-content" style="width:20em">
	Are you sure you want to log out?
</div>

<div class="modal-footer">
	<button class="press press-blue press-ghost" on:click={onCancel}>Cancel</button>
	<button class="press press-red" on:click={onConfirm}>Logout</button>
</div>
