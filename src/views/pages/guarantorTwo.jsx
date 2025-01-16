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

const GuarantorTwo = (props) => {
  const [products, setProducts] = useState([])
  const [guarantorData, setGuarantorData] = useState({
    disbursementId: 0,
    customer: 0,
    secondGuarantorName: '',
    secondGuarantorGpsAddress: '',
    secondGuarantorPhone: '',
    secondGuarantorBusiness: '',
    secondGuarantorIdType: '',
    secondGuarantorIdNumber: '',
    secondGuarantorRelationship: '',
    secondGuarantorHouseholdPerson: '',
    secondGuarantorHouseholdPersonPhone: '',

    /*secondGuarantorName: '',
    secondGuarantorGpsAddress: '',
    secondGuarantorPhone: '',
    secondGuarantorBusiness: '',
    secondGuarantorIdType: '',
    secondGuarantorIdNumber: '',
    secondGuarantorRelationship: '',
    secondGuarantorHouseholdPerson: '',
    secondGuarantorHouseholdPersonPhone: '',
    */
  })

  useEffect(() => {
    async function getProducts() {
      const results = await axios.get(baseUrl.apiUrl + '/setup/product')
      setProducts(results.data)
    }
    getProducts()
  }, [products])

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
    secondGuarantorName: Joi.string().required().label('Name of Guarantor'),
    secondGuarantorGpsAddress: Joi.string().required().label('Address'),
    secondGuarantorPhone: Joi.string().required().label('Phone'),
    secondGuarantorBusiness: Joi.string().required().label('Business'),
    secondGuarantorIdType: Joi.string().required().label('ID Type'),
    secondGuarantorIdNumber: Joi.string().required().label('ID Number'),
    secondGuarantorRelationship: Joi.string().required().label('Relationship'),
    secondGuarantorHouseholdPerson: Joi.string()
      .required()
      .label('House Hold Person'),
    secondGuarantorHouseholdPersonPhone: Joi.string()
      .required()
      .label('House Hold Phone'),
  }
  const schema = Joi.object(schemaMap)

  const validateForm = () => {
    const result = Joi.validate(guarantorData, schema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  const handleSubmit = async () => {
    console.log(guarantorData)
    const validate = validateForm()
    if (validate !== null) {
      return Swal.fire('Validation', validate, 'error')
    }
    try {
      const results = await axios.put(
        apiUrl + '/loan/booking/guarantortwo',
        guarantorData,
      )
      if (results.status !== 200) {
        return Swal.fire(
          'OOPs !',
          'Submission Failed ! Check Entries and try again !',
          'error',
        )
      } else {
        Swal.fire('Good job!', 'Loan Guarantor Saved Successfully', 'success')

        setGuarantorData({
          disbursementId: 0,
          customer: 0,
          secondGuarantorName: '',
          secondGuarantorGpsAddress: '',
          secondGuarantorPhone: '',
          secondGuarantorBusiness: '',
          secondGuarantorIdType: '',
          secondGuarantorIdNumber: '',
          secondGuarantorRelationship: '',
          secondGuarantorHouseholdPerson: '',
          secondGuarantorHouseholdPersonPhone: '',
        })
      }
    } catch (err) {
      Swal.fire('OOPS ! ', 'Loan Guarantor NOT Saved', 'error')
    }
  }
  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <CLabel htmlFor="secondGuarantorName" className="col-sm-2">
          Name
        </CLabel>
        <CInput
          name="secondGuarantorName"
          autoComplete="off"
          type="text"
          className="col-sm-8"
          id="secondGuarantorName"
          value={guarantorData.secondGuarantorName}
          onChange={(e) =>
            setGuarantorData({
              ...guarantorData,
              secondGuarantorName: e.currentTarget.value,
              customer: props.customer,
              disbursementId: props.disbursementId,
            })
          }
        />
      </div>

      <div className="row mb-3">
        <CLabel htmlFor="f" className="form-label col-sm-2">
          Phone
        </CLabel>
        <CInput
          autoComplete="off"
          name="secondGuarantorPhone"
          type="text"
          className="form-control col-sm-8"
          id="secondGuarantorPhone"
          value={guarantorData.secondGuarantorPhone}
          onChange={(e) =>
            setGuarantorData({
              ...guarantorData,
              secondGuarantorPhone: e.currentTarget.value,
            })
          }
        />
      </div>

      <div className="mb-3 row">
        <CLabel htmlFor="GPhone" className="col-sm-2">
          GPS Address
        </CLabel>
        <CInput
          name="Gphone"
          autoComplete="off"
          type="text"
          className="col-sm-4"
          id="Gphone"
          value={guarantorData.secondGuarantorGpsAddress}
          onChange={(e) =>
            setGuarantorData({
              ...guarantorData,
              secondGuarantorGpsAddress: e.currentTarget.value,
            })
          }
        />
      </div>

      <div className="row mb-3">
        <CLabel htmlFor="idType" className="col-sm-2">
          ID Type
        </CLabel>
        <CSelect
          className="form-select col-sm-8"
          aria-CLabel="Default select example"
          value={guarantorData.secondGuarantorIdType}
          onChange={(e) => {
            setGuarantorData({
              ...guarantorData,
              secondGuarantorIdType: e.currentTarget.value,
            })
          }}
        >
          <option defaultValue="">--Select ID--</option>
          <option value="National ID">National ID</option>
          <option value="Voter ID">Voter ID</option>
          <option value="Driver's License">Driver's License</option>
          <option value="Passport">Passport</option>
        </CSelect>
      </div>

      <div className="mb-3 row">
        <CLabel htmlFor="GPhone" className="col-sm-2">
          ID Number
        </CLabel>
        <CInput
          name="Gphone"
          autoComplete="off"
          type="text"
          className="col-sm-8"
          id="Gphone"
          value={guarantorData.secondGuarantorIdNumber}
          onChange={(e) =>
            setGuarantorData({
              ...guarantorData,
              secondGuarantorIdNumber: e.currentTarget.value,
            })
          }
        />
      </div>

      <div className="mb-3 row">
        <CLabel htmlFor="secondGuarantorBusiness" className="col-sm-2">
          Business/Occup.
        </CLabel>
        <CInput
          autoComplete="off"
          name="secondGuarantorBusiness"
          type="text"
          className="col-sm-8"
          id="secondGuarantorBusiness"
          value={guarantorData.secondGuarantorBusiness}
          onChange={(e) =>
            setGuarantorData({
              ...guarantorData,
              secondGuarantorBusiness: e.currentTarget.value,
            })
          }
        />
      </div>

      {/*<div className="mb-3 row">
        <CLabel htmlFor="dateofbirth" className="col-sm-2">
          Date of Birth
        </CLabel>
        <CInput
          autoComplete="off"
          name="Gphone"
          type="date"
          className="col-sm-8"
          id="dateofbirth"
          value={guarantorData.secondGuarantorDoB}
          onChange={(e) =>
            setGuarantorData({
              ...guarantorData,
              secondGuarantorDoB: e.currentTarget.value,
            })
          }
        />
      </div>
        
      <div className="mb-3 row">
        <CLabel htmlFor="nextofkin" className="col-sm-2">
          Next of Kin
        </CLabel>
        <CInput
          autoComplete="off"
          name="Gphone"
          type="text"
          className="col-sm-8"
          id="nextofkin"
          value={guarantorData.secondGuarantorNextOfKin}
          onChange={(e) =>
            setGuarantorData({
              ...guarantorData,
              secondGuarantorNextOfKin: e.currentTarget.value,
            })
          }
        />
      </div>
        */}
      <div className="mb-3 row">
        <CLabel htmlFor="idType" className="col-sm-2">
          Relationship
        </CLabel>
        <CSelect
          className="col-sm-8"
          aria-CLabel="Default select example"
          value={guarantorData.secondGuarantorRelationship}
          onChange={(e) =>
            setGuarantorData({
              ...guarantorData,
              secondGuarantorRelationship: e.currentTarget.value,
            })
          }
        >
          <option defaultValue="">--Select--</option>
          <option value="Father">Father</option>
          <option value="Mother">Mother</option>
          <option value="Sibling">Sibling</option>
          <option value="Family">Family</option>
          <option value="Son">Son</option>
          <option value="Daughter">Daughter</option>
          <option value="Brother">Brother</option>
          <option value="Sister">Sister</option>
          <option value="Friend">Friend</option>
          <option value="Spouse">Spouse</option>
          <option value="Business Partner">Business Partner</option>
          <option value="Work Colleague">Work Colleague</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Pastor">Pastor</option>
        </CSelect>
      </div>

      <div className="mb-3 row">
        <CLabel htmlFor="nextofkin" className="col-sm-2">
          Person In Household
        </CLabel>
        <CInput
          name="Gphone"
          autoComplete="off"
          type="text"
          className="col-sm-8"
          id="household"
          value={guarantorData.secondGuarantorHouseholdPerson}
          onChange={(e) =>
            setGuarantorData({
              ...guarantorData,
              secondGuarantorHouseholdPerson: e.currentTarget.value,
            })
          }
        />
      </div>

      <div className="mb-3 row">
        <CLabel htmlFor="householdPhone" className="col-sm-2">
          Person's Phone
        </CLabel>
        <CInput
          autoComplete="off"
          name="Gphone"
          type="text"
          className="col-sm-8"
          id="householdPhone"
          value={guarantorData.secondGuarantorHouseholdPersonPhone}
          onChange={(e) =>
            setGuarantorData({
              ...guarantorData,
              secondGuarantorHouseholdPersonPhone: e.currentTarget.value,
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

export default GuarantorTwo
