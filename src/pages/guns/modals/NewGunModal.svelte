<script lang="ts">
	import {autoFocus} from '../../../utils/autofocus';

	let name = '';
	export let onConfirm: (name: string) => void;
	export let onCancel: () => void;
</script>

<div class="modal-header">Register new gun</div>

<div class="modal-content">
	<div class="form-group">
		<label for="name">Name of new gun</label>
		<input
			placeholder="Black rifle .223"
			autocomplete="off"
			maxlength="48"
			required
			use:autoFocus
			bind:value={name}
			id="name"/>
	</div>
</div>

<div class="modal-footer">
	<button class="press press-blue press-ghost" on:click={onCancel}>Cancel</button>
	<button class="press press-blue"
	        disabled="{!name.trim()}"
	        on:click={() => onConfirm(name)}>Register
	</button>
</div>
