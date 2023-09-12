import { useNavigate } from 'react-router-dom'
import * as S from './styles'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

// import { handleSignupUser } from '@/firebase/auth'

import { ISignupUser } from '@/@types/Auth'

const signupSchema = Yup.object().shape({
  userName: Yup.string().required(),
  userEmail: Yup.string().required().email(),
  userPhone: Yup.string().required('Telefone é obrigatório'),
  userPassword: Yup.string().required().min(8),
  userConfirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('userPassword')])
})

const UserSignup = () => {
  const navigate = useNavigate()

  const { handleSubmit, register, formState, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(signupSchema),
    defaultValues: {
      userName: '',
      userEmail: '',
      userPhone: '',
      userPassword: '',
      userConfirmPassword: ''
    }
  })

  const { errors, isSubmitting, isValid } = formState

  const handleUserSignup = async (data: ISignupUser) => {
    if (!isValid) return

    // const signupUserResponse = await handleSignupUser({
    //   userName: data.userName,
    //   userEmail: data.userEmail,
    //   userPhone: data.userPhone,
    //   userPassword: data.userPassword
    // })

    // if (signupUserResponse) {
    //   reset()
    //   navigate('/user/companies')
    // }
  }

  return (
    <S.UserSignup>
      <S.UserSignupFormContainer>
        <S.UserSignupForm onSubmit={handleSubmit(handleUserSignup)}>
          <input
            {...register('userName')}
            type="text"
            placeholder="Nome completo"
          />
          <input {...register('userEmail')} type="email" placeholder="E-mail" />
          <input {...register('userPhone')} type="tel" placeholder="Telefone" />
          <input
            {...register('userPassword')}
            type="password"
            placeholder="Senha"
          />
          <input
            {...register('userConfirmPassword')}
            type="password"
            placeholder="Confirmar senha"
          />

          <S.UserSignupToSignin
            type="button"
            onClick={() => navigate('/admin/entrar')}
          >
            Já possuí conta? <b>Entrar</b>
          </S.UserSignupToSignin>

          <button type="submit">Criar Conta</button>
        </S.UserSignupForm>
      </S.UserSignupFormContainer>
    </S.UserSignup>
  )
}

export default UserSignup
