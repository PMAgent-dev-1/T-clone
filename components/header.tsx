"use client"

import { Button } from "@/components/ui/button"
import { LogOut, FileText } from "lucide-react"

export function Header() {
  const handleLogout = () => {
    // TODO: ログアウト処理
    window.location.href = "/login"
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-2xl font-semibold text-gray-900">ダッシュボード</h1>

      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-600">
          社内テストアカウント <span className="font-medium">管理者</span>
        </div>
        <Button variant="outline" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          マニュアル
        </Button>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          ログアウト
        </Button>
      </div>
    </header>
  )
}
