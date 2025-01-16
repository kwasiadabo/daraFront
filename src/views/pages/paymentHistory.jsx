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

const PaymentHistory = () => {
  const [loanBookings, setLoanBookings] = useState([])
  const [render, setRender] = useState(false)
  const [customerLoans, setCustomerLoans] = useState([])
  const [customer, setCustomer] = useState(0)
  const [customers, setCustomers] = useState([])

  /*useEffect(() => {
    async function getCustomerLoans() {
      const results = await axios.get(
        apiUrl + '/loanreports/customer/' + customer,
      )
      setCustomerLoans(results.data)
    }
    getCustomerLoans()
  }, [])
  */

  useEffect(() => {
    async function getCustomers() {
      const results = await axios.get(apiUrl + '/customer')
      setCustomers(results.data)
    }
    getCustomers()
  }, [customers])

  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=320,height=320'
    window.open(url, 'customerlist', 'popup', windowFeatures)
  }

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',
  })

  /*const totalAmt = loanBalances.reduce((a, i) => {
    return a + i.Balance
  }, 0)
  */

  const customerName = customers.map((opt) => ({
    label: opt.fullName + ' - ' + opt.accountNumber,
    value: opt.id,
  }))

  const handleCustomerSelected = async (opt) => {
    const optValue = opt.value
    setCustomer(optValue)
    const results = await axios.get(
      apiUrl + '/loanreports/customer/' + optValue,
    )
    console.log(results.data)
    setCustomerLoans(results.data)
  }
  return (
    <div>
      <div class="mb-3 row">
        <CLabel htmlFor="nameOfCustomer" className="col-sm-3 col-form-label">
          Select of Customer
        </CLabel>
        <div class="col-sm-12">
          <AdaboSelect
            className="form-control-xl mb-2 mt-2"
            options={customerName}
            onChange={handleCustomerSelected}
          />
        </div>
      </div>
      <CRow>
        <CCol lg={12}>
          <CCard>
            <CCardHeader className="text-right"></CCardHeader>
            <h4 className="text-center mt-3">Customer Loans</h4>
            <CCardBody>
              <Table className="table-sm">
                <caption>Customer Loans</caption>
                <thead>
                  <tr className="fs-sm">
                    <th></th>
                    <th>Account Number</th>
                    <th>Customer</th>
                    <th>Loan ID</th>
                    <th>Product</th>
                    <th>Principal</th>
                    <th>Interest</th>
                    <th>Date Booked</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {customerLoans.map((c, index) => (
                    <tr key={c.id}>
                      <td>{index + 1}</td>
                      <td>{c.accountNumber}</td>
                      <td>{c.customer}</td>
                      <td>{c.loanId}</td>
                      <td>{c.product}</td>
                      <td>{formatter.format(c.principal)}</td>
                      <td>{formatter.format(c.interest)}</td>
                      <td>{c.dateBooked}</td>
                      <td>
                        <CButton
                          className="btn-sm float-right"
                          onClick={() =>
                            openCustomerListAsReport(
                              reportUrl +
                                '/paymentHistory.aspx?' +
                                customer +
                                '?' +
                                c.id,
                            )
                          }
                        >
                          View History
                        </CButton>
                      </td>
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

export default PaymentHistory
