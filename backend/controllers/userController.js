import User from "../models/UserModel.js";

//create user api
const Createuser = async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;
    const NewUser = new User({
      name,
      email,
      address,
      phone,
    });
    await NewUser.save();
    res
      .status(200)
      .json({ success: true, Message: "User Created Successfully", NewUser });
  } catch (error) {
    console.log(error);
    res
      .status(200)
      .json({ success: false, Message: "internal server error", NewUser });
  }
};

//read api
const ReadUser = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};
//read api
const GetOne = async (req, res) => {
  let { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

//update user
const UpdateUser = async (req, res) => {
  try {
    let { id } = req.params;
    let UpdatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!UpdatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    res.status(200).json({
      success: true,
      message: "user updated successfully",
      UpdatedUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

//delete user
const DeleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    let DeletedUser = await User.findByIdAndDelete(id);
    if (!DeletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
      DeletedUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

export { Createuser, ReadUser, UpdateUser, DeleteUser, GetOne };
