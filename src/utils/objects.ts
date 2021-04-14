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

export function CompareStringArrays(array1: Array<any>, array2: Array<any>): boolean {
	// if the other array is a falsy value, return
	if (!array2 || !array1) {
		return false;
	}

	if (!Array.isArray(array2) || !Array.isArray(array1)) {
		return false;
	}

	// compare lengths - can save a lot of time
	if (array1.length !== array2.length) {
		return false;
	}

	for (let i = 0, l = array1.length; i < l; i++) {
		if (!array2.includes(array1[i])) {
			return false;
		}
	}

	for (let i = 0, l = array2.length; i < l; i++) {
		if (!array1.includes(array2[i])) {
			return false;
		}
	}
	return true;
}
