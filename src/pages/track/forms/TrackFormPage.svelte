<script type="ts">
	import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';
	import CKEditor from 'ckeditor5-svelte/src/Ckeditor.svelte';
	import dayjs from 'dayjs';
	import {onDestroy, onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import LocalisedDatepicker from '../../../components/datepicker/LocalisedDatepicker.svelte';
	import CurrencyMenu from '../../../components/dropdown/CurrencyMenu.svelte';
	import TypeMenu from '../../../components/dropdown/TypeMenu.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import {showSuccess} from '../../../components/notifications/notify';
	import SpinnerComponent from '../../../components/spinners/SpinnerComponent.svelte';
	import {ActionsStore} from '../../../stores/actions/actions-store';
	import type {TAction, TActionsState} from '../../../stores/actions/actions-store.interface';
	import {AppStateStore} from '../../../stores/app/app-state-store';
	import {GunsStore} from '../../../stores/guns/guns-store';
	import type {TGunsState} from '../../../stores/guns/guns-store.interface';

	export let gunId: string;
	export let id: string;
	let isNew = id === 'new';

	let dataReady = false;

	let action: TAction;
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


	const gotoTrack = () => {
		navigate('/track/' + gunId);
	}

	const saveGun = async () => {
		AppStateStore.showSpinner();
		const dateToSave = dayjs(date || new Date()).toDate();
		const actionToSave = {
			...action,
			title: title.substring(0, 128),
			type,
			comment: comment.substring(0, 128),
			shots,
			currency,
			expenses,
			trainingNotes: trainingNotes.substring(0, 2048),
			date: dateToSave.toISOString()
		};

		if (isNew) {
			if (await ActionsStore.registerAction(gunId, actionToSave)) {
				showSuccess('Record registered.');
				gotoTrack();
			}
		} else {
			if (await ActionsStore.saveAction(actionToSave)) {
				showSuccess('Record updated.');
				gotoTrack();
			}
		}
		AppStateStore.hideSpinner();

	}
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
	let ckStarted = false;

	let ckDelay: any;
	const activateCK = (): void => {
		if (ckStarted || ckDelay) {
			return;
		}
		ckDelay = setTimeout(() => {
			ckStarted = true;
		}, 20);
	};

	function onReady({detail: editor}) {
		editor.ui.getEditableElement()
			.parentElement.insertBefore(
			editor.ui.view.toolbar.element,
			editor.ui.getEditableElement()
		);

		AppStateStore.hideSpinner();
	}

	let gunsState: TGunsState;
	let gunsUnsubscribe: any;

	let actionsState: TActionsState;
	let actionsUnsubscribe: any;

	let loadingError: string;

	function setActionFields() {
		title = action?.title || '';
		date = new Date(action?.date || new Date());
		type = action?.type || '';
		comment = action?.comment || '';
		shots = action?.shots || 0;
		currency = action?.currency || 'OTH';
		expenses = action?.expenses || 0.0;
		trainingNotes = action?.trainingNotes || '';

		activateCK();
		dataReady = true;
	}

	onMount(() => {
		AppStateStore.showSpinner();

		gunsUnsubscribe = GunsStore.subscribe((value: TGunsState) => {
			if (!value?.fullReady) {
				return;
			}
			gunsState = value;

			if (!GunsStore.getGunById(gunId)) {
				loadingError = 'Gun not found!';
				AppStateStore.hideSpinner();
				return;
			}

			ActionsStore.initStore(gunId);
			actionsUnsubscribe = ActionsStore.subscribe((value: TActionsState) => {
				if (!value || value.isEmpty === null) {
					return;
				}
				actionsState = value;
				if (id === 'new') {
					if (!dataReady) {
						setActionFields();
					} else {
						AppStateStore.hideSpinner();
					}
					return;
				}
				action = ActionsStore.getActionById(id);

				if (!action) {
					loadingError = 'Record not found!';
					AppStateStore.hideSpinner();
					return;
				}

				if (!dataReady) {
					setActionFields();
				}
			});
		});
	});

	onDestroy(() => {
		gunsUnsubscribe && gunsUnsubscribe();
		actionsUnsubscribe && actionsUnsubscribe();
	});

</script>

{#if (loadingError)}
	<h1 class="error">Error</h1>
	<p>{loadingError}</p>
	<p>&nbsp;</p>
	<Button type="ghost" on:click={gotoTrack}>
		<Icon type="arrow-left"/> &nbsp;
		Return to Track page
	</Button>
{/if}

{#if (!loadingError && dataReady)}
	<div class="app-form">
		<div class="app-form-content multi-columns">
			<div class="app-content-column">
				<h1>{isNew ? 'New record' : 'Change record'}</h1>
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
			</div>
			<div class="app-content-column">
				<h3>Notes</h3>
				<div class="ck-editor-pane">
					{#if (ckStarted)}
						<CKEditor
							bind:editor
							on:ready={onReady}
							bind:config={editorConfig}
							bind:value={trainingNotes}/>
					{:else}
						<SpinnerComponent>Loading editor...</SpinnerComponent>
					{/if}
				</div>
			</div>

		</div>
		<div class="app-form-footer">
			<Button on:click={gotoTrack} type="link">
				<Icon type="arrow-left"/> &nbsp; Cancel
			</Button>

			<div class="right-buttons">
				<Button on:click={saveGun}>
					Save
				</Button>
			</div>
		</div>
	</div>
{/if}
