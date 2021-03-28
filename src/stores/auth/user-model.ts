export type TUser = {
	id: string
	email: string
	profileImageUrl: string
	providerId: string
	loggedIn: boolean
};

export const USER_INITIAL: TUser = {
	id: '',
	email: '',
	profileImageUrl: '',
	providerId: '',
	loggedIn: false,
};
