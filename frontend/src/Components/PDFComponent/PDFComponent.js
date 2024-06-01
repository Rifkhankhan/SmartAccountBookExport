import React from 'react';
import {
	PDFDownloadLink,
	PDFViewer,
	Document,
	Page,
	Text,
	View,
	StyleSheet
} from '@react-pdf/renderer';

// Sample data for the table
const data = [
	{ name: 'John Doe', age: 30, city: 'New York' },
	{ name: 'Jane Smith', age: 25, city: 'Los Angeles' },
	{ name: 'Michael Johnson', age: 35, city: 'Chicago' }
];

// Styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: 10
  },
  th: {
    backgroundColor: '#F0F0F0',
    border: '1px solid #000',
    padding: 5
  },
  td: {
    border: '1px solid #000',
    padding: 5
  }
});

// Component to render the PDF document
const PDFDocument = () =>
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.section}>
        <Text>Sample Table PDF</Text>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Age</th>
              <th style={styles.th}>City</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) =>
              <tr key={index}>
                <td style={styles.td}>
                  {row.name}
                </td>
                <td style={styles.td}>
                  {row.age}
                </td>
                <td style={styles.td}>
                  {row.city}
                </td>
              </tr>
						)}
          </tbody>
        </table>
      </View>
    </Page>
  </Document>;

// Component to render the PDF document and download link
const PDFComponent = () =>
  <div>
    <PDFDownloadLink document={<PDFDocument />} fileName='table.pdf'>
      {({ blob, url, loading, error }) =>
				loading ? 'Loading document...' : 'Download PDF'}
    </PDFDownloadLink>
    <PDFViewer>
      <PDFDocument />
    </PDFViewer>
  </div>;

export default PDFComponent;
