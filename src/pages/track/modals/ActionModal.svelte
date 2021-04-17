<script lang="ts">
	import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';

	import CKEditor from 'ckeditor5-svelte';
	import * as dayjs from 'dayjs';
	import {onDestroy, onMount} from 'svelte';
	import Button from '../../../components/buttons/Button.svelte';
	import LocalisedDatepicker from '../../../components/datepicker/LocalisedDatepicker.svelte';
	import I18n from '../../../components/i18n/I18n.svelte';
	import SpinnerComponent from '../../../components/spinners/SpinnerComponent.svelte';
	import Tab from '../../../components/tabs/Tab.svelte';
	import TabHeader from '../../../components/tabs/TabHeader.svelte';
	import TabPanel from '../../../components/tabs/TabPanel.svelte';
	import Tabs from '../../../components/tabs/Tabs.svelte';
	import {Action} from '../../../models';
	import {ActionCurrencies, ActionTypes} from '../../../stores/actions/actions-store.types';

	import {autoFocus} from '../../../utils/autofocus';

	let editor = DecoupledEditor;
	let editorInstance = null;
	// If needed, custom editor config can be passed through to the component
	// Uncomment the custom editor config if you need to customise the editor.
	// Note: If you don't pass toolbar object then Document editor will use default set of toolbar items.
	let editorConfig = {
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

	let ckDelay;
	const activateCK = () => {
		if (ckStarted || ckDelay) {
			return;
		}
		ckDelay = setTimeout(() => {
			ckStarted = true;
		}, 200);
	};

	const deactivateCK = () => {
		clearTimeout(ckDelay);
		ckDelay = null;
		ckStarted = false;
	}

	onDestroy(() => {
		clearTimeout(ckDelay);
	})

	function onReady({detail: editor}) {
		ckReady = true;
		// Insert the toolbar before the editable area.
		editorInstance = editor;
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
	let id = '';
	let title = '';
	let date: Date = new Date();
	let type = '';
	let comment = '';
	let shots = 0;
	let currency = '';
	let expenses = 0.0;
	let trainingNotes = '';

	const onDateChanged = (d: Date) => {
		date = d;
	}

	const handleConfirm = () => {
		const dateToSave = dayjs(date || new Date()).toDate();
		onConfirm({
			...action,
			title,
			type,
			comment,
			shots,
			currency,
			expenses,
			trainingNotes,
			date: dateToSave.toISOString()
		});
	}

	onMount(() => {
		if (!action) {
			return;
		}
		dialogTitle = 'Change record';
		id = action.id;
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

	<Tabs>
		<TabHeader>
			<Tab>Main data</Tab>
			<Tab>Notes</Tab>
		</TabHeader>

		<TabPanel>
			<div class="form-group">
				<label for="type">Type</label>
				<select bind:value={type} id="type" class="short-field" use:autoFocus>
					{#each ActionTypes as actionType}
						<option value={actionType.id}>
							<I18n text={'@Actions.' + actionType.id}/>
						</option>
					{/each}
				</select>
			</div>

			<div class="form-group">
				<label>Date</label>
				<LocalisedDatepicker date={date} onDateChange={onDateChanged}/>
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
				<label for="currency">Currency</label>
				<select bind:value={currency} id="currency" class="short-field">
					{#each ActionCurrencies as currency}
						<option value={currency.id}>
							{currency.sign}
							<I18n text={'@Currencies.' + currency.id}/>
						</option>
					{/each}
				</select>
			</div>
		</TabPanel>

		<TabPanel className="ck-editor-tab" onActivate={activateCK} onDeactivate={deactivateCK}>
			{#if (!ckStarted || !ckReady)}
				<p>
					<SpinnerComponent/>
					Please wait...
				</p>
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

<div class="modal-footer">
	<Button type="text" onClick={onCancel}>Cancel</Button>
	<Button
		onClick={handleConfirm}>Save
	</Button>
</div>
