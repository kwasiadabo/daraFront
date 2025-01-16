import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { apiUrl } from '../../config.json';
import auth from '../../components/services/authService';
import Joi, { stringify } from 'joi-browser';
import Swal from 'sweetalert2';

import {
	CBadge,
	CCard,
	CCardBody,
	//CCardHeader,
	CCol,
	CDataTable,
	CRow,
	CButton,
	CModal,
	CModalFooter,
	CModalHeader,
	CModalBody,
	CCardHeader,
	CInputGroupAppend,
	CInputGroupPrepend,
	CDropdownItem,
	CForm,
	//CCardFooter,
	CDropdownToggle,
	//CInputRadio,
	CDropdown,
	CModalTitle,
	//CFormText,
	//CTextarea,
	CFormGroup,
	CLabel,
	// CSwitch,
	CInput,
	//CInputFile,
	CSelect,
	CDropdownMenu,
	//CCardFooter,
	CInputGroup,
	CInputCheckbox,
	//CForm,
} from '@coreui/react';

import {
	Row,
	Col,
	Table,
	Progress,
	Button,
	UncontrolledButtonDropdown,
	DropdownMenu,
	DropdownToggle,
	DropdownItem,
	Input,
	Label,
	Badge,
} from 'reactstrap';
import Dashboard from '../planning/FamDetails';

