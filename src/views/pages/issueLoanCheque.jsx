import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import Joi from 'joi-browser'
import CurrencyFormat from 'react-currency-format'
import Swal from 'sweetalert2'
import auth from '../../components/services/authService'
import { apiUrl } from '../../config.json'
import { reportUrl } from '../../config.json'
import AdaboSelect from 'react-select'
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
  CLink,
} from '@coreui/react'

const IssuedCheque = () => {
  const [show, setShow] = useState(false)
  const [activeLoan, setActiveLoan] = useState('')
  const [render, setRender] = useState(false)
  const [customers, setCustomers] = useState([])
  const [chequeNumber, setChequeNumber] = useState('')
  const [cheques, setCheques] = useState([])
  const [buffer, setBuffer] = useState('')
  const [banks, setBanks] = useState([])
  const [bankAccounts, setBankAccounts] = useState([])
  //const [user, setUser] = useState({})
  const [issuedCheques, setIssuedCheques] = useState([])
  //const [totalAmt, setTotalAmt] = useState(0)
  const [chequeData, setChequeData] = useState({
    nameOnCheque: '',
    bank: 0,
    bankAccount: 0,
    dateOnCheque: '',
    chequeNumber: '',
    amount: '',
    issuedBy: 0,
    status: 'Not Disbursed',
    bookingStatus: 'Not Booked',
    entryDate: new Date(),
  })

  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))
  const user = auth.getCurrentUser()

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  useEffect(() => {
    async function getCustomers() {
      const results = await axios.get(apiUrl + '/customer')
      setCustomers(results.data)
    }
    getCustomers()
  }, [customers])

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
    setChequeData({
      ...chequeData,
      bank: e.currentTarget.value,
    })
  }

  const getBankAccounts = async (bank) => {
    const results = await axios.get(apiUrl + '/setup/bankaccount/' + bank)
    setBankAccounts(results.data)
  }

  useEffect(() => {
    async function getIssuedCheques() {
      const results = await axios.get(
        apiUrl + '/loan/issuedloancheques/' + startDate + '/' + endDate,
      )
      setIssuedCheques(results.data)
    }
    getIssuedCheques()
    // console.log(issuedCheques)
  }, [startDate, endDate, render])

  useEffect(() => {
    // setStartDate(new Date('2020-01-01'))
    // setEndDate(new Date())
    async function getCheques() {
      const results = await axios.get(
        apiUrl + '/loan/issuedloancheques/' + startDate + '/' + endDate,
      )
      setCheques(results.data)
      console.log(results.data)
    }
    getCheques()
    console.log(cheques)
  }, [render])

  // async function checkActiveLoan(customer) {
  //   const results = await axios.get(
  //     apiUrl + '/loan/issuedloancheques/checkactiveloan/' + customer,
  //   )
  //   return results.data
  // }

  const schemaMap = {
    nameOnCheque: Joi.number().required().label('Name on Cheque'),
    bank: Joi.number().required().label('Bank'),
    bankAccount: Joi.number().required().label('Bank Account'),
    dateOnCheque: Joi.date().required().label('Date On Cheque'),
    chequeNumber: Joi.string().required().label('Cheque Number'),
    amount: Joi.string().required().label('Amount'),
    issuedBy: Joi.number().required(),
    entryDate: Joi.date().required(),
    status: Joi.string(),
    bookingStatus: Joi.any(),
  }
  const schema = Joi.object(schemaMap)

  const validateForm = () => {
    const result = Joi.validate(chequeData, schema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  const handleSubmit = async () => {
    //console.log(activeLoan)
    if (activeLoan !== 0) {
      return Swal.fire(
        'OOPS!',
        'Active Loan Detected - Customer is servicing an active loan',
        'error',
      )
    }
    const validate = validateForm()
    if (validate !== null) {
      return Swal.fire('Validation', validate, 'error')
    }
    try {
      const results = await axios.post(
        apiUrl + '/loan/issuedloancheques',
        chequeData,
      )
      if (results.status !== 200) {
        return Swal.fire(
          'OOPs !',
          'Submission Failed ! Check Entries and try again !',
          'error',
        )
      } else {
        Swal.fire('Good job!', 'Cheque Details Saved Successfully', 'success')
        setRender(!render)
        setChequeData({
          nameOnCheque: '',
          bank: 0,
          bankAccount: '',
          dateOnCheque: '',
          chequeNumber: '',
          amount: '',
          issuedBy: 0,
          status: 'Not Disbursed',
          bookingStatus: 'Not Booked',
          entryDate: new Date(),
        })
      }
    } catch (err) {
      Swal.fire('OOPS ! ' + err.message, 'error')
    }
  }

  const handleDelete = (c) => {
    Swal.fire({
      title: 'Do you want to delete this issued Cheque?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await axios.delete(apiUrl + '/loan/issuedloancheques/' + c.id)
        Swal.fire('Deletion Confirmed !', '', 'success')
        setRender(!render)
      } else if (result.isDenied) {
        Swal.fire('Deletion NOT Confirmed', '', 'info')
      }
    })
  }

  const money = new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
  })

  const customerName = customers.map((opt) => ({
    label: opt.fullName + ' - ' + opt.accountNumber,
    value: opt.id,
  }))

  const handleCustomerSelected = async (opt) => {
    const optValue = opt.value
    setChequeData({ ...chequeData, nameOnCheque: optValue })
    const results = await axios.get(
      apiUrl + '/loan/issuedloancheques/checkactiveloan/' + optValue,
    )
    setActiveLoan(results.data.length)
    // console.log(results.data.length)
  }

  var today = new Date()

  // returns the month (from 0 to 11)
  const month = today.toLocaleString('default', { month: 'long' })

  // returns the day of the month (from 1 to 31)
  const day = today.getDate()

  // returns the year (four digits)
  const year = today.getFullYear()

  function add(accumulator, a) {
    return accumulator + a
  }

  /* const totalAmt = filteredIssuedCheques.reduce((a, i) => {
    return a + i.amount
  }, 0)
*/
  /*const handleFilter = (startDate, endDate) => {
    return issuedCheques.filter(
      (i) => i.entryDate >= startDate && i.entryDate <= endDate,
    )
  }*/

  // const filteredIssuedCheques = handleFilter(startDate, endDate)

  const totalAmt = issuedCheques.reduce((a, i) => {
    return a + i.amount
  }, 0)

  const handleStartDateChange = (e) => {
    setStartDate(e.currentTarget.value)
  }
  const handleEndDateChange = (e) => {
    setEndDate(e.currentTarget.value)
  }
  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=320,height=320'
    window.open(url, 'customerlist', 'popup', windowFeatures)
  }

  const handleChequeNumberChange = async (e) => {
    setChequeNumber(e.currentTarget.value)
    // console.log(issuedCheques)
  }

  const data = {
    scheques: issuedCheques.filter((i) =>
      i.chequeNumber.includes(chequeNumber),
    ),
  }

  const filteredCheques =
    chequeNumber.length === 0 ? issuedCheques : data.scheques

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <h4 className="centertext mb-2">Loan Cheques Issuance</h4>
      </div>
      <p className="centertext m-2 p">
        Issuing cheque means you are paying to someone. That's why your bank
        should be credited as it reduces your bank balance.
      </p>
      <div className="mb-3">
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
          <CLabel htmlFor="chequeNumber" className="form-label">
            Cheque Number
          </CLabel>
          <div className="col-sm-3">
            <CInput
              type="text"
              class="form-control"
              id="chequeNumber"
              value={chequeNumber}
              onChange={handleChequeNumberChange}
            />
          </div>
          <CLink
            className="btn-block col-sm-3 float-left btn-sm mb-3 mt-3"
            onClick={() =>
              openCustomerListAsReport(
                reportUrl +
                  '/issuedLoanCheques.aspx?' +
                  startDate +
                  '?' +
                  endDate,
              )
            }
          >
            View as Report
          </CLink>
        </div>

        <CButton
          color="success"
          className="btn-sm float-right mb-3"
          onClick={() => setShow(!show)}
          title="Make New Entry"
        >
          + Issue Cheque
        </CButton>

        <div className="sm mt-3">
          Number of Cheques :{'  '}
          <strong> {issuedCheques.length}</strong>
        </div>
        <div className="sm mt-3">
          Total of Amount (GHS) :{'  '}
          <strong>{formatter.format(totalAmt)}</strong>
        </div>

        <Table className="table-lg">
          <caption>
            Issued Cheques: {moment(startDate).format('DD-MMMM-YYYY')} -{' '}
            {moment(endDate).format('DD-MMMM-YYYY')}
          </caption>
          <thead>
            <tr className="fs-sm">
              <th></th>
              <th>Name on Cheque</th>
              <th>Bank</th>
              <th>Bank Account</th>
              <th>Date on Cheque</th>
              <th>Cheque No.</th>
              <th>Amount (GHC)</th>
              <th>Issued By</th>
              <th>Date Issued</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredCheques.map((c, index) => (
              <tr key={c.id}>
                <td>{index + 1}</td>
                <td>{c.nameOnCheque}</td>
                <td>{c.bank}</td>
                <td>{c.accountNumber}</td>
                <td>{moment(c.dateOnCheque).format('DD-MMMM-YYYY')}</td>
                <td>{c.chequeNumber}</td>
                <td>{formatter.format(c.amount)}</td>
                <td>{c.issuedBy}</td>
                <td>{moment(c.entryDate).format('DD-MMMM-YYYY')}</td>
                <td>
                  {c.status === 'Not Disbursed' && (
                    <CButton
                      color="danger"
                      className="btn-sm"
                      onClick={() => handleDelete(c)}
                      title="Cheques Issued Entry"
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

      <CModal
        className="modal fade col-sm-10"
        size="lg"
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
            <h3 className="centertext">ISSUE LOAN CHEQUE</h3>
          </p>
        </CModalHeader>

        <CModalBody className="modal-body col-sm-12">
          <div class="mb-3 row">
            <CLabel
              htmlFor="nameOfCustomer"
              className="col-sm-3 col-form-label"
            >
              Name of Customer
            </CLabel>
            <div class="col-sm-8">
              <AdaboSelect
                className="form-control-xl mb-2 mt-2"
                options={customerName}
                onChange={handleCustomerSelected}
              />
              {/*<CInput
                type="text"
                class="form-control"
                id="nameOfCustomer"
                value={chequeData.nameOnCheque}
                autoComplete="off"
                onChange={(e) =>
                  setChequeData({
                    ...chequeData,
                    nameOnCheque: e.currentTarget.value,
                    issuedBy: user.id,
                  })
                }
              />*/}
            </div>
          </div>

          <div class="mb-3 row">
            <CLabel htmlFor="bank" className="col-sm-3 col-form-label">
              Bank
            </CLabel>
            <div class="col-sm-8">
              <CSelect
                id="bank"
                className="form-select"
                aria-label="Default select example"
                value={chequeData.bank}
                onChange={handleBankChange}
              >
                <option defaultValue="">--Select Bank--</option>
                {banks.map((b) => (
                  <option key={b.id} value={b.id} id={b.id}>
                    {b.bank}
                  </option>
                ))}
              </CSelect>
            </div>
          </div>

          <div class="mb-3 row">
            <CLabel for="bankAccount" class="col-sm-3 col-form-label">
              Bank Account
            </CLabel>
            <div class="col-sm-8">
              <CSelect
                id="bankAccount"
                className="form-select"
                aria-label="Default select example"
                value={chequeData.bankAccount}
                onChange={(e) =>
                  setChequeData({
                    ...chequeData,
                    bankAccount: e.currentTarget.value,
                    issuedBy: user.id,
                  })
                }
              >
                <option defaultValue="">--Select Bank Account--</option>
                {bankAccounts.map((b) => (
                  <option key={b.id} value={b.id} id={b.id}>
                    {b.accountNumber}
                  </option>
                ))}
              </CSelect>
            </div>
          </div>

          <div class="mb-3 row">
            <CLabel htmlFor="dateOnCheque" className="col-sm-3 col-form-label">
              Date on Cheque
            </CLabel>
            <div className="col-sm-8">
              <CInput
                type="date"
                class="form-control"
                id="dateOnCheque"
                value={chequeData.dateOnCheque}
                onChange={(e) =>
                  setChequeData({
                    ...chequeData,
                    dateOnCheque: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mb-3 row">
            <CLabel htmlFor="chequeNumber" className="col-sm-3 col-form-label">
              Cheque No.
            </CLabel>
            <div className="col-sm-8">
              <CInput
                type="text"
                className="form-control"
                id="chequeNumber"
                value={chequeData.chequeNumber}
                onChange={(e) =>
                  setChequeData({
                    ...chequeData,
                    chequeNumber: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
          <div class="mb-3 row">
            <CLabel htmlFor="amount" className="col-sm-3">
              Amount (GHS)
            </CLabel>
            <div class="col-sm-8">
              <CInput
                id="amount"
                className="form-control"
                type="text"
                value={chequeData.amount}
                onChange={(e) =>
                  setChequeData({
                    ...chequeData,
                    amount: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
        </CModalBody>

        <CModalFooter>
          <div className="justify-content-center">
            <CButton onClick={handleSubmit} className="m-3" color="success">
              Submit
            </CButton>
            <CButton
              onClick={() => setShow(!show)}
              className="m-3"
              color="danger"
            >
              Close
            </CButton>
          </div>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default IssuedCheque
