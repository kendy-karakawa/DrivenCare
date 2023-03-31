function conflict(message) {
    return {
      name: "Conflict",
      message,
    };
  }
  
  function duplicatedEmail() {
    return {
      name: "DuplicatedEmail",
      message: "There is already an user with given email",
    };
  }
  
  function unauthorized() {
    return {
      name: "Unauthorized",
      message: "You must be signed in to continue",
    };
  }
  
  function notFound() {
    return {
      name: "NotFound",
      message: "No result for this search!",
    };
  }
  
  function invalidCredentials() {
    return {
      name: "InvalidCredentials",
      message: "Email or password are incorrect",
    };
  }
  
  export default {
    conflict,
    duplicatedEmail,
    unauthorized,
    notFound,
    invalidCredentials,
  };
  