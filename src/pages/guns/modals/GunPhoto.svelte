<script lang="ts">
	import Storage from '@aws-amplify/storage'
	import Md5 from 'md5';
	import {onDestroy, onMount} from 'svelte';
	import Button from '../../../components/buttons/Button.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import {showError} from '../../../components/notifications/notify';
	import {GunsStore} from '../../../stores/guns/guns-store';

	export let onCancel: () => void;
	export let id: string;

	let imageReady = false;

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

		const fileName = name + '.' + ext;
		try {
			const {key} = await Storage.put(fileName, file, {
				level: 'private',
				contentType: file.type,
				progressCallback(progress) {
					console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
				},
			});

			console.log('S3 Object key', key)
			await GunsStore.savePhoto(id, key);

		} catch (error) {
			console.log(error);
			showError('Error uploading file');
		}
		onCancel();
	};

	onMount(() => {
		fileInput = document.getElementById('photoFileInput');
		fileInput.onchange = onFileSelected;
	});

	onDestroy(() => {
		fileInput.onchange = null;
	});

	const handleClick = (e) => {
		imageReady = false;
		fileInput.click(e);
	}
</script>

<div class="modal-header">Upload photo</div>

<div class="modal-content">
	<div class="modal-content-wrapper">
		<div class="photo-preview">
			{#if (gunImage)}
				<img class="gun-image" src={gunImage}/>
			{:else}
				<div class="image-placeholder"></div>
			{/if}
			<Button type="ghost" onClick={handleClick}>
				<Icon type="desktop"/> &nbsp;
				Choose image...
			</Button>
		</div>
	</div>
</div>

<div class="modal-footer">
	<Button onClick={onCancel} type="link">Cancel</Button>
	<Button onClick={handleUpload} disabled={!imageReady}>Upload
	</Button>
</div>

<style lang="less">
	.photo-preview {
		width: 500px;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		align-content: center;

		.image-placeholder, .gun-image {
			height: 200px;
			width: 200px;
			margin: 16px 0;
			background-color: var(--app-white-bg);
			border-radius: 7px;
			box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
		}
	}
</style>
