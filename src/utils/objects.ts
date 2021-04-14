// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isEmpty(target?: any): boolean {
	if (!target) {
		return true;
	}
	if (Array.isArray(target)) {
		return target.length === 0;
	}
	if (typeof target === 'object') {
		return Object.keys(target).length === 0;
	}
	return false;
}
