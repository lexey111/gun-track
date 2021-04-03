<div class="app-page-footer">
	<div class="app-page-footer-content">
		<p>
			&copy; 2021 Oleksii Koshkin aka Lexey111
		</p>
		<i></i>
		<div>
			Powered by
		</div>
		<ul>
			<li>
				Svelte
			</li>
			<li>
				AWS Amplify
			</li>
			<li>
				DynamoDB
			</li>
		</ul>
	</div>
</div>

<style lang="less">
	.app-page-footer {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		padding: 16px 0;
		font-size: .8em;
		text-align: center;
		color: var(--app-remark-text);
		background-color: rgba(0, 0, 0, .5);
		backdrop-filter: blur(10px);
	}

	.app-page-footer-content {
		margin: 0 32px;
		display: flex;
		width: 100%;
		flex-flow: row nowrap;

		p {
			display: flex;
			margin: 0;
			line-height: 1em;
			align-items: center;
		}

		i {
			display: flex;
			flex-grow: 2;
		}

		ul {
			display: flex;
			flex-flow: column nowrap;
			margin: 0 0 0 .5em;
			padding: 0;

			li {
				color: rgba(255, 255, 255, .7);
				list-style: none;
				display: flex;
				flex-flow: row nowrap;
				margin: 0;
				padding: 0;
				line-height: 1.4em;
			}
		}
	}
</style>
