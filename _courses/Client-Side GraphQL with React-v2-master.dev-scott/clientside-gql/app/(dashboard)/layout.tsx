'use client'
import { ReactNode, useEffect } from 'react'
import Sidebar from './Sidebar'
import { isAuth } from '@/utils/token'
import { redirect } from 'next/navigation'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (!isAuth()) {
      redirect('/signin')
    }
  }, [])

  return (
    <div className="relative h-screen w-screen bg-slate-50">
      <aside className="absolute left-0 top-0 w-50 h-full">
        <Sidebar />
      </aside>
      <main className="w-[calc(100vw-200px)] h-full ml-50">
        <div className="p-3 h-full w-full">
          <div className="rounded-lg border w-full h-full bg-white">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
