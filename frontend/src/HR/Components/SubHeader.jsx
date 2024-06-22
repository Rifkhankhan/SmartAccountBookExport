import React from 'react'
import {  ListGroup, Row } from 'react-bootstrap'
import styles from './SubHeader.module.css'

const SubHeader = () => {
  return (
      <Row className='w-75'   style={{paddingTop:'60px',marginInline:'auto'}}>
        <ListGroup variant='flush' horizontal className={`w-100 ${styles.custom_scroll}`}  style={{marginInline:'auto',overflowX:'auto'}}>
            <ListGroup.Item>
              Dashboard
            </ListGroup.Item>
            <ListGroup.Item>
              Employees
            </ListGroup.Item>
            <ListGroup.Item>
              Attendanve
            </ListGroup.Item>
            <ListGroup.Item>
              Salary
            </ListGroup.Item>
            <ListGroup.Item>
              Dashboard
            </ListGroup.Item>
            <ListGroup.Item>
              Dashboard
            </ListGroup.Item>

            <ListGroup.Item>
              Dashboard
            </ListGroup.Item>

            <ListGroup.Item>
              Employees
            </ListGroup.Item>
            <ListGroup.Item>
              Attendanve
            </ListGroup.Item>
            <ListGroup.Item>
              Salary
            </ListGroup.Item>
        </ListGroup>
      </Row>
  )
}

export default SubHeader
