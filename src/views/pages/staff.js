import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { apiUrl } from '../../config.json';
import auth from '../../components/services/authService';
import Joi from 'joi-browser';
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

const Staff = () => {
	const [staff, setStaff] = useState({
		nameOfStaff: '',
		phone: '',
		dob: '',
		dateEmployed: '',
		qualification: '',
		guarantorOne: '',
		guarantorOnePhone: '',
		guarantorTwo: '',
		guarantorTwoPhone: '',
	});
	const [staffData, setStaffData] = useState([]);
	const [search, setSearch] = useState('');
	const [show, setShow] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [render, setRender] = useState(false);

	useEffect(() => {
		async function getStaff() {
			const results = await axios.get(apiUrl + '/setup/staff');
			setStaffData(results.data);
			//console.log(customers);
		}
		getStaff();
		console.log(staffData);
	}, [staffData]);

	const handleSubmit = async () => {
		try {
			const results = await axios.post(apiUrl + '/setup/staff', staff);

			if (results.status !== 200) {
				return Swal.fire(
					'Failed',
					'Submission Failed ! Check Entries and try again !',
					'error'
				);
			} else {
				Swal.fire('Success', 'Staff Saved Successfully', 'success');
				setStaff({
					nameOfStaff: '',
					phone: '',
					dob: '',
					dateEmployed: '',
					qualification: '',
					guarantorOne: '',
					guarantorOnePhone: '',
					guarantorTwo: '',
					guarantorTwoPhone: '',
				});
			}
		} catch (err) {
			Swal.fire('Error', 'OOPS ! ' + err.message, 'error');
		}
	};
	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	const data = {
		sStaff: staffData.filter((item) =>
			item.nameOfStaff.toLowerCase().includes(search.toLowerCase())
		),
	};

	const staffView = (s) => {
		console.log(s);
	};

	const handleOnEdit = (p) => {
		setEditMode(true);
		setStaff({
			nameOfStaff: p.nameOfStaff,
			phone: p.phone,
			dob: new Date(p.dob).toISOString().slice(0, 10),
			dateEmployed: new Date(p.dateEmployed).toISOString().slice(0, 10),
			qualification: p.qualification,
			guarantorOne: p.guarantorOne,
			guarantorOnePhone: p.guarantorOnePhone,
			guarantorTwo: p.guarantorTwo,
			guarantorTwoPhone: p.guarantorTwoPhone,
			id: p.id,
		});
		setShow(!show);
		//setDisabled(!disabled);
	};

	const handleUpdate = async (e) => {
		console.log(staff);
		if (staff.nameOfStaff !== '') {
			try {
				const results = await axios.put(apiUrl + '/setup/staff', staff);
				if (results.status !== 200) {
					return Swal.fire(
						'OOPS !',
						'Submission Failed ! Check Entries and try again !',
						'error'
					);
				} else {
					Swal.fire('Success', 'Staff Updated Successfully', 'success');
					setStaff({
						nameOfStaff: '',
						phone: '',
						dob: '',
						dateEmployed: '',
						qualification: '',
						guarantorOne: '',
						guarantorOnePhone: '',
						guarantorTwo: '',
						guarantorTwoPhone: '',
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
		if (staff.nameOfStaff !== '') {
			try {
				const results = await axios.delete(apiUrl + '/setup/staff/' + staff.id);
				if (results.status !== 200) {
					return Swal.fire(
						'OOPS !',
						'Submission Failed ! Check Entries and try again !',
						'error'
					);
				} else {
					Swal.fire('Success', 'Staff Deleted Successfully', 'success');
					setStaff({
						nameOfStaff: '',
						phone: '',
						dob: '',
						dateEmployed: '',
						qualification: '',
						guarantorOne: '',
						guarantorOnePhone: '',
						guarantorTwo: '',
						guarantorTwoPhone: '',
					});
					setEditMode(false);
					setRender(!render);
				}
			} catch (err) {
				Swal.fire('OOPS ! ' + err.message, 'error');
			}
		} else {
			return Swal.fire('OOPS', 'Select a Staff !', 'error');
		}
	};

	const dataTouse = search.length === 0 ? staffData : data.sStaff;
	return (
		<div className="col-sm-12 mt-3">
			<h1 className="centertext">Staff Details</h1>
			<p className="staffp">
				People and their behaviors are what deliver results to your
				organization. Not systems, not processes, not computers, not machines.{' '}
				<br />
				"Mark Hortsman"
			</p>

			<div className="centreStaff row ">
				<div className="table-responsive">
					<CButton
						type="submit"
						className="btn btn-success btn-block col-sm-3 float-right btn-sm"
						onClick={() => setShow(!show)}
					>
						Enter New Staff
					</CButton>
					<CInput
						className="mt-3 mb-3 col-4"
						type="text"
						placeholder="Search with Staff Name or Phone"
						onChange={handleSearch}
					/>
					<Table>
						<thead>
							<tr className="fs-sm">
								<th></th>
								<th>Name</th>
								<th>Date of Birth</th>
								<th>Phone</th>
								<th>Qualification</th>

								<th className="hidden-sm-down">Date Employed</th>
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
									<td>{moment(s.dob).format('DD-MMMM-YYYY')}</td>
									<td>{s.phone}</td>
									<td>{s.qualification}</td>
									<td>{moment(s.dateEmployed).format('DD-MMMM-YYYY')}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>

				<CModal
					show={show}
					onClose={() => {
						setShow(!show);
					}}
					color="success"
					size="lg"
				>
					<CModalHeader closeButton>
						<CModalTitle>STAFF MGT | ADD STAFF </CModalTitle>
					</CModalHeader>
					<CModalBody>
						<CFormGroup>
							<CInputGroup className="mt-3">
								<CLabel htmlFor="fullName" className="form-Label col-sm-3">
									Staff Name
								</CLabel>
								<CInput
									type="text"
									className="form-control col-sm-8"
									id="fullName"
									value={staff.nameOfStaff}
									onChange={(e) =>
										setStaff({
											...staff,
											nameOfStaff: e.currentTarget.value,
										})
									}
								/>
							</CInputGroup>
							<CInputGroup className="mt-3">
								<CLabel htmlFor="dob" className="form-label col-sm-3">
									Date of Birth
								</CLabel>
								<CInput
									type="date"
									className="form-control col-sm-8"
									id="dob"
									value={staff.dob}
									onChange={(e) =>
										setStaff({
											...staff,
											dob: e.currentTarget.value,
										})
									}
								/>
							</CInputGroup>
							<CInputGroup className="mt-3">
								<CLabel htmlFor="appdate" className="form-label col-sm-3">
									Appointment Date
								</CLabel>
								<CInput
									type="date"
									className="form-control col-sm-8"
									id="appdate"
									value={staff.dateEmployed}
									onChange={(e) =>
										setStaff({
											...staff,
											dateEmployed: e.currentTarget.value,
										})
									}
								/>
							</CInputGroup>

							<CInputGroup className="mt-3">
								<CLabel htmlFor="phone" className="form-label col-sm-3">
									Phone Number
								</CLabel>
								<CInput
									type="text"
									className="form-control col-sm-8"
									id="phone"
									value={staff.phone}
									onChange={(e) =>
										setStaff({
											...staff,
											phone: e.currentTarget.value,
										})
									}
								/>
							</CInputGroup>
							<CInputGroup className="mt-3">
								<CLabel htmlFor="qualification" className="form-label col-sm-3">
									Qualification
								</CLabel>
								<CInput
									type="text"
									className="form-control col-sm-8"
									id="qualification"
									value={staff.qualification}
									onChange={(e) =>
										setStaff({
											...staff,
											qualification: e.currentTarget.value,
										})
									}
								/>
							</CInputGroup>
							<CInputGroup className="mt-3">
								<CLabel htmlFor="guarantor" className="form-label col-sm-3">
									Guarantor 1
								</CLabel>
								<CInput
									type="text"
									className="form-control col-sm-8"
									id="guarantor"
									value={staff.guarantorOne}
									onChange={(e) =>
										setStaff({
											...staff,
											guarantorOne: e.currentTarget.value,
										})
									}
								/>
							</CInputGroup>
							<CInputGroup className="mt-3">
								<CLabel
									htmlFor="phoneofgurantor1"
									className="form-label col-sm-3"
								>
									Phone of Guarantor 1
								</CLabel>
								<CInput
									type="text"
									className="form-control col-sm-8"
									id="phoneofgurantor1"
									value={staff.guarantorOnePhone}
									onChange={(e) =>
										setStaff({
											...staff,
											guarantorOnePhone: e.currentTarget.value,
										})
									}
								/>
							</CInputGroup>

							<CInputGroup className="mt-3">
								<CLabel htmlFor="guarantor2" className="form-label col-sm-3">
									Guarantor 2
								</CLabel>
								<CInput
									type="text"
									className="form-control col-sm-8"
									id="guarantor2"
									value={staff.guarantorTwo}
									onChange={(e) =>
										setStaff({
											...staff,
											guarantorTwo: e.currentTarget.value,
										})
									}
								/>
							</CInputGroup>

							<CInputGroup className="mt-3">
								<CLabel
									htmlFor="phoneofgurantor2"
									className="form-label col-sm-3"
								>
									Phone of Guarantor 2
								</CLabel>
								<CInput
									type="text"
									className="form-control col-sm-8"
									id="phoneofgurantor2"
									value={staff.guarantorTwoPhone}
									onChange={(e) =>
										setStaff({
											...staff,
											guarantorTwoPhone: e.currentTarget.value,
										})
									}
								/>
							</CInputGroup>

							<div className="d-flex justify-content-center mt-3 mb-3">
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
						</CFormGroup>
					</CModalBody>
				</CModal>
			</div>
		</div>
	);
};

export default Staff;
