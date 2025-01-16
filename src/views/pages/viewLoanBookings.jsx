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
import { reportUrl } from '../../config.json'
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
import { now } from 'moment'

const ViewLoanBooking = () => {
  const [loanBookings, setLoanBookings] = useState([])
  const [details, setDetails] = useState([])
  const [render, setRender] = useState(false)
  const [show, setShow] = useState(false)
  const [dated, setDated] = useState(new Date())
  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))

  function formatDate(date) {
    let newDate = new Date(date)
    var year = newDate.getFullYear().toString()
    var month = (newDate.getMonth() + 101).toString().substring(1)
    var day = (newDate.getDate() + 100).toString().substring(1)
    return year + '-' + month + '-' + day
  }

  useEffect(() => {
    async function viewLoanBookings() {
      const results = await axios.get(
        apiUrl + '/loan/booking/report/' + startDate + '/' + endDate,
      )
      //console.log(results.data)
      setLoanBookings(results.data)
      //if (results.data[0].img == null) return
      //setBuffer(results.data[0].img.data)
    }
    viewLoanBookings()
    // console.log(loanBookings)
  }, [startDate, endDate])

  /*useEffect(() => {
    async function getRegistrationFees() {
      const results = await axios.get(apiUrl + '/loan/registrationfee')
      setRegistrationFees(results.data)
    }
    getRegistrationFees()
  }, [registrationFees, render])
*/
  const getBookedLoanDetails = async (c) => {
    const results = await axios.get(apiUrl + '/loan/booking/details/' + c)
    console.log(results.data)
    setDetails(results.data)
    setShow(!show)
  }
  const handleStartDateChange = (e) => {
    setStartDate(e.currentTarget.value)
  }
  const handleEndDateChange = (e) => {
    setEndDate(e.currentTarget.value)
  }

  const handleDateSelected = async (e) => {
    setDated(e.currentTarget.value)
  }
  const getTodaysBookings = {
    loans: loanBookings.filter(
      (l) => formatDate(l.dateCompleted) === formatDate(new Date()),
    ),
  }

  const data = {
    loans: loanBookings.filter((l) =>
      l.fullName.toLowerCase().includes(search.toLowerCase()),
    ),
  }

  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=320,height=320'
    window.open(url, 'Loan Details', 'popup', windowFeatures)
  }

  // const dataTouse = dated === new Date() ? getTodaysBookings.loans : data.loans
  const dataTouse = search.length === 0 ? loanBookings : data.loans

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })
  return (
    <div>
      <div className="row justify-content-center mb-3">
        <p className="mb-2">
          Loans in the list are fully booked and various accounting effects
          completed. Loan beneficiaries are expected to complete the payment of
          such loans
        </p>
      </div>
      <CRow>
        <CCol lg={12}>
          <CCard>
            <CCardHeader className="text-right">
              <div className="m-2">
                <label className="m-2">Start Date</label>
                <CInput
                  type="date"
                  className="col-sm-3 float-right"
                  onChange={handleStartDateChange}
                />
              </div>
              <div className="m-2">
                <label className="m-2">End Date</label>
                <CInput
                  type="date"
                  className="col-sm-3 float-right ms-3"
                  onChange={handleEndDateChange}
                />
              </div>
              <CButton
                className="float-right m-3 col-sm-3 btn-sm"
                color="warning"
                onClick={() =>
                  openCustomerListAsReport(
                    reportUrl +
                      '/bookedLoans.aspx?' +
                      startDate +
                      '?' +
                      endDate,
                  )
                }
              >
                View As Report
              </CButton>
            </CCardHeader>
            <h4 className="text-center mt-3">Booked Loans</h4>
            <CCardBody>
              <Input
                className="mt-3 mb-3 ms-3 col-sm-4"
                type="text"
                placeholder="Search with Customer Name"
                onChange={handleSearch}
              />
              <Table className="table-sm">
                <caption>Booked Loans</caption>

                <thead>
                  <tr className="fs-sm">
                    <th></th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Prinicipal</th>
                    <th>Rate (%)</th>
                    <th>Loan Amount</th>
                    <th>Loan Officer</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dataTouse.map((c, index) => (
                    <tr key={c.id}>
                      <td>{index + 1}</td>

                      <td>{c.fullName}</td>
                      <td>{c.product}</td>
                      <td>{formatter.format(c.principal)}</td>
                      <td>{c.interestRate}</td>
                      <td>
                        {formatter.format(
                          c.principal + (c.interestRate / 100) * c.principal,
                        )}
                      </td>

                      <td>{c.nameOfStaff}</td>
                      {/* <td>
                        <CButton
                          className="btn-sm"
                          color="success"
                          onClick={() =>
                            openCustomerListAsReport(
                              reportUrl + '/individualLoanDetails.aspx?' + c.id,
                            )
                          }
                        >
                          View
                        </CButton>
                      </td> */}
                      <td>
                        <CDropdown className="m-1">
                          <CDropdownToggle color="info" size="sm">
                            View
                          </CDropdownToggle>
                          <CDropdownMenu size="sm">
                            <CDropdownItem
                              onClick={() =>
                                openCustomerListAsReport(
                                  reportUrl +
                                    '/individualLoanDetails.aspx?' +
                                    c.id,
                                )
                              }
                            >
                              Loan Report
                            </CDropdownItem>

                            <CDropdownDivider />
                            <CDropdownItem
                              onClick={() =>
                                openCustomerListAsReport(
                                  reportUrl +
                                    '/paymentSchedule.aspx?' +
                                    c.disbursementId +
                                    '?' +
                                    c.customer,
                                )
                              }
                            >
                              Payment Schedule
                            </CDropdownItem>

                            {/* <CDropdownDivider />
                            <CDropdownItem>Re-assign To Officer</CDropdownItem> */}
                          </CDropdownMenu>
                        </CDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal
        className="modal fade col-sm-12"
        size="lg"
        show={show}
        color="info"
        data-backdrop="static"
        data-keyboard="false"
        onClose={() => {
          setShow(!show)
        }}
      >
        <CModalHeader className="modal-header" closeButton>
          <div className="row">
            <div className="col-sm-4 text-left">
              <h6 className="">Applicant: {null}</h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">Bank: {null}</h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">Amount Disbursed: {null}</h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">
                Date Disbursed :
                {/* {moment(selectedLoan.disburseDate).format('DD,MMMM,YYYY')} */}
              </h6>
            </div>
            <div className="col-sm-4 text-left">
              <h6 className="">Disbursed By: {null}</h6>
            </div>
          </div>
        </CModalHeader>

        <CModalBody className="modal-body col-sm-12">
          <h4 className="text-center mb-3">Loan Principal And Purpose</h4>
          <LoanPrincipal
            customer={null}
            disbursementId={null}
            disbursedAmount={null}
          />
        </CModalBody>

        <CModalFooter></CModalFooter>
      </CModal>
    </div>
  )
}

export default ViewLoanBooking
