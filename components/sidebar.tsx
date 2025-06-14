"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Phone, ShoppingCart, Users, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "ダッシュボード", href: "/dashboard", icon: LayoutDashboard },
  { name: "電話番号", href: "/numbers", icon: Phone },
  { name: "注文一覧", href: "/orders", icon: ShoppingCart },
  { name: "顧客一覧", href: "/customers", icon: Users },
  { name: "設定", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-800">
      {/* ロゴ */}
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
            <Phone className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold text-white">テレAIクローン</span>
        </div>
      </div>

      {/* ナビゲーション */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
