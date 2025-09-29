import { AdminLogin } from "../admin-login"

export default function AdminLoginExample() {
  return (
    <AdminLogin onLogin={(credentials) => console.log('Admin login:', credentials)} />
  )
}