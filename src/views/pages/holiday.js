import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi-browser'
import moment from 'moment'
import momentBusinessDays from 'moment-business-days'
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

const HolidaySetup = () => {
  const [holiday, setHoliday] = useState({
    holiday: '',
    hdate: '',
    year: '',
  })
  const [holidays, setHolidays] = useState([])
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [editMode, setEditMode] = useState(false)
  const [render, setRender] = useState(false)

  useEffect(() => {
    async function getHolidays() {
      const yearInt = new Date()
      const results = await axios.get(
        baseUrl.apiUrl + '/setup/holiday/' + currentYear,
      )
      setHolidays(results.data)
    }
    getHolidays()
  }, [currentYear, render])

  const [disableButton, setDisableButton] = useState(false)

  const joiHolidaySchema = Joi.object().keys({
    holiday: Joi.string().required().label('Holiday'),
    hdate: Joi.date().required().label('date'),
    year: Joi.number().required().label('Holiday Year'),
  })

  const validateEntry = () => {
    const result = Joi.validate(holidays, joiHolidaySchema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  const handleDateChange = (e) => {
    const year = new Date(e.currentTarget.value)
    setHoliday({
      ...holiday,
      hdate: e.currentTarget.value,
      year: year.getFullYear(),
    })
  }

  const handleOnEdit = (p) => {
    console.log(p)
    setEditMode(true)
    setHoliday({
      id: p.id,
      holiday: p.holiday,
      hdate: new Date(p.hdate).toISOString().slice(0, 10),
      year: p.year,
    })
    //setDisabled(!disabled);
  }

  const handleSubmit = async () => {
    // console.log(holiday)
    validateEntry()
    try {
      const results = await axios.post(
        baseUrl.apiUrl + '/setup/holiday',
        holiday,
      )

      if (results.status === 200) {
        Swal.fire('Success', 'Holiday Saved', 'success')
        setRender(!render)
      } else {
        Swal.fire('OOPS !', 'Saving Holiday, failed !', 'error')
      }
    } catch (err) {
      Swal.fire(err + ' Saving Holiday, failed !', 'error')
    }
    setHoliday({ holiday: '', hdate: '' })
  }

  const handleUpdate = async (e) => {
    console.log(holiday)
    if (holiday.holiday !== '') {
      try {
        const results = await axios.put(
          baseUrl.apiUrl + '/setup/holiday',
          holiday,
        )
        if (results.status !== 200) {
          return Swal.fire(
            'OOPS !',
            'Submission Failed ! Check Entries and try again !',
            'error',
          )
        } else {
          Swal.fire('Success', 'Holiday Updated Successfully', 'success')

          setHoliday({
            holiday: '',
            hdate: '',
            year: '',
          })
          setRender(!render)
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
    if (holiday.holiday !== '') {
      try {
        const results = await axios.delete(
          baseUrl.apiUrl + '/setup/holiday/' + holiday.id,
        )
        if (results.status !== 200) {
          return Swal.fire(
            'OOPS !',
            'Submission Failed ! Check Entries and try again !',
            'error',
          )
        } else {
          Swal.fire('Success', 'Holiday Deleted Successfully', 'success')
          setHoliday({
            holiday: '',
            hdate: '',
            year: '',
          })
          setRender(!render)
          setEditMode(false)
          setRender(!render)
        }
      } catch (err) {
        Swal.fire('OOPS ! ' + err.message, 'error')
      }
    } else {
      return Swal.fire('OOPS', 'Select Holiday !', 'error')
    }
  }

  return (
    <div className="container-fluid">
      <h3 className="centertext m-3">Set up Holidays</h3>
      <p className="centertext m-3">
        Set up public holidays here. NB: Holidays are to be setup every year.
      </p>
      <CInputGroup className="mt-3">
        <CLabel htmlFor="dailysales" className="col-sm-2">
          Year
        </CLabel>
        <CSelect
          className="form-select col-sm-8 mb-3"
          aria-label="Default"
          value={currentYear}
          onChange={(e) => setCurrentYear(e.currentTarget.value)}
        >
          <option value={new Date().getFullYear() - 4}>
            {new Date().getFullYear() - 4}
          </option>
          <option value={new Date().getFullYear() - 3}>
            {new Date().getFullYear() - 3}
          </option>
          <option value={new Date().getFullYear() - 2}>
            {new Date().getFullYear() - 2}
          </option>
          <option value={new Date().getFullYear() - 1}>
            {new Date().getFullYear() - 1}
          </option>
          <option defaultValue={new Date().getFullYear()}>
            {new Date().getFullYear()}
          </option>
          <option value={new Date().getFullYear() + 1}>
            {new Date().getFullYear() + 1}
          </option>
          <option value={new Date().getFullYear() + 2}>
            {new Date().getFullYear() + 2}
          </option>
          <option value={new Date().getFullYear() + 3}>
            {new Date().getFullYear() + 3}
          </option>
          <option value={new Date().getFullYear() + 4}>
            {new Date().getFullYear() + 4}
          </option>
        </CSelect>
      </CInputGroup>
      <CInputGroup className="mt-3">
        <CLabel htmlFor="holiday" className="col-sm-2">
          Holiday
        </CLabel>
        <CInput
          autoComplete="off"
          name="holiday"
          type="text"
          className="form-control col-sm-8"
          value={holiday.holiday}
          onChange={(e) =>
            setHoliday({
              ...holiday,
              holiday: e.currentTarget.value,
            })
          }
        />
      </CInputGroup>
      <CInputGroup className="mt-3">
        <CLabel htmlFor="dailysales" className="col-sm-2">
          Holiday Date
        </CLabel>
        <CInput
          name="hdate"
          type="date"
          className="form-control col-sm-8"
          value={holiday.hdate}
          onChange={handleDateChange}
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
      <Table className="sm mt-3">
        <thead>
          <tr className="fs-sm">
            <th></th>
            <th>Holiday</th>
            <th>Date</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((c, index) => (
            <tr
              key={c.id}
              Style="cursor: pointer;"
              onClick={() => handleOnEdit(c)}
            >
              <td>{index + 1}</td>
              <td>{c.holiday}</td>
              <td>{moment(c.hdate).format('DD-MMMM-YYYY')}</td>
              <td>{c.year}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default HolidaySetup
