import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { apiUrl, reportUrl } from '../../config.json'
import auth from '../../components/services/authService'
import Joi from 'joi-browser'
import Swal from 'sweetalert2'
import formData from 'form-data'

//import '../../table.css'

//import Pagination from '../pagination'
//import { paginate } from '../paginate'

//import { ComponentToPrint } from "./ComponentToPrint";
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
  ButtonDropdowns,
  //CForm,
  CDropdownDivider,
  CInputCheckbox,
  CLink,
} from '@coreui/react'

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

const LoanInArrears = () => {
  const [arrears, setArrears] = useState([])
  const [staffData, setStaffData] = useState([])
  const [officer, setOfficer] = useState('')
  const [render, setRender] = useState(false)
  const [tDate, setTdate] = useState(new Date().toISOString().slice(0, 10))
  let navigate = useHistory()
  const user = auth.getCurrentUser()
  const isLoanOfficer = user.userRole == 'Loan Officer' ? user.staff : 'nothing'

  useEffect(() => {
    async function getArrears() {
      const results = await axios.get(
        apiUrl + '/loanreports/arrears/' + user.staff,
      )
      setArrears(results.data)
    }
    getArrears()
  }, [tDate])

  useEffect(() => {
    async function getStaff() {
      const results = await axios.get(apiUrl + '/setup/staff')
      setStaffData(results.data)
    }
    getStaff()
  }, [render, staffData])

  const data = {
    sData: arrears.filter((item) =>
      item.staff.toLowerCase().includes(officer.toLowerCase()),
    ),
  }

  const dataTouse = officer.length === 0 ? arrears : data.sData

  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=320,height=320'
    window.open(url, 'loan in arrears', 'popup', windowFeatures)
  }

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  const handleDateChange = (e) => {
    setTdate(e.currentTarget.value)
  }

  const totalDue = arrears.reduce((a, i) => {
    return a + i.due
  }, 0)

  const totalPaid = arrears.reduce((a, i) => {
    return a + i.paid
  }, 0)

  const totalArrears = arrears.reduce((a, i) => {
    return a + i.Arrears
  }, 0)

  return (
    <div>
      <div className="col-sm-12 mt-3 mb-3">
        <h3>Loans In Arrears</h3>
        <div className="table-responsive">
          <CButton
            color="success"
            className="col-sm-2 float-right btn-sm mb-3"
            onClick={() =>
              openCustomerListAsReport(
                reportUrl + '/loansInArrears.aspx?' + user.staff,
              )
            }
          >
            View as Report
          </CButton>
          {user.userRole != 'Loan Officer' && (
            <CSelect
              className="form-select col-sm-12 mb-3"
              aria-label="Default"
              value={officer}
              onChange={(e) => setOfficer(e.currentTarget.value)}
            >
              <option defaultValue="">--Select Officer *--</option>
              {staffData.map((b) => (
                <option key={b.id} value={b.nameOfStaff} id={b.id}>
                  {b.nameOfStaff}
                </option>
              ))}
            </CSelect>
          )}

          <Table className="table-sm">
            <thead>
              <tr className="fs-sm">
                <th></th>
                <th>Loan ID</th>
                {/*<th>Account No.</th>*/}
                <th>Customer</th>
                <th>
                  <div className="sm mb-3">
                    <strong> {formatter.format(totalDue)}</strong>
                  </div>
                  Due
                </th>
                <th>
                  <div className="sm mb-3">
                    <strong> {formatter.format(totalPaid)}</strong>
                  </div>
                  Paid
                </th>
                <th>
                  <div className="sm mb-3">
                    <strong> {formatter.format(totalArrears)}</strong>
                  </div>
                  Arrears{' '}
                </th>

                <th>Officer</th>
              </tr>
            </thead>
            <tbody>
              {dataTouse.map((c, index) => (
                <tr
                  key={c.id}
                  // onClick={() => customerView(c)}
                  Style="cursor: pointer;"
                >
                  <td>{index + 1}</td>
                  <td>{c.idNumber}</td>
                  {/* <td>{c.accountNumber}</td>*/}
                  <td>{c.customer}</td>
                  <td>{formatter.format(c.due)}</td>
                  <td>{formatter.format(c.paid)}</td>
                  <td>{formatter.format(c.Arrears)}</td>

                  <td>{c.staff}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

//  <td>{moment(s.startDate).format("DD,MMMM,YYYY")}</td>
export default LoanInArrears
