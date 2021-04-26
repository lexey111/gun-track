<script lang="ts">
	import Storage from '@aws-amplify/storage'
	import Md5 from 'md5';
	import {onDestroy, onMount} from 'svelte';
	import Button from '../../../components/buttons/Button.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import Image from '../../../components/images/Image.svelte';
	import {showError, showInfo} from '../../../components/notifications/notify';
	import SpinnerComponent from '../../../components/spinners/SpinnerComponent.svelte';
	import {GunsStore} from '../../../stores/guns/guns-store';
	import {getErrorText} from '../../../utils/errors';

	export let onCancel: () => void;
	export let onRemove: (id: string) => void;
	export let id: string;
	export let currentPhoto: string;

	let currentPhotoUrl: string;
	let currentPhotoFetching = true;
	let currentPhotoError: string;

	let imageReady = false;
	let uploading = false;
	let progressText = '';

	let gunImage, fileInput;
	let file;

	const onFileSelected = (e) => {
		console.log('selected', e.target.files[0]);
		file = e.target.files[0];
		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onload = e => {
			imageReady = true;
			gunImage = e.target.result;
		};
	}

	const handleUpload = async () => {
		console.log('file', file);
		const ext = (file.name || '').split('.').pop();
		const name = Md5(id);
		if (!ext) {
			showError('Bad file name!');
			return;
		}
		uploading = true;
		const fileName = name + '.' + ext;
		try {
			const {key} = await Storage.put(fileName, file, {
				level: 'private',
				contentType: file.type,
				progressCallback(progress) {
					progressText = `Uploaded: ${progress.loaded}/${progress.total}`;
				},
			});

			await GunsStore.savePhoto(id, key);

			showInfo('Photo uploaded');
			uploading = false;
			progressText = '';
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
		activatePhoto();
	});

	onDestroy(() => {
		fileInput.onchange = null;
	});

	const handleClick = (e) => {
		imageReady = false;
		fileInput.click(e);
	}


	const onPhotoLoadingError = () => {
		currentPhotoError = 'Image loading error';
		currentPhotoFetching = false;
	}

	const onPhotoLoading = () => {
		currentPhotoError = '';
		currentPhotoFetching = false;
	}

	const activatePhoto = () => {
		if (!currentPhoto) {
			currentPhotoFetching = false;
			currentPhotoError = '';
			return;
		}

		currentPhotoFetching = true;
		Storage.get(currentPhoto, {
				level: 'private'
			})
			.then((result: string) => {
				currentPhotoUrl = result;
			})
			.catch(e => {
				showError(getErrorText(e));
			});
	}
</script>

<div class="modal-header">Upload photo</div>

<div class="modal-content">
	<div class="modal-content-wrapper">
		<div class="photo-preview">
			{#if (gunImage)}
				<div class="image-container">
					<img src={gunImage}/>
				</div>
				{#if (imageReady)}
					<p>
						Now image is to be uploaded to the cloud. Use "Upload" button below to complete.
					</p>
				{/if}

				{#if (progressText)}
					<p>{progressText}</p>
				{/if}
			{:else}
				{#if (currentPhoto)}
					{#if (currentPhotoFetching)}
						<p>
							<SpinnerComponent/>
							Please wait...
						</p>
					{/if}

					{#if (currentPhotoError && !currentPhotoFetching)}
						<p class="error">{currentPhotoError}</p>
					{/if}

					{#if (currentPhotoUrl && !currentPhotoError)}
						<div class="image-container">
							<Image src={currentPhotoUrl}
							       onLoad={onPhotoLoading}
							       onError={onPhotoLoadingError}/>
						</div>
						<p>
							This is current photo. Only one photo could be uploaded for a gun, so
							if you upload another photo &mdash; this one will be replaced.
						</p>
					{/if}

				{:else}
					<div class="image-placeholder" on:click={handleClick}>
						<Icon type="camera" size="64px"/>
					</div>
				{/if}
			{/if}

			<Button type="ghost"
			        disabled={currentPhotoFetching || uploading}
			        onClick={handleClick}>
				<Icon type="camera"/> &nbsp;
				Choose image...
			</Button>
		</div>
	</div>
</div>

<div class="modal-footer">
	<Button onClick={onCancel} type="link" disabled={currentPhotoFetching || uploading}>Cancel</Button>

	{#if (currentPhoto)}
		<Button onClick={() => {onCancel(); onRemove(id);}} disabled={currentPhotoFetching} type="ghost-danger">
			Remove
		</Button>
	{/if}

	<Button onClick={handleUpload} disabled={!imageReady || uploading}>
		<Icon type="cloud"/> &nbsp;
		Upload
	</Button>
</div>

<style lang="less">
	:global {
		.photo-preview {
			width: 500px;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			align-content: center;

			p {
				color: var(--app-remark-text);
				text-align: center;
				margin-bottom: 2em;
				font-size: var(--app-small-font-size);
			}

			p.error {
				color: var(--app-danger-bg);
			}

			.image-placeholder, .image-container {
				height: 200px;
				width: 200px;
				margin: 16px 0;
				background-color: var(--app-white-bg);
				border-radius: 7px;
				box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
				overflow: hidden;
				position: relative;
				z-index: 1;

				img {
					width: 100%;
					position: absolute;
					left: 0;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
					transition: all .2s ease;
					z-index: -1;
				}
			}

			.image-container {
				transition: all .2s ease;

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
