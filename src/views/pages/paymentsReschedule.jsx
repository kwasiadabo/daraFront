import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import auth from '../../components/services/authService'
import Swal from 'sweetalert2'
import { apiUrl } from '../../config.json'
import { reportUrl } from '../../config.json'

import {
  Table,
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

const PaymentReschedule = () => {
  const [show, setShow] = useState(false)
  const [user, setUser] = useState(auth.getCurrentUser)
  const [expenses, setExpenses] = useState([])
  const [bookedLoans, setBookedLoans] = useState([])
  const [render, setRender] = useState(false)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState({
    dateCompleted: new Date().toISOString().slice(0, 10),
  })
  const [loanDetails, setLoanDetails] = useState({
    dateCompleted: new Date().toISOString().slice(0, 10),
    duration: 0,
    customer: 0,
    disbursementId: 0,
    bookingId: 0,
    chequeId: 0,
    amount: 0,
    interestRate: 0,
    frequency: '',
  })

  const [dateCompleted, setDateCompleted] = useState(
    new Date().toISOString().slice(0, 10),
  )

  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))
  let navigate = useHistory()

  useEffect(() => {
    async function getBookedLoans() {
      const results = await axios.get(
        apiUrl + '/loan/booking/reschedule/' + startDate + '/' + endDate,
      )
      setBookedLoans(results.data)
    }
    getBookedLoans()
  }, [startDate, endDate, render])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const data = {
    allBooked: bookedLoans.filter((item) =>
      item.fullName.toLowerCase().includes(search.toLowerCase()),
    ),
  }

  const dataTouse = search.length === 0 ? bookedLoans : data.allBooked

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  const totalAmt = expenses.reduce((a, i) => {
    return a + i.amount
  }, 0)

  const handleDelete = async (c) => {
    // console.log(c.id)
    Swal.fire({
      title: 'Do you want to REMOVE this BOOKING ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Remove',
      denyButtonText: `Don't`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await axios.delete(apiUrl + '/loan/booking/' + c.id)
        Swal.fire('Removed!', '', 'success')
        setRender(!render)
      } else if (result.isDenied) {
        Swal.fire('Cancelled', '', 'info')
      }
    })
  }
  const handleStartDateChange = (e) => {
    setStartDate(e.currentTarget.value)
  }
  const handleEndDateChange = (e) => {
    setEndDate(e.currentTarget.value)
  }

  const handleSelected = (c) => {
    setSelected(c)
    console.log(c)
    setLoanDetails({
      dateCompleted: c.dateCompleted,
      duration: c.duration,
      customer: c.customer,
      disbursementId: c.disbursementId,
      bookingId: c.bookingId,
      chequeId: c.chequeId,
      amount: c.principal,
      interestRate: c.interestRate,
      frequency: c.frequency,
    })
    setShow(!show)
  }

  const handleReschedule = async () => {
    console.log(loanDetails)
    const result = await axios.post(apiUrl + '/loan/booking/reschedule', {
      dateCompleted: loanDetails.dateCompleted,
      duration: loanDetails.duration,
      customer: loanDetails.customer,
      disbursementId: loanDetails.disbursementId,
      bookingId: loanDetails.bookingId,
      chequeId: loanDetails.chequeId,
      amount: loanDetails.amount,
      interestRate: loanDetails.interestRate,
      frequency: loanDetails.frequency,
    })
    if ((result.status = 200)) {
      Swal.fire('Loan Rescheduled!', '', 'success')
      //setShow(!show)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="row justify-content-center">
            <h4 className="centertext mb-3">RESCHEDULE BOOKED LOANS</h4>
          </div>

          <p className="text-center">
            NB: Booked Loans can be removed from here. Only booked loans without
            payments or payments not yet started will appear in the list.”
          </p>
        </div>
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
        <div className="col-sm-4">
          <CInput
            type="text"
            name="searchCustomer"
            className="form-control"
            id="searchCustomer"
            value={null}
            onChange={handleSearch}
            placeholder="Search booked loans"
          />
        </div>
        <div className="col-sm-12 mt-3">
          <Table className="table-sm col-sm-12">
            <thead className="">
              <tr className="fs-sm">
                <th></th>
                <th>Date Booked</th>
                <th>Customer</th>
                <th>Account Number</th>
                <th>Product</th>
                <th>Loan ID</th>
                <th>Principal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataTouse.map((c, index) => (
                <tr key={c.id}>
                  <td>{index + 1}</td>
                  <td>{c.dateCompleted}</td>
                  <td>{c.fullName}</td>
                  <td>{c.accountNumber}</td>
                  <td>{c.product}</td>
                  <td>{c.loanId}</td>
                  <td>{formatter.format(c.principal)}</td>
                  <td>
                    {
                      <CButton
                        onClick={() => handleSelected(c)}
                        className="btn-sm"
                        color="success"
                      >
                        Reschedule
                      </CButton>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <CModal
        className="modal fade col-sm-10"
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
            <h3 className="centertext">RESCHEDULE BOOKED LOAN</h3>
          </p>
        </CModalHeader>

        <CModalBody className="modal-body col-sm-12">
          <div className="mb-3 row">
            <CLabel htmlFor="chequeNumber" className="col-sm-3 col-form-label">
              Loan ID
            </CLabel>
            <div className="col-sm-8">
              <CInput
                type="text"
                className="form-control"
                id="chequeNumber"
                value={selected.loanId}
                onChange={(e) =>
                  setSelected({ ...selected, loanId: e.currentTarget.value })
                }
              />
            </div>
          </div>
          <div class="mb-3 row">
            <CLabel htmlFor="dateCompleted" className="col-sm-3 col-form-label">
              Date Booked
            </CLabel>
            <div class="col-sm-8">
              <CInput
                type="date"
                className="form-control"
                id="dateCompleted"
                value={loanDetails.dateCompleted}
                onChange={(e) =>
                  setLoanDetails({
                    ...loanDetails,
                    dateCompleted: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
          <div class="mb-3 row">
            <CLabel htmlFor="accountNumber" className="col-sm-3 col-form-label">
              Account Number
            </CLabel>
            <div class="col-sm-8">
              <CInput
                type="text"
                class="form-control"
                id="accountNumber"
                value={selected.accountNumber}
                autoComplete="off"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <CLabel
              htmlFor="nameOfCustomer"
              className="col-sm-3 col-form-label"
            >
              Name of Customer
            </CLabel>
            <div class="col-sm-8">
              <CInput
                type="text"
                class="form-control"
                id="nameOfCustomer"
                value={selected.fullName}
                autoComplete="off"
              />
            </div>
          </div>

          <div class="mb-3 row">
            <CLabel htmlFor="bank" className="col-sm-3 col-form-label">
              Product
            </CLabel>
            <div class="col-sm-8">
              <CInput
                type="text"
                class="form-control"
                id="nameOfCustomer"
                value={selected.product}
                // onChange={(e) =>
                //   setSelected({ ...selected, product: e.currentTarget.value })
                // }
                autoComplete="off"
              />
            </div>
          </div>

          <div class="mb-3 row">
            <CLabel for="bankAccount" class="col-sm-3 col-form-label">
              Frequency
            </CLabel>
            <div class="col-sm-8">
              <CSelect
                className="form-select col-sm-12"
                aria-label="Default select example"
                value={loanDetails.frequency}
                onChange={(e) =>
                  setLoanDetails({
                    ...loanDetails,
                    frequency: e.currentTarget.value,
                  })
                }
              >
                <option defaultValue="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </CSelect>
              {/* <CInput
                type="text"
                class="form-control"
                id="nameOfCustomer"
                value={selected.frequency}
                autoComplete="off"
              /> */}
            </div>
          </div>

          <div class="mb-3 row">
            <CLabel for="bankAccount" class="col-sm-3 col-form-label">
              Duration
            </CLabel>
            <div class="col-sm-8">
              <CInput
                type="text"
                class="form-control"
                id="nameOfCustomer"
                value={loanDetails.duration}
                autoComplete="off"
                onChange={(e) =>
                  setLoanDetails({
                    ...loanDetails,
                    duration: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>

          <div class="mb-3 row">
            <CLabel htmlFor="dateOnCheque" className="col-sm-3 col-form-label">
              Principal
            </CLabel>
            <div className="col-sm-8">
              <CInput
                type="text"
                class="form-control"
                id="dateOnCheque"
                //readOnly
                value={loanDetails.amount}
                // onChange={(e) =>
                //   setLoanDetails({
                //     ...loanDetails,
                //     amount: e.currentTarget.value,
                //   })
                // }
              />
            </div>
          </div>

          <div className="mb-3 row">
            <CLabel htmlFor="chequeNumber" className="col-sm-3 col-form-label">
              Interest Rate
            </CLabel>
            <div className="col-sm-8">
              <CInput
                type="text"
                className="form-control"
                id="chequeNumber"
                value={loanDetails.interestRate}
                onChange={(e) =>
                  setLoanDetails({
                    ...loanDetails,
                    interestRate: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
        </CModalBody>

        <CModalFooter>
          <CRow>
            <CButton onClick={handleReschedule} color="success">
              Re-schedule
            </CButton>

            <CButton onClick={() => setShow(!show)} color="danger">
              Close
            </CButton>
          </CRow>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default PaymentReschedule
