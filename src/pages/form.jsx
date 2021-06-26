import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../config.json';
import { useHistory } from 'react-router-dom';

const FormPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('resume', file);
      const response = await axios.post(
        baseUrl + '/users/saveDetails',
        formData,
        {
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          },
        }
      );
      if (response.status === 200) {
        alert('Data Saved!');
      }
    } catch (err) {
      console.error(err);
      alert('Error!!!');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="heading form-heading">Candidate Profile Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="row1">
          <div className="col">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Candidate's Full Name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="row2">
          <div className="col">
            <label htmlFor="phone">Mobile Number:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter Mobile Number"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>

          <div className="spacer"></div>
          <div className="col">
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email ID"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="row3">
          <div className="col">
            <label htmlFor="resume">
              Resume:
              <div className="custom-upload">
                <div className="custom-upload-box">
                  {file == null ? 'Upload Resume' : file.name}{' '}
                </div>
                <div className="custom-upload-btn">Upload</div>
              </div>
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              className="file-upload"
              onChange={e => {
                if (e.target.files[0].type === 'application/pdf') {
                  setFile(e.target.files[0]);
                } else {
                  alert('Only pdf files are allowed');
                }
              }}
              required
            />
          </div>
        </div>
        {loading ? (
          <div className="center">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="action-btn-box">
            <button type="submit">Submit</button>
            <button
              type="reset"
              onClick={e => {
                setEmail('');
                setName('');
                setPhone('');
                setFile(null);
              }}
            >
              Clear
            </button>
          </div>
        )}
      </form>
      <footer>
        <div className="link-btn" onClick={e => history.push('/details')}>
          Details Page &rarr;{' '}
        </div>
      </footer>
    </div>
  );
};

export default FormPage;
