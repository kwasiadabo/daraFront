import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Joi from 'joi-browser';
import CurrencyFormat from 'react-currency-format';
import Swal from 'sweetalert2';
import auth from '../../components/services/authService';
import { apiUrl } from '../../config.json';
import { reportUrl } from '../../config.json';
import AdaboSelect from 'react-select';
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
	CLink,
} from '@coreui/react';

const Disbursement = () => {
	const [show, setShow] = useState(false);
	const [render, setRender] = useState(false);
	const [customers, setCustomers] = useState([]);
	const [search, setSearch] = useState('');
	const [applicant, setApplicant] = useState({});
	const [buffer, setBuffer] = useState('');
	const [banks, setBanks] = useState([]);
	const [bankAccounts, setBankAccounts] = useState([]);
	const [unDisbursed, setUnDisbursed] = useState([]);
	const [data, setData] = useState({});
	const [regShow, setRegShow] = useState(false);
	const [colShow, setColShow] = useState(false);
	const [issuedCheques, setIssuedCheques] = useState([]);
	const [registrationFees, setRegistrationFees] = useState([]);
	const [disbursed, setDisbursed] = useState([]);
	const [cashCollateral, setCashCollateral] = useState([]);
	const [disburseData, setDisburseData] = useState({
		chequeId: 0,
		disbursedBy: 0,
		amount: 0,
		customer: 0,
	});
	const [editMode, setEditMode] = useState(false);
	const [collateralBal, setCollateralBal] = useState(0);
	const [regFeeData, setRegFeeData] = useState({
		customer: 0,
		chequeId: 0,
		modeOfPayment: '',
		amount: '',
		sending: '',
		receiving: '',
	});
	const [startDate, setStartDate] = useState(
		new Date().toISOString().slice(0, 10)
	);
	const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

	const [regFeeDataEdit, setRegFeeDataEdit] = useState({
		customer: 0,
		chequeId: 0,
		modeOfPayment: '',
		amount: '',
		sending: '',
		receiving: '',
		id: 0,
	});
	const [checkRegFee, setCheckRegFee] = useState({
		id: 0,
		chequeId: 0,
		customer: 0,
		amount: 0,
	});
	const [checkCashCollateral, setCheckCashCollateral] = useState(0);

	const [cashCollateralData, setCashCollateralData] = useState({
		customer: 0,
		chequeId: 0,
		amount: '',
		modeOfPayment: '',
		sending: '',
		receiving: '',
	});

	const [disburseDate, setDisburseDate] = useState({
		startdate: new Date().toISOString().slice(0, 10),
		enddate: new Date().toISOString().slice(0, 10),
	});
	const user = auth.getCurrentUser();

	let formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'GHS',

		// These options are needed to round to whole numbers if that's what you want.
		//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
		//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	});

	useEffect(() => {
		async function getUndisbursedCheques() {
			const results = await axios.get(
				apiUrl + '/loan/issuedloancheques/undisbursed'
			);
			setUnDisbursed(results.data);
		}
		getUndisbursedCheques();
		//console.log(unDisbursed)
	}, [render]);

	useEffect(() => {
		async function getDisbursedCheques() {
			const results = await axios.get(
				apiUrl + '/loan/disburse/' + startDate + '/' + endDate
			);
			setDisbursed(results.data);
		}
		getDisbursedCheques();
		//console.log(disbursed)
	}, [startDate, endDate, render]);

	useEffect(() => {
		async function getRegistrationFees() {
			const results = await axios.get(apiUrl + '/loan/registrationfee');
			setRegistrationFees(results.data);
		}
		getRegistrationFees();
		// console.log(registrationFees)
	}, [render]);

	useEffect(() => {
		async function getCashCollateral() {
			const results = await axios.get(apiUrl + '/loan/cashcollateral');
			setCashCollateral(results.data);
		}
		getCashCollateral();
		//console.log(cashCollateral)
	}, [render]);

	const schemaMap = {
		chequeId: Joi.number().required().label('Cheque Details'),
		disbursedBy: Joi.number().allow(''),
		customer: Joi.number().required().label('Customer'),
		amount: Joi.number().required().label('Amount'),
		modeOfPayment: Joi.string().label('Mode Of Payment'),
		sending: Joi.string().allow(''),
		receiving: Joi.string().allow(''),
	};
	const schema = Joi.object(schemaMap);

	const validateForm = () => {
		const result = Joi.validate(disburseData, schema);
		if (result.error) {
			return result.error.details[0].message;
		} else {
			return null;
		}
	};
	const handleStartDateChange = (e) => {
		setStartDate(e.currentTarget.value);
	};
	const handleEndDateChange = (e) => {
		setEndDate(e.currentTarget.value);
	};
	const handleSubmit = async () => {
		const reg = registrationFees.filter(
			(r) =>
				r.customer === disburseData.customer &&
				r.chequeId === disburseData.chequeId
		);

		if (reg.length === 0)
			return Swal.fire(
				'Registration Fee',
				'Customer has NOT paid registration fee',
				'error'
			);

		const cashCol = cashCollateral.filter(
			(c) =>
				c.customer === disburseData.customer &&
				c.chequeId === disburseData.chequeId
		);

		if (cashCol.length === 0)
			return Swal.fire(
				'Cash Collateral',
				'Customer has NOT paid Cash Collateral',
				'error'
			);

		const validate = validateForm();
		if (validate !== null) {
			return Swal.fire('Validation', validate, 'error');
		}
		try {
			const results = await axios.post(apiUrl + '/loan/disburse', disburseData);
			if (results.status !== 200) {
				return Swal.fire(
					'OOPs !',
					'Submission Failed ! Check Entries and try again !',
					'error'
				);
			} else {
				Swal.fire('Good job!', 'Cheque Disbursed Successfully', 'success');
				setRender(!render);
				setDisburseData({
					chequeId: 0,
					disbursedBy: 0,
					amount: '',
					sending: '',
					receiving: '',
				});
				setShow(!show);
				setRender(!render);
			}
		} catch (err) {
			Swal.fire('OOPS ! ' + err.message, 'error');
		}
	};

	const handleRegFeeSubmit = async () => {
		console.log(regFeeData);
		/* const validate = validateForm()
    if (validate !== null) {
      return Swal.fire('Validation', validate, 'error')
    }*/
		try {
			const results = await axios.post(
				apiUrl + '/loan/registrationfee',
				regFeeData
			);
			if (results.status !== 200) {
				return Swal.fire(
					'OOPs !',
					'Submission Failed ! Check Entries and try again !',
					'error'
				);
			} else {
				Swal.fire(
					'Good job!',
					'Registration Fee Saved Successfully',
					'success'
				);
				setRender(!render);
				setRegFeeData({
					customer: '',
					chequeId: '',
					amount: '',
					sending: '',
					receiving: '',
				});
				setRegShow(!regShow);
				setRender(!render);
			}
		} catch (err) {
			Swal.fire(
				'OOPS ! ',
				err + ' Registration Fee Already Exist for this loan',
				'error'
			);
		}
	};

	const handleRegFeeEdit = async () => {
		console.log(regFeeData);
		const validate = validateForm();
		if (validate !== null) {
			return Swal.fire('Validation', validate, 'error');
		}
		try {
			const results = await axios.put(apiUrl + '/loan/registrationfee', {
				id: regFeeData.id,
				amount: regFeeData.amount,
			});
			if (results.status !== 200) {
				return Swal.fire(
					'OOPs !',
					'Submission Failed ! Check Entries and try again !',
					'error'
				);
			} else {
				Swal.fire(
					'Good job!',
					'Registration Fee Updated Successfully',
					'success'
				);
				setRender(!render);
				setRegFeeData({
					amount: '',
					modeOfPayment: '',
					sending: '',
					receiving: '',
					id: 0,
				});
				setRegShow(!regShow);
				setRender(!render);
				setEditMode(!editMode);
			}
		} catch (err) {
			Swal.fire('OOPS ! ', 'Registration Fee Update Failed', 'error');
		}
	};

	const handleCashCollateralSubmit = async () => {
		/*const validate = validateForm()
    if (validate !== null) {
      return Swal.fire('Validation', validate, 'error')
    }*/
		if (cashCollateralData.modeOfPayment == 'Withdrawal') {
			if (collateralBal <= 0 || cashCollateralData.amount > collateralBal)
				return Swal.fire('OOPS !', 'Insufficient Collateral Balance', 'error');
			await axios.post(apiUrl + '/loan/cashcollateral/withdrawal', {
				amount: cashCollateralData.amount,
				customer: cashCollateralData.customer,
			});
		}
		/* try { */
		console.log(cashCollateralData);
		const results = await axios.post(
			apiUrl + '/loan/cashcollateral',
			cashCollateralData
		);
		if (results.status !== 200) {
			return Swal.fire(
				'OOPs !',
				'Submission Failed ! Check Entries and try again !',
				'error'
			);
		} else {
			Swal.fire('Good job!', 'Cash Collateral Saved Successfully', 'success');
			setRender(!render);
			setCashCollateralData({
				customer: 0,
				chequeId: 0,
				amount: '',
				modeOfPayment: '',
				sending: '',
				receiving: '',
			});
			setColShow(!colShow);
			setRender(!render);
		}
		/* } catch (err) {
      Swal.fire('OOPS ! ', err + ' Cash Collateral NOT Saved', 'error')
    }*/
	};

	const handleCashCollateralEdit = async () => {
		const validate = validateForm();
		if (validate !== null) {
			return Swal.fire('Validation', validate, 'error');
		}
		try {
			const results = await axios.put(apiUrl + '/loan/cashcollateral', {
				id: cashCollateralData.id,
				amount: cashCollateralData.amount,
			});
			if (results.status !== 200) {
				return Swal.fire(
					'OOPs !',
					'Submission Failed ! Check Entries and try again !',
					'error'
				);
			} else {
				Swal.fire(
					'Good job!',
					'Cash Collateral Updated Successfully',
					'success'
				);
				setRender(!render);
				setCashCollateralData({
					amount: '',
					modeOfPayment: '',
					sending: '',
					receiving: '',
				});
				setColShow(!colShow);
				setRender(!render);
				setEditMode(!editMode);
			}
		} catch (err) {
			Swal.fire('OOPS ! ', 'Cash Collateral Update Failed', 'error');
		}
	};

	const handleDelete = (c) => {
		Swal.fire({
			title: 'Do you want to delete this issued Cheque?',
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: 'Yes',
			denyButtonText: `No`,
		}).then(async (result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				await axios.delete(apiUrl + '/loan/issuedloancheques/' + c.id);
				Swal.fire('Deletion Confirmed !', '', 'success');
			} else if (result.isDenied) {
				Swal.fire('Deletion NOT Confirmed', '', 'info');
			}
		});
	};

	const money = new Intl.NumberFormat('de-CH', {
		style: 'currency',
		currency: 'CHF',
	});

	var today = new Date();

	// returns the month (from 0 to 11)
	const month = today.toLocaleString('default', { month: 'long' });

	// returns the day of the month (from 1 to 31)
	const day = today.getDate();

	// returns the year (four digits)
	const year = today.getFullYear();

	function add(accumulator, a) {
		return accumulator + a;
	}

	const totalAmt = disbursed.reduce((a, i) => {
		return a + i.amount;
	}, 0);

	const handleShow = (s) => {
		setData(s);
		setDisburseData({
			...disburseData,
			chequeId: s.id,
			disbursedBy: user.id,
			customer: s.customerId,
			amount: s.amount,
		});

		setShow(!show);
	};

	const handleRegShow = (s) => {
		setData(s);
		setRegFeeData({
			...regFeeData,
			chequeId: s.id,
			customer: s.customerId,
			sending: '',
			receiving: '',
		});
		setRegShow(!regShow);
	};

	const handleRegFeeChange = (e) => {
		setRegFeeData({
			...regFeeData,
			amount: e.currentTarget.value,
		});
	};

	const handleCashCollateralShow = async (s) => {
		console.log(s);
		setData(s);
		setCashCollateralData({
			...cashCollateralData,
			chequeId: s.id,
			customer: s.customerId,
		});

		const collBal = await axios.get(
			apiUrl + '/loan/cashcollateral/' + s.customerId
		);
		// console.log(collBal.data[0].balance)
		setCollateralBal(collBal.data[0].balance);
		setColShow(!colShow);
	};

	const handleCashCollateralChange = (e) => {
		setCashCollateralData({
			...cashCollateralData,
			amount: e.currentTarget.value,
		});
	};

	const checkRegistrationFee = async (s) => {
		setRegFeeData({});
		checkCashCollateralExistence(s);
		const checkReg = await axios.get(
			apiUrl + '/loan/registrationfee/' + s.customerId + '/' + s.id
		);
		if (checkReg.data[0]) {
			setCheckRegFee(checkReg.data[0].id);
		} else return setCheckRegFee(null);
	};

	const checkCashCollateralExistence = async (s) => {
		const checkCollateral = await axios.get(
			apiUrl + '/loan/cashcollateral/' + s.customerId + '/' + s.id
		);
		if (checkCollateral.data[0])
			return setCheckCashCollateral(checkCollateral.data[0].id);
		return setCheckCashCollateral(null);
	};

	const handleRegShowforEdit = async (s) => {
		setData(s);
		const checkReg = await axios.get(
			apiUrl + '/loan/registrationfee/' + s.customerId + '/' + s.id
		);
		//console.log(regFeeData)
		setRegFeeData({
			...regFeeData,
			id: checkReg.data[0].id,
			chequeId: checkReg.data[0].chequeId,
			customer: checkReg.data[0].customer,
			amount: checkReg.data[0].amount,
			modeOfPayment: checkReg.data[0].modeOfPayment,
			sending: checkReg.data[0].sending,
			receiving: checkReg.data[0].receiving,
		});
		setEditMode(!editMode);
		setRegShow(!regShow);
	};

	const handleCollateralShowforEdit = async (s) => {
		setData(s);
		const checkColl = await axios.get(
			apiUrl + '/loan/cashcollateral/' + s.customerId + '/' + s.id
		);
		//console.log(regFeeData)
		setCashCollateralData({
			...cashCollateralData,
			id: checkColl.data[0].id,
			chequeId: checkColl.data[0].chequeId,
			customer: checkColl.data[0].customer,
			amount: checkColl.data[0].amount,
			modeOfPayment: checkColl.data[0].modeOfPayment,
			sending: checkColl.data[0].sending,
			receiving: checkColl.data[0].receiving,
		});
		setEditMode(!editMode);
		setColShow(!colShow);
	};
	const openCustomerListAsReport = (url) => {
		const windowFeatures = 'left=100,top=100,width=320,height=320';
		window.open(url, 'customerlist', 'popup', windowFeatures);
	};

	const getIndividualRegistrationFee = async (s) => {
		const results = await axios.get(apiUrl + '/loan/registrationfee/' + s.id);
	};
	return (
		<div className="container-fluid">
			<div className="row justify-content-center">
				<h4 className="centertext mb-3">LOAN CHEQUE DISBURSEMENT</h4>
			</div>

			<div className="mb-3">
				<p className="float-left">Cheques Available for Disbursement</p>
				<Table className="table-sm">
					<thead>
						<tr className="fs-sm">
							<th></th>
							<th>Name</th>
							<th>Date Issued</th>
							<th>Date on Cheque</th>
							<th>Cheque No.</th>
							<th>Amount (GHC)</th>
							<th>Issued By</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{unDisbursed.map((c, index) => (
							<tr key={c.id}>
								<td>{index + 1}</td>
								<td>{c.nameOnCheque}</td>
								<td>{moment(c.entryDate).format('DD-MMMM-YYYY')}</td>
								<td>{moment(c.dateOnCheque).format('DD-MMMM-YYYY')}</td>
								<td>{c.chequeNumber}</td>
								<td>
									{c.amount.toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</td>
								<td>{c.issuedBy}</td>
								<td>
									<CDropdown className="btn-sm">
										<CDropdownToggle
											color="info"
											size="sm"
											onClick={() => checkRegistrationFee(c)}
										>
											Select Activity
										</CDropdownToggle>
										<CDropdownMenu size="sm">
											<CDropdownItem header>
												Disbursement Activities
											</CDropdownItem>
											{!checkRegFee && (
												<CDropdownItem onClick={() => handleRegShow(c)}>
													Registration Fee
												</CDropdownItem>
											)}
											{!checkCashCollateral && (
												<CDropdownItem
													onClick={() => handleCashCollateralShow(c)}
												>
													Cash Collateral{' '}
												</CDropdownItem>
											)}
											<CDropdownItem onClick={() => handleShow(c)}>
												Disburse Cheque
											</CDropdownItem>
										</CDropdownMenu>
									</CDropdown>
								</td>
								<td>
									<CDropdown className="btn-sm">
										<CDropdownToggle
											color="success"
											size="sm"
											onClick={() => checkRegistrationFee(c)}
										>
											Edit Activity
										</CDropdownToggle>
										<CDropdownMenu size="sm">
											<CDropdownItem header>
												Edit Registration and Cash Collateral
											</CDropdownItem>
											{checkRegFee && (
												<CDropdownItem onClick={() => handleRegShowforEdit(c)}>
													Edit Registration Fee
												</CDropdownItem>
											)}
											{checkCashCollateral && (
												<CDropdownItem
													onClick={() => handleCollateralShowforEdit(c)}
												>
													Edit Cash Collateral{' '}
												</CDropdownItem>
											)}
										</CDropdownMenu>
									</CDropdown>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>

			<div className="m-3">
				<div className="mb-3">
					<CRow>
						<CCol lg={12}>
							<CCard className="col-sm-12">
								<CCardHeader className="text-center">
									<p className="float-left">Disbursed Cheques</p>
								</CCardHeader>
								<CCardBody>
									<div className="row mb-3">
										<div className="col-sm-4">
											<label>Start Date</label>
											<CInput
												id="startdate"
												type="date"
												className="form-control text-center"
												aria-label="Default select example"
												value={startDate}
												onChange={handleStartDateChange}
											/>
										</div>
										<div className="col-sm-4">
											<label>End Date</label>
											<CInput
												id="enddate"
												type="date"
												className="form-control text-center"
												aria-label="Default select example"
												value={endDate}
												onChange={handleEndDateChange}
											/>
										</div>
										<div className="col-sm-4 text-right">
											Total Amt: <strong>{formatter.format(totalAmt)}</strong>
										</div>
									</div>
									<Table>
										<thead>
											<tr className="fs-sm">
												<th></th>
												<th>Customer</th>
												<th>Cheque No.</th>
												<th>Bank</th>
												<th>Date on Cheque</th>
												<th>Amount (GHC)</th>
												<th>Disbursed By</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{disbursed.map((c, index) => (
												<tr key={c.id}>
													<td>{index + 1}</td>
													<td>{c.fullName}</td>
													<td>{c.chequeNumber}</td>
													<td>{c.bank}</td>
													<td>{c.dateOnCheque}</td>
													<td>
														{c.amount.toLocaleString(undefined, {
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
														})}
													</td>
													<td>{c.disbursedBy}</td>
													{c.status === 'Not Submitted' ? (
														<td>
															<CButton
																className="btn-sm"
																color="success"
																onClick={null}
															>
																remove
															</CButton>
														</td>
													) : null}
												</tr>
											))}
										</tbody>
									</Table>
								</CCardBody>
							</CCard>
							{/*<CButton
                className="float-right m-3 col-sm-2 btn-sm"
                color="success"
                onClick={() => window.print()}
              >
                Print Page
             </CButton>*/}
							<CButton
								className="float-right m-3 col-sm-2 btn-sm"
								color="warning"
								onClick={() =>
									openCustomerListAsReport(
										reportUrl +
											'/disbursedCheques.aspx?' +
											startDate +
											'?' +
											endDate
									)
								}
							>
								View As Report
							</CButton>
						</CCol>
					</CRow>
				</div>
			</div>

			<CModal
				className="modal fade col-sm-10"
				size="lg"
				show={show}
				color="success"
				data-backdrop="static"
				data-keyboard="false"
				onClose={() => {
					setShow(!show);
				}}
			>
				<CModalHeader className="modal-header" closeButton>
					<p>
						<h3 className="centertext">Disburse Cheque</h3>
					</p>
				</CModalHeader>

				<CModalBody className="modal-body col-sm-12">
					<div class="mb-3 row">
						<CLabel
							htmlFor="nameOfCustomer"
							className="col-sm-3 col-form-label"
						>
							Name of Customer
						</CLabel>
						<div class="col-sm-8">
							<CInput
								className="form-control-xl mb-2 mt-2 text-center input-lg"
								value={data.nameOnCheque}
								readOnly
								//onChange={handleCustomerSelected}
							/>
							{/*<CInput
                type="text"
                class="form-control"
                id="nameOfCustomer"
                value={disburseData.nameOnCheque}
                autoComplete="off"
                onChange={(e) =>
                  setdisburseData({
                    ...disburseData,
                    nameOnCheque: e.currentTarget.value,
                    issuedBy: user.id,
                  })
                }
              />*/}
						</div>
					</div>

					<div class="mb-3 row">
						<CLabel htmlFor="bank" className="col-sm-3 col-form-label">
							Bank
						</CLabel>
						<div class="col-sm-8">
							<CInput
								id="bank"
								className="form-control text-center"
								aria-label="Default select example"
								value={data.bank}
								readOnly
							/>
						</div>
					</div>

					<div class="mb-3 row">
						<CLabel for="bankAccount" class="col-sm-3 col-form-label">
							Bank Account
						</CLabel>
						<div class="col-sm-8">
							<CInput
								id="bankAccount"
								className="form-control text-center"
								aria-label="Default select example"
								value={data.bankAccount}
								readOnly
							/>
						</div>
					</div>

					<div class="mb-3 row">
						<CLabel htmlFor="dateOnCheque" className="col-sm-3 col-form-label">
							Date on Cheque
						</CLabel>
						<div className="col-sm-8">
							<CInput
								type="text"
								className="form-control text-center"
								id="dateOnCheque"
								value={data.dateOnCheque}
								readOnly
							/>
						</div>
					</div>
					<div className="mb-3 row">
						<CLabel htmlFor="chequeNumber" className="col-sm-3 col-form-label">
							Cheque No.
						</CLabel>
						<div className="col-sm-8">
							<CInput
								type="text"
								className="form-control text-center"
								id="chequeNumber"
								value={data.chequeNumber}
								readOnly
							/>
						</div>
					</div>
					<div class="mb-3 row">
						<CLabel htmlFor="amount" className="col-sm-3">
							Amount (GHS)
						</CLabel>
						<div class="col-sm-8">
							<CInput
								id="amount"
								className="form-control text-right bold"
								type="text"
								value={data.amount}
								readOnly
							/>
						</div>
					</div>
				</CModalBody>

				<CModalFooter>
					<div className="justify-content-center">
						<CButton onClick={handleSubmit} className="m-3" color="success">
							Submit
						</CButton>
						<CButton
							onClick={() => setShow(!show)}
							className="m-3"
							color="danger"
						>
							Close
						</CButton>
					</div>
				</CModalFooter>
			</CModal>

			{/*REGISTRATION FEE*/}
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
						<h3 className="centertext">Collect Registration Fee</h3>
					</p>
				</CModalHeader>

				<CModalBody className="modal-body col-sm-12">
					<div class="mb-3 row">
						<CLabel
							htmlFor="nameOfCustomer"
							className="col-sm-3 col-form-label"
						>
							Name of Customer
						</CLabel>
						<div class="col-sm-8">
							<CInput
								className="form-control-xl mb-2 mt-2 input-lg"
								value={data.nameOnCheque}
								readOnly
								//onChange={handleCustomerSelected}
							/>
							{/*<CInput
                type="text"
                class="form-control"
                id="nameOfCustomer"
                value={disburseData.nameOnCheque}
                autoComplete="off"
                onChange={(e) =>
                  setdisburseData({
                    ...disburseData,
                    nameOnCheque: e.currentTarget.value,
                    issuedBy: user.id,
                  })
                }
              />*/}
						</div>
					</div>

					<div class="mb-3 row">
						<CLabel htmlFor="bank" className="col-sm-3 col-form-label">
							Bank
						</CLabel>
						<div class="col-sm-8">
							<CInput
								id="bank"
								className="form-control"
								aria-label="Default select example"
								value={data.bank}
								onChange={null}
								readOnly
							/>
						</div>
					</div>

					<div class="mb-3 row">
						<CLabel for="bankAccount" class="col-sm-3 col-form-label">
							Bank Account
						</CLabel>
						<div class="col-sm-8">
							<CInput
								id="bankAccount"
								className="form-control"
								aria-label="Default select example"
								value={data.bankAccount}
								readOnly
							/>
						</div>
					</div>

					<div class="mb-3 row">
						<CLabel htmlFor="dateOnCheque" className="col-sm-3 col-form-label">
							Date on Cheque
						</CLabel>
						<div className="col-sm-8">
							<CInput
								type="text"
								className="form-control"
								id="dateOnCheque"
								value={data.dateOnCheque}
								readOnly
							/>
						</div>
					</div>
					<div className="mb-3 row">
						<CLabel htmlFor="chequeNumber" className="col-sm-3 col-form-label">
							Cheque No.
						</CLabel>
						<div className="col-sm-8">
							<CInput
								type="text"
								className="form-control"
								id="chequeNumber"
								value={data.chequeNumber}
								readOnly
							/>
						</div>
					</div>
					<div class="mb-3 row">
						<CLabel htmlFor="amount" className="col-sm-3">
							Cheque Amount (GHS)
						</CLabel>
						<div class="col-sm-8">
							<CInput
								id="amount"
								className="form-control "
								type="text"
								readOnly
								value={data.amount}
							/>
						</div>
					</div>
					<div className="mb-3 row">
						<CLabel htmlFor="amount" className="col-sm-3">
							Mode Payment *
						</CLabel>
						<div class="col-sm-8">
							<CSelect
								className="form-select"
								aria-label="Default select example"
								value={regFeeData.modeOfPayment}
								onChange={(e) =>
									setRegFeeData({
										...regFeeData,
										modeOfPayment: e.currentTarget.value,
									})
								}
							>
								<option defaultValue=""></option>
								<option value="Cash">Cash</option>
								<option value="MoMo">MoMo</option>
							</CSelect>
						</div>
					</div>

					{regFeeData.modeOfPayment === 'MoMo' && (
						<div className="mb-3 row">
							<CLabel htmlFor="amount" className="col-sm-3">
								Sending (MoMo Number)
							</CLabel>
							<div className="col-sm-8">
								<CInput
									id="sending"
									className="form-control bold mb-3"
									type="text"
									value={regFeeData.sending}
									onChange={(e) =>
										setRegFeeData({
											...regFeeData,
											sending: e.currentTarget.value,
										})
									}
								/>
							</div>

							<CLabel htmlFor="amount" className="col-sm-3">
								Receiving (MoMo Number)
							</CLabel>
							<div className="col-sm-8">
								<CInput
									id="receiving"
									className="form-control bold"
									type="text"
									value={regFeeData.receiving}
									onChange={(e) =>
										setRegFeeData({
											...regFeeData,
											receiving: e.currentTarget.value,
										})
									}
								/>
							</div>
						</div>
					)}

					<div class="mb-3 row">
						<CLabel htmlFor="amount" className="col-sm-3">
							Registration Fee (GHS)
						</CLabel>
						<div class="col-sm-8">
							<CInput
								id="amount"
								className="form-control bold"
								type="text"
								value={regFeeData.amount}
								onChange={handleRegFeeChange}
							/>
						</div>
					</div>
				</CModalBody>

				<CModalFooter>
					<div className="justify-content-center">
						<CButton
							onClick={editMode ? handleRegFeeEdit : handleRegFeeSubmit}
							className="m-3"
							color="success"
						>
							Submit
						</CButton>
						<CButton
							onClick={() => {
								setRegFeeData({
									amount: 0,
									modeOfPayment: '',
									id: 0,
								});
								setRegShow(!regShow);
							}}
							className="m-3"
							color="danger"
						>
							Close
						</CButton>
					</div>
				</CModalFooter>
			</CModal>

			{/*Cash Collateral*/}
			<CModal
				className="modal fade col-sm-10"
				size="lg"
				show={colShow}
				color="info"
				data-backdrop="static"
				data-keyboard="false"
				onClose={() => {
					setColShow(!colShow);
				}}
			>
				<CModalHeader className="modal-header" closeButton>
					<p>
						<h3 className="centertext">Collect Cash Collateral</h3>
					</p>
				</CModalHeader>

				<CModalBody className="modal-body col-sm-12">
					<div class="mb-3 row">
						<CLabel
							htmlFor="nameOfCustomer"
							className="col-sm-3 col-form-label"
						>
							Name of Customer
						</CLabel>
						<div class="col-sm-8">
							<CInput
								className="form-control-xl mb-2 mt-2"
								value={data.nameOnCheque}
								readOnly
								//onChange={handleCustomerSelected}
							/>
						</div>
					</div>
					<div class="mb-3 row">
						<CLabel htmlFor="bank" className="col-sm-3 col-form-label">
							Bank
						</CLabel>
						<div class="col-sm-8">
							<CInput
								id="bank"
								className="form-control "
								aria-label="Default select example"
								readOnly
								value={data.bank}
								onChange={null}
							/>
						</div>
					</div>
					<div class="mb-3 row">
						<CLabel for="bankAccount" class="col-sm-3 col-form-label">
							Bank Account
						</CLabel>
						<div class="col-sm-8">
							<CInput
								id="bankAccount"
								className="form-control"
								aria-label="Default select example"
								readOnly
								value={data.bankAccount}
							/>
						</div>
					</div>
					<div class="mb-3 row">
						<CLabel htmlFor="dateOnCheque" className="col-sm-3 col-form-label">
							Date on Cheque
						</CLabel>
						<div className="col-sm-8">
							<CInput
								type="text"
								className="form-control"
								readOnly
								id="dateOnCheque"
								value={data.dateOnCheque}
							/>
						</div>
					</div>
					<div className="mb-3 row">
						<CLabel htmlFor="chequeNumber" className="col-sm-3 col-form-label">
							Cheque No.
						</CLabel>
						<div className="col-sm-8">
							<CInput
								type="text"
								className="form-control"
								readOnly
								id="chequeNumber"
								value={data.chequeNumber}
							/>
						</div>
					</div>
					<div class="mb-3 row">
						<CLabel htmlFor="amount" className="col-sm-3">
							Amount (GHS)
						</CLabel>
						<div class="col-sm-8">
							<CInput
								id="amount"
								className="form-control bold"
								type="text"
								readOnly
								value={data.amount}
							/>
						</div>
					</div>
					<div className="mb-3 row">
						<CLabel htmlFor="amount" className="col-sm-3">
							Mode Payment *
						</CLabel>
						<div class="col-sm-8">
							<CSelect
								className="form-select"
								aria-label="Default select example"
								value={cashCollateralData.modeOfPayment}
								onChange={(e) =>
									setCashCollateralData({
										...cashCollateralData,
										modeOfPayment: e.currentTarget.value,
									})
								}
							>
								<option defaultValue=""></option>
								<option value="Cash">Cash</option>
								<option value="MoMo">MoMo</option>
								<option value="Withdrawal">Withdrawal</option>
							</CSelect>
						</div>
					</div>
					{cashCollateralData.modeOfPayment === 'MoMo' && (
						<div className="mb-3 row">
							<CLabel htmlFor="amount" className="col-sm-3">
								Sending (MoMo Number)
							</CLabel>
							<div className="col-sm-8">
								<CInput
									id="sending"
									className="form-control bold mb-3"
									type="text"
									value={cashCollateralData.sending}
									onChange={(e) =>
										setCashCollateralData({
											...cashCollateralData,
											sending: e.currentTarget.value,
										})
									}
								/>
							</div>

							<CLabel htmlFor="amount" className="col-sm-3">
								Receiving (MoMo Number)
							</CLabel>
							<div className="col-sm-8">
								<CInput
									id="receiving"
									className="form-control bold"
									type="text"
									value={cashCollateralData.receiving}
									onChange={(e) =>
										setCashCollateralData({
											...cashCollateralData,
											receiving: e.currentTarget.value,
										})
									}
								/>
							</div>
						</div>
					)}
					<div class="mb-3 row">
						<CLabel htmlFor="amount" className="col-sm-3">
							Cash Collateral (GHS)
						</CLabel>
						<div class="col-sm-8">
							<CInput
								id="amount"
								className="form-control bold"
								type="text"
								value={cashCollateralData.amount}
								onChange={handleCashCollateralChange}
							/>
						</div>
					</div>
				</CModalBody>

				<CModalFooter>
					<div className="justify-content-center">
						<CButton
							onClick={
								editMode ? handleCashCollateralEdit : handleCashCollateralSubmit
							}
							className="m-3"
							color="success"
						>
							Submit
						</CButton>
						<CButton
							onClick={() => {
								setColShow(!colShow);
								setCashCollateralData({
									amount: 0,
									modeOfPayment: '',
								});
							}}
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
};

export default Disbursement;
