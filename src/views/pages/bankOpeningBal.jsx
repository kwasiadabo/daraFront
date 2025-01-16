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

const BankOpeningBal = () => {
  const [user, setUser] = useState(auth.getCurrentUser)

  const [show, setShow] = useState(false)
  const [vaultShow, setVaultShow] = useState(false)

  const [render, setRender] = useState(false)
  const [search, setSearch] = useState('')
  const [bankAccounts, setBankAccounts] = useState([])
  const [banks, setBanks] = useState([])
  const [balances, setBalances] = useState([])
  const [vaultBal, setVaultBal] = useState(0)
  const [data, setData] = useState({
    tdate: new Date().toISOString().slice(0, 10),
    cr: '',
    narration: '',
    bank: 0,
    accountNo: 0,
    userId: user.nameOfStaff,
  })

  const [vaultData, setVaultData] = useState({
    Cr: '',
    narration: '',
    //tdate: new Date().toISOString().slice(0, 10),
  })

  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))
  let navigate = useHistory()

  useEffect(() => {
    async function getOpeningBal() {
      const results = await axios.get(apiUrl + '/banktrans/openingBal')
      setBalances(results.data)
    }
    getOpeningBal()
  }, [render])

  useEffect(() => {
    async function getBanks() {
      const results = await axios.get(apiUrl + '/setup/bank')
      setBanks(results.data)
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
    const validate = validateForm()
    if (validate !== null) {
      return Swal.fire('OOPS', validate, 'error')
    }

    const results = await axios.post(apiUrl + '/banktrans/openingBal', data)
    if (results.status === 200) {
      Swal.fire('Success', 'Opening Balance Successfully', 'success')
      setData({
        tdate: new Date().toISOString().slice(0, 10),
        cr: '',
        narration: '',
        bank: 0,
        accountNo: 0,
        userId: user.nameOfStaff,
      })
      setRender(!render)
    } else {
      Swal.fire('OOPS', 'Opening Balance Failed', 'error')
    }
  }

  const handleVaultSubmit = async () => {
    console.log(vaultData)
    const results = await axios.post(apiUrl + '/vault', vaultData)
    if (results.status === 200) {
      Swal.fire('Success', 'Opening Balance Successfully', 'success')
      setVaultData({
        Cr: '',
        narration: '',
        tdate: new Date().toISOString().slice(0, 10),
      })
      setRender(!render)
    } else {
      Swal.fire('OOPS', 'Opening Balance Failed', 'error')
    }
    setVaultShow(!vaultShow)
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
      tdate: '',
      narration: '',
      amount: '',
      bank: '',
      accountNo: '',
      userId: user.nameOfStaff,
    })
    setShow(false)
  }

  const handleVaultClose = () => {
    setVaultData({
      Cr: '',
      narration: '',
      tdate: new Date().toISOString().slice(0, 10),
    })
    setVaultShow(false)
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

  const totalAmt = balances.reduce((a, i) => {
    return a + i.amount
  }, 0)
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 mt-2">
          <div className="row justify-content-center">
            <h4 className="centertext mb-3">Bank Opening Balance</h4>
          </div>

          <p className="text-center">NB: Enter Bank Opening Balance”</p>
        </div>

        <div className="col-sm-12">
          <CButton
            onClick={() => setShow(!show)}
            className="btn-sm float-right m-3  col-sm-4"
            color="success"
          >
            + Banks
          </CButton>

          <CButton
            onClick={() => setVaultShow(!vaultShow)}
            className="btn-sm float-left m-3 col-sm-4"
            color="info"
          >
            + Vault
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

          <Table className="table-sm col-sm-12">
            <thead className="">
              <tr className="fs-sm">
                <th></th>
                <th>Date</th>
                <th>Bank</th>
                <th>Account</th>
                <th>Narration</th>
                <th>Opening Balance</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {balances.map((c, index) => (
                <tr key={c.id}>
                  <td>{index + 1}</td>
                  <td>{c.tDate}</td>
                  <td>{c.bank}</td>
                  <td>{c.accountNumber}</td>
                  <td>{c.narration}</td>
                  <td>{formatter.format(c.Amount)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal
        className="fade col-sm-10"
        size="md"
        show={show}
        data-backdrop="static"
        data-keyboard="false"
      >
        <Modal.Header className="modal-header">
          <p>
            <h3>Enter Opening balance</h3>
          </p>
        </Modal.Header>

        <Modal.Body className="modal-body">
          <form>
            <label htmlFor="tdate" className="form-label">
              Date{' '}
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
              Opening Balance (GHC)
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
        </Modal.Body>
        <Modal.Footer>
          <CButton onClick={handleSubmit} className="btn-sm" color="success">
            Submit
          </CButton>
          <Button onClick={handleClose} className="btn-sm" color="danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        className="fade col-sm-10"
        size="md"
        show={vaultShow}
        data-backdrop="static"
        data-keyboard="false"
      >
        <Modal.Header className="modal-header">
          <p>
            <h3>Enter Opening balance - VAULT</h3>
          </p>
        </Modal.Header>

        <Modal.Body className="modal-body">
          <form>
            <label htmlFor="tdate" className="form-label">
              Date{' '}
            </label>
            <CInput
              type="date"
              name="tdate"
              className="form-control text-center col-sm-12 mb-3"
              id="tdate"
              value={vaultData.tdate}
              onChange={(e) =>
                setVaultData({
                  ...vaultData,
                  tdate: e.currentTarget.value,
                })
              }
            />

            <label htmlFor="balance" className="form-label">
              Opening Balance (GHC)
            </label>
            <CInput
              type="text"
              name="balance"
              className="form-control text-right col-sm-12 mb-3"
              id="balance"
              value={vaultData.Cr}
              onChange={(e) =>
                setVaultData({
                  ...vaultData,
                  Cr: e.currentTarget.value,
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
              value={vaultData.narration}
              onChange={(e) =>
                setVaultData({
                  ...vaultData,
                  narration: e.currentTarget.value,
                })
              }
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <CButton
            onClick={handleVaultSubmit}
            className="btn-sm"
            color="success"
          >
            Submit
          </CButton>
          <Button onClick={handleVaultClose} className="btn-sm" color="danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default BankOpeningBal
