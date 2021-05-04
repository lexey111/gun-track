<script type="ts">
	import Storage from '@aws-amplify/storage';
	import Md5 from 'md5';
	import {onDestroy, onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import {I18nService} from '../../../components/i18n/i18n.service';
	import I18n from '../../../components/i18n/I18n.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import Confirm from '../../../components/modal/Confirm.svelte';
	import {showError, showInfo} from '../../../components/notifications/notify';
	import type {Gun} from '../../../models';
	import {AppStateStore} from '../../../stores/app/app-state-store';
	import {GunsStore} from '../../../stores/guns/guns-store';
	import {dataURLToBlob} from '../../../utils/image';
	import GunPhoto from '../gun/GunPhoto.svelte';

	export let gun: Gun;

	let currentPhoto: string;
	$ : {
		currentPhoto = gun?.photo;
	}

	let imageReady = false;
	let uploading = false;
	let progressText = '';
	let progressPercent = 0;
	let inResizing = false;

	let gunImage: any;
	let imageData: any;
	let fileInput: any;
	let file: any;
	let confirmRemovePhotoDialog: any;

	const onFileSelected = (e: any) => {
		AppStateStore.showSpinner();
		inResizing = true;

		file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = (e: any) => {
			let image = new Image();

			image.onload = () => {
				// Resize the image
				let canvas = document.createElement('canvas'),
					max_size = 300,
					width = image.width,
					height = image.height;

				if (width > height) {
					if (width > max_size) {
						height *= max_size / width;
						width = max_size;
					}
				} else {
					if (height > max_size) {
						width *= max_size / height;
						height = max_size;
					}
				}
				canvas.width = Math.ceil(width);
				canvas.height = Math.ceil(height);

				canvas.getContext('2d').drawImage(image, 0, 0, Math.ceil(width), Math.ceil(height));
				const dataUrl = canvas.toDataURL('image/jpeg');
				imageData = dataURLToBlob(dataUrl);

				gunImage.src = dataUrl;

				image.onload = null;
				image = null;

				AppStateStore.hideSpinner();
				imageReady = true;
				inResizing = false;
			}
			image.src = e.target.result;
		};

		try {
			reader.readAsDataURL(file);
		} catch {
			showError(photoLoadingError);
			AppStateStore.hideSpinner();
			return;
		}
	}

	const handleUpload = async () => {
		uploading = true;
		const fileName = Md5(gun.id) + '.jpeg';
		try {
			// upload new data
			const {key} = await Storage.put(fileName, imageData, {
				level: 'private',
				contentType: file.type,
				cacheControl: 'public,max-age=31536000,immutable',
				progressCallback(progress: any) {
					progressPercent = Math.ceil((progress.loaded / progress.total) * 100);
					progressText = `${uploaded}: ${progress.loaded}/${progress.total}`;
				},
			}) as any;

			await GunsStore.savePhoto(gun.id, key);

			showInfo(photoUploaded);
			uploading = false;
			gotoGuns();
		} catch (error) {
			console.log(error);
			showError(errorUploadingFile);
			uploading = false;
			progressText = errorText;
		}
	};

	const handleClick = (e: any) => {
		imageReady = false;
		fileInput.click(e);
	}

	const gotoGuns = () => {
		navigate('/guns');
	}

	const doRemovePhoto = async (id: string) => {
		AppStateStore.showSpinner();
		try {
			await Storage.remove(gun.photo, {
				level: 'private',
			});

			await GunsStore.savePhoto(id, '');
			showInfo(photoRemoved);
			gotoGuns();
		} catch {
			showError(errorOnDeletingPhoto);
		} finally {
			AppStateStore.showSpinner();
		}
	};

	const handleRemovePhoto = (id: string) => {
		confirmRemovePhotoDialog.show({
			text: confirmRemovePhoto,
			confirmText: removeText,
			onConfirm: () => doRemovePhoto(id)
		});
	}

	let photoLoadingError: string;
	let uploaded: string;
	let photoUploaded: string;
	let errorUploadingFile: string;
	let errorText: string;
	let removeText: string;
	let photoRemoved: string;
	let errorOnDeletingPhoto: string;
	let confirmRemovePhoto: string;

	onMount(() => {
		void I18nService.translate('@Guns.photoLoadingError').then(s => photoLoadingError = s);
		void I18nService.translate('@Guns.uploaded').then(s => uploaded = s);
		void I18nService.translate('@Guns.errorUploadingFile').then(s => errorUploadingFile = s);
		void I18nService.translate('@Guns.photoRemoved').then(s => photoRemoved = s);
		void I18nService.translate('@Guns.errorOnDeletingPhoto').then(s => errorOnDeletingPhoto = s);
		void I18nService.translate('@Guns.confirmRemovePhoto').then(s => confirmRemovePhoto = s);
		void I18nService.translate('@Common.Error').then(s => errorText = s);
		void I18nService.translate('@Common.Remove').then(s => removeText = s);

		fileInput = document.getElementById('photoFileInput');
		fileInput.onchange = onFileSelected;
	});

	onDestroy(() => {
		fileInput.onchange = null;
	});
</script>

<input type="file" style="display: none" accept=".jpg, .jpeg, .png" id="photoFileInput">
<Confirm bind:this={confirmRemovePhotoDialog}/>

<div class="app-form">
	<div class="app-form-content">
		<h1 class="text-center">
			<I18n>@Guns.PhotoUploading</I18n>
		</h1>
		<div class="photo-preview">
			{#if (inResizing)}
				<p>
					<I18n>@Guns.Resizing</I18n>
				</p>
			{/if}
			<div class="new-image-container" class:loaded={imageData}>
				<img bind:this={gunImage}/>
			</div>
			{#if (imageData)}
				{#if (imageReady && !inResizing)}
					<p>
						<I18n>@Guns.ImageIsReady</I18n>
					</p>
				{/if}

				{#if (progressText)}
					<div class="ic-progress-bar">
						<div style="width: {progressPercent}%"></div>
					</div>
					<p>{progressText}</p>
				{/if}
			{:else}
				{#if (currentPhoto)}
					<GunPhoto id={gun.id} class="image-container" imageClass="current-image-preview"/>
					<p>
						<I18n>@Guns.CurrentPhoto</I18n>
					</p>
				{:else}
					<div class="image-placeholder" on:click={handleClick}>
						<Icon type="camera" size="64px"/>
					</div>
				{/if}
			{/if}

			{#if (!imageData && !currentPhoto)}
				<p>
					<I18n>@Guns.UseSquare</I18n>
				</p>
			{/if}

			<Button type="ghost"
			        disabled={uploading}
			        on:click={handleClick}>
				<Icon type="camera"/> &nbsp;
				<I18n>@Guns.ChooseImage</I18n>
			</Button>
		</div>
	</div>
	<hr>
	<div class="app-form-footer">
		<Button on:click={gotoGuns} type="link" disabled={uploading}>
			<Icon type="arrow-left"/> &nbsp;
			<I18n>@Common.Cancel</I18n>
		</Button>

		<div class="right-buttons">
			{#if (currentPhoto)}
				<Button on:click={() => handleRemovePhoto(gun.id)} type="ghost-danger">
					<I18n>@Common.Remove</I18n>
				</Button>
			{/if}

			<Button on:click={handleUpload} disabled={!imageReady || uploading}>
				<Icon type="cloud"/> &nbsp;
				<I18n>@Common.Upload</I18n>
			</Button>
		</div>
	</div>
</div>

<style lang="less">
	:global {
		.photo-preview {
			max-width: 700px;
			min-width: 500px;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			align-content: center;
			margin: 0 auto;

			.ic-progress-bar {
				width: 200px;
				height: 8px;
				margin: 8px 0;
				background-color: var(--app-white-bg);
				border: 2px solid var(--app-primary-bg);

				div {
					background-color: var(--app-primary-bg);
					height: 100%;
				}
			}

			p {
				color: var(--app-remark-text);
				text-align: center;
				margin-bottom: 2em;
				padding: 0 16px;
				font-size: var(--app-small-font-size);
			}

			p.error {
				color: var(--app-danger-bg);
			}

			.image-placeholder, .image-container, .new-image-container {
				height: 200px;
				width: 200px;
				margin: 16px 0;
				background-color: var(--app-white-bg);
				border-radius: 7px;
				box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
				overflow: hidden;
				position: relative;
				z-index: 1;
				transition: all .2s ease;

				img {
					width: 100%;
					min-height: 100%;
					object-fit: cover;
					z-index: -1;
				}
			}

			.image-container {
				&:hover {
					border-radius: 100%;
				}
			}

			.new-image-container {
				display: none;

				&.loaded {
					display: flex;
				}

				&:hover {
					border-radius: 100%;
				}
			}

			.image-placeholder {
				color: #eee;
				display: flex;
				flex-flow: column nowrap;
				align-content: center;
				align-items: center;
				justify-content: center;
				justify-items: center;
				cursor: pointer;
				transition: all .2s ease;

				&:hover {
					box-shadow: 0 1px 4px rgba(0, 0, 0, .4);
					color: #ccc;
				}
			}
		}
	}
</style>
