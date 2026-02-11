const login = async (email, password) => {
  try {
    const response = await fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.status === 'success') {
      alert('Logged in successfully');

      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert('Something went wrong');
    console.error(err);
  }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
