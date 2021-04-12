<script lang="ts">

	import * as dayjs from 'dayjs'
	import {autoFocusWithSelect} from '../../../utils/autofocus';

	export let name = '';
	export let registered = '';
	export let isNew = false;

	export let onConfirm: (name: string) => void;
	export let onCancel: () => void;

</script>

<div class="modal-header">{isNew ? 'New gun' : 'Edit gun'}</div>

<div class="modal-content">
	<div class="form-group">
		<label for="name">Name of the gun</label>
		<input
			placeholder="Black rifle .223"
			autocomplete="off"
			maxlength="48"
			required
			use:autoFocusWithSelect
			bind:value={name}
			id="name"/>
	</div>
	{#if (!isNew)}
		<div class="form-group">
			<label>Registered</label>
			<span>{dayjs(registered).format('LL LT')}</span>
		</div>
	{/if}
</div>

<div class="modal-footer">
	<button class="press press-blue press-ghost" on:click={onCancel}>Cancel</button>
	<button class="press press-blue"
	        disabled="{!name.trim()}"
	        on:click={() => onConfirm(name)}>{isNew ? 'Register' : 'Update'}
	</button>
</div>
