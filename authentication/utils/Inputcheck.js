//wrapping it inside object to make it mutable
const resultObj = {
  result:null
}

function InputCheck(formData,arrOfKeysToIgnore) {
  for (let key in formData) {
    if(arrOfKeysToIgnore.includes(key)) {
      continue;
    }
    if(formData[key].trim() === '') {
      resultObj.result = "Please fill in the required fields"
      return false
    }
    if(key === 'password') {
      const passCheck = PasswordCheck(formData[key]);
      if(!passCheck) {
        resultObj.result = "Password does not match the parameters";
        return false;
      }
    }
  }
  resultObj.result = null;
  return true;
}

function PasswordCheck(password) {
  const passlen = password.length;
  if(passlen < 8 || passlen > 20 || !/^[A-Za-z0-9]+$/.test(password)) {
    return false;
  }
  return true;
}

export { InputCheck, resultObj }
