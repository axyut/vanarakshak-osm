import dotdot from "../Assets/icons/dotdot.svg";
import tree from "../Assets/icons/tree.svg";
import community from "../Assets/icons/community.svg";
//import dash from "../Assets/icons/dash.svg";
import events from "../Assets/icons/events.svg";
import user from "../Assets/icons/user.svg";
//import dashB from "../Assets/Icons/dashB.svg";
import earth from "../Assets/Icons/earth.svg";
import report from "../Assets/Icons/report.svg";
import lifebuoy from "../Assets/Icons/lifebuoy.svg";
import exclaimReport from "../Assets/Icons/exclaimReport.svg";
import dollar from "../Assets/Icons/dollar.svg";
import dashboard from "../Assets/Icons/dashboard.svg";
import housePlant from "../Assets/Icons/houseplant.svg";
import squareDashboard from "../Assets/Icons/website-dashboard.svg";

const plantPages = [
	{
		label: "Dashboard",
		link: "/dashboard/plants/dashboard",
		icon: housePlant,
		parent: "Plants",
	},
	{
		label: "Add Plants",
		link: "/dashboard/plants/add_plants",
		icon: tree,
		parent: "Plants",
	},
	{
		label: "My Plants",
		link: "/dashboard/plants/myPlants",
		icon: user,
		parent: "Plants",
	},
	{
		label: "Community",
		link: "/dashboard/plants/community",
		icon: community,
		parent: "Plants",
	},
	{
		label: "Others",
		link: "/dashboard/plants/others",
		icon: dotdot,
		parent: "Plants",
	},
];
const contributionPages = [
	{
		label: "Contribute",
		link: "/dashboard/contribution/contribute",
		icon: earth,
		parent: "Contribution",
	},
	{
		label: "Events",
		link: "/dashboard/contribution/events",
		icon: events,
		parent: "Contribution",
	},
	{
		label: "Report",
		link: "/dashboard/contribution/report",
		icon: exclaimReport,
		parent: "Contribution",
	},
];
const leaderboardPages = [
	{
		label: "Leader",
		link: "/dashboard/leaderboard/leader",
		icon: user,
		parent: "Leaderboard",
	},
	{
		label: "Community",
		link: "/dashboard/leaderboard/community",
		icon: community,
		parent: "Leaderboard",
	},
];

export { plantPages, contributionPages, leaderboardPages };
