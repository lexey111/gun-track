<script lang="ts">
	import {navigate} from 'svelte-routing';

	const email = 'lexey111@gmail.com';

	const openTOS = () => {
		navigate('/tos');
	}
</script>

<div class="app-page-footer">
	<div class="app-page-footer-content">
		<p>
			&copy; 2021 Oleksii Koshkin aka Lexey111
			<span>App version: 1.0.0</span>
			<span>Released: May, 2021</span>
		</p>
		<i></i>

		<div>
			Contacts: <a href="mailto:{email}">{email}</a>
		</div>

		<div>
			<!--  svelte-ignore a11y-invalid-attribute-->
			<a href="#" on:click={openTOS}>Terms of Service</a>
		</div>
	</div>
</div>

<style lang="less">
	.app-page-footer {
		width: 100%;
		height: 80px;
		display: flex;
		flex-flow: row nowrap;
		padding: 16px 0;
		font-size: .8em;
		text-align: center;
		z-index: 1;
	}

	.app-page-footer-content {
		margin: 0 32px;
		display: flex;
		width: 100%;
		flex-flow: row nowrap;
		color: rgba(255, 255, 255, .7);

		p {
			display: flex;
			flex-flow: column nowrap;
			margin: 0;
			padding: 0;
			line-height: 1.4em;
			align-self: center;
			align-content: flex-start;
			justify-content: flex-start;
			text-align: left;

			span {
				display: flex;
				margin-top: 8px;
				opacity: .5;
			}
		}

		i {
			display: flex;
			flex-grow: 2;
		}

		div {
			margin-left: 32px;
			align-self: center;

			a {
				color: var(--app-white-bg);
				opacity: .8;

				&:hover, &:focus {
					opacity: 1;
				}
			}
		}
	}
</style>
