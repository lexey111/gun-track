<script lang="ts">
	import {navigate} from 'svelte-routing';
	import I18n from './i18n/I18n.svelte';
	import {AppVersion} from '../config';

	const openTOS = () => {
		navigate('/tos');
	}
	const gotoContacts = () => {
		navigate('/contacts');
	};
</script>

<div class="app-page-footer">
	<div class="app-page-footer-content">
		<p>
			&copy; Oleksii Koshkin | {AppVersion} - VIII/MMXXI
		</p>
		<i></i>
		<div>
			<!--  svelte-ignore a11y-invalid-attribute-->
			<a href="#" on:click={gotoContacts}>
				<I18n>@Footer.Contacts</I18n>
			</a>
		</div>

		<div>
			<!--  svelte-ignore a11y-invalid-attribute-->
			<a href="#" on:click={openTOS}>
				<I18n>@Footer.TermsOfService</I18n>
			</a>
		</div>
	</div>
</div>

<style lang="less">
	:global {
		.app-page-footer {
			width: 100%;
			// min-height: 32px;
			display: flex;
			flex-flow: row nowrap;
			align-items: flex-start;
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
			color: rgba(255, 255, 255, .5);

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
				text-align: left;
				white-space: nowrap;
				display: flex;

				span.translated {
					margin: 0;
					padding: 0;
					display: inline;
				}

				a {
					color: var(--app-primary-bg-lightest);
					opacity: .8;

					&:hover, &:focus {
						opacity: 1;
					}
				}
			}
		}
	}
</style>
