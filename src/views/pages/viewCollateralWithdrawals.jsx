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
import { reportUrl } from '../../config.json'

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

/*import {
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
*/
import { GiSatelliteCommunication } from 'react-icons/gi'

const ViewCollateralWithdrawals = () => {
  const [user, setUser] = useState(auth.getCurrentUser)
  const [withdrawals, setWithdrawals] = useState([])
  const [customerName, setCustomerName] = useState('')
  const [show, setShow] = useState(false)
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
  const [items, setItems] = useState({
    idNumber: '',
    dr: 0,
    narration: '',
    date: new Date(),
  })
  const [pageSize, setPageSize] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))
  let navigate = useHistory()

  useEffect(() => {
    async function getData() {
      const results = await axios.get(
        apiUrl +
          '/loan/cashcollateral/withdrawals/' +
          startDate +
          '/' +
          endDate,
      )
      setWithdrawals(results.data)
    }
    getData()
  }, [startDate, endDate, render])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleStartDateChange = (e) => {
    setStartDate(e.currentTarget.value)
  }
  const handleEndDateChange = (e) => {
    setEndDate(e.currentTarget.value)
  }

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  const totalAmt = withdrawals.reduce((a, i) => {
    return a + i.Dr
  }, 0)

  const handleClose = () => {
    setDeposit({
      customer: 0,
      amount: 0,
      entryBy: user.staff,
      narration: '',
    })
    setShow(false)
  }
  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=320,height=320'
    window.open(url, 'customerlist', 'popup', windowFeatures)
  }

  const reverseWithdrawal = (item) => {
    setItems({
      id: item.id,
      idNumber: item.idNumber,
      dr: item.Dr,
      narration: item.narration,
      date: new Date(item.tdate),
    })
    // console.log(item)
    Swal.fire({
      title: 'Do you want to REVERSE this transaction?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Reverse',
      denyButtonText: `Don't`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log(item)
        const r = await axios.put(apiUrl + '/loan/cashcollateral/reversal', {
          id: item.id,
          idNumber: item.idNumber,
          dr: item.Dr,
          narration: item.narration,
          date: item.tdate,
        })

        Swal.fire('Reversed!', '', 'success')
        setRender(!render)
      } else if (result.isDenied) {
        Swal.fire('Cancelled', '', 'info')
      }
    })
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 mt-2">
          <div className="row justify-content-center">
            <h4 className="centertext mb-3">
              Cash Collateral Withdrawals and Transfers
            </h4>
          </div>

          <p className="text-left">
            NB: The list shows customer collateral withdrawals and Transfers.
            You can filter by selecting a date range. Using the start and end
            Dates.
          </p>

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
            <div className="col-sm-4 text-right">
              Total Amt: <strong>{formatter.format(totalAmt)}</strong>
            </div>
          </div>
          <Table className="table-sm col-sm-12">
            <thead className="">
              <tr className="fs-sm">
                <th></th>
                <th>ID</th>
                <th>Drawer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((c, index) => (
                <tr key={c.id}>
                  <td>{index + 1}</td>
                  <td>{c.idNumber}</td>
                  <td>{c.fullName}</td>
                  <td>{c.tDate}</td>
                  <td>{formatter.format(c.Dr)}</td>
                  <td>{c.narration}</td>
                  <td>
                    {
                      <CButton
                        onClick={() => reverseWithdrawal(c)}
                        className="btn-sm float-right mt-3"
                        color="danger"
                      >
                        Reverse
                      </CButton>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <CButton
            onClick={() =>
              openCustomerListAsReport(reportUrl + '/collateralBalances.aspx')
            }
            className="btn-sm float-left mt-3 mb-3"
            color="success"
          >
            Collateral Balances
          </CButton>
        </div>
      </div>
    </div>
  )
}

export default ViewCollateralWithdrawals
