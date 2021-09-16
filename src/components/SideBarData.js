import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import {BiSpreadsheet} from "react-icons/bi";
import {AiOutlineInbox} from "react-icons/ai";

export const SidebarData = [
{
	title: "Dashbord",
	path: "/",
	icon: <AiIcons.AiFillHome />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

},
{
	title: "Category",
	icon: <BiSpreadsheet />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Add Category",
		path: "/categorie",
		icon: <IoIcons.IoIosPaper />,
		cName: "sub-nav",
	},
	{
		title: "Modify Category",
		path: "/modifierCategroie",
		icon: <IoIcons.IoIosPaper />,
		cName: "sub-nav",
	},
	{
		title: "Delete Category",
		path: "/SupprimerCategroie",
		icon: <IoIcons.IoIosPaper />,
	},
	],
},
{
	title: "Product",
	icon: <AiOutlineInbox/>,

	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Add Product",
		path: "/product",
		icon: <IoIcons.IoIosPaper />,
	},
	{
		title: "Modify Product",
		path: "/modifierProduit",
		icon: <IoIcons.IoIosPaper />,
	},
	{
		title: "Delete Product",
		path: "/SupprimerProduit",
		icon: <IoIcons.IoIosPaper />,
	}
	],
}
];