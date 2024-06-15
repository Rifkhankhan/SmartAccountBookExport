import React, { useEffect, useState } from 'react'
import styles from './Users.module.css'

import { useDispatch, useSelector } from 'react-redux'
import CreateUser from '../../Components/CreateUser/CreateUser'
import UsersTable from '../../Components/UsersTable/UsersTable'
import Model from '../../Components/Model/Model'
import { getUserActivities, getUsers } from '../../Actions/userAction'
import ResetPasswordModel from '../../Components/ResetPasswordModel/ResetPasswordModel'
import DataActivityTable from '../../Components/DataActivityTable/DataActivityTable'
import UserActivityTable from '../../Components/UserActivityTable/UserActivityTable'
import swal from 'sweetalert'
import { logoutUserAccount } from '../../Actions/AuthAction'
import { getRequests, resetData } from '../../Actions/RequestActions'
import DeleteDataTable from '../../Components/DeleteDataTable/DeleteDataTable'
import CreateCompany from '../../Components/CreateCompany/CreateCompany'
import CompanyTable from '../../Components/CompanyTable/CompanyTable'
import { getcompanies } from '../../Actions/CompanyActions'

const Users = () => {
	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false)
	const [showPasswordModel, setPasswordModel] = useState(false)
	const [selectedUser, setSelectedUser] = useState()

	const users = useSelector(state => state.user.users)
	const requests = useSelector(state => state.request.requests)
	const companies = useSelector(state => state.company.companies)

	useEffect(() => {
		dispatch(getRequests())
		dispatch(getUserActivities())
		dispatch(getcompanies())
		dispatch(getUsers())
		// dispatch(get)
	}, [dispatch])

	const deleteRequests = useSelector(
		state => state.accountRequest.accountRequests
	).filter(data => +data.status === 0)

	const userActivities = useSelector(state => state.user.userActivities)

	// const currentUser = useSelector(state => state.auth.user)

	const handlePasswordModel = () => {
		setPasswordModel(current => !current)
	}

	const handleModel = () => {
		setShowModal(current => !current)
	}

	const getIdHandler = id => {
		console.log(id)
		setSelectedUser({ ...users.find(data => data.id === id) })
	}

	const handleConfirmation = id => {
		swal({
			title: 'Are you sure?',
			text: 'Are You Want to Logout This Account',
			icon: 'warning',
			buttons: ['No', 'Yes'],
			dangerMode: true
		}).then(confirm => {
			dispatch(logoutUserAccount(id))

			if (confirm) {
				swal('Success!', 'Account is Logout!', 'success')
			}
		})
	}

	const resetHandleConfirmation = item => {
		swal({
			title: 'Are you sure?',
			text: 'Are You Want to Reset This Data',
			icon: 'warning',
			buttons: ['No', 'Yes'],
			dangerMode: true
		}).then(confirm => {
			const data = {
				arid: item.arid,
				rid: item.rid
			}

			if (confirm) {
				dispatch(resetData(data))

				swal('Completed Your Request!', 'Successfully Reset!', 'success')
			}
		})
	}

	return (
		<div className={`container-fluid ${styles.home}`}>
			<div className="row">
				<div className="col-12 col-md-6">
					<CreateCompany header="Create a Company" />
					<CompanyTable initialData={companies} />
				</div>
				<div className="col-12 col-md-6">
					<CreateUser header="Create a User" companies={companies} />
				</div>
			</div>

			<div className="row" style={{ marginTop: '3vh', color: 'white' }}>
				<h2>Users</h2>
				<UsersTable
					initialData={users}
					handleModel={handleModel}
					getIdHandler={getIdHandler}
				/>
			</div>
			<div className="row" style={{ marginTop: '3vh', color: 'white' }}>
				<h2>Data Activities</h2>
				<DataActivityTable initialData={requests} />
			</div>

			<div className="row" style={{ marginTop: '3vh', color: 'white' }}>
				<h2>Deleted Datas</h2>
				<DeleteDataTable
					initialData={deleteRequests}
					resetHandleConfirmation={resetHandleConfirmation}
				/>
			</div>

			<div className="row" style={{ marginTop: '3vh', color: 'white' }}>
				<h2>User Activities</h2>
				<UserActivityTable
					initialData={userActivities}
					handleModel={handleModel}
					getIdHandler={getIdHandler}
					handleConfirmation={handleConfirmation}
				/>
			</div>
			{showModal && (
				<Model
					showModal={showModal}
					closeHandler={handleModel}
					selectedUser={selectedUser}
					companies={companies}
				/>
			)}

			{showPasswordModel && (
				<ResetPasswordModel
					selectedUser={selectedUser}
					showModal={showPasswordModel}
					closeHandler={handlePasswordModel}
				/>
			)}
		</div>
	)
}

export default Users
