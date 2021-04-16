<script lang="ts">
	import * as dayjs from 'dayjs'
	import {onDestroy, onMount} from 'svelte';
	import {Gun} from '../../../models';
	import {AppStateStore, dateLocale} from '../../../stores/app/app-state-store';
	import {autoFocusWithSelect} from '../../../utils/autofocus';

	export let gun: Gun;
	let name = '';
	let registered = '';
	let make = '';
	let model = '';
	let notes = '';
	let isNew = false;

	export let onConfirm: (gun) => void;
	export let onCancel: () => void;

	let appState$;
	const state = {dateLocale: 'en'};

	const handleConfirm = () => {
		onConfirm({
			...gun,
			name,
			make,
			model,
			notes
		});
	};

	onMount(() => {
		appState$ = AppStateStore.subscribe(value => {
			if (value.dateLocale && value.dateLocale !== state.dateLocale) {
				state.dateLocale = value.dateLocale;
			}
		});
		if (!gun) {
			isNew = true;
			return;
		}
		isNew = false;
		name = gun.name || '';
		make = gun.make || '';
		model = gun.model || '';
		notes = gun.notes || '';
		registered = dayjs(gun.dateCreated).locale(dateLocale).format('LL');
	});

	onDestroy(() => {
		appState$ && appState$();
	});

	let disabled;
	$ : {
		disabled = !name.trim() && !make.trim() && !model.trim();
	}
</script>

<div class="modal-header">{isNew ? 'New gun' : 'Edit gun'}</div>

<div class="modal-content">
	<div class="form-group">
		<label for="name">Name of the gun</label>
		<input
			placeholder="Black rifle .223"
			autocomplete="off"
			maxlength="64"
			required
			use:autoFocusWithSelect
			bind:value={name}
			id="name"/>
	</div>

	<div class="form-group">
		<label for="make">Make</label>
		<input
			placeholder="Inter Ordnance"
			autocomplete="off"
			maxlength="64"
			required
			bind:value={make}
			id="make"/>
	</div>

	<div class="form-group">
		<label for="model">Model</label>
		<input
			placeholder="Savage MSR-15 Recon"
			autocomplete="off"
			maxlength="64"
			required
			bind:value={model}
			id="model"/>
	</div>

	{#if (!isNew)}
		<div class="form-group">
			<label>Registered</label>
			<span>{registered}</span>
		</div>
	{/if}
</div>

<div class="modal-footer">
	<button class="press press-ghost" on:click={onCancel}>Cancel</button>
	<button class="press press-blue"
	        disabled={disabled}
	        on:click={handleConfirm}>{isNew ? 'Register' : 'Update'}
	</button>
</div>
