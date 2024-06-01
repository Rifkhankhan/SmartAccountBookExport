// import React from 'react';
// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function PaginationTable () {
// 	// Sample data, replace it with your actual data
//   const data = [
//     {
//       id: 1,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 2,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 3,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 4,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 5,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 6,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 7,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 8,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 9,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 10,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 11,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 12,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 13,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 14,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 15,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 16,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 17,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 18,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 19,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 20,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     }
// 		// Add more rows as needed
//   ];

// 	// Table columns
//   const columns = [
// 		{ dataField: 'id', text: '#' },
// 		{ dataField: 'column1', text: 'Column 1' },
// 		{ dataField: 'column2', text: 'Column 2' },
// 		{ dataField: 'column3', text: 'Column 3' }
//   ];

// 	// Pagination options
//   const paginationOptions = {
//     sizePerPageList: [
// 			{ text: '5', value: 5 },
// 			{ text: '10', value: 10 },
// 			{ text: 'All', value: data.length }
//     ],
//     showTotal: true,
//     paginationSize: 3
//   };

//   return (
//     <div className='container'>
//       <BootstrapTable
//         keyField='id'
//         data={data}
//         columns={columns}
//         pagination={paginationFactory(paginationOptions)}
// 			/>
//     </div>
//   );
// }

// export default PaginationTable;

// table 2

// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function PaginationTable () {
// 	// Sample data, replace it with your actual data
//   const data = [
//     {
//       id: 1,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 2,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 3,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 4,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 5,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 6,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 7,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 8,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 9,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 10,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 11,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 12,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 13,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 14,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 15,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 16,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 17,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 18,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 19,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 20,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     }
// 		// Add more rows as needed
//   ];

// 	// Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5; // Number of items per page

// 	// Calculate current items
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

// 	// Change page
//   const paginate = pageNumber => setCurrentPage(pageNumber);

// 	// Render pagination buttons
//   const renderPaginationButtons = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
//       pageNumbers.push(
//         <button
//           key={i}
//           onClick={() => paginate(i)}
//           className={`btn ${currentPage === i ? 'btn-primary' : 'btn-light'}`}
// 				>
//           {i}
//         </button>
// 			);
//     }
//     return pageNumbers;
//   };

//   return (
//     <div className='container'>
//       <h2>Bootstrap Pagination Table</h2>
//       <table className='table table-bordered'>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Column 1</th>
//             <th>Column 2</th>
//             <th>Column 3</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map(item =>
//             <tr key={item.id}>
//               <td>
//                 {item.id}
//               </td>
//               <td>
//                 {item.column1}
//               </td>
//               <td>
//                 {item.column2}
//               </td>
//               <td>
//                 {item.column3}
//               </td>
//             </tr>
// 					)}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td colSpan='5' className='text-center'>
//               {renderPaginationButtons()}
//             </td>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   );
// }

// export default PaginationTable;

// table 3

// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function PaginationTable () {
// 	// Sample data, replace it with your actual data
//   const data = [
//     {
//       id: 1,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 2,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 3,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 4,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 5,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 6,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 7,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 8,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 9,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 10,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 11,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 12,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 13,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 14,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 15,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 16,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 17,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 18,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 19,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 20,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     }
// 		// Add more rows as needed
//   ];

// 	// Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(1);

// 	// Calculate current items
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

// 	// Change page
//   const paginate = pageNumber => setCurrentPage(pageNumber);

// 	// Change items per page
//   const handleItemsPerPageChange = e => {
//     setItemsPerPage(parseInt(e.target.value));
//     setCurrentPage(1); // Reset to first page when changing items per page
//   };

// 	// Render pagination buttons
//   const renderPaginationButtons = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
//       pageNumbers.push(
//         <button
//           key={i}
//           onClick={() => paginate(i)}
//           className={`btn ${currentPage === i ? 'btn-primary' : 'btn-light'}`}
// 				>
//           {i}
//         </button>
// 			);
//     }
//     return pageNumbers;
//   };

//   return (
//     <div className='container'>
//       <h2>Bootstrap Pagination Table</h2>
//       <div className='row mb-3'>
//         <div className='col-auto'>
//           <label className='mr-2'>Rows per page:</label>
//           <select
//             value={itemsPerPage}
//             onChange={handleItemsPerPageChange}
//             className='form-control form-control-sm'
// 					>
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={15}>15</option>
//             {/* Add more options as needed */}
//           </select>
//         </div>
//       </div>
//       <table className='table table-bordered'>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Column 1</th>
//             <th>Column 2</th>
//             <th>Column 3</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map(item =>
//             <tr key={item.id}>
//               <td>
//                 {item.id}
//               </td>
//               <td>
//                 {item.column1}
//               </td>
//               <td>
//                 {item.column2}
//               </td>
//               <td>
//                 {item.column3}
//               </td>
//             </tr>
// 					)}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td colSpan='5' className='text-center'>
//               {renderPaginationButtons()}
//             </td>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   );
// }

