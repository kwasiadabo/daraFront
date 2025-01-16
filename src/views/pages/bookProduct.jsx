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

const BookProduct = (props) => {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState([])
  const [productShow, setProductShow] = useState(false)
  const [productData, setProductData] = useState({
    disbursementId: 0,
    customer: 0,
    product: 0,
    cashCollateral: 0,
    interestRate: 0,
    frequency: '',
    duration: 0,
  })

  useEffect(() => {
    async function getProducts() {
      const results = await axios.get(baseUrl.apiUrl + '/setup/product')
      setProducts(results.data)
    }
    getProducts()
  }, [products])

  const handleProductSelect = (e) => {
    //console.log(products)
    setSelectedProduct(products.filter((p) => p.id == e.currentTarget.value))

    const productSelected = products.filter(
      (p) => p.id == e.currentTarget.value,
    )
    //console.log(selectedProduct[0])
    setProductData({
      ...productData,
      product: e.currentTarget.value,
      customer: props.customer,
      disbursementId: props.disbursementId,
      cashCollateral: props.cashCollateral,
      interestRate: productSelected[0].interestRate,
      frequency: productSelected[0].frequency,
      duration: productSelected[0].duration,
    })
  }

  const schemaMap = {
    disbursementId: Joi.number().required().label('Cheque Details'),
    customer: Joi.number().required().label('Disbursed By'),
    product: Joi.number().required().label('Customer'),
    cashCollateral: Joi.number().label('Cash Collateral'),
    interestRate: Joi.number().label('Interest Rate'),
    frequency: Joi.string().label('Frequency'),
    duration: Joi.number().label('Duration'),
  }
  const schema = Joi.object(schemaMap)

  const validateForm = () => {
    const result = Joi.validate(productData, schema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  const handleSubmit = async () => {
    console.log(productData)
    /* if (productData.interestRate < selectedProduct[0].interestRate)
      return Swal.fire(
        'Interest Rate Voilation',
        'Below 20% Interest Rates are not acceptable',
        'error',
      )*/
    const validate = validateForm()
    if (validate !== null) {
      return Swal.fire('Validation', validate, 'error')
    }
    try {
      const results = await axios.post(
        apiUrl + '/loan/booking/product',
        productData,
      )
      if (results.status !== 200) {
        return Swal.fire(
          'OOPs !',
          'Submission Failed ! Check Entries and try again !',
          'error',
        )
      } else {
        Swal.fire('Good job!', 'Loan Product Saved Successfully', 'success')

        setProductData({
          disbursementId: 0,
          customer: 0,
          product: 0,
          interestRate: 0,
          frequency: '',
          duration: 0,
        })
        setProductShow(!productShow)
      }
    } catch (err) {
      Swal.fire(
        'OOPS Product Booking Error! ',
        'Loan Product Booking NOT Saved',
        'error',
      )
    }
  }
  return (
    <div className="container-fluid">
      <div className="col-sm-12 mt-3">
        <CLabel htmlFor="product" className="col-sm-3">
          Select Product *
        </CLabel>

        <CSelect
          id="product"
          className="col-sm-8"
          aria-label="Default select example"
          value={productData.product}
          onChange={handleProductSelect}
        >
          <option defaultValue="">--Select Product--</option>
          {products.map((p) => (
            <option key={p.id} value={p.id} id={p.id}>
              {p.product}
            </option>
          ))}
        </CSelect>

        <CLabel htmlFor="InterestRate" className="col-sm-3">
          Interest Rate (%)
        </CLabel>
        <CInput
          type="text"
          className="col-sm-4"
          id="InterestRate"
          value={productData.interestRate}
          onChange={(e) =>
            setProductData({
              ...productData,
              interestRate: e.currentTarget.value,
            })
          }
        />

        <CLabel htmlFor="frequency" className="col-sm-3">
          Payment Frequency *
        </CLabel>

        <CSelect
          id="freqency"
          className="col-sm-8"
          aria-label="Default select example"
          value={productData.frequency}
          onChange={(e) =>
            setProductData({
              ...productData,
              frequency: e.currentTarget.value,
            })
          }
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          ))}
        </CSelect>

        <CLabel htmlFor="Duration" className="col-sm-4">
          Duration (
          {productData.frequency === 'Daily'
            ? 'Days'
            : productData.frequency === 'Weekly'
            ? 'Weeks'
            : 'Months'}
          )
        </CLabel>
        <CInput
          type="text"
          className="col-sm-4"
          id="Duration"
          value={productData.duration}
          onChange={(e) =>
            setProductData({
              ...productData,
              duration: e.currentTarget.value,
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

export default BookProduct
