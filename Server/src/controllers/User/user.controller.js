import { User } from '../../models/user.models.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { EMAIL_REGEX } from '../../constants.js';
import jwt from 'jsonwebtoken';

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;

    await user.save({
      validateBeforeSave: false,
    });
    return {
      refreshToken,
      accessToken,
    };
  } catch (error) {
    throw new ApiError(500, 'Something went wrong while generating the Token ');
  }
};

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name: username, email, password, gender } = req.body;
  if ([username, email, gender, password].some((field) => !field || field.trim() === '')) {
    throw new ApiError(400, 'All fields are required');
  }

  if (!email.match(EMAIL_REGEX)) {
    throw new ApiError(400, 'Invalid email format');
  }
  //! validate the password format
  // if (!password.match('^(?=.*[a-zA-Z])(?=.*d).{6,}$')) {
  //   throw new ApiError(400, 'Password must contain at least 8 characters');
  // }
  // if the user exist already or not
  const existedUser = await User.findOne({
    email
  });
  if (existedUser) {
    throw new ApiError(409, 'Email already exist try with another email');
  }

  // create a user
  const user = await User.create({
    email,
    password,
    username: username.toLowerCase(),
    gender,
  });

  // check the user is created or not
  // not to give the refresh token and the password(sensitive info) to the frontend select("-name" "-name") to not fetch the data
  const curretUser = await User.findById(user._id).select('-password -refreshToken');

  if (!curretUser) {
    throw new ApiError(500, 'something went wrong while creating the user');
  }
  return res.status(201).json(new ApiResponse(201, curretUser, 'User Register Sucessfully'));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, 'Email is required ');
  }
  if (!email.match(EMAIL_REGEX)) {
    throw new ApiError(400, 'Invalid email format');
  }

  const Currentuser = await User.findOne({ email });
  if (!Currentuser) {
    throw new ApiError(404, 'User doesnot exist');
  }
  // validate the password
  // User.findOne chai mogodb ko method ho so use it with the schema name and isPasswordCorrect hamle define gare ko method ho so object bata access garne
  const isPasswordValid = await Currentuser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Incorrect Password');
  }

  // get the access and the refresh token
  const { refreshToken, accessToken } = await generateAccessTokenAndRefreshToken(Currentuser._id);

  //  getting the information of the user after the access and refresh token generated
  const loginedInUser = await User.findById(Currentuser._id).select('-password -refreshToken');

  // setting the cookies
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loginedInUser,
          refreshToken,
          accessToken,
        },
        'User loged In Sucessfully '
      )
    );
});

const logedOutUser = asyncHandler(async (req, res) => {
  const _id = req.user?._id;
  await User.findByIdAndUpdate(
    _id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, 'Sucessfully logout '));
});

const RefreshAcessToken = asyncHandler(async (req, res) => {
  const recivedToken = req.cookies.refreshToken || req.body.refreshToken;
  console.log(recivedToken);
  if (!recivedToken) {
    throw new ApiError(401, 'Unauthorized request');
  }

  const decodedToken = jwt.verify(recivedToken, process.env.REFRESH_TOKEN_SECRET);
  console.log(decodedToken);

  const user = await User.findById(decodedToken?._id);

  if (!user) {
    throw new ApiError(401, 'Invalid Refresh Token');
  }
  // compare the refreshtoken send by the user and in the database one
  if (recivedToken !== user?.refreshToken) {
    throw new ApiError(401, 'refresh token is expired');
  }
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
  };
  const { refreshToken, accessToken } = await generateAccessTokenAndRefreshToken(user._id);
  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          refreshToken,
          accessToken,
        },
        'Token refresh Sucessfully'
      )
    );
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, 'Both old and new passwords are required');
  }

  const user = await User.findById(req.user?._id);
  // comparing the password
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(404, 'Incorrect old Password');
  }

  // check if the new password is same as the old password by send the new password to the isPasswordCorrect method
  if (await user.isPasswordCorrect(newPassword)) {
    throw new ApiError(
      400,
      'New password cannot be the same as the old password try different password'
    );
  }

  // validation for the password
  if (!newPassword.match('^(?=.*[a-zA-Z])(?=.*d).{8,}$')) {
    throw new ApiError(
      400,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number'
    );
  }

  // set the new password
  user.password = newPassword;
  await user.save({
    validateBeforeSave: false, // bypass the validation
  });

  return res.status(200).json(new ApiResponse(200, {}, 'Password Change Sucessfully'));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  // req.user chai middleware bata aako ho
  return res.status(200).json(new ApiResponse(200, req.user, 'User fetch Sucessfully'));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { email, username } = req.body;
  if (!email && !username) {
    throw new ApiError(400, 'At least one field is required');
  }
  const currentUser = await User.findById(req.user?._id);
  if (!currentUser) {
    throw new ApiError(404, 'User not found');
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        email: email || currentUser.email,
        username: username || currentUser.username,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  ).select('-password -refreshToken');

  if (!user) {
    throw new ApiError(500, 'Something went wrong while updating the user');
  }
  return res.status(200).json(new ApiResponse(200, user, 'User Details Updated Sucessfully'));
});

export {
  registerUser,
  loginUser,
  logedOutUser,
  RefreshAcessToken,
  getCurrentUser,
  changeCurrentPassword,
  updateAccountDetails,
};
