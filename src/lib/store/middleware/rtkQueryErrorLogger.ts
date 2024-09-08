import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function isFetchBaseQueryError(error: any): error is FetchBaseQueryError {
  return error && typeof error.status === "number";
}

const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if (isFetchBaseQueryError(action.payload)) {
        const errorMessage =
          (action.payload.data as { message?: string })?.message ||
          "An unexpected error occurred";

        toast.error(errorMessage, {
          autoClose: 3000,
          position: "bottom-right",
        });
      } else {
        toast.error("An unexpected error occurred");
      }
    }
    return next(action);
  };

export default rtkQueryErrorLogger;
