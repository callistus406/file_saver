import {
    Request as ERequest,
    Response as EResponse,
    NextFunction as ENextFunction,
  } from 'express'
  export interface Request extends ERequest {
    startTime: [number, number]
    user?: {
      userId: number,
      username:string
    }
      data?:null,
    originalRoute: ERequest['route']

  }
  export interface Response extends EResponse {
    // sentry?: string
    apiCode?: string
  }
  