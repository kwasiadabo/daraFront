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

//const user = auth.getCurrentUser()
const Expenses = () => {
  const user = auth.getCurrentUser()
  //const [user, setUser] = useState(auth.getCurrentUser)
  const [expenses, setExpenses] = useState([])
  const [customerName, setCustomerName] = useState('')
  const [show, setShow] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [render, setRender] = useState(false)
  const [sumPaid, setSumPaid] = useState(0)
  const [sumWithdrawn, setSumWithdrawn] = useState(0)
  const [search, setSearch] = useState('')
  const [bal, setBal] = useState(0)
  const [loanBal, setLoanBal] = useState(0)
  const [expenseItems, setExpenseItems] = useState([])
  const [expensesData, setExpensesData] = useState({
    expenseItem: '',
    modeOfPayment: '',
    amount: '',
    narration: '',
    madeBy: user.staff,
    bank: 0,
    accountNumber: 0,
    dateOnCheque: '',
    nameOnCheque: '',
    chequeNumber: '',
    tdate: new Date().toISOString().slice(0, 10),
  })
  const [pageSize, setPageSize] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [banks, setBanks] = useState([])
  const [bankAccounts, setBankAccounts] = useState([])
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))
  let navigate = useHistory()

  useEffect(() => {
    async function getExpenses() {
      const results = await axios.get(
        apiUrl + '/transaction/expenses/' + startDate + '/' + endDate,
      )
      setExpenses(results.data)
      console.log(user)
    }
    getExpenses()
  }, [startDate, endDate, render])

  useEffect(() => {
    async function getExpenseItems() {
      const results = await axios.get(apiUrl + '/setup/expensesitem')
      setExpenseItems(results.data)
    }
    getExpenseItems()
  }, [render])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

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
    setExpensesData({
      ...expensesData,
      bank: e.currentTarget.value,
    })
  }

  const getBankAccounts = async (bank) => {
    const results = await axios.get(apiUrl + '/setup/bankaccount/' + bank)
    setBankAccounts(results.data)
    //console.log(results.data)
  }

  /*let customersList = customers.find(
      (o) => o.fullName.toLowerCase() === search.toLowerCase()
    );*/

  //console.log(customersList);
  // const allCustomers = paginate(customers, currentPage, pageSize)

  const data = {
    allExpenses: expenses.filter(
      (item) =>
        item.item.toLowerCase().includes(search.toLowerCase()) ||
        item.madeBy.toLowerCase().includes(search.toLowerCase()),
    ),
  }

  const dataTouse = search.length === 0 ? expenses : data.allExpenses

  const schemaMap = {
    expenseItem: Joi.number().required().label('Expense Item'),
    narration: Joi.string().required().label('Narration'),
    amount: Joi.number().required().label('Withdrawal Amount'),
    madeBy: Joi.number().required().label('Made by'),
    modeOfPayment: Joi.string().required().label('Mode of Payment'),
    bank: Joi.number(),
    accountNumber: Joi.number(),
    sending: Joi.string().allow(''),
    receiving: Joi.string().allow(''),
    dateOnCheque: Joi.string().allow(''),
    nameOnCheque: Joi.string().allow(''),
    chequeNumber: Joi.string().allow(''),
    tdate: Joi.date().required().label('Transaction Date'),
  }

  const schema = Joi.object(schemaMap)

  const validateForm = () => {
    const result = Joi.validate(expensesData, schema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  const handleSubmit = async () => {
    console.log(user)
    const validate = validateForm()
    if (validate !== null) {
      return Swal.fire('OOPS', validate, 'error')
    }

    const results = await axios.post(
      apiUrl + '/transaction/expenses',
      expensesData,
    )
    if (results.status === 200) {
      Swal.fire('Success', 'Expense made Successfully', 'success')
      setExpensesData({
        expenseItem: '',
        modeOfPayment: '',
        narration: '',
        amount: '',
        madeBy: user.staff,
        bank: 0,
        accountNumber: 0,
        sending: '',
        receiving: '',
        dateOnCheque: '',
        nameOnCheque: '',
        chequeNumber: '',
        tdate: new Date().toISOString().slice(0, 10),
      })
      setRender(!render)
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
    setExpensesData({
      ...expensesData,
      amount: e.currentTarget.value,
    })
  }

  const handleClose = () => {
    setExpensesData({
      expenseItem: '',
      modeOfPayment: '',
      narration: '',
      amount: '',
      madeBy: user.staff,
      bank: 0,
      accountNumber: 0,
      sending: '',
      receiving: '',
      dateOnCheque: '',
      nameOnCheque: '',
      chequeNumber: '',
      tdate: new Date().toISOString().slice(0, 10),
    })
    setShow(false)
    setShowTransfer(false)
  }

  const handleStartDateChange = (e) => {
    setStartDate(e.currentTarget.value)
  }
  const handleEndDateChange = (e) => {
    setEndDate(e.currentTarget.value)
  }

  const handleExpenseItemSelect = (c) => {
    setExpensesData({
      ...expensesData,
      expenseItem: c.currentTarget.value,
    })
    //setOfficer(c.nameOfStaff);
    // setShow(!show);
  }

  const handleExpenseModeSelect = (c) => {
    setExpensesData({
      ...expensesData,
      modeOfPayment: c.currentTarget.value,
    })
    //setOfficer(c.nameOfStaff);
    // setShow(!show);
  }

  const handleExpenseAccountSelect = (c) => {
    setExpensesData({
      ...expensesData,
      accountNumber: c.currentTarget.value,
    })
    //setOfficer(c.nameOfStaff);
    // setShow(!show);
  }

  const handleDelete = async (c) => {
    Swal.fire({
      title: 'Do you want to Delete this Expense?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await axios.delete(apiUrl + '/transaction/expenses/' + c.id)
        Swal.fire('Deleted!', '', 'success')
        setRender(!render)
      } else if (result.isDenied) {
        Swal.fire('Cancelled', '', 'info')
      }
    })
  }

  const totalAmt = expenses.reduce((a, i) => {
    return a + i.amount
  }, 0)
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 mt-2">
          <div className="row justify-content-center">
            <h4 className="centertext mb-3">Offices Expenses Entry</h4>
          </div>

          <p className="text-center">
            NB: An expense is the cost of operations that a company incurs to
            generate revenue. As the popular saying goes, “it costs money to
            make money.”
          </p>
        </div>

        <div className="col-sm-12">
          <CButton
            onClick={() => setShow(!show)}
            className="btn-sm float-right m-3 "
            color="success"
          >
            + Enter New Expense
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
              Total Expenses: <strong>{formatter.format(totalAmt)}</strong>
            </div>
          </div>

          <Table className="table-sm col-sm-12">
            <thead className="">
              <tr className="fs-sm">
                <th></th>
                <th>Date</th>
                <th>Item</th>
                <th>Mode Of Payment</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Made By.</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataTouse.map((c, index) => (
                <tr key={c.id}>
                  <td>{index + 1}</td>
                  <td>{c.tdate}</td>
                  <td>{c.item}</td>
                  <td>{c.modeOfPayment}</td>
                  <td>{c.narration}</td>
                  <td>{formatter.format(c.amount)}</td>
                  <td>{c.madeBy}</td>
                  <td>
                    {!c.approved && (
                      <CButton
                        onClick={() => handleDelete(c)}
                        className="btn-sm float-right"
                        color="danger"
                      >
                        Remove
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
        className="fade col-sm-8"
        size="md"
        show={show}
        color="success"
        data-backdrop="static"
        data-keyboard="false"
        onClose={() => {
          setShow(!show)
        }}
      >
        <CModalHeader className="modal-header" closeButton>
          <p>
            <h3 className="centertext">EXPENDITURE</h3>
          </p>
        </CModalHeader>
        <CModalBody className="modal-body">
          <form>
            <CLabel htmlFor="dateOnCheque" className="col-sm-5">
              Trans. Date
            </CLabel>

            <CInput
              type="date"
              class="form-control  bold mb-3"
              id="dateOnCheque"
              value={expensesData.tdate}
              onChange={(e) =>
                setExpensesData({
                  ...expensesData,
                  tdate: e.currentTarget.value,
                })
              }
            />

            <CSelect
              className="form-select col-sm-12 mb-3"
              aria-label="Default"
              value={expensesData.expenseItem}
              onChange={handleExpenseItemSelect}
            >
              <option defaultValue="">--Select Expense Item*--</option>
              {expenseItems.map((b) => (
                <option key={b.id} value={b.id} id={b.id}>
                  {b.item}
                </option>
              ))}
            </CSelect>

            <CSelect
              className="form-select col-sm-12 mb-3"
              aria-label="Default"
              value={expensesData.modeOfPayment}
              onChange={handleExpenseModeSelect}
            >
              <option defaultValue="">Mode Of Payment</option>
              <option value="Cash">Cash</option>
              <option value="Momo">MoMo</option>
              <option value="Cheque">Cheque</option>
            </CSelect>

            {expensesData.modeOfPayment === 'Cheque' && (
              <CSelect
                className="form-select col-sm-12 mb-3"
                aria-label="Default"
                value={expensesData.bank}
                onChange={handleBankChange}
              >
                <option defaultValue="">Select Bank</option>
                {banks.map((b) => (
                  <option key={b.id} value={b.id} id={b.id}>
                    {b.bank}
                  </option>
                ))}
              </CSelect>
            )}

            {expensesData.modeOfPayment === 'Cheque' && (
              <CSelect
                className="form-select col-sm-12 mb-3"
                aria-label="Default"
                value={expensesData.accountNumber}
                onChange={handleExpenseAccountSelect}
              >
                <option defaultValue="">Select Account</option>
                {bankAccounts.map((b) => (
                  <option key={b.id} value={b.id} id={b.id}>
                    {b.accountNumber}
                  </option>
                ))}
              </CSelect>
            )}

            {expensesData.modeOfPayment === 'Cheque' && (
              <div>
                <CLabel htmlFor="nameOnCheque" className="col-sm-5">
                  Name on Cheque
                </CLabel>

                <CInput
                  type="text"
                  class="form-control  bold mb-3"
                  id="nameOnCheque"
                  value={expensesData.nameOnCheque}
                  onChange={(e) =>
                    setExpensesData({
                      ...expensesData,
                      nameOnCheque: e.currentTarget.value,
                    })
                  }
                />
              </div>
            )}

            {expensesData.modeOfPayment === 'Cheque' && (
              <div>
                <CLabel htmlFor="dateOnCheque" className="col-sm-5">
                  Date on Cheque
                </CLabel>

                <CInput
                  type="date"
                  class="form-control  bold mb-3"
                  id="dateOnCheque"
                  value={expensesData.dateOnCheque}
                  onChange={(e) =>
                    setExpensesData({
                      ...expensesData,
                      dateOnCheque: e.currentTarget.value,
                    })
                  }
                />
              </div>
            )}

            {expensesData.modeOfPayment === 'Cheque' && (
              <div>
                <CLabel htmlFor="chequeNumber" className="col-sm-3">
                  Cheque No.
                </CLabel>

                <CInput
                  type="text"
                  className="form-control  bold mb-3"
                  id="chequeNumber"
                  value={expensesData.chequeNumber}
                  onChange={(e) =>
                    setExpensesData({
                      ...expensesData,
                      chequeNumber: e.currentTarget.value,
                    })
                  }
                />
              </div>
            )}

            {expensesData.modeOfPayment === 'Momo' && (
              <div className="mb-3 row">
                <CLabel htmlFor="sending" className="col-sm-5 ">
                  Sending (MoMo Number)
                </CLabel>
                <div className="col-sm-12">
                  <CInput
                    id="sending"
                    className="form-control text-center bold mb-3"
                    type="text"
                    value={expensesData.sending}
                    onChange={(e) =>
                      setExpensesData({
                        ...expensesData,
                        sending: e.currentTarget.value,
                      })
                    }
                  />
                </div>

                <CLabel htmlFor="receivinb" className="col-sm-5">
                  Receiving (MoMo Number)
                </CLabel>
                <div className="col-sm-12">
                  <CInput
                    id="receiving"
                    className="form-control text-center bold"
                    type="text"
                    value={expensesData.receiving}
                    onChange={(e) =>
                      setExpensesData({
                        ...expensesData,
                        receiving: e.currentTarget.value,
                      })
                    }
                  />
                </div>
              </div>
            )}

            <label htmlFor="balance" className="form-label">
              Amount (GHC)
            </label>
            <CInput
              type="text"
              name="balance"
              className="form-control text-right col-sm-12 mb-3"
              id="balance"
              value={expensesData.amount}
              onChange={(e) =>
                setExpensesData({
                  ...expensesData,
                  amount: e.currentTarget.value,
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
              value={expensesData.narration}
              onChange={(e) =>
                setExpensesData({
                  ...expensesData,
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

export default Expenses
