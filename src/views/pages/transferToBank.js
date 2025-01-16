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

const TransferToBank = () => {
  const [user, setUser] = useState(auth.getCurrentUser)

  const [show, setShow] = useState(false)

  const [render, setRender] = useState(false)
  const [search, setSearch] = useState('')
  const [bankAccounts, setBankAccounts] = useState([])
  const [banks, setBanks] = useState([])
  const [bankDeposits, setBankDeposits] = useState([])
  const [vaultBal, setVaultBal] = useState(0)
  const [data, setData] = useState({
    tdate: new Date().toISOString().slice(0, 10),
    cr: '',
    narration: '',
    bank: '',
    accountNo: '',
    userId: user.nameOfStaff,
  })

  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))
  let navigate = useHistory()

  useEffect(() => {
    async function getBankDeposits() {
      const results = await axios.get(
        apiUrl + '/banktrans/' + startDate + '/' + endDate,
      )
      setBankDeposits(results.data)
    }
    getBankDeposits()
  }, [startDate, endDate, render])

  useEffect(() => {
    async function getBanks() {
      const results = await axios.get(apiUrl + '/setup/bank')
      setBanks(results.data)

      const vaultResults = await axios.get(apiUrl + '/vault/balance')
      //console.log(vaultResults.data[0].VaultBalance)
      setVaultBal(vaultResults.data[0].VaultBalance)
      // setUser(auth.getCurrentUser)
    }
    getBanks()
  }, [])

  const handleBankChange = (e) => {
    getBankAccounts(e.currentTarget.value)
    setData({
      ...data,
      bank: e.currentTarget.value,
    })
  }

  const getBankAccounts = async (bank) => {
    const results = await axios.get(apiUrl + '/setup/bankaccount/' + bank)
    setBankAccounts(results.data)
    //console.log(results.data)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  /*let customersList = customers.find(
      (o) => o.fullName.toLowerCase() === search.toLowerCase()
    );*/

  //console.log(customersList);
  // const allCustomers = paginate(customers, currentPage, pageSize)

  const schemaMap = {
    tdate: Joi.date().required().label('Date Expected'),
    cr: Joi.number().required().label('Amount Required'),
    narration: Joi.string().required().label('Narration'),
    bank: Joi.number().required().label('Bank'),
    accountNo: Joi.number().required().label('Account Number'),
    userId: Joi.string().allow('').label('Made by'),
  }

  const schema = Joi.object(schemaMap)

  const validateForm = () => {
    const result = Joi.validate(data, schema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  const handleSubmit = async () => {
    if (data.cr > vaultBal)
      return Swal.fire(
        'OOPS',
        'Insufficient Vault Amount. Deposit NOT Possible',
        'error',
      )
    const validate = validateForm()
    if (validate !== null) {
      return Swal.fire('OOPS', validate, 'error')
    }

    const results = await axios.post(apiUrl + '/banktrans', data)
    if (results.status === 200) {
      Swal.fire('Success', 'Bank Deposit made Successfully', 'success')
      setData({
        tdate: new Date().toISOString().slice(0, 10),
        cr: '',
        narration: '',
        bank: '',
        accountNo: '',
        userId: user.nameOfStaff,
      })
      setRender(!render)
    } else {
      Swal.fire('OOPS', 'Deposit Failed', 'error')
    }
  }

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  const handleAmountChanged = (e) => {
    setData({
      ...data,
      amount: e.currentTarget.value,
    })
  }

  const handleClose = () => {
    setData({
      tdate: new Date().toISOString().slice(0, 10),
      cr: '',
      narration: '',
      bank: '',
      accountNo: '',

      userId: user.nameOfStaff,
    })
    setShow(false)
  }

  const handleStartDateChange = (e) => {
    setStartDate(e.currentTarget.value)
  }
  const handleEndDateChange = (e) => {
    setEndDate(e.currentTarget.value)
  }

  const handleDelete = async (c) => {
    Swal.fire({
      title: 'Do you want to Delete this Deposit?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await axios.delete(apiUrl + '/banktrans/' + c.id)
        Swal.fire('Deleted!', '', 'success')
        setRender(!render)
      } else if (result.isDenied) {
        Swal.fire('Cancelled', '', 'info')
      }
    })
  }

  const totalAmt = bankDeposits.reduce((a, i) => {
    return a + i.amount
  }, 0)
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 mt-2">
          <div className="row justify-content-center">
            <h4 className="centertext mb-3">Transfer Cash To Bank</h4>
          </div>

          <p className="text-center">
            NB: Transfer cash from vault to various bank accounts”
          </p>
        </div>

        <div className="col-sm-12">
          <CButton
            onClick={() => setShow(!show)}
            className="btn-sm float-right m-3 "
            color="success"
          >
            + Make New Entry
          </CButton>
          {/*<CInput
            type="text"
            name="searchCustomer"
            className="float-center col-sm-3 mb-3 mt-3"
            id="searchCustomer"
            value={null}
            onChange={handleSearch}
            placeholder="Search Customer"
          />*/}
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
            <div className="col-sm-3 text-right">
              Total Deposits: <strong>{formatter.format(totalAmt)}</strong>
            </div>
          </div>

          <Table className="table-sm col-sm-12">
            <thead className="">
              <tr className="fs-sm">
                <th></th>
                <th>Date</th>
                <th>Bank</th>
                <th>Account</th>
                <th>Narration</th>
                <th>Amount</th>
                <th>Made By.</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bankDeposits.map((c, index) => (
                <tr key={c.id}>
                  <td>{index + 1}</td>
                  <td>{c.tdate}</td>
                  <td>{c.bank}</td>
                  <td>{c.accountNumber}</td>
                  <td>{c.narration}</td>
                  <td>{formatter.format(c.amount)}</td>
                  <td>{c.userId}</td>
                  <td>
                    {!c.isApproved && (
                      <CButton
                        onClick={() => handleDelete(c)}
                        className="btn-sm float-right"
                        color="danger"
                      >
                        Delete
                      </CButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <CModal
        className="fade col-sm-10"
        size="md"
        show={show}
        data-backdrop="static"
        data-keyboard="false"
        color="success"
        onClose={() => {
          setShow(!show)
        }}
      >
        <CModalHeader className="modal-header" closeButton>
          <p>
            <h3>Make Bank Deposit</h3>
          </p>
        </CModalHeader>

        <CModalBody className="modal-body">
          <form>
            <label htmlFor="tdate" className="form-label">
              Transaction Date{' '}
            </label>
            <CInput
              type="date"
              name="tdate"
              className="form-control text-center col-sm-12 mb-3"
              id="tdate"
              value={data.tdate}
              onChange={(e) =>
                setData({
                  ...data,
                  tdate: e.currentTarget.value,
                })
              }
            />

            <CSelect
              className="form-select col-sm-12 mb-3"
              aria-label="Default"
              value={data.bank}
              onChange={handleBankChange}
            >
              <option defaultValue="">--Select Bank *--</option>
              {banks.map((b) => (
                <option key={b.id} value={b.id} id={b.id}>
                  {b.bank}
                </option>
              ))}
            </CSelect>

            <CSelect
              className="form-select col-sm-12 mb-3"
              aria-label="Default"
              value={data.accountNo}
              onChange={(e) =>
                setData({ ...data, accountNo: e.currentTarget.value })
              }
            >
              <option defaultValue="">--Select Account *--</option>
              {bankAccounts.map((b) => (
                <option key={b.id} value={b.id} id={b.id}>
                  {b.accountNumber}
                </option>
              ))}
            </CSelect>

            <label htmlFor="balance" className="form-label">
              Amount (GHC)
            </label>
            <CInput
              type="text"
              name="balance"
              className="form-control text-right col-sm-12 mb-3"
              id="balance"
              value={data.cr}
              onChange={(e) =>
                setData({
                  ...data,
                  cr: e.currentTarget.value,
                })
              }
            />

            <label htmlFor="depositAmount" className="form-label">
              Description *
            </label>
            <CInput
              autoComplete="off"
              type="text"
              name="depositAmount"
              className="form-control col-sm-12 mb-3"
              id="depositAmount"
              value={data.narration}
              onChange={(e) =>
                setData({
                  ...data,
                  narration: e.currentTarget.value,
                })
              }
            />
          </form>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={handleSubmit} className="btn-sm" color="success">
            Submit
          </CButton>
          <Button onClick={handleClose} className="btn-sm" color="danger">
            Close
          </Button>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default TransferToBank
