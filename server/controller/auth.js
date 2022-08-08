const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

class Auth {
  async isAdmin(req, res) {
    let { loggedInUserId } = req.body;
    try {
      let loggedInUserRole = await userModel.findById(loggedInUserId);
      res.json({ role: loggedInUserRole.userRole });
    } catch {
      res.status(404);
    }
  }

  async allUser(req, res) {
    try {
      let allUser = await userModel.find({});
      res.json({ users: allUser });
    } catch {
      res.status(404);
    }
  }

  /* User Registration/Signup controller  */
  async postSignup(req, res) {
    let { name, email, password, cPassword } = req.body;
    let error = {};
    if (!name || !email || !password || !cPassword) {
      error = {
        ...error,
        name: "Filed must not be empty",
        email: "Filed must not be empty",
        password: "Filed must not be empty",
        cPassword: "Filed must not be empty",
      };
      return res.json({ error });
    }
    if (name.length < 3 || name.length > 25) {
      error = { ...error, name: "Name must be 3-25 charecter" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {
        name = toTitleCase(name);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            ...error,
            password: "Password must be 8 charecter",
            name: "",
            email: "",
          };
          return res.json({ error });
        } else {
          // If Email & Number exists in Database then:
          try {
            password = bcrypt.hashSync(password, 10);
            const data = await userModel.findOne({ email: email });
            if (data) {
              error = {
                ...error,
                password: "",
                name: "",
                email: "Email already exists",
              };
              return res.json({ error });
            } else {
              let newUser = new userModel({
                name,
                email,
                password,
                // ========= Here role 1 for admin signup role 0 for customer signup =========
                role: 1,
              });
              newUser
                .save()
                .then((data) => {
                  return res.json({
                    success: "Account created successfully. Please login",
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        error = {
          ...error,
          password: "",
          name: "",
          email: "Email is not valid",
        };
        return res.json({ error });
      }
    }
  }

  /* User Login/Signin controller  */
  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        return res.json({
          error: "Invalid email or password",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          const token = jwt.sign(
            // Role Admin <Remove this>
            { _id: data._id, role: data.userRole },
            // { _id: data._id, role: 1 },
            JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            user: encode,
          });
        } else {
          return res.json({
            error: "Invalid email or password",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Guest Token Generation
  async newGuestToken(req, res) {
    // Generate random email to register
    const newEmail = 'guest' + Math.random().toString().substr(2, 8) + '@gmail.com';

    try {
      // Generate new guest account
      let newUser = new userModel({
        name : 'GUEST USER',
        email : newEmail,
        password : 'guestUserPassword',
        role: 0,
        isGuest : true,
      });
      newUser
        .save()
        .then((data) => {
          console.log('New Guest user created', data);

          // Login as that guest
          const token = jwt.sign(
            { _id: newUser._id, role: newUser.role },
            JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            user: encode,
          });

        })
        .catch((err) => {
          console.log(err);
        });
      // --
    } catch (err) {
      console.log(err);
    }
  }
  // Guest Token End

  // Guest Login with guest Id
  async guestLogin(req, res) {
    let { guestId } = req.body;

    try {
      // Check if that id belongs to guest or not
      const data = await userModel.findOne({ _id: guestId });
      if (!data) {
        return res.json({
          error: "Invalid Guest Id",
        });
      }

      if (!data.isGuest) {
        return res.json({
          error: "Account is not a guest",
        });
      }
      // ...
      
      // Login as that guest
      const token = jwt.sign(
        { _id: guestId, role: 0 },
        JWT_SECRET
      );
      const encode = jwt.verify(token, JWT_SECRET);
      return res.json({
        token: token,
        user: encode,
      });
    } catch (err) {
      console.log(err);
    }
  }
  // Guest Login End

}

const authController = new Auth();
module.exports = authController;
