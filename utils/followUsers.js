import Follow from "../models/follow.model";

export const followUsersId = async (userId) => {
  if (!userId) {
    throw new Error("userId is required");
  }

  try {
    let following = (
      await Follow.find({ user: userId }, "followed -_id").lean()
    ) //lo convierte el resultado en formato js para poder aplicar map, si no, habria que hacer un loop o un forEach y sacar los datos a un array
      .map((doc) => doc.followed);
    let followers = (
      await Follow.find({ followed: userId }, "user -_id").lean()
    ).map((doc) => doc.user);

    return {
      following,
      followers,
    };
  } catch (error) {
    throw error;
  }
};

export const followThisUser = async (userId, profileId) => {
  try {
    let following = await Follow.findOne({ user: userId, followed: profileId });

    let followers = await Follow.findOne({ user: profileId, followed: userId });

    return {
      following,
      followers,
    };
  } catch (error) {
    throw error;
  }
};
