import Follow from "../models/follow.model";
import { followUsersId, followThisUser } from "../utils/followUsers";

export const createFollow = async (req, res) => {
  try {
    const user = req.user;

    const existingFollow = await Follow.findOne({
      user: user._id,
      followed: req.body.followed,
    });

    if (existingFollow) {
      return res.status(400).json({ message: "User already followed" });
    }

    const follow = new Follow({
      user: user._id,
      followed: req.body.followed,
    });

    const newFollow = await follow.save();

    res.status(201).json({
      message: "Followed successfully",
      user: user._id,
      follow: newFollow,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const user = req.user;

    const existingFollow = await Follow.findOne({
      user: user._id,
      followed: req.body.followed,
    });

    if (!existingFollow) {
      return res.status(400).json({ message: "User not followed" });
    }

    await Follow.findByIdAndDelete(existingFollow._id);

    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const following = async (req, res) => {
  const userId = req.query.userId || req.user._id;

  try {
    const following = await followUsersId(userId);

    if (!following) {
      return res.status(404).json({ message: "Follows not found" });
    }

    res.status(200).json(following);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const followers = async (req, res) => {
  const userId = req.query.userId || req.user._id;

  try {
    const followers = await followUsersId(userId);

    if (!followers) {
      return res.status(404).json({ message: "Follows not found" });
    }

    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
