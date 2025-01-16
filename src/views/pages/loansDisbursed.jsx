import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { apiUrl, reportUrl } from '../../config.json'
import auth from '../../components/services/authService'
import Joi from 'joi-browser'
import Swal from 'sweetalert2'
import formData from 'form-data'

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
} from '@coreui/react'

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

const LoansDisbursed = () => {
  const [loansDisbursed, setLoansDisbursed] = useState([])
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))
  let navigate = useHistory()

  useEffect(() => {
    async function getLoansDisbursed() {
      const results = await axios.get(
        apiUrl + '/loanreports/loansDisbursed/' + startDate + '/' + endDate,
      )
      setLoansDisbursed(results.data)
    }
    getLoansDisbursed()
  }, [startDate, endDate])

  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=320,height=320'
    window.open(url, 'customerlist', 'popup', windowFeatures)
  }
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  const handleStartDateChange = (e) => {
    setStartDate(e.currentTarget.value)
  }
  const handleEndDateChange = (e) => {
    setEndDate(e.currentTarget.value)
  }

  const totalPrincipal = loansDisbursed.reduce((a, i) => {
    return a + i.principal
  }, 0)

  const totalInterest = loansDisbursed.reduce((a, i) => {
    return a + i.interestRate
  }, 0)

  const totalProcessingFee = loansDisbursed.reduce((a, i) => {
    return a + i.processingFee
  }, 0)

  const totalRegistrationFee = loansDisbursed.reduce((a, i) => {
    return a + i.registrationFee
  }, 0)

  const totalCollateral = loansDisbursed.reduce((a, i) => {
    return a + i.collateral
  }, 0)

  return (
    <div>
      <div className="col-sm-12 mt-3">
        <h3>Loans Disbursed</h3>
        <div class="mb-3 row mt-5 col-sm-12">
          <CLabel htmlFor="dateOnCheque" className="form-label">
            Start Date
          </CLabel>
          <div className="col-sm-3">
            <CInput
              type="date"
              class="form-control"
              id="dateOnCheque"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <CLabel htmlFor="dateOnCheque" className="form-label">
            End Date
          </CLabel>
          <div className="col-sm-3">
            <CInput
              type="date"
              class="form-control"
              id="dateOnCheque"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
          <div className="row mt-3 ">
            <div className="col-sm-4 text-right">
              Total Principal:{' '}
              <strong>{formatter.format(totalPrincipal)}</strong>
            </div>
            <div className="col-sm-4 text-right">
              Total Interest Rate:{' '}
              <strong>{formatter.format(totalInterest)}</strong>
            </div>
            <div className="col-sm-4 text-right">
              Total Processing Fee:{' '}
              <strong>{formatter.format(totalProcessingFee)}</strong>
            </div>
            <div className="col-sm-4 text-right">
              Total registration Fee:{' '}
              <strong>{formatter.format(totalRegistrationFee)}</strong>
            </div>
            <div className="col-sm-4 text-right">
              Total Collateral:{' '}
              <strong>{formatter.format(totalCollateral)}</strong>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <CButton
            color="success"
            className="col-sm-2 float-right btn-sm mb-3"
            onClick={() =>
              openCustomerListAsReport(
                reportUrl + '/loansDisbursed.aspx?' + startDate + '?' + endDate,
              )
            }
          >
            View as Report
          </CButton>
          <Table className="table-sm">
            <thead>
              <tr className="fs-sm">
                <th></th>
                <th>Date</th>
                <th>Customer</th>
                <th>Loan ID</th>
                <th>Principal</th>
                <th>Interest Rate</th>
                <th>Proc. Fee</th>
                <th>Reg. Fee</th>
                <th>Collateral</th>
              </tr>
            </thead>
            <tbody>
              {loansDisbursed.map((c, index) => (
                <tr
                  key={c.idNumber}
                  // onClick={() => customerView(c)}
                  Style="cursor: pointer;"
                >
                  <td>{index + 1}</td>
                  <td>{c.tDate}</td>
                  <td>{c.Customer}</td>
                  <td>{c.loanId}</td>
                  <td>{formatter.format(c.principal)}</td>
                  <td>{formatter.format(c.interestRate)}</td>
                  <td>{formatter.format(c.processingFee)}</td>
                  <td>{formatter.format(c.registrationFee)}</td>
                  <td>{formatter.format(c.collateral)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

//  <td>{moment(s.startDate).format("DD,MMMM,YYYY")}</td>
export default LoansDisbursed
