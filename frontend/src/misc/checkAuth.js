import checkValidJWTtoken from "./checkValidJWTtoken";

const decodeJWTtoken = async () => {

  return null;
};

const checkJWT = async () => {
  let valid = false;
  let user = null;

  const jwt = await cookieStore.get("jwt");
  if (jwt) {
    const isValid = await checkValidJWTtoken(jwt.value);
    valid = isValid;
    if (!isValid) {
      location.href = "/login";
      return { isValid: false, user: null };
    }

    user = await decodeJWTtoken();
  } else {
    location.href = "/login";
    return { isValid: false, user: null };
  }

  return { isValid: valid, user };
};

export default checkJWT;
