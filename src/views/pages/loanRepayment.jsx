import React, { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { apiUrl } from '../../config.json'
import { reportUrl } from '../../config.json'
import { Modal } from 'react-bootstrap'
import auth from '../../components/services/authService'
import Swal from 'sweetalert2'

import Card from 'react-bootstrap/Card'
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
const LoanRepayment = () => {
  const [loanees, setLoanees] = useState([])
  const [user, setUser] = useState(auth.getCurrentUser())
  const [staff, setStaff] = useState([])
  //const user = auth.getCurrentUser();
  const [daysPayments, setDaysPayments] = useState([])
  const [show, setShow] = useState(false)
  const [fullName, setFullName] = useState('')
  const [bulkCash, setBulkCash] = useState({
    amount: 0,
    overage: 0,
    shortage: 0,
  })
  const [todayDate, setTodayDate] = useState(new Date())
  const [payments, setPayments] = useState(0)
  const formatToday = (date) => date.toISOString().slice(0, 10)
  const [pageSize, setPageSize] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [edit, setEdit] = useState(false)
  const [render, setRender] = useState(false)
  const [save, setSave] = useState(true)
  const [colPayments, setColPayments] = useState([])
  const [todaysPayments, setTodaysPayments] = useState([])
  const [loanBal, setLoanBal] = useState(0)
  const [loanPayments, setLoanPayments] = useState({
    dateOfCollection: new Date().toISOString().slice(0, 10),
    officer: '',
    customer: '',
    amount: '',
    modeOfPayment: '',
  })
  const [tdate, setTdate] = useState(new Date().toISOString().slice(0, 10))

  useEffect(() => {
    const getActiveLoans = async () => {
      const results = await axios.get(
        apiUrl + '/loan/dailycollections/' + user.staff,
      )
      setLoanees(results.data)
    }
    getActiveLoans()
  }, [loanees, render])

  useEffect(() => {
    async function getBulkCash() {
      try {
        const results = await axios.get(
          apiUrl + '/loan/bulkCash/submitted/' + tdate + '/' + user.staff,
        )
        setBulkCash({
          ...bulkCash,
          amount: results.data[0].TotalSubmitted,
          // overage: results.data[0].overage,
          // shortage: results.data[0].shortage,
        })
      } catch (ex) {}
    }
    getBulkCash()
  }, [tdate, render])

  useEffect(() => {
    async function getPayments() {
      const results = await axios.get(
        apiUrl + '/loan/dailycollections/' + tdate + '/' + user.staff,
      )
      setPayments(results.data[0].TotalDailyCollections)
      // console.log('Payments: ' + formatToday(todayDate))
    }
    getPayments()
    //console.log(tdate)
  }, [render, tdate])

  useEffect(() => {
    async function getDaysPayments() {
      const results = await axios.get(
        apiUrl +
          '/loan/dailycollections/dayspayments/' +
          tdate +
          '/' +
          user.staff,
      )
      setDaysPayments(results.data)
      // console.log('Payments: ' + formatToday(todayDate))
    }
    getDaysPayments()
    //console.log(daysPayments)
  }, [render, tdate])

  const handleAmountChange = (e) => {
    setLoanPayments({
      ...loanPayments,
      amount: e.currentTarget.value,
      officer: user.staff,
    })
  }
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  const handleCustomerSelect = async (c) => {
    const loanBalance = await axios.get(
      apiUrl + '/loan/dailycollections/bal/' + c.id,
    )
    setFullName(c.fullName)
    setLoanBal(loanBalance.data[0].loanBalance)
    setLoanPayments({
      customer: c.id,
      dateOfCollection: tdate,
      officer: user.staff,
    })
  }

  const handleSearch = (event) => {
    setSearch(event.currentTarget.value)
  }

  const data = {
    customer: loanees.filter((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()),
    ),
  }

  const dataTouse = search.length === 0 ? loanees : data.customer

  const handleClose = () => {
    setLoanPayments({
      customer: '',
      amount: '',
      modeOfPayment: '',
      officer: '',
      dateOfCollection: '',
    })
    setFullName('')
    setShow(false)
  }

  const handleSubmit = async () => {
    if (bulkCash.amount - payments < loanPayments.amount)
      return Swal.fire(
        'OOPS',
        'Payment Unsuccessful - Insufficient Bulk Amount',
        'error',
      )
    try {
      const results = await axios.post(
        apiUrl + '/loan/dailycollections',
        loanPayments,
      )
      if (results.statusText === 'OK') {
        Swal.fire('Success', 'Payment Made', 'success')
        setLoanPayments({
          customer: '',
          amount: '',
          modeOfPayment: '',
          officer: '',
          dateOfCollection: '',
        })
        setRender(!render)
      } else {
        //console.log(results)
        return Swal.fire('OOPS', 'Payment Unsuccessful', 'error')
      }
    } catch (ex) {
      //console.log(ex)
      return Swal.fire('OOPS', ex + ' [Payment Unsuccessful]', 'error')
    }
  }

  const showForEdit = (p) => {
    setLoanPayments({
      loanId: p.loanId._id,
      customer: p.customer._id,
      fullName: p.customer.fullName,
      entryBy: user._id,
      dateOfCollection: new Date().toISOString().slice(0, 10),
      modeOfPayment: p.modeOfPayment,
      amount: p.amount,
      officer: p.officer.id,
      comment: p.comment,
      id: p.id,
    })
    setShow(!show)
    setEdit(true)
    setSave(false)
  }

  const handleRemovePayment = async (p) => {
    //console.log(p)
    Swal.fire({
      title: 'Do you want to remove this payment?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Remove',
      denyButtonText: `Don't Remove`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const results = await axios.delete(
            apiUrl + '/loan/dailycollections/' + p.id,
          )

          if (results.status === 200) {
            Swal.fire('Success', 'Payment Removed', 'success')
          }
          setRender(!render)
        } catch (ex) {
          Swal.fire('Error', ex + ' Payment Removal Failed', 'error')
        }
      } else if (result.isDenied) {
        Swal.fire('Payment Removal Failed', '', 'error')
      }
    })
    setRender(!render)
    //console.log(results)
  }
  const handleUpdate = async () => {
    console.log(loanPayments)
    try {
      const results = await axios.put(
        apiUrl + '/collectionsheet/' + loanPayments.id,
        loanPayments,
      )
      if (results.status === 200) {
        Swal.fire('Success', 'Payment Updated', 'success')
        setLoanPayments({
          customer: '',
          fullName: '',
          amount: '',
          modeOfPayment: '',
          loanId: '',
          officer: '',
          comment: '',
          entryBy: '',
          dateOfCollection: '',
        })
        setRender(!render)
      } else {
        return Swal.fire('OOPS', 'Payment Update Unsuccessful', 'error')
      }
    } catch (ex) {
      return Swal.fire('OOPS', ex + ' [Payment Update Unsuccessful]', 'error')
    }
  }

  const handleMakePayment = () => {
    if (bulkCash.amount <= 0)
      return Swal.fire(
        'OOPS',
        'You have NOT submitted Bulk Cash for ' + tdate,
        'error',
      )
    setSave(true)
    setEdit(false)
    setShow(true)
  }

  const handleSubmitCollections = async () => {
    try {
      await axios.post(
        apiUrl + '/loan/dailycollections/' + user.staff + '/' + tdate,
      )
      Swal.fire('Submission Done', 'Days Collections Submitted!', 'success')
      setRender(!render)
      openCustomerListAsReport(
        reportUrl + '/dailyEntry.aspx?' + user.staff + '?' + tdate,
      )
    } catch (ex) {
      return Swal.fire('OOPS', ex + ' [Collections Submission Failed]', 'error')
    }
  }
  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=380,height=320'
    window.open(url, 'Daily Entry', 'popup', windowFeatures)
  }
  const handleSelectDate = (e) => {
    setTdate(e.currentTarget.value)

    console.log(
      bulkCash.amount + bulkCash.shortage - bulkCash.overage - payments,
    )
  }

  return (
    <div>
      <div className="col-sm-12">
        <h3 className="centertext mt-">Customer Loan Repayment</h3>
        <CInput
          type="date"
          name="dateToday"
          className="form-control text-center col-sm-12"
          id="dateToday"
          value={tdate}
          onChange={handleSelectDate}
        />
        <div className="row text-center col-sm-12 justify-content-center">
          <div classname="m-3">
            <Card style={{ width: '12rem', height: '6rem' }} className="m-3">
              <Card.Body>
                <Card.Title>Submitted</Card.Title>
                {formatter.format(bulkCash.amount)}
              </Card.Body>
            </Card>
          </div>

          <div classname="m-3">
            <Card style={{ width: '12rem', height: '6rem' }} className="m-3">
              <Card.Body>
                <Card.Title>Payments</Card.Title>
                {formatter.format(payments)}
              </Card.Body>
            </Card>
          </div>

          <div classname="m-3 justify-content-right">
            <Card
              style={{ width: '12rem', height: '6rem' }}
              className={
                parseFloat(bulkCash.amount - payments) > 0
                  ? 'positivebalcolor m-3'
                  : 'negativebalcolor m-3'
              }
            >
              <Card.Body>
                <Card.Title>
                  {parseFloat(bulkCash.amount - payments) < 0
                    ? 'Overage'
                    : 'Balance'}
                </Card.Title>
                {formatter.format(parseFloat(bulkCash.amount - payments))}
              </Card.Body>
            </Card>
          </div>
        </div>

        <CButton
          className="mt-3 mb-2 float-right"
          onClick={handleMakePayment}
          color="success"
        >
          Make Loan Payments
        </CButton>
        <Table className="table align-left mb-0 bg-white table-sm">
          <thead>
            <tr className="fs-sm">
              <th></th>
              <th>Customer</th>
              <th>Mode</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {daysPayments.map((c, index) => (
              <tr key={c.id}>
                <td>{index + 1}</td>

                <td>{c.Customer}</td>
                <td>{c.ModeOfPayment}</td>
                <td>{formatter.format(c.Amount)}</td>
                <td>{c.status}</td>
                {c.status === 'Not Submitted' ? (
                  <td>
                    <CButton
                      className="btn-sm"
                      color="danger"
                      onClick={() => handleRemovePayment(c)}
                    >
                      remove
                    </CButton>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex mt-5 justify-content-center">
          {bulkCash.amount + bulkCash.shortage - bulkCash.overage - payments ==
            0 && (
            <CButton
              className="col-sm-3 float-center"
              color="danger"
              onClick={handleSubmitCollections}
            >
              Submit Days Collections
            </CButton>
          )}
        </div>
      </div>

      <Modal
        className="modalCustomer fade "
        size="md"
        show={show}
        data-backdrop="static"
        data-keyboard="false"
      >
        <Modal.Body className="modal-body col-sm-12">
          <div className="float-center mb-2">
            <CInput
              className="col-sm-12 mb-2 text-center"
              placeholder=" Search Loan Customer"
              onChange={handleSearch}
            />
          </div>
          <Table className="table mb-3 mt-2 align-middle mb-0 bg-white table-sm">
            <thead>
              <tr className="fs-sm">
                <th>A/C No.</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataTouse.map((c, index) => (
                <tr key={c.id} onClick={() => handleCustomerSelect(c)}>
                  <td>{c.accountNumber}</td>
                  <td>{c.fullName}</td>
                  <td>
                    <CButton
                      color="danger"
                      onClick={() => handleCustomerSelect(c)}
                      className="btn-sm"
                    >
                      Select
                    </CButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <form>
            <label htmlFor="nameOfOfficer" className="form-label">
              Name of Customer
            </label>
            <CInput
              name="nameOfCustomer"
              className="text-center"
              type="text"
              id="nameOfCustomer"
              value={fullName}
              autoComplete="off"
              readOnly
            />

            <label htmlFor="Balance" className="form-label">
              Current Loan Balance
            </label>
            <CInput
              name="Balance"
              className="form-control  text-center"
              type="text"
              id="Balance"
              value={formatter.format(loanBal)}
              autoComplete="off"
              readOnly
            />

            <CSelect
              className="form-select  mb-3 mt-4 text-center"
              aria-label=".form-select-lg"
              value={loanPayments.modeOfPayment}
              onChange={(e) =>
                setLoanPayments({
                  ...loanPayments,
                  modeOfPayment: e.currentTarget.value,
                })
              }
            >
              <option value="">Select Mode of Payment</option>
              <option value="Cash">Cash</option>
              {/* <option value="Mobile Money">Mobile Money</option>*/}
            </CSelect>

            <label htmlFor="amountReceived" className="form-label">
              Amount (GHS)
            </label>
            <CInput
              autoComplete="off"
              type="text"
              name="amountReceived"
              className="form-control  text-right"
              id="amountReceived"
              value={loanPayments.amount}
              onChange={handleAmountChange}
            />

            <label htmlFor="comment" className="form-label">
              Comment
            </label>
            <CInput
              autoComplete="off"
              type="textArea"
              name="comment"
              className="form-control text-center"
              id="comment"
              value={null}
              autoComplete="off"
              onChange={(e) =>
                setLoanPayments({
                  ...loanPayments,
                  //comment: e.currentTarget.value,
                })
              }
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          {save && (
            <CButton onClick={handleSubmit} color="success">
              Submit
            </CButton>
          )}
          {edit && (
            <CButton onClick={handleUpdate} color="info">
              Update
            </CButton>
          )}
          <CButton onClick={handleClose} color="danger">
            Close
          </CButton>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default LoanRepayment
