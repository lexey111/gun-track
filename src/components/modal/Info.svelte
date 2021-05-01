<script lang="ts">
	import {getContext} from 'svelte';
	import type {TAppModal} from '../../stores/app/app-state-store.interface';
	import type {TConfirmProps} from './Confirm.interface';
	import InfoModal from './InfoModal.svelte';

	const modal = (getContext('AppState') as { modal: TAppModal }).modal;

	export const showInfoDialog = (props: TConfirmProps): void => {
		modal.open(InfoModal, {
			closeButton: true,
			extraClass: props.extraClass,
			componentProps: {
				title: props.title,
				html: props.text,
				onConfirm: () => {
					modal.close();
				},
				onCancel: () => modal.close(),
			}
		});
	};
</script>
<!-- info dialog -->
