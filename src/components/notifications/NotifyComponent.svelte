<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {NotifyStore} from './notify-store';
	import type {TNotificationState} from './notify-store.interface';

	let notificationUnsubscribe: any;

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
	#notification-container {
		position: fixed;
		z-index: 1000;
		top: 8px;
		left: 50%;
		width: 0;
		display: flex;
		flex-flow: column wrap;
		align-items: center;
		justify-items: center;
		align-content: center;
		justify-content: center;

		.notification {
			position: relative;
			display: block;
			float: none;
			background: linear-gradient(var(--app-background), var(--app-background-darken));
			font-size: var(--app-small-font-size);
			box-shadow: 0 4px 12px rgba(0, 0, 0, .4);
			margin-bottom: 16px;
			padding: 24px 32px;
			cursor: default;
			max-width: 50vw;
			overflow: hidden;
			border-radius: 7px;

			border: 2px solid transparent;
			box-sizing: border-box;

			.notification-title {
				display: block;
				font-weight: bold;
				min-width: 200px;
				margin-bottom: 12px;
			}

			.notification-text {
				width: max-content;
				max-width: 600px;
				overflow: hidden;
				white-space: break-spaces;
				word-break: break-word;
			}

			.notification-close {
				position: absolute;
				top: 4px;
				right: 8px;
				font-size: 16px;
				cursor: pointer;
				transition: all .2s ease;

				&:hover {
					box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
					transform: translateY(-1px);
				}
			}

			transform-origin: top center;
			animation-name: notification-appear;
			animation-duration: .2s;
			animation-play-state: running;
			animation-fill-mode: forwards;
			animation-iteration-count: 1;

			&.disappearing {
				animation-name: notification-disappear;
				animation-duration: 1s;
				animation-play-state: running;
				animation-fill-mode: forwards;
				animation-iteration-count: 1;
			}

			&.paused {
				box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
				border-color: rgba(0, 0, 0, .2);
			}

			&.info {
				background: linear-gradient(var(--app-info-bg), var(--app-info-bg-darken));
				color: var(--app-info-text);
			}

			&.warn {
				background: linear-gradient(var(--app-warn-bg), var(--app-warn-bg-darken));
				color: var(--app-warn-text);
			}

			&.error {
				background: linear-gradient(var(--app-error-bg), var(--app-error-bg-darken));
				color: var(--app-error-text);
			}

			&.success {
				background: linear-gradient(var(--app-success-bg), var(--app-success-bg-darken));
				color: var(--app-success-text);
			}
		}
	}

	@keyframes notification-appear {
		0% {
			opacity: 0;
			transform: scaleY(.5);
		}
		100% {
			opacity: 1;
			transform: scaleY(1);
		}
	}

	@keyframes notification-disappear {
		0% {
			max-height: 500px;
			opacity: 1;
			transform: scaleY(1);
		}
		100% {
			max-height: 0;
			opacity: 0;
			margin-bottom: 0;
			transform: scaleY(.5);
		}
	}
</style>
