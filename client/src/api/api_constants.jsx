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
	PLANT: {
		ALL_PLANTS: "/api/plant/my",
		ONE: "/api/plant/one",
		MANY: "/api/plant/many",
	},
	LEADERBOARD: {
		MY_RANK: "/api/leaderboard/rank",
		TOP_TEN: "/api/leaderboard/",
	},
	PUBLIC: {
		STATS: "/api/public/stats",
	},
	CONTRIBUTE: {
		EVENTS: "/api/contribute/latestEvents",
		REPORT: "/api/contribute/report",
		DONATE: "/api/contribute/donate",
	},
};
