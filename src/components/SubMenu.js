import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
display: flex;
color: #fff;
text-decoration:none;
lit-style:none;
justify-content: space-between;
align-items: center;
padding: 20px;
list-style: none;
height: 60px;
text-decoration: none;
font-size: 18px;

&:hover {
	background: #56e5bb;
	color:#000;
	border-left: 4px solid green;
	text-decoration:none;
	cursor: pointer;
}
`;

const SidebarLabel = styled.span`
margin-left: 16px;
`;

const DropdownLink = styled(Link)`
background: #511281;
height: 60px;
padding-left: 3rem;
display: flex;
align-items: center;
text-decoration: none;
color: #fff;
font-size: 18px;

&:hover {
	text-decoration:none;
	color:#000;
	background: #55e5bb;
	cursor: pointer;
}
`;

const SubMenu = ({ item }) => {
const [subnav, setSubnav] = useState(false);

const showSubnav = () => setSubnav(!subnav);

return (
	<div>
	<SidebarLink to={item.path}
	onClick={item.subNav && showSubnav}>
		<div>
		{item.icon}
		<SidebarLabel>{item.title}</SidebarLabel>
		</div>
		<div>
		{item.subNav && subnav
			? item.iconOpened
			: item.subNav
			? item.iconClosed
			: null}
		</div>
	</SidebarLink>
	{subnav &&
		item.subNav.map((item, index) => {
		return (
			<DropdownLink to={item.path} key={index}>
			{item.icon}
			<SidebarLabel>{item.title}</SidebarLabel>
			</DropdownLink>
		);
		})}
	</div>
);
};

export default SubMenu;
 