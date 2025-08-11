
const fetch = require('node-fetch');

async function testLogin() {
  const email = 'tonycamerobiz@gmail.com';
  
  try {
    // First, let's try to generate a magic link
    const response = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation generateToken($email: String!) {
            generateToken(email: $email)
          }
        `,
        variables: {
          email: email
        }
      })
    });

    const result = await response.json();
    console.log('Magic link generation result:', result);

    // If you have direct database access, you can also check the user directly
    console.log('To check user in database, run:');
    console.log(`psql $DATABASE_URL -c "SELECT * FROM \\"user\\" WHERE email = '${email}';"`);

  } catch (error) {
    console.error('Error:', error);
  }
}

testLogin();
