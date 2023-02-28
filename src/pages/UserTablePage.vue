<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import FilterIcon from "../assets/Filter.svg";
import SearchIcon from "../assets/Search.svg";
import ActiveIcon from "../assets/Active.svg";
import InactiveIcon from "../assets/Inactive.svg";
import PaidIcon from "../assets/Paid.svg";
import OverdueIcon from "../assets/Overdue.svg";
import UnpaidIcon from "../assets/Unpaid.svg";
import MoreIcon from "../assets/More.svg";
import Expand from "../assets/Expand.svg";
import { watchEffect } from "vue";

const tabs = ref(["All", "Paid", "Unpaid", "Overdue"]);
const tab = ref(0);

const checked = ref(false);

const showFilter = ref(false);

const sortFilters = [
  { id: "", title: "Default" },
  { id: "firstName", title: "First Name" },
  { id: "lastName", title: "Last Name" },
  { id: "dueDate", title: "Due Date" },
  { id: "lastLogin", title: "Last Login" },
];

const usersFilters = [
  { id: "", title: "All" },
  { id: "active", title: "Active" },
  { id: "inactive", title: "Inactive" },
];

const selectedUsers = ref([]);

const selectedSortFilter = ref("");
const selectedUserFilter = ref("");

const store = useStore();

const users = store.state.users.users;

const search = ref("");

const searchTruncate = (value) => {
  return value.toLowerCase().includes(search.value.toLowerCase());
};
const filteredUsers = computed(() => {
  let filtered = users;

  if (tab.value !== 0) {
    console.log(tabs.value[tab.value]);
    filtered = filtered.filter(
      (item) => item.paymentStatus === tabs.value[tab.value].toLowerCase()
    );
  }

  if (search.value.length > 2) {
    filtered = filtered.filter(
      ({ firstName, lastName, email, userStatus, paymentStatus }) =>
        searchTruncate(`${firstName} ${lastName}`) ||
        searchTruncate(email) ||
        userStatus == search.value ||
        paymentStatus == search.value
    );
  }

  if (selectedSortFilter.value !== "") {
    filtered = filtered.sort(
      (a, b) => a[selectedSortFilter.value] - b[selectedSortFilter.value]
    );
  }
  if (selectedUserFilter.value !== "") {
    filtered = filtered.filter(
      (user) => user.userStatus === selectedUserFilter.value
    );
  }

  return filtered;
});

const isAllSelected = ref(false);
const handleAllSelect = (e) => {
  if (isAllSelected.value) {
    selectedUsers.value = [];
  } else {
    selectedUsers.value = filteredUsers.value;
  }
};

const expanded = ref(0);
watchEffect(() => {
  // console.log(filteredUsers.value);
  // console.log(isAllSelected.value);
  // console.log(selectedUsers.value);
  console.log(expanded.value);
});

const expand = (user) => {
  expanded.value !== user.id
    ? (expanded.value = user.id)
    : (expanded.value = 0);

  console.log(expanded.value);
};
</script>

