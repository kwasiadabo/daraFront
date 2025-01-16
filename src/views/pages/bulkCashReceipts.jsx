import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { Link, useNavigate, Navigate, useHistory } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import Joi from 'joi-browser'
import CurrencyFormat from 'react-currency-format'
import Swal from 'sweetalert2'
import auth from '../../components/services/authService'
import { apiUrl } from '../../config.json'
import BookProduct from './bookProduct'
import LoanPrincipal from './loanPrincipalEntry'
import Guarantors from './guarantors'
import GuarantorTwo from './guarantorTwo'
import BusinessDetails from './businessDetails'
import Directions from './directions'
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
  Badge,
  Card,
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
import { render } from 'enzyme'

const BulkCashReceipts = () => {
  const [user, setUser] = useState(auth.getCurrentUser)
  const [received, setReceived] = useState([])
  const [staff, setStaff] = useState([])
  const [officer, setOfficer] = useState('')
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)
  const [reload, setReload] = useState(false)
  const [chartData, setChartData] = useState([])
  const [chartDate, setChartDate] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const [todayDate, setTodayDate] = useState(new Date())
  const formatToday = (date) => date.toISOString().slice(0, 10)
  const [overageShortageChecked, setOverageShortageChecked] = useState(false)
  // const [shortageChecked, setShortageChecked] = useState(false);
  const [bulkCash, setBulkCash] = useState({
    Officer: '',
    dateOfReceipt: new Date().toISOString().slice(0, 10),
    Momo: '',
    Cash: '',
    TotalAmount: '',
    Overage: '',
    Shortage: '',
    receivedBy: user.nameOfStaff,
  })
  const [tdate, setTdate] = useState(new Date().toISOString().slice(0, 10))

  useEffect(() => {
    async function getStaff() {
      const results = await axios.get(apiUrl + '/setup/staff')
      setStaff(results.data)
    }

    getStaff()
  }, [])

  useEffect(() => {
    async function getBulkCash() {
      const results = await axios.get(apiUrl + '/loan/bulkCash/' + tdate)
      setReceived(results.data)
    }
    getBulkCash()
    //console.log(received);
  }, [tdate, reload])

  /*const handleSearch = (event) => {
    setSearch(event.currentTarget.value);
  };

  const data = {
    staff: staff.filter((c) =>
      c.nameOfStaff.toLowerCase().includes(search.toLowerCase())
    ),
  };

  const dataTouse = search.length === 0 ? staff : data.staff;
*/
  const handleOfficerSelect = (c) => {
    setBulkCash({
      ...bulkCash,
      Officer: c.currentTarget.value,
      Overage: 0,
      Shortage: 0,
    })
    //setOfficer(c.nameOfStaff);
    // setShow(!show);
  }

  const handleSelectBulkCash = (c) => {
    setBulkCash({
      ...bulkCash,
      dateOfReceipt: c.dateOfReceipt,
      Officer: c.Officer,
      receivedBy: c.receivedBy,
      overageshortage: c.overageshortage,
      Momo: c.Momo,
      Cash: c.Cash,
      TotalAmount: c.TotalAmount,
      Overage: 0,
      Shortage: 0,
    })
    setShow(!show)
  }

  const handleMomoEntry = (e) => {
    const TotalAmt =
      parseFloat(bulkCash.Cash) + parseFloat(e.currentTarget.value)
    setBulkCash({
      ...bulkCash,
      Momo: e.currentTarget.value,
      TotalAmount: TotalAmt,
    })
  }

  const handleCashEntry = (e) => {
    const TotalAmt =
      parseFloat(bulkCash.Momo) + parseFloat(e.currentTarget.value)
    setBulkCash({
      ...bulkCash,
      Cash: e.currentTarget.value,
      TotalAmount: TotalAmt,
    })
  }
  const schemaMap = {
    Officer: Joi.string().required().label('Field Officer'),
    dateOfReceipt: Joi.date().required().label('Date of Collection'),
    Momo: Joi.number().required().label('Momo Received'),
    Cash: Joi.number().required().label('Cash Received'),
    TotalAmount: Joi.number().required().label('Total Amount'),
    Overage: Joi.number().default(0),
    Shortage: Joi.number().default(0),
    receivedBy: Joi.string().allow(''),
  }

  const schema = Joi.object(schemaMap)

  const validateForm = () => {
    const result = Joi.validate(bulkCash, schema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  const handleSubmit = async () => {
    console.log(bulkCash)
    const validate = validateForm()
    if (validate !== null) {
      return Swal.fire('Validation', validate, 'error')
    }
    try {
      const results = await axios.post(apiUrl + '/loan/bulkcash', bulkCash)
      if (results.status !== 200) {
        return Swal.fire(
          'OOPs !',
          'Submission Failed ! Check Entries and try again !',
          'error',
        )
      } else {
        Swal.fire('Good job!', 'Bulk Cash Received Successfully', 'success')
        setBulkCash({
          Officer: '',
          dateOfReceipt: new Date().toISOString().slice(0, 10),
          Momo: '',
          Cash: '',
          TotalAmount: '',
          Overage: '',
          Shortage: '',
          receivedBy: user.nameOfStaff,
        })
        setReload(!reload)
      }
    } catch (err) {
      Swal.fire('OOPS ! ', 'Bulk Cash NOT Received', 'error')
    }
  }

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  const handleRemove = async (c) => {
    console.log(c)
    try {
      const results = await axios.delete(
        apiUrl +
          '/loan/bulkCash/' +
          c.id +
          '/' +
          c.officerId +
          '/' +
          c.dateOfReceipt,
      )
      if (results.status === 200) {
        Swal.fire('OK', 'Bulk Cash Deleted', 'success')
        setBulkCash({
          Officer: '',
          dateOfReceipt: new Date().toISOString().slice(0, 10),
          Momo: '',
          Cash: '',
          TotalAmount: '',
          Overage: '',
          Shortage: '',
          receivedBy: user.nameOfStaff,
        })
        setReload(!reload)
        setTdate(new Date().toISOString().slice(0, 10))
      } else {
        return Swal.fire('OOPS', 'Bulk Cash NOT Deleted', 'error')
      }
    } catch (ex) {
      return Swal.fire('OOPS', ex + '  [Bulk Cash NOT Deleted]', 'error')
    }
  }

  const handleClose = () => {
    setBulkCash({
      Officer: '',
      dateOfReceipt: new Date().toISOString().slice(0, 10),
      Momo: '',
      Cash: '',
      TotalAmount: '',
      Overage: '',
      Shortage: '',
      receivedBy: user.nameOfStaff,
    })
    setOfficer('')
    setShow(false)
  }

  const handleOverage = (e) => {
    setBulkCash({
      ...bulkCash,
      Overage: e.currentTarget.value,
      Shortage: 0,
    })
  }

  const handleShortage = (e) => {
    setBulkCash({
      ...bulkCash,
      Shortage: e.currentTarget.value,
      Overage: 0,
    })
  }

  const myData = []
  const yData = chartData.map((m) => {
    let d = {
      Officer: m.Officer.nameOfStaff,
      Amount: m.amount,
    }
    myData.push(d)
  })

  const handleDateChange = (e) => {
    setChartDate(e.currentTarget.value)
    setTdate(e.currentTarget.value)
    setReload(!reload)
  }

  const handleEdit = (c) => {
    console.log(c)
    setBulkCash({
      ...bulkCash,
      dateOfReceipt: new Date(c.dateOfReceipt).toISOString().slice(0, 10),
      Officer: c.Officer,
      receivedBy: c.receivedBy,
      Momo: c.Momo,
      Cash: c.Cash,
      TotalAmount: c.TotalAmount,
      Overage: 0,
      Shortage: 0,
      id: c.id,
    })
    setShow(!show)
  }

  return (
    <div className="container-fluid">
      <button
        type="button"
        className="btn btn-success btn-sm float-right"
        onClick={() => {
          setBulkCash({
            dateOfReceipt: new Date().toISOString().slice(0, 10),
            Officer: '',
            receivedBy: user.nameOfStaff,
            Momo: '',
            Cash: '',
            TotalAmount: '',
            Overage: 0,
            Shortage: 0,
          })
          console.log(bulkCash)
          setShow(!show)
        }}
      >
        Receive Bulk Collections
      </button>
      <input
        type="date"
        name="dateOfReceipt"
        className="form-control col-sm-4 mb-3"
        id="dateOfReceipt"
        value={chartDate}
        onChange={handleDateChange}
      />
      <Table className="table align-middle mb-0 table-sm">
        <thead>
          <tr className="fs-sm">
            <th></th>
            <th>Date</th>
            <th>Officer</th>
            <th>Momo</th>
            <th>Cash</th>
            <th>Amount</th>
            <th>Overage</th>
            <th>Shortage</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {received.map((c, index) => (
            <tr key={c._id}>
              <td>{index + 1}</td>
              <td>{moment(c.dateOfReceipt).format('DD-MMMM-YYYY')}</td>
              <td>{c.Officer}</td>
              <td>{formatter.format(c.Momo)}</td>
              <td>{formatter.format(c.Cash)}</td>
              <td>{formatter.format(c.TotalAmount)}</td>
              <td>{formatter.format(c.Overage)}</td>
              <td>{formatter.format(c.Shortage)}</td>
              <td>
                {c.status == null ? (
                  <td>
                    <CButton
                      className="btn-sm"
                      color="danger"
                      onClick={() => handleRemove(c)}
                    >
                      Remove
                    </CButton>
                  </td>
                ) : null}
              </td>

              {/*<td>
                <CButton
                  className="btn-sm"
                  color="info"
                  onClick={() => handleEdit(c)}
                >
                  Edit Entry
                </CButton>
              </td>*/}
            </tr>
          ))}
        </tbody>
      </Table>

      <CModal
        className="fade col-sm-10"
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
            <h3 className="centertext">Receive Bulk Amount</h3>
          </p>
        </CModalHeader>

        <CModalBody className="modal-body">
          <form>
            <label htmlFor="dateOfReceipt" className="form-label">
              Date of Receipt
            </label>
            <input
              type="date"
              name="dateOfReceipt"
              className="form-control text-center col-sm-12 mb-3"
              id="dateOfReceipt"
              value={bulkCash.dateOfReceipt}
              onChange={(e) =>
                setBulkCash({
                  ...bulkCash,
                  dateOfReceipt: e.currentTarget.value,
                })
              }
            />

            <CSelect
              className="form-select col-sm-12 mb-3"
              aria-label="Default select example"
              value={bulkCash.Officer}
              onChange={handleOfficerSelect}
            >
              <option defaultValue="">--Select Loan Officer--</option>
              {staff.map((b) => (
                <option key={b.id} value={b.id} id={b.id}>
                  {b.nameOfStaff}
                </option>
              ))}
            </CSelect>

            <label htmlFor="amountReceived" className="form-label">
              Momo Amount (GHS) *
            </label>
            <input
              autoComplete="off"
              type="text"
              name="amountReceived"
              className="form-control col-sm-12 mb-3"
              id="MomoAmount"
              value={bulkCash.Momo}
              onChange={handleMomoEntry}
            />

            <label htmlFor="amountReceived" className="form-label">
              Cash Amount (GHS) *
            </label>
            <input
              autoComplete="off"
              type="text"
              name="amountReceived"
              className="form-control  col-sm-12 mb-3"
              id="CashAmount"
              value={bulkCash.Cash}
              onChange={handleCashEntry}
            />

            <label className="form-label mb-3 dispLabel float-right">
              Total Amount : {formatter.format(bulkCash.TotalAmount)}
            </label>

            <label htmlFor="overage" className="form-label mt-3">
              Overage (if any)
            </label>
            <input
              autoComplete="off"
              type="text"
              name="overage"
              className="form-control  col-sm-12 mb-3"
              id="overage"
              value={bulkCash.Overage}
              onChange={handleOverage}
            />

            <label htmlFor="shortage" className="form-label">
              Shortage (if any)
            </label>
            <input
              autoComplete="off"
              type="text"
              name="shortage"
              className="form-control  col-sm-12 mb-3"
              id="shortage"
              value={bulkCash.Shortage}
              onChange={handleShortage}
            />
          </form>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={handleSubmit} color="success" className="btn-sm">
            Submit
          </CButton>
          <CButton onClick={handleClose} color="danger" className="btn-sm">
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default BulkCashReceipts
