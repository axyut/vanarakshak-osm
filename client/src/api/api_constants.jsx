export const API = {
	AUTH: {
		JWT: "/api/auth/jwt",
		LOGIN: "/api/auth/login",
		REGISTER: "/api/auth/register",
	},
	USER: {
		UserId: (userId) => {
			return "/api/user/" + userId;
		},
		BASIC: "/api/user/basicdata",
	},
	FILE: {
		UPLOAD: "/api/file/upload",
	},
};
