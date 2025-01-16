import React, { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import baseUrl from '../../config.json'
import auth from '../../components/services/authService'
import Joi from 'joi-browser'
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

const Associations = () => {
  const [association, setAssociation] = useState({
    association: '',
  })
  const [associationData, setAssociationData] = useState([])
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)

  useEffect(() => {
    async function getAssociations() {
      const results = await axios.get(baseUrl.apiUrl + '/setup/association')
      setAssociationData(results.data)
      //console.log(customers);
    }
    getAssociations()
  }, [associationData])

  const handleSubmit = async () => {
    try {
      const results = await axios.post(
        baseUrl.apiUrl + '/setup/association',
        association,
      )

      if (results.status !== 200) {
        return Swal.fire(
          'Failed',
          'Submission Failed ! Check Entries and try again !',
          'error',
        )
      } else {
        Swal.fire('Success', 'Association/Group Saved Successfully', 'success')
        setAssociation({
          association: '',
        })
      }
    } catch (err) {
      Swal.fire('Error', 'OOPS ! ' + err.message, 'error')
    }
  }
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const data = {
    sAssociation: associationData.filter((item) =>
      item.association.toLowerCase().includes(search.toLowerCase()),
    ),
  }

  const staffView = (s) => {
    console.log(s)
  }

  const dataTouse = search.length === 0 ? associationData : data.sAssociation
  return (
    <div className="col-sm-12 mt-3">
      <h1 className="centertext">Group/Association</h1>
      <p className="staffp">
        People and their behaviors are what deliver results to your
        organization. Not systems, not processes, not computers, not machines.{' '}
        <br />
        "Mark Hortsman"
      </p>

      <div className="centreStaff row ">
        <div className="table-responsive">
          <CButton
            type="submit"
            className="btn btn-success btn-block col-sm-3 float-right btn-sm"
            onClick={() => setShow(!show)}
          >
            + Setup New Association/Group
          </CButton>
          <CInput
            className="mt-3 mb-3 col-4"
            type="text"
            placeholder="Search with Staff Name or Phone"
            onChange={handleSearch}
          />
          <Table>
            <thead>
              <tr className="fs-sm">
                <th></th>
                <th>Association/Group</th>
              </tr>
            </thead>
            <tbody>
              {dataTouse.map((s, index) => (
                <tr key={s._id} onClick={() => staffView(s)}>
                  <td>{index + 1}</td>
                  <td>{s.association}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <CModal
          show={show}
          onClose={() => {
            setShow(!show)
          }}
          color="success"
          size="md"
        >
          <CModalHeader closeButton>
            <CModalTitle>SETUP | ADD ASSOCIATION/GROUP </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CInputGroup className="mt-3">
                <CLabel htmlFor="fullName" className="form-Label col-sm-4">
                  Association / Group
                </CLabel>
                <CInput
                  type="text"
                  className="form-control col-sm-8"
                  id="fullName"
                  value={association.association}
                  onChange={(e) =>
                    setAssociation({
                      ...association,
                      association: e.currentTarget.value,
                    })
                  }
                />
              </CInputGroup>

              <div className="d-flex justify-content-center mt-3 mb-3">
                <CButton
                  className="btn btn-danger col-sm-3 mt-3 float-right btn-md"
                  onClick={handleSubmit}
                >
                  Submit
                </CButton>
              </div>
            </CFormGroup>
          </CModalBody>
        </CModal>
      </div>
    </div>
  )
}

export default Associations
