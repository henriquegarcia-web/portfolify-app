import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  database,
  get,
  ref,
  orderByChild,
  equalTo,
  query,
  set
} from '@/firebase/firebase'
import { handleTranslateFbError } from '@/utils/functions/firebaseTranslateErrors'

import { toaster } from 'evergreen-ui'

import { ISigninUser, ISignupUser, IUserData } from '@/@types/Auth'

// ============================================== CREATE ADMIN DATA

const createUserAccount = async (userData: IUserData): Promise<boolean> => {
  try {
    const userAccountsRef = ref(database, 'userAccounts/' + userData.userId)

    await set(userAccountsRef, userData)

    toaster.success('Credenciais salvas com sucesso')
    return true
  } catch (error) {
    toaster.danger('Falha ao salvar credenciais')
    return false
  }
}

// ============================================== LOGIN

const handleSigninUser = async ({
  userEmail,
  userPassword
}: ISigninUser): Promise<boolean> => {
  try {
    await signInWithEmailAndPassword(auth, userEmail, userPassword)

    return true
  } catch (error: any) {
    const errorCode = error.code

    if (errorCode === 'auth/user-not-found') {
      const registeredUserAccountsRef = ref(database, 'registeredUserAccounts')

      const emailQuery = query(
        registeredUserAccountsRef,
        orderByChild('userEmail'),
        equalTo(userEmail)
      )
      const emailQuerySnapshot = await get(emailQuery)

      if (emailQuerySnapshot.exists()) {
        toaster.warning('Para acessar sua conta, cadastre uma senha')
        return false
      }

      return false
    }

    const traslatedError = handleTranslateFbError(errorCode)
    toaster.danger(traslatedError)

    return false
  }
}

const handleSignupUser = async ({
  userName,
  userEmail,
  userPhone,
  userPassword
}: ISignupUser): Promise<boolean | string> => {
  try {
    // ----------------------------------

    const registeredUserAccountsRef = ref(database, 'registeredUserAccounts')

    const emailQuery = query(
      registeredUserAccountsRef,
      orderByChild('userEmail'),
      equalTo(userEmail)
    )
    const emailQuerySnapshot = await get(emailQuery)

    if (!emailQuerySnapshot.exists()) {
      toaster.danger('Esse e-mail não está disponível para cadastro')
      return false
    }

    // ----------------------------------

    const userAccountsRef = ref(database, 'userAccounts')

    const userQuery = query(
      userAccountsRef,
      orderByChild('userEmail'),
      equalTo(userEmail)
    )
    const userQuerySnapshot = await get(userQuery)

    if (userQuerySnapshot.exists()) {
      toaster.warning(
        'Essa conta já possuí cadastro, faça login para acessar o sistema'
      )
      return false
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    )

    if (userCredential) {
      const userData: IUserData = {
        userId: userCredential.user.uid,
        userName: userName,
        userEmail: userEmail,
        userPhone: userPhone,
        userCompanies: [],
        userRegisteredAt: Date.now()
      }

      const userDataResponse = await createUserAccount(userData)

      if (!userDataResponse) {
        toaster.danger('Falha ao realizar cadastro')
        return false
      }
    }

    toaster.success('Conta criada com sucesso')
    return true
  } catch (error: any) {
    const errorCode = error.code

    const traslatedError = handleTranslateFbError(errorCode)
    toaster.danger(traslatedError)

    console.error(error.message)
    return false
  }
}

// ============================================== LOGOUT

const handleLogoutUser = async (): Promise<boolean> => {
  try {
    await signOut(auth)

    return true
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.error('Erro ao deslogar usuário: ', errorMessage, errorCode)

    return false
  }
}

// ============================================== HANDLE GET USER DATA

const handleGetUserData = async (): Promise<IUserData | null> => {
  const user = auth.currentUser

  if (user) {
    try {
      const usersRef = ref(database, 'userAccounts/' + user.uid)

      const userQuerySnapshot = await get(usersRef)

      return userQuerySnapshot.val()
    } catch (error) {
      return null
    }
  }

  return null
}

// -----------------------------------------------------------------

export {
  handleSigninUser,
  handleSignupUser,
  handleLogoutUser,
  handleGetUserData
}
