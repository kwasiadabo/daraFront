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

const ViewActiveLoans = () => {
  const [showActiveLoans, setShowActiveLoans] = useState([])
  const [render, setRender] = useState(false)
  const [dated, setDated] = useState(new Date())

  function formatDate(date) {
    let newDate = new Date(date)
    var year = newDate.getFullYear().toString()
    var month = (newDate.getMonth() + 101).toString().substring(1)
    var day = (newDate.getDate() + 100).toString().substring(1)
    return year + '-' + month + '-' + day
  }

  useEffect(() => {
    async function getActiveLoans() {
      const results = await axios.get(apiUrl + '/loanreports/activeloans')
      setShowActiveLoans(results.data)
      //if (results.data[0].img == null) return
      //setBuffer(results.data[0].img.data)
    }
    getActiveLoans()
  }, [render])

  /*useEffect(() => {
    async function getRegistrationFees() {
      const results = await axios.get(apiUrl + '/loan/registrationfee')
      setRegistrationFees(results.data)
    }
    getRegistrationFees()
  }, [registrationFees, render])
*/

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })
  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=320,height=320'
    window.open(url, 'customerlist', 'popup', windowFeatures)
  }
  return (
    <div>
      <CRow>
        <CCol lg={12}>
          <CCard>
            <h4 className="text-center mt-3">Active Loans</h4>
            <CCardBody>
              <Table className="table-sm">
                <caption>Booked Loans</caption>
                <thead>
                  <tr className="fs-sm">
                    <th></th>
                    <th>Loan ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Prinicipal</th>
                    <th>Date Booked</th>
                    <th>Officer</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {showActiveLoans.map((c, index) => (
                    <tr key={c.id}>
                      <td>{index + 1}</td>
                      <td>{c.loanId}</td>
                      <td>{c.fullName}</td>
                      <td>{c.product}</td>
                      <td>{formatter.format(c.principal)}</td>
                      <td>{c.dateBooked}</td>
                      <td>{c.nameOfStaff}</td>
                      <td>
                        <CDropdown className="">
                          <CDropdownToggle
                            color="info"
                            size="sm"
                            onClick={null}
                          >
                            Activities
                          </CDropdownToggle>
                          <CDropdownMenu size="sm">
                            <CDropdownItem
                              onClick={() =>
                                openCustomerListAsReport(
                                  reportUrl +
                                    '/paymentHistory.aspx?' +
                                    c.customer +
                                    '?' +
                                    c.id,
                                )
                              }
                            >
                              Payment History
                            </CDropdownItem>
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
    </div>
  )
}

export default ViewActiveLoans
