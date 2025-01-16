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
import { reportUrl } from '../../config.json'

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

const BankStatement = () => {
  const [user, setUser] = useState(auth.getCurrentUser)
  const [expenses, setExpenses] = useState([])
  const [statement, setStatement] = useState([])
  const [customerName, setCustomerName] = useState('')
  const [show, setShow] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [render, setRender] = useState(false)
  const [sumPaid, setSumPaid] = useState(0)
  const [sumWithdrawn, setSumWithdrawn] = useState(0)
  const [search, setSearch] = useState('')
  const [bank, setBank] = useState(0)
  const [banks, setBanks] = useState([])
  const [bankAccount, setBankAccount] = useState(0)
  const [bankAccounts, setBankAccounts] = useState([])
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))
  let navigate = useHistory()

  useEffect(() => {
    async function getStatement() {
      const results = await axios.get(
        apiUrl +
          '/loanreports/bankstatement/' +
          startDate +
          '/' +
          endDate +
          '/' +
          bank +
          '/' +
          bankAccount,
      )
      setStatement(results.data)
      console.log(results.data)
    }
    getStatement()
  }, [startDate, endDate, bank, bankAccount, render])

  useEffect(() => {
    async function getBanks() {
      const results = await axios.get(apiUrl + '/setup/bank')
      setBanks(results.data)
      // setUser(auth.getCurrentUser)
    }
    getBanks()
  }, [])

  const handleBankChange = (e) => {
    getBankAccounts(e.currentTarget.value)
    setBank(e.currentTarget.value)
  }

  const getBankAccounts = async (bank) => {
    const results = await axios.get(apiUrl + '/setup/bankaccount/' + bank)
    setBankAccounts(results.data)
  }

  /*let customersList = customers.find(
      (o) => o.fullName.toLowerCase() === search.toLowerCase()
    );*/

  //console.log(customersList);
  // const allCustomers = paginate(customers, currentPage, pageSize)

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

  const totalAmt = statement.reduce((a, i) => {
    return a + i.Balance
  }, 0)

  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=320,height=320'
    window.open(url, 'Bank Statement', 'popup', windowFeatures)
  }
  return (
    <div className="container-fluid">
      <div className="col-sm-12 ">
        <div className="row justify-content-center">
          <h4 className="centertext">VIEW BANK STATEMENT</h4>
        </div>
      </div>
      <div class="row">
        <CLabel htmlFor="bank" className="col-sm-5 col-form-label">
          Bank
        </CLabel>

        <CSelect
          id="bank"
          className="form-select col-sm-12 mb-3"
          aria-label="Default select example"
          value={bank}
          onChange={handleBankChange}
        >
          <option defaultValue="">--Select Bank--</option>
          {banks.map((b) => (
            <option key={b.id} value={b.id} id={b.id}>
              {b.bank}
            </option>
          ))}
        </CSelect>

        <CLabel for="bankAccount" class="col-sm-5 col-form-label">
          Bank Account
        </CLabel>

        <CSelect
          id="bankAccount"
          className="form-select col-sm-12"
          aria-label="Default select example"
          value={bankAccount}
          onChange={(e) => setBankAccount(e.currentTarget.value)}
        >
          <option defaultValue="">--Select Bank Account--</option>
          {bankAccounts.map((b) => (
            <option key={b.id} value={b.id} id={b.id}>
              {b.accountNumber}
            </option>
          ))}
        </CSelect>

        <CLabel htmlFor="dateOnCheque" className="col-sm-5 col-form-label">
          Start Date
        </CLabel>

        <CInput
          type="date"
          class="form-control col-sm-12 mb-3"
          id="dateOnCheque"
          value={startDate}
          onChange={handleStartDateChange}
        />

        <CLabel htmlFor="dateOnCheque" className="col-sm-3 float-left">
          End Date
        </CLabel>

        <CInput
          type="date"
          class="form-control col-sm-12"
          id="dateOnCheque"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
      <div class="row justify-content-center">
        <div className="col-sm-12 mt-3">
          <CButton
            onClick={() =>
              openCustomerListAsReport(
                reportUrl +
                  '/bankStatement.aspx?' +
                  startDate +
                  '?' +
                  endDate +
                  '?' +
                  bank +
                  '?' +
                  bankAccount,
              )
            }
            className="btn-sm float-right mb-3 "
            color="success"
          >
            View Bank Statement
          </CButton>
        </div>

        <Table className="table-sm col-sm-12">
          <thead className="">
            <tr className="fs-sm">
              <th></th>
              <th>Date</th>
              <th>Narration</th>
              <th>Deposits</th>
              <th>Withdrawal</th>
              <th>Balance</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {statement.map((c, index) => (
              <tr key={c.id}>
                <td>{index + 1}</td>
                <td>{c.tdate}</td>
                <td>{c.Narration}</td>
                <td>{formatter.format(c.Cr)}</td>
                <td>{formatter.format(c.Dr)}</td>
                <td>{formatter.format(c.Balance)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default BankStatement
