import authService from "./auth.service.js";
import createToken from "../../middlewares/createToken.js";

const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const user = await authService.registerUser(
      fullName,
      email,
      password,
      role
    );
    let token = createToken(user.id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(201)
      .json({ success: true, message: "User Registered", user, token });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUser(email, password);
    let token = createToken(user.id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(201)
      .json({ success: true, message: "User Login", user, token });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: e.message });
  }
};

const logout = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  return res.json({ msg: "User Logged out" });
};

const authController = {
  register,
  login,
  logout,
};

export default authController;