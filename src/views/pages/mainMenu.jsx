import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { apiUrl } from '../../config.json';
import auth from '../../components/services/authService';
import Joi, { stringify } from 'joi-browser';
import Swal from 'sweetalert2';

import {
	CBadge,
	CCard,
	CCardBody,
	CCardHeader,
	CCardFooter,
	CCol,
	CDataTable,
	CRow,
	CButton,
	CModal,
	CModalFooter,
	CModalHeader,
	CModalBody,
	CSwitch,
	//CCardHeader,
	CInputGroupAppend,
	CInputGroupPrepend,
	CDropdownItem,
	CForm,
	//CCardFooter,
	CDropdownToggle,
	//CInputRadio,
	CDropdown,
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { DocsLink } from 'src/reusable';

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
} from 'reactstrap';

const MainMenu = () => {
	const [menu, setMenu] = useState({
		menu: '',
		description: '',
		_tag: 'CSidebarNavDropdown',
		name: '',
		icon: '',
	});

	const [subMenuItems, setSubMenuItems] = useState({
		menu: '',
		subMenu: '',
		_tag: 'CSidebarNavItem',
		name: '',
		label: '',
		icon: '',
	});

	const [mainMenuData, setMainMenuData] = useState([]);
	const [subMenus, setSubMenus] = useState([]);
	const [subEdit, setSubEdit] = useState(false);
	const [search, setSearch] = useState('');
	const [show, setShow] = useState(false);
	const [subShow, setSubShow] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [render, setRender] = useState(false);
	const [subRender, setSubRender] = useState(false);

	const [sub, setSub] = useState(0);
	const [subId, setSubId] = useState(0);

	useEffect(() => {
		async function getMainMenus() {
			const results = await axios.get(apiUrl + '/menus/mainmenu');
			setMainMenuData(results.data);
			console.log(results.data);
		}
		getMainMenus();
	}, [render]);

	useEffect(() => {
		async function getSubMenus() {
			const results = await axios.get(apiUrl + '/menus/submenu/' + sub);
			setSubMenus(results.data);
			console.log(results.data);
		}
		getSubMenus();
	}, [subRender]);

	const handleSubmit = async () => {
		console.log(menu);
		try {
			const results = await axios.post(apiUrl + '/menus/mainmenu', menu);

			if (results.status !== 200) {
				return Swal.fire(
					'Failed',
					'Submission Failed ! Check Entries and try again !',
					'error'
				);
			} else {
				Swal.fire('Success', 'Main Menu Saved Successfully', 'success');
				setMenu({
					menu: '',
					description: '',
					_tag: 'CSidebarNavDropdown',
					name: '',
					icon: '',
				});
				setRender(!render);
			}
		} catch (err) {
			Swal.fire('Error', 'OOPS ! ' + err.message, 'error');
		}
	};

	const handleSubmitSubMenu = async () => {
		try {
			const results = await axios.post(apiUrl + '/menus/submenu', subMenuItems);

			if (results.status !== 200) {
				return Swal.fire(
					'Failed',
					'Submission Failed ! Check Entries and try again !',
					'error'
				);
			} else {
				Swal.fire('Success', 'Sub Menu Saved Successfully', 'success');
				setSubMenuItems({
					menu: '',
					subMenu: '',
					_tag: 'CSidebarNavItem',
					name: '',
					label: '',
					icon: '',
				});
				setSubRender(!subRender);
			}
		} catch (err) {
			Swal.fire('Error', 'OOPS ! ' + err.message, 'error');
		}
	};

	const handleChangeSubMenu = async () => {
		try {
			const results = await axios.put(apiUrl + '/menus/submenu', subMenuItems);

			if (results.status !== 200) {
				return Swal.fire(
					'Failed',
					'Submission Failed ! Check Entries and try again !',
					'error'
				);
			} else {
				Swal.fire('Success', 'Sub Menu Updated Successfully', 'success');
				setSubMenuItems({
					menu: '',
					subMenu: '',
					_tag: 'CSidebarNavItem',
					name: '',
					label: 'true',
					icon: '',
					to: '',
				});
				setSubRender(!subRender);
				setSubEdit(false);
			}
		} catch (err) {
			Swal.fire('Error', 'OOPS ! ' + err.message, 'error');
		}
	};

	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	const data = {
		sMenus: mainMenuData.filter((m) =>
			m.menu?.toLowerCase().includes(search.toLowerCase())
		),
	};

	const staffView = (s) => {
		console.log(s);
	};

	const handleOnEdit = (p) => {
		console.log(p);
		setEditMode(true);
		setMenu({
			menu: p.menu,
			description: p.description,
			name: p.name,
			_tag: p._tag,
			icon: p.icon,
			id: p.mId,
		});
		setShow(!show);
		//setDisabled(!disabled);
	};

	const handleUpdate = async (e) => {
		console.log(menu);
		if (menu.menu !== '') {
			try {
				const results = await axios.put(apiUrl + '/menus/mainmenu', menu);
				if (results.status !== 200) {
					return Swal.fire(
						'OOPS !',
						'Submission Failed ! Check Entries and try again !',
						'error'
					);
				} else {
					Swal.fire('Success', 'Menu Updated Successfully', 'success');
					setMenu({
						menu: '',
						description: '',
						_tag: 'CSidebarNavDropdown',
						name: '',
						icon: '',
					});
					setEditMode(false);
					setRender(!render);
				}
			} catch (err) {
				Swal.fire('OOPS ! ' + err.message, 'error');
			}
		} else {
			return Swal.fire('OOPS', 'Enter all Details !', 'error');
		}
	};

	const showSubMenu = async (p) => {
		setSub(p.mId);
		setMenu({
			menu: p.menu,
			description: p.description,
			name: p.name,
			_tag: p._tag,
			icon: p.icon,
			id: p.mId,
		});
		setSubMenuItems({
			menu: String(p.mId),
			_tag: 'CSidebarNavItem',
			label: 'true',
		});
		setSubRender(!subRender);
		setSubShow(true);
	};
	const showSub = (p) => {
		setSubId(p.id);

		setSubMenuItems({
			id: p.id,
			menu: p.menu,
			subMenu: p.subMenu,
			_tag: 'CSidebarNavItem',
			name: p.name,
			label: 'true',
			icon: p.icon,
			to: p.to,
		});
		setSubEdit(true);
		console.log(p);
	};

	const handleDelete = async () => {
		if (menu.menu !== '') {
			try {
				const results = await axios.delete(apiUrl + '/setup/staff/' + menu.id);
				if (results.status !== 200) {
					return Swal.fire(
						'OOPS !',
						'Submission Failed ! Check Entries and try again !',
						'error'
					);
				} else {
					Swal.fire('Success', 'Staff Deleted Successfully', 'success');
					setMenu({
						menu: '',
						description: '',
						_tag: 'CSidebarNavDropdown',
						name: '',
						icon: '',
					});
					setEditMode(false);
					setRender(!render);
				}
			} catch (err) {
				Swal.fire('OOPS ! ' + err.message, 'error');
			}
		} else {
			return Swal.fire('OOPS', 'Select a Staff !', 'error');
		}
	};

	const dataTouse = search.length === 0 ? mainMenuData : data.sMenus;
	return (
		<div className="col-sm-12 mt-3">
			<h1 className="centertext">Application Main Menus</h1>
			<p className="staffp">
				An application's main menu serves as the primary navigation hub,
				providing users with easy access to key features and functions.
				Typically located at the top of the interface or within a side panel, it
				organizes commands and options into categories such as "File," "Edit,"
				"View," and "Help." The main menu streamlines the user experience by
				offering a clear, structured way to interact with the application,
				ensuring that essential tools are easily accessible for efficient
				workflow management.
			</p>

			<div className="centreStaff row ">
				<div className="table-responsive">
					<CButton
						type="submit"
						className="btn btn-success btn-block col-sm-3 float-right btn-sm"
						onClick={() => setShow(!show)}
					>
						Enter Main Menu
					</CButton>
					<CInput
						className="mt-3 mb-3 col-4"
						type="text"
						placeholder="Search Menus"
						onChange={handleSearch}
					/>
					<Table>
						<thead>
							<tr className="fs-sm">
								<th></th>
								<th>Menu</th>
								<th>Description</th>
								<th>Tag</th>
								<th>Name</th>

								<th className="hidden-sm-down">Icon</th>
							</tr>
						</thead>
						<tbody>
							{dataTouse.map((s, index) => (
								<tr key={s.mid}>
									<td>{index + 1}</td>
									<td>{s.menu}</td>
									<td>{s.description}</td>
									<td>{s.name}</td>
									<td>{s._tag}</td>
									<td>{s.icon}</td>
									<td>
										<CDropdown className="btn-sm">
											<CDropdownToggle color="info" size="sm" onClick={null}>
												Select Action
											</CDropdownToggle>
											<CDropdownMenu size="sm">
												<CDropdownItem
													Style="cursor: pointer;"
													onClick={() => handleOnEdit(s)}
												>
													Edit
												</CDropdownItem>

												<CDropdownItem onClick={() => showSubMenu(s)}>
													Sub Menus
												</CDropdownItem>
											</CDropdownMenu>
										</CDropdown>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>

				<CModal
					size="lg"
					show={show}
					onClose={() => {
						setShow(!show);
					}}
					color="success"
				>
					<CModalHeader closeButton>
						<CModalTitle> ADD MAIN MENU </CModalTitle>
					</CModalHeader>
					<CModalBody>
						<CFormGroup>
							<CInputGroup className="mt-3">
								<CLabel htmlFor="menu" className="form-Label col-sm-3">
									Menu
								</CLabel>
								<CInput
									type="text"
									className="form-control col-sm-8"
									id="menu"
									value={menu.menu}
									onChange={(e) =>
										setMenu({
											...menu,
											menu: e.currentTarget.value,
											name: e.currentTarget.value,
											_tag: 'CSidebarNavDropdown',
										})
									}
								/>
							</CInputGroup>
							<CInputGroup className="mt-3">
								<CLabel htmlFor="description" className="form-label col-sm-3">
									Description
								</CLabel>
								<CInput
									type="text"
									className="form-control col-sm-8"
									id="description"
									value={menu.description}
									onChange={(e) =>
										setMenu({
											...menu,
											description: e.currentTarget.value,
										})
									}
								/>
							</CInputGroup>
							<CInputGroup className="mt-3">
								<CLabel htmlFor="name" className="form-label col-sm-3">
									Name
								</CLabel>
								<CInput
									type="text"
									className="form-control col-sm-8"
									id="name"
									readOnly
									value={menu.name}
									onChange={(e) =>
										setMenu({
											...menu,
											name: e.currentTarget.value,
											_tag: 'CSidebarNavDropdown',
										})
									}
								/>
							</CInputGroup>

							<CInputGroup className="mt-3">
								<CLabel htmlFor="tag" className="form-label col-sm-3">
									Tag
								</CLabel>
								<CInput
									type="text"
									className="form-control col-sm-8"
									id="tag"
									readOnly
									value={menu._tag}
									onChange={(e) =>
										setMenu({
											...menu,
											_tag: e.currentTarget.value,
										})
									}
								/>
							</CInputGroup>
							<CInputGroup className="mt-3">
								<CLabel htmlFor="icon" className="form-label col-sm-3">
									Icon
								</CLabel>
								<CInput
									type="text"
									className="form-control col-sm-8"
									id="icon"
									value={menu.icon}
									placeholder="eg: cilNotes"
									onChange={(e) =>
										setMenu({
											...menu,
											icon: e.currentTarget.value,
										})
									}
								/>
							</CInputGroup>

							<div className="d-flex justify-content-center mt-3 mb-3">
								{!editMode ? (
									<CButton
										className="btn btn-primary col-sm-2 mt-3 btn-sm"
										onClick={handleSubmit}
									>
										Submit
									</CButton>
								) : null}
								{editMode ? (
									<CButton
										className="btn-sm m-3 col-sm-2"
										color="success"
										onClick={handleUpdate}
									>
										Update
									</CButton>
								) : null}

								{editMode && (
									<CButton
										className="btn btn-danger col-sm-2 m-3 btn-sm"
										onClick={handleDelete}
									>
										Delete
									</CButton>
								)}
							</div>
						</CFormGroup>
					</CModalBody>
				</CModal>

				<CModal
					show={subShow}
					onClose={() => {
						setSubShow(false);
					}}
					color="info"
					size="lg"
				>
					<CModalHeader closeButton>
						<CModalTitle> ADD SUBMENU </CModalTitle>
					</CModalHeader>

					<CModalBody>
						<CFormGroup>
							<CRow>
								<CCol xs="12" sm="6" md="12">
									<CCard>
										<CCardHeader>
											<i>Add SubMenu to:</i>
											<h5>{menu.name}</h5>
											<DocsLink name="CCard" />
										</CCardHeader>
										<CCardBody>
											<CInputGroup className="mt-3">
												<CLabel
													htmlFor="subMenu"
													className="form-label col-sm-3"
												>
													Sub Menu
												</CLabel>
												<CInput
													type="text"
													className="form-control col-sm-8"
													id="subMenu"
													placeholder="submenu"
													value={subMenuItems.subMenu}
													onChange={(e) =>
														setSubMenuItems({
															...subMenuItems,
															name: e.currentTarget.value,
															subMenu: e.currentTarget.value,
															_tag: 'CSidebarNavItem',
														})
													}
												/>
											</CInputGroup>
											<CInputGroup className="mt-3">
												<CLabel htmlFor="tag" className="form-label col-sm-3">
													Tag
												</CLabel>
												<CInput
													type="text"
													className="form-control col-sm-8"
													id="tag"
													value="CSidebarNavItem"
													onChange={(e) =>
														setSubMenuItems({
															...subMenuItems,
															_tag: 'CSidebarNavItem',
														})
													}
												/>
											</CInputGroup>
											<CInputGroup className="mt-3">
												<CLabel htmlFor="name" className="form-label col-sm-3">
													Name
												</CLabel>
												<CInput
													type="text"
													className="form-control col-sm-8"
													id="name"
													placeholder="Menu"
													value={subMenuItems.subMenu}
													onChange={(e) =>
														setSubMenuItems({
															...subMenuItems,
															name: e.currentTarget.value,
															_tag: 'CSidebarNavDropdown',
														})
													}
												/>
											</CInputGroup>
											<CInputGroup className="mt-3">
												<CLabel htmlFor="to" className="form-label col-sm-3">
													To
												</CLabel>
												<CInput
													type="text"
													className="form-control col-sm-8"
													id="to"
													placeholder="e.g. /transactions"
													value={subMenuItems.to}
													onChange={(e) =>
														setSubMenuItems({
															...subMenuItems,
															to: e.currentTarget.value,
														})
													}
												/>
											</CInputGroup>

											<CInputGroup className="mt-3">
												<CLabel htmlFor="label" className="form-label col-sm-3">
													Label
												</CLabel>
												<CInput
													type="text"
													className="form-control col-sm-8"
													id="label"
													value={subMenuItems.label}
													onChange={(e) =>
														setSubMenuItems({
															...subMenuItems,
															label: e.currentTarget.value,
														})
													}
												/>
											</CInputGroup>

											<CInputGroup className="mt-3">
												<CLabel htmlFor="icon" className="form-label col-sm-3">
													Icon
												</CLabel>
												<CInput
													type="text"
													className="form-control col-sm-8"
													id="icon"
													value={subMenuItems.icon}
													placeholder="cilNotes"
													onChange={(e) =>
														setSubMenuItems({
															...subMenuItems,
															icon: e.currentTarget.value,
														})
													}
												/>
											</CInputGroup>
										</CCardBody>
										<div className="d-flex justify-content-center mb-2">
											{!subEdit && (
												<CButton
													className="btn btn-primary col-sm-2 btn-sm"
													onClick={handleSubmitSubMenu}
													size="sm"
												>
													+ Add
												</CButton>
											)}
											{subEdit && (
												<CButton
													className="btn btn-success col-sm-2 btn-sm"
													onClick={handleChangeSubMenu}
													size="sm"
												>
													Update
												</CButton>
											)}
										</div>
									</CCard>
								</CCol>

								<CCol xs="12" sm="6" md="12">
									<Table>
										<thead>
											<tr className="fs-sm">
												<th></th>
												<th>Menu</th>
												<th>Sub Menu</th>
												<th>Path</th>
												<th>Icon</th>
											</tr>
										</thead>
										<tbody>
											{subMenus.map((s, index) => (
												<tr key={s.id}>
													<td>{index + 1}</td>
													<td>{s.menu}</td>
													<td>{s.subMenu}</td>
													<td>{s.to}</td>
													<td>{s.icon}</td>
													<td>
														<CDropdown className="btn-sm">
															<CDropdownToggle
																color="secondary"
																size="sm"
																onClick={null}
															>
																...
															</CDropdownToggle>
															<CDropdownMenu size="md">
																<CDropdownItem
																	Style="cursor: pointer;"
																	onClick={() => showSub(s)}
																>
																	Change
																</CDropdownItem>
															</CDropdownMenu>
														</CDropdown>
													</td>
												</tr>
											))}
										</tbody>
									</Table>
								</CCol>
								{/* <CCol xs="12" sm="6" md="4">
									<CCard>
										<CCardHeader>
											Card with icon
											<div className="card-header-actions">
												<CIcon name="cil-check" className="float-right" />
											</div>
										</CCardHeader>
										<CCardBody>
											Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
											sed diam nonummy nibh euismod tincidunt ut laoreet dolore
											magna aliquam erat volutpat.Ut wisi enim ad minim veniam,
											quis nostrud exerci tation ullamcorper suscipit lobortis
											nisl ut aliquip ex ea commodo consequat.
										</CCardBody>
									</CCard>
								</CCol> */}
								{/* <CCol xs="12" sm="6" md="4">
									<CCard>
										<CCardHeader>
											Card with switch
											<div className="card-header-actions">
												<CSwitch
													className={'float-right mb-0'}
													color={'info'}
													defaultChecked
													size={'sm'}
													tabIndex="0"
												/>
											</div>
										</CCardHeader>
										<CCardBody>
											Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
											sed diam nonummy nibh euismod tincidunt ut laoreet dolore
											magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
											quis nostrud exerci tation ullamcorper suscipit lobortis
											nisl ut aliquip ex ea commodo consequat.
										</CCardBody>
									</CCard>
								</CCol> */}
								{/* <CCol xs="12" sm="6" md="4">
									<CCard>
										<CCardHeader>
											Card with label
											<div className="card-header-actions">
												<CBadge color="success" className="float-right">
													Success
												</CBadge>
											</div>
										</CCardHeader>
										<CCardBody>
											Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
											sed diam nonummy nibh euismod tincidunt ut laoreet dolore
											magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
											quis nostrud exerci tation ullamcorper suscipit lobortis
											nisl ut aliquip ex ea commodo consequat.
										</CCardBody>
									</CCard>
								</CCol> */}
								<CCol xs="12" sm="6" md="4">
									{/*<CCard>
										<CCardHeader>
											Card with label
											<div className="card-header-actions">
												<CBadge
													shape="pill"
													color="danger"
													className="float-right"
												>
													42
												</CBadge>
											</div>
										</CCardHeader>
										<CCardBody>
											Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
											sed diam nonummy nibh euismod tincidunt ut laoreet dolore
											magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
											quis nostrud exerci tation ullamcorper suscipit lobortis
											nisl ut aliquip ex ea commodo consequat.
										</CCardBody>
									</CCard> */}
								</CCol>
							</CRow>
						</CFormGroup>
					</CModalBody>
				</CModal>
			</div>
		</div>
	);
};

export default MainMenu;
