import {writable} from 'svelte/store';

const {
	subscribe,
	set,
	update
} = writable<boolean>(false);

export const stateStore = {subscribe, set, update};
