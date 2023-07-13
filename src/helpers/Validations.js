export const emailValidation = (value) => {
  const isValidEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (value && value.match(isValidEmail)) {
    return true;
    // setInput(e.target.value);
  } else {
    return false;
  }
};

export const phoneValidation = (value) => {
  console.log(value);
  const phoneno = "^[0-9]*$";
  if (value && value.match(phoneno)) {
    return true;
    // setInput(e.target.value);
  } else {
    return false;
  }
};
