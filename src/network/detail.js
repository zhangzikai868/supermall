import { request } from "./request";
export function getDatail(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
  });
}
