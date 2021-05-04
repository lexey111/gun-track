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
	import {I18nService} from '../../../components/i18n/i18n.service';
	import I18n from '../../../components/i18n/I18n.svelte';
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
				showSuccess(recordRegistered);
				gotoTrack();
			}
		} else {
			if (await ActionsStore.saveAction(actionToSave)) {
				showSuccess(recordUpdated);
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

	let gunNotFound: string;
	let recordNotFound: string;
	let recordRegistered: string;
	let recordUpdated: string;

	onMount(() => {
		AppStateStore.showSpinner();

		void I18nService.translate('@Common.gunNotFound').then(s => gunNotFound = s);
		void I18nService.translate('@Common.recordNotFound').then(s => recordNotFound = s);
		void I18nService.translate('@Common.recordRegistered').then(s => recordRegistered = s);
		void I18nService.translate('@Common.recordUpdated').then(s => recordUpdated = s);

		gunsUnsubscribe = GunsStore.subscribe((value: TGunsState) => {
			if (!value?.fullReady) {
				return;
			}
			gunsState = value;

			if (!GunsStore.getGunById(gunId)) {
				loadingError = gunNotFound || 'Gun not found!';
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
					loadingError = recordNotFound || 'Record not found!';
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
		<I18n>@Track.ReturnToTrackPage</I18n>
	</Button>
{/if}

{#if (!loadingError && dataReady)}
	<div class="app-form">
		<div class="app-form-content multi-columns">
			<div class="app-content-column">
				<h1>
					{#if (isNew)}
						<I18n>@Common.NewRecord</I18n>
					{:else}
						<I18n>@Common.ChangeRecord</I18n>
					{/if}
				</h1>
				<div class="form-group">
					<!--  svelte-ignore a11y-label-has-associated-control -->
					<label>
						<I18n>@Track.Type</I18n>
					</label>
					<TypeMenu {type} onChange={handleTypeChange}/>
				</div>

				<div class="form-group">
					<!--  svelte-ignore a11y-label-has-associated-control -->
					<label>
						<I18n>@Track.Date</I18n>
					</label>
					<LocalisedDatepicker date={date} onDateChange={handleDateChanged}/>
				</div>

				<div class="form-group">
					<label for="name">
						<I18n>@Track.Title</I18n>
					</label>
					<input
						placeholder="Carbine fundamentals"
						autocomplete="off"
						maxlength="128"
						bind:value={title}
						id="name"/>
				</div>

				<div class="form-group">
					<label for="comment">
						<I18n>@Track.Comment</I18n>
					</label>
					<input
						autocomplete="off"
						maxlength="128"
						bind:value={comment}
						id="comment"/>
				</div>

				<div class="form-group">
					<label for="shots">
						<I18n>@Track.ShotsMade</I18n>
					</label>
					<input
						class="short-field"
						type="number"
						autocomplete="off"
						bind:value={shots}
						id="shots"/>
				</div>

				<div class="form-group">
					<label for="expenses">
						<I18n>@Track.Expense</I18n>
					</label>
					<input
						class="short-field"
						type="number"
						autocomplete="off"
						bind:value={expenses}
						id="expenses"/>
				</div>

				<div class="form-group">
					<!--  svelte-ignore a11y-label-has-associated-control -->
					<label>
						<I18n>@Track.Currency</I18n>
					</label>
					<CurrencyMenu {currency} onChange={handleCurrencyChange}/>
				</div>
			</div>
			<div class="app-content-column">
				<h3>
					<I18n>@Common.Notes</I18n>
				</h3>
				<div class="ck-editor-pane">
					{#if (ckStarted)}
						<CKEditor
							bind:editor
							on:ready={onReady}
							bind:config={editorConfig}
							bind:value={trainingNotes}/>
					{:else}
						<SpinnerComponent>
							<I18n>@Common.LoadingEditor</I18n>
							...
						</SpinnerComponent>
					{/if}
				</div>
			</div>

		</div>
		<div class="app-form-footer">
			<Button on:click={gotoTrack} type="link">
				<Icon type="arrow-left"/> &nbsp;
				<I18n>@Common.Cancel</I18n>
			</Button>

			<div class="right-buttons">
				<Button on:click={saveGun}>
					{#if (isNew)}
						<I18n>@Common.Save</I18n>
					{:else }
						<I18n>@Common.Update</I18n>
					{/if}
				</Button>
			</div>
		</div>
	</div>
{/if}
