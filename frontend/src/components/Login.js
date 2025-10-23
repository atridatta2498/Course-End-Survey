import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import BackgroundVideo from './BackgroundVideo';
import { API_ENDPOINTS } from '../config/api';

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 80px 20px;

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

const LoginForm = styled.form`
  background: rgba(255, 255, 255, 0.15);
  padding: 0;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0 10px;
  }
`;


const Input = styled.input`
  font-family: 'Play', sans-serif;
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  color: white;
  transition: all 0.3s ease;

  &::placeholder {
    font-family: 'Play', sans-serif;
    color: rgba(255, 255, 255, 0.8);
  }

  &:focus {
    outline: none;
    border-color: rgba(71, 118, 230, 0.5);
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 15px rgba(71, 118, 230, 0.1);
  }

  @media (max-width: 768px) {
    background: rgba(255, 255, 255, 0.25);
    color: white;
    font-size: 18px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.9);
    }

    &:focus {
      background: rgba(255, 255, 255, 0.35);
      border-color: rgba(255, 255, 255, 0.6);
    }
  }
`;

const FormContent = styled.div`
  padding: 40px;

  @media (max-width: 768px) {
  background: rgba(255, 255, 255, 0.15);
    padding: 25px;
  }
`;

const GradientHeading = styled.h1`
  font-family: 'Play', sans-serif;
  font-weight: 700;
  text-align: center;
  animation: colorChange 8s linear infinite;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 2rem;
  font-size: 1.8em;
  text-shadow: rgba(0, 0, 0, 0.2) 2px 2px 4px;

  @keyframes colorChange {
    0% { color: rgb(31, 224, 19); }
    25% { color: rgb(0, 195, 255); }
    50% { color: rgb(255, 0, 128); }
    75% { color: rgb(255, 165, 0); }
    100% { color: rgb(31, 224, 19); }
  }
`;

const GradientButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
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
`;

const ErrorMessage = styled.div`
  color: #ff3333;
  margin-top: 10px;
  text-align: center;
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ToggleIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 60%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 12px;
  background: transparent;
`;

const FooterText = styled.p`
  color: white;
  margin: 0;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 0 15px;
  }
`;

const FormFooter = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
`;

const Header = styled.header`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 28px;
    background: linear-gradient(to right, #4776e6, #8e54e9, #4776e6);
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

const Footer = styled.footer`
  background: rgba(255, 255, 255, 0.15);
  padding: 20px 0;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  z-index: 100;
`;

const InputLabel = styled.label`
  font-family: 'Play', sans-serif;
  font-weight: 400;
  color: white;
  display: block;
  margin-bottom: 5px;
  font-size: 18px;
`;

// Main Component
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateRollNumber = (rollNumber) => {
    const rollNumberRegex = /^[0-9]{2}[A-Z]{2}[0-9]{2}[A-Z][0-9]{2}$/;
    return rollNumberRegex.test(rollNumber);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: rollNumber,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('studentData', JSON.stringify(data.student));
        navigate('/questions');
      } else {
        if (!validateRollNumber(rollNumber)) {
          setError('Please enter a valid roll number (e.g., 21A81A0501)');
        } else if (!validatePhoneNumber(password)) {
          setError('Please enter a valid 10-digit phone number');
        } else {
          setError(data.message || 'Login failed');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error occurred');
    }
  };

  return (
    <>
      <BackgroundVideo />
      <Header>
        <HeaderContent>
          <h1>COURSE END SURVEY</h1>
        </HeaderContent>
      </Header>

      <LoginContainer>
        <LoginForm onSubmit={handleSubmit}>
          <FormContent>
            <GradientHeading>LOGIN</GradientHeading>

            <div>
              <InputLabel>Roll Number</InputLabel>
              <Input
                type="text"
                placeholder="Enter Roll Number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
              />
            </div>

            <PasswordWrapper>
              <InputLabel>Password</InputLabel>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <ToggleIcon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </ToggleIcon>
            </PasswordWrapper>

            <GradientButton type="submit">Login</GradientButton>

            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FormContent>
        </LoginForm>
      </LoginContainer>

      <Footer>
        <FooterText>
          © {new Date().getFullYear()} Developed by AtriDatta Lanka. All rights reserved.
        </FooterText>
      </Footer>
    </>
  );
};

export default Login;