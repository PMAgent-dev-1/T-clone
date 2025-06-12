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
const phoneNumbers = [
  {
    id: 12,
    number: "050-3196-0544",
    label: "【商品タイプ変更NG】単品注文用",
    type: "050番号",
    issueDate: "0000-00-00 00:00:00",
    applicationDate: "2021-05-25 15:00:17",
  },
  {
    id: 17,
    number: "050-3204-2028",
    label: "【商品タイプ変更NG】複数注文用",
    type: "050番号",
    issueDate: "0000-00-00 00:00:00",
    applicationDate: "2021-07-13 11:38:27",
  },
  {
    id: 27,
    number: "050-3033-3274",
    label: "平野専用（大王松輪島塗丸盆）",
    type: "050番号",
    issueDate: "0000-00-00 00:00:00",
    applicationDate: "2021-11-12 11:19:52",
  },
  {
    id: 156,
    number: "050-1809-3337",
    label: "武田デバッグ用",
    type: "050番号",
    issueDate: "0000-00-00 00:00:00",
    applicationDate: "2023-11-14 15:42:39",
  },
  {
    id: 206,
    number: "0800-170-5916",
    label: "武田 デバッグ複数商品用",
    type: "0800番号（発信者無料）",
    issueDate: "0000-00-00 00:00:00",
    applicationDate: "2024-04-08 15:25:56",
  },
]

export default function NumbersPage() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [pageSize, setPageSize] = useState("5")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedNumbers(phoneNumbers.map((num) => num.id))
    } else {
      setSelectedNumbers([])
    }
  }

  const handleSelectNumber = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedNumbers([...selectedNumbers, id])
    } else {
      setSelectedNumbers(selectedNumbers.filter((numId) => numId !== id))
    }
  }

  const filteredNumbers = phoneNumbers.filter(
    (num) => num.number.includes(searchTerm) || num.label.includes(searchTerm) || num.type.includes(searchTerm),
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
              <h1 className="text-2xl font-semibold text-gray-900">電話番号一覧</h1>
              <div className="flex space-x-2">
                <Badge variant="secondary" className="bg-cyan-500 text-white hover:bg-cyan-600">
                  NE商品連携
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
                      placeholder="電話番号、ラベル、タイプで検索..."
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
              <CardTitle>電話番号一覧</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <Checkbox
                          checked={selectedNumbers.length === phoneNumbers.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">詳細</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">電話番号</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">管理名称</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">タイプ</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">発行日</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">申請日</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredNumbers.map((phoneNumber) => (
                      <tr key={phoneNumber.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <Checkbox
                            checked={selectedNumbers.includes(phoneNumber.id)}
                            onCheckedChange={(checked) => handleSelectNumber(phoneNumber.id, checked as boolean)}
                          />
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">{phoneNumber.id}</td>
                        <td className="px-4 py-4">
                          <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">
                            <Edit className="mr-1 h-3 w-3" />
                            編集
                          </Button>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{phoneNumber.number}</td>
                        <td className="px-4 py-4 text-sm text-gray-900 max-w-xs truncate">{phoneNumber.label}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{phoneNumber.type}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">{phoneNumber.issueDate}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">{phoneNumber.applicationDate}</td>
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
                      {filteredNumbers.length} 件中 1-{Math.min(Number.parseInt(pageSize), filteredNumbers.length)}{" "}
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
