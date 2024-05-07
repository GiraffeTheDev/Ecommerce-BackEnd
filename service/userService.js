const User = require("../models/users");

const getUserByIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = User.findById({ _id: id }).exec();
      if (response) {
        resolve({
          data: response,
          message: "Get user successfull!",
        });
      } else {
        resolve({
          message: "User not exist",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  });
};
const updateUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = User.updateOne(
        { _id: data.id },
        {
          name: data.name,
        }
      );
      if (response) {
        resolve({
          message: "update success",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  });
};
module.exports = { getUserByIdService, updateUserService };
