/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react'
import styles from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../../Actions/AuthAction'

function Header({ showPrice }) {
	const [scrolled, setScrolled] = useState(false)

	const navigate = useNavigate()
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const currentUser = useSelector(state => state.auth.user)
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const dispatch = useDispatch()

	// State to manage the visibility of the dropdown
	function handleScroll() {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop
		if (scrollTop > 50) {
			setScrolled(true)
		} else {
			setScrolled(false)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)

		if (isAuthenticated) {
			setMenuOpen(false)
			setShowCloseButton(false)
		}
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const [menuOpen, setMenuOpen] = useState(false)
	const [showCloseButton, setShowCloseButton] = useState(false)

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
		setMenuOpen(!menuOpen)
	}

	const logOutHandler = () => {
		navigate('/login')
		setMenuOpen(!menuOpen)
		setShowCloseButton(!showCloseButton)
		dispatch(logout())
	}

	return (
		<nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} `}>
			<ul>
				<li>
					<h3
						style={{ fontSize: '1.2em', margin: 0, padding: 0 }}
						className={styles.hightlight}>
						SMART
					</h3>
					<p className={styles.subhead} style={{ margin: 0, padding: 0 }}>
						Account Book
					</p>
				</li>

				<li>
					<a className={styles.contact}>
						Contact Us: +94716972318 /+94742625427
					</a>
				</li>
				<li>
					<a className={styles.contact} href="https://scitglobal.com/">
						Web : www.scitglobal.com
					</a>
				</li>

				{isAuthenticated && currentUser.status === 1 && (
					<li className={styles.hideOnMobile}>
						<Link to="/" id="home" style={{ textDecorationLine: 'none' }}>
							Home
						</Link>
					</li>
				)}
				{isAuthenticated && currentUser.expansePermission === 'yes' && (
					<li className={styles.hideOnMobile}>
						<Link to="/payment" id="about">
							Expense
						</Link>
					</li>
				)}
				{isAuthenticated && currentUser.receiptPermission === 'yes' && (
					<li className={styles.hideOnMobile}>
						<Link to="/receipt" id="services">
							Receipt
						</Link>
					</li>
				)}
				{isAuthenticated && currentUser.advancePermission === 'yes' && (
					<li className={styles.hideOnMobile}>
						<Link to="/advance" id="services">
							Advance
						</Link>
					</li>
				)}
				{isAuthenticated && currentUser.loanPermission === 'yes' && (
					<li className={styles.hideOnMobile}>
						<Link to="/loan" id="services">
							Loan
						</Link>
					</li>
				)}
				{isAuthenticated && currentUser.isAdmin === 1 && (
					<li className={styles.hideOnMobile}>
						<Link to="/users" id="projects">
							Users
						</Link>
					</li>
				)}

				{isAuthenticated && (
					<li className={styles.hideOnMobile}>
						<Link to="/login" onClick={logOutHandler}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24">
								<path
									fill="red"
									d="M440-440v-400h80v400h-80Zm40 320q-74 0-139.5-28.5T226-226q-49-49-77.5-114.5T120-480q0-80 33-151t93-123l56 56q-48 40-75 97t-27 121q0 116 82 198t198 82q117 0 198.5-82T760-480q0-64-26.5-121T658-698l56-56q60 52 93 123t33 151q0 74-28.5 139.5t-77 114.5q-48.5 49-114 77.5T480-120Z"
								/>
							</svg>
						</Link>
					</li>
				)}

				{!isAuthenticated && showPrice && (
					<li className={styles.hideOnMobile}>
						<Link to="/login">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24">
								<path
									fill="white"
									d="M440-440v-400h80v400h-80Zm40 320q-74 0-139.5-28.5T226-226q-49-49-77.5-114.5T120-480q0-80 33-151t93-123l56 56q-48 40-75 97t-27 121q0 116 82 198t198 82q117 0 198.5-82T760-480q0-64-26.5-121T658-698l56-56q60 52 93 123t33 151q0 74-28.5 139.5t-77 114.5q-48.5 49-114 77.5T480-120Z"
								/>
							</svg>
						</Link>
					</li>
				)}

				{!isAuthenticated && !showPrice && (
					<li className={styles.hideOnMobile}>
						<Link to="/pricing">
							<h4>$</h4>
						</Link>
					</li>
				)}
			</ul>

			<ul
				className={
					isSidebarOpen ? `${styles.sidebar} ${styles.open}` : styles.sidebar
				}>
				<li>
					<a>
						<svg
							onClick={() => {
								setIsSidebarOpen(!isSidebarOpen)
								setMenuOpen(!menuOpen)
							}}
							xmlns="http://www.w3.org/2000/svg"
							height="26"
							viewBox="0 -960 960 960"
							width="26">
							<path
								fill="black"
								d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
							/>
						</svg>
					</a>
				</li>

				{isAuthenticated && (
					<li
						onClick={() => {
							setIsSidebarOpen(!isSidebarOpen)
							setMenuOpen(!menuOpen)
						}}>
						<Link to="/" style={{ textDecorationLine: 'none' }}>
							Home
						</Link>
					</li>
				)}
				{isAuthenticated && currentUser.expansePermission === 'yes' && (
					<li
						onClick={() => {
							setIsSidebarOpen(!isSidebarOpen)
							setMenuOpen(!menuOpen)
						}}>
						<Link to="/payment" style={{ textDecorationLine: 'none' }}>
							Expense
						</Link>
					</li>
				)}
				{isAuthenticated && currentUser.receiptPermission === 'yes' && (
					<li
						onClick={() => {
							setIsSidebarOpen(!isSidebarOpen)
							setMenuOpen(!menuOpen)
						}}>
						<Link to="/receipt" style={{ textDecorationLine: 'none' }}>
							Receipt
						</Link>
					</li>
				)}
				{isAuthenticated && currentUser.advancePermission === 'yes' && (
					<li
						onClick={() => {
							setIsSidebarOpen(!isSidebarOpen)
							setMenuOpen(!menuOpen)
						}}>
						<Link to="/advance" style={{ textDecorationLine: 'none' }}>
							Advance
						</Link>
					</li>
				)}
				{isAuthenticated && currentUser.loanPermission === 'yes' && (
					<li
						onClick={() => {
							setIsSidebarOpen(!isSidebarOpen)
							setMenuOpen(!menuOpen)
						}}>
						<Link to="/loan" style={{ textDecorationLine: 'none' }}>
							Loan
						</Link>
					</li>
				)}
				{isAuthenticated && currentUser.isAdmin === 1 && (
					<li
						onClick={() => {
							setIsSidebarOpen(!isSidebarOpen)
							setMenuOpen(!menuOpen)
						}}>
						<Link to="/users" style={{ textDecorationLine: 'none' }}>
							Users
						</Link>
					</li>
				)}
				{isAuthenticated && (
					<li
						onClick={() => {
							setIsSidebarOpen(!isSidebarOpen)
							setMenuOpen(!menuOpen)
						}}>
						<Link
							to="/login"
							onClick={logOutHandler}
							style={{ textDecorationLine: 'none' }}>
							Logout
						</Link>
					</li>
				)}
			</ul>
		</nav>
	)
}

export default Header
