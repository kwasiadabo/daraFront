import React from 'react'
import CIcon from '@coreui/icons-react'

export default [
  {
    _tag: 'CSidebarNavDropdown',
    name: 'TRANSACTIONS',
    route: '/base',
    icon: 'cil-calculator',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Collection Sheet',
        to: '/loan/collectionsheet',
        label: true,
        //icon: 'cilNotes',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Loan Repayments',
        to: '/loan/loanrepayment',
        label: true,
        // icon: 'cilNotes',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Daily Entry',
        to: '/dailyEntryReport',
        label: true,
        // icon: 'cilNotes',
      },
    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'SETUPS',
    to: '/home',
    icon: <CIcon name="cil-settings" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'success',
      text: 'PS',
    },
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Change Password',
        to: '/setup/changepassword',
        label: true,
        // icon: 'cilNotes',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'REPORTING',
    to: '/home',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'success',
      text: 'PS',
    },
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Customer List',
        to: '/customer/customerlist',
        label: true,
        //icon: 'cilNotes',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Customer Statement',
        to: '/customerLoanStatement',
        label: true,
        //icon: 'cilNotes',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Loans Portfolio',
        to: '/officerloans',
        label: true,
        //icon: 'cilNotes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Loans in Arrears',
        to: '/loanInArrears',
        label: true,
        //icon: 'cilNotes',
      },
    ],
  },
]
