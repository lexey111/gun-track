export type TUser = {
	id: string
	displayName: string
	phoneNumber: string
	email: string
	emailVerified: boolean
	profileImageUrl: string
	providerId: string
	providerData: Record<string, any> | null
	loggedIn: boolean
};

export const USER_INITIAL: TUser = {
	id: '',
	displayName: '',
	phoneNumber: '',
	email: '',
	emailVerified: false,
	profileImageUrl: '',
	providerId: '',
	loggedIn: false,
	providerData: {},
};
