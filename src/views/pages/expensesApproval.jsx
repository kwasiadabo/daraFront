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

const ExpensesApproval = () => {
  const [user, setUser] = useState(auth.getCurrentUser)
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
    expenseItem: 0,
    amount: 0,
    narration: '',
    madeBy: user.staff,
  })
  const [pageSize, setPageSize] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))
  let navigate = useHistory()

  useEffect(() => {
    async function getExpenses() {
      const results = await axios.get(
        apiUrl +
          '/transaction/expenses/unapproved/' +
          startDate +
          '/' +
          endDate,
      )
      setExpenses(results.data)
    }
    getExpenses()
  }, [startDate, endDate, render])

  const handleSearch = (event) => {
    setSearch(event.target.value)
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
    console.log(expensesData)
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
        expenseItem: 0,
        narration: '',
        amount: 0,
        madeBy: user.staff,
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

  const handleStartDateChange = (e) => {
    setStartDate(e.currentTarget.value)
  }
  const handleEndDateChange = (e) => {
    setEndDate(e.currentTarget.value)
  }

  const handleApprove = async (c) => {
    Swal.fire({
      title: 'Do you want to Approve this Expense?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Approve',
      denyButtonText: `Don't Approve`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await axios.put(apiUrl + '/transaction/expenses/' + c.id)
        Swal.fire('Approved!', '', 'success')
        setRender(!render)
      } else if (result.isDenied) {
        Swal.fire('Cancelled', '', 'info')
      }
    })
  }

  const handleApproveAll = () => {
    Swal.fire({
      title: 'Do you want to Approve all Expenses?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Approve',
      denyButtonText: `Don't Approve`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        expenses.map(async (i) => {
          await axios.put(apiUrl + '/transaction/expenses/' + i.id)
        })
        Swal.fire('Expenses Approved!', '', 'success')
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
            <h4 className="centertext mb-3">APPROVE EXPENSES</h4>
          </div>

          <p className="text-center">
            NB: An expense is the cost of operations that a company incurs to
            generate revenue. As the popular saying goes, “it costs money to
            make money.”
          </p>
        </div>

        <div className="col-sm-12">
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
          <div className="col-sm-12">
            <CButton
              onClick={handleApproveAll}
              className="btn-sm float-right mb-3 "
              color="success"
            >
              approve all
            </CButton>
          </div>

          <Table className="table-sm col-sm-12">
            <thead className="">
              <tr className="fs-sm">
                <th></th>
                <th>Date</th>
                <th>Item</th>
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
                  <td>{c.narration}</td>
                  <td>{formatter.format(c.amount)}</td>
                  <td>{c.madeBy}</td>
                  <td>
                    {!c.approved && (
                      <CButton
                        onClick={() => handleApprove(c)}
                        className="btn-sm float-right"
                        color="danger"
                      >
                        Approve
                      </CButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default ExpensesApproval
