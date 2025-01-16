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
import { GiConsoleController, GiCootieCatcher } from 'react-icons/gi'

const CustomerReAssign = () => {
  const [staff, setStaff] = useState([])
  const [customers, setCustomers] = useState([])
  const [render, setRender] = useState(false)
  const [officer, setOfficer] = useState(0)
  const [newOfficer, setNewOfficer] = useState(0)
  const [selected, setSelected] = useState([])

  useEffect(() => {
    async function getStaff() {
      const staff = await axios.get(apiUrl + '/setup/staff')
      setStaff(staff.data)
    }
    getStaff()
  }, [render])

  const loadCustomers = async (e) => {
    console.log('Officer :' + e.currentTarget.value)
    setOfficer(e.currentTarget.value)
    //setNewOfficer(0)
    const customer = await axios.get(
      apiUrl + '/customer/officer/' + e.currentTarget.value,
    )
    setCustomers(customer.data)
  }

  const handleSelected = (event, c) => {
    // console.log(c)
    let updatedList = [...selected]
    if (event.target.checked) {
      updatedList = [
        ...selected,
        { customer: c.id, officer: officer, newOfficer: newOfficer },
      ]
    } else {
      updatedList.splice(selected.indexOf(c), 1)
    }
    setSelected(updatedList)
  }

  const schemaMap = {
    officer: Joi.number().required().label('Current Officer'),
    newOfficer: Joi.number().required().label('New Officer'),
    customer: Joi.number().required().label('Customer'),
  }

  const schema = Joi.object(schemaMap)
  let results = ''
  const validateForm = () => {
    const result = Joi.validate(selected, schema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  const handleSubmit = async () => {
    //console.log(selected)
    if (newOfficer === 0)
      return Swal.fire('OOPS!', 'New Officer Not Selected', 'error')
    if (selected.length < 1) return
    try {
      selected.map(async (s) => {
        results = await axios.post(apiUrl + '/customer/reassign', s)
      })
    } catch (ex) {
      Swal.fire('OOPS!', ex.message, 'error')
    }
    console.log(results.length)
    if (results.length >= 0) {
      Swal.fire('Success!', 'Customers Re-assigned', 'success')
      const customer = await axios.get(apiUrl + '/customer/officer/' + officer)
      setCustomers(customer.data)
    }
    setSelected([])
    setOfficer(0)
    setNewOfficer(0)
    setRender(!render)
  }

  return (
    <div>
      <div className="row">
        <CInputGroup className="mt-3">
          <CLabel htmlFor="phoneworship" className="form-label col-sm-3">
            Current Assigned Officer *
          </CLabel>
          <CSelect
            className="form-select col-sm-8"
            aria-label="Default select example"
            value={officer}
            onChange={loadCustomers}
          >
            <option value="">Current Officer *</option>
            {staff.map((s) => (
              <option key={s.id} value={s.id} id={s.id}>
                {s.nameOfStaff}
              </option>
            ))}
          </CSelect>
        </CInputGroup>
      </div>
      <div className="row">
        <CInputGroup className="mt-3">
          <CLabel htmlFor="phoneworship" className="form-label col-sm-3">
            New Assigned Officer *
          </CLabel>
          <CSelect
            className="form-select col-sm-8"
            aria-label="Default select example"
            value={newOfficer}
            onChange={(e) => {
              console.log('new Officer: ' + e.currentTarget.value)
              setNewOfficer(e.currentTarget.value)
            }}
          >
            <option value="">New Officer *</option>
            {staff.map((s) => (
              <option key={s.id} value={s.id} id={s.id}>
                {s.nameOfStaff}
              </option>
            ))}
          </CSelect>
        </CInputGroup>

        <CButton
          type="submit"
          className="btn btn-success btn-block col-sm-2 float-right btn-sm mt-3 mb-3"
          onClick={handleSubmit}
        >
          + Assign
        </CButton>
      </div>

      <div className="row mt-3">
        <Table className="table-sm">
          <thead>
            <tr className="fs-sm">
              <th></th>
              <th>Name</th>
              <th>Gender</th>
              <th>ID Number</th>
              <th>Phone</th>
              <th>Res. Address</th>
              <th>Officer</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, index) => (
              <tr
                key={c.id}
                // onClick={() => customerView(c)}
                Style="cursor: pointer;"
              >
                <td>{index + 1}</td>
                <td>{c.fullName}</td>
                <td>{c.gender}</td>
                <td>{c.idNumber}</td>
                <td>{c.phone}</td>
                <td>{c.residentialAddress}</td>
                <td>{c.nameOfStaff}</td>
                <td>
                  <input
                    type="checkbox"
                    className=""
                    value={c.id}
                    onChange={(event) => handleSelected(event, c)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default CustomerReAssign
