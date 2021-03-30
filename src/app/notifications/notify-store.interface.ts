import {Writable} from 'svelte/store';

export type TNotification = {
	title?: string
	text: string
	type?: 'info' | 'warn' | 'error' | 'success' | 'default'
	ttl?: number
};

export type TNotificationExtended = TNotification & {
	id?: string
	permanent?: boolean
	almostGone?: boolean
	paused?: boolean
};

export type TNotificationState = {
	notifications: Array<TNotificationExtended>
};

export interface INotifyStore extends Writable<TNotificationState> {
	push: (notification: TNotification) => void

	setPause: (id: string, pause: boolean) => void

	close: (id: string) => void
}
