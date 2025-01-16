import React, { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import baseUrl from '../../config.json'
import auth from '../../components/services/authService'
import Swal from 'sweetalert2'
import moment from 'moment'
import { apiUrl } from '../../config.json'
import Joi from 'joi-browser'
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
  CTextarea,
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

const Directions = (props) => {
  const [directionsData, setDirectionsData] = useState({
    disbursementId: 0,
    customer: 0,
    directionsToResidence: '',
    directionsToBusiness: '',
  })

  const handleHouseDirectionsEntry = (e) => {
    setDirectionsData({
      ...directionsData,
      directionsToResidence: e.currentTarget.value,
      customer: props.customer,
      disbursementId: props.disbursementId,
    })
  }

  const handleBusinessDirectionsEntry = (e) => {
    setDirectionsData({
      ...directionsData,
      directionsToBusiness: e.currentTarget.value,
      customer: props.customer,
      disbursementId: props.disbursementId,
    })
  }

  const schemaMap = {
    disbursementId: Joi.number().required().label('Disbursement ID'),
    customer: Joi.number().required().label('Customer'),
    directionsToResidence: Joi.string().required().label('House Directions'),
    directionsToBusiness: Joi.string().required().label('Business Directions'),
  }
  const schema = Joi.object(schemaMap)

  const validateForm = () => {
    const result = Joi.validate(directionsData, schema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  const handleSubmit = async () => {
    const validate = validateForm()
    if (validate !== null) {
      return Swal.fire('Validation', validate, 'error')
    }
    try {
      const results = await axios.put(
        apiUrl + '/loan/booking/directions',
        directionsData,
      )
      if (results.status !== 200) {
        return Swal.fire(
          'OOPs !',
          'Submission Failed ! Check Entries and try again !',
          'error',
        )
      } else {
        Swal.fire('Good job!', 'Directions Saved Successfully', 'success')
        setDirectionsData({
          disbursementId: 0,
          customer: 0,
          directionsToResidence: '',
          directionsToBusiness: '',
        })
      }
    } catch (err) {
      Swal.fire('OOPS ! ', 'Directions NOT Saved', 'error')
    }
  }
  return (
    <div className="container-fluid">
      <div className="mb-3 row">
        <CLabel htmlFor="product" className="col-sm-3">
          Directions to House *
        </CLabel>
        <div class="col-sm-8">
          <CTextarea
            className="form-control-xl"
            value={directionsData.directionsToResidence}
            onChange={handleHouseDirectionsEntry}
          />
        </div>
      </div>

      <div className="mb-3 row">
        <CLabel htmlFor="product" className="col-sm-3">
          Directions to Business *
        </CLabel>
        <div class="col-sm-8">
          <CTextarea
            className="form-control-xl"
            value={directionsData.directionsToBusiness}
            onChange={handleBusinessDirectionsEntry}
          />
        </div>
      </div>

      <div className="justify-content-center">
        <CButton
          onClick={handleSubmit}
          className="m-3 float-right"
          color="success"
        >
          Submit
        </CButton>
      </div>
    </div>
  )
}

export default Directions
