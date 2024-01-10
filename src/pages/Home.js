import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import useAxios from '../hooks/useAxios';
import UpdateAccount from '../components/UpdateAccount';
import Loading from '../components/Loading';

const Home = ({ user, setUser }) => {
  const [history, setHistory] = useState([]);

  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyPages, setHistoryPages] = useState(1);

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [updateAccount, setUpdateAccount] = useState(false);

  const { axiosPrivate } = useAxios({ user });

  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      const { data } = await axiosPrivate.get(
        `/user/login_history?page=${historyPage}`
      );
      setHistory(data?.history);
      setHistoryPages(data?.count);
    } catch (error) {
      alert(error?.response?.data?.message);
    } finally {
      setLoadingHistory(false);
    }
  };

  const next = () => {
    setHistoryPage((prev) => {
      if (prev + 1 > historyPages) {
        return 1;
      } else {
        return prev + 1;
      }
    });
  };

  const prev = () => {
    setHistoryPage((prev) => {
      if (prev - 1 === 0) {
        return historyPages;
      } else {
        return prev - 1;
      }
    });
  };

  useEffect(() => {
    if (user?.name) {
      fetchHistory();
    }
  }, [historyPage, user]);

  if (!user?.name) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      {loadingHistory && <Loading />}
      {loadingUpdate && <Loading />}
      {updateAccount && (
        <UpdateAccount
          axiosPrivate={axiosPrivate}
          user={user}
          setUpdateAccount={setUpdateAccount}
          setUser={setUser}
          setLoadingUpdate={setLoadingUpdate}
        />
      )}
      <Wrapper>
        <nav>
          <h1>SYNOPSIS SOLUTIONS</h1>
          <div>
            <button onClick={() => setUpdateAccount(true)}>
              update account
            </button>
            <button onClick={() => setUser({})}>Logout</button>
          </div>
        </nav>
        <div className='bottom'>
          <div className='info'>
            <h1>Info</h1>
            <div className='data'>Name: {user?.name}</div>
            <div className='data'>Email: {user?.email}</div>
            <div className='data'>Date of Birth: {user?.dob}</div>
            <button onClick={() => setUpdateAccount(true)}>
              update account
            </button>
          </div>
          <div className='login-history'>
            <div className='top'>
              <h1>Login History</h1>
              <div className='pagination'>
                <button onClick={prev}>prev</button>
                <span>{historyPage}</span>
                <button onClick={next}>next</button>
              </div>
            </div>
            <table>
              <tr>
                <td>Id</td>
                <td>Date/Time</td>
                <td>Success</td>
              </tr>
              {history.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.time}</td>
                    <td>{item.success ? 'True' : 'False'}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
        <footer>Copyright Diallo Abdourahman all rights reserved</footer>
      </Wrapper>
    </>
  );
};

export default Home;

const Wrapper = styled.section`
  width: 90%;
  margin: 0 auto;

  button {
    padding: 5px;
    border-radius: 10px;
    font-size: 20px;
  }

  nav {
    background: orange;
    display: flex;
    justify-content: space-between;
    padding: 20px 5px;

    h1 {
      font-size: 30px;
      color: white;
      font-weight: normal;
    }

    div button {
      margin-left: 30px;
    }
  }

  .bottom {
    display: grid;
    grid-template-columns: 2fr 5fr;
    gap: 5%;
    margin-top: 50px;
  }

  .info button {
    background-color: orange;
    color: white;
    border: none;
  }

  .info .data {
    margin: 10px 0;
    font-size: 20px;
  }

  .login-history .top {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;

    .pagination {
      display: flex;
      align-items: center;
    }

    span {
      font-size: 30px;
      margin: 0 5px;
    }
  }

  table {
    padding: 10px;
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  table td,
  table th {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 5px;
  }

  footer {
    padding: 20px;
    text-align: center;
    color: white;
    font-size: 25px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: orange;
  }
`;
