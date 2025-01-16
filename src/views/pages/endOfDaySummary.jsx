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

const EndOfDaySummary = () => {
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
    async function getEndOfDaySummary() {
      const results = await axios.get(
        apiUrl + '/loanreports/endOfDaySummary/' + collectionDate,
      )
      setCollectionSheet(results.data)
    }
    getEndOfDaySummary()
    console.log(collectionSheet)
  }, [collectionDate])

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

  const handleDateChange = async (e) => {
    setCollectionDate(e.currentTarget.value)
  }

  const totalAmt = collectionSheet.reduce((a, i) => {
    return a + i.amount
  }, 0)

  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=420,height=320'
    window.open(url, 'END OF DAY SUMM Report', 'popup', windowFeatures)
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
                      END OF DAY SUMMARY REPORT
                    </h4>
                  </div>
                </CCardHeader>
                <CCardBody>
                  {/* <p className="mt-3">
                    Date: {moment(collectionDate).format('DD,MMMM,YYYY')}
                      </p>*/}
                  <div className="row mb-3">
                    <label>Collection Date</label>
                    <CInput
                      id="collectionDate"
                      type="date"
                      className="form-control text-center col-sm-12 mb-3"
                      aria-label="Default select example"
                      value={collectionDate}
                      onChange={handleDateChange}
                    />
                  </div>

                  <div className="col-sm-4 mb-3 figureDisplay justify-content-right"></div>
                  <div className="mb-3 col-sm-12">
                    <div className="mb-3 col-sm-4">
                      TOTAL SUBMITTED : {formatter.format(totalAmt)}
                    </div>
                  </div>
                  <Table className="table-lg col-sm-12">
                    <thead>
                      <tr className="">
                        <th></th>
                        <th>Loan Officer</th>
                        <th>Amount</th>
                        <th>Bulk Amount</th>
                        <th>Diff</th>
                      </tr>
                    </thead>
                    <tbody>
                      {collectionSheet.map((c, index) => (
                        <tr key={c.id}>
                          <td>{index + 1}</td>
                          <td>{c.nameOfStaff}</td>
                          <td>{formatter.format(c.amount)}</td>
                          <td>{formatter.format(c.totalAmount)}</td>
                          <td>{formatter.format(c.totalAmount - c.amount)}</td>
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
                    reportUrl + '/endOfDaySummary.aspx?' + collectionDate,
                  )
                }
              >
                Show As Report
              </CButton>
            </CCol>
          </CRow>
        </div>
      </div>
    </div>
  )
}

export default EndOfDaySummary
