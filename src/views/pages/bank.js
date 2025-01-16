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

const Bank = () => {
  const [bank, setBank] = useState({
    bank: '',
  })
  const [banks, setBanks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [render, setRender] = useState(false)

  useEffect(() => {
    async function getBanks() {
      const results = await axios.get(baseUrl.apiUrl + '/setup/bank')
      setBanks(results.data)
    }
    getBanks()
    //console.log(banks)
  }, [render])

  const handleSubmit = async () => {
    try {
      const results = await axios.post(baseUrl.apiUrl + '/setup/bank', bank)

      if (results.status !== 200) {
        return Swal.fire(
          'OOPS',
          'Submission Failed ! Check Entries and try again !',
          'error',
        )
      } else {
        Swal.fire('Success', 'Bank Name Saved Successfully', 'success')
        setBank({
          bank: '',
        })
        setRender(!render)
      }
    } catch (err) {
      Swal.fire('OOPS ! ' + err.message, 'error')
    }
  }
  const handleOnEdit = (p) => {
    setEditMode(true)
    setBank({
      bank: p.bank,
      id: p.id,
    })
    //setDisabled(!disabled);
  }

  const handleUpdate = async (e) => {
    if (bank.bank !== '') {
      try {
        const results = await axios.put(baseUrl.apiUrl + '/setup/bank', bank)
        if (results.status !== 200) {
          return Swal.fire(
            'OOPS !',
            'Submission Failed ! Check Entries and try again !',
            'error',
          )
        } else {
          Swal.fire('Success', 'Bank Updated Successfully', 'success')
          setBank({
            bank: '',
          })
          setEditMode(false)
          setRender(!render)
        }
      } catch (err) {
        Swal.fire('OOPS ! ' + err.message, 'error')
      }
    } else {
      return Swal.fire('OOPS', 'Enter all Details !', 'error')
    }
  }

  const handleDelete = async () => {
    if (bank.bank !== '') {
      try {
        const results = await axios.delete(
          baseUrl.apiUrl + '/setup/bank/' + bank.id,
        )
        if (results.status !== 200) {
          return Swal.fire(
            'OOPS !',
            'Submission Failed ! Check Entries and try again !',
            'error',
          )
        } else {
          Swal.fire('Success', 'Bank Deleted Successfully', 'success')
          setBank({
            bank: '',
          })
          setEditMode(false)
          setRender(!render)
        }
      } catch (err) {
        Swal.fire('OOPS ! ' + err.message, 'error')
      }
    } else {
      return Swal.fire('OOPS', 'Select a Bank !', 'error')
    }
  }

  return (
    <div className="container-fluid">
      <div className="col-10 mt-3">
        <h1 className="centertext">Our Banks</h1>
        <p className="staffp">The banks we transact business with</p>

        <CLabel htmlFor="Bank" className="form-label ">
          Bank
        </CLabel>
        <CInputGroup className="mt-3">
          <CInput
            type="text"
            className="form-control col-sm-10"
            id="Bank"
            value={bank.bank}
            onChange={(e) =>
              setBank({
                ...bank,
                bank: e.currentTarget.value,
              })
            }
          />
        </CInputGroup>
        <div className="mb-3">
          {!editMode ? (
            <CButton
              className="btn btn-primary col-2 mt-3 btn-sm"
              onClick={handleSubmit}
            >
              Submit
            </CButton>
          ) : null}
          {editMode ? (
            <CButton
              type="submit"
              class="btn btn-success col-2 ms-5 mt-3 btn-sm"
              onClick={handleUpdate}
            >
              Update Bank
            </CButton>
          ) : null}

          {editMode && (
            <CButton
              className="btn btn-danger mr-3 col-sm-2 mt-3 mb-3 float-left btn-sm"
              onClick={handleDelete}
            >
              Delete
            </CButton>
          )}
        </div>

        <Table className="table-sm col-sm-6 mt-3">
          <caption>Click on any bank to update or delete</caption>
          <thead>
            <tr className="fs-sm">
              <th></th>
              <th>Bank</th>
            </tr>
          </thead>
          <tbody>
            {banks.map((c, index) => (
              <tr
                key={c.id}
                Style="cursor: pointer;"
                onClick={() => handleOnEdit(c)}
              >
                <td>{index + 1}</td>
                <td>{c.bank}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Bank
