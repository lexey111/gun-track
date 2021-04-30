<script lang="ts">
	//
</script>

<span class="inline-spinner">
	<span class="inline-spinner-rotator"></span><slot></slot>
</span>

<style lang="less">
	@spinner-size: 1em;

	.inline-spinner {
		line-height: @spinner-size;
		height: @spinner-size;
		vertical-align: middle;
		display: inline-block;
		padding: 0;
		margin: 0;

		.inline-spinner-rotator {
			line-height: 1;
			display: inline-block;
			vertical-align: middle;
			padding: 0;
			margin-right: .4em;
			margin-top: -2px;
			width: @spinner-size;
			height: @spinner-size;
			border: 2px solid currentColor;
			box-sizing: border-box;
			border-left-color: transparent;
			transform-origin: center center;
			border-radius: 100%;
			animation: linear 1s infinite running inline-spinner-animation;
		}
	}

	@keyframes inline-spinner-animation {
		0% {
			transform: rotateZ(0);
		}
		100% {
			transform: rotateZ(359deg);
		}
	}
</style>
