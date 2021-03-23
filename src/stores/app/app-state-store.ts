/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {writable} from 'svelte/store';
import {IAppStateStore, TAppState} from './app-state-store.interface';

// eslint-disable-next-line @typescript-eslint/unbound-method
const {
	subscribe,
	set,
	update
} = writable<TAppState>({
	path: '',
	modal: {
		open: null,
		close: null
	},
});

export const AppStateStore: IAppStateStore = {
	subscribe,
	set,
	update,

	setPath: (path: string) => {
		update(state => ({
			...state,
			path
		}));
	},

	setModal: (open, close) => {
		update(state => ({
			...state,
			modal: {
				open,
				close
			}
		}));
	}
};
