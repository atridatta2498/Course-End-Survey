const db = require('../config/db.config');

const authController = {
  login: (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM student WHERE rollno = ? AND phonenumber = ?`;
    
    db.query(query, [username, password], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: "Database error occurred" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid Roll Number or Phone Number" });
      }
      const student = results[0];
      res.status(200).json({
        message: "Login successful",
        student: {
          rollno: student.rollno,
          name: student.sname,
          branch: student.branch,
          semester: student.sem,
          year: student.year,
          accyear: student.accyear
        }
      });
    });
  },

  adminLogin: (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM admin WHERE username = ? AND password = ?`;
    
    db.query(query, [username, password], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: "Database error occurred" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid Admin Credentials" });
      }
      const admin = results[0];
      res.status(200).json({
        message: "Admin login successful",
        admin: {
          username: admin.username,
          role: 'admin'
        }
      });
    });
  },

  addQuestion: (req, res) => {
    const { sname, branch, sem, year, question } = req.body;
    const query = `INSERT INTO questions (sname, branch, sem, year, question) VALUES (?, ?, ?, ?, ?)`;
    
    db.query(query, [sname, branch, sem, year, question], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: "Failed to add question" });
      }
      res.status(201).json({
        message: "Question added successfully",
        questionId: results.insertId
      });
    });
  },

  getQuestions: (req, res) => {
    const { branch, sem, year } = req.query;
    const query = `SELECT * FROM questions WHERE branch = ? AND sem = ? AND year = ? ORDER BY sname ASC`;
    
    db.query(query, [branch, sem, year], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: "Failed to fetch questions" });
      }
      const groupedQuestions = results.reduce((acc, question) => {
        if (!acc[question.sname]) {
          acc[question.sname] = [];
        }
        acc[question.sname].push(question);
        return acc;
      }, {});
      res.status(200).json({
        questions: results,
        groupedBySubject: groupedQuestions
      });
    });
  },

  submitAnswers: (req, res) => {
    const { studentAnswers, studentData } = req.body;

    // Debug logging
    console.log('Received data:', {
      studentAnswers,
      studentData
    });

    // Input validation
    if (!studentAnswers || Object.keys(studentAnswers).length === 0) {
      console.error('Invalid studentAnswers:', studentAnswers);
      return res.status(400).json({
        message: "Invalid input: no answers provided"
      });
    }

    if (!studentData || !studentData.rollno) {
      console.error('Invalid studentData:', studentData);
      return res.status(400).json({
        message: "Invalid input: studentData is incomplete"
      });
    }

    const query = `INSERT INTO result (CNAME, REGNO, YEAR, SEM, BRANCH, ACYEAR, Q1, Q2, Q3, Q4, Q5) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Get subjects from questions table for all question IDs
    const questionIds = Object.keys(studentAnswers).join(',');
    const getSubjectsQuery = `
      SELECT DISTINCT id, sname 
      FROM questions 
      WHERE id IN (${questionIds}) AND branch = ? AND sem = ? AND year = ?`;

    db.query(getSubjectsQuery, 
      [studentData.branch, studentData.semester, studentData.year], 
      (error, results) => {
        if (error) {
          console.error('Database error:', error);
          return res.status(500).json({ message: "Failed to get subjects" });
        }

        if (!results.length) {
          return res.status(400).json({ message: "No subjects found for given questions" });
        }

        // Create a map of questionId to subject
        const questionSubjects = {};
        results.forEach(result => {
          questionSubjects[result.id] = result.sname;
        });

        // Group answers by subject
        const answersBySubject = {};
        Object.entries(studentAnswers).forEach(([questionId, value]) => {
          const subject = questionSubjects[questionId];
          if (!subject) return;

          if (!answersBySubject[subject]) {
            answersBySubject[subject] = {
              CNAME: subject,
              REGNO: studentData.rollno,
              YEAR: studentData.year,
              SEM: studentData.semester,
              BRANCH: studentData.branch,
              ACYEAR: studentData.accyear,
              Q1: '0', Q2: '0', Q3: '0', Q4: '0', Q5: '0'
            };
          }

          const qNum = parseInt(questionId) % 5 || 5;
          answersBySubject[subject][`Q${qNum}`] = value.toString();
        });

        // Insert answers for each subject
        const insertPromises = Object.values(answersBySubject).map(answers => {
          return new Promise((resolve, reject) => {
            db.query(query, [
              answers.CNAME, answers.REGNO, answers.YEAR,
              answers.SEM, answers.BRANCH, answers.ACYEAR,
              answers.Q1, answers.Q2, answers.Q3,
              answers.Q4, answers.Q5
            ], (error, results) => {
              if (error) reject(error);
              else resolve(results);
            });
          });
        });

        Promise.all(insertPromises)
          .then(() => {
            res.status(200).json({ message: "Answers submitted successfully" });
          })
          .catch(error => {
            console.error('Database error:', error);
            res.status(500).json({ message: "Failed to submit answers" });
          });
    });
  },

  getResults: (req, res) => {
    const { branch, year, sem, subject } = req.query;
    const query = `
      SELECT *, 
        (CAST(Q1 AS DECIMAL) + CAST(Q2 AS DECIMAL) + CAST(Q3 AS DECIMAL) + 
         CAST(Q4 AS DECIMAL) + CAST(Q5 AS DECIMAL)) as total_score,
        (CAST(Q1 AS DECIMAL) + CAST(Q2 AS DECIMAL) + CAST(Q3 AS DECIMAL) + 
         CAST(Q4 AS DECIMAL) + CAST(Q5 AS DECIMAL))/5 as average_score
      FROM result 
      WHERE BRANCH = ? AND YEAR = ? AND SEM = ? AND CNAME = ?
      ORDER BY REGNO ASC
    `;
    
    db.query(query, [branch, year, sem, subject], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: "Failed to fetch results" });
      }
      res.status(200).json({ results: results });
    });
  },

  getSubjects: (req, res) => {
    const { branch, year, sem } = req.query;
    const query = `SELECT DISTINCT sname FROM questions WHERE branch = ? AND year = ? AND sem = ? ORDER BY sname`;
    
    db.query(query, [branch, year, sem], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: "Failed to fetch subjects" });
      }
      const subjects = results.map(row => row.sname);
      res.status(200).json({ subjects: subjects });
    });
  },

  checkSubmission: (req, res) => {
    const { studentId, semester, year } = req.query;
    
    if (!studentId || !semester || !year) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const query = `SELECT COUNT(*) as count FROM result WHERE REGNO = ? AND SEM = ? AND YEAR = ?`;
    
    db.query(query, [studentId, semester, year], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: "Failed to check submission" });
      }
      
      const hasSubmitted = results[0].count > 0;
      res.status(200).json({ hasSubmitted: hasSubmitted });
    });
  }
};

module.exports = authController;