import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import auth from '../components/services/authService';
import Swal from 'sweetalert2';
import { apiUrl } from 'src/config.json';
import CIcon from '@coreui/icons-react';

const DynamicMenu = () => {
	const user = auth.getCurrentUser();
	const data = [
		{
			_tag: 'CSidebarNavDropdown',
			name: 'CUSTOMER MGT',
			to: '/home',
			icon: <CIcon name="cil-file" customClasses="c-sidebar-nav-icon" />,
			badge: {
				color: 'success',
				text: 'PS',
			},
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
	];

	return data;
};

export default DynamicMenu;