<template>
  <div class="text-textVariantColor font-[700] uppercase tracking-[0.1em]">
    Table Heading
  </div>
  <div class="flex justify-between items-center border-b-2 border-lightBg">
    <v-tabs v-model="tab" background-color="transparent" color="primary">
      <v-tab v-for="(tab, i) in tabs" :key="i">{{ tab }}</v-tab>
    </v-tabs>

    <p class="text-textPrimaryColor">
      Total payable amount:
      <span class="text-textVariantColor text-[18px]">
        <span class="font-[500] text-primaryColor"> $900.00 </span>USD</span
      >
    </p>
  </div>

  <div class="mt-[20px]"></div>

  <div class="bg-white rounded-lg min-h-[30vh] py-5">
    <div class="px-5 pb-5 flex justify-between">
      <div class="flex gap-4">
        <div class="filter-btn" @click="showFilter = !showFilter">
          <img class="filter-icon" :src="FilterIcon" alt="filter" />
          Filter
        </div>

        <div
          v-if="showFilter"
          class="absolute z-10 mt-10 w-[224px] min-h-[304px] bg-white rounded-md shadow-lg"
        >
          <div class="p-5 w-full font-[400] text-[14px] flex flex-col gap-2">
            <h3 class="text-textVariantColor uppercase font-[300]">Sort by:</h3>
            <div
              v-for="(filter, i) in sortFilters"
              :key="i"
              class="flex items-center justify-between rounded-[6px] hover:bg-[#F2F0F9] pointer h-[30px] p-1"
              @click="selectedSortFilter = filter.id"
            >
              <span class="text-gray-700">{{ filter.title }}</span>
              <input
                type="radio"
                :name="filter.id"
                :value="filter.id"
                class="accent-indigo-600 form-radio focus:ring-indigo-500 w-[15px] h-[15px]"
                v-model="selectedSortFilter"
              />
            </div>

            <div class="h-[2px] bg-backgroundColor"></div>

            <h3 class="text-textVariantColor uppercase font-[300]">Users:</h3>
            <div
              v-for="(filter, i) in usersFilters"
              :key="i"
              class="flex items-center justify-between rounded-[6px] hover:bg-[#F2F0F9] pointer h-[30px] p-1"
              @click="selectedUserFilter = filter.id"
            >
              <span class="text-gray-700">{{ filter.title }}</span>
              <input
                type="radio"
                :name="filter.id"
                :value="filter.id"
                class="accent-indigo-600 form-radio focus:ring-indigo-500 w-[15px] h-[15px]"
                v-model="selectedUserFilter"
              />
            </div>
          </div>
        </div>

        <div
          class="bg-backgroundColor w-[300px] h-[40px] rounded-[6px] flex items-center pl-2 gap-2 border-[2px] border-[transparant] transition-[.3s] hover:border-[2px] hover:border-primaryColor"
        >
          <img :src="SearchIcon" class="w-6 h-6" alt="search" />

          <input
            class="search-input text-textVariantColor"
            type="text"
            placeholder="Search Users by Name, Email or Date"
            v-model="search"
          />
        </div>
      </div>

      <v-btn color="primary"> PAY DUES </v-btn>
    </div>

    <v-table>
      <thead class="bg-backgroundColor">
        <tr class="uppercase tracking-[0.05em] table-header-row">
          <!-- <th v-for="(header, i) in headers" :key="i" class="text-left">
            {{ header.text }}
          </th> -->
          <th>
            <input
              type="checkbox"
              v-model="isAllSelected"
              @click="handleAllSelect"
              class="w-[18px] h-[18px] accent-primaryColor"
            />
          </th>
          <th>Name</th>

          <th>USER Status</th>

          <th>pAYMENT Status</th>

          <th>Amount</th>
          <th></th>
          <th>
            <img :src="MoreIcon" alt="more" />
          </th>
        </tr>
      </thead>
      <tbody class="w-full">
        <tr
          v-for="(user, i) in filteredUsers"
          :key="i"
          :class="`relative ${expanded == user.id ? 'expanded' : ''}`"
        >
          <td class="">
            <div class="flex gap-5">
              <input
                type="checkbox"
                class="w-[18px] h-[18px] accent-primaryColor"
              />

              <img
                :src="Expand"
                :class="`expand-icon ${expanded == user.id ? 'open' : ''}`"
                alt="expanded"
                @click="expand(user)"
              />
            </div>

            <div
              v-if="expanded == user.id"
              class="absolute top-20 left-0 border-b-2 border-t-2 border-lightBg w-full"
            >
              <table class="w-full">
                <thead>
                  <tr class="uppercase tracking-[0.05em] bg-[#F2F0F9] h-[50px]">
                    <th>Date</th>
                    <th>User Activity</th>
                    <th>Detail</th>
                  </tr>

                  <!-- <span class="uppercase tracking-[0.05em] table-header-row">
                    USERS
                  </span> -->
                </thead>

                <tbody>
                  <tr v-for="(activity, i) in user.activity" :key="i">
                    <td>{{ activity.date?.toISOString() }}</td>

                    <td>{{ activity.userActivity }}</td>

                    <td>{{ activity.detail }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
          <td>
            <h3 class="">{{ user.firstName }} {{ user.lastName }}</h3>
            <span class=""> {{ user.email }} </span>
          </td>
          <td class="font-[500]">
            <img
              v-if="user.userStatus == 'active'"
              :src="ActiveIcon"
              alt="active"
            />
            <img v-else :src="InactiveIcon" alt="active" />
            Last login: 14/APR/2020
          </td>
          <td class="font-[400]">
            <img
              v-if="user.paymentStatus == 'paid'"
              :src="PaidIcon"
              alt="paid"
            />

            <img
              v-else-if="user.paymentStatus == 'overdue'"
              :src="OverdueIcon"
              alt="overdue"
            />

            <img
              v-else-if="user.paymentStatus == 'unpaid'"
              :src="UnpaidIcon"
              alt="unpaid"
            />

            Paid on 15/APR/2020
          </td>
          <td class="max-w-[40]">
            <h3>${{ user.amount }}</h3>
            <span>USD</span>
          </td>

          <td class="max-w-[70px]">
            <div class="view-more">View More</div>
          </td>

          <td class="w-[60px]">
            <img :src="MoreIcon" alt="more" />
          </td>
        </tr>

        <!-- <tr>
          <td>one</td>
          <td>two</td>
          <td>three</td>
        </tr> -->

        <!-- <tr v-for="item in filteredItems" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.userStatus }}</td>
          <td>{{ item.paymentStatus }}</td>
          <td>{{ item.amount }}</td>
        </tr> -->
      </tbody>
    </v-table>
  </div>
</template>

<style>
.filter-btn {
  border: 2px solid #c6c2de;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 11px 3px;
  user-select: none;
  height: 40px;
  width: 88px;
  transition: 0.5s;
}

.filter-btn:hover {
  border-color: #6d5bd0;
}
.filter-icon {
  width: 20px;
  height: 20px;
}

.search-input {
  outline: none;
  border: none;
  background: none;
  width: 100%;
}

.table-header-row {
}
.table-header-row th {
  color: #6e6893;
}

tbody tr {
  padding: 2px;
  overflow-y: hidden;
  height: 60px;
  transition: height 0.5s ease-out;
}

tbody tr.expanded {
  height: 370px;
}

tbody tr.expanded td {
  vertical-align: top;
}

.expand-icon {
  transition: transform 0.5s ease-out;
}

.expand-icon.open {
  transform: rotate(180deg);
}

td h3 {
  color: #25213b;
  font-weight: 500;
}
td {
  color: #6e6893;
  font-size: 14px;
}

.view-more {
  width: 75px;
  height: 25px;
  padding: 1px 4px;
  cursor: pointer;
}

.view-more:hover {
  color: #6d5bd0;
  background-color: #f2f0f9;
  border-radius: 6px;
}
</style>
