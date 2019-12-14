import UsersService from "../Services/UsersService.js";
import store from "../store.js";

//Private
function _draw() {
  let users = store.State.users;
  console.log(users);
}

function _drawActiveUser() {
  let activeUser = store.State.activeUser;
  console.log("activeUser for draw", activeUser);

  let template = /* html */ `
    <form
      class="text-left p-3"
      onsubmit="app.usersController.editUser('${activeUser.id}', event), app.usersController.toggleEditUserFormOff()"
    >
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Username..."
          required
        />
      </div>
      <button type="submit" class="btn btn-primary btn-block">
        Edit User
      </button>
    </form>
    <button type="button" onclick="app.usersController.deleteUser('${activeUser.id}')" class="btn btn-danger btn-block">
        Delete User
      </button>
  `;
  document.querySelector("#user-edit-ui").innerHTML = template;
}
//Public
export default class UsersController {
  toggleUserFormOn() {
    document.querySelector("#user-ui").classList.remove("d-none");
  }

  toggleUserFormOff() {
    document.querySelector("#user-ui").classList.add("d-none");
  }

  toggleEditUserFormOn() {
    document.querySelector("#user-edit-ui").classList.remove("d-none");
  }

  toggleEditUserFormOff() {
    document.querySelector("#user-edit-ui").classList.add("d-none");
  }

  toggleFindUserFormOn() {
    document.querySelector("#user-login-ui").classList.remove("d-none");
  }

  toggleFindUserFormOff() {
    document.querySelector("#user-login-ui").classList.add("d-none");
  }
  constructor() {
    store.subscribe("activeUser", _drawActiveUser);
    console.log("Hello from UsersController");
  }

  async createUser(event) {
    try {
      event.preventDefault();
      let formData = event.target;
      let newUser = {
        name: formData.name.value
      };
      console.log(newUser);

      await UsersService.createUser(newUser);
      formData.reset();
    } catch (error) {
      console.error(error);
    }
  }

  async findUser(event) {
    try {
      event.preventDefault();
      let formData = event.target;
      let user = {
        name: formData.name.value
      };
      console.log("user login", user);

      await UsersService.findUser(user);
      formData.reset();
    } catch (error) {
      console.error(error);
    }
  }

  async editUser(userId, event) {
    try {
      event.preventDefault();
      let formData = event.target;
      let editedUser = {
        name: formData.name.value
      };
      console.log("edited user", editedUser);
      await UsersService.editUser(userId, editedUser);
      formData.reset();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUser(userId) {
    UsersService.deleteUser(userId);
  }
}
