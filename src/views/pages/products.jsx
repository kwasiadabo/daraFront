import React, { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import baseUrl from '../../config.json'
import auth from '../../components/services/authService'
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

import Swal from 'sweetalert2'

const ProductSetup = () => {
  const [allProducts, setAllProducts] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [render, setRender] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const [products, setProducts] = useState({
    product: '',
    processingFee: '',
    frequency: '',
    interestRate: '',
    registrationFee: '',
    duration: '',
    shortName: '',
    //fixation: '',
    // allowedAmount: 0,
    cashCollateral: 0,
  })
  const schemaMap = {
    product: Joi.string().required().label('Product Field'),
    processingFee: Joi.number().required().label('Processing Fee Field'),

    frequency: Joi.string().required().label('Frequency Field'),
    interestRate: Joi.number().required().label('Interest Rate Field'),

    registrationFee: Joi.number().required().label('Registration Fee Field'),
    duration: Joi.number().required().label('duration Field'),
    //fixation: Joi.string().allow('').label('Fixation Field'),
    //allowedAmount: Joi.number().allow('').label('Allowed Amount'),
    cashCollateral: Joi.number().required().label('Cash Collateral'),
    id: Joi.string().allow('').label('ID'),
    shortName: Joi.string().allow(''),
  }

  const schema = Joi.object(schemaMap)
  const validateForm = () => {
    const result = Joi.validate(products, schema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  const handleSubmit = async (e) => {
    console.log(products)
    e.preventDefault()
    setEditMode(false)
    try {
      const validate = validateForm()
      if (validate !== null) {
        return Swal.fire('error', validate, 'error')
      }
      const results = await axios.post(
        baseUrl.apiUrl + '/setup/product',
        products,
      )
      if (results.status !== 200) {
        return Swal.fire(
          'OOPS !',
          'Submission Failed ! Check Entries and try again !',
          'error',
        )
      } else {
        Swal.fire('Success', 'Product Saved Successfully', 'success')
        setProducts({
          product: '',
          processingFee: '',
          frequency: '',
          interestRate: '',
          registrationFee: '',
          duration: '',
          fixation: '',
          allowedAmount: 0,
          cashCollateral: 0,
          shortName: '',
        })
        setRender(!render)
      }
    } catch (err) {
      Swal.fire('OOPS ! ' + err.message, 'error')
    }
  }
  useEffect(() => {
    async function getProducts() {
      const results = await axios.get(baseUrl.apiUrl + '/setup/product')
      setAllProducts(results.data)
      setEditMode(false)
    }
    getProducts()
  }, [render])

  const handleOnEdit = (p) => {
    setEditMode(true)
    setProducts({
      product: p.product,
      processingFee: p.processingFee,
      frequency: p.frequency,
      interestRate: p.interestRate,
      registrationFee: p.registrationFee,
      duration: p.duration,
      cashCollateral: p.cashCollateral,
      shortName: p.shortName,
      id: p.id,
    })
    //setDisabled(!disabled);
  }
  const handleUpdate = async (e) => {
    e.preventDefault()

    if (products.product !== '') {
      try {
        const results = await axios.put(
          baseUrl.apiUrl + '/setup/product',
          products,
        )
        if (results.status !== 200) {
          return Swal.fire(
            'OOPS !',
            'Submission Failed ! Check Entries and try again !',
            'error',
          )
        } else {
          Swal.fire('Success', 'Product Updated Successfully', 'success')
          setProducts({
            product: '',
            processingFee: '',
            frequency: '',
            interestRate: '',
            registrationFee: '',
            duration: '',
            fixation: '',
            allowedAmount: 0,
            cashCollateral: 0,
            shortName: '',
            id: '',
          })
          setRender(!render)
        }
      } catch (err) {
        Swal.fire('OOPS ! ' + err.message, 'error')
      }
    } else {
      return Swal.fire('OOPS', 'Enter all Details !', 'error')
    }
  }

  return (
    <div className="container-fluid">
      <h1 className="centertext mt-5">Setup Products</h1>
      <p className="staffp">
        Setup all products you deal in. Your products brings in the income,
        capture all details about them.
      </p>
      <CForm className="row g-3 m-5">
        <CInputGroup className="mt-3">
          <CLabel for="product" className="col-sm-3">
            Product Name
          </CLabel>
          <CInput
            autoComplete="off"
            type="text"
            className="col-sm-8"
            id="product"
            value={products.product}
            onChange={(e) =>
              setProducts({ ...products, product: e.currentTarget.value })
            }
          />
        </CInputGroup>

        <CInputGroup className="mt-3">
          <CLabel for="shortName" className="col-sm-3">
            Short Name
          </CLabel>
          <CInput
            autoComplete="off"
            type="text"
            className="col-sm-4"
            id="shortName"
            value={products.shortName}
            onChange={(e) =>
              setProducts({ ...products, shortName: e.currentTarget.value })
            }
          />
        </CInputGroup>
        <CInputGroup className="mt-3">
          <CLabel for="processingFee" className="col-sm-3">
            Proc. Fee (%)
          </CLabel>
          <CInput
            autoComplete="off"
            type="text"
            className="col-sm-8"
            id="processingFee"
            value={products.processingFee}
            onChange={(e) =>
              setProducts({
                ...products,
                processingFee: e.currentTarget.value,
              })
            }
          />
        </CInputGroup>
        <CInputGroup className="mt-3">
          <CLabel for="frequency" className="col-sm-3">
            Repayment Frequency
          </CLabel>
          <CSelect
            id="frequency"
            className="form-select col-sm-8"
            value={products.frequency}
            onChange={(e) =>
              setProducts({ ...products, frequency: e.currentTarget.value })
            }
          >
            <option selected>Choose...</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Bi Weekly">Bi Weekly</option>
            <option value="Monthly"> Monthly</option>
          </CSelect>
        </CInputGroup>
        <CInputGroup className="mt-3">
          <CLabel for="minInterest" className="col-sm-3">
            Interest Rate (%)
          </CLabel>
          <CInput
            autoComplete="off"
            type="text"
            className="form-control-md col-sm-8"
            id="minInterest"
            value={products.interestRate}
            onChange={(e) =>
              setProducts({
                ...products,
                interestRate: e.currentTarget.value,
              })
            }
          />
        </CInputGroup>
        <CInputGroup className="mt-3">
          <CLabel for="registrationFee" className="col-sm-3">
            Reg. Fee (GHC)
          </CLabel>
          <CInput
            autoComplete="off"
            type="text"
            className="form-control-md col-sm-8"
            id="registrationFee"
            value={products.registrationFee}
            onChange={(e) =>
              setProducts({
                ...products,
                registrationFee: e.currentTarget.value,
              })
            }
          />
        </CInputGroup>
        <CInputGroup className="mt-3">
          <CLabel for="duration" className="col-sm-3">
            Duration (Days)
          </CLabel>
          <CInput
            autoComplete="off"
            type="text"
            className="form-control-md col-sm-8"
            id="duration"
            value={products.duration}
            onChange={(e) =>
              setProducts({ ...products, duration: e.currentTarget.value })
            }
          />
        </CInputGroup>

        <CInputGroup className="mt-3">
          <CLabel htmlFor="cashCollateral" className="col-sm-3">
            Cash Collateral (%)
          </CLabel>
          <CInput
            autoComplete="off"
            type="number"
            pattern="([0-9]{1,3}).([0-9]{1,3})"
            className="form-control-md col-sm-8"
            id="cashCollateral"
            value={products.cashCollateral}
            onChange={(e) =>
              setProducts({
                ...products,
                cashCollateral: e.currentTarget.value,
              })
            }
          />
        </CInputGroup>

        <div className="row">
          {!editMode ? (
            <CButton
              type="submit"
              className="btn btn-danger mt-5"
              onClick={handleSubmit}
            >
              Save Product
            </CButton>
          ) : null}
          {editMode ? (
            <CButton
              type="submit"
              class="btn btn-success mt-5 ms-5"
              onClick={handleUpdate}
            >
              Edit Product
            </CButton>
          ) : null}
        </div>
      </CForm>

      <Table className="sm table-sm">
        <caption>Click on any product details to update</caption>
        <thead>
          <tr className="fs-sm">
            <th></th>
            <th>Product Name</th>
            <th>Short Name</th>
            <th>Proc. Fee(%)</th>
            <th>Frequency</th>
            <th>Interest Rate (%)</th>
            <th>Reg. Fee</th>
            <th>Duration</th>
            <th>Cash Collateral (%)</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((c, index) => (
            <tr
              key={c._id}
              onClick={() => handleOnEdit(c)}
              Style="cursor: pointer;"
            >
              <td>{index + 1}</td>
              <td>{c.product}</td>
              <td>{c.shortName}</td>
              <td>{c.processingFee}</td>
              <td>{c.frequency}</td>
              <td>{c.interestRate}</td>
              <td>{c.registrationFee}</td>
              <td>{c.duration}</td>
              <td>{c.cashCollateral}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ProductSetup
