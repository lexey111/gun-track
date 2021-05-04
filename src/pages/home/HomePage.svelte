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
			<I18n>@Common.Welcome</I18n>
		</h1>
		<h2>
			to your Gun Track &mdash;
		</h2>

		<p>
			the history of your trainings, competitions and fun.
		</p>

		<p>
			Ah, yes, and expenses.
		</p>

		<p>
			Be careful and keep the records
			<br/>private.
		</p>

		<Image src="/images/bts-home.png" class="home-image"/>
	</div>

	<div class="welcome-right">
		<h2>What is it for</h2>
		<p>
			How many shots did you made with your shotgun last year? How much money spent? What was the outcome of trainings?
		</p>
		<p>
			Familiar questions, aren't they?
		</p>
		<p>
			Well, <b>Gun|Track</b> is here to help you to keep the records.
		</p>
		<p>
			It is a diary notebook for each gun:
			date, goals, shots made, expenses, results etc.
		</p>
		<p>
			You can make notes in two-directional timelines, apply filters and see the results in a real time.
		</p>
		<hr>
		<p>
			Up to 7 guns in this version!
		</p>
	</div>
</div>

{#if (authState && authState.fetching)}
	<div class="page-content extra-paddings">
		<p>
			<SpinnerComponent/>
			Loading...
		</p>
	</div>
{/if}

{#if (authState && !authState.fetching)}
	<div class="page-content extra-paddings">
		{#if (authState?.loggedIn)}
			<h1>
				Your guns
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
