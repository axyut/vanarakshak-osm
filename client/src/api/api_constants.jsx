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
		ALLPLANTS: "/api/plant/my",
		ONE: "/api/plant/one",
		MANY: "/api/plant/many",
	},
	LEADERBOARD: {
		MYRANK: "/api/leaderboard/rank",
		TOPTEN: "/api/leaderboard/",
	},
	PUBLIC: {
		STATS: "/api/public/stats",
	},
	CONTRIBUTE: {
		CONTRIBUTE: "/api/contribute/",
		EVENTS: "/api/contribute/latestEvents",
		REPORT: "/api/contribute/report",
	},
};
