/* eslint-disable */
export const autoFocus = (node: any): { destroy: () => void } => {
	let delay;

	if (node.focus) {
		clearTimeout(delay);
		delay = setTimeout(() => node.focus(), 200);
	}

	return {
		destroy() {
			clearTimeout(delay);
		}
	};
};

export const autoFocusWithSelect = (node: HTMLInputElement): { destroy: () => void } => {
	let delay;

	if (node.focus) {
		clearTimeout(delay);
		delay = setTimeout(() => {
			if (node.select) {
				node.select();
			}
			node.focus();
		}, 200);
	}

	return {
		destroy() {
			clearTimeout(delay);
		}
	};
};
