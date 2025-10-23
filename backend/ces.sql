-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2025 at 10:52 AM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ces`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `branch` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `branch`, `created_at`) VALUES
(1, 'cse', 'cse@svec', 'CSE', '2025-03-16 11:47:13'),
(2, 'cst', 'cst@svec', 'CST', '2025-03-16 11:47:13'),
(3, 'aim', 'aim@svec', 'AIM', '2025-03-16 11:47:13'),
(4, 'admin_civil', 'admin123', 'CIVIL', '2025-03-16 11:47:13'),
(5, 'admin_mech', 'admin123', 'MECH', '2025-03-16 11:47:13');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `sname` varchar(254) NOT NULL,
  `branch` varchar(10) NOT NULL,
  `sem` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `question` varchar(254) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `sname`, `branch`, `sem`, `year`, `question`) VALUES
(1, 'Probability & Statistics', 'CST', 2, 2, 'Rate your knowledge in the concepts of data science and its importance?'),
(2, 'Probability & Statistics', 'AIM', 2, 2, 'what is your potential to plot a best fit curve to an experimental data and find the correlation and regression?'),
(3, 'Probability & Statistics', 'AIM', 2, 2, 'What is your knowledge level in applying probability distribution to real time problems?'),
(4, 'Probability & Statistics', 'AIM', 2, 2, 'What is your knowledge level to create good estimators to various parameters?'),
(5, 'Probability & Statistics', 'AIM', 2, 2, 'Rate your knowledge level in applying the principles of Statistical Inference to practical problems? '),
(6, 'Optimization Techniques', 'AIM', 2, 2, 'What are your understanding level  of basic optimization problem. '),
(7, 'Optimization Techniques', 'AIM', 2, 2, 'How well can you explain about the  minimize or maximize a multi-variable objective function, without or with constraints.'),
(8, 'Optimization Techniques', 'AIM', 2, 2, 'What is your understanding level of linear programming methods to solve transportation and Assignment problems.'),
(9, 'Optimization Techniques', 'AIM', 2, 2, 'How well can you explain the gradient and non-gradient methods to nonlinear Optimization problem'),
(10, 'Optimization Techniques', 'AIM', 2, 2, 'How well can you Demonstrate Dynamic programming technique?'),
(11, 'Machine Learning', 'AIM', 2, 2, 'Are you able to illustrate various learning techniques and concepts of models?'),
(12, 'Machine Learning', 'AIM', 2, 2, 'Are you able to demonstrate Nearest Neighbor-Based Models?'),
(13, 'Machine Learning', 'AIM', 2, 2, 'Are you able to illustrate Bayes? Classifier?'),
(14, 'Machine Learning', 'AIM', 2, 2, 'Are you able to demonstrate the concepts of Linear Discriminants and Regression?'),
(15, 'Machine Learning', 'AIM', 2, 2, 'Are you able to illustrate various clustering approaches ?'),
(16, 'Database Management Systems', 'AIM', 2, 2, 'What is your understanding level of concepts of databases systems , Data Models, Database Architecture? What is your understanding level of concepts associated with ER Modeling?'),
(17, 'Database Management Systems', 'AIM', 2, 2, 'What is your understanding level of Relational Algebra, Relational calculus and Basic SQL?'),
(18, 'Database Management Systems', 'AIM', 2, 2, 'How well you write SQL queries, constrains and triggers, Joins and view. '),
(19, 'Database Management Systems', 'AIM', 2, 2, 'What is your understanding level of schema refinement, functional dependency and Normal Forms?'),
(20, 'Database Management Systems', 'AIM', 2, 2, 'How well you can perform the Transaction Management, Concurrency control with Locking Methodsand Indexing?'),
(21, 'Digital Logic and Computer Organization', 'AIM', 2, 2, 'What is your understanding level of Data Representation and various Combinational Digital Logic Circuits?'),
(22, 'Digital Logic and Computer Organization', 'AIM', 2, 2, 'How can you explain various Sequential Digital Logic Circuits and Basic Structure of Computers? '),
(23, 'Digital Logic and Computer Organization', 'AIM', 2, 2, 'How can you explain Computer Arithmetic and basic concepts of Processor Organization?'),
(24, 'Digital Logic and Computer Organization', 'AIM', 2, 2, 'How can you explain different types of Memory?'),
(25, 'Digital Logic and Computer Organization', 'AIM', 2, 2, 'How can you explain various Interfacing devices with processor?'),
(26, 'AI & ML Lab', 'AIM', 2, 2, 'How well can you perform data manipulation and visualization using Pandas?'),
(27, 'AI & ML Lab', 'AIM', 2, 2, 'How well can you implement different search techniques such as BFS, DFS, and heuristic search?'),
(28, 'AI & ML Lab', 'AIM', 2, 2, 'How well can you apply pre-processing techniques like handling missing values, discretization, and outlier elimination?'),
(29, 'AI & ML Lab', 'AIM', 2, 2, 'How well can you implement classification algorithms like KNN, Decision Trees, Random Forest, and SVM?'),
(30, 'Database Management Systems Lab', 'AIM', 2, 2, 'How well you can perform different database operations?'),
(31, 'Database Management Systems Lab', 'AIM', 2, 2, 'How well you can apply SQL Constraints and experiment with various database nested queries?'),
(32, 'Database Management Systems Lab', 'AIM', 2, 2, 'How well you can illustrate PL/SQL Cursors and Triggers? How well you can experiment with PL/SQL functions, procedures and indexing techniques?'),
(33, 'Database Management Systems Lab', 'AIM', 2, 2, 'How can you implement java program to connect with database using JDBC and perform different operations?'),
(34, 'Full Stack Development-I', 'AIM', 2, 2, 'How well can you design static web pages using HTML elements and attributes?'),
(35, 'Full Stack Development-I', 'AIM', 2, 2, 'How well can you apply CSS styles to enhance web pages?'),
(36, 'Full Stack Development-I', 'AIM', 2, 2, 'How well can you use JavaScript objects to implement dynamic features?'),
(37, 'Full Stack Development-I', 'AIM', 2, 2, 'How well can you develop and validate dynamic web pages using JavaScript?'),
(38, 'Environmental Studies', 'AIM', 2, 2, 'Are you able to differentiate the renewable and non-renewable resources?'),
(39, 'Environmental Studies', 'AIM', 2, 2, 'Do you able to understand the concept of ecosystem and biodiversity?'),
(40, 'Environmental Studies', 'AIM', 2, 2, 'Are you  able to understand the effects and control measures of pollution?'),
(41, 'Environmental Studies', 'AIM', 2, 2, 'Are you  able to understand the environmental legislation?'),
(42, 'Environmental Studies', 'AIM', 2, 2, 'Are you able to implement the advantages of women education and value education?'),
(43, 'Professional Communication Skills-II ', 'AIM', 2, 2, 'How good are you at distinguishing between Soft Skills and Hard Skills?'),
(44, 'Professional Communication Skills-II ', 'AIM', 2, 2, 'How well do you introspect your intrapersonal skills through SWOT?'),
(46, 'Professional Communication Skills-II ', 'AIM', 2, 2, 'Scale your abilities in oral communication with proper body language.'),
(47, 'Professional Communication Skills-II ', 'AIM', 2, 2, 'How good are you at demonstrating your literacy skills?');

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE `result` (
  `id` int(11) NOT NULL,
  `CNAME` varchar(100) NOT NULL,
  `REGNO` varchar(12) NOT NULL,
  `ACYEAR` varchar(50) NOT NULL,
  `YEAR` varchar(11) NOT NULL,
  `SEM` varchar(11) DEFAULT NULL,
  `BRANCH` varchar(15) NOT NULL,
  `Q1` varchar(11) NOT NULL,
  `Q2` varchar(11) NOT NULL,
  `Q3` varchar(11) NOT NULL,
  `Q4` varchar(11) NOT NULL,
  `Q5` varchar(11) NOT NULL,
  `Q6` varchar(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `result`
--

INSERT INTO `result` (`id`, `CNAME`, `REGNO`, `ACYEAR`, `YEAR`, `SEM`, `BRANCH`, `Q1`, `Q2`, `Q3`, `Q4`, `Q5`, `Q6`) VALUES
(1, 'Probability & Statistics', '21a81d0501', '2021-22', '2', '2', 'CST', '1', '1', '1', '0', '0', ''),
(5, 'Probability & Statistics', '21a81d0502', '2021-22', '2', '2', 'CST', '1', '1', '1', '0', '0', '');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `rollno` varchar(12) NOT NULL,
  `sname` varchar(50) NOT NULL,
  `branch` varchar(10) NOT NULL,
  `year` varchar(6) NOT NULL,
  `sem` int(1) NOT NULL,
  `phonenumber` int(10) NOT NULL,
  `accyear` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `rollno`, `sname`, `branch`, `year`, `sem`, `phonenumber`, `accyear`) VALUES
(1, '21a81d0501', 'lanka atri datta ravi tez', 'CSE\n', '2', 2, 900, '2021-22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `result`
--
ALTER TABLE `result`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `result`
--
ALTER TABLE `result`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