// export default PaginationTable;

// table 4

// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function PaginationTable () {
// 	// Sample data, replace it with your actual data
//   const data = [
//     {
//       id: 1,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 2,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 3,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 4,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 5,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 6,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 7,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 8,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 9,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 10,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 11,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 12,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 13,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 14,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 15,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 16,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 17,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 18,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 19,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 20,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     }
// 		// Add more rows as needed
//   ];

// 	// Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(2);
//   const paginationNumbersLimit = 5; // Adjust this number to limit the pagination numbers displayed

// 	// Calculate current items
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

// 	// Change page
//   const paginate = pageNumber => setCurrentPage(pageNumber);

// 	// Change items per page
//   const handleItemsPerPageChange = e => {
//     setItemsPerPage(parseInt(e.target.value));
//     setCurrentPage(1); // Reset to first page when changing items per page
//   };

// 	// Render pagination buttons
//   const renderPaginationButtons = () => {
//     const totalPageCount = Math.ceil(data.length / itemsPerPage);
//     const currentPageIndex = currentPage - 1;
//     const startPageIndex = Math.max(
// 			currentPageIndex - Math.floor(paginationNumbersLimit / 2),
// 			0
// 		);
//     const endPageIndex = Math.min(
// 			startPageIndex + paginationNumbersLimit,
// 			totalPageCount
// 		);

//     const pageNumbers = [];
//     for (let i = startPageIndex + 1; i <= endPageIndex; i++) {
//       pageNumbers.push(
//         <button
//           key={i}
//           onClick={() => paginate(i)}
//           className={`btn ${currentPage === i ? 'btn-primary' : 'btn-light'}`}
// 				>
//           {i}
//         </button>
// 			);
//     }
//     return pageNumbers;
//   };

//   return (
//     <div className='container'>
//       <div className='row mb-3'>
//         <div className='col-auto'>
//           <label className='mr-2 text-light'>Rows per page</label>
//           <select
//             value={itemsPerPage}
//             onChange={handleItemsPerPageChange}
//             className='form-control form-control-sm'
// 					>
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={15}>15</option>
//             {/* Add more options as needed */}
//           </select>
//         </div>
//       </div>
//       <table className='table table-bordered'>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Column 1</th>
//             <th>Column 2</th>
//             <th>Column 3</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map(item =>
//             <tr key={item.id}>
//               <td>
//                 {item.id}
//               </td>
//               <td>
//                 {item.column1}
//               </td>
//               <td>
//                 {item.column2}
//               </td>
//               <td>
//                 {item.column3}
//               </td>
//             </tr>
// 					)}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td colSpan='5' className='text-center'>
//               {renderPaginationButtons()}
//             </td>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   );
// }

// export default PaginationTable;

