import React, { useState, useEffect } from 'react'
import { Link, useHistory, useNavigate } from 'react-router-dom'
import axios from 'axios'
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

import CustomerView from './customerView'

const Defaulters = () => {
  const [defaulters, setDefaulters] = useState([])

  const [groups, setGroups] = useState([])

  let navigate = useHistory()
  useEffect(() => {
    async function getDefaulters() {
      const results = await axios.get(apiUrl + '/loanreports/defaulters')
      //console.log(results.data)
      setDefaulters(results.data)
    }
    getDefaulters()
  }, [])

  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=320,height=320'
    window.open(url, 'customerlist', 'popup', windowFeatures)
  }
  const fields = [
    'fullName',
    'phone',
    'loanId',
    'ExpectedAmount',
    'Paid',
    'DefaultAmount',
    'lastDateForPayment',
    'officer',
    'daysDefaulted',
  ]
  const getBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'Inactive':
        return 'secondary'
      case 'Pending':
        return 'warning'
      case 'Banned':
        return 'danger'
      default:
        return 'primary'
    }
  }

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Defaulters
              <CButton
                onClick={() =>
                  openCustomerListAsReport(reportUrl + '/defaulters.aspx')
                }
                className="btn-sm float-right mb-3 col-2"
                color="success"
              >
                Open Report
              </CButton>
            </CCardHeader>

            <CCardBody>
              <CDataTable
                items={defaulters}
                fields={fields}
                itemsPerPage={10}
                pagination
                hover
                striped
                bordered
                scopedSlots={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge('Active')}>Active</CBadge>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Defaulters
