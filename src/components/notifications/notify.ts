import {NotifyStore} from './notify-store';

export function showInfo(message: string, title?: string, permanent?: boolean): void {
	NotifyStore.push({
		text: message,
		title,
		type: 'info',
		ttl: permanent ? 0 : void 0
	});
}

export function showSuccess(message: string, title?: string, permanent?: boolean): void {
	NotifyStore.push({
		text: message,
		title,
		type: 'success',
		ttl: permanent ? 0 : void 0
	});
}

export function showWarning(message: string, title?: string, permanent?: boolean): void {
	NotifyStore.push({
		text: message,
		title,
		type: 'warn',
		ttl: permanent ? 0 : void 0
	});
}

export function showError(message: string, title?: string, permanent?: boolean): void {
	NotifyStore.push({
		text: message,
		title,
		type: 'error',
		ttl: permanent ? 0 : void 0
	});
}
