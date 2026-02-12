import axios from 'axios';
import { showAlert, hideAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const response = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (response.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    const msg =
      err.response?.data?.message || // if your backend uses top-level message
      err.response?.data?.error?.message || // if your backend nests message
      'Something went wrong';

    showAlert('error', msg);
  }
};
