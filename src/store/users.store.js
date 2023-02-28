const state = {
  users: [
    {
      id: 1,
      firstName: "Justin",
      lastName: "Septimus",
      email: "envkt@example.com",
      userStatus: "active",
      paymentStatus: "paid",
      amount: 200,
      lastLogin: new Date("14/APR/2020"),
      paidOn: new Date("15/APR/2020"),
      activity: [
        ...Array(4).fill({
          date: new Date("12/APR/2020"),
          userActivity:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies.",
          detail:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus, sed purus eu semper morbi id nunc, adipiscing vitae. Ultricies suspendisse vestibulum.",
        }),
      ],
    },

    {
      id: 2,
      firstName: "Anika",
      lastName: "Rhiel Madsen",
      email: "envkt@example.com",
      userStatus: "active",
      paymentStatus: "overdue",
      amount: 200,
      lastLogin: new Date("14/APR/2020"),
      paidOn: new Date("15/APR/2020"),
      activity: [
        ...Array(4).fill({
          date: new Date("12/APR/2020"),
          userActivity:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies.",
          detail:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus, sed purus eu semper morbi id nunc, adipiscing vitae. Ultricies suspendisse vestibulum.",
        }),
      ],
    },

    {
      id: 3,
      firstName: "Erin",
      lastName: "Levin",
      email: "envkt@example.com",
      userStatus: "active",
      paymentStatus: "unpaid",
      amount: 200,
      lastLogin: new Date("14/APR/2020"),
      paidOn: new Date("15/APR/2020"),
      activity: [
        ...Array(4).fill({
          date: new Date("12/APR/2020"),
          userActivity:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies.",
          detail:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus, sed purus eu semper morbi id nunc, adipiscing vitae. Ultricies suspendisse vestibulum.",
        }),
      ],
    },

    {
      id: 4,
      firstName: "Mira",
      lastName: "Herwitz",
      email: "envkt@example.com",
      userStatus: "inactive",
      paymentStatus: "paid",
      amount: 200,
      lastLogin: new Date("14/APR/2020"),
      paidOn: new Date("15/APR/2020"),
      activity: [
        ...Array(4).fill({
          date: new Date("12/APR/2020"),
          userActivity:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies.",
          detail:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus, sed purus eu semper morbi id nunc, adipiscing vitae. Ultricies suspendisse vestibulum.",
        }),
      ],
    },
  ],
};

const mutations = {
  setItems(state, users) {
    state.users = users;
  },
};

const actions = {
  fetchItems({ commit }) {
    // simulate an API call to fetch the items
    setTimeout(() => {
      const users = [];

      commit("setItems", users);
    }, 1000);
  },
};

export default {
  state,
  mutations,
  actions,
};
