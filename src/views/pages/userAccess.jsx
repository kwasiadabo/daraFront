import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { apiUrl } from '../../config.json';
import auth from '../../components/services/authService';
import Joi, { stringify } from 'joi-browser';
import Swal from 'sweetalert2';
import CIcon from '@coreui/icons-react';
import { FcAdvance } from 'react-icons/fc';

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
	CInputGroupText,
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

const UserAccess = () => {
	const [mainMenuData, setMainMenuData] = useState([]);
	const [search, setSearch] = useState('');
	const [menuSearch, setMenuSearch] = useState('');

	const [roles, setRoles] = useState([]);
	const [show, setShow] = useState(false);
	const [menus, setMenus] = useState([]);
	const [mainMenus, setMainMenus] = useState([]);
	const [selectedMenu, setSelectedMenu] = useState('');
	const [subMenus, setSubMenus] = useState([]);
	const [menuArray, setMenuArray] = useState([]);
	const [allAccounts, setAllAccounts] = useState([]);
	const [rA, setRA] = useState([]);
	const [userMenus, setUserMenus] = useState([]);
	const [user, setUser] = useState(0);
	const [userAccount, setUserAccount] = useState({
		username: '',
		nameOfStaff: '',
		userRole: '',
		branch: '',
		staffId: 0,
	});

	const [editMode, setEditMode] = useState(false);
	const [render, setRender] = useState(false);
	const [checked, setChecked] = useState(false);
	const [userAccess, setUserAccess] = useState({
		user: '',
		role: '',
		access: '',
	});

	useEffect(() => {
		async function getUserRoles() {
			// const results = await axios.get(apiUrl + '/setup/userroles');
			// setRoles(results.data);
			const subs = await axios.get(apiUrl + '/menus/submenu/all');
			setMenus(subs.data);
			const mainMenu = await axios.get(apiUrl + '/menus/mainmenu');
			setMainMenus(mainMenu.data);
			const roleAcc = await axios.get(
				apiUrl + '/setup/useraccess/myroles/' + userAccount.staffId
			);
			setRA(roleAcc.data);
		}
		getUserRoles();
	}, [userAccount]);

	useEffect(() => {
		async function getUserAccounts(params) {
			const allUserAccounts = await axios.get(apiUrl + '/users/useraccounts');
			setAllAccounts(allUserAccounts.data);
		}
		getUserAccounts();
	}, [render]);

	useEffect(() => {
		async function getUserMenus() {
			const subs = await axios.get(
				apiUrl + '/setup/useraccess/myroles/' + userAccount.staffId
			);
			console.log(subs.data);
			setUserMenus(subs.data);
		}
		getUserMenus();
	}, [render, userAccount.nameOfStaff]);

	const subGetSubMenus = (s) => {
		setSelectedMenu(s.currentTarget.value);
		setSubMenus(menus.filter((m) => m.menu == s.currentTarget.value));
	};

	let arr = [];
	const checkedMenus = (s, i) => {
		if (i === true) {
			s.nameOfStaff = userAccount.staffId;
			arr.push(s);
		} else {
			arr = arr.filter((selected) => selected.id !== s.id);
		}
	};

	const handleSubmit = async () => {
		try {
			const results = await axios.post(apiUrl + '/setup/useraccess', arr);
			if (results.status !== 200) {
				return Swal.fire(
					'Failed',
					'Submission Failed ! Check Entries and try again !',
					'error'
				);
			} else {
				Swal.fire(
					'Success',
					'User Access Saved Successfully, STATUS:' + results.status,
					'success'
				);
				arr = [];
				setSubMenus([]);
				setRender(!render);
			}
		} catch (err) {
			Swal.fire('Error', 'OOPS ! ' + err.message, 'error');
		}
	};

	const handleDeleteUserAccess = async (id) => {
		Swal.fire({
			title: 'Do you want to remove this user access ?',
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: 'Remove',
			denyButtonText: `Don't Remove`,
		}).then(async (result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				try {
					const results = await axios.delete(
						apiUrl + '/setup/useraccess/' + id
					);
					if (results.status == '200') {
						Swal.fire('Success', 'User Access Removed Successfully', 'success');
						arr = [];
						setSubMenus([]);
						setRender(!render);
					} else {
						return Swal.fire(
							'Failed',
							'Removal Failed ! Check Entries and try again !',
							'error'
						);
					}
					setRender(!render);
				} catch (ex) {
					Swal.fire('Error', ex + ' User Access Removal Failed', 'error');
				}
			} else if (result.isDenied) {
				Swal.fire('User Access Removal Failed', '', 'error');
			}
		});
	};
	const handleSearch = (e) => {
		setSearch(e.currentTarget.value);
	};

	const handleMenuSearch = (e) => {
		setMenuSearch(e.currentTarget.value);
	};

	const data = {
		sUserMenus: userMenus.filter(
			(m) =>
				m.menu?.toLowerCase().includes(menuSearch.toLowerCase()) ||
				m.subMenu?.toLowerCase().includes(menuSearch.toLowerCase())
		),
	};

	const userData = {
		sUserAccounts: allAccounts.filter(
			(m) =>
				m.nameOfStaff?.toLowerCase().includes(search.toLowerCase()) ||
				m.userName?.toLowerCase().includes(search.toLowerCase())
		),
	};

	const dataToUse = search.length === 0 ? allAccounts : userData.sUserAccounts;

	const menuData = menuSearch.length === 0 ? userMenus : data.sUserMenus;

	const handleSelectUser = () => {
		setShow(!show);
	};

	const handleUserSelected = (user) => {
		setUserAccount({
			username: user.username,
			nameOfStaff: user.nameOfStaff,
			role: user.userRole,
			branch: user.branch,
			staffId: user.staff,
		});
		setSearch('');
		setShow(!show);
	};

	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className="col-12">
						<p className="staffp">
							User role refers to the set of permissions and access levels
							assigned to a particular type of user within an application or
							system. These roles define what actions a user can perform, what
							features they can access, and how they interact with the software.
							User roles help ensure security, manage permissions, and organize
							the user experience based on responsibilities or needs.
						</p>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<CButton
							className="float-right mt-3 btn-sm btn btn-primary"
							onClick={handleSelectUser}
							name="cil-user"
						>
							Select User
						</CButton>
					</div>
				</div>
				<hr />

				{/* <CInputGroupText className="float-right mt-3"> */}

				{/* </CInputGroupText> */}

				<div
					className="row"
					style={{ backgroundColor: '#8fc7f7', borderRadius: '10px' }}
				>
					<div className="col-4 mt-2 justify-content-center align-items-center">
						<CInputGroup className="mt-1">
							<CLabel htmlFor="menu" className="form-Label col-4 text-muted">
								<span>Name :</span>
							</CLabel>
							<CLabel htmlFor="menu" className="form-Label col-sm-8">
								{userAccount.nameOfStaff}
							</CLabel>
						</CInputGroup>
					</div>
					<div className="col-4 mt-2 justify-content-center align-items-center">
						<CInputGroup className="mt-1">
							<CLabel htmlFor="menu" className="form-Label col-4 text-muted">
								<span>Username :</span>
							</CLabel>

							<CLabel htmlFor="menu" className="form-Label col-sm-8 ">
								{userAccount.username}
							</CLabel>
						</CInputGroup>
					</div>
					<div className="col-4 mt-2 justify-content-center align-items-center">
						<CInputGroup className="mt-1">
							<CLabel htmlFor="menu" className="form-Label col-4 text-muted">
								<span>Role :</span>
							</CLabel>

							<CLabel htmlFor="menu" className="form-Label col-sm-8 ">
								{userAccount.role}
							</CLabel>
						</CInputGroup>
					</div>
					<div className="col-4 mt-2 justify-content-center align-items-center">
						<CInputGroup className="mt-1">
							<CLabel htmlFor="menu" className="form-Label col-4 text-muted">
								<span>Branch :</span>
							</CLabel>

							<CLabel htmlFor="menu" className="form-Label col-sm-8 ">
								{userAccount.branch}
							</CLabel>
						</CInputGroup>
					</div>
					<hr />
				</div>
				<hr />
				<div className=" col-5 justify-content-center align-items-center">
					<CInputGroup className="mt-1">
						<CSelect
							className="form-select col-sm-10"
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
				</div>
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
				<div className="col-12">
					<CButton
						className="btn btn-success mt-3 btn-sm float-right"
						onClick={handleSubmit}
					>
						Submit
					</CButton>
				</div>
				<hr />
				<div className="table-responsive">
					<CInputGroup className="mt-3">
						<CInput
							type="text"
							className="form-control col-sm-4"
							id="menu"
							value={menuSearch}
							onChange={handleMenuSearch}
							placeholder="Search"
						/>
					</CInputGroup>
					<Table className="lg mt-3 table-lg" size="lg">
						<thead>
							<tr className="fs-sm">
								<th></th>
								<th>Menu</th>
								<th>Menu Item</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{menuData.map((c, index) => (
								<tr
									key={c.id}

									//onClick={() => handleOnEdit(c)}
								>
									<td>{index + 1}</td>
									<td>{c.menu}</td>
									<td>{c.subMenu}</td>
									<td>
										{/* <FcAdvance /> */}
										<label
											className="sm"
											Style="cursor: pointer;"
											onClick={() => handleDeleteUserAccess(c.id)}
										>
											<FcAdvance /> Remove
										</label>
										{/* <CButton
											className="btn-sm m-3"
											color="danger"
											onClick={() => handleDeleteRoleAccess(c.id)}
										>
											- Remove
										</CButton> */}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>

			<CModal
				size="lg"
				show={show}
				onClose={() => {
					setShow(!show);
				}}
				color="success"
			>
				<CModalHeader closeButton>
					<CModalTitle> Search for User </CModalTitle>
				</CModalHeader>
				<CModalBody>
					<CFormGroup>
						<CInputGroup className="mt-3">
							<CInput
								type="text"
								className="form-control col-sm-12"
								id="menu"
								value={search}
								onChange={handleSearch}
								placeholder="Search"
							/>
						</CInputGroup>
						<Table className="mt-3 table-sm">
							<thead>
								<tr className="fs-sm">
									<th></th>
									<th>Username</th>
									<th>FullName</th>
									<th>Role</th>
								</tr>
							</thead>
							<tbody>
								{dataToUse.map((c, index) => (
									<tr
										key={c.id}
										Style="cursor: pointer;"
										onClick={() => handleUserSelected(c)}
									>
										<td>{index + 1}</td>
										<td>{c.username}</td>
										<td>{c.nameOfStaff}</td>
										<td>{c.userRole}</td>

										{/* <td className="sm">
											<CButton
												className="btn-sm m-3"
												color="danger"
												onClick={() => handleDeleteRoleAccess(c.id)}
											>
												- Remove
											</CButton>
										</td> */}
									</tr>
								))}
							</tbody>
						</Table>
					</CFormGroup>
				</CModalBody>
			</CModal>
		</>
	);
};

export default UserAccess;
