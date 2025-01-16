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
import '../../../src/schedulecards.css'
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

const CollectionSheet = () => {
  const [show, setShow] = useState(false)
  const [render, setRender] = useState(false)
  const [collectionSheet, setCollectionSheet] = useState([])
  const [officer, setOfficer] = useState(0)
  const [staff, setStaff] = useState([])
  const [collectionDate, setCollectionDate] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const user = auth.getCurrentUser()

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  useEffect(() => {
    async function getStaff() {
      const results = await axios.get(apiUrl + '/setup/staff')
      setStaff(results.data)
    }

    getStaff()
  }, [])

  useEffect(() => {
    async function getCollectionSheet() {
      const results = await axios.get(
        apiUrl +
          '/loan/dailycollections/collectionsheet/' +
          officer +
          '/' +
          collectionDate,
      )
      setCollectionSheet(results.data)
    }
    getCollectionSheet()
    //console.log(collectionSheet)
  }, [officer, collectionDate])

  const money = new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
  })

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

  const handleDateChange = (e) => {
    setCollectionDate(e.currentTarget.value)
  }

  const totalAmt = collectionSheet.reduce((a, i) => {
    return a + i.DailyAmt
  }, 0)

  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=320,height=320'
    window.open(url, 'Collection Sheet', 'popup', windowFeatures)
  }

  const handleOfficerSelect = (c) => {
    setOfficer(c.currentTarget.value)
    //setOfficer(c.nameOfStaff);
    // setShow(!show);
  }

  return (
    <div className="container-fluid">
      <div className="m-3">
        <div className="mb-3">
          <CRow>
            <CCol lg={12}>
              <CCard lg={12}>
                <CCardHeader className="text-right">
                  <div className="row justify-content-center">
                    <h4 className="centertext mb-2">
                      DAILY COLLECTION SHEET --
                    </h4>
                  </div>
                </CCardHeader>
                <CCardBody>
                  <div class="mb-3 row">
                    <CSelect
                      className="col-sm-12"
                      aria-label="Default select example"
                      value={officer}
                      onChange={handleOfficerSelect}
                    >
                      <option defaultValue="">--Select Officer *--</option>
                      {staff.map((b) => (
                        <option key={b.id} value={b.id} id={b.id}>
                          {b.nameOfStaff}
                        </option>
                      ))}
                    </CSelect>
                  </div>

                  <label className="col-sm-3 col-form-label">
                    Collection Date
                  </label>
                  <CInput
                    id="collectionDate"
                    type="date"
                    className=" form-control text-center col-sm-12"
                    aria-label="Default select example"
                    value={collectionDate}
                    onChange={(e) => setCollectionDate(e.currentTarget.value)}
                  />

                  <Table className="table-lg col-sm-12">
                    <thead>
                      <tr className="">
                        <th></th>
                        <th>Account Number</th>
                        <th>Name</th>
                        <th>Loan ID</th>
                        <th>Phone</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {collectionSheet.map((c, index) => (
                        <tr key={c.id}>
                          <td>{index + 1}</td>
                          <td>{c.accountNumber}</td>
                          <td>{c.Name}</td>
                          <td>{c.loanId}</td>
                          <td>{c.phone}</td>
                          <td>{formatter.format(c.DailyAmt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CCardBody>
              </CCard>
              <CButton
                className="float-right m-3 col-sm-2"
                color="success"
                onClick={() =>
                  openCustomerListAsReport(
                    reportUrl +
                      '/collectionSheet.aspx?' +
                      officer +
                      '?' +
                      collectionDate,
                  )
                }
              >
                Generate Sheet
              </CButton>
            </CCol>
          </CRow>
        </div>
      </div>
    </div>
  )
}

export default CollectionSheet
