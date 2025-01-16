import React from 'react';
import UserRoles from './views/pages/userRoles';
import Branches from './views/pages/branches';
import ExpenseItem from './views/pages/expensesItem';
import BankWithdrawals from './views/pages/otherBankWithdrawals';
import Investment from './views/pages/investment';
import EndOfDaySummary from './views/pages/endOfDaySummary';
import DailyEntry from './views/pages/dailyEntryReport';
import Defaulters from './views/pages/defaulters';
import DailyEntryReport from './views/pages/dailyEntry';
import BankOp from './views/pages/bankOpeningBal';
import Expenses from './views/pages/expenses';
import ExpensesApproval from './views/pages/expensesApproval';
import CashAccounting from './views/pages/cashAccounting';
import BankDeposit from './views/pages/transferToBank';
import VaultStatement from './views/pages/viewVaultStatement';
import VaultInput from './views/pages/vaultInput';
import VaultInputApproval from './views/pages/vaultInputApproval';
import LoansPortfolio from './views/pages/viewLoansDisbursedPerOfficer';
import rayPaymentHistory from './views/pages/viewLoanAndPaymentHistory';
import mainMenu from './views/pages/mainMenu';

import LoanRescheduling from './views/pages/paymentsReschedule';
import BankApprovedDeposit from './views/pages/viewBankDeposits';
import RemoveLoanBooking from './views/pages/removeLoanBooking';
import ViewExpenditure from './views/pages/viewExpenditure';
import ViewCollateralReceived from './views/pages/viewCollateralRecieved';

import BankDepositApproval from './views/pages/transferToBankApproval';
import ActiveLoans from './views/pages/viewActiveLoans';
import LoanBalances from './views/pages/loanBalances';
import CollateralBalances from './views/pages/collateralBalances';
import PaymentsDue from './views/pages/paymentsDue';
import PaymentHistory from './views/pages/paymentHistory';
import BankStatement from './views/pages/viewBankStatement';
import CollateralReceived from './views/pages/viewCollateralRecieved';
import MainMenu from './views/pages/mainMenu';
import RoleAccess from './views/pages/roleAccess';
import UserAccess from './views/pages/userAccess';
const Toaster = React.lazy(() =>
	import('./views/notifications/toaster/Toaster')
);
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() =>
	import('./views/base/breadcrumbs/Breadcrumbs')
);
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Form = React.lazy(() => import('./views/planning/Form'));
const It = React.lazy(() => import('./views/planning/It'));
const Support = React.lazy(() => import('./views/planning/Support'));
const Empdetails = React.lazy(() => import('./views/planning/EmpDetails'));
const DBsystem = React.lazy(() => import('./views/planning/DBsystem'));
const FamDetails = React.lazy(() => import('./views/planning/FamDetails'));
const CurPosting = React.lazy(() => import('./views/planning/CurPosting'));
const Inters = React.lazy(() => import('./views/planning/Inters'));

const Staff = React.lazy(() => import('./views/pages/staff'));
const Holiday = React.lazy(() => import('./views/pages/holiday'));
const Association = React.lazy(() =>
	import('./views/pages/customerAssociations')
);
const Product = React.lazy(() => import('./views/pages/products'));
const Bank = React.lazy(() => import('./views/pages/bank'));
const Summary = React.lazy(() => import('./views/pages/loanBookingSummary'));
const OfficerLoans = React.lazy(() =>
	import('./views/pages/viewOfficerLoansDisbursed')
);
const ViewBookings = React.lazy(() => import('./views/pages/viewLoanBookings'));
const PaymentSchedule = React.lazy(() =>
	import('./views/pages/paymentSchedules')
);
const Academy = React.lazy(() => import('./views/setup/AcQua'));

const AppointDetails = React.lazy(() =>
	import('./views/planning/AppointDetails')
);
const Directorate = React.lazy(() => import('./views/setup/Directorate'));

const Inst = React.lazy(() => import('./views/setup/Inst'));
const Units = React.lazy(() => import('./views/setup/Uni'));

//const Tables = React.lazy(() => import('./views/tables/Tables'));

const Jumbotrons = React.lazy(() =>
	import('./views/base/jumbotrons/Jumbotrons')
);
const ListGroups = React.lazy(() =>
	import('./views/base/list-groups/ListGroups')
);
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() =>
	import('./views/base/paginations/Pagnations')
);
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() =>
	import('./views/base/progress-bar/ProgressBar')
);
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() =>
	import('./views/buttons/brand-buttons/BrandButtons')
);
const ButtonDropdowns = React.lazy(() =>
	import('./views/buttons/button-dropdowns/ButtonDropdowns')
);
const ButtonGroups = React.lazy(() =>
	import('./views/buttons/button-groups/ButtonGroups')
);
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() =>
	import('./views/icons/coreui-icons/CoreUIIcons')
);
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() =>
	import('./views/theme/typography/Typography')
);
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/pages/userAccount'));
const ChangePassword = React.lazy(() => import('./views/pages/changePassword'));
const User = React.lazy(() => import('./views/users/User'));

