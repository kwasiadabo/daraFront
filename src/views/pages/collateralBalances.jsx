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

const CollateralBalances = () => {
  const [loanBookings, setLoanBookings] = useState([])
  const [render, setRender] = useState(false)
  const [collateralBalances, setCollateralBalances] = useState([])

  useEffect(() => {
    async function viewCollateralBalances() {
      const results = await axios.get(
        apiUrl + '/loanreports/collateralBalances',
      )
      setCollateralBalances(results.data)
    }
    viewCollateralBalances()
  }, [])

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

  const totalAmt = collateralBalances.reduce((a, i) => {
    return a + i.Balance
  }, 0)
  return (
    <div>
      <div className="row justify-content-center mb-3">
        <p className="mb-2">
          The list shows the balances of all active loans. View it a report by
          clicking on the 'view as report' button.
        </p>
      </div>
      <CRow>
        <CCol lg={12}>
          <CCard>
            <CCardHeader className="text-right">
              <CButton
                className="float-right m-3 col-sm-2 btn-sm"
                color="success"
                onClick={() =>
                  openCustomerListAsReport(
                    reportUrl + '/collateralBalances.aspx',
                  )
                }
              >
                View As Report
              </CButton>
            </CCardHeader>
            <h4 className="text-center mt-3">Customers Collateral Balances</h4>
            <CCardBody>
              <span>Total of Balances : {formatter.format(totalAmt)}</span>
              <Table className="table-sm">
                <caption>Collateral Balances</caption>
                <thead>
                  <tr className="fs-sm">
                    <th></th>
                    <th>Account Number</th>
                    <th>Customer</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {collateralBalances.map((c, index) => (
                    <tr key={c.id}>
                      <td>{index + 1}</td>
                      <td>{c.accountNumber}</td>
                      <td>{c.fullName}</td>
                      <td>{formatter.format(c.Balance)}</td>
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

export default CollateralBalances
