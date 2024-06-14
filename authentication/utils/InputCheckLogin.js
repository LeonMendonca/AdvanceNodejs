const loginObj = {
  result : null
}

function InputCheckLogin(userLoginData) {
  for (let key in userLoginData) {
    if(userLoginData[key].trim() === '') {
      console.log(key,'is empty')
      loginObj.result = "Please fill in the required fields";
      return false;
    }
    if(key === 'rememberme') {
      console.log(userLoginData[key])
    }
  }
  loginObj.result = null;
  return true;
}

export { InputCheckLogin, loginObj }