const Leave = React.lazy(() => import('./views/setup/Leave'));
const YearLeave = React.lazy(() => import('./views/setup/YearLeave'));
const Holidays = React.lazy(() => import('./views/setup/Holidays'));
const Depart = React.lazy(() => import('./views/setup/Depart'));
const Grade = React.lazy(() => import('./views/setup/Grade'));
const Uni = React.lazy(() => import('./views/setup/Uni'));
const SysAdmin = React.lazy(() => import('./views/setup/SysAdmin'));
const StaffMgt = React.lazy(() => import('./views/Admin/StaffMgt'));

const Login = React.lazy(() => import('./views/setup/Login'));

//Dara routes
const CustomerList = React.lazy(() => import('./views/pages/customerlist'));
const Reassign = React.lazy(() => import('./views/pages/reassignCustomer'));
const ViewCustomerDetails = React.lazy(() =>
	import('./views/pages/viewCustomerDetails')
);
const CustomerRegistration = React.lazy(() => import('./views/pages/customer'));
const BankAccount = React.lazy(() => import('./views/pages/bankAccount'));
const IssuedLoanCheques = React.lazy(() =>
	import('./views/pages/issueLoanCheque')
);
const DisburseCheque = React.lazy(() => import('./views/pages/disburseCheque'));
const LoanBooking = React.lazy(() => import('./views/pages/loanBooking'));

const BulkCash = React.lazy(() => import('./views/pages/bulkCashReceipts'));

const LoanRepayment = React.lazy(() => import('./views/pages/loanRepayment'));

const CollectionSheet = React.lazy(() =>
	import('./views/pages/collectionSheet')
);

const CollateralWithdrawal = React.lazy(() =>
	import('./views/pages/collateralWithdrawal')
);
const ViewCollateralWithdrawals = React.lazy(() =>
	import('./views/pages/viewCollateralWithdrawals')
);

const LoanInArrears = React.lazy(() => import('./views/pages/loanInArrears'));
const CustomerLoanStatement = React.lazy(() =>
	import('./views/pages/customerLoanStatement')
);
const DisbursedLoans = React.lazy(() => import('./views/pages/loansDisbursed'));
const DailyCollectionUpdate = React.lazy(() =>
	import('./views/pages/viewToCorrectRepayments')
);

