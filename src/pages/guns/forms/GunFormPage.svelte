<script type="ts">
	import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';
	import CKEditor from 'ckeditor5-svelte/src/Ckeditor.svelte';
	import dayjs from 'dayjs'
	import {onDestroy, onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import Collapser from '../../../components/collapser/Collapser.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import type {Gun} from '../../../models';
	import {AppStateStore, dateLocale} from '../../../stores/app/app-state-store';
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

	export let onConfirm: (gun: Gun) => void;

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

			<Collapser title="Notes" open={!!notes}>
				<div class="ck-editor-pane">
					{#if (ckStarted)}
						<CKEditor
							bind:editor
							on:ready={onReady}
							bind:config={editorConfig}
							bind:value={notes}/>
					{/if}
				</div>
			</Collapser>
		</div>
		<div class="app-content-column">
			<div class="gun-image">
				<GunPhoto id={gun?.id} imageClass="gun-image-preview">

					<p slot="info">
						This is a preview of the gun's photo. To change it please use
						"Photo upload"
						<Icon type="camera" size="1.2em"/>
						dialog.
					</p>

					<div slot="placeholder">
						<h4>
							No photo uploaded yet
						</h4>
						<p>
							Please use "Photo upload"
							<Icon type="camera" size="1.2em"/>
							dialog.
						</p>
					</div>
				</GunPhoto>
			</div>
		</div>
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
			width: 480px;
			min-height: 310px;
			margin: 0 auto;

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
				max-width: 480px;
				max-height: 310px;
				margin: 0 auto;
				border-radius: 7px;
				background-color: var(--app-white-bg);
				box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
			}
		}

		.ck-editor-pane {
			height: 300px;
			position: relative;

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
