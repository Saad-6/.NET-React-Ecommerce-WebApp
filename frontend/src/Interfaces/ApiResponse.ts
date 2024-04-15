import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export default interface apiResponse {
  data?: {
    isSuccess:boolean;
    errorMessages:Array<string>;
    result:{
      [key:string]:string
    }
  },
  error?: any;
  
}