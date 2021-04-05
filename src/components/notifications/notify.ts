import {NotifyStore} from './notify-store';

export function showInfo(message: string, title?: string): void {
	NotifyStore.push({
		text: message,
		title,
		type: 'info'
	});
}

export function showSuccess(message: string, title?: string): void {
	NotifyStore.push({
		text: message,
		title,
		type: 'success'
	});
}

export function showWarning(message: string, title?: string): void {
	NotifyStore.push({
		text: message,
		title,
		type: 'warn'
	});
}

export function showError(message: string, title?: string): void {
	NotifyStore.push({
		text: message,
		title,
		type: 'error'
	});
}
