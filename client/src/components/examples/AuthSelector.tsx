import { AuthSelector } from "../auth-selector"

export default function AuthSelectorExample() {
  return (
    <AuthSelector onSelectRole={(role) => console.log('Selected role:', role)} />
  )
}