const RoleAccess = () => {
	const [mainMenuData, setMainMenuData] = useState([]);
	const [search, setSearch] = useState('');
	const [roles, setRoles] = useState([]);
	const [show, setShow] = useState(false);
	const [menus, setMenus] = useState([]);
	const [mainMenus, setMainMenus] = useState([]);
	const [selectedMenu, setSelectedMenu] = useState('');
	const [subMenus, setSubMenus] = useState([]);
	const [menuArray, setMenuArray] = useState([]);
	const [rA, setRA] = useState([]);
	const [role, setRole] = useState(0);

	const [editMode, setEditMode] = useState(false);
	const [render, setRender] = useState(false);
	const [checked, setChecked] = useState(false);
	const [roleAccess, setRoleAccess] = useState({
		role: '',
		access: '',
	});

	useEffect(() => {
		async function getUserRoles() {
			const results = await axios.get(apiUrl + '/setup/userroles');
			setRoles(results.data);
			const subs = await axios.get(apiUrl + '/menus/submenu/all');
			setMenus(subs.data);
			const mainMenu = await axios.get(apiUrl + '/menus/mainmenu');
			setMainMenus(mainMenu.data);
			const roleAcc = await axios.get(
				apiUrl + '/setup/userroles/rolemenus/' + role
			);
			console.log(roleAcc.data);
			setRA(roleAcc.data);
		}
		getUserRoles();
	}, [render, role]);

	const subGetSubMenus = (s) => {
		setSelectedMenu(s.currentTarget.value);
		setSubMenus(menus.filter((m) => m.menu == s.currentTarget.value));
	};

	let arr = [];
	const checkedMenus = (s, i) => {
		if (i === true) {
			s.role = roleAccess.role;
			arr.push(s);
		} else {
			arr = arr.filter((selected) => selected.id !== s.id);
		}
		//console.log(arr);
		// setMenuArray(arr);
	};

	const handleSubmit = async () => {
		try {
			const results = await axios.post(
				apiUrl + '/setup/userroles/roleaccess',
				arr
			);
			if (results.status !== 200) {
				return Swal.fire(
					'Failed',
					'Submission Failed ! Check Entries and try again !',
					'error'
				);
			} else {
				Swal.fire('Success', 'Role Access Saved Successfully', 'success');
				arr = [];
				setSubMenus([]);
				setRender(!render);
			}
		} catch (err) {
			Swal.fire('Error', 'OOPS ! ' + err.message, 'error');
		}
	};

	const handleDeleteRoleAccess = async (id) => {
		console.log(id);
		Swal.fire({
			title: 'Do you want to remove this role access ?',
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: 'Remove',
			denyButtonText: `Don't Remove`,
		}).then(async (result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				try {
					const results = await axios.delete(
						apiUrl + '/setup/userroles/roleaccess/' + id
					);
					if (results.status == '200') {
						Swal.fire('Success', 'Role Access Removed Successfully', 'success');
						arr = [];
						setSubMenus([]);
						setRender(!render);
					} else {
						return Swal.fire(
							'Failed',
							'Deletion Failed ! Check Entries and try again !',
							'error'
						);
					}
					setRender(!render);
				} catch (ex) {
					Swal.fire('Error', ex + ' Role Access Removal Failed', 'error');
				}
			} else if (result.isDenied) {
				Swal.fire('Role Access Removal Failed', '', 'error');
			}
		});
	};
	const handleSearch = (e) => {
		setSearch(e.currentTarget.value);
	};
	const data = {
		sRoleAccess: rA?.filter(
			(m) =>
				m.menu?.toLowerCase().includes(search.toLowerCase()) ||
				m.subMenu?.toLowerCase().includes(search.toLowerCase()) ||
				m.role?.toLowerCase().includes(search.toLowerCase())
		),
	};

	const dataTouse = search.length === 0 ? rA : data.sRoleAccess;

	return (
		<>
			<div className="container-fluid">
				<p className="staffp">
					User role refers to the set of permissions and access levels assigned
					to a particular type of user within an application or system. These
					roles define what actions a user can perform, what features they can
					access, and how they interact with the software. User roles help
					ensure security, manage permissions, and organize the user experience
					based on responsibilities or needs.
				</p>
				<CInputGroup>
					<CSelect
						className="form-select col-sm-10"
						aria-label="Default select example"
						value={roleAccess.role}
						onChange={(e) => {
							setRoleAccess({
								...roleAccess,
								role: e.currentTarget.value,
							});
							setRole(e.currentTarget.value);
						}}
					>
						<option value="">Select Role *</option>
						{roles.map((s) => (
							<option key={s.id} value={s.id} id={s.id}>
								{s.role}
							</option>
						))}
					</CSelect>
				</CInputGroup>

				<CInputGroup>
					<CSelect
						className="form-select mt-3 col-sm-10"
						aria-label="Default select example"
						value={selectedMenu}
						onChange={(s) => subGetSubMenus(s)}
					>
						<option value="">Select Menu *</option>
						{mainMenus.map((s) => (
							<option key={s.id} value={s.id} id={s.id}>
								{s.menu}
							</option>
						))}
					</CSelect>
				</CInputGroup>

				<Table className="sm mt-3 col-md-3">
					<thead>
						<tr className="fs-sm">
							<th></th>

							<th>Sub Menu</th>
						</tr>
					</thead>
					<tbody>
						{subMenus.map((c, index) => (
							<tr
								key={c.id}
								Style="cursor: pointer;"
								//onClick={() => handleOnEdit(c)}
							>
								<td>{index + 1}</td>

								<td>{c.subMenu}</td>
								<td>
									<CInputCheckbox
										value={checked}
										onChange={(e) => checkedMenus(c, e.currentTarget.checked)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<div className="row justify-content-right">
					{!editMode ? (
						<CButton
							className="btn btn-success mt-3 btn-sm float-rigth"
							onClick={handleSubmit}
						>
							Submit
						</CButton>
					) : null}
					{editMode ? (
						<CButton
							className="btn-sm m-3 col-sm-2"
							color="success"
							onClick={null}
						>
							Update
						</CButton>
					) : null}

					{editMode && (
						<CButton
							className="btn btn-danger col-sm-2 m-3 btn-sm"
							onClick={null}
						>
							Delete
						</CButton>
					)}
				</div>

				<hr />
				<div className="table-responsive">
					<CInputGroup className="mt-3">
						<CInput
							type="text"
							className="form-control col-sm-4"
							id="menu"
							value={search}
							onChange={handleSearch}
							placeholder="Search"
						/>
					</CInputGroup>
					<Table className="lg mt-3 table-lg" size="lg">
						<thead>
							<tr className="fs-sm">
								<th></th>
								<th>Role</th>
								<th>Menu</th>
								<th>Sub Menu</th>
								<th>Tag</th>
								<th>Icon</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{dataTouse.map((c, index) => (
								<tr
									key={c.roleId}
									Style="cursor: pointer;"
									//onClick={() => handleOnEdit(c)}
								>
									<td>{index + 1}</td>
									<td>{c.role}</td>
									<td>{c.menu}</td>
									<td>{c.subMenu}</td>
									<td>{c._tag}</td>
									<td>{c.icon}</td>
									<td>
										<CButton
											className="btn-sm"
											color="danger"
											onClick={() => handleDeleteRoleAccess(c.roleId)}
										>
											- Remove
										</CButton>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>
		</>
	);
};

export default RoleAccess;
