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

const CustomerLoanStatement = () => {
  const [arrears, setArrears] = useState([])
  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState('')
  let navigate = useHistory()

  useEffect(() => {
    async function getCustomers() {
      const results = await axios.get(apiUrl + '/customer')
      setCustomers(results.data)
    }
    getCustomers()
  }, [customers])

  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=320,height=320'
    window.open(url, 'customerlist', 'popup', windowFeatures)
  }
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  const data = {
    scustomers: customers.filter((item) =>
      item.fullName.toLowerCase().includes(search.toLowerCase()),
    ),
  }
  const dataTouse = search.length === 0 ? customers : data.scustomers

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  return (
    <div>
      <div className="col-sm-12 mt-3">
        <div className="table-responsive">
          <Input
            className="mt-3 mb-3 ms-3 col-sm-4"
            type="text"
            placeholder="Search with Customer Name or Phone"
            onChange={handleSearch}
          />
          <Table className="table-sm">
            <thead>
              <tr className="fs-sm">
                <th></th>
                <th>Account Number</th>
                <th>Name</th>
                <th>Gender</th>

                <th>Phone</th>
                <th>Res. Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataTouse.map((c, index) => (
                <tr
                  key={c.id}
                  // onClick={() => customerView(c)}
                  // Style="cursor: pointer;"
                >
                  <td>{index + 1}</td>
                  <td>{c.accountNumber}</td>
                  <td>{c.fullName}</td>
                  <td>{c.gender}</td>
                  <td>{c.phone}</td>
                  <td>{c.residentialAddress}</td>
                  <td>
                    <CDropdown className="m-1">
                      <CDropdownToggle color="info" size="sm">
                        View Loan Statement
                      </CDropdownToggle>
                      <CDropdownMenu size="sm">
                        <CDropdownItem header>Statement</CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem
                          onClick={() =>
                            openCustomerListAsReport(
                              reportUrl + '/customerLoanStatement.aspx?' + c.id,
                            )
                          }
                        >
                          View Loan Statement
                        </CDropdownItem>
                        <CDropdownDivider />
                      </CDropdownMenu>
                    </CDropdown>
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

//  <td>{moment(s.startDate).format("DD,MMMM,YYYY")}</td>
export default CustomerLoanStatement
