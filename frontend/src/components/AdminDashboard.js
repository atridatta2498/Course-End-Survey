import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackgroundVideo from './BackgroundVideo';  // Add this import
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import collegeLogo from '../images/srivasavi_logo.png';
import { API_ENDPOINTS } from '../config/api'; 
// Update DashboardContainer to include color white
const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  color: white;  // Add this line
  margin-bottom: 80px; // Add padding at bottom to prevent footer overlap
`;

const FilterSection = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: row; // Changed from column to row
  flex-wrap: wrap; // Allow wrapping on smaller screens
  gap: 20px;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  backdrop-filter: blur(10px);

  div {
    display: flex;
    align-items: center;
    gap: 10px;
    
    label {
      white-space: nowrap;
      color: white;
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    
    div {
      width: 100%;
      justify-content: space-between;
    }
  }
`;

const Select = styled.select`
  min-width: 150px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 16px;
  backdrop-filter: blur(5px);

  option {
    background: #2c3e50;
    color: white;
  }
`;

 
const ReportButton = styled.button`
width: 100%;
padding: 12px;
margin-top: 20px;
border: none;
border-radius: 4px;
background: linear-gradient(90deg,rgb(54, 113, 250) 0%,rgb(250, 9, 9) 100%);
color: white;
font-size: 16px;
cursor: pointer;
transition: opacity 0.3s;

&:hover {
  opacity: 0.9;
}
`;

const ResultsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;

  th, td {
    padding: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-align: left;
  }

  th {
    background: rgba(255, 255, 255, 0.2);
  }

  tr:nth-child(even) {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
`;
// Add these styled components with the other styled components at the top
const Header = styled.header`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;
const PageContainer = styled.div`
  margin-top: 30px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  width: 210mm;
  min-height: 297mm;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  page-break-after: always;
  color: white;
`;

const DownloadButton = styled.button`, 
  display: block;
  width: 200px;
  margin: 30px auto;
  padding: 12px 24px;
  background: linear-gradient(90deg, rgb(54, 113, 250) 0%, rgb(250, 9, 9) 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Play', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    background: linear-gradient(90deg, rgb(250, 9, 9) 0%, rgb(54, 113, 250) 100%);
  }

  &:active {
    transform: translateY(1px);
  }
`;
const SectionTitle = styled.h2`
  margin: 30px 0 15px;
  font-size: 24px;
  text-align: center;
  color: white;
`;

const CourseInfoTable = styled.table`
  width: 100%;
  margin: 20px 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  border-collapse: collapse;

  th, td {
    padding: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  th {
    text-align: right;
    width: 30%;
    background: rgba(255, 255, 255, 0.05);
  }
`;
const FooterText = styled.p`
  color: white;
  margin: 0;
  font-size: 16px;  // Fixed the font size from 2px to 14px

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 0 15px;
  }
`;

const TotalRegistrations = styled.div`
  margin: 20px 0;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  backdrop-filter: blur(10px);
`;

// Auto-refresh styled components
const AutoRefreshSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(0, 255, 0, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 0, 0.3);
  margin: 10px 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
    
    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + .slider {
    background-color: #2196F3;
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }
`;

const RefreshStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 14px;
  
  .status-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => props.active ? '#4CAF50' : '#f44336'};
    animation: ${props => props.active ? 'pulse 2s infinite' : 'none'};
  }
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const IntervalSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 14px;
  backdrop-filter: blur(5px);
  
  option {
    background: #2c3e50;
    color: white;
  }
`;

const AdminDashboard = () => {
  const [results, setResults] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSem, setSelectedSem] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [courseInfo, setCourseInfo] = useState({});
  
  // Auto-refresh state management
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  const [lastRefresh, setLastRefresh] = useState(null);

  // Add these calculation functions
  const calculateColumnAverage = (results, column) => {
    const nonZeroResponses = results.filter(r => Number(r[column]) !== 0);
    if (nonZeroResponses.length === 0) return 0;
    return (nonZeroResponses.reduce((sum, r) => sum + Number(r[column]), 0) / nonZeroResponses.length).toFixed(2);
  };

  // Update the calculateTotalAverage function
  const calculateTotalAverage = () => {
    let totalSum = 0;
    let totalCount = 0;
    ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'].forEach(col => {
      const nonZeroValues = results.filter(r => Number(r[col]) !== 0);
      if (nonZeroValues.length > 0) {
        totalSum += nonZeroValues.reduce((sum, r) => sum + Number(r[col]), 0);
        totalCount += nonZeroValues.length;
      }
    });
    return totalCount ? (totalSum / totalCount).toFixed(2) : '0.00';
  };

  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem('adminData'));
 
  
  const years = ['1', '2', '3', '4'];
  const semesters = {
    '1': ['1', '2'],
    '2': ['1', '2'],
    '3':['1', '2'],
    '4': ['1', '2'],
  };

  useEffect(() => {
    
    if (!adminData) {
      navigate('/admin');
      return;
    }
  }, [adminData, navigate]);

  // Auto-refresh effect
  useEffect(() => {
    let intervalId;
    
    if (autoRefresh && selectedSubject) {
      intervalId = setInterval(() => {
        fetchResults(selectedSubject);
        setLastRefresh(new Date());
      }, refreshInterval * 1000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoRefresh, refreshInterval, selectedSubject]);

  const handleYearChange = async (year) => {
    setSelectedYear(year);
    setSelectedSem('');
    setSubjects([]);
  };

  const handleSemChange = async (sem) => {
    setSelectedSem(sem);
    if (selectedYear && sem) {
      try {
        const params = {
          branch: adminData.branch,
          year: selectedYear,
          sem: sem
        };
        console.log('Fetching subjects with params:', params);

        const response = await fetch(
          `${API_ENDPOINTS.QUESTIONS}?branch=${encodeURIComponent(params.branch)}&year=${encodeURIComponent(params.year)}&sem=${encodeURIComponent(sem)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Server response:', errorText);
          throw new Error(`Failed to fetch subjects: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        if (!data || !data.questions || !Array.isArray(data.questions)) {
          throw new Error('Invalid data format received');
        }

        const uniqueSubjects = [...new Set(data.questions.map(q => q.sname))];
        console.log('Processed Subjects:', uniqueSubjects);
        setSubjects(uniqueSubjects);

      } catch (error) {
        console.error('Error fetching subjects:', error);
        setSubjects([]);
        alert(`Failed to fetch subjects for ${adminData.branch} - Year ${selectedYear}, Semester ${sem}. Please try again.`);
      }
    }
  };

  const fetchCourseInfo = async (subject) => {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.SUBJECTS}?branch=${encodeURIComponent(adminData.branch)}&year=${encodeURIComponent(selectedYear)}&sem=${encodeURIComponent(selectedSem)}&subject=${encodeURIComponent(subject)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch course info');
        }
  
        const data = await response.json();
        // Transform the data to match the expected format
        const courseData = {
          courseName: subject,
          branch: adminData.branch,
          academicYear: '2024-2025'  // Updated academic year
        };
  
        setCourseInfo(courseData);
      } catch (error) {
        console.error('Error fetching course info:', error);
        // Set default course info if fetch fails
        setCourseInfo({
          courseName: subject,
         branch: adminData.branch,
          academicYear: '2024-2025'
        });
      }
    };
  const fetchResults = async (subject) => {
    try {
      if (!adminData?.branch || !selectedYear || !selectedSem || !subject) {
        throw new Error('Missing required parameters');
      }

      const response = await fetch(
        `${API_ENDPOINTS.ADMIN_RESULTS}?branch=${encodeURIComponent(adminData.branch)}&year=${encodeURIComponent(selectedYear)}&sem=${encodeURIComponent(selectedSem)}&subject=${encodeURIComponent(subject)}`,
        {
          method: 'GET', // Explicitly specify GET method
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token if required
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server response:', errorData);
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Received results data:', data);
      
      if (!data.results || !Array.isArray(data.results)) {
        throw new Error('Invalid data format received from server');
      }

      // Get the first result to extract academic year
      const firstResult = data.results[0];
      const academicYear = firstResult?.academicYear || '2024-2025';  // Updated default academic year

      setResults(data.results);
      
      // Update course info with academic year from results
      setCourseInfo({
        courseName: subject,
        batchYear: firstResult?.batchYear || `${selectedYear}-${Number(selectedYear) + 1}`,
        branch: adminData.branch,
        academicYear: academicYear
      });
      
    } catch (error) {
      console.error('Error fetching results:', error);
      setResults([]);
      alert(`Failed to fetch results: ${error.message}`);
    }
  };

  
const HeaderContent = styled.div`
max-width: 500px;
margin: 0 auto;
padding: 0 20px;
display: flex;
justify-content: center;
align-items: center;

h1 {
  font-size: 28px;
  background: linear-gradient(
    to right,
    #4776E6,
    #8E54E9,
    #4776E6
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;
  margin: 0;
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}
`;
// Add this styled component for the button container
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 30px auto;
`;

// Update the LogoutButton styling to match DownloadButton
const LogoutButton = styled.button`
 display: block;
  width: 200px;
  margin: 30px auto;
  padding: 12px 24px;
  background: linear-gradient(90deg, rgb(54, 113, 250) 0%, rgb(250, 9, 9) 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Play', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    background: linear-gradient(90deg, rgb(250, 9, 9) 0%, rgb(54, 113, 250) 100%);
  }

  &:active {
    transform: translateY(1px);
  }
`;
// First, add branch-specific header info to the branchInfo object
const branchInfo = {
  'CSE': {
    department: 'Department of Computer Science & Engineering (Accredited by NBA)',
    vision: ['Vision:', 'To evolve as a centre of academic and research excellence in the area of Computer Science and Engineering.'],
    mission: ['Mission:', 'To utilize innovative learning methods for academic improvement.'],
    mission2: ['', 'To encourage higher studies and research to meet the futuristic requirements of Computer Science and Engineering.'],
    mission3: ['', 'To inculcate Ethics and Human values for developing students with good character.']
  },
  'CST': {
    department: 'Department of Computer Science & Technology',
    vision: ['Vision:', 'To evolve as a centre of academic and research excellence in the area of Computer Science and Technology.'],
    mission: ['Mission:', 'To utilize innovative learning methods for academic improvement.'],
    mission2: ['', 'To encourage higher studies and research to meet the futuristic requirements of Computer Science and Technology.'],
    mission3: ['', 'To inculcate Ethics and Human values for developing students with good character.']
  },
  'CAI': {
    department: 'Department of CSE(Artificial Intelligence)',
    vision: ['Vision:', 'To evolve as a centre for academic and research excellence in the area of Artificial Intelligence.'],
    mission: ['Mission:', 'To utilize innovative learning methods for academic improvement.'],
    mission2: ['', 'To encourage higher studies and research to meet the futuristic requirements of Artificial Intelligence.'],
    mission3: ['', 'To inculcate Ethics and Human values for developing students with good character.']
  },
  'AIM': {
    department: 'Department of Artificial Intelligence & Machine Learning',
    vision: ['Vision:', 'To evolve as a centre of academic and research excellence in the area of Artificial Intelligence and Machine Learning.'],
    mission: ['Mission:', 'To utilize innovative learning methods for academic improvement.'],
    mission2: ['', 'To encourage higher studies and research to meet the futuristic requirements of Artificial Intelligence and Machine Learning.'],
    mission3: ['', 'To inculcate Ethics and Human values for developing students with good character.']
  },
  'ECE': {
    department: 'Department of Electronics & Communication Engineering',
    vision: ['Vision:', 'To develop the department into a centre of excellence and produce high quality, technically competent and responsible Electronics and Communication Engineers.'],
    mission: ['Mission:', 'To create a learner centric environment that promotes the intellectual growth of the students.'],
    mission2: ['', 'To develop linkages with R & D organizations and educational institutions for excellence in teaching, learning and consultancy practices.'],
    mission3: ['', 'To build the student community with high ethical standards.']
  },
  'ECT': {
    department: 'Department of Electronics & Communication Technology',
    vision: ['Vision:', 'To develop the department into a centre of excellence and produce high quality, technically competent and responsible Electronics and Communication Technology'],
    mission: ['Mission:', 'To create a learner centric environment that promotes the intellectual growth of the students.'],
    mission2: ['', 'To develop linkages with R & D organizations and educational institutions for excellence in teaching, learning and consultancy practices.'],
    mission3: ['', 'To build the student community with high ethical standards.']
  },
  'CIVIL': {
    department: 'Department of Civil Engineering',
    vision: ['Vision:', 'To develop that strives towards quality education and research in the field of Civil Engineering.'],
    mission: ['Mission:', 'To provide broad and high quality education in to its students for a successful professional career.'],
    mission2: ['', 'To serve the construction industry through dissemination of knowledge and technical service to rural community and professionals.'],
    mission3: ['', 'To include ethics and human values, effective communication and leadership qualities among students to meet the challenge of the society.']
  }
  
  // Add more branches as needed
};

// Then update the header section in handleDownload function
const handleDownload = () => {
  try {
    const doc = new jsPDF();
    const logoWidth = 25;
    const logoHeight = 25;
    
    const branch = adminData?.branch || 'CSE';
    const branchData = branchInfo[branch] || branchInfo['CSE'];

    // Create addHeader function with margin
    const addHeader = () => {
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.addImage(collegeLogo, 'PNG', 28, 10, logoWidth, logoHeight);
        doc.setFontSize(12);
        doc.setFont('Cambria', 'bold');
        doc.text('SRI VASAVI ENGINEERING COLLEGE (AUTONOMOUS)', doc.internal.pageSize.width / 2, 20, { align: 'center' });
        doc.setFontSize(10);
        doc.text('PEDATADEPALLI, TADEPALLIGUDEM-534 101, W.G.Dist.', doc.internal.pageSize.width / 2, 26, { align: 'center' });
        doc.text(branchData.department, doc.internal.pageSize.width / 2, 32, { align: 'center' });
        doc.setLineWidth(1);
        doc.line(15, 36, doc.internal.pageSize.width - 15, 36);
        doc.setFont('times new roman', 'normal');
      }
    };

    // Add footer function definition
    const addFooter = () => {
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(0, 0, 0);
        
        const pageHeight = doc.internal.pageSize.height;
        
        doc.line(15, pageHeight - 30, doc.internal.pageSize.width - 15, pageHeight - 30);
        doc.setFont('times new roman', 'bold');
        doc.text(branchData.vision[0], 15, pageHeight - 25);
        doc.setFont('times new roman', 'normal');
        doc.text(branchData.vision[1], 35, pageHeight - 25);
        
        doc.setFont('times new roman', 'bold');
        doc.text(branchData.mission[0], 15, pageHeight - 20);
        doc.setFont('times new roman', 'normal');
        doc.text(branchData.mission[1], 35, pageHeight - 20);
        doc.text(branchData.mission2[1], 35, pageHeight - 15);
        doc.text(branchData.mission3[1], 35, pageHeight - 10);
      }
    };

    // Update course information table position
    autoTable(doc, {
      startY: 45, // Increased starting position
      head: [['Course Information', 'Details']],
      body: [
        ['Course Name', (courseInfo.courseName || selectedSubject).toUpperCase()],
        ['Branch', (courseInfo.branch || adminData?.branch).toUpperCase()],
        ['Academic Year', (courseInfo.academicYear || '2025-2026').toUpperCase()]
      ],
      theme: 'grid',
      styles: { 
        fontSize: 10, 
        cellPadding: 2,
        lineWidth: 0.5
      },
      headStyles: { 
        fillColor: [41, 128, 185], 
        textColor: 255,
        lineWidth: 0.5
      },
      margin: { bottom: 45 } // Add margin for footer
    });

    // Before the autoTable, add this helper function
    const hasNonZeroValues = (column) => {
      return results.some(r => Number(r[column]) !== 0);
    };

    // Get active columns
    const activeColumns = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'].filter(col => hasNonZeroValues(col));
    
    // Survey Results Table
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 15,
      head: [['S.No', 'Student ID', ...activeColumns]],
      body: [
        ...results.map((result, index) => [
          index + 1,
          result.REGNO,
          ...activeColumns.map(col => result[col])
        ]),
        // Question totals row
        [
          '',
          'Question Totals',
          ...activeColumns.map(col => {
            const nonZeroValues = results.filter(r => Number(r[col]) !== 0);
            return nonZeroValues.reduce((sum, r) => sum + Number(r[col]), 0);
          })
        ],
        // Question averages row
        [
          '',
          'Question Averages',
          ...activeColumns.map(col => {
            const nonZeroValues = results.filter(r => Number(r[col]) !== 0);
            return nonZeroValues.length ? (nonZeroValues.reduce((sum, r) => sum + Number(r[col]), 0) / nonZeroValues.length).toFixed(2) : '0.00';
          })
        ]
      ],
      theme: 'grid',
      styles: { 
        fontSize: 10, 
        cellPadding: 1.5,
        lineWidth: 0.5
      },
      headStyles: { 
        fillColor: [41, 128, 185], 
        textColor: 255,
        lineWidth: 0.5
      },
      didParseCell: function(data) {
        // Style both totals and averages rows
        if (data.row.index === results.length || data.row.index === results.length + 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [220, 220, 220];
        }
      },
      margin: { top: 40, bottom: 45 }
    });

    // Add average table
    const average = (results.reduce((sum, r) => 
      sum + Number(r.Q1) + Number(r.Q2) + Number(r.Q3) + Number(r.Q4) + Number(r.Q5), 
      0) / (results.length * 5)).toFixed(2);
    
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      body: [[
        { content: 'Total Average:', styles: { fontStyle: 'bold', fillColor: [220, 220, 220] } },
        { content: calculateTotalAverage(),  styles: { fontStyle: 'bold', fillColor: [220, 220, 220] } }
      ]],
      theme: 'grid',
      styles: { 
        fontSize: 10, 
        cellPadding: 2,
        lineWidth: 0.5,
        halign: 'center'
      },
      margin: { bottom: 45 }
    });

    // Add footer to all pages
    addHeader();
    addFooter();
    
    doc.save(`${selectedSubject.toUpperCase()}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Error: ' + error.message);
  }
};
  // Add these styled components after your existing styled components
  
  const Footer = styled.footer`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px 0;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    color: white;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  `;
  
  // Update the return statement to include the footer
  return (
    <>
    
      <BackgroundVideo />
      <Header>
        <HeaderContent>
          <h2 style={{
            color: 'rgb(0, 195, 255)',
            animation: '8s linear 0s infinite normal none running colorChange',
           
            textShadow: 'rgba(0, 0, 0, 0.2) 2px 2px 4px'
          }}>
            COURSE END SURVEY
          </h2>
        </HeaderContent>
      </Header>
      <DashboardContainer><br></br>
        <h2>{adminData?.branch}</h2>
        <FilterSection>
          <div>
            <label>Year: </label>
            <Select value={selectedYear} onChange={(e) => handleYearChange(e.target.value)}>
              <option value="">Select Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Select>
          </div>

          {selectedYear && (
            <div>
              <label>Semester: </label>
              <Select value={selectedSem} onChange={(e) => handleSemChange(e.target.value)}>
                <option value="">Select Semester</option>
                {semesters[selectedYear].map(sem => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </Select>
            </div>
          )}

          {subjects.length > 0 && (
            <>
              <div>
                <label>Subject: </label>
                <Select 
                  value={selectedSubject}
                  onChange={(e) => {
                    const subject = e.target.value;
                    setSelectedSubject(subject);
                    if (subject) {
                      fetchResults(subject);
                    }
                  }}
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </Select>
              </div>
              
            </>
          )}
          
        </FilterSection>
        
        {/* Auto-refresh section - only show when a subject is selected */}
        {selectedSubject && (
          <AutoRefreshSection>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
                Auto Refresh:
              </label>
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                />
                <span className="slider"></span>
              </ToggleSwitch>
            </div>
            
            {autoRefresh && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ color: 'white', fontSize: '14px' }}>
                  Interval:
                </label>
                <IntervalSelect
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(Number(e.target.value))}
                >
                  <option value={15}>15 seconds</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                  <option value={120}>2 minutes</option>
                  <option value={300}>5 minutes</option>
                </IntervalSelect>
              </div>
            )}
            
            <RefreshStatus active={autoRefresh}>
              <div className="status-indicator"></div>
              <span>
                {autoRefresh 
                  ? `Auto-refresh enabled (every ${refreshInterval}s)` 
                  : 'Auto-refresh disabled'
                }
              </span>
              {lastRefresh && (
                <span style={{ fontSize: '12px', opacity: 0.8 }}>
                  Last refresh: {lastRefresh.toLocaleTimeString()}
                </span>
              )}
            </RefreshStatus>
          </AutoRefreshSection>
        )}
        {results.length > 0 && (
          <>
            <TotalRegistrations>
              Total Registrations: {results.length}
            </TotalRegistrations>
            <CourseInfoTable>
              <tbody>
                <tr>
                  <th>Course Name:</th>
                  <td>{(courseInfo.courseName || selectedSubject).toUpperCase()}</td>
                </tr>
              
                <tr>
                  <th>Branch:</th>
                  <td>{(courseInfo.branch || adminData?.branch).toUpperCase()}</td>
                </tr>
                <tr>
                  <th>Academic Year:</th>
                  <td>{(courseInfo.academicYear || `2025-2026`).toUpperCase()}</td>
                </tr>
                
              </tbody>
            </CourseInfoTable>
            <SectionTitle>Survey Report Analysis</SectionTitle>
            <ResultsTable>
              <thead>
                <tr>
                  
                  <th>S.No</th>
                  <th>Student ID</th>
                  <th>Q1</th>
                  <th>Q2</th>
                  <th>Q3</th>
                  <th>Q4</th>
                  <th>Q5</th>
               
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{result.REGNO}</td>
                    <td>{result.Q1}</td>
                    <td>{result.Q2}</td>
                    <td>{result.Q3}</td>
                    <td>{result.Q4}</td>
                    <td>{result.Q5}</td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 'bold'}}>
                  <td colSpan="2">Total</td>
                  <td>{Math.round(results.reduce((sum, r) => sum + Number(r.Q1), 0))}</td>
                  <td>{Math.round(results.reduce((sum, r) => sum + Number(r.Q2), 0))}</td>
                  <td>{Math.round(results.reduce((sum, r) => sum + Number(r.Q3), 0))}</td>
                  <td>{Math.round(results.reduce((sum, r) => sum + Number(r.Q4), 0))}</td>
                  <td>{Math.round(results.reduce((sum, r) => sum + Number(r.Q5), 0))}</td>
                </tr>
                <tr style={{ fontWeight: 'bold'}}>
                  <td colSpan="2">Averages</td>
                  <td>{(results.reduce((sum, r) => sum + Number(r.Q1), 0) / results.length).toFixed(2)}</td>
                  <td>{(results.reduce((sum, r) => sum + Number(r.Q2), 0) / results.length).toFixed(2)}</td>
                  <td>{(results.reduce((sum, r) => sum + Number(r.Q3), 0) / results.length).toFixed(2)}</td>
                  <td>{(results.reduce((sum, r) => sum + Number(r.Q4), 0) / results.length).toFixed(2)}</td>
                  <td>{(results.reduce((sum, r) => sum + Number(r.Q5), 0) / results.length).toFixed(2)}</td>
                </tr>
                <tr style={{ fontWeight: 'bold'}}>
                  <td colSpan="4">Total Average</td>
                  <td colSpan="5">{(() => {
                    let totalSum = 0;
                    let totalCount = 0;
                    ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'].forEach(col => {
                      const nonZeroValues = results.filter(r => Number(r[col]) !== 0);
                      if (nonZeroValues.length > 0) {
                        totalSum += nonZeroValues.reduce((sum, r) => sum + Number(r[col]), 0);
                        totalCount += nonZeroValues.length;
                      }
                    });
                    return totalCount ? (totalSum / totalCount).toFixed(2) : '0.00';
                  })()}</td>
                </tr>
              </tbody>
            </ResultsTable>
              
              
              <ButtonContainer>
                <DownloadButton onClick={handleDownload}>
                  Download Report
                </DownloadButton>
                <LogoutButton
                  onClick={() => {
                    localStorage.removeItem('adminData');
                    localStorage.removeItem('token');
                    navigate('/admin');
                  }}
                >
                  Logout
                </LogoutButton>
              </ButtonContainer>
            </>
          )}
          </DashboardContainer>
        <Footer>
        <FooterText>
          © {new Date().getFullYear()} Developed by AtriDatta Lanka. All rights reserved.
        </FooterText>
      </Footer>
      </>
    );
};

export default AdminDashboard;