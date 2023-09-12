// import {
//   database,
//   ref,
//   push,
//   onValue,
//   off,
//   query,
//   equalTo,
//   get,
//   remove
// } from '@/firebase/firebase'
// import { toaster } from 'evergreen-ui'

// import {
//   DataSnapshot,
//   DatabaseReference,
//   orderByChild
// } from 'firebase/database'

// // =================================================== CREATE ADMIN ACCOUNT

// // const adminData = {
// //   adminName: '',
// //   adminEmail: adminEmail,
// //   adminPhone: '',
// //   passwordCreated: false,
// //   adminCompanies: []
// // }

// const registerAdmin = async (adminEmail: string): Promise<boolean> => {
//   try {
//     const adminAccountsRef = ref(database, 'registeredAdminAccounts')

//     const emailQuery = query(
//       adminAccountsRef,
//       orderByChild('adminEmail'),
//       equalTo(adminEmail)
//     )
//     const emailQuerySnapshot = await get(emailQuery)

//     if (emailQuerySnapshot.exists()) {
//       toaster.danger('Esse e-mail já existe no banco de dados')
//       return false
//     }

//     const adminData = {
//       adminEmail: adminEmail,
//       adminCreatedAt: Date.now()
//     }

//     await push(ref(database, 'registeredAdminAccounts'), adminData)

//     toaster.success('Usuário admin cadastrado com sucesso')
//     return true
//   } catch (error) {
//     toaster.danger('Falha ao cadastrar usuário admin')
//     return false
//   }
// }

// // =================================================== DELETE ADMIN ACCOUNT

// const deleteAdminAccount = async (adminEmail: string): Promise<boolean> => {
//   try {
//     const adminAccountsRef = ref(database, 'registeredAdminAccounts')
//     const adminQuery = query(
//       adminAccountsRef,
//       orderByChild('adminEmail'),
//       equalTo(adminEmail)
//     )
//     const querySnapshot = await get(adminQuery)

//     if (querySnapshot.exists()) {
//       const adminId = Object.keys(querySnapshot.val())[0]
//       await remove(ref(database, `registeredAdminAccounts/${adminId}`))
//       return true
//     } else {
//       return false
//     }
//   } catch (error) {
//     return false
//   }
// }

// // =================================================== GET ADMIN ACCOUNTS

// export interface IAdminData {
//   adminEmail: string
//   adminCreatedAt: number
// }

// const getAdminAccounts = (callback: (accounts: IAdminData[]) => void) => {
//   const adminAccountsRef: DatabaseReference = ref(
//     database,
//     'registeredAdminAccounts'
//   )

//   const listener = (snapshot: DataSnapshot) => {
//     try {
//       const adminAccounts: IAdminData[] = []

//       snapshot.forEach((adminSnapshot) => {
//         const adminId = adminSnapshot.key
//         const accountData = adminSnapshot.val()
//         const account = { adminId, ...accountData }
//         adminAccounts.push(account)
//       })

//       callback(adminAccounts)
//     } catch (error) {
//       console.error('Erro ao obter as contas de admin disponíveis:', error)
//     }
//   }

//   onValue(adminAccountsRef, listener)

//   return () => {
//     off(adminAccountsRef, 'value', listener)
//   }
// }

// export { registerAdmin, deleteAdminAccount, getAdminAccounts }
