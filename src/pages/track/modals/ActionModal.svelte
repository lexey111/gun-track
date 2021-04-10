<script lang="ts">
	import {onMount} from 'svelte';
	import {Action} from '../../../models';
	import {autoFocus} from '../../../utils/autofocus';

	export let onConfirm: (action: Action) => void;
	export let onCancel: () => void;
	export let action: Action;

	let dialogTitle = 'New record';
	let id = '';
	let title = '';
	let date = '';
	let type = '';
	let comment = '';
	let shots = 0;
	let currency = '';
	let expenses = 0.0;
	let trainingNotes = '';
	let color = '';

	const handleConfirm = () => {
		onConfirm({
			...action,
			title,
			type,
			comment,
			shots,
			currency,
			trainingNotes,
			color,
			date: date || new Date().toISOString()
		});
	}

	onMount(() => {
		if (!action) {
			return;
		}
		dialogTitle = 'Change record';
		id = action.id;
		title = action.title;
		date = action.date;
		type = action.type;
		comment = action.comment;
		shots = action.shots;
		currency = action.currency;
		expenses = action.expenses;
		trainingNotes = action.trainingNotes;
		color = action.color;
	});
</script>

<div class="modal-header">{dialogTitle}</div>

<div class="modal-content">
	<div class="form-group">
		<label for="name">Title</label>
		<input
			placeholder="Carbine fundamentals"
			autocomplete="off"
			maxlength="128"
			use:autoFocus
			bind:value={title}
			id="name"/>
	</div>

	<div class="form-group">
		<label for="comment">Comment</label>
		<input
			autocomplete="off"
			maxlength="128"
			bind:value={comment}
			id="comment"/>
	</div>

	<div class="form-group">
		<label for="shots">Shots made</label>
		<input
			class="short-field"
			type="number"
			autocomplete="off"
			bind:value={shots}
			id="shots"/>
	</div>

</div>

<div class="modal-footer">
	<button class="press press-blue press-ghost" on:click={onCancel}>Cancel</button>
	<button class="press press-blue"
	        on:click={handleConfirm}>Save
	</button>
</div>
