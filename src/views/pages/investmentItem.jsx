import React, { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import baseUrl from '../../config.json'
import auth from '../../components/services/authService'
import Swal from 'sweetalert2'

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

const InvestmentItem = () => {
  const [investmentItem, setInvestmentItem] = useState({
    item: '',
  })
  const [investmentItems, setInvestmentItems] = useState([])

  useEffect(() => {
    async function getInvestmentItems() {
      const results = await axios.get(baseUrl.apiUrl + '/investment/item')
      setInvestmentItems(results.data)
    }
    getInvestmentItems()
    console.log(investmentItems)
  }, [])

  const handleSubmit = async () => {
    try {
      const results = await axios.post(
        baseUrl.apiUrl + '/setup/investmentitem',
        expenseItem,
      )

      if (results.status !== 200) {
        return Swal.fire(
          'Failed',
          'Submission Failed ! Check Entries and try again !',
          'error',
        )
      } else {
        Swal.fire('Success', 'Investment Item Saved Successfully', 'success')
        setInvestmentItem({
          item: '',
        })
      }
    } catch (err) {
      Swal.fire('OOPS ! ' + err.message, 'error')
    }
  }

  return (
    <div className="container-fluid">
      <h1 className="centertext">Investment Items</h1>

      <CLabel htmlFor="investment" cclassName="col-sm-2">
        Investment Item
      </CLabel>
      <CInputGroup className="mt-3">
        <CInput
          type="text"
          className="form-control col-sm-10"
          id="investment"
          value={InvestmentItem.item}
          onChange={(e) =>
            setInvestmentItem({
              ...investmentItem,
              item: e.currentTarget.value,
            })
          }
        />
      </CInputGroup>
      <div className="row justify-content-center">
        <CButton
          className="btn btn-danger col-sm-2 mt-2"
          onClick={handleSubmit}
        >
          Submit
        </CButton>
      </div>
      <Table className="mt-3">
        <thead>
          <tr className="fs-sm">
            <th></th>
            <th>Investment Item</th>
          </tr>
        </thead>
        <tbody>
          {investmentItems.map((c, index) => (
            <tr key={c._id}>
              <td>{index + 1}</td>
              <td>{c.item}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default InvestmentItem
