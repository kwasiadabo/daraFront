import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi-browser'
import moment from 'moment'
import momentBusinessDays from 'moment-business-days'
import baseUrl from '../../config.json'
import auth from '../../components/services/authService'
import Swal from 'sweetalert2'
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
function Branches() {
  const [branch, setBranch] = useState({
    branch: '',
    location: '',
    gps: '',
    phone: '',
  })
  const [branches, setBranches] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [render, setRender] = useState(false)

  useEffect(() => {
    async function getBranches() {
      const results = await axios.get(baseUrl.apiUrl + '/setup/branch')
      setBranches(results.data)
    }
    getBranches()
  }, [render])
  const handleSubmit = async (e) => {
    console.log(branch)
    e.preventDefault()

    try {
      const results = await axios.post(baseUrl.apiUrl + '/setup/branch', branch)

      if (results.status !== 200) {
        return Swal.fire(
          'OOPS',
          'Submission Failed ! Check Entries and try again !',
          'error',
        )
      } else {
        Swal.fire('Success', 'Branch Saved Successfully', 'success')
        setBranch({
          branch: '',
          location: '',
          gps: '',
          phone: '',
        })
        setRender(!render)
      }
    } catch (err) {
      Swal.fire('OOPS ! ' + err, 'error')
    }
  }

  const handleOnEdit = (p) => {
    setEditMode(true)
    setBranch({
      branch: p.branch,
      location: p.location,
      gps: p.GPS,
      phone: p.phone,
      id: p.id,
    })
    //setDisabled(!disabled);
  }

  const handleUpdate = async (e) => {
    console.log(branch)
    if (branch.branch !== '') {
      try {
        const results = await axios.put(
          baseUrl.apiUrl + '/setup/branch',
          branch,
        )
        if (results.status !== 200) {
          return Swal.fire(
            'OOPS !',
            'Submission Failed ! Check Entries and try again !',
            'error',
          )
        } else {
          Swal.fire('Success', 'Branch Updated Successfully', 'success')
          setBranch({
            branch: '',
            location: '',
            gps: '',
            phone: '',
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
    if (branch.branch !== '') {
      try {
        const results = await axios.delete(
          baseUrl.apiUrl + '/setup/branch/' + branch.id,
        )
        if (results.status !== 200) {
          return Swal.fire(
            'OOPS !',
            'Submission Failed ! Check Entries and try again !',
            'error',
          )
        } else {
          Swal.fire('Success', 'Branch Deleted Successfully', 'success')
          setBranch({
            branch: '',
            location: '',
            gps: '',
            phone: '',
          })
          setEditMode(false)
          setRender(!render)
        }
      } catch (err) {
        Swal.fire('OOPS ! ' + err.message, 'error')
      }
    } else {
      return Swal.fire('OOPS', 'Select a Branch !', 'error')
    }
  }

  return (
    <div className="container-fluid">
      <p className="staffp">
        A branch of a company can offer visibility and brand exposure which can
        positively influence a company's profits. A branch office can also
        reduce the risk of doing business in the host country by allowing the
        opportunity to test products in new markets.
      </p>
      <CInputGroup className="mt-3">
        <CLabel htmlFor="branch" className="col-sm-2">
          Branch
        </CLabel>
        <CInput
          type="text"
          className="form-control col-sm-8"
          id="branch"
          value={branch.branch}
          onChange={(e) =>
            setBranch({
              ...branch,
              branch: e.currentTarget.value,
            })
          }
        />
      </CInputGroup>
      <CInputGroup className="mt-3">
        <CLabel htmlFor="location" className="col-sm-2">
          Location
        </CLabel>
        <CInput
          type="text"
          className="form-control col-sm-8"
          id="location"
          value={branch.location}
          onChange={(e) =>
            setBranch({
              ...branch,
              location: e.currentTarget.value,
            })
          }
        />
      </CInputGroup>
      <CInputGroup className="mt-3">
        <CLabel htmlFor="gps" className="col-sm-2">
          Ghana Post GPS
        </CLabel>
        <CInput
          type="text"
          className="form-control col-sm-8"
          id="gps"
          value={branch.gps}
          onChange={(e) =>
            setBranch({
              ...branch,
              gps: e.currentTarget.value,
            })
          }
        />
      </CInputGroup>
      <CInputGroup className="mt-3">
        <CLabel htmlFor="phone" className="col-sm-2">
          Phone
        </CLabel>
        <CInput
          type="text"
          className="form-control col-sm-8"
          id="phone"
          value={branch.phone}
          onChange={(e) =>
            setBranch({
              ...branch,
              phone: e.currentTarget.value,
            })
          }
        />
      </CInputGroup>

      <div className="row justify-content-center">
        {!editMode ? (
          <CButton
            className="btn btn-primary col-sm-2 mt-3 btn-sm"
            onClick={handleSubmit}
          >
            Submit
          </CButton>
        ) : null}
        {editMode ? (
          <CButton
            className="btn-sm m-3 col-sm-2"
            color="success"
            onClick={handleUpdate}
          >
            Update
          </CButton>
        ) : null}

        {editMode && (
          <CButton
            className="btn btn-danger col-sm-2 m-3 btn-sm"
            onClick={handleDelete}
          >
            Delete
          </CButton>
        )}
      </div>
      <Table className="sm mt-3 table-sm">
        <thead>
          <tr className="fs-sm">
            <th></th>
            <th>Branch</th>
            <th>Location</th>
            <th>GPS</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((c, index) => (
            <tr
              key={c.id}
              Style="cursor: pointer;"
              onClick={() => handleOnEdit(c)}
            >
              <td>{index + 1}</td>
              <td>{c.branch}</td>
              <td>{c.location}</td>
              <td>{c.GPS}</td>
              <td>{c.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Branches
