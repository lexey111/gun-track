<script lang="ts">
	import {getContext} from 'svelte';
	import type {TAppModal} from '../../stores/app/app-state-store.interface';
	import type {TConfirmProps} from './Confirm.interface';
	import ConfirmModal from './ConfirmModal.svelte';

	const modal = (getContext('AppState') as { modal: TAppModal }).modal;

	export const showConfirmDialog = (props: TConfirmProps): void => {
		modal.open(ConfirmModal, {
			closeButton: true,
			componentProps: {
				title: props.title,
				text: props.text,
				confirmText: props.confirmText,
				confirmIcon: props.confirmIcon,
				onConfirm: () => {
					modal.close();
					props.onConfirm();
				},
				onCancel: () => modal.close(),
			}
		});
	};
</script>
<!-- confirm dialog -->
