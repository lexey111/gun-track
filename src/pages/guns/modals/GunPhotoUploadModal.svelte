<script lang="ts">
	import Storage from '@aws-amplify/storage'
	import Md5 from 'md5';
	import {onDestroy, onMount} from 'svelte';
	import Button from '../../../components/buttons/Button.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import {showError, showInfo} from '../../../components/notifications/notify';
	import {AppStateStore} from '../../../stores/app/app-state-store';
	import {GunsStore} from '../../../stores/guns/guns-store';
	import {dataURLToBlob} from '../../../utils/image';
	import GunPhoto from '../gun/GunPhoto.svelte';

	export let onCancel: () => void;
	export let onRemove: (id: string) => void;
	export let id: string;
	export let currentPhoto: string;

	let imageReady = false;
	let uploading = false;
	let progressText = '';
	let progressPercent = 0;
	let inResizing = false;

	let gunImage: any;
	let imageData: any;
	let fileInput: any;
	let file: any;

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
			showError('Image reading error');
			AppStateStore.hideSpinner();
			return;
		}
	}

	const handleUpload = async () => {
		uploading = true;
		const fileName = Md5(id) + '.jpeg';
		try {
			// upload new data
			const {key} = await Storage.put(fileName, imageData, {
				level: 'private',
				contentType: file.type,
				cacheControl: 'public,max-age=31536000,immutable',
				progressCallback(progress: any) {
					progressPercent = Math.ceil((progress.loaded / progress.total) * 100);
					progressText = `Uploaded: ${progress.loaded}/${progress.total}`;
				},
			}) as any;

			await GunsStore.savePhoto(id, key);

			showInfo('Photo uploaded');
			uploading = false;
			onCancel();
		} catch (error) {
			console.log(error);
			showError('Error uploading file');
			uploading = false;
			progressText = 'Error';
		}
	};

	onMount(() => {
		fileInput = document.getElementById('photoFileInput');
		fileInput.onchange = onFileSelected;
	});

	onDestroy(() => {
		fileInput.onchange = null;
	});

	const handleClick = (e: any) => {
		imageReady = false;
		fileInput.click(e);
	}
</script>

<div class="modal-header">Upload photo</div>

<div class="modal-content">
	<div class="modal-content-wrapper">
		<div class="photo-preview">
			{#if (inResizing)}
				<p>
					Resizing...
				</p>
			{/if}
			<div class="new-image-container" class:loaded={imageData}>
				<img bind:this={gunImage}/>
			</div>
			{#if (imageData)}
				{#if (imageReady && !inResizing)}
					<p>
						Now image is ready to be uploaded to the cloud. Use "Upload" button below to complete.
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
					<GunPhoto {id} class="image-container" imageClass="current-image-preview"/>
					<p>
						This is current photo. Only one photo could be uploaded for a gun, so
						if you upload another photo &mdash; this one will be replaced.
					</p>
				{:else}
					<div class="image-placeholder" on:click={handleClick}>
						<Icon type="camera" size="64px"/>
					</div>
				{/if}
			{/if}

			{#if (!imageData && !currentPhoto)}
				<p>
					Try to use square images - we will round them to circle, so better to put the valuable content to the center.
				</p>
			{/if}

			<Button type="ghost"
			        disabled={uploading}
			        onClick={handleClick}>
				<Icon type="camera"/> &nbsp;
				Choose image...
			</Button>
		</div>
	</div>
</div>

<div class="modal-footer">
	{#if (currentPhoto)}
		<Button onClick={() => {onCancel(); onRemove(id);}} type="ghost-danger">
			Remove
		</Button>
	{/if}

	<div class="right-buttons">
		<Button onClick={onCancel} type="link" disabled={uploading}>Cancel</Button>

		<Button onClick={handleUpload} disabled={!imageReady || uploading}>
			<Icon type="cloud"/> &nbsp;
			Upload
		</Button>
	</div>
</div>

<style lang="less">
	:global {
		.photo-preview {
			width: 400px;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			align-content: center;

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

		.right-buttons {
			margin-left: auto;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			align-content: center;
		}
	}

</style>
