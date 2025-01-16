import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import auth from '../../components/services/authService';
import { useHistory } from 'react-router-dom';
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
	CDropdownDivider,
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
const ChangePassword = () => {
	//const { addToast } = useToasts()
	const navigate = useHistory();
	const user = auth.getCurrentUser();

	const [userAccount, setUserAccount] = useState({
		username: '',
		password: '',
	});

	const handleSubmit = async (e) => {
		console.log(userAccount);
		console.log(user);
		e.preventDefault();
		try {
			const results = await axios.put(apiUrl + '/setup/user/' + user.id + '/', {
				password: userAccount.password,
			});

			if (results.status !== 200) {
				return Swal.fire('OOPS', 'Unsuccessful', 'error');
			} else {
				Swal.fire('Password Changed Successfully', 'success');
				setUserAccount({
					username: '',
					password: '',
				});
				navigate.push('/home');
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
			password: tempPassword,
			confirmPassword: tempPassword,
		});
	}
	return (
		<div className="container">
			<h1 className="centertext">Change User Password</h1>
			<p className="staffp">
				A user account is an established technique for connecting a user and an
				information service and/or computer network. User accounts determine
				whether or not a user can connect to a computer, network or similar
				networks.
			</p>

			<div className="row mb-3">
				<label htmlFor="nameOfStaff" className="col-sm-3">
					FullName
				</label>
				<CInput
					type="text"
					className="col-sm-6"
					id="nameOfStaff"
					value={user.nameOfStaff}
				/>
			</div>
			<div className="row mb-3">
				<label htmlFor="username" className=" col-sm-3">
					Username
				</label>
				<CInput
					type="text"
					className="col-sm-6"
					id="username"
					value={user.username}
				/>
			</div>
			<div className="row mb-3">
				<label htmlFor="gender" className="col-sm-3">
					User Role
				</label>
				<CInput
					type="text"
					className="col-sm-6"
					aria-label="Default select example"
					value={user.userRole}
				/>
			</div>
			<div className="row mb-3">
				<label htmlFor="branch" className="col-sm-3">
					Branch
				</label>
				<CInput
					type="text"
					className="col-sm-6"
					aria-label="Default select example"
					value={user.branch}
				/>
			</div>
			<div className="row mb-3">
				<label htmlFor="password" className="col-sm-3">
					New Password
				</label>
				<CInput
					type="password"
					className="col-sm-6"
					value={userAccount.password}
					onChange={(e) =>
						setUserAccount({ ...userAccount, password: e.target.value })
					}
				/>
			</div>
			<div className="row mb-3">
				<label htmlFor="confirmpassword" className="col-sm-3">
					Confirm Password
				</label>
				<CInput
					type="password"
					className="col-sm-6"
					value={userAccount.confirmPassword}
					onChange={(e) =>
						setUserAccount({
							...userAccount,
							confirmPassword: e.target.value,
						})
					}
				/>
			</div>

			<CButton
				className="btn-sm col-sm-3 mt-3 float-right"
				color="danger"
				onClick={handleSubmit}
			>
				Submit
			</CButton>
		</div>
	);
};

export default ChangePassword;
