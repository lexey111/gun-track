/* eslint-disable @typescript-eslint/no-unsafe-member-access,sonarjs/no-collapsible-if,@typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function clickOutside(node: HTMLElement): any {

	const handleClick = (event: any): void => {
		if (node && !node.contains(event.target)) {
			if (!event.defaultPrevented) {
				node.dispatchEvent(new CustomEvent('click_outside', node as unknown));
			}
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
