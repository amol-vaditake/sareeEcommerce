import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const isAuthenticate = () =>
  localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

export const isAdmin = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).user.role === 1
    : false;

export const loginReq = async ({ email, password }) => {
  const data = { email, password };
  try {
    let res = await axios.post(`${apiURL}/api/signin`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signupReq = async ({ name, email, password, cPassword }) => {
  const data = { name, email, password, cPassword };
  try {
    let res = await axios.post(`${apiURL}/api/signup`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const guestTokenName = 'guestId';

export const handleGuestLogin = async () => {
  const oldToken = await getOldGuestToken();
  console.log('guest token', oldToken);
  if (!oldToken) {
    return await generateNewGuestToken();
  } else {
    return await loginWithGuestToken(oldToken);
  }
}

const setGuestToken = (guestId) => {
  localStorage.setItem(guestTokenName, guestId);
  // localStorage.setItem("jwt", JSON.stringify({guestId : guestId}));
}

export const getOldGuestToken = () => {
  return (
    localStorage.getItem(guestTokenName) ?
    (localStorage.getItem(guestTokenName))
    // JSON.parse(localStorage.getItem("guestTokenName")).guestId
    : false
  );
}

export const generateNewGuestToken = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/newGuest`);
    console.log('data from guest registration', res.data);
    setGuestToken(res.data.user._id);
    if (res.data.user._id) {
      return {
        success : true,
        token : res.data.token,
        id : res.data.user._id,
      }
    } else {
      return {
        success : false,
      }
    }
  } catch (error) {
    console.log(error);
    return {
      success : false,
    }
  }
}

export const loginWithGuestToken = async (oldToken) => {
  try {
    let res = await axios.post(`${apiURL}/api/loginGuest`,  { guestId: oldToken });
    console.log('data from old guest token login', res.data);
    setGuestToken(res.data.user._id);
    if (res.data.user._id) {
      return {
        success : true,
        token : res.data.token,
        id : res.data.user._id,
      }
    } else {
      return {
        success : false,
      }
    }
  } catch (error) {
    console.log(error);
    return {
      success : false,
    }
  }
}
