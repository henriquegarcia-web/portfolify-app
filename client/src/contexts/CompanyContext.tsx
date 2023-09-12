// import {
//   createContext,
//   useMemo,
//   useContext,
//   useState,
//   useEffect,
//   useCallback
// } from 'react'

// import { getCompanyData } from '@/firebase/company'

// import { ICompanyData } from '@/@types/Auth'

// interface CompanyContextData {
//   companyId: string | null
//   companyData: any
//   isCompanySelected: boolean
//   handleActiveCompany: (companyId: string | null) => void
// }

// export const CompanyContext = createContext<CompanyContextData>(
//   {} as CompanyContextData
// )

// const CompanyProvider = ({ children }: { children: React.ReactNode }) => {
//   // =================================================================

//   const [companyId, setCompanyId] = useState<string | null>(null)
//   const [companyData, setCompanyData] = useState<ICompanyData | null>(null)

//   const isCompanySelected = useMemo(() => {
//     return companyId != null
//   }, [companyId])

//   // =================================================================

//   const handleActiveCompany = useCallback((companyId: string | null) => {
//     setCompanyId(companyId)
//   }, [])

//   // ------------------------------------------------------------------

//   useEffect(() => {
//     const unsubscribe = getCompanyData(companyId, (accounts) => {
//       setCompanyData(accounts)
//     })

//     return () => {
//       unsubscribe()
//     }
//   }, [companyId])

//   // =================================================================

//   const CompanyContextValues = useMemo(() => {
//     return {
//       companyId,
//       companyData,
//       isCompanySelected,
//       handleActiveCompany
//     }
//   }, [companyData, companyId, isCompanySelected, handleActiveCompany])

//   return (
//     <CompanyContext.Provider value={CompanyContextValues}>
//       {children}
//     </CompanyContext.Provider>
//   )
// }

// function useCompany(): CompanyContextData {
//   const context = useContext(CompanyContext)

//   if (!context) throw new Error('useCompany must be used within a UserProvider')

//   return context
// }

// export { CompanyProvider, useCompany }
