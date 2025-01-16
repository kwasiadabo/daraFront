import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import { apiUrl } from '../../config.json';

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

function UserAccount(props) {
	const [search, setSearch] = useState('');
	const [user, setUser] = useState({
		username: '',
		name: '',
		role: '',
		branch,
	});
	const [allAccounts, setAllAccounts] = useState([]);
	const [roles, setRoles] = useState([]);
	const [allStaff, setAllStaff] = useState([]);
	const [branch, setBranch] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [regShow, setRegShow] = useState(false);
	const [userAccount, setUserAccount] = useState({
		username: '',
		password: 'pass1234',
		staff: 0,
		branch: 0,
		userRole: '',
	});

	useEffect(() => {
		async function getStaff() {
			const staff = await axios.get(apiUrl + '/setup/staff');
			setAllStaff(staff.data);
		}
		getStaff();
	}, []);

	useEffect(() => {
		async function getUserRoles() {
			const results = await axios.get(apiUrl + '/setup/userroles');
			setRoles(results.data);
			console.log(results.data);
		}
		getUserRoles();
	}, []);

	useEffect(() => {
		async function getBranch() {
			const branch = await axios.get(apiUrl + '/setup/branch');
			const allUserAccounts = await axios.get(apiUrl + '/users/useraccounts');
			setBranch(branch.data);
			setAllAccounts(allUserAccounts.data);
			//	console.log(allUserAccounts);
		}
		getBranch();

		genPassword();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(userAccount)
		try {
			const results = await axios.post(apiUrl + '/setup/user', userAccount);
			if (results.status !== 200) {
				return Swal.fire(
					'Failed',
					'Submission Failed ! Check Entries and try again !',
					'error'
				);
			} else {
				Swal.fire('Success', 'User Account Created Successfully', 'success');
				Swal.fire(
					'Default Password',
					'Default Password: ' +
						userAccount.password +
						' : Change this on your first login.',
					'info'
				);
				setUserAccount({
					username: '',
					password: 'pass1234',
					userRole: '',
					branch: 0,
					staff: 0,
				});
			}
		} catch (err) {
			Swal.fire('OOPS ! ' + err, 'error');
		}
	};

	const handlePasswordReset = async (id) => {
		//console.log(id);

		try {
			const results = await axios.put(apiUrl + '/setup/user/' + id, {
				password: 'pass1234',
			});
			if (results.status !== 200) {
				return Swal.fire(
					'Failed',
					'Submission Failed ! Check Entries and try again !',
					'error'
				);
			} else {
				Swal.fire('Success', 'Account Reset Successfully', 'success');
				Swal.fire(
					'Default Password',
					'Default Password: ' +
						'pass1234' +
						' : Change this on your first login.',
					'info'
				);
				setUserAccount({
					username: '',
					password: 'pass1234',
					userRole: '',
					branch: 0,
					staff: 0,
				});
			}
		} catch (err) {
			Swal.fire('OOPS ! ' + err, 'error');
		}
	};

	function genPassword() {
		let chars = '123456789abcdefghijklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
		let passwordLength = 8;
		let tempPassword = '';
		for (let i = 0; i <= passwordLength; i++) {
			let randomNumber = Math.floor(Math.random() * chars.length);
			tempPassword += chars.substring(randomNumber, randomNumber + 1);
		}
		setUserAccount({
			...userAccount,
			password: 'pass1234',
			// confirmPassword: tempPassword,
		});
	}
	const handleBackup = async () => {
		const results = await axios.post(apiUrl + '/backup', {
			db: 'Daraplus',
		});
		if (results.status !== 200) {
			return Swal.fire(
				'Backup Failed',
				'Db Back Failed ! try again !',
				'error'
			);
		} else {
			Swal.fire('Success', 'Backup Completed Successfully', 'success');
		}
	};
	const handleOnEdit = (p) => {
		setEditMode(true);
		setUserAccount({
			// nameOfStaff: p.nameOfStaff,
			// phone: p.phone,
			// dob: new Date(p.dob).toISOString().slice(0, 10),
			// dateEmployed: new Date(p.dateEmployed).toISOString().slice(0, 10),
			// qualification: p.qualification,
			// guarantorOne: p.guarantorOne,
			// guarantorOnePhone: p.guarantorOnePhone,
			// guarantorTwo: p.guarantorTwo,
			// guarantorTwoPhone: p.guarantorTwoPhone,
			// id: p.id,
		});
		//setShow(!show);
		//setDisabled(!disabled);
	};
	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	const data = {
		sAccounts: allAccounts.filter((item) =>
			item.nameOfStaff.toLowerCase().includes(search.toLowerCase())
		),
	};
	const dataTouse = search.length === 0 ? allAccounts : data.sAccounts;

	const getSelectedUser = (s) => {
		setRegShow(true);
		setUser({
			username: s.username,
			name: s.nameOfStaff,
			role: s.userRole,
			branch: s.branch,
		});
		console.log(s);
	};
	return (
		<div className="container">
			<h1 className="centertext">Setup User Accounts</h1>
			<p className="staffp mb-3">
				A user account is an established technique for connecting a user and an
				information service and/or computer network. User accounts determine
				whether or not a user can connect to a computer, network or similar
				networks.
			</p>
			<div className="mb-3 row">
				<label htmlFor="phoneworship" className="form-label col-sm-2">
					FullName
				</label>
				<CSelect
					className="col-sm-6"
					aria-label="Default select example"
					value={userAccount.staff}
					onChange={(e) =>
						setUserAccount({
							...userAccount,
							staff: e.currentTarget.value,
						})
					}
				>
					<option defaultValue="">--Select Officer--</option>
					{allStaff.map((s) => (
						<option key={s.id} value={s.id} id={s.id}>
							{s.nameOfStaff}
						</option>
					))}
				</CSelect>
			</div>
			<div className="mb-3 row">
				<label htmlFor="username" className="form-label col-sm-2">
					Username
				</label>
				<CInput
					type="text"
					className="col-sm-6"
					id="username"
					value={userAccount.username}
					onChange={(e) =>
						setUserAccount({
							...userAccount,
							username: e.currentTarget.value,
						})
					}
				/>
			</div>
			<div className="mb-3 row">
				<label htmlFor="gender" className="form-label col-sm-2">
					User Role
				</label>
				<CSelect
					className="col-sm-6"
					aria-label="Default select example"
					value={userAccount.userRole}
					onChange={(e) => {
						setUserAccount({
							...userAccount,
							userRole: e.currentTarget.value,
						});
					}}
				>
					<option defaultValue="">--Select User Role--</option>
					{roles.map((b) => (
						<option key={b.id} value={b.id} id={b.id}>
							{b.role}
						</option>
					))}
					{/* // <option value="Admin">Admin</option>
					// <option value="Loan Officer">Loan Officer</option>
					// <option value="Supervisor">Supervisor</option>
					// <option value="Recovery Officer">Recovery Officer</option>
					//{' '} */}
					{/* <option value="Customer Service Officer">
						// Customer Service Officer //{' '}
					</option>
					// <option value="Management">Management</option> */}
				</CSelect>
			</div>
			<div className="mb-3 row">
				<label htmlFor="branch" className="form-label col-sm-2">
					Branch
				</label>
				<CSelect
					className="col-sm-6"
					aria-label="Default select example"
					value={userAccount.branch}
					onChange={(e) => {
						setUserAccount({
							...userAccount,
							branch: e.currentTarget.value,
						});
					}}
				>
					<option defaultValue="">--Select Branch--</option>
					{branch.map((b) => (
						<option key={b.id} value={b.id} id={b.id}>
							{b.branch}
						</option>
					))}
				</CSelect>
			</div>

			<CButton
				className="col-sm-3 mt-3 btn-sm float-right mb-3"
				color="success"
				onClick={handleSubmit}
			>
				Submit
			</CButton>

			<CButton color="danger" className="btn-sm" onClick={handleBackup}>
				DB Backup
			</CButton>

			<div>
				<Table>
					<thead>
						<tr className="fs-sm">
							<th></th>
							<th>Name</th>
							<th>Username</th>
							<th>Role</th>
							<th>Branch</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{dataTouse.map((s, index) => (
							<tr
								key={s.id}
								Style="cursor: pointer;"
								onClick={() => handleOnEdit(s)}
							>
								<td>{index + 1}</td>
								<td>{s.nameOfStaff}</td>
								<td>{s.username}</td>
								<td>{s.userRole}</td>
								<td>{s.branch}</td>
								<td>
									<CDropdown className="btn-sm">
										<CDropdownToggle color="info" size="sm" onClick={null}>
											Select Action
										</CDropdownToggle>
										<CDropdownMenu size="sm">
											<CDropdownItem onClick={() => handlePasswordReset(s.id)}>
												Reset
											</CDropdownItem>

											<CDropdownItem onClick={() => getSelectedUser(s)}>
												Changes
											</CDropdownItem>
										</CDropdownMenu>
									</CDropdown>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>

			<CModal
				className="modal fade col-sm-12"
				size="lg"
				show={regShow}
				color="warning"
				data-backdrop="static"
				data-keyboard="false"
				onClose={() => {
					setRegShow(!regShow);
				}}
			>
				<CModalHeader className="modal-header" closeButton>
					<p>
						<h3 className="centertext">Change Username</h3>
					</p>
				</CModalHeader>

				<CModalBody className="modal-body col-sm-12">
					<div class="mb-3 row">
						<CLabel
							htmlFor="nameOfCustomer"
							className="col-sm-3 col-form-label"
						>
							Name of Staff
						</CLabel>
						<div class="col-sm-8">
							<CInput
								className="form-control-xl mb-2 mt-2 input-lg"
								value={user.name}
								readOnly
								//onChange={handleCustomerSelected}
							/>
						</div>
					</div>

					<div class="mb-3 row">
						<CLabel htmlFor="bank" className="col-sm-3 col-form-label">
							Username
						</CLabel>
						<div class="col-sm-8">
							<CInput
								id="bank"
								className="form-control"
								aria-label="Default select example"
								value={user.username}
								onChange={null}
							/>
						</div>
					</div>

					<div class="mb-3 row">
						<CLabel htmlFor="bankAccount" className="col-sm-3 col-form-label">
							User Role
						</CLabel>
						<div class="col-sm-8">
							<CSelect
								className="col-sm-12"
								aria-label="Default select example"
								value={user.role}
								onChange={(e) => {
									setUserAccount({
										...userAccount,
										userRole: e.currentTarget.value,
									});
								}}
							>
								<option defaultValue={user.role}>{user.role}</option>
								{roles.map((b) => (
									<option key={b.id} value={b.id} id={b.id}>
										{b.role}
									</option>
								))}
							</CSelect>
						</div>
					</div>

					<div class="mb-3 row">
						<CLabel htmlFor="dateOnCheque" className="col-sm-3 col-form-label">
							Branch
						</CLabel>
						<div className="col-sm-8">
							<CSelect
								className="col-sm-12"
								aria-label="Default select example"
								value={userAccount.branch}
								onChange={(e) => {
									setUserAccount({
										...userAccount,
										branch: e.currentTarget.value,
									});
								}}
							>
								<option defaultValue={user.branch}>{user.branch}</option>
								{branch.map((b) => (
									<option key={b.id} value={b.id} id={b.id}>
										{b.branch}
									</option>
								))}
							</CSelect>
						</div>
					</div>
				</CModalBody>

				<CModalFooter>
					<div className="justify-content-center">
						<CButton onClick={null} className="m-3" color="success">
							Submit
						</CButton>
						<CButton
							onClick={() => setRegShow(false)}
							className="m-3"
							color="danger"
						>
							Close
						</CButton>
					</div>
				</CModalFooter>
			</CModal>
		</div>
	);
}

export default UserAccount;
