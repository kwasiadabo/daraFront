import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import { apiUrl } from '../config.json';
import {
	CCreateElement,
	CSidebar,
	CSidebarBrand,
	CSidebarNav,
	CSidebarNavDivider,
	CSidebarNavTitle,
	CSidebarMinimizer,
	CSidebarNavDropdown,
	CSidebarNavItem,
} from '@coreui/react';
import auth from '../components/services/authService';
import kbthlogo from '../assets/icons/dara.png';
import CIcon from '@coreui/icons-react';
import 'src/sidebar.css';
// sidebar nav config
import adminNav from './_nav';
import frontDesk from './frontDesk';
import supervisor from './supervisor';
import loanOfficer from './loanOfficer';
import recovery from './recovery';

const TheSidebar = () => {
	const [user, setUser] = useState({});
	const dispatch = useDispatch();
	const show = useSelector((state) => state.sidebarShow);
	const myUser = auth.getCurrentUser();
	const [userMenus, setUserMenus] = useState([]);
	const [subMenus, setSubMenus] = useState([]);
	const [userAccessMenus, setUserAccessMenus] = useState([]);

	const handleBackup = async () => {
		await axios.post(apiUrl + '/backup', {
			db: 'Daraplus',
		});
	};
	console.log(myUser);

	// useEffect(() => {
	// 	async function getUserMenus() {
	// 		// const results = await axios.get(
	// 		// 	apiUrl + '/setup/userroles/menu/' + myUser.userRole + '/' + myUser.staff
	// 		// );
	// 		const userResults = await axios.get(
	// 			apiUrl + '/setup/useraccess/' + myUser.staff
	// 		);
	// 		//setUserMenus(results.data);
	// 		setUserAccessMenus(userResults.data);
	// 		console.log(userResults.data);
	// 	}
	// 	getUserMenus();
	// }, [myUser.role]);

	setInterval(function () {
		handleBackup();
		//code goes here that will be run every 5 seconds.
	}, 14400000);

	//console.log(Object.keys(myUser).length)
	//console.log(myUser);
	//const menus = userAccessMenus.length == 0 ? userMenus : userAccessMenus;

	let myMenus = [
		//	icon: <CIcon name="cil-file" customClasses="c-sidebar-nav-icon" /> does not work
		{
			_tag: 'CSidebarNavDropdown',
			name: 'CUSTOMER MGT',
			//to: '/home',
			icon: 'cil-spreadsheet',

			_children: [
				{
					_tag: 'CSidebarNavItem',
					name: 'Customers List',
					to: '/customer/customerlist',
					//icon: 'cil-spreadsheet',
					label: true,
				},
				{
					_tag: 'CSidebarNavItem',
					name: 'Re-assign Customers',
					to: '/customer/reassign',
					//icon: 'cilNotes',
					label: true,
				},
			],
		},
		{
			_tag: 'CSidebarNavDropdown',
			name: 'LOAN MGT',
			route: '#',
			icon: 'cilNotes',
			_children: [
				{
					_tag: 'CSidebarNavItem',
					name: 'Issue Loan Cheque',
					to: '/loan/issueloancheque',
					label: true,
					//icon: 'cilNotes',
				},

				{
					_tag: 'CSidebarNavItem',
					name: 'Disburse Loan Cheque',
					to: '/loan/disburse',
					label: true,
					//icon: 'cilNotes',
				},

				{
					_tag: 'CSidebarNavItem',
					name: 'Loan Booking',
					to: '/loan/loanbooking',
					label: true,
					//icon: 'cilNotes',
				},
				{
					_tag: 'CSidebarNavItem',
					name: 'Remove Loan Booking',
					to: '/loan/removeLoanBooking',
					label: true,
					//icon: 'cilNotes',
				},
				{
					_tag: 'CSidebarNavItem',
					name: 'Loan Rescheduling',
					to: '/rescheduling',
					label: true,
					//icon: 'cilNotes',
				},
			],
		},
		{
			_tag: 'CSidebarNavItem',
			name: 'Adabo Funtions',
			to: '/rescheduling',
			label: true,
			//icon: 'cilNotes',
		},
	];

	return (
		<CSidebar
			className="sidebar"
			show={show}
			onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
		>
			<CSidebarBrand className="d-md-down-none" to="/dashboard">
				<h5>Dara Capital Consult</h5>

				<CIcon
					className="c-sidebar-brand-minimized"
					name="sygnet"
					height={30}
				/>
			</CSidebarBrand>
			<CSidebarNav>
				<CCreateElement
					className="items"
					items={
						//userMenus.length > 0 ? userMenus : adminNav
						myUser.userRole == 'Customer Service Officer'
							? frontDesk
							: myUser.userRole == 'Supervisor'
							? supervisor
							: myUser.userRole == 'Loan Officer'
							? loanOfficer
							: myUser.userRole == 'Recovery Officer'
							? recovery
							: adminNav
					}
					//myMenus
					//userMenus
					//userAccessMenus
					//adminNav

					components={{
						CSidebarNavDivider,
						CSidebarNavDropdown,
						CSidebarNavItem,
						CSidebarNavTitle,
					}}
				/>
			</CSidebarNav>
			<CSidebarMinimizer className="c-d-md-down-none" />
		</CSidebar>
	);
};

export default React.memo(TheSidebar);
