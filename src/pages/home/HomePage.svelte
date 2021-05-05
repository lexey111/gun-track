<script lang="ts">
	import I18n from '../../components/i18n/I18n.svelte';
	import Image from '../../components/images/Image.svelte';
	import SpinnerComponent from '../../components/spinners/SpinnerComponent.svelte';
	import PleaseLogin from './sections/PleaseLogin.svelte';
	import TrackSelector from './sections/TrackSelector.svelte';

	export let authState;
</script>

<div class="welcome-container">
	<div class="welcome">
		<h1>
			<I18n>@Home.Welcome</I18n>
		</h1>
		<h2>
			<I18n>@Home.Line1</I18n> &mdash;
		</h2>

		<p>
			<I18n>@Home.Line2</I18n>
		</p>

		<p>
			<I18n>@Home.Line3</I18n>
		</p>

		<p>
			<I18n>@Home.Line4</I18n>
			<br/>
			<I18n>@Home.Line4_1</I18n>
		</p>

		<Image src="/images/bts-home.png" class="home-image"/>
	</div>

	<div class="welcome-right">
		<h2>
			<I18n>@Home.WhatIsItFor</I18n>
		</h2>
		<p>
			<I18n>@Home.WhatLine1</I18n>
		</p>
		<p>
			<I18n>@Home.WhatLine2</I18n>
		</p>
		<p>
			<I18n>@Home.Well</I18n>
			, <b>Gun|Track</b>
			<I18n>@Home.WhatLine3</I18n>
		</p>
		<p>
			<I18n>@Home.WhatLine4</I18n>
		</p>
		<p>
			<I18n>@Home.WhatLine5</I18n>
		</p>
		<hr>
		<p>
			<I18n>@Home.WhatLine6</I18n>
		</p>
	</div>
</div>

{#if (authState && authState.fetching)}
	<div class="page-content extra-paddings">
		<p>
			<SpinnerComponent/>
			<I18n>@Common.Loading</I18n>
			...
		</p>
	</div>
{/if}

{#if (authState && !authState.fetching)}
	<div class="page-content extra-paddings">
		{#if (authState?.loggedIn)}
			<h1>
				<I18n>@Home.YourGuns</I18n>
			</h1>
			<TrackSelector/>
		{:else }
			<PleaseLogin/>
		{/if}
	</div>
{/if}

<style lang="less">
	:global {
		.welcome-container {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;

			h1, h2 {
				color: rgba(255, 255, 255, .9);
				margin-top: 0;
			}

			hr {
				border-color: rgba(255, 255, 255, .3);
			}

			p {
				color: rgba(255, 255, 255, .7);
				padding-right: 16px;
				margin-bottom: 1em;
				padding-left: 32px;
				display: block;
			}

			h1, h2 {
				padding-bottom: 0;
				margin-bottom: 0;
			}

			h2 {
				margin-top: 0;
			}
		}

		.welcome, .welcome-right {
			background-color: rgba(255, 255, 255, .1);
			padding: 32px;
			max-width: 50%;
			min-width: 375px;
			position: relative;

			h2 {
				color: rgba(255, 255, 255, .7);
			}
		}

		.welcome {
			border-radius: 17px 0 0 17px;
			min-width: 800px;
			min-height: 470px;

			h1 {
				font-size: 3em;
			}

			p {
				max-width: 300px;
			}
		}

		.welcome-right {
			min-width: 200px;
			border-radius: 0 17px 17px 0;
			background-color: rgba(255, 255, 255, .2);
			flex-grow: 1;
			margin-left: 2px;

			p {
				padding-left: 80px;
				max-width: 400px;
			}
		}

		.home-image {
			width: 900px;
			border: none;
			box-sizing: border-box;
			position: absolute;
			right: -100px;
			top: 150px;
			z-index: 1;
		}

		@media (max-width: 1550px) {
			.welcome-container {
				flex-flow: row wrap;

				.welcome, .welcome-right {
					flex-grow: 2;
					max-width: unset;
					border-radius: 17px;
					margin: 0 0 10px 0;

					p {
						max-width: unset;
					}

					.home-image {
						right: 32px;
					}
				}
			}
		}

		@media (max-width: 1200px) {
			.welcome {
				min-width: unset;
				padding-bottom: 0;

				p {
					max-width: unset;
				}

				.home-image {
					z-index: 0;
					padding: 32px 0 32px 80px;
					bottom: 0;
					top: unset;
					left: 0;
					right: 0;
					width: 100%;
					min-width: unset;
				}
			}
		}

		@media (max-width: 540px) {
			.welcome {
				.home-image {
					z-index: 0;
					padding: 0;
					bottom: 50px;
				}
			}
		}
	}

	.extra-paddings {
		padding: 16px 32px !important;
	}
</style>
