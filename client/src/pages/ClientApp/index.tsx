import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as S from './styles'

const ClientApp = () => {
  const params = useParams()

  const { companyId } = params

  useEffect(() => {
    console.log(companyId)
  }, [companyId])

  return <S.ClientApp>ClientApp</S.ClientApp>
}

export default ClientApp
