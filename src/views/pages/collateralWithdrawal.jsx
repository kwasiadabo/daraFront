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

const CollateralWithdrawal = () => {
  const [user, setUser] = useState(auth.getCurrentUser)
  const [customers, setCustomers] = useState([])
  const [customerName, setCustomerName] = useState('')
  const [show, setShow] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [render, setRender] = useState(false)
  const [sumPaid, setSumPaid] = useState(0)
  const [sumWithdrawn, setSumWithdrawn] = useState(0)
  const [search, setSearch] = useState('')
  const [bal, setBal] = useState(0)
  const [loanBal, setLoanBal] = useState(0)
  const [deposit, setDeposit] = useState({
    customer: 0,
    amount: 0,
    narration: '',
    entryBy: user.staff,
  })
  const [pageSize, setPageSize] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  let navigate = useHistory()

  useEffect(() => {
    async function getCustomers() {
      const results = await axios.get(apiUrl + '/loan/cashcollateral/withbal')
      setCustomers(results.data)
    }
    getCustomers()
  }, [render])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  /*let customersList = customers.find(
      (o) => o.fullName.toLowerCase() === search.toLowerCase()
    );*/

  //console.log(customersList);
  // const allCustomers = paginate(customers, currentPage, pageSize)

  const data = {
    scustomers: customers.filter((item) =>
      item.fullName.toLowerCase().includes(search.toLowerCase()),
    ),
  }

  const dataTouse = search.length === 0 ? customers : data.scustomers

  const schemaMap = {
    customer: Joi.number().required().label('Customer'),
    entryBy: Joi.number(),
    narration: Joi.string().required().label('Narration'),
    amount: Joi.number().allow('').label('Withdrawal Amount'),
  }

  const schema = Joi.object(schemaMap)

  const validateForm = () => {
    const result = Joi.validate(deposit, schema)
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
    if (loanBal > 0) {
      return Swal.fire(
        'Withdrawal Failure',
        'Customer has not completed loan Payment. Withdrawal NOT Possible',
        'warning',
      )
    }

    if (deposit.amount > bal) {
      return Swal.fire(
        'Withdrawal Failure',
        'Insufficient Collateral Balance',
        'warning',
      )
    }

    if (!(deposit.amount > 0)) {
      return Swal.fire(
        'Withdrawal Failure',
        'Invalid Withdrawal Amount',
        'warning',
      )
    }

    const results = await axios.post(
      apiUrl + '/loan/cashcollateral/withdrawal',
      deposit,
    )
    if (results.status === 200) {
      Swal.fire(
        'Success',
        'Collateral withdrawal Successful, Pending Authorisation',
        'success',
      )
      setDeposit({
        customer: 0,
        amount: 0,
        entryBy: user.staff,
        narration: '',
      })
      setRender(!render)
      setShow(!show)
    }
  }

  const handleTransfer = async () => {
    const validate = validateForm()
    if (validate !== null) {
      return Swal.fire('OOPS', validate, 'error')
    }

    if (deposit.amount > bal) {
      return Swal.fire(
        'Transfer Failure',
        'Insufficient Collateral Balance',
        'warning',
      )
    }

    if (!(deposit.amount > 0)) {
      return Swal.fire('Tranfer Failure', 'Invalid Tranfer Amount', 'warning')
    }

    const results = await axios.post(apiUrl + '/loan/cashcollateral/tranfer', {
      customer: deposit.customer,
      Dr: deposit.amount,
      narration: deposit.narration,
      entryBy: user.staff,
    })
    if (results.status === 200) {
      Swal.fire(
        'Success',
        'Collateral Tranfer Successful, Pending Authorisation',
        'success',
      )
      setDeposit({
        customer: 0,
        amount: 0,
        entryBy: user.staff,
        narration: '',
      })
      setRender(!render)
      setShowTransfer(!showTransfer)
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
    setDeposit({
      ...deposit,
      amount: e.currentTarget.value,
    })
  }

  const handleClose = () => {
    setDeposit({
      customer: 0,
      amount: 0,
      entryBy: user.staff,
      narration: '',
    })
    setShow(false)
    setShowTransfer(false)
  }

  const handleGetCustomer = (c) => {
    setCustomerName(c.fullName)
    setBal(c.Bal)
    setDeposit({ ...deposit, customer: c.id })
    setShow(!show)
  }

  const handleGetTransferCustomer = (c) => {
    setCustomerName(c.fullName)
    setBal(c.Bal)
    setDeposit({ ...deposit, customer: c.id })
    setShowTransfer(!showTransfer)
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 mt-2">
          <div className="row justify-content-center">
            <h4 className="centertext mb-3">Cash Collateral Activities</h4>
          </div>
          <CInput
            type="text"
            name="searchCustomer"
            className="float-right col-sm-4 mb-3 mt-3"
            id="searchCustomer"
            value={null}
            onChange={handleSearch}
            placeholder="Search Customer"
          />
          <p className="text-left">
            NB: The list shows only customers with collateral balances greater
            than zero. i.e If customer does not have any balance, the details
            will not be shown below.
          </p>
          <Table className="table-sm col-sm-12">
            <thead className="">
              <tr className="fs-sm">
                <th></th>
                <th>ID</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Gender</th>
                <th>Officer</th>
                <th>Current Balance.</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataTouse.map((c, index) => (
                <tr key={c.id}>
                  <td>{index + 1}</td>
                  <td>{c.idNumber}</td>
                  <td>{c.fullName}</td>
                  <td>{c.phone}</td>
                  <td>{c.gender}</td>
                  <td>{c.nameOfStaff}</td>
                  <td>{formatter.format(c.Bal)}</td>
                  <td>
                    <CDropdown className="m-1">
                      <CDropdownToggle color="success" size="sm">
                        Actions
                      </CDropdownToggle>
                      <CDropdownMenu size="sm">
                        <CDropdownDivider />
                        <CDropdownItem onClick={() => handleGetCustomer(c)}>
                          Withdrawal
                        </CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem
                          onClick={() => handleGetTransferCustomer(c)}
                        >
                          Transfer
                        </CDropdownItem>
                        <CDropdownDivider />
                        {/*<CDropdownItem
                            onClick={() =>
                              navigate.push('/loan/collateralloanpayment')
                            }
                          >
                            Loan Repayment
                        </CDropdownItem>
                          <CDropdownDivider />*/}
                      </CDropdownMenu>
                    </CDropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <CButton
          onClick={() => navigate.push('/loan/viewcollateralwithdrawals')}
          className="btn-sm float-left mt-3"
          color="info"
        >
          View Withdrawals and Transfers
        </CButton>
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
            <h3>Collateral Withdrawal</h3>
          </p>
        </Modal.Header>

        <Modal.Body className="modal-body">
          <form>
            <label htmlFor="dateOfCollection" className="form-label">
              Customer Name
            </label>
            <CInput
              type="text"
              name="customer"
              className="form-control text-center col-sm-12 mb-3"
              id="customer"
              value={customerName}
              readOnly
            />
            <label htmlFor="balance" className="form-label">
              Collateral Balance
            </label>
            <CInput
              type="text"
              name="balance"
              className="form-control text-right col-sm-12 mb-3"
              id="balance"
              value={formatter.format(bal)}
              readOnly
            />

            <label htmlFor="depositAmount" className="form-label">
              Amount *
            </label>
            <CInput
              autoComplete="off"
              type="text"
              name="depositAmount"
              className="form-control col-sm-12 mb-3"
              id="depositAmount"
              value={deposit.amount}
              onChange={handleAmountChanged}
            />

            <label htmlFor="comment" className="form-label">
              Comment
            </label>
            <CInput
              autoComplete="off"
              type="text"
              name="comment"
              className="form-control  col-sm-12 mb-3"
              id="comment"
              value={deposit.narration}
              onChange={(e) =>
                setDeposit({
                  ...deposit,
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
        show={showTransfer}
        data-backdrop="static"
        data-keyboard="false"
      >
        <Modal.Header className="modal-header">
          <p>
            <h3>Collateral Transfer</h3>
          </p>
        </Modal.Header>

        <Modal.Body className="modal-body">
          <form>
            <label htmlFor="dateOfCollection" className="form-label">
              Customer Name
            </label>
            <CInput
              type="text"
              name="customer"
              className="form-control text-center col-sm-12 mb-3"
              id="customer"
              value={customerName}
              readOnly
            />
            <label htmlFor="balance" className="form-label">
              Collateral Balance
            </label>
            <CInput
              type="text"
              name="balance"
              className="form-control text-right col-sm-12 mb-3"
              id="balance"
              value={formatter.format(bal)}
              readOnly
            />

            <label htmlFor="depositAmount" className="form-label">
              Tranfer Amount *
            </label>
            <CInput
              autoComplete="off"
              type="text"
              name="depositAmount"
              className="form-control col-sm-12 mb-3"
              id="depositAmount"
              value={deposit.amount}
              onChange={handleAmountChanged}
            />

            <label htmlFor="comment" className="form-label">
              Comment
            </label>
            <CInput
              autoComplete="off"
              type="text"
              name="comment"
              className="form-control  col-sm-12 mb-3"
              id="comment"
              value={deposit.narration}
              onChange={(e) =>
                setDeposit({
                  ...deposit,
                  narration: e.currentTarget.value,
                })
              }
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <CButton onClick={handleTransfer} className="btn-sm" color="success">
            Submit
          </CButton>
          <Button onClick={handleClose} className="btn-sm" color="danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CollateralWithdrawal
