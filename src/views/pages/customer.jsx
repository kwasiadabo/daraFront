import React, { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { apiUrl } from '../../config.json'
import formData from 'form-data'
import auth from '../../components/services/authService'
import noImg from '../../assets/icons/noImg.png'
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
  //CSelect,
  CDropdownMenu,
  //CCardFooter,
  CInputGroup,
  //CForm,
} from '@coreui/react'
const Customer = () => {
  const [image, setImage] = useState(null)
  const [display, setDisplay] = useState(null)
  const [allStaff, setAllStaff] = useState([])
  const [user, setUser] = useState({})

  const [groups, setGroups] = useState([])
  const [customer, setCustomer] = useState({
    fullName: '',
    dob: '',
    phone: '',
    hometown: '',
    placeOfBirth: '',
    occupation: '',
    nationality: '',
    gender: '',
    residentialAddress: '',
    ghanaPostGPS: '',
    residence: '',
    idType: '',
    idNumber: '',
    tinNumber: '',
    marritalStatus: '',
    nameOfSpouse: '',
    phoneOfSpouse: '',
    occupationOfSpouse: '',
    religion: '',
    placeOfWorship: '',
    nameOfChurchLeader: '',
    phoneOfChurchLeader: '',
    //selectedFile: "",
    officer: '',
    group: '',
  })

  useEffect(() => {
    const getIsAdmin = () => {
      setUser(auth.getCurrentUser)
    }

    getIsAdmin()
  }, [])

  useEffect(() => {
    async function getGroups() {
      const results = await axios.get(apiUrl + '/group')
      setGroups(results.data)
    }
    getGroups()
  }, [groups])

  useEffect(() => {
    async function getStaff() {
      const staff = await axios.get(apiUrl + '/staff')
      setAllStaff(staff.data)
    }
    getStaff()
  }, [allStaff])

  const schemaMap = {
    fullName: Joi.string().required().label('FullName'),
    dob: Joi.date().required().label('Date of Birth'),
    phone: Joi.string().required().label('Phone Number'),
    hometown: Joi.string().allow(''),
    placeOfBirth: Joi.string().allow(''),
    nationality: Joi.string().allow(''),
    occupation: Joi.string().required().label('Occupation'),
    gender: Joi.string().required().label('Gender'),
    residentialAddress: Joi.string().required().label('Residential Address'),
    ghanaPostGPS: Joi.string().required().label('GPS'),
    residence: Joi.string().allow(''),

    idType: Joi.string().required().label('ID Type'),
    idNumber: Joi.string().required().label('ID Number'),
    tinNumber: Joi.string().required().label('TIN NUmber'),
    marritalStatus: Joi.string().allow(''),
    nameOfSpouse: Joi.string().allow(''),
    phoneOfSpouse: Joi.string().allow(''),
    occupationOfSpouse: Joi.string().allow(''),
    religion: Joi.string().allow(''),
    placeOfWorship: Joi.string().allow(''),
    nameOfChurchLeader: Joi.string().allow(''),
    phoneOfChurchLeader: Joi.string().allow(''),
    officer: Joi.string().required().label('Officer'),
    group: Joi.string().allow('').label('Group'),
    //createdBy: Joi.string().label("Created By"),
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0])
      setDisplay(URL.createObjectURL(event.target.files[0]))
      //setCustomer({ ...customer, img: event.currentTarget.files[0] });
    }
  }

  const schema = Joi.object(schemaMap)

  const validateForm = () => {
    const result = Joi.validate(customer, schema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // console.log(customer);
    if (image === null) return Swal.fire('OOPS', 'Image is Required', 'error')

    const validate = validateForm()
    if (validate !== null) {
      return Swal.fire('OOPS', validate, 'error')
    }
    try {
      const fd = new formData()
      fd.append('fullName', customer.fullName)
      fd.append('img', image)
      fd.append('dob', customer.dob)
      fd.append('phone', customer.phone)
      fd.append('hometown', customer.hometown)
      fd.append('placeOfBirth', customer.placeOfBirth)
      fd.append('nationality', customer.nationality)
      fd.append('occupation', customer.occupation)
      fd.append('gender', customer.gender)
      fd.append('residentialAddress', customer.residentialAddress)
      fd.append('ghanaPostGPS', customer.ghanaPostGPS)
      fd.append('residence', customer.residence)
      fd.append('idType', customer.idType)
      fd.append('idNumber', customer.idNumber)
      fd.append('tin', customer.tinNumber)
      fd.append('maritalStatus', customer.maritalStatus)
      fd.append('nameOfSpouse', customer.nameOfSpouse)
      fd.append('phoneOfSpouse', customer.phoneOfSpouse)
      fd.append('occupationOfSpouse', customer.occupationOfSpouse)
      fd.append('religion', customer.religion)
      fd.append('placeOfWorship', customer.placeOfWorship)
      fd.append('leaderOfPlaceOfWorship', customer.nameOfChurchLeader)
      fd.append('contactOfPlaceOfWorship', customer.phoneOfChurchLeader)
      fd.append('officer', customer.officer)
      fd.append('group', customer.group)
      fd.append('createdBy', user._id)

      /*for (let [key, value] of fd.entries()) {
        console.log(key, value);
      }*/

      //fd.append("img", image);
      axios
        .post('http://localhost:49155/api/customer', fd, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then((res) => {
          Swal.fire(
            'Success',
            'Customer Details Submitted Successfully',
            'success',
          )
          setCustomer({
            fullName: '',
            dob: '',
            phone: '',
            hometown: '',
            placeOfBirth: '',
            occupation: '',
            nationality: '',
            gender: '',
            residentialAddress: '',
            ghanaPostGPS: '',
            residence: '',
            idType: '',
            idNumber: '',
            tinNumber: '',
            maritalStatus: '',
            nameOfSpouse: '',
            phoneOfSpouse: '',
            occupationOfSpouse: '',
            religion: '',
            placeOfWorship: '',
            nameOfChurchLeader: '',
            phoneOfChurchLeader: '',
            //selectedFile: "",
            officer: '',
            group: '',
          })
          setDisplay(null)
        })
        .catch((err) => {
          Swal.fire(
            'OOPS ! ' + err.message + '  [ Customer Details Not Saved]',
            'error',
          )
        })
    } catch (ex) {
      return Swal.fire('OOPS', ex + '  [ Customer Details Not Saved]', 'error')
    }

    /* const validate = validateForm();
    if (validate !== null) {
      return Swal.fire("OOPS", validate, "error");
    }
*/
  }
  /* axios.post("http://localhost:49155/api/customer", customer, {
      headers: {
        "Content-Type": "multipart/form-data",
      },*/

  return (
    <CRow>
      <CCol>
        <CCard>
          <div>
            <CCol>
              <h1 className="mb-5">Customer Registration</h1>
            </CCol>
          </div>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Customer

/*
  <CInputGroup>
                  <img src={display} className="m-3" alt="preview image" />

                  <CInput
                    type="file"
                    onChange={onImageChange}
                    className="form-control-sm col-sm-4 mt-3"
                    id="group_image"
                    name="img"
                  />
                </CInputGroup>

                <CInputGroup className="mt-3">
                  <CLabel htmlFor="fullName" className="form-label m-3">
                    Full Name *
                  </CLabel>

                  <CInput
                    name="fullName"
                    type="text"
                    className="form-control col-sm-4"
                    id="fullName"
                    value={customer.fullName}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        fullName: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup className="mt-3">
                  <label htmlFor="hometown" className="form-label custlabel">
                    Hometown
                  </label>
                  <input
                    type="text"
                    className="form-control col-sm-4"
                    id="hometown"
                    value={customer.hometown}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        hometown: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup>
                  <label htmlFor="Dob" className="form-label custlabel">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="Dob"
                    placeholder="dd-mm-yyyy"
                    min="1940-01-01"
                    value={customer.dob}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        dob: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup>
                  <label
                    htmlFor="placeofbirth"
                    className="form-label custlabel"
                  >
                    Place of Birth
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="placeofBirth"
                    value={customer.placeOfBirth}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        placeOfBirth: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup>
                  <label htmlFor="occupation" className="form-label custlabel">
                    Occupation *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="occupation"
                    value={customer.occupation}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        occupation: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup>
                  <label htmlFor="phone" className="form-label custlabel">
                    Phone *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Phone"
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        phone: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup>
                  <label htmlFor="nationality" className="form-label custlabel">
                    Nationality
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nationality"
                    value={customer.value}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        nationality: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup>
                  <label htmlFor="gender" className="form-label custlabel">
                    Gender *
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={customer.gender}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        gender: e.currentTarget.value,
                      })
                    }
                  >
                    <option defaultValue="">--Select Gender--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </CInputGroup>
                <CInputGroup>
                  <label htmlFor="resaddress" className="form-label custlabel">
                    Residential Address *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="resaddress"
                    value={customer.residentialAddress}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        residentialAddress: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup>
                  <label htmlFor="gps" className="form-label custlabel">
                    Ghana Post GPS *
                  </label>
                  <input
                    type="text"
                    value={customer.ghanaPostGPS}
                    className="form-control"
                    id="gps"
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        ghanaPostGPS: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup>
                  <label htmlFor="suburb" className="form-label custlabel">
                    Suburb / Land Mark / Directions
                  </label>
                  <input
                    type="text"
                    value={customer.residence}
                    className="form-control"
                    id="suburb"
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        residence: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup>
                  <label htmlFor="idType" className="form-label custlabel">
                    ID Type *
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={customer.idType}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        idType: e.currentTarget.value,
                      })
                    }
                  >
                    <option defaultValue="">--Select ID--</option>
                    <option value="National ID">National ID</option>
                    <option value="Voter ID">Voter ID</option>
                    <option value="Driver's License">Driver's License</option>
                    <option value="Passport">Passport</option>
                  </select>
                </CInputGroup>
                <CInputGroup>
                  <label htmlFor="idNumber" className="form-label custlabel">
                    ID Number *
                  </label>
                  <input
                    type="text"
                    value={customer.idNumber}
                    className="form-control"
                    id="idNumber"
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        idNumber: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup>
                  <label htmlFor="tin" className="form-label custlabel">
                    TIN *
                  </label>
                  <input
                    type="text"
                    value={customer.tinNumber}
                    className="form-control"
                    id="tin"
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        tinNumber: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup>
                  <label htmlFor="married" className="form-label custlabel">
                    Marrital Status
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={customer.maritalStatus}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        maritalStatus: e.currentTarget.value,
                      })
                    }
                  >
                    <option defaultValue="">--Marital Status--</option>
                    <option value="Married">Married</option>
                    <option value="Single">Single</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </CInputGroup>
                <CInputGroup>
                  <label
                    htmlFor="nameofspouse"
                    className="form-label custlabel"
                  >
                    Name of Spouse
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameofspouse"
                    value={customer.nameOfSpouse}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        nameOfSpouse: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup>
                  <label
                    htmlFor="phoneofspouse"
                    className="form-label custlabel"
                  >
                    Phone of Spouse
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneofspouse"
                    value={customer.phoneOfSpouse}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        phoneOfSpouse: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup>
                  <label
                    htmlFor="occupationofspouse"
                    className="form-label custlabel"
                  >
                    Occu. Spouse
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="occupationofspouse"
                    value={customer.occupationOfSpouse}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        occupationOfSpouse: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup>
                  <label htmlFor="religion" className="form-label custlabel">
                    Religion
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={customer.religion}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        religion: e.currentTarget.value,
                      })
                    }
                  >
                    <option defaultValue="">--Religion--</option>
                    <option value="Christian">Christian</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Traditionalist">Traditionalist</option>
                    <option value="Other">Other</option>
                  </select>
                </CInputGroup>
                <CInputGroup>
                  <label
                    htmlFor="placeofworship"
                    className="form-label custlabel"
                  >
                    Place of Worship
                  </label>
                  <input
                    type="text"
                    value={customer.placeholder}
                    className="form-control"
                    id="placeofworship"
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        placeOfWorship: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup>
                  <label
                    htmlFor="worshipleader"
                    className="form-label custlabel"
                  >
                    Leader of Place of Worship
                  </label>
                  <input
                    type="text"
                    value={customer.nameOfChurchLeader}
                    className="form-control"
                    id="worshipleader"
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        nameOfChurchLeader: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup>
                  <label
                    htmlFor="phoneworship"
                    className="form-label custlabel"
                  >
                    Phone, Place of worship
                  </label>
                  <input
                    type="text"
                    value={customer.phoneOfChurchLeader}
                    className="form-control"
                    id="phoneworship"
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        phoneOfChurchLeader: e.currentTarget.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup>
                  <label
                    htmlFor="phoneworship"
                    className="form-label custlabel"
                  >
                    Assigned Officer *
                  </label>
                  <select
                    className="form-select mb-5"
                    aria-label="Default select example"
                    value={customer.officer}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        officer: e.currentTarget.value,
                      })
                    }
                  >
                    <option value="">Officer *</option>
                    {allStaff.map((s) => (
                      <option key={s._id} value={s._id} id={s._id}>
                        {s.nameOfStaff}
                      </option>
                    ))}
                  </select>
                </CInputGroup>
                <CInputGroup>
                  <label
                    htmlFor="phoneworship"
                    className="form-label custlabel"
                  >
                    Group *
                  </label>
                  <select
                    className="form-select mb-5"
                    aria-label="Default select example"
                    value={customer.group}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        group: e.currentTarget.value,
                      })
                    }
                  >
                    <option value="">Group *</option>
                    {groups.map((s) => (
                      <option key={s._id} value={s._id} id={s._id}>
                        {s.group}
                      </option>
                    ))}
                  </select>
                </CInputGroup>
              </CFormGroup>

              <div className="d-flex justify-content-center mt-3 mb-3">
                <button className="button col-md-5 ms-5" type="submit">
                  Submit
                </button>
              </div>

*/
