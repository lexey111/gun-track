<script type="ts">
	import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';
	import CKEditor from 'ckeditor5-svelte/src/Ckeditor.svelte';
	import dayjs from 'dayjs'
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import {onDestroy, onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import {I18nService} from '../../../components/i18n/i18n.service';
	import I18n from '../../../components/i18n/I18n.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import {showSuccess} from '../../../components/notifications/notify';
	import SpinnerComponent from '../../../components/spinners/SpinnerComponent.svelte';
	import type {Gun} from '../../../models';
	import {AppStateStore, dateLocale} from '../../../stores/app/app-state-store';
	import {GunsStore} from '../../../stores/guns/guns-store';
	import {autoFocusWithSelect} from '../../../utils/autofocus';
	import GunPhoto from '../gun/GunPhoto.svelte';

	export let gun: Gun;
	dayjs.extend(localizedFormat);

	const gotoGuns = () => {
		navigate('/guns');
	}

	let name = '';
	let make = '';
	let model = '';
	let notes = '';
	let caliber = '';
	let isNew = false;
	let initialOpenEditor = false;

	let appState$: any;
	const state = {dateLocale: 'en'};

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
				showSuccess(gunRegistered, name || make || model);
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

	let gunRegistered: string;
	onMount(() => {
		void I18nService.translate('@Guns.gunRegistered').then(s => gunRegistered = s);

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

	AppStateStore.showSpinner();
</script>

<div class="app-form">
	<div class="app-form-content multi-columns">
		<div class="app-content-column">
			<h1>
				{#if (isNew)}
					<I18n>@Guns.NewGun</I18n>
				{:else}
					<I18n>@Common.ChangeRecord</I18n>
				{/if}
			</h1>

			<div class="form-group">
				<label for="name">
					<I18n>@Guns.NameGun</I18n>
				</label>
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
				<label for="caliber">
					<I18n>@Guns.Caliber</I18n>
				</label>
				<input
					placeholder="12GA .223 .308 .50"
					autocomplete="off"
					maxlength="32"
					required
					bind:value={caliber}
					id="caliber"/>
			</div>

			<div class="form-group">
				<label for="make">
					<I18n>@Guns.Make</I18n>
				</label>
				<input
					placeholder="Inter Ordnance"
					autocomplete="off"
					maxlength="64"
					required
					bind:value={make}
					id="make"/>
			</div>

			<div class="form-group">
				<label for="model">
					<I18n>@Guns.Model</I18n>
				</label>
				<input
					placeholder="Savage MSR-15 Recon"
					autocomplete="off"
					maxlength="64"
					required
					bind:value={model}
					id="model"/>
			</div>

			{#if (!isNew && gun)}
				<div class="form-group">
					<!--  svelte-ignore a11y-label-has-associated-control -->
					<label>
						<I18n>@Guns.Registered</I18n>
					</label>
					<span class="control-static">{dayjs(gun.dateCreated).locale(dateLocale).format('LL')}</span>
				</div>
			{/if}
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
						bind:value={notes}/>
				{:else}
					<SpinnerComponent>
						<I18n>@Common.LoadingEditor</I18n>
					</SpinnerComponent>
				{/if}

			</div>
		</div>

		{#if (!isNew)}
			<div class="app-content-column narrow">
				<div class="gun-image">
					<GunPhoto id={gun?.id} imageClass="gun-image-preview">

						<p slot="info" class="placeholder">
							<I18n>@Guns.ToChangePart1</I18n> &nbsp;
							<Icon type="camera" size="1.2em"/> &nbsp;
							<I18n>@Guns.ToChangePart2</I18n>
						</p>

						<div slot="placeholder" class="placeholder">
							<p>
								<I18n>@Guns.PleaseUseUpload</I18n> &nbsp;
								<Icon type="camera" size="1.2em"/> &nbsp;
								<I18n>@Guns.ToChangePart2</I18n>
							</p>
						</div>
					</GunPhoto>
				</div>
			</div>
		{/if}

	</div>

	<div class="app-form-footer">
		<Button on:click={gotoGuns} type="link">
			<Icon type="arrow-left"/> &nbsp;
			<I18n>@Common.Cancel</I18n>
		</Button>

		<div class="right-buttons">
			<Button disabled={disabled}
			        on:click={handleConfirm}>
				{#if (isNew)}
					<I18n>@Common.Register</I18n>
				{:else }
					<I18n>@Common.Save</I18n>
				{/if}
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
	}
</style>
