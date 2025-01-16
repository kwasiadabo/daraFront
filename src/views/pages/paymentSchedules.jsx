import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import Joi from 'joi-browser'
import CurrencyFormat from 'react-currency-format'
import Swal from 'sweetalert2'
import auth from '../../components/services/authService'
import { apiUrl } from '../../config.json'
import { reportUrl } from '../../config.json'
import '../../../src/schedulecards.css'
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

const PaymentSchedule = () => {
  const { disbursementId, customer } = useParams()
  const [render, setRender] = useState(false)
  const [paymentSchedule, setPaymentSchedule] = useState([])
  const [fullName, setFullName] = useState('')
  const [loanId, setLoanId] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const navigate = useHistory()
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  useEffect(() => {
    async function getPaymentSchedule() {
      const results = await axios.get(
        apiUrl +
          '/loan/booking/paymentschedule/' +
          disbursementId +
          '/' +
          customer,
      )
      setPaymentSchedule(results.data)
      setFullName(results.data[0].fullName)
      setAccountNumber(results.data[0].accountNumber)
      setLoanId(results.data[0].loanId)
    }
    getPaymentSchedule()
    // console.log(paymentSchedule[0])
  }, [render])

  const totalAmt = paymentSchedule.reduce((a, i) => {
    return a + i.dailyAmt
  }, 0)

  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=320,height=320'
    window.open(url, 'Payment Schedule', 'popup', windowFeatures)
  }
  return (
    <div className="container-fluid">
      <h4 className="mb-3 text-center">Loan Payment Schedule</h4>

      <CRow>
        <CCol lg={12}>
          <CCard>
            {/*<CCardHeader className="text-right">*/}
            <strong className="float-right m-3">
              <p>Account Number : {accountNumber}</p>
              <p>Loan ID : {loanId}</p>
              <p>Customer : {fullName}</p>
            </strong>
            {/*</CCardHeader>*/}

            <CCardBody>
              <strong className="float-right mb-3">
                Total Payment Expected : {formatter.format(totalAmt)}
              </strong>
              <Table className="table-sm text-center">
                <thead>
                  <tr className="fs-sm">
                    <th>No.</th>
                    <th>Date</th>
                    <th>Day</th>
                    <th>Daily Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {paymentSchedule.map((c, index) => (
                    <tr key={c.idNumber}>
                      <td>{index + 1}</td>
                      <td>{moment(c.paymentDate).format('DD-MMMM-YYYY')}</td>
                      <td>{c.dayNam}</td>
                      <td>{formatter.format(c.dailyAmt)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CCardBody>
            <div className="col-sm-12">
              {/* <CButton
                className="col-sm-2 btn-sm float-right mb-3 mr-3"
                color="success"
                onClick={window.print}
              >
                Print
             </CButton>*/}
              <CButton
                className="col-sm-2 btn-sm float-right mb-3 mr-3"
                color="danger"
                onClick={() =>
                  openCustomerListAsReport(
                    reportUrl +
                      '/paymentSchedule.aspx?' +
                      disbursementId +
                      '?' +
                      customer,
                  )
                }
              >
                Show as Report
              </CButton>
            </div>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default PaymentSchedule
