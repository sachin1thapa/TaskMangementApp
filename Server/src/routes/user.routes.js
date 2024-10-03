import { Router } from 'express';
import {
  changeCurrentPassword,
  getCurrentUser,
  logedOutUser,
  loginUser,
  RefreshAcessToken,
  registerUser,
  updateAccountDetails,
} from '../controllers/User/user.controller.js';

import { verifyJWT } from '../middlewares/isAuth.middelware.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logedOutUser);
router.route('/refresh-token').post(RefreshAcessToken);




router.route('/current-user').get(verifyJWT, getCurrentUser);
router.route('/update-account').patch(verifyJWT, updateAccountDetails);
router.route('/change-password').patch(verifyJWT, changeCurrentPassword);

router.route('/refresh-token').post(RefreshAcessToken);



export default router;
