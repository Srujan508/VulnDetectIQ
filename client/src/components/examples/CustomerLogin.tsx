import { CustomerLogin } from "../customer-login"

export default function CustomerLoginExample() {
  return (
    <CustomerLogin onLogin={(credentials) => console.log('Customer login:', credentials)} />
  )
}