import React, { useEffect, useState } from 'react'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Col,
	Container,
	ListGroup,
	Row
} from 'react-bootstrap'
import styles from './Priceing.module.css'

import { FaCheck } from 'react-icons/fa'

const Priceing = () => {
	const [selectMethode, setSelectMethode] = useState(true)

	return (
		<Container className="" style={{ paddingTop: '6vh', paddingBottom: '2vh' }}>
			<Row className="mx-auto mb-3">
				<Col className="d-flex justify-content-center align-items-center">
					<h3
						style={{ cursor: 'pointer' }}
						className="text-light me-2 "
						onClick={() => setSelectMethode(prev => !prev)}>
						Monthly
						{selectMethode && (
							<div className="bg-light mt-1" style={{ height: '2px' }}></div>
						)}
					</h3>

					<h3
						style={{ cursor: 'pointer' }}
						className="text-light ms-2 "
						onClick={() => setSelectMethode(prev => !prev)}>
						Annualy{' '}
						{!selectMethode && (
							<div className="bg-light mt-1" style={{ height: '2px' }}></div>
						)}
					</h3>
				</Col>
			</Row>
			<Row>
				<Col
					md={6}
					lg={4}
					xl={3}
					className="pb-2"
					style={{ cursor: 'pointer' }}>
					<Card className={styles.card}>
						<Card.Header className="text-center py-2 px-2">
							<h3>Free</h3>
						</Card.Header>
						<CardBody>
							<p className="p-1">You can use this free choice for 1 hour</p>

							<h1 className="mx-auto">$0</h1>

							<p className="px-1 py-1">You are the only user</p>

							<Button
								variant="dark w-100"
								className="py-2 mx-auto "
								style={{ fontWeight: 'bold' }}>
								Get Started
							</Button>

							<p className="px-1 py-2">Features you can get</p>

							<ListGroup variant="flush">
								<ListGroup.Item
									className="d-flex justify-content-start p-1 ms-4"
									variant="flush">
									<FaCheck className="m-1" />
									<p className="ms-2">1 user</p>
								</ListGroup.Item>
								<ListGroup.Item
									className="d-flex justify-content-start p-1 ms-4"
									variant="flush">
									<FaCheck className="m-1" />
									<p className="ms-2">Payment Management</p>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-start p-1 ms-4">
									<FaCheck className="m-1" />
									<p className="ms-2">Receipt Management</p>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-start p-1 ms-4">
									<FaCheck className="m-1" />
									<p className="ms-2">Loan Management</p>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-start p-1 ms-4">
									<FaCheck className="m-1" />
									<p className="ms-2">Advance Management</p>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-start p-1 ms-4">
									<FaCheck className="m-1" />
									<p className="ms-2">Line & Pie Chart</p>
								</ListGroup.Item>
							</ListGroup>
						</CardBody>
					</Card>
				</Col>
				<Col
					md={6}
					lg={4}
					xl={3}
					className="pb-2"
					style={{ cursor: 'pointer' }}>
					<Card className={styles.card}>
						<Card.Header className="text-center py-2 px-2">
							<h3>Basic</h3>
						</Card.Header>
						<CardBody>
							<p className="p-1">You can use this free choice for 1 hour</p>

							<h1 className="mx-auto">$0</h1>

							<p className="px-1 py-1">You are the only user</p>

							<Button
								variant="dark w-100"
								className="py-2 mx-auto "
								style={{ fontWeight: 'bold' }}>
								Get Started
							</Button>

							<p className="px-1 py-2">Features you can get</p>

							<ListGroup variant="flush">
								<ListGroup.Item
									className="d-flex justify-content-start p-1 ms-4"
									variant="flush">
									<FaCheck className="m-1" />
									<p className="ms-2">1 user</p>
								</ListGroup.Item>
								<ListGroup.Item
									className="d-flex justify-content-start p-1 ms-4"
									variant="flush">
									<FaCheck className="m-1" />
									<p className="ms-2">Payment Management</p>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-start p-1 ms-4">
									<FaCheck className="m-1" />
									<p className="ms-2">Receipt Management</p>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-start p-1 ms-4">
									<FaCheck className="m-1" />
									<p className="ms-2">Loan Management</p>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-start p-1 ms-4">
									<FaCheck className="m-1" />
									<p className="ms-2">Advance Management</p>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-start p-1 ms-4">
									<FaCheck className="m-1" />
									<p className="ms-2">Line & Pie Chart</p>
								</ListGroup.Item>
							</ListGroup>
						</CardBody>
					</Card>
				</Col>

				<Col
					md={6}
					lg={4}
					xl={3}
					className="pb-2"
					style={{ cursor: 'pointer' }}>
					<Card className={styles.card}>
						<Card.Header className="text-center py-2 px-2">
							<h3>Pro</h3>
						</Card.Header>
						<CardBody>
							<p className="p-1">You can use this free choice for 1 hour</p>

							<h1 className="mx-auto">$0</h1>

							<p className="px-1 py-1">You are the only user</p>

							<Button
								variant="dark w-100"
								className="py-2 mx-auto "
								style={{ fontWeight: 'bold' }}>
								Get Started
							</Button>

							<p className="px-1 py-2">Features you can get</p>

							<ListGroup variant="flush">
								<ListGroup.Item
									className="d-flex justify-content-start p-1 ms-4"
									variant="flush">
									<FaCheck className="m-1" />
									<p className="ms-2">1 user</p>
								</ListGroup.Item>
								<ListGroup.Item
									className="d-flex justify-content-start p-1 ms-4"
									variant="flush">
									<FaCheck className="m-1" />
									<p className="ms-2">Payment Management</p>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-start p-1 ms-4">
									<FaCheck className="m-1" />
									<p className="ms-2">Receipt Management</p>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-start p-1 ms-4">
									<FaCheck className="m-1" />
									<p className="ms-2">Loan Management</p>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-start p-1 ms-4">
									<FaCheck className="m-1" />
									<p className="ms-2">Advance Management</p>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-start p-1 ms-4">
									<FaCheck className="m-1" />
									<p className="ms-2">Line & Pie Chart</p>
								</ListGroup.Item>
							</ListGroup>
						</CardBody>
					</Card>
				</Col>

				<Col
					md={6}
					lg={4}
					xl={3}
					className="pb-2"
					style={{ cursor: 'pointer' }}>
					<Card className={styles.card}>
						<Card.Header className="text-center py-2 px-2">
							<h3>Business</h3>
						</Card.Header>
						<CardBody>
							<p className="p-1">You can use this free choice for 1 hour</p>

							<h1 className="mx-auto">$0</h1>

							<p className="px-1 py-1">You are the only user</p>

							<Button
								variant="dark w-100"
								className="py-2 mx-auto "
								style={{ fontWeight: 'bold' }}>
								Get Started
							</Button>

							<p className="px-1 py-2">Features you can get</p>

							<ListGroup variant="flush">
								<ListGroup.Item
									className="d-flex justify-content-start p-1 ms-4"
									variant="flush">
									<FaCheck className="m-1" />
									<p className="ms-2">1 user</p>
								</ListGroup.Item>
								<ListGroup.Item
									className="d-flex justify-content-start p-1 ms-4"
									variant="flush">
									<FaCheck className="m-1" />
									<p className="ms-2">Payment Management</p>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-start p-1 ms-4">
									<FaCheck className="m-1" />
									<p className="ms-2">Receipt Management</p>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-start p-1 ms-4">
									<FaCheck className="m-1" />
									<p className="ms-2">Loan Management</p>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-start p-1 ms-4">
									<FaCheck className="m-1" />
									<p className="ms-2">Advance Management</p>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-start p-1 ms-4">
									<FaCheck className="m-1" />
									<p className="ms-2">Line & Pie Chart</p>
								</ListGroup.Item>
							</ListGroup>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default Priceing
