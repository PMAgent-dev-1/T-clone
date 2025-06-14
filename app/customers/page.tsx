"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit } from "lucide-react"

// サンプルデータ
const customers = [
  {
    id: 1,
    name: "山田 太郎",
    phone: "090-1234-5678",
    email: "taro@example.com",
    registeredDate: "2024-01-01",
    lastOrderDate: "2024-05-20",
  },
  {
    id: 2,
    name: "佐藤 花子",
    phone: "080-9876-5432",
    email: "hanako@example.com",
    registeredDate: "2024-02-15",
    lastOrderDate: "2024-05-25",
  },
  {
    id: 3,
    name: "鈴木 一郎",
    phone: "070-5555-6666",
    email: "ichiro@example.com",
    registeredDate: "2024-03-03",
    lastOrderDate: "2024-05-26",
  },
  {
    id: 4,
    name: "高橋 洋子",
    phone: "050-4444-5555",
    email: "yoko@example.com",
    registeredDate: "2024-04-10",
    lastOrderDate: "2024-05-28",
  },
  {
    id: 5,
    name: "田中 実",
    phone: "090-2222-3333",
    email: "minoru@example.com",
    registeredDate: "2024-04-20",
    lastOrderDate: "2024-06-01",
  },
]

export default function CustomersPage() {
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [pageSize, setPageSize] = useState("5")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(customers.map((c) => c.id))
    } else {
      setSelectedCustomers([])
    }
  }

  const handleSelectCustomer = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, id])
    } else {
      setSelectedCustomers(selectedCustomers.filter((custId) => custId !== id))
    }
  }

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.includes(searchTerm) ||
      c.phone.includes(searchTerm) ||
      c.email.includes(searchTerm),
  )

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          {/* ヘッダーセクション */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">顧客一覧</h1>
              <div className="flex space-x-2">
                <Badge variant="secondary" className="bg-cyan-500 text-white hover:bg-cyan-600">
                  顧客連携
                </Badge>
                <Badge variant="secondary" className="bg-cyan-500 text-white hover:bg-cyan-600">
                  NE在庫連携
                </Badge>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              新規追加
            </Button>
          </div>

          {/* 検索セクション */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="名前、電話番号、メールで検索..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button variant="outline">検索</Button>
              </div>
            </CardContent>
          </Card>

          {/* テーブルセクション */}
          <Card>
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle>顧客一覧</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <Checkbox
                          checked={selectedCustomers.length === customers.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">詳細</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">名前</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">電話番号</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">メール</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">登録日</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">最終注文日</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <Checkbox
                            checked={selectedCustomers.includes(customer.id)}
                            onCheckedChange={(checked) => handleSelectCustomer(customer.id, checked as boolean)}
                          />
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">{customer.id}</td>
                        <td className="px-4 py-4">
                          <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">
                            <Edit className="mr-1 h-3 w-3" />
                            編集
                          </Button>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{customer.name}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{customer.phone}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{customer.email}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">{customer.registeredDate}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">{customer.lastOrderDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* フッター */}
              <div className="px-4 py-4 border-t bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Select value={pageSize} onValueChange={setPageSize}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 行</SelectItem>
                        <SelectItem value="10">10 行</SelectItem>
                        <SelectItem value="20">20 行</SelectItem>
                        <SelectItem value="50">50 行</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-gray-600">
                      {filteredCustomers.length} 件中 1-{Math.min(Number.parseInt(pageSize), filteredCustomers.length)}{" "}
                      件を表示
                    </span>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">更に表示する</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 下部ステータス */}
          <div className="mt-6 flex items-center justify-end">
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
