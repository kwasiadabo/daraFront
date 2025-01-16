import React from 'react'
import CIcon from '@coreui/icons-react'

export default [
  {
    _tag: 'CSidebarNavDropdown',
    name: 'CUSTOMER',
    to: '/home',
    icon: <CIcon name="cil-file" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'success',
      text: 'PS',
    },
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Customers List',
        to: '/customer/customerlist',
        //icon: 'cil-spreadsheet',
        label: true,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Re-assign Customers',
        to: '/customer/reassign',
        //icon: 'cilNotes',
        label: true,
      },
    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'LOAN MANAGEMENT',
    route: '#',
    icon: 'cil-asterisk',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Loan Booking',
        to: '/loan/loanbooking',
        label: true,
        //icon: 'cilNotes',
      },
    ],
  },
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
        name: 'Receive Bulk Cash',
        to: '/loan/bulkcash',
        label: true,
        //icon: 'cilNotes',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Daily Entry',
        to: '/dailyEntryReport',
        label: true,
        // icon: 'cilNotes',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Collateral Withdrawal',
        to: '/loan/collateralwithdrawal',
        label: true,
        //icon: 'cil-calculator',
      },
    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'ACCOUNTING',
    route: '',
    icon: 'cil-code',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Expenses',
        to: '/transaction/expenses',
        // icon: {
        //  name: 'cil-star',
        // className: 'text-info',
        // },
        label: true,
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Bank Deposit',
        to: '/bankDeposit',
        /* icon: {
          name: 'cil-star',
          className: 'text-info',
        },*/
        label: true,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add to Vault - Other Sources',
        to: '/addVault',
        /* icon: {
          name: 'cil-star',
          className: 'text-info',
        },*/
        label: true,
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
      {
        _tag: 'CSidebarNavItem',
        name: 'Staff',
        to: '/setup/staff',
        label: true,
        //icon: 'cilNotes',
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
        name: 'Daily Entry Report',
        to: '/dailyEntry',
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
      {
        _tag: 'CSidebarNavItem',
        name: 'Customer Statement',
        to: '/customerLoanStatement',
        label: true,
        //icon: 'cilNotes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Disbursed Loans',
        to: '/disbursedLoans',
        label: true,
        //icon: 'cilNotes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Issued Cheques',
        to: '/loan/issueloancheque',
        label: true,
        //icon: 'cilNotes',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Payments History',
        to: '/raypaymentshistory',
        label: true,
        //icon: 'cilNotes',
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Active Loans',
      //   to: '/activeLoans',
      //   label: true,
      //   //icon: 'cilNotes',
      // },
      {
        _tag: 'CSidebarNavItem',
        name: 'Loan Balances',
        to: '/loanBalances',
        label: true,
        //icon: 'cilNotes',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Defaulters',
        to: '/loan/defaulters',
        label: true,
        //icon: 'cilNotes',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Payments Due',
        to: '/paymentsDue',
        label: true,
        //icon: 'cilNotes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Officers Portfolio',
        to: '/portfolio',
        label: true,
        //icon: 'cilNotes',
      },
    ],
  },
]
