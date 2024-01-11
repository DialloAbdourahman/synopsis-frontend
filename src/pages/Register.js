import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import useAxios from '../hooks/useAxios';
import Loading from '../components/Loading';

const Register = ({ user }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);

  const { axios } = useAxios(user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !dob || !login || !password || !password2) {
      alert('Please enter all fields');
      return;
    }

    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      alert(
        'Password must be at least 6 characters long, contain a capital letter, and a special character'
      );
      return;
    }

    if (password !== password2) {
      alert('Passwords should match');
      return;
    }

    try {
      setLoading(true);
      const {
        data: { message },
      } = await axios.post('/user/create_account', {
        name,
        email,
        password,
        login,
        dob,
      });
      alert(message);
      navigate('/login');
    } catch (error) {
      alert(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (user?.name) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <>
      {loading && <Loading />}
      <Wrapper>
        <form className='form' onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <div className='form-contain'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-contain'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-contain'>
            <label htmlFor='dob'>Date of Birth</label>
            <input
              type='date'
              name='dob'
              id='dob'
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className='form-contain'>
            <label htmlFor='login'>Login</label>
            <input
              type='text'
              name='login'
              id='login'
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className='form-contain'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='form-contain'>
            <label htmlFor='password2'>Confirm Password</label>
            <input
              type='password'
              name='password2'
              id='password2'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <button type='submit'>Submit</button>
          <Link to={'/login'}>Login instead</Link>
        </form>
      </Wrapper>
    </>
  );
};

export default Register;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;

  .form {
    margin-top: 1%;
    padding: 20px;
    width: 30%;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  }

  .form a {
    margin-top: 10px;
    display: block;
    font-size: 20px;
  }

  .form h1 {
    text-align: center;
    margin-bottom: 20px;
    font-weight: normal;
    font-size: 30px;
  }

  .form .form-contain {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  .form-contain label {
    font-size: 25px;
    margin-bottom: 5px;
  }

  .form-contain input {
    padding: 10px;
    outline: none;
    font-size: 20px;
  }

  .form button {
    width: 100%;
    display: block;
    padding: 10px 0;
    font-size: 25px;
  }
`;
