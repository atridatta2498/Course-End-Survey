import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackgroundVideo from './BackgroundVideo';
import { API_ENDPOINTS } from '../config/api';

// Styled Components
const QuestionsContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  color: white;

  @media (max-width: 768px) {
    padding: 15px;
    text-align: center;

    h1 {
      font-size: 24px;
      margin-bottom: 25px;
      font-family: 'Play', sans-serif;
    }
  }
`;

const SubjectSection = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 30px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 15px;
    margin: 0 auto 20px;
    max-width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
      height: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 4px;
    }
  }
`;

const SubjectTitle = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  text-transform: uppercase;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
  grid-column: 1 / -1;
  width: 100%;
`;

const QuestionCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  height: fit-content;

  p {
    margin-bottom: 15px;
    font-size: 16px;
    line-height: 1.4;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  @media (max-width: 768px) {
    padding: 15px;
    margin: 0 auto 15px;
    max-width: 90%;
    text-align: center;
    min-width: 280px;

    p {
      font-size: 16px;
      margin-bottom: 15px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      word-break: break-word;

      strong {
        display: inline-block;
      }
    }
  }
`;

const OptionButton = styled.button`
  padding: 8px 15px;
  margin: 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  transition: all 0.3s ease;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 10px 15px;
  }

  &.average {
    background: rgba(255, 99, 71, 0.5);
    &.selected {
      background: #ff4136;
      transform: scale(1.05);
    }
  }

  &.moderate {
    background: rgba(255, 215, 0, 0.5);
    &.selected {
      background: #ffd700;
      transform: scale(1.05);
    }
  }

  &.good {
    background: rgba(46, 204, 113, 0.5);
    &.selected {
      background: #2ecc71;
      transform: scale(1.05);
    }
  }

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }
`;

const SubmitButton = styled.button`
  width: 200px;
  padding: 12px;
  margin: 20px auto;
  display: block;
  border: none;
  border-radius: 4px;
  background: linear-gradient(90deg, rgb(54, 113, 250) 0%, rgb(250, 9, 9) 100%);
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.3);
    cursor: not-allowed;
  }
`;

const Header = styled.header`
  background: rgba(0, 0, 0, 0.5);
  padding: 15px 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;

  h1 {
    margin: 0;
    color: white;
    font-size: 28px;
  }

  @media (max-width: 768px) {
    padding: 10px;
    h1 {
      font-size: 24px;
    }
  }
`;

const Footer = styled.footer`
  background: rgba(0, 0, 0, 0.5);
  padding: 15px;
  text-align: center;
  position: relative;
  margin-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const AlertPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.9);
  padding: 25px 40px;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(255, 0, 0, 0.2);
  text-align: center;
  color: white;
  z-index: 1100;
  animation: fadeIn 0.3s ease-out;
  border: 1px solid rgba(255, 0, 0, 0.3);

  p {
    font-size: 18px;
    margin-bottom: 15px;
  }

  button {
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    background: linear-gradient(90deg, #ff4444, #ff0000);
    color: white;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
      opacity: 0.9;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translate(-50%, -60%); }
    to { opacity: 1; transform: translate(-50%, -50%); }
  }
`;
// Add these styled components after AlertPopup and before the Questions component
const ButtonContainer = styled.div`
display: flex;
justify-content: center;
gap: 20px;
margin: 20px auto;
`;

