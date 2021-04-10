/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-unsafe-call */
export const getErrorText = (error: any): string => {
	// eslint-disable-next-line no-console
	console.error(error);

	if (typeof error === 'string') {
		return error;
	}

	if (typeof error.message === 'string') {
		return error.message as string;
	}

	if (error.toString) {
		return error.toString() as string;
	}
	return 'Unknown error';
};
