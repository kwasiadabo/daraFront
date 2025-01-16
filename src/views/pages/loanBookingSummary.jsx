import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import Joi from 'joi-browser'
import CurrencyFormat from 'react-currency-format'
import Swal from 'sweetalert2'
import auth from '../../components/services/authService'
import { apiUrl } from '../../config.json'
import { reportUrl } from '../../config.json'
import '../../../src/schedulecards.css'
import { CButton, CInput, CLabel } from '@coreui/react'

const Summary = () => {
  const [summary, setSummary] = useState({})
  const { customer, disbursementId } = useParams()
  const [customerDetails, setCustomerDetails] = useState('')
  const [buffer, setBuffer] = useState('')
  const [render, setRender] = useState(false)
  const [checkEntry, setCheckEntry] = useState([])
  const navigate = useHistory()
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  useEffect(() => {
    async function getSummary() {
      const results = await axios.get(
        apiUrl + '/loan/booking/summary/' + customer + '/' + disbursementId,
      )
      setSummary(results.data[0])
      if (results.data[0].img == null) return
      setBuffer(results.data[0].img.data)
    }
    getSummary()
  }, [render])

  /* useEffect(() => {
    async function getCustomer() {
      const results = await axios.get(apiUrl + '/customer/' + customer)

      setCustomerDetails(results.data)
      setBuffer(results.data.img.data)
      // console.log(results.data);
    }
    getCustomer()
  }, [])
  */

  useEffect(() => {
    async function checkSummaryEntry() {
      const results = await axios.get(
        apiUrl + '/loan/booking/check/' + customer + '/' + disbursementId,
      )
      setCheckEntry(results.data)
    }
    checkSummaryEntry()
    //console.log(checkEntry)
  }, [render])

  const bb = Buffer.from(buffer).toString('base64')

  const schemaMap = {
    disbursementId: Joi.number().required().label('Disbursement ID'),
    customer: Joi.number().required().label('Customer'),
    interestRate: Joi.number().required().label('Interest Rate'),
    dateOfBooking: Joi.date().required().label('Date of Booking'),
  }
  const schema = Joi.object(schemaMap)

  const validateForm = () => {
    const result = Joi.validate(
      {
        customer: customer,
        disbursementId: disbursementId,
        interestRate: summary.interestRate,
        dateOfBooking: summary.dateOfBooking,
      },
      schema,
    )
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  const handleSubmit = async () => {
    const validate = validateForm()
    if (validate !== null) {
      return Swal.fire('Validation', validate, 'error')
    }

    Swal.fire({
      title: 'Do you want to Complete Booking?',
      html:
        'Make sure all details have been checked before completing. You will not be allowed to make changes after completing booking.',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const results = await axios.put(apiUrl + '/loan/booking/complete', {
            customer: customer,
            disbursementId: disbursementId,
            period: summary.duration,
            interestRate: summary.interestRate,
            dateOfBooking: summary.dateOfBooking,
          })
          if (results.status !== 200) {
            return Swal.fire(
              'OOPs !',
              'Submission Failed ! Check Entries and try again !',
              'error',
            )
          } else {
            Swal.fire(
              'Good job!',
              'Loan Booking Completed Successfully',
              'success',
            )

            navigate.push('/paymentschedule/' + disbursementId + '/' + customer)
            openCustomerListAsReport(
              reportUrl +
                '/paymentSchedule.aspx?' +
                disbursementId +
                '?' +
                customer,
            )
          }
        } catch (err) {
          Swal.fire('OOPS ! ', 'Loan Booking NOT Completed', 'error')
        }
      } else if (result.isDenied) {
        Swal.fire('Cancelled', '', 'info')
      }
    })
  }

  const openCustomerListAsReport = (url) => {
    const windowFeatures = 'left=100,top=100,width=320,height=320'
    window.open(url, 'Payment Schedule', 'popup', windowFeatures)
  }
  // const showPaymentSchedule = (s) => {}
  return (
    <div className="container-fluid">
      <h4 className="mb-3 text-center">Loan Application Summary</h4>
      <p className="centerparagraph">
        An individual who promises to pay a borrower's debt in the event that
        the borrower defaults on their loan obligation. Guarantors pledge their
        own assets as collateral against the loans.
      </p>
      <div className="row mb-3">
        <div className="col-sm-10">
          {' '}
          <strong>Customer : {summary.fullName}</strong>
        </div>

        <div className="col-sm-10">Gender : {summary.gender}</div>
        <div className="col-sm-10">Phone : {summary.phone}</div>
        <div className="col-sm-9">Field Officer : {summary.nameOfStaff}</div>
        <div className="col-sm-9">Branch: {summary.branch}</div>
        <div className="col-sm-3 float-right">
          <img
            src={`data:image/jpeg;base64,${bb}`}
            width="120px"
            className="ms-3"
          />
        </div>
      </div>

      <div className="row col-sm-12">
        <strong>
          {' '}
          Amount Requested : {formatter.format(summary.principal)}
        </strong>
      </div>

      <div className="row mt-3">
        <h5 className="summaryheadings col-sm-12">Product Details</h5>
        <div className="col-sm-4">
          <span className="">Loan Product </span>: {summary.product}
        </div>

        <div className="col-sm-4">
          <span className="">Processing Fee ({summary.processingFee}%) :</span>{' '}
          GHC {(summary.processingFee / 100) * summary.principal}
        </div>

        <div className="col-sm-4">
          <span className="">Interest Rate ({summary.interestRate}%) :</span>{' '}
          GHC {(summary.interestRate / 100) * summary.principal}
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-sm-4">
          <span className="">Reg. Fee :</span>
          {formatter.format(summary.registrationFee)}
        </div>
        <div className="col-sm-4">
          <span className=""> Duration :</span> {summary.duration}{' '}
          {summary.frequency === 'Daily'
            ? 'Days'
            : summary.frequency === 'Weekly'
            ? 'Weeks'
            : 'Months'}
        </div>
        <div className="col-sm-4">
          <span className=""> Payment Freq. :</span> {summary.frequency}
        </div>
      </div>

      <div className="row  mt-3">
        <h5 className="summaryheadings col-sm-12">Collateral and Purpose</h5>
        <div className="col-sm-4">
          <span className=""> Cash Colateral:</span>{' '}
          {formatter.format(summary.cashCollateral)}
        </div>

        <div className="col-sm-4">
          <span className=""> Purpose for Loan: </span>
          {summary.purpose}
        </div>
      </div>

      <div className="row  mt-3">
        <h5 className="summaryheadings col-sm-12">First Guarantor Details</h5>
        <div className="col-sm-4">
          <span className="">Name :</span> {summary.firstGuarantor}
        </div>
        <div className="col-sm-4 ">
          <span className="">Phone :</span> {summary.firstGuarantorPhone}
        </div>
        <div className="col-sm-4">
          <span className=""> GPS :</span> {summary.firstGuarantorGPS}
        </div>
        <div className="col-sm-4 mt-3">
          <span className=""> Relationship:</span>{' '}
          {summary.firstGuarantorRelationship}
        </div>
        <div className="col-sm-4 mt-3">
          <span className="">Household Person:</span>{' '}
          {summary.firstGuarantorHouseHoldPerson}
        </div>

        <div className="col-sm-4 mt-3">
          <span className="">Person's Phone:</span>{' '}
          {summary.firstGuarantorHouseHoldPhone}
        </div>
        <div className="col-sm-4 mt-3">
          <span className="">ID Type :</span> {summary.firstGuarantorIdType}
        </div>

        <div className="col-sm-4 mt-3">
          <span className="">ID Number :</span> {summary.firstGuarantorIdNumber}
        </div>
        <div className="col-sm-4 mt-3">
          <span className="">Business :</span> {summary.firstGuarantorBusiness}
        </div>
      </div>

      <div className="row  mt-3">
        <h5 className="summaryheadings col-sm-12">Second Guarantor</h5>
        <div className="col-sm-4">
          <span className="">Name :</span> {summary.secondGuarantor}
        </div>
        <div className="col-sm-4 ">
          <span className="">Phone :</span> {summary.secondGuarantorPhone}
        </div>
        <div className="col-sm-4">
          <span className=""> GPS :</span> {summary.secondGuarantorGPS}
        </div>
        <div className="col-sm-4 mt-3">
          <span className=""> Relationship:</span>{' '}
          {summary.secondGuarantorRelationship}
        </div>
        <div className="col-sm-4 mt-3">
          <span className="">Household Person:</span>{' '}
          {summary.secondGuarantorHouseHoldPerson}
        </div>

        <div className="col-sm-4 mt-3">
          <span className="">Person's Phone:</span>{' '}
          {summary.secondGuarantorHouseHoldPhone}
        </div>
        <div className="col-sm-4 mt-3">
          <span className="">ID Type :</span> {summary.secondGuarantorIdType}
        </div>

        <div className="col-sm-4 mt-3">
          <span className="">ID Number :</span>{' '}
          {summary.secondGuarantorIdNumber}
        </div>
        <div className="col-sm-4 mt-3">
          <span className="">Business :</span> {summary.secondGuarantorBusiness}
        </div>
        <h5 className="summaryheadings col-sm-12 mt-2">
          Booking Date Confirmation
        </h5>
        <div className="col-sm-12">
          <CLabel htmlFor="dateOfBooking" className="col-sm-4 col-form-label">
            Confirm Date of Booking
          </CLabel>{' '}
          <CInput
            type="date"
            className="form-control col-sm-12"
            id="dateOfBooking"
            value={summary.dateOfBooking}
            onChange={(e) =>
              setSummary({ ...summary, dateOfBooking: e.currentTarget.value })
            }
          />
        </div>
      </div>

      {/*<div className="row  mt-3">
        <h5 className="summaryheadings col-sm-12">Business Details</h5>

        <div className="col-sm-4">
          <span className="">Name:</span> {summary.businessName}
        </div>

        <div className="col-sm-4">
          <span className=""> Years In Business:</span>{' '}
          {summary.yearsInBusiness}
        </div>

        <div className="col-sm-4">
          <span className=""> Address:</span> {summary.addressOfBusiness}
        </div>

        <div className="col-sm-4 mt-3">
          <span className=""> Phone Number:</span> {summary.phoneOfBusiness}
        </div>

        <div className="col-sm-4 mt-3">
          <span className="">Estimated Daily Sales:</span> {summary.dailySales}
        </div>

        <div className="col-sm-4 mt-3">
          <span className=""> Bank:</span> {summary.banks}
        </div>

        <div className="col-sm-4 mt-3">
          <span className=""> Bank Location:</span> {summary.bankLocation}
        </div>

        <div className="col-sm-4 mt-3">
          <span className=""> Business Partner:</span> {summary.businessPartner}
        </div>

        <div className="col-sm-4 mt-3">
          <span className=""> Estimated Assets:</span>{' '}
          {summary.estimatedAssetValue}
        </div>

        <div className="col-sm-4 mt-3">
          <span className=""> Type of Structure:</span>{' '}
          {summary.typeOfStructure}
        </div>
      </div>
        <div className="row mt-3">
          <h5 className="summaryheadings col-sm-12">Directions</h5>
          <div className="col-sm-6">
            <span className="">
              {' '}
              <strong>Directions To Residence : </strong>
            </span>
            {summary.directionToResidence}
          </div>

          <div className="col-sm-6">
            <span className="">
              {' '}
              <strong>Directions To Business :</strong>
            </span>{' '}
            {summary.directionToBusiness}
          </div>
        </div>*/}
      <div className="col-sm-12 mt-3 float-right">
        <CButton
          className="float-right mb-3 mr-3"
          color="success"
          onClick={() =>
            openCustomerListAsReport(
              reportUrl +
                '/paymentSchedule.aspx?' +
                disbursementId +
                '?' +
                customer,
            )
          }
        >
          Print Summary
        </CButton>
        {!summary.isActive && (
          <CButton
            className="float-right mb-3 mr-3"
            color="info"
            onClick={handleSubmit}
          >
            Complete Booking
          </CButton>
        )}
      </div>
    </div>
  )
}

export default Summary
