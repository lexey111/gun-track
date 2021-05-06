<script lang="ts">
	import Storage from '@aws-amplify/storage';
	import {onMount} from 'svelte';
	import Image from '../../../components/images/Image.svelte';
	import {showError} from '../../../components/notifications/notify';
	import SpinnerComponent from '../../../components/spinners/SpinnerComponent.svelte';
	import {GunsStore} from '../../../stores/guns/guns-store';
	import {getErrorText} from '../../../utils/errors';

	export let id: string;
	export let imageClass = '';
	export let onPhotoClick: () => void;

	const gun = GunsStore.getGunById(id);

	let currentPhotoUrl: string;
	let currentPhotoFetching = true;
	let currentPhotoError: string;

	const onPhotoLoadingError = () => {
		currentPhotoError = 'Image loading error';
		currentPhotoFetching = false;
	}

	const onPhotoLoad = () => {
		currentPhotoError = '';
		currentPhotoFetching = false;
	}

	const activatePhoto = () => {
		if (!gun?.photo) {
			currentPhotoFetching = false;
			currentPhotoError = '';
			return;
		}

		currentPhotoFetching = true;

		Storage.get(gun.photo, {
				level: 'private'
			})
			.then((result: string) => {
				currentPhotoUrl = result;
			})
			.catch(e => {
				showError(getErrorText(e));
			});
	}

	onMount(() => {
		setTimeout(() => {
			activatePhoto();
		}, 20);
	});
</script>

<div class={$$props.class} on:click={onPhotoClick} style="position: relative">
	{#if (currentPhotoFetching)}
		<div class="photo-info-div">
			<SpinnerComponent/>
		</div>
	{/if}

	{#if (currentPhotoError && !currentPhotoFetching)}
		<div class="photo-info-div error">
			{currentPhotoError}
		</div>
	{/if}

	{#if (currentPhotoUrl && !currentPhotoError)}
		<Image src={currentPhotoUrl}
		       class={imageClass}
		       onLoad={onPhotoLoad}
		       onError={onPhotoLoadingError}/>

		{#if (!currentPhotoFetching)}
			<slot name="info"/>
		{/if}
	{/if}

	{#if (!currentPhotoFetching && !currentPhotoError && !currentPhotoUrl)}
		<slot name="placeholder"/>
	{/if}
</div>

<style lang="less">
	:global {
		.photo-info-div {
			display: flex;
			width: 100%;
			height: 100%;
			flex-flow: row nowrap;
			align-items: center;
			align-content: center;
			justify-content: center;
			justify-items: center;
			align-self: center;
			justify-self: center;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;

			&.error {
				color: var(--app-danger-bg);
				text-align: center;
				font-size: var(--app-very-small-font-size);
			}

			span {
				margin: 0 !important;
			}
		}
	}
</style>
