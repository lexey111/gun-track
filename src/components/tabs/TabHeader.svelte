<div class="tabs-header">
	<slot></slot>
</div>

<style lang="less">
	:global {
		.tabs-header {
			display: flex;
			flex-flow: row nowrap;
			flex-grow: 0;
			flex-shrink: 0;
			align-items: flex-start;
			align-content: flex-start;
			justify-content: flex-start;
			justify-items: flex-start;
			align-self: flex-start;
			width: 100%;
			border-bottom: 3px solid var(--app-primary-bg);
			margin: 0;
			padding: 0;
		}
	}
</style>
