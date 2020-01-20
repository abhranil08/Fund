import { database } from './config';

export const getUsernameFromDatabase = async (userId) => {
  try {
    const userRef = await database.ref('users/' + userId).once('value');
    const user = userRef.val();
    return user.username;
  } catch (err) {
    console.log(err);
    return '';
  }
}
export const writeUserData = (userId, userName, email) => {
  database.ref('users/' + userId).set({
    username: userName,
    email: email
  });
}