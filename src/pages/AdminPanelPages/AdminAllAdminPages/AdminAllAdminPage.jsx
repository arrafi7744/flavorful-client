import React from 'react'
import GlobalHeaders from '../../../components/GlobalComponents/GlobalHeaders/GlobalHeaders'
import AdminAllAdminsTable from '../../../components/AdminDashCompos/AdminAllAdminsTable/AdminAllAdminsTable'

function AdminAllAdminPage() {
  return (
    <div className="w-full h-full rounded-lg shadow-md px-10 bg-white">
    <div className="w-full bg-white rounded px-10 pt-10">
      <GlobalHeaders title={'All Users/Customers'} searchFilter={'User Full Name'}/>
    </div>

    <div className="bg-white w-full pb-10 rounded">
      <AdminAllAdminsTable/>
    </div>
  </div>
  )
}

export default AdminAllAdminPage