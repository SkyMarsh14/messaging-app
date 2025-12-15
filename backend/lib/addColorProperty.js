import stringToColor from "string-to-color";
// Adds color property for users who do not have a profile picutre
// Color will always be the same for the same string input, therefore, not storing the colors on the db.
const addColorProperty = (userArray) => {
  return Promise.all(
    userArray.map((user) => {
      if (user.profile) return user; // If no profile, then skip.
      user["color"] = stringToColor(user.name);
      return user;
    })
  );
};
export default addColorProperty;
