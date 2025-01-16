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

const BusinessDetails = (props) => {
  const [products, setProducts] = useState([])
  const [businessData, setBusinessData] = useState({
    disbursementId: 0,
    customer: 0,
    businessName: '',
    yearsInBusiness: '',
    addressOfBusiness: '',
    phoneOfBusiness: '',
    dailySales: 0,
    bank: '',
    bankLocation: '',
    businessPartner: '',
    estimatedAssetValue: 0,
    typeOfStructure: '',
  })

  /*const handlePrincipalEntry = (e) => {
    setGuarantorData({
      ...guarantorData,
      principal: e.currentTarget.value,
      customer: props.customer,
      disbursementId: props.disbursementId,
    })
  }*/

  const schemaMap = {
    disbursementId: Joi.number().required().label('Disbursement ID'),
    customer: Joi.number().required().label('Customer'),
    businessName: Joi.string().required().label('Name of Business'),
    yearsInBusiness: Joi.string().required().label('Years In Business'),
    addressOfBusiness: Joi.string().required().label('Address of Business'),
    phoneOfBusiness: Joi.string().required().label('Phone of Business'),
    dailySales: Joi.number().required().label('Daily Sales'),
    bank: Joi.string().allow('').label('Bank'),
    bankLocation: Joi.string().allow('').label('Bank Location'),
    businessPartner: Joi.string().allow('').label('Business Partner'),
    estimatedAssetValue: Joi.number().allow(0),
    typeOfStructure: Joi.string().required().label('Type of Structure'),
  }
  const schema = Joi.object(schemaMap)

  const validateForm = () => {
    const result = Joi.validate(businessData, schema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  const handleSubmit = async () => {
    console.log(businessData)
    const validate = validateForm()
    if (validate !== null) {
      return Swal.fire('Validation', validate, 'error')
    }
    try {
      const results = await axios.put(
        apiUrl + '/loan/booking/businessdetails',
        businessData,
      )
      if (results.status !== 200) {
        return Swal.fire(
          'OOPs !',
          'Submission Failed ! Check Entries and try again !',
          'error',
        )
      } else {
        Swal.fire('Good job!', 'Business Details Saved Successfully', 'success')

        setBusinessData({
          disbursementId: 0,
          customer: 0,
          businessName: '',
          yearsInBusiness: '',
          addressOfBusiness: '',
          phoneOfBusiness: '',
          dailySales: 0,
          bank: '',
          bankLocation: '',
          businessPartner: '',
          estimatedAssetValue: 0,
          typeOfStructure: '',
        })
      }
    } catch (err) {
      Swal.fire('OOPS ! ', 'Business Details NOT Saved', 'error')
    }
  }
  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <CLabel htmlFor="businessName" className="col-sm-3">
          Busines Name
        </CLabel>
        <CInput
          name="businessName"
          autoComplete="off"
          type="text"
          className="col-sm-8"
          id="businessName"
          value={businessData.businessName}
          onChange={(e) =>
            setBusinessData({
              ...businessData,
              businessName: e.currentTarget.value,
              customer: props.customer,
              disbursementId: props.disbursementId,
            })
          }
        />
      </div>
      <div className="row mb-3">
        <CLabel htmlFor="yearsInBusiness" className="form-label col-sm-3">
          Years In Business
        </CLabel>
        <CInput
          autoComplete="off"
          name="yearsInBusiness"
          type="text"
          className="form-control col-sm-4"
          id="yearsInBusiness"
          value={businessData.yearsInBusiness}
          onChange={(e) =>
            setBusinessData({
              ...businessData,
              yearsInBusiness: e.currentTarget.value,
            })
          }
        />
      </div>
      <div className="mb-3 row">
        <CLabel htmlFor="addressOfBusiness" className="col-sm-3">
          Address Of Business
        </CLabel>
        <CInput
          name="addressOfBusiness"
          autoComplete="off"
          type="text"
          className="col-sm-8"
          id="addressOfBusiness"
          value={businessData.addressOfBusiness}
          onChange={(e) =>
            setBusinessData({
              ...businessData,
              addressOfBusiness: e.currentTarget.value,
            })
          }
        />
      </div>
      <div className="row mb-3">
        <CLabel htmlFor="phoneOfBusiness" className="col-sm-3">
          Phone of Busines
        </CLabel>
        <CInput
          className="form-select col-sm-4"
          value={businessData.phoneOfBusiness}
          onChange={(e) => {
            setBusinessData({
              ...businessData,
              phoneOfBusiness: e.currentTarget.value,
            })
          }}
        />
      </div>
      <div className="mb-3 row">
        <CLabel htmlFor="dailySales" className="col-sm-3">
          Daily Sales (GHC)
        </CLabel>
        <CInput
          name="dailySales"
          autoComplete="off"
          type="text"
          className="col-sm-4"
          id="dailySales"
          value={businessData.dailySales}
          onChange={(e) =>
            setBusinessData({
              ...businessData,
              dailySales: e.currentTarget.value,
            })
          }
        />
      </div>
      <div className="mb-3 row">
        <CLabel htmlFor="bank" className="col-sm-3">
          Bank
        </CLabel>
        <CInput
          autoComplete="off"
          name="bank"
          type="text"
          className="col-sm-8"
          id="bank"
          value={businessData.bank}
          onChange={(e) =>
            setBusinessData({
              ...businessData,
              bank: e.currentTarget.value,
            })
          }
        />
      </div>
      <div className="mb-3 row">
        <CLabel htmlFor="bankLocation" className="col-sm-3">
          Bank Location
        </CLabel>
        <CInput
          autoComplete="off"
          name="bankLocation"
          type="text"
          className="col-sm-8"
          id="bankLocation"
          value={businessData.bankLocation}
          onChange={(e) =>
            setBusinessData({
              ...businessData,
              bankLocation: e.currentTarget.value,
            })
          }
        />
      </div>
      <div className="mb-3 row">
        <CLabel htmlFor="businessPartner" className="col-sm-3">
          Business Partner
        </CLabel>
        <CInput
          autoComplete="off"
          name="businessPartner"
          type="text"
          className="col-sm-8"
          id="businessPartner"
          value={businessData.businessPartner}
          onChange={(e) =>
            setBusinessData({
              ...businessData,
              businessPartner: e.currentTarget.value,
            })
          }
        />
      </div>

      <div className="mb-3 row">
        <CLabel htmlFor="estimatedAssetValue" className="col-sm-3">
          Estimated Asset Value (GHC)
        </CLabel>
        <CInput
          className="col-sm-8"
          aria-CLabel="Default select example"
          value={businessData.estimatedAssetValue}
          onChange={(e) =>
            setBusinessData({
              ...businessData,
              estimatedAssetValue: e.currentTarget.value,
            })
          }
        />
      </div>
      <div className="mb-3 row">
        <CLabel htmlFor="typeOfStructure" className="col-sm-3">
          Type of Structure
        </CLabel>
        <CInput
          name="typeOfStructure"
          autoComplete="off"
          type="text"
          className="col-sm-8"
          id="typeOfStructure"
          value={businessData.typeOfStructure}
          onChange={(e) =>
            setBusinessData({
              ...businessData,
              typeOfStructure: e.currentTarget.value,
            })
          }
        />
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

export default BusinessDetails
