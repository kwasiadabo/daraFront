import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import Joi from 'joi-browser'
import CurrencyFormat from 'react-currency-format'
import Swal from 'sweetalert2'
import auth from '../../components/services/authService'
import { apiUrl, reportUrl } from '../../config.json'
import '../../../src/schedulecards.css'
import { CButton } from '@coreui/react'

import { CLink } from '@coreui/react'

const ViewCustomerDetails = () => {
  const [summary, setSummary] = useState({})
  const { customer } = useParams()
  const [customerDetails, setCustomerDetails] = useState('')
  const [buffer, setBuffer] = useState('')
  const [render, setRender] = useState(false)

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })
  let navigate = useHistory()
  useEffect(() => {
    async function getCustomer() {
      const results = await axios.get(apiUrl + '/customer/' + customer)
      setCustomerDetails(results.data[0])
      setBuffer(results.data[0].img.data)
      console.log(results.data[0])
      //console.log(customer)
    }
    getCustomer()
  }, [customer])

  const bb = Buffer.from(buffer).toString('base64')
  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=320,height=320'
    window.open(url, 'customerlist', 'popup', windowFeatures)
  }

  return (
    <div className="container">
      <h4 className="mb-3 text-center">Registered Customer Details</h4>

      <div className="row mb-3">
        <img
          src={`data:image/jpeg;base64,${bb}`}
          width="120px"
          className="ms-3 mb-3 float-right"
        />
      </div>

      <div className="row">
        <h5 className="customerheadings col-sm-12">Bio</h5>
        <div className="col-sm-3">
          <span className="">Name </span>: {customerDetails.fullName}
        </div>

        <div className="col-sm-3">
          <span className="">Gender :</span> {customerDetails.gender}
        </div>

        <div className="col-sm-3">
          <span className="">Phone :</span> {customerDetails.phone}
        </div>
        <div className="col-sm-3">
          <span className="">Date of Birth :</span> {customerDetails.dob}
        </div>
      </div>

      <div className="row mt-3">
        <h5 className="customerheadings col-sm-12">Identification</h5>
        <div className="col-sm-4 mt-3">
          <span className="">ID Type :</span> {customerDetails.idType}
        </div>

        <div className="col-sm-4 mt-3">
          <span className="">ID Number :</span> {customerDetails.idNumber}
        </div>
        <div className="col-sm-4 mt-3">
          <span className="">TIN Number :</span> {customerDetails.tin}
        </div>
      </div>

      <div className="row mt-3">
        <h5 className="customerheadings col-sm-12">Places and Location</h5>
        <div className="col-sm-4">
          <span className="">Hometown </span>: {customerDetails.hometown}
        </div>

        <div className="col-sm-4">
          <span className="">Place of Birth:</span>{' '}
          {customerDetails.placeOfBirth}
        </div>

        <div className="col-sm-4">
          <span className="">Residential Address :</span>{' '}
          {customerDetails.residentialAddress}
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-sm-4">
          <span className="">Ghana Post GPS:</span>
          {customerDetails.ghanaPostGPS}
        </div>
        <div className="col-sm-4">
          <span className=""> Nationality :</span> {customerDetails.nationality}
        </div>
        <div className="col-sm-4">
          <span className=""> Occupation. :</span> {customerDetails.occupation}
        </div>
      </div>

      <div className="row  mt-3">
        <h5 className="customerheadings col-sm-12">Physical Directions</h5>
        <div className="col-sm-8">
          <span className=""> Directions to :</span>{' '}
          {customerDetails.directions}
        </div>
      </div>

      <div className="row  mt-3">
        <h5 className="customerheadings col-sm-12">Marital Details</h5>
        <div className="col-sm-4">
          <span className="">Marital Status :</span>{' '}
          {customerDetails.marritalStatus}
        </div>
        <div className="col-sm-4 ">
          <span className="">Name of Spouse :</span>{' '}
          {customerDetails.nameOfSpouse}
        </div>
        <div className="col-sm-4">
          <span className=""> Phone of Spouse :</span>{' '}
          {customerDetails.phoneOfSpouse}
        </div>
        <div className="col-sm-4 mt-3">
          <span className=""> Occupation of Spouse:</span>{' '}
          {customerDetails.occupationOfSpouse}
        </div>
      </div>

      <div className="row  mt-3">
        <h5 className="customerheadings col-sm-12">Religion</h5>
        <div className="col-sm-4">
          <span className="">Religion :</span> {customerDetails.religion}
        </div>
        <div className="col-sm-4 ">
          <span className="">Place of Worship :</span>{' '}
          {customerDetails.placeOfWorship}
        </div>
        <div className="col-sm-4">
          <span className=""> Leader :</span>{' '}
          {customerDetails.leaderOfPlaceOfWorship}
        </div>
        <div className="col-sm-4 mt-3">
          <span className=""> Phone Of Place Of Worship:</span>{' '}
          {customerDetails.phoneOfPlaceOfWorship}
        </div>
      </div>

      <div className="row  mt-3">
        <h5 className="customerheadings col-sm-12">Officer Assigned</h5>

        <div className="col-sm-4">
          <span className=""> Group:</span> {customerDetails.association}
        </div>

        <div className="col-sm-4">
          <span className="">Officer:</span> {customerDetails.assignedOfficer}
        </div>
      </div>
      <div className="col-sm-12 mt-3 float-right">
        <CButton
          className="float-right mb-3 mr-3"
          color="success"
          onClick={() => window.print()}
        >
          Print
        </CButton>
        <CButton
          className="float-right mb-3 mr-3"
          color="danger"
          onClick={() => navigate.push('/customer/customerlist')}
        >
          Close
        </CButton>
        <CLink
          className="btn-block col-sm-4 float-left btn-sm mb-3"
          onClick={() =>
            openCustomerListAsReport(
              reportUrl + '/IndividualDetails.aspx?' + customer,
            )
          }
        >
          View as Report
        </CLink>
      </div>
    </div>
  )
}

export default ViewCustomerDetails
