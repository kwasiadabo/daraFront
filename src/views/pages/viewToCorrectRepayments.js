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
import { reportUrl } from '../../config.json'
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
import { now } from 'moment'

const ViewToCorrectRepayment = () => {
  const [dailycollections, setDailyCollections] = useState([])
  const [render, setRender] = useState(false)
  const [search, setSearch] = useState('')
  const [dated, setDated] = useState(new Date())
  const [show, setShow] = useState(false)
  const [save, setSave] = useState(true)
  const [edit, setEdit] = useState(false)
  const [dateOfCollection, setDateOfCollection] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const [allData, setAllData] = useState({
    id: '',
    dateOfCollection: '',
    customer: '',
    officer: '',
    amount: '',
    ModeOfPayment: '',
    status: '',
    loanId: '',
  })

  const [ds, setDs] = useState({
    id: 0,
    amount: 0,
  })

  function formatDate(date) {
    let newDate = new Date(date)
    var year = newDate.getFullYear().toString()
    var month = (newDate.getMonth() + 101).toString().substring(1)
    var day = (newDate.getDate() + 100).toString().substring(1)
    return year + '-' + month + '-' + day
  }

  useEffect(() => {
    async function getDailyCollections() {
      const results = await axios.get(
        apiUrl + '/loan/dailycollections/correction/' + dateOfCollection,
      )
      setDailyCollections(results.data)
      //if (results.data[0].img == null) return
      //setBuffer(results.data[0].img.data)
    }
    getDailyCollections()
  }, [render, dateOfCollection])

  const handleDateOfPaymentChange = (e) => {
    setDateOfCollection(e.currentTarget.value)
  }
  const handleSearchChanged = (e) => {
    setSearch(e.currentTarget.value)
  }

  /*useEffect(() => {
    async function getRegistrationFees() {
      const results = await axios.get(apiUrl + '/loan/registrationfee')
      setRegistrationFees(results.data)
    }
    getRegistrationFees()
  }, [registrationFees, render])
*/
  const data = {
    dailycollectionsFilter: dailycollections.filter(
      (item) =>
        item.Officer.toLowerCase().includes(search.toLowerCase()) ||
        item.Customer.toLowerCase().includes(search.toLowerCase()),
    ),
  }

  const dataTouse =
    search.length === 0 ? dailycollections : data.dailycollectionsFilter

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })
  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=320,height=320'
    window.open(url, 'customerlist', 'popup', windowFeatures)
  }

  const showModal = (e) => {
    setAllData({
      id: e.id,
      dateOfCollection: e.dateOfCollection,
      customer: e.Customer,
      officer: e.Officer,
      amount: e.Amount,
      modeOfPayment: e.ModeOfPayment,
      status: e.status,
      loanId: e.loanId,
    })
    setDs({
      id: e.id,
      amount: e.Amount,
    })
    setShow(!show)
  }

  const handleCorrection = async () => {
    console.log(ds)
    try {
      const results = await axios.post(
        apiUrl + '/loan/dailycollections/payment/correctdailycollection',
        {
          id: ds.id,
          amount: ds.amount,
        },
      )
      if (results.statusText === 'OK') {
        Swal.fire('Success', 'Correction Made', 'success')
        setAllData({
          id: '',
          dateOfCollection: '',
          customer: '',
          officer: '',
          amount: '',
          ModeOfPayment: '',
          status: '',
          loanId: '',
        })
        setDs({
          id: 0,
          amount: 0,
        })
        setRender(!render)
      } else {
        //console.log(results)
        return Swal.fire('OOPS', 'Correction Unsuccessful', 'error')
      }
    } catch (ex) {
      return Swal.fire(
        ex.message + '[OOPS',
        'Correction Unsuccessful]',
        'error',
      )
    }
  }
  return (
    <div>
      <CRow>
        <CCol lg={12}>
          <CCard>
            <h4 className="text-left mt-3">Daily Collections Update</h4>
            <CCardBody>
              <div class="mb-3 row mt-5 col-sm-12">
                <CLabel htmlFor="dateOfPayment" className="form-label">
                  Date Of Payment
                </CLabel>
                <div className="col-sm-3">
                  <CInput
                    type="date"
                    class="form-control"
                    id="dateOfPayment"
                    value={dateOfCollection}
                    onChange={handleDateOfPaymentChange}
                  />
                </div>

                <CLabel htmlFor="search" className="form-label">
                  Search
                </CLabel>
                <div className="col-sm-3">
                  <CInput
                    type="text"
                    class="form-control"
                    id="search"
                    value={search}
                    onChange={handleSearchChanged}
                  />
                </div>
              </div>

              <Table className="table-sm">
                <caption>Daily Collections</caption>
                <thead>
                  <tr className="fs-sm">
                    <th></th>
                    <th>ID</th>
                    {/* <th>Date Of Collection</th> */}
                    <th>Customer</th>
                    <th>Officer</th>
                    <th>Amount</th>
                    <th>Mode Of Payment</th>
                    <th>Status</th>
                    <th>Loan ID</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dataTouse.map((c, index) => (
                    <tr key={c.id}>
                      <td>{index + 1}</td>
                      <td>{c.id}</td>
                      {/* <td>{c.dateOfCollection}</td> */}
                      <td>{c.Customer}</td>
                      <td>{c.Officer}</td>
                      <td>{formatter.format(c.Amount)}</td>
                      <td>{c.ModeOfPayment}</td>
                      <td>{c.status}</td>
                      <td>{c.loanId}</td>
                      <td>
                        <CButton
                          color="success btn-sm"
                          onClick={() => showModal(c)}
                        >
                          Select
                        </CButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <Modal
        className="modalCustomer fade "
        size="md"
        show={show}
        data-backdrop="static"
        data-keyboard="false"
        closeButton
        align="left"
      >
        <Modal.Body className="modal-body col-sm-12">
          <form>
            <CLabel htmlFor="nameOfOfficer" className="form-label">
              Name of Customer
            </CLabel>
            <CInput
              name="nameOfCustomer"
              className="text-left"
              type="text"
              id="nameOfCustomer"
              value={allData.customer}
              autoComplete="off"
            />

            <CLabel htmlFor="Balance" className="form-label">
              Officer
            </CLabel>
            <CInput
              name="Balance"
              className="form-control  text-left"
              type="text"
              id="Balance"
              value={allData.officer}
              autoComplete="off"
            />

            <CLabel htmlFor="amountReceived" className="form-label">
              Mode Of Payment
            </CLabel>
            <CInput
              autoComplete="off"
              type="text"
              name="amountReceived"
              className="form-control  text-right"
              id="amountReceived"
              value={allData.modeOfPayment}
              onChange={null}
            />

            <CLabel htmlFor="comment" className="form-label">
              Status
            </CLabel>
            <CInput
              autoComplete="off"
              type="textArea"
              name="comment"
              className="form-control text-left"
              id="comment"
              value={allData.status}
              autoComplete="off"
              onChange={null}
            />
            <CLabel htmlFor="comment" className="form-label">
              Loan ID
            </CLabel>
            <CInput
              autoComplete="off"
              type="textArea"
              name="comment"
              className="form-control text-left"
              id="comment"
              value={allData.loanId}
              autoComplete="off"
              onChange={null}
            />
            <CLabel htmlFor="Balance" className="form-label">
              Amount (GHC)
            </CLabel>
            <CInput
              name="Balance"
              className="form-control  text-left"
              type="text"
              id="Balance"
              value={ds.amount}
              onChange={(e) => setDs({ ...ds, amount: e.currentTarget.value })}
              autoComplete="off"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <CButton onClick={handleCorrection} color="success">
            Submit
          </CButton>

          <CButton onClick={() => setShow(false)} color="danger">
            Close
          </CButton>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ViewToCorrectRepayment
