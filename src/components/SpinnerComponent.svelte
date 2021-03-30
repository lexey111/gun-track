<script lang="ts">
	//
</script>

<span class="inline-spinner"></span>

<style lang="less">
	@spinner-size: 1em;

	.inline-spinner {
		display: inline-block;
		vertical-align: middle;
		padding: 0;
		margin-right: .4em;
		width: @spinner-size;
		height: @spinner-size;
		border: 2px solid currentColor;
		border-left-color: transparent;
		transform-origin: center center;
		border-radius: 100%;
		box-sizing: border-box;
		animation: linear 1s infinite running inline-spinner-animation;
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
