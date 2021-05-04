<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import {AppStateStore} from '../../stores/app/app-state-store';
	import {AuthStore} from '../../stores/auth/auth-store';
	import type {TAuthState} from '../../stores/auth/auth-store.interface';
	import Image from '../images/Image.svelte';

	let active = false;

	let authUnsubscribe: any;
	let authProps = {
		authState: {} as TAuthState,
	};

	let appStateUnsubscribe: any;

	onDestroy(() => {
		authUnsubscribe && authUnsubscribe();
		appStateUnsubscribe && appStateUnsubscribe();
	});

	onMount(() => {
		authUnsubscribe = AuthStore.subscribe(value => {
			authProps.authState = value;
		});

		appStateUnsubscribe = AppStateStore.subscribe(value => {
			active = value.path === '/profile';
		});
	});

	const handleProfile = () => {
		navigate('/profile');
	};

	const onKeypress = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleProfile();
			e.preventDefault();
			return false;
		}
	};
</script>

{#if (authProps.authState?.loggedIn)}
	<div class="profile-menu" class:active tabindex="0"
	     on:keypress={onKeypress}
	     on:click={handleProfile}>
		{#if (authProps.authState?.profileImageUrl)}
			<Image src={authProps.authState?.profileImageUrl} class="profile-image"/>
		{/if}
	</div>
{/if}

<style lang="less">
	:global {
		.profile-menu {
			border-radius: 100%;
			margin-left: 16px;
			width: 50px;
			height: 50px;
			border: 4px solid rgba(255, 255, 255, .7);
			opacity: .7;
			overflow: hidden;
			transition: border .2s ease, opacity .2s ease;
			cursor: pointer;

			&.active {
				border-color: var(--app-primary-bg-light);
				opacity: 1;
			}

			&:hover, &:focus {
				opacity: 1;
				border: 4px solid rgba(255, 255, 255, 1);
				outline: none;
			}
		}

		.profile-image {
			width: 50px;
			height: 50px;
			border-radius: 100%;
		}
	}
</style>
