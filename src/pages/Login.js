import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import useAxios from '../hooks/useAxios';
import CountDown from '../components/CountDown';
import Loading from '../components/Loading';

const Login = ({ user, setUser }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [countDown, setCountDown] = useState(0);

  const { axios } = useAxios(user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login || !password) {
      alert('Please enter login and password');
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post('/user/login', {
        password,
        login,
      });
      setUser(data);
      navigate('/');
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message);
      if (error?.response?.data?.time) {
        setCountDown(error?.response?.data?.time);
      }
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
          <h1>Login</h1>
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
          <button type='submit' disabled={countDown > 0 ? true : false}>
            Submit
          </button>
          <Link to={'/register'}>Register instead</Link>
          {countDown > 0 && (
            <CountDown countDown={countDown} setCountDown={setCountDown} />
          )}
        </form>
      </Wrapper>
    </>
  );
};

export default Login;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;

  .form {
    margin-top: 10%;
    padding: 20px;
    width: 30%;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
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
