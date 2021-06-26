import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../config.json';

const DetailsPage = () => {
  const history = useHistory();
  const [usersDetails, setUserDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(baseUrl + '/users/getDetails');
      setUserDetail(res.data.usersDetails);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => fetchData(), []);

  return (
    <>
      <div className="container">
        {loading ? (
          <div className="center margin-top">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <h1 className="heading">Registered Candidates</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Resume Path</th>
                </tr>
              </thead>
              <tbody>
                {usersDetails.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.resume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <footer>
        <div className="link-btn" onClick={e => history.push('/')}>
          Form Page &rarr;{' '}
        </div>
      </footer>
    </>
  );
};

export default DetailsPage;
