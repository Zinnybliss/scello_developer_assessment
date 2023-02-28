import { createStore } from "vuex";
import users from "./users.store";

export default createStore({
  modules: {
    users,
  },
});
