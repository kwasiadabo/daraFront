import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import auth from '../../components/services/authService'
import Swal from 'sweetalert2'
import { apiUrl } from '../../config.json'
import { reportUrl } from '../../config.json'

import {
  Table,
  //Modal,
} from 'reactstrap'

import {
  //CCardHeader,
  CInput,
  CButton,
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

const BookedLoans = () => {
  const [user, setUser] = useState(auth.getCurrentUser)
  const [expenses, setExpenses] = useState([])
  const [bookedLoans, setBookedLoans] = useState([])
  const [render, setRender] = useState(false)
  const [search, setSearch] = useState('')

  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))
  let navigate = useHistory()

  useEffect(() => {
    async function getBookedLoans() {
      const results = await axios.get(apiUrl + '/loan/booking/booked')
      setBookedLoans(results.data)
    }
    getBookedLoans()
  }, [render])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const data = {
    allBooked: bookedLoans.filter((item) =>
      item.fullName.toLowerCase().includes(search.toLowerCase()),
    ),
  }

  const dataTouse = search.length === 0 ? bookedLoans : data.allBooked

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  const totalAmt = expenses.reduce((a, i) => {
    return a + i.amount
  }, 0)

  const handleDelete = async (c) => {
    console.log(c.id)
    Swal.fire({
      title: 'Do you want to REMOVE this BOOKING ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Remove',
      denyButtonText: `Don't`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await axios.delete(apiUrl + '/loan/booking/' + c.id)
        Swal.fire('Removed!', '', 'success')
        setRender(!render)
      } else if (result.isDenied) {
        Swal.fire('Cancelled', '', 'info')
      }
    })
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="row justify-content-center">
            <h4 className="centertext mb-3">VIEW BOOKED LOANS</h4>
          </div>

          <p className="text-center">
            NB: Booked Loans can removed from here. Only booked loans without
            payments or payments not yet started will appear in the list.”
          </p>
        </div>

        <div className="col-sm-12">
          <CInput
            type="text"
            name="searchCustomer"
            className="float-center col-sm-6 mb-3 mt-3"
            id="searchCustomer"
            value={null}
            onChange={handleSearch}
            placeholder="Search booked loans"
          />

          <Table className="table-sm col-sm-12">
            <thead className="">
              <tr className="fs-sm">
                <th></th>
                <th>Date</th>
                <th>Customer</th>
                <th>Account Number</th>
                <th>Loan ID</th>
                <th>Principal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataTouse.map((c, index) => (
                <tr key={c.id}>
                  <td>{index + 1}</td>
                  <td>{c.dateBooked}</td>
                  <td>{c.fullName}</td>
                  <td>{c.accountNumber}</td>
                  <td>{c.loanId}</td>
                  <td>{formatter.format(c.principal)}</td>
                  <td>
                    {
                      <CButton
                        onClick={() => handleDelete(c)}
                        className="btn-sm"
                        color="danger"
                      >
                        Remove
                      </CButton>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default BookedLoans
