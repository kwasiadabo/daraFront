import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joi from 'joi-browser';
import moment from 'moment';
import momentBusinessDays from 'moment-business-days';
import baseUrl from '../../config.json';
import auth from '../../components/services/authService';
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
function UserRoles() {
	const [userRoles, setUserRoles] = useState({
		role: '',
	});
	const [roles, setRoles] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [render, setRender] = useState(false);

	useEffect(() => {
		async function getUserRoles() {
			const results = await axios.get(baseUrl.apiUrl + '/setup/userroles');
			setRoles(results.data);
		}
		getUserRoles();
	}, [render]);

	const handleSubmit = async (e) => {
		//console.log(userRoles);
		e.preventDefault();

		try {
			const results = await axios.post(
				baseUrl.apiUrl + '/setup/userroles',
				userRoles
			);

			if (results.status !== 200) {
				return Swal.fire(
					'OOPS',
					'Submission Failed ! Check Entries and try again !',
					'error'
				);
			} else {
				Swal.fire('Success', 'User Role Saved Successfully', 'success');
				setUserRoles({
					role: '',
				});
				setRender(!render);
			}
		} catch (err) {
			Swal.fire('OOPS ! ' + err, 'error');
		}
	};

	const handleOnEdit = (p) => {
		console.log(p);
		setEditMode(true);
		setUserRoles(p);
		//setDisabled(!disabled);
	};

	const handleUpdate = async (e) => {
		console.log(userRoles);
		if (userRoles.role !== '') {
			try {
				const results = await axios.put(
					baseUrl.apiUrl + '/setup/userroles',
					userRoles
				);
				if (results.status !== 200) {
					return Swal.fire(
						'OOPS !',
						'Submission Failed ! Check Entries and try again !',
						'error'
					);
				} else {
					Swal.fire('Success', 'User role Updated Successfully', 'success');
					setUserRoles({
						role: '',
					});
					setEditMode(false);
					setRender(!render);
				}
			} catch (err) {
				Swal.fire('OOPS ! ' + err.message, 'error');
			}
		} else {
			return Swal.fire('OOPS', 'Enter all Details !', 'error');
		}
	};

	const handleDelete = async () => {
		if (userRoles.role !== '') {
			try {
				const results = await axios.delete(
					baseUrl.apiUrl + '/setup/userroles/' + userRoles.id
				);
				if (results.status !== 200) {
					return Swal.fire(
						'OOPS !',
						'Submission Failed ! Check Entries and try again !',
						'error'
					);
				} else {
					Swal.fire('Success', 'User Role Deleted Successfully', 'success');
					setUserRoles({
						role: '',
					});
					setEditMode(false);
					setRender(!render);
				}
			} catch (err) {
				Swal.fire('OOPS ! ' + err.message, 'error');
			}
		} else {
			return Swal.fire('OOPS', 'Select a Branch !', 'error');
		}
	};

	return (
		<div className="container-fluid">
			<p className="staffp">
				User role refers to the set of permissions and access levels assigned to
				a particular type of user within an application or system. These roles
				define what actions a user can perform, what features they can access,
				and how they interact with the software. User roles help ensure
				security, manage permissions, and organize the user experience based on
				responsibilities or needs.
			</p>
			<CInputGroup className="mt-3">
				<CLabel htmlFor="branch" className="col-sm-2">
					User Roles
				</CLabel>
				<CInput
					type="text"
					className="form-control col-sm-8"
					id="branch"
					value={userRoles.role}
					onChange={(e) =>
						setUserRoles({
							...userRoles,
							role: e.currentTarget.value,
						})
					}
				/>
			</CInputGroup>

			<div className="row justify-content-center">
				{!editMode ? (
					<CButton
						className="btn btn-primary col-sm-2 mt-3 btn-sm"
						onClick={handleSubmit}
					>
						Submit
					</CButton>
				) : null}
				{editMode ? (
					<CButton
						className="btn-sm m-3 col-sm-2"
						color="success"
						onClick={handleUpdate}
					>
						Update
					</CButton>
				) : null}

				{editMode && (
					<CButton
						className="btn btn-danger col-sm-2 m-3 btn-sm"
						onClick={handleDelete}
					>
						Delete
					</CButton>
				)}
			</div>
			<Table className="sm mt-3 table-sm">
				<thead>
					<tr className="fs-sm">
						<th></th>
						<th>User Roles</th>
					</tr>
				</thead>
				<tbody>
					{roles.map((c, index) => (
						<tr
							key={c.id}
							Style="cursor: pointer;"
							onClick={() => handleOnEdit(c)}
						>
							<td>{index + 1}</td>
							<td>{c.role}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default UserRoles;
