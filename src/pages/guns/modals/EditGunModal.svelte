<script lang="ts">
	import * as dayjs from 'dayjs'

	export let name = '';
	export let registered = '';
	export let onConfirm: (name: string) => void;
	export let onCancel: () => void;
</script>

<div class="modal-header">Edit gun</div>

<div class="modal-content">
	<div class="form-group">
		<label for="name">Name of the gun</label>
		<input
			placeholder="Black rifle .223"
			autocomplete="off"
			required
			bind:value={name}
			id="name"/>
	</div>
	<div class="form-group">
		<label>Registered</label>
		<span>{dayjs(registered).format('LL LT')}</span>
	</div>
</div>

<div class="modal-footer">
	<button class="press press-blue press-ghost" on:click={onCancel}>Cancel</button>
	<button class="press press-blue"
	        disabled="{!name.trim()}"
	        on:click={() => onConfirm(name)}>Save
	</button>
</div>
