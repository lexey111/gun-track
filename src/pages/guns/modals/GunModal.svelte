<script lang="ts">
	import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';
	import CKEditor from 'ckeditor5-svelte/src/Ckeditor.svelte';
	import dayjs from 'dayjs'
	import {onDestroy, onMount} from 'svelte';
	import Button from '../../../components/buttons/Button.svelte';
	import SpinnerComponent from '../../../components/spinners/SpinnerComponent.svelte';
	import Tab from '../../../components/tabs/Tab.svelte';
	import TabHeader from '../../../components/tabs/TabHeader.svelte';
	import TabPanel from '../../../components/tabs/TabPanel.svelte';
	import Tabs from '../../../components/tabs/Tabs.svelte';
	import type {Gun} from '../../../models';
	import {AppStateStore, dateLocale} from '../../../stores/app/app-state-store';
	import {autoFocusWithSelect} from '../../../utils/autofocus';

	export let gun: Gun;
	let name = '';
	let registered = '';
	let make = '';
	let model = '';
	let notes = '';
	let caliber = '';
	let isNew = false;

	export let onConfirm: (gun: Gun) => void;
	export let onCancel: () => void;

	let appState$: any;
	const state = {dateLocale: 'en'};

	let editor = DecoupledEditor;
	// If needed, custom editor config can be passed through to the component
	// Uncomment the custom editor config if you need to customise the editor.
	// Note: If you don't pass toolbar object then Document editor will use default set of toolbar items.
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

	const handleConfirm = () => {
		onConfirm({
			...gun,
			name,
			make,
			model,
			caliber,
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
		caliber = gun.caliber || '';
		registered = dayjs(gun.dateCreated).locale(dateLocale).format('LL');
	});

	onDestroy(() => {
		clearTimeout(ckDelay);
		appState$ && appState$();
	});

	let disabled: boolean;
	$ : {
		disabled = !name.trim() && !make.trim() && !model.trim();
	}
</script>

<div class="modal-header">{isNew ? 'New gun record' : 'Edit gun record'}</div>

<div class="modal-content">
	<Tabs>
		<TabHeader>
			<Tab>Main data</Tab>
			<Tab>Notes</Tab>
		</TabHeader>

		<TabPanel>

			<div class="modal-content-wrapper">
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
					<label for="caliber">Caliber</label>
					<input
						placeholder="12GA .223 .308 .50"
						autocomplete="off"
						maxlength="32"
						required
						bind:value={caliber}
						id="caliber"/>
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
						<!--  svelte-ignore a11y-label-has-associated-control -->
						<label>Registered</label>
						<span>{registered}</span>
					</div>
				{/if}
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
					bind:value={notes}/>
			{/if}
		</TabPanel>
	</Tabs>
</div>

<div class="modal-footer">
	<Button onClick={onCancel} type="link">Cancel</Button>
	<Button disabled={disabled}
	        onClick={handleConfirm}>{isNew ? 'Register' : 'Save'}
	</Button>
</div>