// table with date filter
import styles from './PaginationTable.module.css'
import React, { useLayoutEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import jsPDF from 'jspdf'
import image from './../../Images/SCIT_LOGO.png'

import 'jspdf-autotable'
import { useSelector } from 'react-redux'
function PaginationTable({
	list,
	handleModel,
	tableType,
	companies,
	userCompanies,
	selectedCompany
}) {
	useLayoutEffect(() => {
		if (tableType) {
			setInitialData([
				...calculateBalance().filter(
					request => request.requestType === tableType
				)
			])
			setData([
				...calculateBalance().filter(
					request => request.requestType === tableType
				)
			])
		} else {
			setInitialData([...calculateBalance()])
			setData([...calculateBalance()])
		}
	}, [list])

	// Function to calculate balance
	const calculateBalance = () => {
		let balance = 0
		return list.map(transaction => {
			// Update balance based on transaction type

			if (
				transaction.requestType === 'receipt' ||
				transaction.requestForm === 'got'
			) {
				balance += +transaction.amount
			} else {
				balance -= +transaction.amount
			}
			// Add balance property to transaction object
			return { ...transaction, balance }
		})
	}

	// State variables
	const [initialData, setInitialData] = useState()
	const [data, setData] = useState()
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(5)
	const [startDate, setStartDate] = useState(null)
	const [endDate, setEndDate] = useState(null)

	// Calculate current items
	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem)
	// Change page
	const paginate = pageNumber => setCurrentPage(pageNumber)

	// Change items per page
	const handleItemsPerPageChange = e => {
		setItemsPerPage(parseInt(e.target.value))
		setCurrentPage(1) // Reset to first page when changing items per page
	}

	// Filter data by date range
	const handleDateFilter = () => {
		const filteredData = initialData?.filter(item => {
			const itemDate = new Date(item.date)
			return (
				(!startDate || itemDate >= startDate) &&
				(!endDate || itemDate <= endDate)
			)
		})
		setData(filteredData)
		setCurrentPage(1)
	}

	// Reset date filter
	const resetDateFilter = () => {
		setData(initialData)
		setStartDate(null)
		setEndDate(null)
		setCurrentPage(1)
	}

	// Render pagination buttons
	const renderPaginationButtons = () => {
		const totalPageCount = Math.ceil(data?.length / itemsPerPage)
		const pageNumbers = []
		for (let i = 1; i <= totalPageCount; i++) {
			pageNumbers.push(
				<button
					key={i}
					onClick={() => paginate(i)}
					className={`btn ${currentPage === i ? 'btn-primary' : 'btn-light'}`}>
					{i}
				</button>
			)
		}
		return pageNumbers
	}

	// export pdf
	const exportPdf = async () => {
		// Get current date
		const currentDate = new Date()

		// Format the date as needed (e.g., YYYY-MM-DD)
		const formattedDate = currentDate.toISOString().slice(0, 10) // This will give you the date in YYYY-MM-DD format

		const doc = new jsPDF({ orientation: 'landscape' })
		const logo = new Image()
		logo.src = image // Provide the path to your logo image
		doc.addImage(logo, 'PNG', 15, 10, 30, 30) // Adjust coordinates and dimensions as needed
		// Add other custom elements
		doc.setFontSize(16)
		doc.text('Date: ' + formattedDate, 200, 15)
		doc.text('Smart Account Book', 50, 15)

		doc.text(
			`${companies.find(comp => +comp.cid === +selectedCompany)?.name}`,
			50,
			35
		)
		// Add the date to the PDF document
		if (tableType === undefined) {
			doc.text('Summary Report', 50, 25)
		} else if (tableType === 'expense') {
			doc.text('Expense Report', 50, 25)
		} else if (tableType === 'receipt') {
			doc.text('Income Report', 50, 25)
		} else if (tableType === 'loan') {
			doc.text('Loan Report', 50, 25)
		} else if (tableType === 'advance') {
			doc.text('Advance Report', 50, 25)
		}
		doc.autoTable({ html: '#table', startY: 50 }) // Adjust startY as needed
		const currentTimeWithDate = converTime()
		if (tableType === undefined) {
			const filename = `Summary Report(${currentTimeWithDate}).pdf`
			doc.save(filename)
		} else {
			const filename = `${tableType}(${currentTimeWithDate}).pdf`

			doc.save(filename)
		}
	}
	const converTime = () => {
		const currentDate = new Date() // Get the current date and time

		const year = currentDate.getFullYear() // Get the year (YYYY)
		const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Get the month (MM), adding 1 because month is zero-indexed
		const day = String(currentDate.getDate()).padStart(2, '0') // Get the day (DD)

		const hours = String(currentDate.getHours()).padStart(2, '0') // Get the hours (HH)
		const minutes = String(currentDate.getMinutes()).padStart(2, '0') // Get the minutes (MM)
		const seconds = String(currentDate.getSeconds()).padStart(2, '0') // Get the seconds (SS)

		const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}` // Combine date and time with the T separator

		return formattedDateTime
	}
	// calculate the balance
	const handlePrint = () => {
		const currentDate = new Date()
		const formattedDate = currentDate.toISOString().slice(0, 10)

		const doc = new jsPDF({ orientation: 'landscape' })
		const logo = new Image()
		logo.src = image
		doc.addImage(logo, 'PNG', 15, 10, 30, 30)
		doc.setFontSize(16)
		doc.text('Date: ' + formattedDate, 200, 15)
		doc.text('Smart Account Book', 50, 15)

		doc.text(
			`${companies.find(comp => +comp.cid === +selectedCompany)?.name}`,
			50,
			35
		)
		if (tableType === undefined) {
			doc.text('Summary Report', 50, 25)
		} else if (tableType === 'expense') {
			doc.text('Expense Report', 50, 25)
		} else if (tableType === 'receipt') {
			doc.text('Income Report', 50, 25)
		} else if (tableType === 'loan') {
			doc.text('Loan Report', 50, 25)
		} else if (tableType === 'advance') {
			doc.text('Advance Report', 50, 25)
		}
		doc.autoTable({ html: '#table', startY: 50 }) // Adjust startY as needed

		// Print the PDF content directly
		doc.autoPrint()

		// Convert the PDF document to a data URL
		const pdfContentBase64 = doc.output('datauristring')

		// Open a new window and print the PDF content
		const printWindow = window.open('', '_blank')
		printWindow.document.write('<html><body>')
		printWindow.document.write(
			'<embed width="100%" height="100%" src="' +
				pdfContentBase64 +
				'" type="application/pdf" />'
		)
		printWindow.document.write(
			'<script>window.onload = function() { window.print(); }</script>'
		) // Print when fully loaded
		printWindow.document.write('</body></html>')
	}

	const currentUser = useSelector(state => state.auth.user)

	return (
		<div className={`container-fluid my-3 ${styles.tableContainer}`}>
			<div className="row">
				<div className="col-auto m-1">
					<select
						value={itemsPerPage}
						onChange={handleItemsPerPageChange}
						className="form-control form-control-sm">
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
						<option value={initialData?.length}>All</option>
						{/* Add more options as needed */}
					</select>
				</div>

				<div className="col-auto">
					<DatePicker
						dateFormat="dd/MM/yyyy"
						placeholderText="Start Date"
						selected={startDate}
						onChange={date => setStartDate(date)}
						className="form-control form-control-sm m-1"
					/>
				</div>

				<div className="col-auto">
					<DatePicker
						dateFormat="dd/MM/yyyy"
						placeholderText="End Date"
						selected={endDate}
						onChange={date => setEndDate(date)}
						className="form-control form-control-sm m-1"
					/>
				</div>

				<div className="col-auto">
					<button
						onClick={handleDateFilter}
						className="btn btn-primary btn-sm m-1">
						Apply Filter
					</button>
					<button
						onClick={resetDateFilter}
						className="btn btn-secondary btn-sm m-1">
						Reset Filter
					</button>
				</div>
				<div className="col-auto">
					{currentUser.epp === 'yes' && (
						<button
							onClick={exportPdf}
							className="btn btn-secondary btn-sm m-1">
							Download
						</button>
					)}
					{currentUser.pp === 'yes' && (
						<button
							onClick={handlePrint}
							className="btn btn-primary btn-sm m-1">
							Print
						</button>
					)}
				</div>
			</div>
			<table className={`table table-bordered table-hover `} id="table">
				<thead>
					<tr>
						<th>#</th>
						<th>Date</th>
						<th>Company</th>
						<th>Amount</th>

						{tableType === 'receipt' ? (
							<th>Capital / Income</th>
						) : tableType === 'advance' || tableType === 'loan' ? (
							<th>Paid / Received</th>
						) : (
							<th>Category</th>
						)}
						<th>Payment Type</th>

						<th>Balance</th>
					</tr>
				</thead>
				<tbody>
					{currentItems?.map((item, index) => (
						<tr
							key={item}
							onClick={() => {
								handleModel(item)
							}}>
							<td>{index + 1}</td>
							<td>{new Date(item.date).toISOString().split('T')[0]}</td>
							<td>
								{companies.find(comp => comp.cid === item?.cid)?.name
									? companies.find(comp => comp.cid === item?.cid)?.name
									: 'None'}
							</td>
							<td style={{ textTransform: 'capitalize' }}>{item.amount}</td>

							{tableType === 'receipt' ? (
								<td style={{ textTransform: 'capitalize' }}>
									{item.requestForm === 'cash' ? 'Income' : 'Capital'}
								</td>
							) : tableType === 'advance' || tableType === 'loan' ? (
								<td style={{ textTransform: 'capitalize' }}>
									{item.requestForm === 'got' ? 'Received' : item.requestForm}
								</td>
							) : (
								<td style={{ textTransform: 'capitalize' }}>
									{item.requestForm}
								</td>
							)}
							<td style={{ textTransform: 'capitalize' }}>
								{item.methode === 'transfer'
									? 'Bank Transfer'
									: item.methode === 'deposite'
									? 'Bank Deposite'
									: item.methode}
							</td>
							<td style={{ textTransform: 'capitalize' }}>{item.balance}</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan="7" className="text-right">
							{renderPaginationButtons()}
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	)
}

export default PaginationTable
