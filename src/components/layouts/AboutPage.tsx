import { useNavigate } from "react-router-dom"
import Header, { type HeaderNavKey } from "./Header"
import { defaultPathFor } from "../../core/routes"

export default function AboutPage() {
  const navigate = useNavigate()

  const handleNavChange = (key: HeaderNavKey) => {
    if (key === "about") return
    navigate(defaultPathFor(key === "docs" ? "docs" : "components"))
  }

  return (
    <div className="flex flex-col h-screen">
      <Header activeNav="about" onNavChange={handleNavChange} />
      <div className="flex-1 flex items-center justify-center text-sm text-slate-500">
        About page — coming soon.
      </div>
    </div>
  )
}
