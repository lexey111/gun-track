import {writable} from 'svelte/store';
import {INotifyStore, TNotification, TNotificationExtended, TNotificationState} from './notify-store.interface';

// eslint-disable-next-line @typescript-eslint/unbound-method
const {
	subscribe,
	set,
	update
} = writable<TNotificationState>({
	notifications: []
});

function doTick(): void {
	update(state => {
		const newNotifications = state.notifications
			.map(item => {
				if (item.permanent || item.paused) {
					return item; // never obsolete
				}
				return {
					...item,
					ttl: item.ttl - 1,
					almostGone: item.ttl <= 1
				};
			})
			.filter(item => item.ttl >= 0);

		return {
			notifications: newNotifications
		};
	});
}

setInterval(doTick, 1000);

let id = 1;

export const NotifyStore: INotifyStore = {
	subscribe,
	set,
	update,

	push: (notification: TNotification) => {
		update(state => {
			const newNotification: TNotificationExtended = {
				...notification,
				id: '_notification_' + (id++).toString(),
				paused: false,
				almostGone: false,
				type: typeof notification.type === 'undefined' ? 'default' : notification.type,
				ttl: typeof notification.ttl === 'undefined' ? 5 : notification.ttl,
				permanent: notification.ttl === 0
			};

			return {
				...state,
				notifications: [...state.notifications, newNotification]
			};
		});
	},

	setPause: (notificationId: string, pauseState: boolean) => {
		update(state => {
			const target = state.notifications.find(item => item.id === notificationId);
			if (target) {
				target.paused = pauseState;
			}
			return {
				notifications: state.notifications
			};
		});
	},

	close: (notificationId: string) => {
		update(state => {
			return {
				notifications: state.notifications.filter(item => item.id !== notificationId)
			};
		});
	}
};
