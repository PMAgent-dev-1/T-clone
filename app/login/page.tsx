"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, Phone } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setIsLoading(true)

    try {
      // TODO: Supabase認証の実装
      // await supabase.auth.signInWithOAuth({ provider: 'anonymous' })

      // 仮の認証処理（2秒待機）
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // 認証成功後、ダッシュボードへリダイレクト
      router.push("/dashboard")
    } catch (error) {
      console.error("ログインエラー:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 青いグラデーション背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        {/* 背景の装飾的な図形 */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* ログインカード */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/30">
            {/* ロゴ・タイトル */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">テレAIクローン</h1>
            </div>

            {/* ログインボタン */}
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition-colors"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ログイン中...
                </>
              ) : (
                "ログイン"
              )}
            </Button>

            {/* 下部テキスト */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-white/70 text-sm">ワンクリックでアクセス</p>
              <p className="text-white/60 text-xs">管理者権限でログインします</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