const LogoutButton = styled(SubmitButton)`
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
// Main Component
const Questions = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const navigate = useNavigate();
  const studentData = JSON.parse(localStorage.getItem('studentData'));

  useEffect(() => {
    if (!studentData) {
      navigate('/');
      return;
    }

    const checkPreviousSubmission = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.CHECK_SUBMISSION}?studentId=${studentData.rollno}&semester=${studentData.semester}&year=${studentData.year}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.hasSubmitted) {
            setHasSubmitted(true);
            setAlertMessage('You have already submitted the survey for this semester.');
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
              navigate('/');
            }, 3000);
            return;
          }
        }
      } catch (error) {
        console.error('Error checking submission:', error);
        setAlertMessage('Error checking previous submissions. Please try again.');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate('/');
        }, 3000);
      }
    };

    checkPreviousSubmission();

    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `${API_ENDPOINTS.QUESTIONS}?branch=${encodeURIComponent(studentData.branch)}&sem=${encodeURIComponent(studentData.semester)}&year=${encodeURIComponent(studentData.year)}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 401) {
          alert('Session expired. Please login again.');
          navigate('/');
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.statusText}`);
        }

        const data = await response.json();
        const questionsArray = Array.isArray(data) ? data : Array.isArray(data.questions) ? data.questions : [];

        // Remove duplicates based on question ID
        const uniqueQuestions = questionsArray.filter((question, index, self) =>
          index === self.findIndex((q) => q.id === question.id)
        );

        const formattedQuestions = uniqueQuestions.map((q) => ({
          id: q.id,
          sname: q.sname,
          que: q.question,
          branch: q.branch,
          section: q.section,
          sem: q.sem,
          year: q.year,
        }));

        setQuestions(formattedQuestions);
      } catch (error) {
        console.error('Fetch error:', error);
        if (error.message.includes('401')) {
          navigate('/');
        } else {
          alert('Failed to load questions. Please try again.');
        }
      }
    };

    fetchQuestions();
  }, [studentData, navigate]);

  const handleOptionSelect = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const groupQuestionsBySubject = (questions) => {
    return questions.reduce((acc, question) => {
      if (!acc[question.sname]) {
        acc[question.sname] = [];
      }
      acc[question.sname].push(question);
      return acc;
    }, {});
  };

  const handleSubmit = async () => {
    try {
      const checkResponse = await fetch(
        `${API_ENDPOINTS.CHECK_SUBMISSION}?studentId=${studentData.rollno}&semester=${studentData.semester}&year=${studentData.year}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (checkResponse.ok) {
        const checkData = await checkResponse.json();
        if (checkData.hasSubmitted) {
          setAlertMessage('You have already submitted the survey for this semester.');
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            navigate('/');
          }, 3000);
          return;
        }
      }

      const response = await fetch(API_ENDPOINTS.SUBMIT_ANSWERS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentAnswers: answers,
          studentData: studentData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit answers');
      }

      setAlertMessage('Thank you for giving Course End Survey!');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('Duplicate Entry. Please try again.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <>
      <BackgroundVideo />
      <Header>
        <h1>COURSE END SURVEY</h1>
      </Header>
      
      
      
              <QuestionsContainer>
                {questions && questions.length > 0 ? (
                  Object.entries(groupQuestionsBySubject(questions)).map(([subject, subjectQuestions]) => (
                    <SubjectSection key={subject}>
                      <SubjectTitle>{subject}</SubjectTitle>
                      {subjectQuestions.map((question, index) => (
                        <QuestionCard key={question.id}>
                          <p>
                            <strong>Q{index + 1}.</strong> {question.que}
                          </p>
                          <div>
                            <OptionButton
                              className={`average ${answers[question.id] === 1 ? 'selected' : ''}`}
                              onClick={() => handleOptionSelect(question.id, 1)}
                            >
                              Average
                            </OptionButton>
                            <OptionButton
                              className={`moderate ${answers[question.id] === 2 ? 'selected' : ''}`}
                              onClick={() => handleOptionSelect(question.id, 2)}
                            >
                              Moderate
                            </OptionButton>
                            <OptionButton
                              className={`good ${answers[question.id] === 3 ? 'selected' : ''}`}
                              onClick={() => handleOptionSelect(question.id, 3)}
                            >
                              Good
                            </OptionButton>
                          </div>
                        </QuestionCard>
                      ))}
                    </SubjectSection>
                  ))
                ) : (
                  <p>Loading questions...</p>
                )}
                <ButtonContainer>
                  <SubmitButton
                    onClick={handleSubmit}
                    disabled={Object.keys(answers).length !== questions.length}
                  >
                    Submit All Answers
                  </SubmitButton>
                  <LogoutButton
                    onClick={() => {
                      localStorage.removeItem('studentData');
                      localStorage.removeItem('token'); // Add this line to remove the token
                      navigate('/');
                    }}
                  >
                    Logout
                  </LogoutButton>
                </ButtonContainer>
              </QuestionsContainer>
      <Footer>
        © {new Date().getFullYear()} Developed by AtriDatta Lanka. All rights reserved.
      </Footer>
      {showAlert && (
        <AlertPopup>
          <p>{alertMessage}</p>
          <button onClick={() => setShowAlert(false)}>Close</button>
        </AlertPopup>
      )}
    </>
  );
};

export default Questions;