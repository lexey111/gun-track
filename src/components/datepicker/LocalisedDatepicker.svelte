<script lang="ts">
	import dayjs from 'dayjs';
	import {onDestroy, onMount} from 'svelte';
	import Datepicker from 'svelte-calendar/src/Components/Datepicker.svelte';
	import {AppStateStore} from '../../stores/app/app-state-store';
	import {Calendar} from '../i18n/calendar';

	export let date = new Date();
	export let onDateChange: (date: Date) => void = null;

	const minDate = dayjs().subtract(10, 'year').toDate();
	const maxDate = dayjs().add(1, 'year').toDate();

	const app_state = {dateLocale: 'uk'};
	let appState$: any;
	let showPicker = false;

	const onDateSelected = (event: CustomEvent) => {
		onDateChange && onDateChange(event.detail.date);
	};

	onMount(() => {
		appState$ = AppStateStore.subscribe(value => {
			app_state.dateLocale = value.dateLocale; // en, uk, ru
			showPicker = false;
			setTimeout(() => {
				showPicker = true; // due to bug in datepicker re-rendering
			}, 0);
		});
	});

	onDestroy(() => {
		appState$ && appState$();
	});

</script>

{#if showPicker}
	<Datepicker
		bind:selected={date}
		on:dateSelected={onDateSelected}
		weekStart={app_state.dateLocale === 'en' ? 0 : 1}
		monthsOfYear={Calendar[app_state.dateLocale].monthsOfYear}
		daysOfWeek={Calendar[app_state.dateLocale].daysOfWeek}
		format={Calendar[app_state.dateLocale].dateFormat}
		start={minDate}
		end={maxDate}/>
{:else }
	<div class="placeholder"></div>
{/if}


<style lang="less">
	.placeholder {
		height: 38px;
		// background-color: rgba(0, 0, 0, .1);
		border-radius: 7px;
		width: 250px;
	}

	:global {
		.datepicker {
			margin: 0 !important;

			button.calendar-button:focus {
				box-shadow: 0 0 0 4px rgba(255, 191, 1, 0.8) !important;
				outline: none;
			}
		}
	}
</style>
