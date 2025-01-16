import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useHistory, Navigate, useParams } from 'react-router-dom'
import { Buffer } from 'buffer'
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'

//import '../../table.css'
import baseUrl from '../../config.json'
import auth from '../../components/services/authService'
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

const CustomerView = (props) => {
  const [customerDetails, setCustomerDetails] = useState('')
  const [buffer, setBuffer] = useState('')
  const [render, setRender] = useState(false)
  const customer = useParams()

  const user = auth.getCurrentUser()

  useEffect(() => {
    async function getCustomer() {
      const results = await axios.get(
        baseUrl.apiUrl + '/customer/' + customer.customer,
      )

      setCustomerDetails(results.data)
      setBuffer(results.data.img.data)
      // console.log(results.data);
    }
    getCustomer()
  }, [render])

  const handleApprove = async (e) => {
    e.preventDefault()
    try {
      const results = await axios.put(
        baseUrl.apiUrl + '/customer/approve/' + customerDetails._id,
        {
          isAuthorised: 'true',
          dateAuthorised: new Date(),
          authorisedBy: user._id,
          status: 'Authorised',
        },
      )
      if (results.status !== 200) {
        return Swal.fire(
          'Failed',
          'Customer Details  Authorisation failed !',
          'error',
        )
      } else {
        Swal.fire(
          'Success',
          'Customer Details  Authorised Successfully',
          'success',
        )
        setRender(!render)
      }
    } catch (err) {
      return Swal.fire('Error', err, 'error')
    }
  }
  const navigate = useHistory()

  const EditCustomer = (s) => {
    navigate('/customer/edit/' + customerDetails._id)
  }

  //<img src={`data:image/jpeg;base64,${customerDetails.img}`} />;
  const bb = Buffer.from(buffer).toString('base64')
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-10 mt-3 ">
          <div className="row justify-content-center">
            <p className="centertext m-3">
              Dara Capital Customer Registration Details
            </p>
            <h1 className="centertext m-3">Customer Details View</h1>

            <div className="col-md-11">
              <legend className="legend">*Customer Details*</legend>
              <form className="row g-3 shadow">
                <div className="col-md-2">
                  <img
                    src={`data:image/jpeg;base64,${bb}`}
                    width="120px"
                    className="ms-3"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label label custlabel">FullName</label>
                  <label className="form-control">
                    {customerDetails.fullName}
                  </label>

                  <label for="inputEmail4" className="form-label custlabel">
                    Gender
                  </label>
                  <label className="form-control">
                    {customerDetails.gender}
                  </label>
                </div>
                <div class="col-md-3">
                  <label
                    for="inputPassword4"
                    className="form-label label custlabel"
                  >
                    Date of Birth
                  </label>
                  <label className="form-control">
                    {moment(customerDetails.dob).format('DD-MMM-YYYY')}
                  </label>
                  <label
                    for="inputEmail4"
                    className="form-label label custlabel"
                  >
                    ID Type
                  </label>
                  <label className="form-control">
                    {customerDetails.idType}
                  </label>
                </div>
                <div class="col-md-3">
                  <label
                    for="inputAddress"
                    className="form-label label custlabel"
                  >
                    ID Number
                  </label>
                  <label className="form-control">
                    {customerDetails.idNumber}
                  </label>
                  <label
                    for="inputEmail4"
                    clasName="form-label label custlabel"
                  >
                    TIN
                  </label>
                  <label className="form-control">{customerDetails.tin}</label>
                </div>

                <div className="col-md-3">
                  <label
                    for="inputEmail4"
                    className="form-label label custlabel"
                  >
                    Occupation
                  </label>
                  <label className="form-control">
                    {customerDetails.occupation}
                  </label>
                </div>
                <div className="col-md-3">
                  <label
                    for="inputEmail4"
                    className="form-label label custlabel"
                  >
                    Res. Address
                  </label>
                  <label className="form-control">
                    {customerDetails.residentialAddress}
                  </label>
                </div>
                <div className="col-md-3">
                  <label
                    for="inputEmail4"
                    className="form-label label custlabel"
                  >
                    Ghana Post GPS
                  </label>
                  <label className="form-control">
                    {customerDetails.ghanaPostGPS}
                  </label>
                </div>
                <div className="col-md-3">
                  <label
                    for="inputEmail4"
                    className="form-label label custlabel"
                  >
                    Phone Number
                  </label>
                  <label className="form-control">
                    {customerDetails.phone}
                  </label>
                </div>
                <div className="col-md-3">
                  <label
                    for="inputEmail4"
                    className="form-label label custlabel"
                  >
                    Nationality
                  </label>
                  <label className="form-control">
                    {customerDetails.nationality}
                  </label>
                </div>
                <div className="col-md-3">
                  <label
                    for="inputEmail4"
                    className="form-label label custlabel"
                  >
                    Place of Birth
                  </label>
                  <label className="form-control">
                    {customerDetails.placeOfBirth}
                  </label>
                </div>
                <div className="col-md-3">
                  <label
                    for="inputEmail4"
                    className="form-label label custlabel"
                  >
                    Residence
                  </label>
                  <label className="form-control">
                    {customerDetails.residence}
                  </label>
                </div>
                <div className="col-md-3">
                  <label
                    for="inputEmail4"
                    className="form-label label custlabel"
                  >
                    Marital Status
                  </label>
                  <label className="form-control">
                    {customerDetails.maritalStatus}
                  </label>
                </div>
                <div className="col-md-3">
                  <label
                    for="inputEmail4"
                    className="form-label label custlabel"
                  >
                    Name of Spouse
                  </label>
                  <label className="form-control">
                    {customerDetails.nameOfSpouse}
                  </label>
                </div>
                <div className="col-md-3">
                  <label
                    for="inputEmail4"
                    className="form-label label custlabel"
                  >
                    Phone of Spouse
                  </label>
                  <label className="form-control">
                    {customerDetails.phoneOfSpouse}
                  </label>
                </div>
                <div className="col-md-3">
                  <label
                    for="inputEmail4"
                    className="form-label label custlabel"
                  >
                    Occupation of Spouse
                  </label>
                  <label className="form-control">
                    {customerDetails.occupationOfSpouse}
                  </label>
                </div>
                <div className="col-md-3">
                  <label
                    for="inputEmail4"
                    className="form-label label custlabel"
                  >
                    Religion
                  </label>
                  <label className="form-control">
                    {customerDetails.religion}
                  </label>
                </div>
                <div className="col-md-3">
                  <label
                    for="inputEmail4"
                    className="form-label label custlabel"
                  >
                    Place of Worship
                  </label>
                  <label className="form-control">
                    {customerDetails.placeOfWorship}
                  </label>
                </div>
                <div className="col-md-3">
                  <label
                    for="inputEmail4"
                    className="form-label label custlabel"
                  >
                    Name of Pastor /Imam/Priest
                  </label>
                  <label className="form-control">
                    {customerDetails.leaderOfPlaceOfWorship}
                  </label>
                </div>
                <div className="col-md-3">
                  <label
                    for="inputEmail4"
                    className="form-label label custlabel"
                  >
                    Contact of Pastor/Imam/Priest
                  </label>
                  <label className="form-control">
                    {customerDetails.contactOfPlaceOfWorship}
                  </label>
                </div>

                <div className="col-md-3">
                  <label for="inputEmail4" class="form-label label custlabel">
                    Date Entry Made
                  </label>
                  <label className="form-control">
                    {moment(customerDetails.dateCreated).format('DD-MMM-YYYY')}
                  </label>
                </div>
                <div className="col-md-3">
                  <label for="inputEmail4" class="form-label label custlabel">
                    Authorisation Status
                  </label>
                  <label className="form-control">
                    {customerDetails.status}
                  </label>
                </div>
                <div className="row justify-content-center">
                  <button
                    type="submit"
                    className="button col-md-2 m-5"
                    onClick={() => window.print()}
                  >
                    Print
                  </button>
                  <button
                    className="button col-md-2 m-5"
                    onClick={EditCustomer}
                  >
                    Edit
                  </button>
                  {user.userRole === 'Admin' && (
                    <button
                      className="button col-md-2 m-5"
                      onClick={handleApprove}
                    >
                      Approve
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  //return <>{customerDetails.fullName}</>;
}

export default CustomerView
