import { useNavigate } from 'react-router-dom'
import * as S from './styles'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

// import { handleSigninUser } from '@/firebase/auth'

const signinSchema = Yup.object().shape({
  userEmail: Yup.string().required().email(),
  userPassword: Yup.string().required().min(8)
})

import { ISigninUser } from '@/@types/Auth'

const UserSignin = () => {
  const navigate = useNavigate()

  const { handleSubmit, register, formState, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(signinSchema),
    defaultValues: {
      userEmail: '',
      userPassword: ''
    }
  })

  const { errors, isSubmitting, isValid } = formState

  const handleUserSignin = async (data: ISigninUser) => {
    if (!isValid) return

    // const signupUserResponse = await handleSigninUser({
    //   userEmail: data.userEmail,
    //   userPassword: data.userPassword
    // })

    // if (signupUserResponse) {
    //   reset()
    //   navigate('/user/companies')
    // }
  }

  return (
    <S.UserSignin>
      <S.UserSigninFormContainer>
        <S.UserSigninForm onSubmit={handleSubmit(handleUserSignin)}>
          <input {...register('userEmail')} type="email" placeholder="E-mail" />
          <input
            {...register('userPassword')}
            type="password"
            placeholder="Senha"
          />

          <S.UserSigninToSignup
            type="button"
            onClick={() => navigate('/admin/cadastrar')}
          >
            Não cadastrou sua senha? <b>Cadastrar</b>
          </S.UserSigninToSignup>

          <button type="submit">Entrar</button>
        </S.UserSigninForm>
      </S.UserSigninFormContainer>
    </S.UserSignin>
  )
}

export default UserSignin
