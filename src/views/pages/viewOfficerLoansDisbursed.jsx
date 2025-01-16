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

const ViewOfficerLoansDisbursed = () => {
  const [loanDisbursed, setLoansDisbursed] = useState([])
  const [officer, setOfficer] = useState(auth.getCurrentUser)
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
      console.log(officer.staff)
      const results = await axios.get(
        apiUrl +
          '/loanreports/officerloans/' +
          startDate +
          '/' +
          endDate +
          '/' +
          officer.staff,
      )
      //console.log('Officer: ' + officer.id)
      setLoansDisbursed(results.data)
      // setOfficer(auth.getCurrentUser)
    }
    viewLoanBookings()
  }, [startDate, endDate])

  const getBookedLoanDetails = async (c) => {
    const results = await axios.get(
      apiUrl + '/loanreports/portfolio' + startDate + '/' + endDate,
    )
    console.log(results.data)
    setLoansDisbursed(results.data)
  }
  const handleStartDateChange = (e) => {
    setStartDate(e.currentTarget.value)
  }
  const handleEndDateChange = (e) => {
    setEndDate(e.currentTarget.value)
  }

  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=320,height=320'
    window.open(url, 'Loan Details', 'popup', windowFeatures)
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
                color="success"
                onClick={() =>
                  openCustomerListAsReport(
                    reportUrl +
                      '/officerLoansDisbursed.aspx?' +
                      startDate +
                      '?' +
                      endDate +
                      '?' +
                      officer.staff,
                  )
                }
              >
                View As Report
              </CButton>
            </CCardHeader>
            <h4 className="text-center mt-3">Disbursed Loans Per Officer</h4>
            <CCardBody>
              <Table className="table-sm">
                <caption>Disbursed Loans By Officer</caption>
                <thead>
                  <tr className="fs-sm">
                    <th></th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>LoanId</th>
                    <th>Principal</th>
                    <th>Interest</th>
                    <th>Proc.Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {loanDisbursed.map((c, index) => (
                    <tr key={c.id}>
                      <td>{index + 1}</td>
                      <td>{c.tDate}</td>
                      <td>{c.Customer}</td>
                      <td>{c.loanId}</td>
                      <td>{formatter.format(c.principal)}</td>
                      <td>{formatter.format(c.interestRate)}</td>
                      <td>{formatter.format(c.processingFee)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default ViewOfficerLoansDisbursed
