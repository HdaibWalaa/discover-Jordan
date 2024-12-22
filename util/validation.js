export function validateCredentials(credentials, isLogin) {
  let { email, emailOrUsername, username, password, confirmPassword } =
    credentials;

  email = email ? email.trim() : "";
  emailOrUsername = emailOrUsername ? emailOrUsername.trim() : "";
  username = username ? username.trim() : "";
  password = password.trim();
  confirmPassword = confirmPassword ? confirmPassword.trim() : "";

  const emailIsValid = email.includes("@");
  const emailOrUsernameIsValid = emailOrUsername.length > 0;
  const passwordIsValid = password.length > 6;
  const usernameIsValid = username.length > 0;
  const passwordsAreEqual = password === confirmPassword;

  if (isLogin) {
    return {
      emailOrUsernameIsValid,
      passwordIsValid,
    };
  } else {
    return {
      emailIsValid,
      usernameIsValid,
      passwordIsValid,
      passwordsAreEqual,
    };
  }
}
