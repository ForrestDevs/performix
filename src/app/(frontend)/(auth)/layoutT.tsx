// import React from 'react'
// import { getCurrentUser } from '@/lib/data/auth'
// import { redirect } from 'next/navigation'

// export const dynamic = 'force-dynamic'

// export default async function AuthLayout({ children }: { children: React.ReactNode }) {
//   const user = await getCurrentUser()

//   if (user) {
//     redirect('/')
//   }

//   return (
//     <div className="bg-background flex flex-col justify-center h-full">
//       <div className="container max-w-lg mx-auto px-4 py-8 flex flex-col justify-center">
//         <div className="bg-white p-8 rounded-lg shadow-md">{children}</div>
//       </div>
//     </div>
//   )
// }
