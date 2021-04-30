<script lang="ts">
	import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';
	import CKEditor from 'ckeditor5-svelte/src/Ckeditor.svelte';
	import dayjs from 'dayjs';
	import {onDestroy, onMount} from 'svelte';
	import Button from '../../../components/buttons/Button.svelte';
	import LocalisedDatepicker from '../../../components/datepicker/LocalisedDatepicker.svelte';
	import CurrencyMenu from '../../../components/dropdown/CurrencyMenu.svelte';
	import TypeMenu from '../../../components/dropdown/TypeMenu.svelte';
	import SpinnerComponent from '../../../components/spinners/SpinnerComponent.svelte';
	import Tab from '../../../components/tabs/Tab.svelte';
	import TabHeader from '../../../components/tabs/TabHeader.svelte';
	import TabPanel from '../../../components/tabs/TabPanel.svelte';
	import Tabs from '../../../components/tabs/Tabs.svelte';
	import type {Action} from '../../../models';

	let editor = DecoupledEditor;
	let editorConfig: any = {
		toolbar: {
			items: [
				'heading',
				'|',
				// 'fontFamily',
				'fontSize',
				'fontColor',
				'bold',
				'italic',
				'underline',
				'|',
				'bulletedList', 'numberedList'
			]
		}
	};

	let ckReady = false;
	let ckStarted = false;

	let ckDelay: any;
	const activateCK = (): void => {
		if (ckStarted || ckDelay) {
			return;
		}
		ckDelay = setTimeout(() => {
			ckStarted = true;
		}, 200);
	};

	const deactivateCK = (): void => {
		clearTimeout(ckDelay);
		ckDelay = null;
		ckStarted = false;
	}

	onDestroy(() => {
		clearTimeout(ckDelay);
	});

	function onReady({detail: editor}) {
		ckReady = true;
		// Insert the toolbar before the editable area.
		editor.ui
			.getEditableElement()
			.parentElement.insertBefore(
			editor.ui.view.toolbar.element,
			editor.ui.getEditableElement()
		);
	}

	export let onConfirm: (action: Action) => void;
	export let onCancel: () => void;
	export let action: Action;

	let dialogTitle = 'New record';
	let title = '';
	let date: Date = new Date();
	let type = '';
	let comment = '';
	let shots = 0;
	let currency = '';
	let expenses = 0.0;
	let trainingNotes = '';

	const handleDateChanged = (d: Date) => {
		date = d;
	}

	const handleTypeChange = (t: string) => {
		type = t;
	};

	const handleCurrencyChange = (t: string) => {
		currency = t;
	};

	const handleConfirm = () => {
		const dateToSave = dayjs(date || new Date()).toDate();
		onConfirm({
			...action,
			title: title.substring(0, 128),
			type,
			comment: comment.substring(0, 128),
			shots,
			currency,
			expenses,
			trainingNotes: trainingNotes.substring(0, 2048),
			date: dateToSave.toISOString()
		});
	}

	onMount(() => {
		if (!action) {
			return;
		}
		dialogTitle = 'Change record';
		title = action.title;
		date = new Date(action.date);
		type = action.type;
		comment = action.comment;
		shots = action.shots;
		currency = action.currency || 'OTH';
		expenses = action.expenses;
		trainingNotes = action.trainingNotes;
	});
</script>

<div class="modal-header">{dialogTitle}</div>

<div class="modal-content">
	<div class="modal-content-wrapper no-paddings">
		<Tabs>
			<TabHeader>
				<Tab>Main data</Tab>
				<Tab>Notes</Tab>
			</TabHeader>

			<TabPanel>
				<div class="form-group">
					<!--  svelte-ignore a11y-label-has-associated-control -->
					<label>Type</label>
					<TypeMenu {type} onChange={handleTypeChange}/>
				</div>

				<div class="form-group">
					<!--  svelte-ignore a11y-label-has-associated-control -->
					<label>Date</label>
					<LocalisedDatepicker date={date} onDateChange={handleDateChanged}/>
				</div>

				<div class="form-group">
					<label for="name">Title</label>
					<input
						placeholder="Carbine fundamentals"
						autocomplete="off"
						maxlength="128"
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


				<div class="form-group">
					<label for="expenses">Expense</label>
					<input
						class="short-field"
						type="number"
						autocomplete="off"
						bind:value={expenses}
						id="expenses"/>
				</div>

				<div class="form-group">
					<!--  svelte-ignore a11y-label-has-associated-control -->
					<label>Currency</label>
					<CurrencyMenu {currency} onChange={handleCurrencyChange}/>
				</div>
			</TabPanel>

			<TabPanel className="ck-editor-tab" onActivate={activateCK} onDeactivate={deactivateCK}>
				{#if (!ckStarted || !ckReady)}
					<SpinnerComponent>
						Please wait...
					</SpinnerComponent>
				{/if}
				{#if (ckStarted)}
					<CKEditor
						bind:editor
						on:ready={onReady}
						bind:config={editorConfig}
						bind:value={trainingNotes}/>
				{/if}
			</TabPanel>
		</Tabs>
	</div>
</div>

<div class="modal-footer">
	<Button type="link" onClick={onCancel}>Cancel</Button>
	<Button
		onClick={handleConfirm}>Save
	</Button>
</div>