const routes = [
	{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
	{ path: '/theme', name: 'Theme', component: Colors, exact: true },
	{ path: '/theme/colors', name: 'Colors', component: Colors },
	{ path: '/theme/typography', name: 'Typography', component: Typography },
	{ path: '/base', name: 'Base', component: Cards, exact: true },
	{ path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
	{ path: '/base/cards', name: 'Cards', component: Cards },
	{ path: '/base/carousels', name: 'Carousel', component: Carousels },
	{ path: '/base/collapses', name: 'Collapse', component: Collapses },
	{ path: '/base/forms', name: 'Forms', component: BasicForms },

	{ path: '/psm/form', name: 'Form', component: Form },
	{ path: '/psm/it', name: 'It', component: It },
	{ path: '/psm/support', name: 'IT Support', component: Support },
	{ path: '/psm/empdetails', name: 'Employee Details', component: Empdetails },
	{ path: '/psm/dbsystem', name: 'Database System', component: DBsystem },
	{ path: '/psm/famdetails', name: 'Family  Details', component: FamDetails },
	{ path: '/psm/curposting', name: 'Current Psoting', component: CurPosting },
	{ path: '/psm/inters', name: 'Intership', component: Inters },

	//{ path: '/base/modal/addemp', name: 'AddEmp', component: AddEmp },

	{ path: '/Administration/Units', name: 'Units Setup', component: Units },
	{
		path: '/psm/appointdetails',
		name: 'Appointment Details',
		component: AppointDetails,
	},
	{
		path: '/Administration/Directorate',
		name: 'Directorate Setup',
		component: Directorate,
	},
	{ path: '/Administration/Inst', name: 'Institution Setup', component: Inst },

	{ path: '/Setup/Leave', name: 'Leave Setup', component: Leave },
	{ path: '/Setup/YearLeave', name: 'Year Leave', component: YearLeave },
	{ path: '/Setup/Holidays', name: 'Calender Holidays', component: Holidays },
	{
		path: '/setup/Directorate',
		name: 'Directorate Setup',
		component: Directorate,
	},
	{ path: '/setup/Depart', name: 'Department Setup', component: Depart },
	{ path: '/setup/Grade', name: 'Grade Setup', component: Grade },
	{ path: '/setup/Uni', name: 'Unit Setup', component: Uni },
	{
		path: '/setup/SysAdmin',
		name: 'System Administration',
		component: SysAdmin,
	},
	{ path: '/Admin/StaffMgt', name: 'Staff Management', component: StaffMgt },

	{
		path: '/Administration/Academy',
		name: 'Academic Quafilification Setup',
		component: Academy,
	},

	//{ path: '/tables/tables', name: 'Tables', component: Tables },

	{ path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
	{ path: '/base/list-groups', name: 'List Groups', component: ListGroups },
	{ path: '/base/navbars', name: 'Navbars', component: Navbars },
	{ path: '/base/navs', name: 'Navs', component: Navs },
	{ path: '/base/paginations', name: 'Paginations', component: Paginations },
	{ path: '/base/popovers', name: 'Popovers', component: Popovers },
	{ path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
	{ path: '/base/switches', name: 'Switches', component: Switches },
	{ path: '/base/tables', name: 'Tables', component: Tables },
	{ path: '/base/tabs', name: 'Tabs', component: Tabs },
	{ path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
	{ path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
	{ path: '/buttons/buttons', name: 'Buttons', component: Buttons },
	{
		path: '/buttons/button-dropdowns',
		name: 'Dropdowns',
		component: ButtonDropdowns,
	},
	{
		path: '/buttons/button-groups',
		name: 'Button Groups',
		component: ButtonGroups,
	},
	{
		path: '/buttons/brand-buttons',
		name: 'Brand Buttons',
		component: BrandButtons,
	},

	{ path: '/charts', name: 'Charts', component: Charts },
	{ path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
	{ path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
	{ path: '/icons/flags', name: 'Flags', component: Flags },
	{ path: '/icons/brands', name: 'Brands', component: Brands },
	{
		path: '/notifications',
		name: 'Notifications',
		component: Alerts,
		exact: true,
	},
	{ path: '/notifications/alerts', name: 'Alerts', component: Alerts },
	{ path: '/notifications/badges', name: 'Badges', component: Badges },
	{ path: '/notifications/modals', name: 'Modals', component: Modals },
	{ path: '/notifications/toaster', name: 'Toaster', component: Toaster },
	{ path: '/widgets', name: 'Widgets', component: Widgets },
	{
		path: '/setup/useraccount',
		exact: true,
		name: 'User Account',
		component: Users,
	},

	{
		path: '/setup/changepassword',
		exact: true,
		name: 'Change Password',
		component: ChangePassword,
	},
	{ path: '/users/:id', exact: true, name: 'User Details', component: User },

	{ path: '/home', exact: true, name: 'Home' },
	{ path: '/login', exact: true, name: 'Login', component: Login },

	{
		path: '/customer/customerlist',
		name: 'Customer List',
		component: CustomerList,
	},
	{
		path: '/customer/reassign',
		name: 'Reassign Customers to Officer',
		component: Reassign,
	},

	{
		path: '/customer/viewcustomerdetails/:customer',
		name: 'View Customer Details',
		component: ViewCustomerDetails,
	},

	{
		path: '/customer/registration',
		name: 'Customer Registration',
		component: CustomerRegistration,
	},
	{
		path: '/setup/staff',
		name: 'Staff',
		component: Staff,
	},
	{
		path: '/setup/association',
		name: 'Association',
		component: Association,
	},

	{
		path: '/setup/product',
		name: 'Product',
		component: Product,
	},
	{
		path: '/setup/bank',
		name: 'Bank',
		component: Bank,
	},

	{
		path: '/setup/bankaccounts',
		name: 'Bank Accounts',
		component: BankAccount,
	},

	{
		path: '/setup/holiday',
		name: 'Holiday',
		component: Holiday,
	},
	{
		path: '/setup/branch',
		name: 'Branch',
		component: Branches,
	},

	{
		path: '/setup/userroles',
		name: 'UserRoles',
		component: UserRoles,
	},
	{
		path: '/setup/expensesitems',
		name: 'Expenses Items',
		component: ExpenseItem,
	},

	{
		path: '/setup/expensesitems',
		name: 'Expenses Items',
		component: ExpenseItem,
	},

	{
		path: '/loan/issueloancheque',
		name: 'Issue Loan Cheques',
		component: IssuedLoanCheques,
	},
	{
		path: '/loan/disburse',
		name: 'Disburse Cheque',
		component: DisburseCheque,
	},

	{
		path: '/loan/loanbooking',
		name: 'Loan Booking',
		component: LoanBooking,
	},

	{
		path: '/summary/:customer/:disbursementId',
		name: 'summary',
		component: Summary,
	},

	{
		path: '/paymentschedule/:disbursementId/:customer',
		name: 'Payment Schedule',
		component: PaymentSchedule,
	},

	{
		path: '/viewbookings',
		name: 'viewLoanBookings',
		component: ViewBookings,
	},

	{
		path: '/loan/bulkcash',
		name: 'Bulk Cash Receipts',
		component: BulkCash,
	},

	{
		path: '/loan/loanrepayment',
		name: 'Loan Repayment',
		component: LoanRepayment,
	},

	{
		path: '/loan/collectionsheet',
		name: 'Collection Sheet',
		component: CollectionSheet,
	},
	{
		path: '/loan/collateralwithdrawal',
		name: 'Collateral Withdrawal',
		component: CollateralWithdrawal,
	},

	{
		path: '/loan/viewcollateralwithdrawals',
		name: 'View Collateral Withdrawals',
		component: ViewCollateralWithdrawals,
	},

	{
		path: '/transaction/expenses',
		name: 'Expenses',
		component: Expenses,
	},

	{
		path: '/expenses/approval',
		name: 'Expenses Approvals',
		component: ExpensesApproval,
	},

	{
		path: '/cashaccounting',
		name: 'Cash Accounting',
		component: CashAccounting,
	},

	{
		path: '/loanInArrears',
		name: 'Loans In Arrears',
		component: LoanInArrears,
	},

	{
		path: '/customerLoanStatement',
		name: 'Customer Loan Statement',
		component: CustomerLoanStatement,
	},

	{
		path: '/disbursedLoans',
		name: 'Disbursed Loans',
		component: DisbursedLoans,
	},
	{
		path: '/bankDeposit',
		name: 'Bank Deposit',
		component: BankDeposit,
	},

	{
		path: '/activeLoans',
		name: 'Active Loans',
		component: ActiveLoans,
	},

	{
		path: '/loanBalances',
		name: 'Loan Balances',
		component: LoanBalances,
	},

	{
		path: '/collateralBalances',
		name: 'Collateral Balances',
		component: CollateralBalances,
	},

	{
		path: '/paymentsDue',
		name: 'Payments Due',
		component: PaymentsDue,
	},
	{
		path: '/paymentHistory',
		name: 'Payment History',
		component: PaymentHistory,
	},

	{
		path: '/bankDepositApproval',
		name: 'Bank Deposit Approval',
		component: BankDepositApproval,
	},

	{
		path: '/viewBankDeposits',
		name: 'View Bank Deposits',
		component: BankApprovedDeposit,
	},
	{
		path: '/viewExpenditure',
		name: 'View Expenditure',
		component: ViewExpenditure,
	},

	{
		path: '/bankOpeningBal',
		name: 'Bank Opening Balance',
		component: BankOp,
	},
	{
		path: '/dailyEntry',
		name: 'Daily Entry Report',
		component: DailyEntry,
	},

	{
		path: '/dailyEntryReport',
		name: 'Daily Entry Report',
		component: DailyEntryReport,
	},
	{
		path: '/endOfDaySummary',
		name: 'End of Day Summary',
		component: EndOfDaySummary,
	},

	{
		path: '/bankStatement',
		name: 'Bank Statement',
		component: BankStatement,
	},
	{
		path: '/vaultStatement',
		name: 'Vault Statement',
		component: VaultStatement,
	},
	{
		path: '/addVault',
		name: 'Add to Vault - Other Sources',
		component: VaultInput,
	},
	{
		path: '/vaultEntryApproval',
		name: 'Approve Vault Entry',
		component: VaultInputApproval,
	},

	{
		path: '/loan/removeLoanBooking',
		name: 'Remove Loan Booking',
		component: RemoveLoanBooking,
	},

	{
		path: '/investment/investment',
		name: 'Investment',
		component: Investment,
	},

	{
		path: '/portfolio',
		name: 'Officers Portfolio',
		component: LoansPortfolio,
	},
	{
		path: '/officerloans',
		name: 'Officer Loans',
		component: OfficerLoans,
	},
	{
		path: '/raypaymentshistory',
		name: 'Payments History',
		component: rayPaymentHistory,
	},
	{
		path: '/collateralreceived',
		name: 'Collateral Received',
		component: CollateralReceived,
	},
	{
		path: '/rescheduling',
		name: 'Loan Rescheduling',
		component: LoanRescheduling,
	},

	{
		path: '/defaulters',
		name: 'Defaulters',
		component: Defaulters,
	},
	{
		path: '/bankWithdrawals',
		name: 'Bank Withdrawals',
		component: BankWithdrawals,
	},
	{
		path: '/loan/corrections',
		name: 'Daily Collections Update',
		component: DailyCollectionUpdate,
	},
	{
		path: '/setup/mainmenu',
		name: 'Main Menu',
		component: MainMenu,
	},
	{
		path: '/setup/roleaccess',
		name: 'Role Access',
		component: RoleAccess,
	},
	{
		path: '/setup/useraccess',
		name: 'User Access',
		component: UserAccess,
	},
];

export default routes;
