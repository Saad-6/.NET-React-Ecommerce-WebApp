import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export default interface CartApiResponse {
  data?: {
    isSuccess:boolean;
    errorMessages:Array<string>;
    result:any
  },
  error?: any;
  
}