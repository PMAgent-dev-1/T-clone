"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, ShoppingCart, BarChart3, Activity } from "lucide-react"

const kpiData = [
  {
    title: "電話番号数",
    value: "24",
    change: "先月比: +3件 (14%)",
    icon: Phone,
    color: "bg-orange-500",
    buttonText: "番号一覧",
    buttonHref: "/numbers",
  },
  {
    title: "注文数",
    value: "16件",
    change: "先月比: 25件 (64%)",
    icon: ShoppingCart,
    color: "bg-blue-500",
    buttonText: "注文一覧",
    buttonHref: "/orders",
  },
  {
    title: "本日注文数",
    value: "3件",
    change: "上限: 20,000人 (1%)",
    icon: BarChart3,
    color: "bg-red-500",
    buttonText: "詳細一覧",
    buttonHref: "/orders",
  },
  {
    title: "システム状況",
    value: "正常",
    change: "2025-05-26 〜 2025-06-25",
    details: ["着信: 36 回", "SMS送信: 1 回", "販売停止時案内: 35 回", "非通知時案内: 10 回"],
    icon: Activity,
    color: "bg-blue-600",
    buttonText: "詳細はこちら",
    buttonHref: "/settings",
  },
]

const announcements = [
  {
    title: "システムメンテナンスのお知らせ",
    date: "2025-05-13 09:11:06",
  },
  {
    title: "新機能リリースのご案内",
    date: "2025-05-01 17:57:55",
  },
  {
    title: "セキュリティアップデートの実施について",
    date: "2025-04-25 17:26:00",
  },
]

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          {/* お知らせセクション */}
          <Card className="mb-6">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-lg">重要なお知らせ</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {announcements.map((announcement, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <span className="text-gray-900">{announcement.title}</span>
                    <span className="text-sm text-gray-500">{announcement.date}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t bg-gray-50">
                <Button variant="outline" className="w-full">
                  もっと見る
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* KPIカード */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${kpi.color}`}>
                      <kpi.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                    <p className="text-sm text-gray-500">{kpi.change}</p>

                    {kpi.details && (
                      <div className="mt-3 space-y-1">
                        {kpi.details.map((detail, idx) => (
                          <p key={idx} className="text-xs text-gray-500">
                            {detail}
                          </p>
                        ))}
                      </div>
                    )}

                    <Button size="sm" className="w-full mt-4" onClick={() => (window.location.href = kpi.buttonHref)}>
                      {kpi.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 下部ステータス */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex space-x-4">
              <Button variant="outline">電話番号</Button>
              <Button variant="outline">支払と請求</Button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">1人がオンラインです</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
