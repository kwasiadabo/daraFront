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

const BookLoanPrincipal = (props) => {
  const [products, setProducts] = useState([])
  const [principalData, setPrincipalData] = useState({
    disbursementId: 0,
    customer: 0,
    principal: 0,
    purpose: '',
  })

  useEffect(() => {
    async function getProducts() {
      const results = await axios.get(baseUrl.apiUrl + '/setup/product')
      setProducts(results.data)
    }
    getProducts()
  }, [products])

  const handlePrincipalEntry = (e) => {
    setPrincipalData({
      ...principalData,
      principal: e.currentTarget.value,
      customer: props.customer,
      disbursementId: props.disbursementId,
      cashCollateral: props.cashCollateral,
    })
  }

  const handlePurposeEntry = (e) => {
    setPrincipalData({
      ...principalData,
      purpose: e.currentTarget.value,
    })
  }

  const schemaMap = {
    disbursementId: Joi.number().required().label('Disbursement ID'),
    customer: Joi.number().required().label('Customer'),
    principal: Joi.number().required().label('Principal'),
    purpose: Joi.string().required().label('Purpose'),
    cashCollateral: Joi.number(),
  }
  const schema = Joi.object(schemaMap)

  const validateForm = () => {
    const result = Joi.validate(principalData, schema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  const handleSubmit = async () => {
    console.log('disbursed :' + props.disbursedAmount)
    console.log('Principal :' + principalData.principal)
    if (props.disbursedAmount >= principalData.principal)
      return Swal.fire(
        'OOPs !',
        'Principal should not be less or equal to disbursed amount !',
        'error',
      )

    //console.log(props)
    const validate = validateForm()
    if (validate !== null) {
      return Swal.fire('Validation', validate, 'error')
    }
    try {
      const results = await axios.put(
        apiUrl + '/loan/booking/principal',
        principalData,
      )
      if (results.status !== 200) {
        return Swal.fire(
          'OOPs !',
          'Submission Failed ! Check Entries and try again !',
          'error',
        )
      } else {
        Swal.fire('Good job!', 'Loan Principal Saved Successfully', 'success')

        setPrincipalData({
          disbursementId: 0,
          customer: 0,
          principal: 0,
          purpose: '',
        })
      }
    } catch (err) {
      Swal.fire('OOPS ! ', 'Loan Principal NOT Saved', 'error')
    }
  }
  return (
    <div className="container-fluid">
      <div className="col-sm-12 mt-3">
        <div className="mb-3 row">
          <CLabel htmlFor="product" className="col-sm-3">
            Amount Requested *
          </CLabel>
          <div class="col-sm-6">
            <CInput
              className="form-control-xl text-right"
              value={principalData.principal}
              onChange={handlePrincipalEntry}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <CLabel htmlFor="product" className="col-sm-3">
            Purpose *
          </CLabel>
          <div class="col-sm-6">
            <CInput
              className="form-control-xl"
              value={principalData.purpose}
              onChange={handlePurposeEntry}
            />
          </div>
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

export default BookLoanPrincipal
