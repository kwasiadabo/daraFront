import React, { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
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

const BankAccount = () => {
  const [bank, setBank] = useState({
    bank: '',
    branch: '',
    accountNumber: '',
    accountName: '',
    typeOfAccount: '',
  })
  const [banks, setBanks] = useState([])
  const [bankAccounts, setBankAccounts] = useState([])

  useEffect(() => {
    async function getBanks() {
      const results = await axios.get(baseUrl.apiUrl + '/setup/bank')
      setBanks(results.data)
    }
    getBanks()
  }, [banks])

  useEffect(() => {
    async function getBankAccounts() {
      const results = await axios.get(baseUrl.apiUrl + '/setup/bankaccount')
      setBankAccounts(results.data)
    }
    getBankAccounts()
  }, [bankAccounts])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const results = await axios.post(
        baseUrl.apiUrl + '/setup/bankaccount',
        bank,
      )
      console.log(results.status)
      if (results.status !== 200) {
        return Swal.fire(
          'OOPS',
          'Submission Failed ! Check Entries and try again !',
          'error',
        )
      } else {
        Swal.fire(
          'Success',
          'Bank Account Details Saved Successfully',
          'success',
        )
        setBank({
          bank: '',
          branch: '',
          accountNumber: '',
          accountName: '',
          typeOfAccount: '',
          contact: '',
        })
      }
    } catch (err) {
      Swal.fire('OOPS ! ' + err.message, 'error')
    }
  }

  return (
    <div className="container-fluid">
      <h1 className="centertext">Bank Account Details</h1>
      <p className="staffp">
        Giving your banks accounts details helps track your transactions with
        them.
      </p>

      <CInputGroup className="mt-3">
        <CLabel for="inputPassword" className="col-sm-3">
          Bank
        </CLabel>

        <CSelect
          className="form-select col-sm-8"
          aria-label="Default select example "
          value={bank.bank}
          onChange={(e) => setBank({ ...bank, bank: e.currentTarget.value })}
        >
          <option defaultValue="">--Select Bank--</option>
          {banks.map((b) => (
            <option key={b.id} value={b.id} id={b.id}>
              {b.bank}
            </option>
          ))}
        </CSelect>
      </CInputGroup>

      <CInputGroup className="mt-3">
        <CLabel htmlFor="appdate" className="col-sm-3">
          Branch
        </CLabel>

        <CInput
          type="text"
          className="form-control  col-sm-8"
          id="appdate"
          value={bank.branch}
          onChange={(e) =>
            setBank({
              ...bank,
              branch: e.currentTarget.value,
            })
          }
        />
      </CInputGroup>

      <CInputGroup className="mt-3">
        <CLabel htmlFor="phoneofgurantor1" className="col-sm-3">
          Account Name
        </CLabel>

        <CInput
          type="text"
          className="form-control  col-sm-8"
          id="phoneofgurantor1"
          value={bank.accountName}
          onChange={(e) =>
            setBank({
              ...bank,
              accountName: e.currentTarget.value,
            })
          }
        />
      </CInputGroup>

      <CInputGroup className="mt-3">
        <CLabel htmlFor="phone" className="col-sm-3">
          Account Number
        </CLabel>

        <CInput
          type="text"
          className="form-control col-sm-8"
          id="phone"
          value={bank.accountNumber}
          onChange={(e) =>
            setBank({
              ...bank,
              accountNumber: e.currentTarget.value,
            })
          }
        />
      </CInputGroup>

      <CInputGroup className="mt-3">
        <CLabel htmlFor="qualification" className="col-sm-3">
          Type of Account
        </CLabel>

        <CSelect
          className="form-select col-sm-8"
          aria-label="Default select example"
          value={bank.typeOfAccount}
          onChange={(e) => {
            setBank({
              ...bank,
              typeOfAccount: e.currentTarget.value,
            })
          }}
        >
          <option defaultValue="">--Select Account Type--</option>
          <option value="Savings">Savings</option>
          <option value="Current Account">Current</option>
        </CSelect>
      </CInputGroup>

      <div className="row justify-content-center">
        <CButton
          className="btn btn-danger col-sm-3 mt-3"
          onClick={handleSubmit}
        >
          Submit
        </CButton>
      </div>

      <Table className="mt-3 sm">
        <thead>
          <tr className="fs-sm">
            <th></th>
            <th>Bank</th>
            <th>Account Number</th>
            <th>Branch</th>
            <th>Type Of Account</th>
            <th>Name of Account</th>
          </tr>
        </thead>
        <tbody>
          {bankAccounts.map((c, index) => (
            <tr key={c._id} Style="cursor: pointer;">
              <td>{index + 1}</td>
              <td>{c.BankName}</td>
              <td>{c.accountNumber}</td>
              <td>{c.branch}</td>
              <td>{c.typeOfAccount}</td>
              <td>{c.accountName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BankAccount
