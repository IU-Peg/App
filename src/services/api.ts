import { isRejected } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse, Method } from "axios";

const api = axios.create({
  baseURL: "https://raw.githubusercontent.com/IU-Peg/jsons-teste/master/",
  timeout: 10000
});

export interface IRequest {
  status: number,
  data: any
}

const TreatmentAxiosError = async (error: AxiosError) => {
  if(!error.response){
    console.log("Erro de conexao com servidores")
    return undefined
  }else{
    // tratamento
    const response: IRequest = {
      data: error?.response?.data,
      status: error?.response.status
    }
    switch(error.response.status){
      case 401:
        console.log("NAO AUTENTICADO")
    }
    return response
  }
}

export const REQUEST = async (method: Method, url: string, data?: any, _headers?: any, timeout?: number): Promise<IRequest|undefined> => {
  const headers = {..._headers, Accept: 'application/json', 'Content-Type': 'application/json' }
  return await api.request({url, method, data, headers, timeout})
    .then((resp: AxiosResponse) => {
      return {data: resp.data, status: resp.status}
    },async function (error: AxiosError) {
      return await TreatmentAxiosError(error)
    }).catch((error)=>{
      console.log("ERRO " + error)
      return undefined
  }).finally(()=>{
    console.log("FINALIZOU REQUEST")
  })
}