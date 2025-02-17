import React, { useState, useEffect } from 'react';
import { Link, useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl, reportUrl } from '../../config.json';
import auth from '../../components/services/authService';
import Joi from 'joi-browser';
import Swal from 'sweetalert2';
import formData from 'form-data';

//import '../../table.css'

//import Pagination from '../pagination'
//import { paginate } from '../paginate'

//import { ComponentToPrint } from "./ComponentToPrint";
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
	ButtonDropdowns,
	//CForm,
	CDropdownDivider,
	CInputCheckbox,
	CLink,
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

import CustomerView from './customerView';

const CustomerList = () => {
	const [image, setImage] = useState(null);
	const [display, setDisplay] = useState(null);
	const [allStaff, setAllStaff] = useState([]);
	const [user, setUser] = useState({});
	const [staffData, setStaffData] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [search, setSearch] = useState('');
	const [show, setShow] = useState(false);
	const [showReassign, setShowReassign] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [associationData, setAssociationData] = useState([]);
	const [pageSize, setPageSize] = useState(15);
	const [currentPage, setCurrentPage] = useState(1);
	const [buffer, setBuffer] = useState('');
	const [imageChanged, setImageChanged] = useState(false);
	const [render, setRender] = useState(false);
	const [reAssignment, setReAssignment] = useState({
		customer: '',
		officer: '',
		reason: '',
	});
	const handleClose = () => {
		setShow(false);
	};
	const handleShow = () => setShow(true);

	const [groups, setGroups] = useState([]);
	const [customer, setCustomer] = useState({
		fullName: '',
		dob: '',
		phone: '',
		hometown: '',
		placeOfBirth: '',
		occupation: '',
		nationality: '',
		gender: 'Male',
		residentialAddress: '',
		ghanaPostGPS: '',
		directions: '',
		idType: 'National ID',
		idNumber: '',
		marritalStatus: 'Single',
		nameOfSpouse: '',
		phoneOfSpouse: '',
		occupationOfSpouse: '',
		religion: 'N/A',
		placeOfWorship: '',
		leaderOfPlaceOfWorship: '',
		phoneOfPlaceOfWorship: '',
		assignedOfficer: '',
		association: '',
	});
	let navigate = useHistory();
	useEffect(() => {
		const getIsAdmin = () => {
			setUser(auth.getCurrentUser);
		};
		getIsAdmin();
	}, []);
	useEffect(() => {
		async function getAssociations() {
			const results = await axios.get(apiUrl + '/setup/association');
			setAssociationData(results.data);
		}
		getAssociations();
	}, [render]);

	useEffect(() => {
		async function getStaff() {
			const staff = await axios.get(apiUrl + '/setup/staff');
			setAllStaff(staff.data);
		}
		getStaff();
	}, [render]);

	const schemaMap = {
		fullName: Joi.string().required().label('Name'),
		dob: Joi.string().required().label('Date of Birth'),
		phone: Joi.string().required().label('Phone Number'),
		hometown: Joi.string().allow(''),
		placeOfBirth: Joi.string().allow(''),
		occupation: Joi.string().allow(''),
		nationality: Joi.string().allow(''),
		gender: Joi.string().required().label('Gender'),
		residentialAddress: Joi.string().allow(''),
		ghanaPostGPS: Joi.string().required().label('GPS Address'),
		directions: Joi.string().allow(''),
		idType: Joi.string().required().label('ID Type'),
		idNumber: Joi.string().required().label('ID Number'),
		marritalStatus: Joi.string().allow(''),
		nameOfSpouse: Joi.string().allow(''),
		phoneOfSpouse: Joi.string().allow(''),
		occupationOfSpouse: Joi.string().allow(''),
		religion: Joi.string().allow(''),
		placeOfWorship: Joi.string().allow(''),
		leaderOfPlaceOfWorship: Joi.string().allow(''),
		phoneOfPlaceOfWorship: Joi.string().allow(''),
		assignedOfficer: Joi.number()
			.integer()
			.min(0)
			.required()
			.label('Assigned Officer'),
		association: Joi.number().integer().allow(null),
		id: Joi.any().allow(),
	};

	const onImageChange = (event) => {
		setImageChanged(true);
		if (event.target.files && event.target.files[0]) {
			setImage(event.target.files[0]);
			setDisplay(URL.createObjectURL(event.target.files[0]));
		}
	};

	const schema = Joi.object(schemaMap);
	const validateForm = () => {
		const result = Joi.validate(customer, schema);
		if (result.error) {
			console.log(result.error);
			return result.error.details[0].message;
		} else {
			return null;
		}
	};

	const onSubmit = (e) => {
		console.log(customer);
		e.preventDefault();
		if (image === null) return Swal.fire('OOPS', 'Image is Required', 'error');
		const validate = validateForm();
		if (validate !== null) {
			return Swal.fire('OOPS', validate, 'error');
		}
		try {
			const fd = new formData();
			fd.append('img', image);
			fd.append('fullName', customer.fullName);
			fd.append('dob', customer.dob);
			fd.append('phone', customer.phone);
			fd.append('hometown', customer.hometown);
			fd.append('placeOfBirth', customer.placeOfBirth);
			fd.append('occupation', customer.occupation);
			fd.append('nationality', customer.nationality);
			fd.append('gender', customer.gender);
			fd.append('residentialAddress', customer.residentialAddress);
			fd.append('ghanaPostGPS', customer.ghanaPostGPS);
			fd.append('directions', customer.directions);
			fd.append('idType', customer.idType);
			fd.append('idNumber', customer.idNumber);
			fd.append('marritalStatus', customer.marritalStatus);
			fd.append('nameOfSpouse', customer.nameOfSpouse);
			fd.append('phoneOfSpouse', customer.phoneOfSpouse);
			fd.append('occupationOfSpouse', customer.occupationOfSpouse);
			fd.append('religion', customer.religion);
			fd.append('placeOfWorship', customer.placeOfWorship);
			fd.append('leaderOfPlaceOfWorship', customer.leaderOfPlaceOfWorship);
			fd.append('phoneOfPlaceOfWorship', customer.phoneOfPlaceOfWorship);
			fd.append('assignedOfficer', customer.assignedOfficer);
			fd.append('association', customer.association);

			//fd.append('createdBy', 1)

			/* for (let [key, value] of fd.entries()) {
        console.log(key, value)
      }*/

			axios
				.post(apiUrl + '/customer', fd, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				})
				.then((res) => {
					Swal.fire(
						'Success',
						'Customer Details Submitted Successfully',
						'success'
					);
					setCustomer({
						fullName: '',
						dob: '',
						phone: '',
						hometown: '',
						placeOfBirth: '',
						occupation: '',
						nationality: '',
						gender: '',
						residentialAddress: '',
						ghanaPostGPS: '',
						directions: '',
						idType: '',
						idNumber: '',

						marritalStatus: '',
						nameOfSpouse: '',
						phoneOfSpouse: '',
						occupationOfSpouse: '',
						religion: '',
						placeOfWorship: '',
						leaderOfPlaceOfWorship: '',
						phoneOfPlaceOfWorship: '',
						assignedOfficer: 0,
						association: 0,
					});
					setDisplay(null);
					setRender(!render);
				})
				.catch((err) => {
					console.log(err.message);
					Swal.fire('OOPS ! ', ' [ Customer Details Not Saved]', 'error');
				});
		} catch (ex) {
			console.log(ex.message);
			return Swal.fire(
				'Warning',
				'OOPS',
				ex + '  [ Customer Details Not Saved, Please Review Entries]',
				'error'
			);
		}
	};

	const onUpdate = (e) => {
		e.preventDefault();
		if (image === null) return Swal.fire('OOPS', 'Image is Required', 'error');
		const validate = validateForm();
		if (validate !== null) {
			return Swal.fire('OOPS', validate, 'error');
		}
		try {
			const fd = new formData();
			fd.append('id', customer.id);
			fd.append('fullName', customer.fullName);
			fd.append('img', image);
			fd.append('dob', customer.dob);
			fd.append('phone', customer.phone);
			fd.append('hometown', customer.hometown);
			fd.append('placeOfBirth', customer.placeOfBirth);
			fd.append('nationality', customer.nationality);
			fd.append('occupation', customer.occupation);
			fd.append('gender', customer.gender);
			fd.append('residentialAddress', customer.residentialAddress);
			fd.append('ghanaPostGPS', customer.ghanaPostGPS);
			fd.append('directions', customer.directions);
			fd.append('idType', customer.idType);
			fd.append('idNumber', customer.idNumber);
			fd.append('marritalStatus', customer.marritalStatus);
			fd.append('nameOfSpouse', customer.nameOfSpouse);
			fd.append('phoneOfSpouse', customer.phoneOfSpouse);
			fd.append('occupationOfSpouse', customer.occupationOfSpouse);
			fd.append('religion', customer.religion);
			fd.append('placeOfWorship', customer.placeOfWorship);
			fd.append('leaderOfPlaceOfWorship', customer.leaderOfPlaceOfWorship);
			fd.append('phoneOfPlaceOfWorship', customer.phoneOfPlaceOfWorship);
			fd.append('assignedOfficer', customer.assignedOfficer);
			fd.append('association', customer.association);
			//fd.append('createdBy', 1)

			/*for (let [key, value] of fd.entries()) {
        console.log(key, value)
      }*/

			imageChanged
				? axios
						.put(apiUrl + '/customer', fd, {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
							},
						})
						.then((res) => {
							//console.log(res)
							Swal.fire(
								'Success',
								'Customer Details Updated Successfully',
								'success'
							);
							setCustomer({
								fullName: '',
								dob: '',
								phone: '',
								hometown: '',
								placeOfBirth: '',
								occupation: '',
								nationality: '',
								gender: '',
								residentialAddress: '',
								ghanaPostGPS: '',
								directions: '',
								idType: '',
								idNumber: '',

								marritalStatus: '',
								nameOfSpouse: '',
								phoneOfSpouse: '',
								occupationOfSpouse: '',
								religion: '',
								placeOfWorship: '',
								leaderOfPlaceOfWorship: '',
								phoneOfPlaceOfWorship: '',
								assignedOfficer: '',
								association: 0,
							});
							setDisplay(null);
							//setImage(null)
							//setBuffer(null)
							setIsUpdate(!isUpdate);
							setImageChanged(false);
							setRender(!render);
							setShow(!show);
						})
				: axios
						.put(apiUrl + '/customer/noimg', customer)

						.then((res) => {
							console.log(res);
							Swal.fire(
								'Success',
								'Customer Details Updated Successfully',
								'success'
							);
							setCustomer({
								fullName: '',
								dob: '',
								phone: '',
								hometown: '',
								placeOfBirth: '',
								occupation: '',
								nationality: '',
								gender: '',
								residentialAddress: '',
								ghanaPostGPS: '',
								directions: '',
								idType: '',
								idNumber: '',

								marritalStatus: '',
								nameOfSpouse: '',
								phoneOfSpouse: '',
								occupationOfSpouse: '',
								religion: '',
								placeOfWorship: '',
								leaderOfPlaceOfWorship: '',
								phoneOfPlaceOfWorship: '',
								assignedOfficer: '',
								association: 0,
							});
							setDisplay(null);
							//setImage(null)
							//setBuffer(null)
							setIsUpdate(!isUpdate);
							setImageChanged(false);
							setRender(!render);
							setShow(!show);
						})
						.catch((err) => {
							Swal.fire(
								'OOPS ! ' + err.message + '  [ Customer Details Not Saved]',
								'error'
							);
						});
		} catch (ex) {
			return Swal.fire('OOPS', ex + '  [ Customer Details Not Saved]', 'error');
		}
	};

	useEffect(() => {
		async function getStaff() {
			const results = await axios.get(apiUrl + '/setup/staff');
			setStaffData(results.data);
		}
		getStaff();
	}, [staffData]);

	useEffect(() => {
		async function getCustomers() {
			const results = await axios.get(apiUrl + '/customer');
			setCustomers(results.data);
		}
		getCustomers();
	}, [render]);

	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	/*let customersList = customers.find(
          (o) => o.fullName.toLowerCase() === search.toLowerCase()
        );*/

	//console.log(customersList);
	//const allCustomers = paginate(customers, currentPage, pageSize)

	const data = {
		scustomers: customers.filter((item) =>
			item.fullName.toLowerCase().includes(search.toLowerCase())
		),
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const dataTouse = search.length === 0 ? customers : data.scustomers;

	const customerRegistration = () => {
		handleClearingObject();
		setIsUpdate(false);
		setShow(!show);
	};

	const customerView = (s) => {
		setCustomer(s);
		setBuffer(s.img.data);
		setShow(true);
		//console.log(s)
	};

	//const allCustomers = paginate(customers, currentPage, pageSize);
	const bb = Buffer.from(buffer).toString('base64');
	// const bbuffer = Buffer.from(buffer).toString('base64')

	const openCustomerListAsReport = (url) => {
		const windowFeatures = 'left=100,top=100,width=320,height=320';
		window.open(url, 'customerlist', 'popup', windowFeatures);
	};

	const showCustomerForEdit = (c) => {
		setCustomer({
			...customer,
			fullName: c.fullName,
			dob: c.dob,
			phone: c.phone,
			hometown: c.hometown,
			placeOfBirth: c.placeOfBirth,
			occupation: c.occupation,
			nationality: c.nationality,
			gender: c.gender,
			residentialAddress: c.residentialAddress,
			ghanaPostGPS: c.ghanaPostGPS,
			directions: c.directions,
			idType: c.idType,
			idNumber: c.idNumber,
			marritalStatus: c.marritalStatus,
			nameOfSpouse: c.nameOfSpouse,
			phoneOfSpouse: c.phoneOfSpouse,
			occupationOfSpouse: c.occupationOfSpouse,
			religion: c.religion,
			placeOfWorship: c.placeOfWorship,
			leaderOfPlaceOfWorship: c.leaderOfPlaceOfWorship,
			phoneOfPlaceOfWorship: c.phoneOfPlaceOfWorship,
			assignedOfficer: c.assignedOfficer,
			association: c.association,
			id: c.id,
		});
		// setDisplay(URL.createObjectURL(c.image))
		setImage(c.img);
		setBuffer(c.img.data);
		setIsUpdate(true);
		setShow(!show);
	};

	const SubmitReassignment = async () => {
		const results = await axios.post(
			apiUrl + '/customer/assignOfficer',
			reAssignment
		);
		// console.log(reAssignment)
		if (results.status === 200) {
			setRender(!render);

			return Swal.fire(
				'Success',
				'Customer Re-assigned Successfully',
				'success'
			);
		}
		return Swal.fire('Failed', 'Customer Re-assigned Failed', 'error');
	};

	const handleClearingObject = () => {
		setCustomer({
			fullName: '',
			dob: '',
			phone: '',
			hometown: '',
			placeOfBirth: '',
			occupation: '',
			nationality: '',
			gender: 'Male',
			residentialAddress: '',
			ghanaPostGPS: '',
			directions: '',
			idType: 'National ID',
			idNumber: '',
			marritalStatus: 'Single',
			nameOfSpouse: '',
			phoneOfSpouse: '',
			occupationOfSpouse: '',
			religion: 'N/A',
			placeOfWorship: '',
			leaderOfPlaceOfWorship: '',
			phoneOfPlaceOfWorship: '',
			assignedOfficer: 0,
			association: 0,
		});
		setDisplay(null);
		setImage(null);
		//setBuffer(null)
		setRender(!render);
	};
	return (
		<div>
			<div className="col-sm-12 mt-3">
				<div className="table-responsive">
					<CButton
						type="submit"
						className="btn btn-success btn-block col-sm-3 float-right btn-sm"
						onClick={customerRegistration}
					>
						+ New Customer
					</CButton>
					<Input
						className="mt-3 mb-3 ms-3 col-sm-4"
						type="text"
						placeholder="Search with Customer Name or Phone"
						onChange={handleSearch}
					/>
					<CLink
						className="btn-block col-sm-4 float-left btn-sm mb-3"
						onClick={() =>
							openCustomerListAsReport(reportUrl + '/CustomerList.aspx')
						}
					>
						View Customers as Report
					</CLink>
					<Table className="table-sm">
						<thead>
							<tr className="fs-sm">
								<th></th>
								<th>Account Number</th>
								<th>Name</th>
								<th>Gender</th>
								<th>Phone</th>

								<th>Officer</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{dataTouse.map((c, index) => (
								<tr
									key={c.id}
									// onClick={() => customerView(c)}
									Style="cursor: pointer;"
								>
									<td>{index + 1}</td>
									<td>{c.accountNumber}</td>
									<td>{c.fullName}</td>
									<td>{c.gender}</td>
									<td>{c.phone}</td>
									<td>{c.nameOfStaff}</td>
									<td>
										<CDropdown className="m-1">
											<CDropdownToggle color="info" size="sm">
												Actions
											</CDropdownToggle>
											<CDropdownMenu size="sm">
												<CDropdownItem
													onClick={() =>
														navigate.push(
															'/customer/viewcustomerdetails/' + c.id
														)
													}
												>
													View Customer Report
												</CDropdownItem>

												<CDropdownDivider />
												<CDropdownItem onClick={() => showCustomerForEdit(c)}>
													Edit Customer
												</CDropdownItem>

												<CDropdownDivider />
												<CDropdownItem
													onClick={() => {
														setCustomer(c);
														setReAssignment({
															...reAssignment,
															customer: c.id,
														});
														setShowReassign(!showReassign);
													}}
												>
													Re-assign To Officer
												</CDropdownItem>
											</CDropdownMenu>
										</CDropdown>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					{/*<Pagination
            itemsCount={customers.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />*/}

					<CModal
						show={show}
						onClose={() => {
							setShow(!show);
							setIsUpdate(false);
						}}
						color="success"
						size="lg"
					>
						<CModalHeader closeButton>
							<CModalTitle>CUSTOMER MGT | ADD CUSTOMER </CModalTitle>
						</CModalHeader>
						<CModalBody>
							<CFormGroup>
								<div className="justify-content-right">
									<CInputGroup>
										<img
											src={
												display === null
													? `data:image/jpeg;base64,${bb}`
													: display
											}
											alt="preview image"
											className="photo m-3 float-right"
											width="80px"
											height="80px"
										/>

										<input
											type="file"
											onChange={onImageChange}
											className="col-sm-6 mt-3 float-right"
											id="group_image"
											name="img"
										/>
									</CInputGroup>
								</div>
								<CInputGroup className="mt-3">
									<CLabel htmlFor="fullName" className="col-sm-3">
										Full Name *
									</CLabel>

									<CInput
										name="fullName"
										type="text"
										className="form-control col-sm-8"
										id="fullName"
										value={customer.fullName}
										onChange={(e) =>
											setCustomer({
												...customer,
												fullName: e.currentTarget.value,
											})
										}
									/>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel htmlFor="hometown" className="col-sm-3">
										Hometown
									</CLabel>
									<CInput
										type="text"
										className="form-control col-sm-8"
										id="hometown"
										value={customer.hometown}
										onChange={(e) =>
											setCustomer({
												...customer,
												hometown: e.currentTarget.value,
											})
										}
									/>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel htmlFor="Dob" className="col-sm-3">
										Date of Birth *
									</CLabel>
									<CInput
										type="date"
										className="form-control col-sm-8"
										id="Dob"
										placeholder="dd-mm-yyyy"
										min="1940-01-01"
										value={customer.dob}
										onChange={(e) =>
											setCustomer({
												...customer,
												dob: e.currentTarget.value,
											})
										}
									/>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel
										htmlFor="placeofbirth"
										className="form-label col-sm-3"
									>
										Place of Birth
									</CLabel>
									<input
										type="text"
										className="form-control col-sm-8"
										id="placeofBirth"
										value={customer.placeOfBirth}
										onChange={(e) =>
											setCustomer({
												...customer,
												placeOfBirth: e.currentTarget.value,
											})
										}
									/>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel htmlFor="occupation" className="form-label col-sm-3">
										Occupation *
									</CLabel>
									<CInput
										type="text"
										className="form-control col-sm-8"
										id="occupation"
										value={customer.occupation}
										onChange={(e) =>
											setCustomer({
												...customer,
												occupation: e.currentTarget.value,
											})
										}
									/>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel htmlFor="phone" className="form-label col-sm-3">
										Phone *
									</CLabel>
									<CInput
										type="text"
										className="form-control col-sm-4"
										id="Phone"
										value={customer.phone}
										onChange={(e) =>
											setCustomer({
												...customer,
												phone: e.currentTarget.value,
											})
										}
									/>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel htmlFor="nationality" className="form-label col-sm-3">
										Nationality
									</CLabel>
									<input
										type="text"
										className="form-control col-sm-8"
										id="nationality"
										value={customer.nationality}
										onChange={(e) =>
											setCustomer({
												...customer,
												nationality: e.currentTarget.value,
											})
										}
									/>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel htmlFor="gender" className="form-label col-sm-3">
										Gender *
									</CLabel>
									<CSelect
										className="form-select col-sm-4"
										aria-label="Default select example"
										value={customer.gender}
										onChange={(e) =>
											setCustomer({
												...customer,
												gender: e.currentTarget.value,
											})
										}
									>
										<option defaultValue="Male">Male</option>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
									</CSelect>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel htmlFor="resaddress" className="form-label col-sm-3">
										Residential Address *
									</CLabel>
									<CInput
										type="text"
										className="form-control col-sm-8"
										id="resaddress"
										value={customer.residentialAddress}
										onChange={(e) =>
											setCustomer({
												...customer,
												residentialAddress: e.currentTarget.value,
											})
										}
									/>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel htmlFor="gps" className="form-label col-sm-3">
										Ghana Post GPS *
									</CLabel>
									<CInput
										type="text"
										value={customer.ghanaPostGPS}
										className="form-control col-sm-4"
										id="gps"
										onChange={(e) =>
											setCustomer({
												...customer,
												ghanaPostGPS: e.currentTarget.value,
											})
										}
									/>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel htmlFor="suburb" className="form-label col-sm-3">
										Suburb / Land Mark / Directions
									</CLabel>
									<CInput
										type="text"
										value={customer.directions}
										className="form-control col-sm-8"
										id="suburb"
										onChange={(e) =>
											setCustomer({
												...customer,
												directions: e.currentTarget.value,
											})
										}
									/>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel htmlFor="idType" className="form-label col-sm-3">
										ID Type *
									</CLabel>
									<CSelect
										className="form-select col-sm-4"
										aria-label="Default select example"
										value={customer.idType}
										onChange={(e) =>
											setCustomer({
												...customer,
												idType: e.currentTarget.value,
											})
										}
									>
										<option defaultValue="National ID">National ID</option>
										<option value="National ID">National ID</option>
										{/*<option value="Voter ID">Voter ID</option>
                    <option value="Driver's License">Driver's License</option>
                  <option value="Passport">Passport</option>*/}
									</CSelect>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel htmlFor="idNumber" className="form-label col-sm-3">
										ID Number *
									</CLabel>
									<CInput
										type="text"
										value={customer.idNumber}
										className="form-control col-sm-8"
										id="idNumber"
										onChange={(e) =>
											setCustomer({
												...customer,
												idNumber: e.currentTarget.value,
											})
										}
									/>
								</CInputGroup>
								{/* <CInputGroup className="mt-3">
                  <CLabel htmlFor="tin" className="form-label col-sm-3">
                    TIN *
                  </CLabel>
                  <CInput
                    type="text"
                    value={customer.idNumber}
                    className="form-control col-sm-8"
                    id="tin"
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        tinNumber: e.currentTarget.value,
                      })
                    }
                  />
                  </CInputGroup>*/}
								<CInputGroup className="mt-3">
									<label htmlFor="married" className="form-label col-sm-3">
										Marrital Status
									</label>
									<CSelect
										className="form-select col-sm-4"
										aria-label="Default select example"
										value={customer.marritalStatus}
										onChange={(e) =>
											setCustomer({
												...customer,
												marritalStatus: e.currentTarget.value,
											})
										}
									>
										<option defaultValue="Single">Single</option>
										<option value="Married">Married</option>
										<option value="Single">Single</option>
										<option value="Divorced">Divorced</option>
										<option value="Widowed">Widowed</option>
									</CSelect>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel
										htmlFor="nameofspouse"
										className="form-label col-sm-3"
									>
										Name of Spouse
									</CLabel>
									<input
										type="text"
										className="form-control col-sm-8"
										id="nameofspouse"
										value={customer.nameOfSpouse}
										onChange={(e) =>
											setCustomer({
												...customer,
												nameOfSpouse: e.currentTarget.value,
											})
										}
									/>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel
										htmlFor="phoneofspouse"
										className="form-label col-sm-3"
									>
										Phone of Spouse
									</CLabel>
									<input
										type="text"
										className="form-control col-sm-4"
										id="phoneofspouse"
										value={customer.phoneOfSpouse}
										onChange={(e) =>
											setCustomer({
												...customer,
												phoneOfSpouse: e.currentTarget.value,
											})
										}
									/>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel
										htmlFor="occupationofspouse"
										className="form-label col-sm-3"
									>
										Occu. Spouse
									</CLabel>
									<CInput
										type="text"
										className="form-control col-sm-8"
										id="occupationofspouse"
										value={customer.occupationOfSpouse}
										onChange={(e) =>
											setCustomer({
												...customer,
												occupationOfSpouse: e.currentTarget.value,
											})
										}
									/>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel htmlFor="religion" className="form-label col-sm-3">
										Religion
									</CLabel>
									<CSelect
										className="form-select col-sm-8"
										aria-label="Default select example"
										value={customer.religion}
										onChange={(e) =>
											setCustomer({
												...customer,
												religion: e.currentTarget.value,
											})
										}
									>
										<option defaultValue="N/A">N/A</option>
										<option value="Christian">Christian</option>
										<option value="Muslim">Muslim</option>
										<option value="Traditionalist">Traditionalist</option>
										<option value="Other">Other</option>
									</CSelect>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel
										htmlFor="placeofworship"
										className="form-label col-sm-3"
									>
										Place of Worship
									</CLabel>
									<CInput
										type="text"
										value={customer.placeOfWorship}
										className="form-control col-sm-8"
										id="placeofworship"
										onChange={(e) =>
											setCustomer({
												...customer,
												placeOfWorship: e.currentTarget.value,
											})
										}
									/>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel
										htmlFor="worshipleader"
										className="form-label col-sm-3"
									>
										Leader of Place of Worship
									</CLabel>
									<CInput
										type="text"
										value={customer.leaderOfPlaceOfWorship}
										className="form-control col-sm-8"
										id="worshipleader"
										onChange={(e) => {
											setCustomer({
												...customer,
												leaderOfPlaceOfWorship: e.currentTarget.value,
											});
											console.log(e.currentTarget.value);
										}}
									/>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel
										htmlFor="phoneworship"
										className="form-label col-sm-3"
									>
										Phone, Place of worship
									</CLabel>
									<CInput
										type="text"
										value={customer.phoneOfPlaceOfWorship}
										className="form-control col-sm-4"
										id="phoneworship"
										onChange={(e) => {
											setCustomer({
												...customer,
												phoneOfPlaceOfWorship: e.currentTarget.value,
											});
											console.log(e.currentTarget.value);
										}}
									/>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel
										htmlFor="phoneworship"
										className="form-label col-sm-3"
									>
										Assigned Officer *
									</CLabel>
									<CSelect
										className="form-select col-sm-8"
										aria-label="Default select example"
										value={customer.assignedOfficer}
										onChange={(e) =>
											setCustomer({
												...customer,
												assignedOfficer: e.currentTarget.value,
											})
										}
									>
										<option value="">Officer *</option>
										{staffData.map((s) => (
											<option key={s.id} value={s.id} id={s.id}>
												{s.nameOfStaff}
											</option>
										))}
									</CSelect>
								</CInputGroup>
								<CInputGroup className="mt-3">
									<CLabel
										htmlFor="phoneworship"
										className="form-label col-sm-3"
									>
										Group
									</CLabel>
									<CSelect
										className="form-select col-sm-8"
										aria-label="Default select example"
										value={customer.association}
										onChange={(e) =>
											setCustomer({
												...customer,
												association: e.currentTarget.value,
											})
										}
									>
										<option value="0">N/A</option>
										{associationData.map((s) => (
											<option key={s.id} value={s.id} id={s.id}>
												{s.association}
											</option>
										))}
									</CSelect>
								</CInputGroup>
							</CFormGroup>

							<CButton
								className="btn-sm col-sm-2 m-3 float-right"
								type="submit"
								onClick={() => {
									setShow(!show);
									//setIsUpdate(!isUpdate)
								}}
								color="danger"
							>
								Close
							</CButton>

							<CButton
								className="btn-sm col-sm-2 m-3 float-right"
								type="submit"
								onClick={isUpdate ? onUpdate : onSubmit}
								color="success"
							>
								{isUpdate ? 'Update' : 'Submit'}
							</CButton>
						</CModalBody>
					</CModal>

					<CModal
						show={showReassign}
						onClose={() => {
							setShowReassign(!showReassign);
						}}
						color="info"
						size="md"
					>
						<CModalHeader closeButton>
							<CModalTitle>CUSTOMER MGT | RE-ASSIGN TO OFFICER</CModalTitle>
						</CModalHeader>
						<CModalBody>
							<CInputGroup className="mt-3">
								<CLabel htmlFor="phoneworship" className="form-label col-sm-3">
									Customer
								</CLabel>
								<CInput
									type="text"
									value={customer.fullName}
									className="form-control col-sm-10"
									id="phoneworship"
									onChange={null}
								/>
							</CInputGroup>
							<CInputGroup className="mt-3">
								<CLabel htmlFor="phoneworship" className="form-label col-sm-3">
									Officer *
								</CLabel>
								<CSelect
									className="form-select col-sm-10"
									aria-label="Default select example"
									value={reAssignment.officer}
									onChange={(e) =>
										setReAssignment({
											...reAssignment,
											officer: e.currentTarget.value,
										})
									}
								>
									<option value="">Officer *</option>
									{staffData.map((s) => (
										<option key={s.id} value={s.id} id={s.id}>
											{s.nameOfStaff}
										</option>
									))}
								</CSelect>
							</CInputGroup>

							<CInputGroup className="mt-3">
								<CLabel htmlFor="reason" className="form-label col-sm-3">
									Reason
								</CLabel>
								<CInput
									type="textarea"
									value={reAssignment.reason}
									className="form-control col-sm-10"
									id="reason"
									onChange={(e) =>
										setReAssignment({
											...reAssignment,
											reason: e.currentTarget.value,
										})
									}
								/>
							</CInputGroup>
							<CButton
								className="btn-sm col-sm-4 m-3 float-right"
								type="submit"
								onClick={SubmitReassignment}
								color="info"
							>
								Re-assign
							</CButton>
						</CModalBody>
					</CModal>
				</div>
			</div>
		</div>
	);
};

//  <td>{moment(s.startDate).format("DD,MMMM,YYYY")}</td>
export default CustomerList;
