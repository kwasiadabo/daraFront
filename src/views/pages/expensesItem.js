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

const ExpenseItem = () => {
  const [expenseItem, setExpenseItem] = useState({
    item: '',
  })
  const [expenseItems, setExpenseItems] = useState([])

  useEffect(() => {
    async function getExpenseItems() {
      const results = await axios.get(baseUrl.apiUrl + '/setup/expensesitem')
      setExpenseItems(results.data)
    }
    getExpenseItems()
  }, [])

  const handleSubmit = async () => {
    try {
      const results = await axios.post(
        baseUrl.apiUrl + '/setup/expensesitem',
        expenseItem,
      )

      if (results.status !== 200) {
        return Swal.fire(
          'Failed',
          'Submission Failed ! Check Entries and try again !',
          'error',
        )
      } else {
        Swal.fire('Success', 'Expense Item Saved Successfully', 'success')
        setExpenseItem({
          item: '',
        })
      }
    } catch (err) {
      Swal.fire('OOPS ! ' + err.message, 'error')
    }
  }

  return (
    <div className="container-fluid">
      <h1 className="centertext">Expenses Items</h1>

      <CLabel htmlFor="expense" cclassName="col-sm-2">
        Expense Item
      </CLabel>
      <CInputGroup className="mt-3">
        <CInput
          type="text"
          className="form-control col-sm-10"
          id="expense"
          value={expenseItem.item}
          onChange={(e) =>
            setExpenseItem({
              ...expenseItem,
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
            <th>Expense Item</th>
          </tr>
        </thead>
        <tbody>
          {expenseItems.map((c, index) => (
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

export default ExpenseItem
