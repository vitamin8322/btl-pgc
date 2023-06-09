import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../utils/constants";

export function fetchApi(
  url: string,
  method: "get" | "post" | "delete" | "put" = "get",
  body?: object | FormData,
  auth = true,
  contentType?: string
): Promise<any> {
  return fetch(url, {
    credentials: "include",
    method,
    body: body instanceof FormData ? body : JSON.stringify(body),
    headers:
      contentType !== "multipart/form-data"
        ? {
            "Content-Type": contentType || "application/json",
            Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` || "",
          }
        : {
            Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` || "",
          },

    cache: "no-store",
  }).then((res) => {
    // if (res.status >= 400) {
    //   // handle unauthorized error here.
    //   return res.json().then((data) => ({ status: res.status, data }));
    // }
    
    return res.json();
  });
}
