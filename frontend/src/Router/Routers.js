import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Payment from '../Pages/Payment/Payment'
import Receipt from '../Pages/Receipt/Receipt'
import Users from '../Pages/Users/Users'
import Login from '../Pages/Login/Login'
import Advance from '../Pages/Advance/Advance'
import Loan from '../Pages/Loan/Loan'
import { useEffect, useRef, useState } from 'react'
import Header from '../Components/Header/Header'

import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner'
import { autoLogin, logout } from '../Actions/AuthAction'
import { getUserComponies } from '../Actions/CompanyActions'
import Priceing from '../Pages/Pricing/Priceing'

const Routers = () => {
	const dispatch = useDispatch()

	const location = useLocation()
	const [showPrice, setShowPrice] = useState(location.pathname === '/pricing')

	useEffect(() => {
		if (location.pathname === '/pricing') {
			setShowPrice(prev => !prev)
		} else {
			setShowPrice(prev => !prev)
		}
	}, [location.pathname])

	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const isLoading = useSelector(state => state.auth.isLoading)
	const currentUser = useSelector(state => state.auth.user)

	useEffect(() => {
		dispatch(autoLogin())
		if (isAuthenticated) {
			dispatch(getUserComponies(currentUser.id))
		}
	}, [dispatch, currentUser.id, isAuthenticated])

	const useIdleTimeout = (onTimeout, timeout = 15 * 60 * 1000) => {
		const timeoutRef = useRef(null)
		const eventHandler = () => {
			clearTimeout(timeoutRef.current)
			timeoutRef.current = setTimeout(onTimeout, timeout)
		}

		useEffect(() => {
			document.addEventListener('mousemove', eventHandler)
			document.addEventListener('keypress', eventHandler)

			timeoutRef.current = setTimeout(onTimeout, timeout)

			return () => {
				clearTimeout(timeoutRef.current)
				document.removeEventListener('mousemove', eventHandler)
				document.removeEventListener('keypress', eventHandler)
			}
		}, [onTimeout, timeout])

		return null
	}
	const handleLogout = () => {
		try {
			if (isAuthenticated) {
				dispatch(logout())
			}
		} catch (error) {
			console.error('Logout failed', error)
		}
	}

	useIdleTimeout(handleLogout)
	return (
		<>
			<Header showPrice={showPrice} />
			{isLoading && <LoadingSpinner />}
			<Routes>
				{
					<Route
						path="/login"
						element={!isAuthenticated ? <Login /> : <Home />}
					/>
				}

				<Route
					path="/"
					index
					element={isAuthenticated ? <Home /> : <Login to="/login" />}
				/>

				<Route
					path="/home"
					index
					element={isAuthenticated ? <Home /> : <Login to="/login" />}
				/>
				<Route
					path="/payment"
					element={isAuthenticated ? <Payment /> : <Login to="/login" />}
				/>
				<Route
					path="/receipt"
					element={isAuthenticated ? <Receipt /> : <Login to="/login" />}
				/>
				<Route
					path="/advance"
					element={isAuthenticated ? <Advance /> : <Login to="/login" />}
				/>
				<Route
					path="/loan"
					element={isAuthenticated ? <Loan /> : <Login to="/login" />}
				/>
				<Route path="/pricing" element={<Priceing />} />
				<Route
					path="/users"
					element={
						isAuthenticated && currentUser.isAdmin ? (
							<Users />
						) : isAuthenticated ? (
							<Users />
						) : (
							<Home />
						)
					}
				/>
			</Routes>
		</>
	)
}

export default Routers
