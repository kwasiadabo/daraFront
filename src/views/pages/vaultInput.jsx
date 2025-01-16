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

const VaultInput = () => {
  const [user, setUser] = useState(auth.getCurrentUser)

  const [show, setShow] = useState(false)
  const [vaultShow, setVaultShow] = useState(false)

  const [render, setRender] = useState(false)
  const [search, setSearch] = useState('')
  const [bankAccounts, setBankAccounts] = useState([])
  const [banks, setBanks] = useState([])
  const [balances, setBalances] = useState([])
  const [vaultBal, setVaultBal] = useState(0)

  const [vaultData, setVaultData] = useState({
    Cr: '',
    narration: '',
    tdate: new Date().toISOString().slice(0, 10),
  })

  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))
  let navigate = useHistory()

  useEffect(() => {
    async function getVault() {
      const results = await axios.get(apiUrl + '/vault')
      setBalances(results.data)
    }
    getVault()
  }, [render])

  useEffect(() => {
    async function getBanks() {
      const results = await axios.get(apiUrl + '/setup/bank')
      setBanks(results.data)
    }
    getBanks()
  }, [])

  const getBankAccounts = async (bank) => {
    const results = await axios.get(apiUrl + '/setup/bankaccount/' + bank)
    setBankAccounts(results.data)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const schemaMap = {
    Cr: Joi.number().required().label('Amount'),
    narration: Joi.string().required().label('Narration'),
    tdate: Joi.date().required().label('Transaction Date'),
    //userId: Joi.string().allow('').label('Entry by'),
  }

  const schema = Joi.object(schemaMap)

  const validateForm = () => {
    const result = Joi.validate(vaultData, schema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  const handleVaultSubmit = async () => {
    console.log(vaultData)
    const validate = validateForm()
    if (validate !== null) {
      return Swal.fire('OOPS', validate, 'error')
    }
    const results = await axios.post(apiUrl + '/vault', vaultData)
    if (results.status === 200) {
      Swal.fire('Success', 'Amount Saved Successfully', 'success')
      setVaultData({
        Cr: '',
        narration: '',
        tdate: new Date().toISOString().slice(0, 10),
      })
      setRender(!render)
    } else {
      Swal.fire('OOPS', 'Transaction Failed', 'error')
    }
    setVaultShow(!vaultShow)
  }

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  const handleVaultClose = () => {
    setVaultData({
      Cr: '',
      narration: '',
      tdate: new Date().toISOString().slice(0, 10),
    })
    setVaultShow(false)
  }

  const handleStartDateChange = (e) => {
    setStartDate(e.currentTarget.value)
  }

  const handleEndDateChange = (e) => {
    setEndDate(e.currentTarget.value)
  }

  const handleRemoveFromVault = async (e) => {
    Swal.fire({
      title: 'Do you want to delete this Vault Entry?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await axios.delete(apiUrl + '/vault/remove/' + e.id)
        Swal.fire('Success', 'Vault Entry Removed Successfully', 'success')
        setRender(!render)
      } else if (result.isDenied) {
        Swal.fire('OOPS', 'Failed', 'error')
      }
    })
  }

  const totalAmt = balances.reduce((a, i) => {
    return a + i.amount
  }, 0)
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="row justify-content-center">
            <h4 className="centertext mb-3">Add To Vault</h4>
          </div>

          <p className="text-center">
            NB: Enter Amount From Other Sources to vault
          </p>
        </div>

        <div className="col-sm-12">
          <CButton
            onClick={() => setVaultShow(!vaultShow)}
            className="btn-sm float-right m-3 col-sm-3"
            color="info"
          >
            + Vault
          </CButton>
          <Table className="table-sm col-sm-12">
            <thead className="">
              <tr className="fs-sm">
                <th></th>
                <th>Date</th>
                <th>Narration</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {balances.map((c, index) => (
                <tr key={c.id}>
                  <td>{index + 1}</td>
                  <td>{c.tDate}</td>
                  <td>{c.narration}</td>
                  <td>{formatter.format(c.Amount)}</td>
                  <td>
                    {!c.approved && (
                      <CButton
                        onClick={() => handleRemoveFromVault(c)}
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

      <Modal
        className="fade col-sm-10"
        size="md"
        show={vaultShow}
        data-backdrop="static"
        data-keyboard="false"
      >
        <Modal.Header className="modal-header">
          <p>
            <h3>AMOUNTS FROM OTHER SOURCES</h3>
          </p>
        </Modal.Header>

        <Modal.Body className="modal-body">
          <form>
            <label htmlFor="tdate" className="form-label">
              Date{' '}
            </label>
            <CInput
              type="date"
              name="tdate"
              className="form-control text-center col-sm-12 mb-3"
              id="tdate"
              value={vaultData.tdate}
              onChange={(e) =>
                setVaultData({
                  ...vaultData,
                  tdate: e.currentTarget.value,
                })
              }
            />

            <label htmlFor="Amount" className="form-label">
              Amount (GHC)
            </label>
            <CInput
              type="text"
              name="Amount"
              className="form-control text-right col-sm-12 mb-3"
              id="Amount"
              value={vaultData.Cr}
              onChange={(e) =>
                setVaultData({
                  ...vaultData,
                  Cr: e.currentTarget.value,
                })
              }
            />

            <label htmlFor="narration" className="form-label">
              Narration *
            </label>
            <CInput
              autoComplete="off"
              type="text"
              name="narration"
              className="form-control col-sm-12 mb-3"
              id="narration"
              value={vaultData.narration}
              onChange={(e) =>
                setVaultData({
                  ...vaultData,
                  narration: e.currentTarget.value,
                })
              }
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <CButton
            onClick={handleVaultSubmit}
            className="btn-sm"
            color="success"
          >
            Submit
          </CButton>
          <Button onClick={handleVaultClose} className="btn-sm" color="danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default VaultInput
