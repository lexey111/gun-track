<script type="ts">
	import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';
	import CKEditor from 'ckeditor5-svelte/src/Ckeditor.svelte';
	import dayjs from 'dayjs'
	import {onDestroy, onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import {showSuccess} from '../../../components/notifications/notify';
	import type {Gun} from '../../../models';
	import {AppStateStore, dateLocale} from '../../../stores/app/app-state-store';
	import {GunsStore} from '../../../stores/guns/guns-store';
	import {autoFocusWithSelect} from '../../../utils/autofocus';
	import GunPhoto from '../gun/GunPhoto.svelte';

	export let gun: Gun;

	const gotoGuns = () => {
		navigate('/guns');
	}

	let name = '';
	let registered = '';
	let make = '';
	let model = '';
	let notes = '';
	let caliber = '';
	let isNew = false;
	let initialOpenEditor = false;

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
		editor.ui.getEditableElement()
			.parentElement.insertBefore(
			editor.ui.view.toolbar.element,
			editor.ui.getEditableElement()
		);
	}

	const handleConfirm = async () => {
		AppStateStore.showSpinner();
		if (isNew) {
			const result = await GunsStore.createGun({
				...gun,
				name: name || '',
				make: make || '',
				model: model || '',
				caliber: caliber || '',
				notes: notes || ''
			});

			if (result) {
				showSuccess('New gun was successfully registered.', name || make || model);
			}
			AppStateStore.hideSpinner();

			if (result) {
				gotoGuns();
			}
			return;
		}

		await GunsStore.saveGun({
			...gun,
			name,
			make,
			model,
			caliber,
			notes
		});
		AppStateStore.hideSpinner();

		gotoGuns();
	};

	onMount(() => {
		appState$ = AppStateStore.subscribe(value => {
			if (value.dateLocale && value.dateLocale !== state.dateLocale) {
				state.dateLocale = value.dateLocale;
			}
		});
		if (!gun) {
			isNew = true;
			initialOpenEditor = false;
			activateCK();
			return;
		}
		isNew = false;
		name = gun.name || '';
		make = gun.make || '';
		model = gun.model || '';
		notes = gun.notes || '';
		caliber = gun.caliber || '';
		registered = dayjs(gun.dateCreated).locale(dateLocale).format('LL');
		initialOpenEditor = !!notes;

		activateCK();
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

<div class="app-form">
	<div class="app-form-content multi-columns">
		<div class="app-content-column">
			<h1>{isNew ? 'New gun' : 'Change record'}</h1>

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
					<span class="control-static">{registered}</span>
				</div>
			{/if}
		</div>

		<div class="app-content-column">
			<h3>Notes</h3>
			<div class="ck-editor-pane">
				{#if (ckStarted)}
					<CKEditor
						bind:editor
						on:ready={onReady}
						bind:config={editorConfig}
						bind:value={notes}/>
				{/if}
			</div>
		</div>

		{#if (!isNew)}
			<div class="app-content-column narrow">
				<div class="gun-image">
					<GunPhoto id={gun?.id} imageClass="gun-image-preview">

						<p slot="info">
							To change the picture please use
							"Photo upload"
							<Icon type="camera" size="1.2em"/>
							dialog.
						</p>

						<div slot="placeholder">
							<p>
								Please use "Photo upload"
								<Icon type="camera" size="1.2em"/>
								dialog.
							</p>
						</div>
					</GunPhoto>
				</div>
			</div>
		{/if}

	</div>

	<div class="app-form-footer">
		<Button on:click={gotoGuns} type="link">
			<Icon type="arrow-left"/> &nbsp; Cancel
		</Button>

		<div class="right-buttons">
			<Button disabled={disabled}
			        on:click={handleConfirm}>{isNew ? 'Register' : 'Save'}
			</Button>
		</div>
	</div>
</div>

<style lang="less">

	:global {
		.gun-image {
			display: flex;
			align-items: center;
			align-content: center;
			flex-flow: column nowrap;
			width: 120px;
			min-height: 310px;
			margin: 0 auto;
			font-size: var(--app-small-font-size);

			p {
				color: var(--app-remark-text);
				text-align: center;

				svg {
					display: inline-block;
					vertical-align: middle;
				}
			}

			.gun-image-preview {
				display: flex;
				max-width: 120px;
				max-height: 310px;
				margin: 0 auto;
				border-radius: 7px;
				background-color: var(--app-white-bg);
				box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
			}
		}

		.ck-editor-pane {
			position: relative;
			min-height: 300px;

			.ck-editor__editable, .ck-editor__editable_inline {
				position: absolute;
				top: 40px;
				left: 0;
				bottom: 0;
				right: 0;
				background-color: var(--app-white-bg);
			}
		}
	}
</style>
