import React, { useState, useEffect } from 'react'
import {
  Link,
  useNavigate,
  Navigate,
  useParams,
  useHistory,
} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { Modal } from 'react-bootstrap'
import auth from '../../components/services/authService'
import Joi from 'joi-browser'
import Swal from 'sweetalert2'
import { apiUrl } from '../../config.json'
import '../../.././src/schedulecards.css'
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
  Badge,
  //Modal,
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

import {
  LineChart,
  BarChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
  Label,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { GiSatelliteCommunication } from 'react-icons/gi'

const CashAccounting = () => {
  const [user, setUser] = useState(auth.getCurrentUser)
  const [expenses, setExpenses] = useState(0)
  const [loans, setLoans] = useState(0)
  const [vaultTransfer, setVaultTransfer] = useState(0)
  const [registrations, setRegistrations] = useState(0)
  const [processingFee, setProcessingFee] = useState(0)
  const [collateral, setCollateral] = useState(0)
  const [tdate, setTdate] = useState(new Date().toISOString().slice(0, 10))
  const [render, setRender] = useState(false)

  let navigate = useHistory()

  useEffect(() => {
    async function getLoanCollections() {
      const results = await axios.get(apiUrl + '/cashaccounting/loans/' + tdate)
      setLoans(results.data[0].TotalAmount)
    }
    getLoanCollections()
  }, [tdate])

  useEffect(() => {
    async function getCollateralCollections() {
      const results = await axios.get(
        apiUrl + '/cashaccounting/collateral/' + tdate,
      )
      setCollateral(results.data[0].collateral)
    }
    getCollateralCollections()
  }, [tdate])

  useEffect(() => {
    async function getRegistrationCollections() {
      const results = await axios.get(
        apiUrl + '/cashaccounting/registration/' + tdate,
      )
      setRegistrations(results.data[0].registrations)
    }
    getRegistrationCollections()
  }, [tdate])

  useEffect(() => {
    async function getExpenses() {
      const results = await axios.get(
        apiUrl + '/cashaccounting/expenses/' + tdate,
      )
      setExpenses(results.data[0].expenses)
    }
    getExpenses()
  }, [tdate])

  useEffect(() => {
    async function getProcessingFee() {
      const results = await axios.get(
        apiUrl + '/cashaccounting/processingFee/' + tdate,
      )
      setProcessingFee(results.data[0].processingFee)
    }
    getProcessingFee()
  }, [tdate])

  useEffect(() => {
    async function checkVaultTransfer() {
      //console.log(tdate)
      const results = await axios.get(apiUrl + '/vault/checkendofday/' + tdate)
      setVaultTransfer(results.data[0].id)
      //console.log(results.data[0].id)
    }
    checkVaultTransfer()
    //console.log(vaultTransfer)
  }, [tdate])

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  const handleDateChange = (e) => {
    setTdate(e.currentTarget.value)
  }

  const handleTranfer = async () => {
    if (cashAtHand <= 0)
      return Swal.fire(
        'Transactions Empty',
        'No transaction records showing',
        'info',
      )
    Swal.fire({
      title: 'Do you want to transfer cash at hand to vault ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Transfer',
      denyButtonText: `Don't Transfer`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await axios.post(apiUrl + '/cashaccounting', {
          Cr: cashAtHand,
          narration: 'Cash at hand from -' + tdate,
          tdate,
        })
        Swal.fire('Transferred!', '', 'success')
        setRender(!render)
      } else if (result.isDenied) {
        Swal.fire('Cancelled', '', 'info')
      }
    })
  }
  const cashAtHand = loans + registrations + collateral - expenses
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 mt-2">
          <div className="row justify-content-center">
            <h4 className="centertext mb-3">Daily Summary</h4>
          </div>

          <p className="text-center">
            This page gives a summary account of all monies received during the
            day. Expenses are made from such receipts and the remainder
            tranferred to vault.
          </p>
        </div>
        <CInput
          type="date"
          className="col-sm-12"
          id="dateOnCheque"
          value={tdate}
          onChange={(e) => {
            setTdate(e.currentTarget.value)
            console.log(e.currentTarget.value)
          }}
        />
        <div className="col-sm-6 mt-3 procFee_bg">
          <span className="">Processing Fees</span> :{' '}
          {formatter.format(processingFee)}
        </div>

        <div className="row mt-5 d-flex justify-content-center">
          <div className="col-sm-3 loans_bg text-center">
            <span className="">Loan Repayments</span>: {formatter.format(loans)}
          </div>

          <div className="col-sm-3 collateral_bg text-center">
            <span className="">Cash Collateral</span>:{' '}
            {formatter.format(collateral)}
          </div>

          <div className="col-sm-3 registration_bg">
            <span className="">Registrations</span>:{' '}
            {formatter.format(registrations)}
          </div>

          <div className="col-sm-3 expenses_bg">
            <span className="">Expenses</span> : {formatter.format(expenses)}
          </div>
        </div>
        <div className="col-sm-12 mt-5 cashAtHand_bg justify-content-center d-flex">
          <span className="">Cash At Hand</span> :{' '}
          {formatter.format(cashAtHand)}
        </div>
      </div>
      {vaultTransfer == 0 && (
        <CButton
          onClick={handleTranfer}
          className="col-sm-12 mt-5"
          color="success"
        >
          Complete End of Day
        </CButton>
      )}
    </div>
  )
}

export default CashAccounting
