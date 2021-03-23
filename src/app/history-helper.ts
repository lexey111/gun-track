/* eslint-disable @typescript-eslint/no-unsafe-assignment,prefer-rest-params,@typescript-eslint/unbound-method,@typescript-eslint/no-unsafe-return */

export function extendHistoryTracking(): void {
	history.pushState = (f => function pushState() {
		const ret = f.apply(this, arguments);
		window.dispatchEvent(new Event('pushstate'));
		window.dispatchEvent(new Event('locationchange'));

		return ret;
	})(history.pushState);

	history.replaceState = (f => function replaceState() {
		const ret = f.apply(this, arguments);
		window.dispatchEvent(new Event('replacestate'));
		window.dispatchEvent(new Event('locationchange'));

		return ret;
	})(history.replaceState);

	window.addEventListener('popstate', (): void => {
		window.dispatchEvent(new Event('locationchange'));
	});
}
