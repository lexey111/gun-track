<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {NotifyStore} from './notify-store';
	import {TNotificationState} from './notify-store.interface';

	let notificationUnsubscribe;

	let notificationsState: TNotificationState = {
		notifications: []
	};

	onMount(() => {
		notificationUnsubscribe = NotifyStore.subscribe(value => {
			notificationsState.notifications = value.notifications;
		});
	});

	onDestroy(() => {
		notificationUnsubscribe && notificationUnsubscribe();
	})
</script>

<div id="notification-container">
	{#each notificationsState.notifications as notification (notification.id)}
		<div
			class={'notification ' + notification.type
			+ (notification.almostGone ? ' disappearing' : '')
			+ (notification.paused ? ' paused' : '')}
			data-id={notification.id}
			on:mouseenter={() => NotifyStore.setPause(notification.id, true)}
			on:mouseleave={() => NotifyStore.setPause(notification.id, false)}
		>
			<div class="notification-close" on:click={() => NotifyStore.close(notification.id)}>&times;</div>

			{#if (notification.title)}
				<div class="notification-title">{notification.title}</div>
			{/if}

			<p class="notification-text">{notification.text}</p>
		</div>
	{/each}
</div>

<style lang="less">
	:global {
		@import "notify.less";
	}
</style>
