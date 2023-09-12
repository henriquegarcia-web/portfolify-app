/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ISigninUser {
  userEmail: string
  userPassword: string
}

export interface ISignupUser {
  userName: string
  userEmail: string
  userPhone: string
  userPassword: string
}

// export interface ISigninAdmin extends ISigninUser {}

export interface IUserData {
  userId: string
  userName: string
  userEmail: string
  userPhone: string
  userCompanies: any
  userRegisteredAt: number
}

// export interface ICompanyData {
//   companyId: string
//   companyName: string
// }

// export interface ICreateCompanyData {
//   companyId: string
//   companyName: string
// }
