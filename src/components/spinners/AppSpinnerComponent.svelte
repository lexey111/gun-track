<script lang="ts">
	import {onDestroy} from 'svelte';
	import {AppStateStore} from '../../stores/app/app-state-store';

	let globalSpinnerVisible = false;
	const appStateUnsubscribe = AppStateStore.subscribe(value => {
		globalSpinnerVisible = value.isGlobalSpinnerVisible;
	});

	onDestroy(() => {
		appStateUnsubscribe();
	});

</script>

<div id="app-spinner" class={globalSpinnerVisible ? 'active' : ''}>
	<span></span>
</div>

<style lang="less">
	@spinner-size: 48px;

	#app-spinner {
		pointer-events: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		opacity: 0;
		// background: rgba(0, 0, 0, .4);
		transition: opacity .2s ease;

		&.active {
			pointer-events: all;
			display: block;
			z-index: 9999;
			opacity: 1;
		}

		span {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -(@spinner-size/2);
			margin-left: -(@spinner-size/2);
			display: block;
			width: @spinner-size;
			height: @spinner-size;
			border: 4px solid var(--app-accent-background);
			border-left-color: transparent;
			transform-origin: center center;
			border-radius: 100%;
			box-sizing: border-box;
			animation: linear 1s infinite running spinner-animation;
		}
	}

	@keyframes spinner-animation {
		0% {
			transform: rotateZ(0);
		}
		100% {
			transform: rotateZ(359deg);
		}
	}
</style>
