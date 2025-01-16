import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { Link, useNavigate, Navigate, useHistory } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import Joi from 'joi-browser'
import CurrencyFormat from 'react-currency-format'
import Swal from 'sweetalert2'
import auth from '../../components/services/authService'
import { apiUrl } from '../../config.json'
import BookProduct from './bookProduct'
import LoanPrincipal from './loanPrincipalEntry'
import Guarantors from './guarantors'
import GuarantorTwo from './guarantorTwo'
import BusinessDetails from './businessDetails'
import Directions from './directions'
import AdaboSelect from 'react-select'
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
} from 'reactstrap'
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
} from '@coreui/react'

const LoanBooking = () => {
  const [show, setShow] = useState(false)
  const [render, setRender] = useState(false)
  const [data, setData] = useState({})
  const [regShow, setRegShow] = useState(false)
  const [productShow, setProductShow] = useState(false)
  const [issuedCheques, setIssuedCheques] = useState([])
  const [registrationFees, setRegistrationFees] = useState([])
  const [disbursed, setDisbursed] = useState([])
  const [cashCollateral, setCashCollateral] = useState([])
  const [disburseData, setDisburseData] = useState({
    disbursementId: 0,
    disbursedBy: 0,
    amount: '',
    customer: 0,
    cashCollateral: 0,
  })
  const [checkEntry, setCheckEntry] = useState([])
  const [checkProduct, setCheckProduct] = useState({})
  const [checkPrincipal, setCheckPrincipal] = useState({})
  const [principalShow, setPrincipalShow] = useState(false)
  const [guarantorsShow, setGuarantorsShow] = useState(false)
  const [guarantorTwoShow, setGuarantorTwoShow] = useState(false)
  const [businessDetailsShow, setBusinessDetailsShow] = useState(false)
  const [directionsShow, setDirectionsShow] = useState(false)

  const [checkProductEntry, setCheckProductEntry] = useState('')
  const [checkPrincipalEntry, setCheckPrincipalEntry] = useState('')
  const [checkFirstGuarantorEntry, setCheckFirstGuarantorEntry] = useState('')
  const [checkSecondGuarantorEntry, setCheckSecondGuarantorEntry] = useState('')
  const [selectedLoan, setSelectedLoan] = useState({})
  const [regFeeData, setRegFeeData] = useState({
    customer: 0,
    chequeId: 0,
    modeOfPayment: '',
    amount: '',
  })
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [checkingProduct, setCheckingProduct] = useState(0)
  const [checkingPrincipal, setCheckingPrincipal] = useState(0)
  const [checkingFirstGuarantor, setCheckingFirstGuarantor] = useState('')
  const [checkingSecondGuarantor, setCheckingSecondGuarantor] = useState('')
  const navigate = useHistory()
  const user = auth.getCurrentUser()

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  useEffect(() => {
    async function getDisbursedCheques() {
      const results = await axios.get(apiUrl + '/loan/disburse/unbooked')
      setDisbursed(results.data)
      console.log(results.data)
    }
    getDisbursedCheques()
    // console.log(disbursed)
  }, [render])

  useEffect(() => {
    async function getRegistrationFees() {
      const results = await axios.get(apiUrl + '/loan/registrationfee')
      setRegistrationFees(results.data)
    }
    getRegistrationFees()
  }, [registrationFees, render])

  useEffect(() => {
    async function getCashCollateral() {
      const results = await axios.get(apiUrl + '/loan/cashcollateral')
      setCashCollateral(results.data)
    }
    getCashCollateral()
    //console.log(cashCollateral)
  }, [cashCollateral, render])

  const handleShow = (s) => {
    setData(s)
    setDisburseData({
      ...disburseData,
      chequeId: s.id,
      disbursedBy: user.id,
      customer: s.customerId,
      amount: s.amount,
    })
    setShow(!show)
  }

  const handleActivitiesDropdown = async (s) => {
    const productResults = await axios.get(
      apiUrl + '/loan/booking/checkproduct/' + s.customer,
    )

    setSelectedLoan(s)

    productResults.data[0]
      ? setCheckingProduct(productResults.data[0].product)
      : setCheckingProduct(null)

    principalCheck(s)
    firstGuarantorCheck(s)
    secondGuarantorCheck(s)
  }

  const principalCheck = async (s) => {
    const principalResults = await axios.get(
      apiUrl + '/loan/booking/checkprincipal/' + s.customer,
    )

    principalResults.data[0]
      ? setCheckingPrincipal(principalResults.data[0].principal)
      : setCheckingPrincipal(null)
  }

  const firstGuarantorCheck = async (s) => {
    const firstGuarantorResults = await axios.get(
      apiUrl + '/loan/booking/checkfirstguarantor/' + s.customer,
    )

    firstGuarantorResults.data[0]
      ? setCheckingFirstGuarantor(firstGuarantorResults.data[0].firstGuarantor)
      : setCheckingFirstGuarantor(null)
  }

  const secondGuarantorCheck = async (s) => {
    const secondGuarantorResults = await axios.get(
      apiUrl + '/loan/booking/checksecondguarantor/' + s.customer,
    )

    secondGuarantorResults.data[0]
      ? setCheckingSecondGuarantor(
          secondGuarantorResults.data[0].secondGuarantor,
        )
      : setCheckingSecondGuarantor(null)
  }

  const handleProductSelected = async (s) => {
    setDisburseData({
      ...disburseData,
      disbursementId: s.disbursementId,
      customer: s.customer,
      cashCollateral: s.collateralAmount,
    })
    setProductShow(!productShow)
  }

  const handleRegFeeChange = (e) => {
    setRegFeeData({
      ...regFeeData,
      amount: e.currentTarget.value,
    })
  }

  const handlePrincipalEntryShow = async (s) => {
    setDisburseData({
      ...disburseData,
      disbursementId: s.disbursementId,
      customer: s.customer,
      amount: s.amount,
    })
    setPrincipalShow(!principalShow)
  }

  const handleGuarantorsEntryShow = async (s) => {
    setDisburseData({
      ...disburseData,
      disbursementId: s.disbursementId,
      customer: s.customer,
    })
    setGuarantorsShow(!guarantorsShow)
    const results = await axios.get(
      apiUrl + '/loan/booking/check/' + s.customer + '/' + s.disbursementId,
    )
    if (results.data.length > 0) {
      setCheckEntry(results.data)
      setCheckFirstGuarantorEntry(checkEntry.firstGuarantor)
    }
  }

  const handleGuarantorTwoEntryShow = async (s) => {
    setDisburseData({
      ...disburseData,
      disbursementId: s.disbursementId,
      customer: s.customer,
    })
    setGuarantorTwoShow(!guarantorTwoShow)
    const results = await axios.get(
      apiUrl + '/loan/booking/check/' + s.customer + '/' + s.disbursementId,
    )
    if (results.data.length > 0) {
      setCheckEntry(results.data)
      setCheckSecondGuarantorEntry(checkEntry.secondGuarantor)
    }
  }

  const handleBusinessEntryShow = (s) => {
    setDisburseData({
      ...disburseData,
      disbursementId: s.disbursementId,
      customer: s.customer,
    })
    setBusinessDetailsShow(!businessDetailsShow)
  }

  const handleDirectionsShow = (s) => {
    setDisburseData({
      ...disburseData,
      disbursementId: s.disbursementId,
      customer: s.customer,
    })
    setDirectionsShow(!directionsShow)
  }

  const handleSummary = (s) => {
    navigate.push('/summary/' + s.customer + '/' + s.disbursementId)
  }

  const handleViewBookings = () => {
    navigate.push('/viewbookings')
  }

  const handleDelete = async (s) => {
    Swal.fire({
      title: 'Do you want to Delete Booking?',
      html:
        'You are about to remove loan booking entry. You can re-book this loan after removal.',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const results = await axios.delete(
            apiUrl + '/loan/booking/' + s.disbursementId,
          )
          if (results.status !== 200) {
            return Swal.fire(
              'OOPs !',
              'Deletion Failed ! Check Entries and try again !',
              'error',
            )
          } else {
            Swal.fire(
              'Good job!',
              'Loan Booking Deleted Successfully',
              'success',
            )
          }
        } catch (err) {
          Swal.fire('OOPS ! ', 'Loan Booking NOT Deleted', 'error')
        }
      } else if (result.isDenied) {
        Swal.fire('Cancelled', '', 'info')
      }
    })
  }

  //const dataTouse = search.length === 0 ? customers : data.scustomers

  return (
    <div className="container">
      <div className="row justify-content-center mb-3">
        <p className="centertext mb-2">
          Loan booking activities are to be carried out from here. Select an
          activity from the list of disbursed cheques and enter the required
          details.
        </p>
      </div>
      <div className="mb-3">
        <CRow>
          <CCol lg={12}>
            <CCard>
              <CCardHeader className="text-right">
                <CInput placeholder="Search" className="col-sm-3 float-right" />
              </CCardHeader>
              <h4 className="text-center mt-3">Disbursed Cheques</h4>
              <CCardBody>
                <Table className="table-sm">
                  <caption>Disbursed Loans Not Booked</caption>
                  <thead>
                    <tr className="fs-sm">
                      <th></th>
                      <th>Name on Cheque</th>
                      <th>Bank</th>
                      <th>Date Disbursed</th>
                      <th>Cheque No.</th>
                      <th>Amount (GHC)</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {disbursed.map((c, index) => (
                      <tr key={c.id}>
                        <td>{index + 1}</td>
                        <td>{c.fullName}</td>
                        <td>{c.bank}</td>
                        <td>{moment(c.disburseDate).format('DD,MMMM,YYYY')}</td>
                        <td>{c.chequeNumber}</td>
                        <td>{formatter.format(c.amount)}</td>

                        <td>
                          <CDropdown className="">
                            <CDropdownToggle
                              color="info"
                              size="sm"
                              onClick={() => {
                                handleActivitiesDropdown(c)
                              }}
                            >
                              Activities
                            </CDropdownToggle>
                            <CDropdownMenu size="sm">
                              {!checkingProduct && (
                                <CDropdownItem
                                  onClick={() => {
                                    handleProductSelected(c)
                                  }}
                                >
                                  Loan Product
                                </CDropdownItem>
                              )}

                              <CDropdownDivider />
                              {!checkingPrincipal && (
                                <CDropdownItem
                                  onClick={() => {
                                    handlePrincipalEntryShow(c)
                                  }}
                                >
                                  Principal Details
                                </CDropdownItem>
                              )}
                              <CDropdownDivider />
                              {!checkingFirstGuarantor && (
                                <CDropdownItem
                                  onClick={() => handleGuarantorsEntryShow(c)}
                                >
                                  First Guarantor
                                </CDropdownItem>
                              )}
                              <CDropdownDivider />

                              {!checkingSecondGuarantor && (
                                <CDropdownItem
                                  onClick={() => handleGuarantorTwoEntryShow(c)}
                                >
                                  Second Guarantor
                                </CDropdownItem>
                              )}
                              <CDropdownDivider />
                              {/*  <CDropdownItem
                                onClick={() => handleBusinessEntryShow(c)}
                              >
                                Business Details
                              </CDropdownItem>
                              <CDropdownDivider />

                              <CDropdownItem
                                onClick={() => handleDirectionsShow(c)}
                              >
                                Directions
                            </CDropdownItem>
                              <CDropdownDivider />*/}
                              {true && (
                                <CDropdownItem onClick={() => handleSummary(c)}>
                                  Summary
                                </CDropdownItem>
                              )}
                            </CDropdownMenu>
                          </CDropdown>
                        </td>
                        <td>
                          {!disbursed.booked && (
                            <CButton
                              className="btn-sm"
                              color="danger"
                              onClick={() => handleDelete(c)}
                            >
                              Remove
                            </CButton>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CCardBody>
              <div className="d-flex justify-content-center">
                <CButton
                  className="col-sm-2 m-2  btn-sm"
                  color="success"
                  onClick={handleViewBookings}
                >
                  View Booked Loans
                </CButton>
              </div>
            </CCard>
          </CCol>
        </CRow>
      </div>

      <CModal
        className="modal fade col-sm-12"
        size="lg"
        show={productShow}
        color="info"
        data-backdrop="static"
        data-keyboard="false"
        onClose={() => {
          setProductShow(!productShow)
        }}
      >
        <CModalHeader className="modal-header" closeButton>
          <div className="row">
            <div className="col-sm-4 text-left">
              <h6 className="">Applicant: {selectedLoan.fullName}</h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">Bank: {selectedLoan.bank}</h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">
                Amount Disbursed: {formatter.format(selectedLoan.amount)}
              </h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">
                Date Disbursed :
                {moment(selectedLoan.disburseDate).format('DD,MMMM,YYYY')}
              </h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">Disbursed By: {selectedLoan.disbursedBy}</h6>
            </div>
          </div>
        </CModalHeader>

        <CModalBody className="modal-body col-sm-12">
          <h4 className="text-center mb-3">Select Loan Product</h4>
          <BookProduct
            customer={disburseData.customer}
            disbursementId={disburseData.disbursementId}
            cashCollateral={disburseData.cashCollateral}
          />
        </CModalBody>

        <CModalFooter></CModalFooter>
      </CModal>

      <CModal
        className="modal fade col-sm-12"
        size="lg"
        show={principalShow}
        color="info"
        data-backdrop="static"
        data-keyboard="false"
        onClose={() => {
          setPrincipalShow(!principalShow)
        }}
      >
        <CModalHeader className="modal-header" closeButton>
          <div className="row">
            <div className="col-sm-4 text-left">
              <h6 className="">Applicant: {selectedLoan.fullName}</h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">Bank: {selectedLoan.bank}</h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">
                Amount Disbursed: {formatter.format(selectedLoan.amount)}
              </h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">
                Date Disbursed :
                {moment(selectedLoan.disburseDate).format('DD,MMMM,YYYY')}
              </h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">Disbursed By: {selectedLoan.disbursedBy}</h6>
            </div>
          </div>
        </CModalHeader>

        <CModalBody className="modal-body col-sm-12">
          <h4 className="text-center mb-3">Loan Principal And Purpose</h4>
          <LoanPrincipal
            customer={disburseData.customer}
            disbursementId={disburseData.disbursementId}
            disbursedAmount={disburseData.amount}
          />
        </CModalBody>

        <CModalFooter></CModalFooter>
      </CModal>

      <CModal
        className="modal fade col-sm-12"
        size="lg"
        show={guarantorsShow}
        color="info"
        data-backdrop="static"
        data-keyboard="false"
        onClose={() => {
          setGuarantorsShow(!guarantorsShow)
        }}
      >
        <CModalHeader className="modal-header" closeButton>
          <div className="row">
            <div className="col-sm-4 text-left">
              <h6 className="">Applicant: {selectedLoan.fullName}</h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">Bank: {selectedLoan.bank}</h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">
                Amount On Disbursed: {formatter.format(selectedLoan.amount)}
              </h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">
                Date Disbursed :
                {moment(selectedLoan.disburseDate).format('DD,MMMM,YYYY')}
              </h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">Disbursed By: {selectedLoan.disbursedBy}</h6>
            </div>
          </div>
        </CModalHeader>

        <CModalBody className="modal-body col-sm-12">
          <h4 className="text-center mb-3">Add First Guarantor</h4>
          <Guarantors
            customer={disburseData.customer}
            disbursementId={disburseData.disbursementId}
          />
        </CModalBody>

        <CModalFooter></CModalFooter>
      </CModal>

      <CModal
        className="modal fade col-sm-12"
        size="lg"
        show={guarantorTwoShow}
        color="info"
        data-backdrop="static"
        data-keyboard="false"
        onClose={() => {
          setGuarantorTwoShow(!guarantorTwoShow)
        }}
      >
        <CModalHeader className="modal-header" closeButton>
          <div className="row">
            <div className="col-sm-4 text-left">
              <h6 className="">Applicant: {selectedLoan.fullName}</h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">Bank: {selectedLoan.bank}</h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">
                Amount Disbursed: {formatter.format(selectedLoan.amount)}
              </h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">
                Date Disbursed :
                {moment(selectedLoan.disburseDate).format('DD,MMMM,YYYY')}
              </h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">Disbursed By: {selectedLoan.disbursedBy}</h6>
            </div>
          </div>
        </CModalHeader>

        <CModalBody className="modal-body col-sm-12">
          <h4 className="text-center mb-3">Add Second Guarantor</h4>
          <GuarantorTwo
            customer={disburseData.customer}
            disbursementId={disburseData.disbursementId}
          />
        </CModalBody>

        <CModalFooter></CModalFooter>
      </CModal>

      <CModal
        className="modal fade col-sm-12"
        size="lg"
        show={businessDetailsShow}
        color="info"
        data-backdrop="static"
        data-keyboard="false"
        onClose={() => {
          setBusinessDetailsShow(!businessDetailsShow)
        }}
      >
        <CModalHeader className="modal-header" closeButton>
          <div className="row">
            <div className="col-sm-4 text-left">
              <h6 className="">Applicant: {selectedLoan.fullName}</h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">Bank: {selectedLoan.bank}</h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">
                Amount Disbursed: {formatter.format(selectedLoan.amount)}
              </h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">
                Date Disbursed :
                {moment(selectedLoan.disburseDate).format('DD,MMMM,YYYY')}
              </h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">Disbursed By: {selectedLoan.disbursedBy}</h6>
            </div>
          </div>
        </CModalHeader>

        <CModalBody className="modal-body col-sm-12">
          <h4 className="text-center mb-3">Add Business Details</h4>
          <BusinessDetails
            customer={disburseData.customer}
            disbursementId={disburseData.disbursementId}
          />
        </CModalBody>

        <CModalFooter></CModalFooter>
      </CModal>

      <CModal
        className="modal fade col-sm-12"
        size="lg"
        show={directionsShow}
        color="info"
        data-backdrop="static"
        data-keyboard="false"
        onClose={() => {
          setDirectionsShow(!directionsShow)
        }}
      >
        <CModalHeader className="modal-header" closeButton>
          <div className="row">
            <div className="col-sm-4 text-left">
              <h6 className="">Applicant: {selectedLoan.fullName}</h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">Bank: {selectedLoan.bank}</h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">
                Amount Disbursed: {formatter.format(selectedLoan.amount)}
              </h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">
                Date Disbursed :
                {moment(selectedLoan.disburseDate).format('DD,MMMM,YYYY')}
              </h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">Disbursed By: {selectedLoan.disbursedBy}</h6>
            </div>
          </div>
        </CModalHeader>

        <CModalBody className="modal-body col-sm-12">
          <h4 className="text-center mb-3">
            Enter Residence and Business Directions
          </h4>
          <Directions
            customer={disburseData.customer}
            disbursementId={disburseData.disbursementId}
          />
        </CModalBody>

        <CModalFooter></CModalFooter>
      </CModal>
    </div>
  )
}

export default LoanBooking
