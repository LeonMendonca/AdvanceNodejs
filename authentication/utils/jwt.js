import jwt from 'jsonwebtoken';
const { verify, sign } = jwt;
const secret = "6uI^42fa"

function SetToken(payload) {
  console.log('set token')
  return sign(payload,secret);
}

function GetPayload(token) {
  if(!token) { return null }
  try {
    return verify(token,secret);
  } catch(error) {
    throw error;
  }
}

export { SetToken, GetPayload }
