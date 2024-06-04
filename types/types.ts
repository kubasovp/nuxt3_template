export interface CurrentUser {
	isLogin: boolean;
	displayName: string | null;
	email: string | null;
	photoURL: string | null;
	emailVerified: boolean;
	uid: string;
}
