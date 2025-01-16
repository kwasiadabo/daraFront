import React from 'react';
import CIcon from '@coreui/icons-react';

export default [
	{
		_tag: 'CSidebarNavDropdown',
		name: 'CUSTOMER MGT',
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
		name: 'LOAN MGT',
		route: '#',
		icon: 'cilNotes',
		_children: [
			{
				_tag: 'CSidebarNavItem',
				name: 'Issue Loan Cheque',
				to: '/loan/issueloancheque',
				label: true,
				//icon: 'cilNotes',
			},

			{
				_tag: 'CSidebarNavItem',
				name: 'Disburse Loan Cheque',
				to: '/loan/disburse',
				label: true,
				//icon: 'cilNotes',
			},

			{
				_tag: 'CSidebarNavItem',
				name: 'Loan Booking',
				to: '/loan/loanbooking',
				label: true,
				//icon: 'cilNotes',
			},
			{
				_tag: 'CSidebarNavItem',
				name: 'Remove Loan Booking',
				to: '/loan/removeLoanBooking',
				label: true,
				//icon: 'cilNotes',
			},
			{
				_tag: 'CSidebarNavItem',
				name: 'Loan Rescheduling',
				to: '/rescheduling',
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

			{
				_tag: 'CSidebarNavItem',
				name: 'Collateral Withdrawal',
				to: '/loan/collateralwithdrawal',
				label: true,
				//icon: 'cil-calculator',
			},
			{
				_tag: 'CSidebarNavItem',
				name: 'Daily Collections Update',
				to: '/loan/corrections',
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
				name: 'Expenses Approvals',
				to: '/expenses/approval',
				/*icon: {
          name: 'cil-star',
          className: 'text-success',
        },*/
				label: true,
			},
			{
				_tag: 'CSidebarNavItem',
				name: 'End Day',
				to: '/cashaccounting',
				/* icon: {
          name: 'cil-star',
          className: 'text-info',
        },*/
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
				name: 'Bank Withdrawals',
				to: '/bankWithdrawals',
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

			{
				_tag: 'CSidebarNavItem',
				name: 'Vault Entry Approval',
				to: '/vaultEntryApproval',
				/* icon: {
          name: 'cil-star',
          className: 'text-info',
        },*/
				label: true,
			},

			{
				_tag: 'CSidebarNavItem',
				name: 'Bank Deposit Approval',
				to: '/bankDepositApproval',
				/*icon: {
          name: 'cil-star',
          className: 'text-danger',
        },*/
				label: true,
			},

			{
				_tag: 'CSidebarNavItem',
				name: 'Bank Opening Balance',
				to: '/bankOpeningBal',
				/*icon: {
          name: 'cil-star',
          className: 'text-danger',
        },*/
				label: true,
			},
			{
				_tag: 'CSidebarNavItem',
				name: 'Salaries',
				to: '',
				/*icon: {
          name: 'cil-star',
          className: 'text-danger',
        },*/
				label: true,
			},
		],
	},

	{
		_tag: 'CSidebarNavDropdown',
		name: 'INVESTMENT MGT',
		route: '/base',
		icon: 'cil-calculator',
		_children: [
			{
				_tag: 'CSidebarNavItem',
				name: 'Investment',
				to: '/investment/investment',
				label: true,
				//icon: 'cilNotes',
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
				name: 'User Account',
				to: '/setup/useraccount',
				label: true,
				// icon: 'cilNotes',
			},

			{
				_tag: 'CSidebarNavItem',
				name: 'Role Access',
				to: '/setup/roleaccess',
				label: true,
				// icon: 'cilNotes',
			},

			{
				_tag: 'CSidebarNavItem',
				name: 'User Access',
				to: '/setup/useraccess',
				label: true,
				// icon: 'cilNotes',
			},

			{
				_tag: 'CSidebarNavItem',
				name: 'User Roles',
				to: '/setup/userroles',
				label: true,
				// icon: 'cilNotes',
			},

			{
				_tag: 'CSidebarNavItem',
				name: 'Menus',
				to: '/setup/mainmenu',
				label: true,
				//icon: 'cilNotes',
			},

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

			{
				_tag: 'CSidebarNavItem',
				name: 'Product',
				to: '/setup/product',
				label: true,
				//icon: 'cilNotes',
			},

			{
				_tag: 'CSidebarNavItem',
				name: 'Bank',
				to: '/setup/bank',
				label: true,
				//icon: 'cilNotes',
			},
			{
				_tag: 'CSidebarNavItem',
				name: 'Groups/Associations',
				to: '/setup/association',
				label: true,
				//icon: 'cilNotes',
			},

			{
				_tag: 'CSidebarNavItem',
				name: 'Bank Accounts',
				to: '/setup/bankaccounts',
				label: true,
				// icon: 'cilNotes',
			},
			{
				_tag: 'CSidebarNavItem',
				name: 'Holiday',
				to: '/setup/holiday',
				label: true,
				//icon: 'cilNotes',
			},

			{
				_tag: 'CSidebarNavItem',
				name: 'Branch',
				to: '/setup/branch',
				label: true,
				//icon: 'cilNotes',
			},

			{
				_tag: 'CSidebarNavItem',
				name: 'Expenses Items',
				to: '/setup/expensesitems',
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
				to: '/defaulters',
				label: true,
				//icon: 'cilNotes',
			},

			{
				_tag: 'CSidebarNavItem',
				name: 'Collateral Balances',
				to: '/collateralBalances',
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
				name: 'Bank Deposits',
				to: '/viewBankDeposits',
				label: true,
				//icon: 'cilNotes',
			},
			{
				_tag: 'CSidebarNavItem',
				name: 'Expenditure',
				to: '/viewExpenditure',
				label: true,
				//icon: 'cilNotes',
			},
			{
				_tag: 'CSidebarNavItem',
				name: 'End Of Day Summary',
				to: '/endOfDaySummary',
				label: true,
				//icon: 'cilNotes',
			},
			{
				_tag: 'CSidebarNavItem',
				name: 'Bank Statement',
				to: '/bankStatement',
				label: true,
				//icon: 'cilNotes',
			},
			{
				_tag: 'CSidebarNavItem',
				name: 'Vault Statement',
				to: '/vaultStatement',
				label: true,
				//icon: 'cilNotes',
			},

			// {
			//   _tag: 'CSidebarNavItem',
			//   name: 'Officers Portfolio',
			//   to: '/portfolio',
			//   label: true,
			//   //icon: 'cilNotes',
			// },
			// {
			//   _tag: 'CSidebarNavItem',
			//   name: 'Loans Disbursed',
			//   to: '/officerloans',
			//   label: true,
			//   //icon: 'cilNotes',
			// },
			{
				_tag: 'CSidebarNavItem',
				name: 'Payments History',
				to: '/raypaymentshistory',
				label: true,
				//icon: 'cilNotes',
			},
			{
				_tag: 'CSidebarNavItem',
				name: 'Collateral Recieved',
				to: '/collateralreceived',
				label: true,
				//icon: 'cilNotes',
			},
		],
	},
];
