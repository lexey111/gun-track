export const unsafeDebounce = (func: (...args) => void, timeout = 300): (...args) => void => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
};
