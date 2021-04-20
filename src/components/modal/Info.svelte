<script lang="ts">
	import {getContext} from 'svelte';
	import type {TAppModal} from '../../stores/app/app-state-store.interface';
	import type {TConfirmProps} from './Confirm.interface';
	import InfoModal from './InfoModal.svelte';

	const modal = (getContext('AppState') as { modal: TAppModal }).modal;

	export const showInfoDialog = (props: TConfirmProps): void => {
		modal.open(InfoModal, {
			closeButton: true,
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
