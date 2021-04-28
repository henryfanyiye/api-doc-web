import request from "@/utils/request";

/**
 * Register new user
 */
export function register(data) {
  return request({
    url: "/api/user/register",
    method: "post",
    data
  });
}

/**
 * User login
 */
export function login(data) {
  return request({
    url: "/api/user/login",
    method: "post",
    data
  });
}

/**
 * Get user detail
 */
export function detail() {
  return request({
    url: "/api/user/detail",
    method: "get"
  });
}

/**
 * Get project list by user
 */
export function projectList(is_delete) {
  return request({
    url: "/api/user/project/list",
    method: "get",
    params: {
      is_delete
    }
  });
}

/**
 * User logout
 */
export function logout() {
  return request({
    url: "/api/user/logout",
    method: "get"
  });
}
