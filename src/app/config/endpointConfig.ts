export const API_ENDPOINTS = {
  BASE: "http://localhost:5000",
  BASEURL: "http://localhost:5000/api",
  //BASEURL: https://pisara-service-dev-e9953c1dd9d9.herokuapp.com/api

  USER: {
    GET_ALL: "/user/get/all",
    GET_BY_ID: "/user/get/:id",
    CREATE: "/user/create",
    UPDATE: "/user/update",
    REMOVE: "/user/remove/:id",
    LOGIN: "/user/login",
    LOGOUT: "/user/logout",
    CHECKLOGIN: "/current/user",
    SEARCH: "/user/search",
  },

  BOARD: {
    GET_ALL: "/board/get/all",
    GET_BY_ID: "/board/get/:id",
    POST: "/board/create",
    PUT: "/board/update",
    DELETE: "/board/remove/:id",
    SEARCH: "/board/search",
    ADD_COLUMN: "/board/addcolumn",
    EDIT_COLUMN: "/board/editcolumn",
    DELETE_COLUMN: "/board/deletecolumn/:boardid/:columnid",
    MOVE_STATUS: "/board/movestatus",
  },

  PROJECT: {
    GET_ALL: "/project/get/all",
    GET_BY_ID: "/project/get/:id",
    GET_LATEST: "/project/get/latest",
    CREATE: "/project/create",
    UPDATE: "/project/update",
    REMOVE_BY_ID: "/project/remove/:id",
    SEARCH: "/project/search",
    GET: "/user/get/all",
    POST: "/user/create",
    PUT: "/user/update",
    DELETE: "/user/remove/:id",
    LOGIN: "/user/login",
    CHECKLOGIN: "/current/user",
    LOGOUT: "/user/logout",
    ADD_MEMBER: "/project/addmember",
    UPDATE_MEMBER_PERMISSIONS: "/project/update/permissions",
    REMOVE_MEMBER: "/project/remove/member/:projectId/:userId",
    UPDATE_DETAILS: "/project/update/details",
    UPDATE_STATUS_NOTES: "/project/update/statusnotes",
  },

  ITEM: {
    GET_ALL: "/item/get/all",
    GET_BY_ID: "/item/get/:id",
    GET_BY_PROJECT_ID: "/item/get/project/:projectId",
    CREATE: "/item/create",
    UPDATE: "/item/update",
    REMOVE_BY_ID: "/item/remove/:id",
    SEARCH: "/item/search",
    SEARCH_ITEM: "/item/searchitem",
    ADD_COMMENT: "/item/:itemId/addcomment",
    DELETE_COMMENT: "/item/:itemId/removecomment",
    ADD_IMAGE: "/item/:itemId/addimage",
    GET_MY_ITEMS: "/item/get/myitems/:userId",
    MOVE_STATUS: "/item/movestatus",
    ADD_CHILD: "/item/addchild",
    REMOVE_CHILD: "/item/removechild",
    FILTER: "/item/filter",
  },

  WORKFLOW: {
    GET_ALL: "/workflow/get/all",
    GET_BY_ID: "/workflow/get/:id",
    CREATE: "/workflow/create",
    UPDATE: "/workflow/update",
    REMOVE_BY_ID: "/workflow/remove/:id",
    SEARCH: "/workflow/search",
  },

  CUSTOMFIELD: {
    GET: "/customfield/get/all",
    GET_BY_ID: "/customfield/get/:id",
    POST: "/customfield/create",
    PUT: "/customfield/update",
    DELETE: "/customfield/remove/:id",
  },

  FIELD: {
    GET_ALL: "/field/get/all",
    GET_BY_ID: "/field/get/:id",
    CREATE: "/field/create",
    UPDATE: "/field/update",
    REMOVE_BY_ID: "/field/remove/:id",
    SEARCH: "/field/search",
  },
};
