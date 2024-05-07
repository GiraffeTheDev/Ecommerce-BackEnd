const { createToken, createRefreshToken } = require("../middleware/jwt");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const hashPassWord = async (password) => {
  try {
    const salt = bcrypt.genSaltSync(10); // Generate a salt with a cost factor of 10
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};
const checkMailExist = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await User.findOne({ email: email }).exec();
      if (response) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const registerAuth = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await checkMailExist(data.email);
      if (check) {
        resolve({
          message: "Email is exist!",
        });
      } else {
        const passHashed = await hashPassWord(data.password);
        const response = await User.create({
          email: data.email,
          password: passHashed,
          name: data.name,
        });
        if (response) {
          resolve({
            message: "Register Success",
          });
        } else {
          resolve({
            message: "Register failed",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};
const loginAuth = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await checkMailExist(data.email);
      if (response) {
        const user = await User.findOne({ email: data.email })
          .select(["password"])
          .exec();
        const userData = await User.findOne({ email: data.email })
          .select(["name", "role", "email"])
          .exec();
        if (user) {
          const check = bcrypt.compareSync(data.password, user.password);
          const payload = {
            email: userData.email,
            role: userData.role,
          };
          let token = createToken(payload);
          let refresh_token = createRefreshToken(payload);
          if (check) {
            resolve({
              user: userData,
              access_token: token,
              refresh_token: refresh_token,
              message: "Login successfull!",
            });
          } else {
            resolve({
              message: "Login failed!",
            });
          }
        }
      } else {
        resolve({
          message: "User is not exist!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};
module.exports = {
  registerAuth,
  loginAuth,
};
