<script lang="ts">
	import {TAction} from '../../../stores/actions/actions-store.interface';
	import {autoFocus} from '../../../utils/autofocus';

	export let onConfirm: (action: TAction) => void;
	export let onCancel: () => void;

	let title = '';
	let comment = '';
	let shots = 0;
	let currency = '';

	const handleConfirm = () => {
		onConfirm({
			id: '',
			title,
			comment,
			shots,
			date: new Date().toISOString(),
			currency,
			trainingNotes: '',
			color: ''
		});
	}
</script>

<div class="modal-header">New action</div>

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
			placeholder="Carbine fundamentals"
			autocomplete="off"
			maxlength="128"
			use:autoFocus
			bind:value={comment}
			id="comment"/>
	</div>
</div>

<div class="modal-footer">
	<button class="press press-blue press-ghost" on:click={onCancel}>Cancel</button>
	<button class="press press-blue"
	        on:click={handleConfirm}>Save
	</button>
</div>
