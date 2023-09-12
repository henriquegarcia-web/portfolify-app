import styled from 'styled-components'
import { Window } from '@/utils/styles/globals'

export const UserSignup = styled(Window)`
  justify-content: center;
  align-items: center;
`

export const UserSignupFormContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 280px;
`

export const UserSignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  row-gap: 5px;

  button {
    margin-top: 10px;
  }
`
export const UserSignupToSignin = styled.button`
  cursor: pointer;
  font-size: 12px;
  padding: 0;
  width: fit-content;

  background-color: transparent;

  b {
    font-weight: 600;
  }
`
