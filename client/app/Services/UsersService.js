import store from "../store.js";

// @ts-ignore
let _sandBox = axios.create({
  baseURL: "//localhost:3000/api"
});

class UsersService {
  async findUser(user) {
    console.log("findUser service", user);

    let res = await _sandBox
      .get("/users/user/" + user.name)
      .then(res => {
        this.setActiveUser(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }
  constructor() {
    console.log("hello from UsersService");
  }

  async createUser(newUser) {
    console.log("new user before res", newUser);

    _sandBox
      .post("/users", newUser)
      .then(res => this.setActiveUser(res.data))
      .catch(err => {
        console.error(err);
      });
  }

  async editUser(userId, editedUser) {
    let userToUpdate = store.State.activeUser;
    console.log("old user", userToUpdate);
    userToUpdate.name = editedUser.name;
    console.log("user to update", userToUpdate);

    let res = await _sandBox
      .put("/users/" + userId, { name: editedUser.name })
      .then(res => {
        console.log("edited res", res);
      }); //api/users/:userId/update
  }

  async deleteUser(userId) {
    _sandBox
      .delete(`/users/${userId}`)
      .then(console.log("Successfully Deleted"))
      .catch(err => {
        console.error(err);
      });
  }
  async setActiveUser(userData) {
    let activeUser = userData;
    console.log("active user before commit", activeUser);

    store.commit("activeUser", activeUser);
  }
}

const usersService = new UsersService();
export default usersService;
