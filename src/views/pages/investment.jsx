import React, { useState, useEffect } from 'react'
import {
  Link,
  useNavigate,
  Navigate,
  useParams,
  useHistory,
} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { Modal } from 'react-bootstrap'
import auth from '../../components/services/authService'
import Joi from 'joi-browser'
import Swal from 'sweetalert2'
import { apiUrl } from '../../config.json'

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
  Badge,
  //Modal,
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
  CDropdownDivider,
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
  LineChart,
  BarChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
  Label,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { GiSatelliteCommunication } from 'react-icons/gi'

const Investment = () => {
  const [user, setUser] = useState(auth.getCurrentUser)
  const [investments, setInvestments] = useState([])
  const [show, setShow] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [render, setRender] = useState(false)

  const [search, setSearch] = useState('')
  const [customers, setCustomers] = useState([])
  const [investmentItems, setInvestmentItems] = useState([])
  const [investmentsData, setInvestmentsData] = useState({
    customer: '',
    principal: '',
    interest: '',
    startDate: '',
    duration: '',
    madeBy: user.staff,
  })

  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))

  let navigate = useHistory()

  // useEffect(() => {
  //   async function getInvestments() {
  //     const results = await axios.get(
  //       apiUrl + '/transaction/investments/' + startDate + '/' + endDate,
  //     )
  //     setInvestments(results.data)
  //   }
  //   getInvestments()
  // }, [startDate, endDate, render])

  useEffect(() => {
    async function getInvestmentItems() {
      const results = await axios.get(apiUrl + '/investment/item')
      setInvestmentItems(results.data)
      //console.log(results.data)
    }
    getInvestmentItems()
    console.log(investmentItems)
  }, [])

  useEffect(() => {
    async function getCustomers() {
      const results = await axios.get(apiUrl + '/customer')
      setCustomers(results.data)
    }
    getCustomers()
  }, [customers])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  /*let customersList = customers.find(
      (o) => o.fullName.toLowerCase() === search.toLowerCase()
    );*/

  //console.log(customersList);
  // const allCustomers = paginate(customers, currentPage, pageSize)

  const data = {
    allInvestments: investments.filter(
      (item) =>
        item.fullName.toLowerCase().includes(search.toLowerCase()) ||
        item.madeBy.toLowerCase().includes(search.toLowerCase()),
    ),
  }

  const dataTouse = search.length === 0 ? investments : data.allInvestments

  const schemaMap = {
    customer: Joi.string().required().label('Customer'),
    frequency: Joi.string().required().label('Frequency'),
    principal: Joi.number().required().label('Principal'),
    rate: Joi.number().required().label('Rate'),
    interest: Joi.number().required().label('Interest'),
    startDate: Joi.date().required().label('Start Date'),
    duration: Joi.number().required().label('Duration'),
    endDate: Joi.number().required().label('End Date'),
    madeBy: Joi.number().required().label('Made by'),
  }

  const schema = Joi.object(schemaMap)

  const validateForm = () => {
    const result = Joi.validate(investmentsData, schema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  const handleSubmit = async () => {
    console.log(investmentsData)
    const validate = validateForm()
    if (validate !== null) {
      return Swal.fire('OOPS', validate, 'error')
    }

    const results = await axios.post(
      apiUrl + '/transaction/investments',
      investmentsData,
    )
    if (results.status === 200) {
      Swal.fire('Success', 'Investment made Successfully', 'success')
      setInvestmentsData({
        customer: '',
        frequency: '',
        principal: '',
        rate: '',
        interest: '',
        startDate: '',
        duration: '',
        endDate: '',
        madeBy: user.staff,
      })
      setRender(!render)
    }
  }

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  const handleAmountChanged = (e) => {
    setInvestmentsData({
      ...investmentsData,
      amount: e.currentTarget.value,
    })
  }

  const handleClose = () => {
    setInvestmentsData({
      customer: '',
      frequency: '',
      principal: '',
      rate: '',
      interest: '',
      startDate: '',
      duration: '',
      endDate: '',
      madeBy: user.staff,
    })
    setShow(false)
    setShowTransfer(false)
  }

  const handleStartDateChange = (e) => {
    setStartDate(e.currentTarget.value)
  }
  const handleEndDateChange = (e) => {
    setEndDate(e.currentTarget.value)
  }

  const handleDelete = async (c) => {
    Swal.fire({
      title: 'Do you want to Delete this Investment?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await axios.delete(apiUrl + '/transaction/investments/' + c.id)
        Swal.fire('Deleted!', '', 'success')
        setRender(!render)
      } else if (result.isDenied) {
        Swal.fire('Cancelled', '', 'info')
      }
    })
  }

  const totalAmt = investments.reduce((a, i) => {
    return a + i.principal
  }, 0)
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 mt-2">
          <div className="row justify-content-center">
            <h4 className="centertext mb-3">Investments Entry</h4>
          </div>

          <p className="text-center">
            NB: An investment is the cost of operations that a company incurs to
            generate revenue. As the popular saying goes, “it costs money to
            make money.”
          </p>
        </div>

        <div className="col-sm-12">
          <CButton
            onClick={() => setShow(!show)}
            className="btn-sm float-right m-3 "
            color="success"
          >
            + Make New Investment
          </CButton>

          <div class="mb-3 row mt-5 col-sm-12">
            <CLabel htmlFor="dateOnCheque" className="form-label">
              Start Date
            </CLabel>
            <div className="col-sm-3">
              <CInput
                type="date"
                class="form-control"
                id="dateOnCheque"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            <CLabel htmlFor="dateOnCheque" className="form-label">
              End Date
            </CLabel>
            <div className="col-sm-3">
              <CInput
                type="date"
                class="form-control"
                id="dateOnCheque"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
            <div className="col-sm-3 text-right">
              Total Investments: <strong>{formatter.format(totalAmt)}</strong>
            </div>
          </div>

          <Table className="table-sm col-sm-12">
            <thead className="">
              <tr className="fs-sm">
                <th></th>
                <th>Date</th>
                <th>Item</th>
                <th>Mode Of Payment</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Made By.</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataTouse.map((c, index) => (
                <tr key={c.id}>
                  <td>{index + 1}</td>
                  <td>{c.tdate}</td>
                  <td>{c.item}</td>
                  <td>{c.modeOfPayment}</td>
                  <td>{c.narration}</td>
                  <td>{formatter.format(c.amount)}</td>
                  <td>{c.madeBy}</td>
                  <td>
                    {!c.approved && (
                      <CButton
                        onClick={() => handleDelete(c)}
                        className="btn-sm float-right"
                        color="danger"
                      >
                        Remove
                      </CButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <CModal
        className="fade col-sm-8"
        size="md"
        show={show}
        color="success"
        data-backdrop="static"
        data-keyboard="false"
        onClose={() => {
          setShow(!show)
        }}
      >
        <CModalHeader className="modal-header" closeButton>
          <p>
            <h3 className="centertext">INVESTMENT BOOKING</h3>
          </p>
        </CModalHeader>
        <CModalBody className="modal-body">
          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <CLabel htmlFor="customer" className="form-label">
                  Customer
                </CLabel>
                <CSelect
                  className="form-select col-sm-12 mb-3"
                  aria-label="Default"
                  value={investmentsData.customer}
                  onChange={(e) =>
                    setInvestmentsData({
                      ...investmentsData,
                      customer: e.currentTarget.value,
                    })
                  }
                >
                  {/* <option defaultValue="">--Select Customer *--</option> */}
                  {customers.map((c) => (
                    <option key={c.id} value={c.id} id={c.id}>
                      {c.accountNumber + ' - ' + c.fullName}
                    </option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <CLabel htmlFor="customer" className="form-label">
                  Investment Item
                </CLabel>
                <CSelect
                  className="form-select col-sm-12 mb-3"
                  aria-label="Default"
                  value={investmentsData.item}
                  onChange={(e) =>
                    setInvestmentsData({
                      ...investmentsData,
                      item: e.currentTarget.value,
                    })
                  }
                >
                  {/* <option defaultValue="">--Select Investment Item*--</option> */}
                  {investmentItems.map((b) => (
                    <option key={b.id} value={b.id} id={b.id}>
                      {b.item}
                    </option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <CLabel htmlFor="duration" className="form-label">
                  Duration (Days)
                </CLabel>

                <CInput
                  type="text"
                  className="form-control  bold mb-3 col-sm-12"
                  id="duration"
                  placeholder="eg. 180 days"
                  value={investmentsData.duration}
                  onChange={(e) =>
                    setInvestmentsData({
                      ...investmentsData,
                      duration: e.currentTarget.value,
                    })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <label htmlFor="principal" className="form-label">
                  Principal (GHC)
                </label>
                <CInput
                  type="text"
                  name="principal"
                  className="form-control text-right col-sm-12 mb-3"
                  id="balance"
                  value={investmentsData.amount}
                  onChange={(e) =>
                    setInvestmentsData({
                      ...investmentsData,
                      amount: e.currentTarget.value,
                    })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <CLabel htmlFor="interest" className="form-label">
                  Interest Per Annum (%)
                </CLabel>

                <CInput
                  type="text"
                  className="form-control  bold mb-3 col-sm-12"
                  id="interest"
                  value={investmentsData.interest}
                  onChange={(e) =>
                    setInvestmentsData({
                      ...investmentsData,
                      interest: e.currentTarget.value,
                    })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <label htmlFor="startDate" className="form-label">
                  Start Date *
                </label>
                <CInput
                  autoComplete="off"
                  type="date"
                  name="startDate"
                  className="form-control col-sm-12 mb-3"
                  id="startDate"
                  value={investmentsData.narration}
                  onChange={(e) =>
                    setInvestmentsData({
                      ...investmentsData,
                      narration: e.currentTarget.value,
                    })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={handleSubmit} className="btn-sm" color="success">
            Submit
          </CButton>
          <Button onClick={handleClose} className="btn-sm" color="danger">
            Close
          </Button>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Investment
