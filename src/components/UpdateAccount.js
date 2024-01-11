import React, { useState } from 'react';
import styled from 'styled-components';

const UpdateAccount = ({
  axiosPrivate,
  user,
  setUpdateAccount,
  setUser,
  setLoadingUpdate,
}) => {
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [dob, setDob] = useState(user?.dob);
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name && !email && !password && !oldPassword && !dob && !cPassword) {
      alert('Nothing to update');
      return;
    }

    if (password !== cPassword) {
      alert('Password and confirm password must be the same.');
      return;
    }

    if (password && !oldPassword) {
      alert('To update the password, you need to enter the old password');
      return;
    }

    if (!password && oldPassword) {
      alert('Cannot input the old password alone and leave out the password');
      return;
    }

    if (password) {
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
    }

    const updateData = { name, email, dob };

    if (oldPassword && password) {
      updateData.oldPassword = oldPassword;
      updateData.password = password;
    }

    if (
      name === user.name &&
      email === user.email &&
      dob === user.dob &&
      !password &&
      !oldPassword
    ) {
      alert('Sorry but you did not perform any update.');
      return;
    }

    try {
      setLoadingUpdate(true);
      const { data } = await axiosPrivate.put(
        `/user/update_account`,
        updateData
      );

      if (password && oldPassword) {
        setPassword('');
        setOldPassword('');
      }

      alert('account update successfully');
      setUser({
        ...user,
        name: data?.user.name,
        email: data?.user.email,
        dob: data?.user.dob,
      });
      setUpdateAccount(false);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Update Account</h1>
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
          <label htmlFor='cpassword'>Confirm Password</label>
          <input
            type='password'
            name='cPassword'
            id='cPassword'
            value={cPassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
        </div>
        <div className='form-contain'>
          <label htmlFor='oldPassword'>Old Password</label>
          <input
            type='password'
            name='oldPassword'
            id='oldPassword'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='submit'>
          Submit
        </button>
        <button onClick={() => setUpdateAccount(false)}>close</button>
      </form>
    </Wrapper>
  );
};

export default UpdateAccount;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  min-height: 100vh;

  .form {
    margin-top: 10%;
    padding: 20px;
    width: 30%;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    background: white;
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

  .submit {
    margin-bottom: 10px;
    background: orange;
    color: white;
  }
`;
