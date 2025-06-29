import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
function AdminLayout() {

  const [openSidebar,setOpenSidebar]=useState(false)
  return (
    <div className='flex min-h-screen w-full'>
       

        {/* admin-sidebar */}
        <AdminSidebar open={openSidebar} setOpen={setOpenSidebar}/>
        <div className='flex flex-1 flex-col'>
            {/* admin-header */}
            <AdminHeader setOpen={setOpenSidebar}/>
            <main className='flex-1 flex bg-muted/40 p-4 md:p-6 flex-col'>
                <Outlet/>
            </main>

        </div>

      
    </div>
  )
}

export default AdminLayout
