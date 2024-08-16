const User = require('../model/schema/user.schema');
const bcrypt = require('bcryptjs');
const ErrorWithStatus = require('../Exception/error-with-status.exception');
const register = async (name, email, password) => {
  //
  const user = await User.findOne({ email });
  if (user) {
    throw new ErrorWithStatus('User already registered', 400);
  }
  //password
  password = await bcrypt.hash(password, 10);

  //create User
  const newUser = new User({
    name,
    email,
    password,
  });
  await newUser.save();
  return {
    message: 'User created successfully',
    data: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  };
};

module.exports = { register };
