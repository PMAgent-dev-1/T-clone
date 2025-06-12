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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Search, Edit, Download, Settings } from "lucide-react"

// サンプルデータ
const orders = [
  {
    id: 204625,
    orderDate: "2025-06-09 17:41:33",
    phoneNumber: "090-3609-6088",
    paymentMethod: "代金引換",
    totalAmount: "3,300円",
    customerName: "",
    status: [
      { label: "受注データ", color: "bg-gray-400" },
      { label: "AI対応", color: "bg-gray-400" },
      { label: "顧客一覧登録", color: "bg-blue-600" },
      { label: "在庫確認", color: "bg-gray-400" },
      { label: "管理確認", color: "bg-gray-400" },
    ],
  },
  {
    id: 204603,
    orderDate: "2025-06-09 17:05:25",
    phoneNumber: "080-8359-4634",
    paymentMethod: "代金引換",
    totalAmount: "3,300円",
    customerName: "",
    status: [
      { label: "受注データ", color: "bg-orange-500" },
      { label: "AI対応", color: "bg-gray-400" },
      { label: "顧客なし", color: "bg-gray-400" },
      { label: "在庫確認", color: "bg-blue-600" },
      { label: "管理確認", color: "bg-gray-400" },
    ],
  },
  {
    id: 203399,
    orderDate: "2025-06-06 17:41:04",
    phoneNumber: "080-3330-8231",
    paymentMethod: "代金引換",
    totalAmount: "0円",
    customerName: "武田a 喜一a",
    status: [
      { label: "キャンセル", color: "bg-gray-600" },
      { label: "AI対応", color: "bg-gray-400" },
      { label: "顧客一覧登録", color: "bg-blue-600" },
      { label: "在庫確認", color: "bg-gray-400" },
      { label: "管理確認", color: "bg-gray-400" },
    ],
  },
  {
    id: 202840,
    orderDate: "2025-06-05 15:05:41",
    phoneNumber: "090-1507-2243",
    paymentMethod: "代金引換",
    totalAmount: "7,700円",
    customerName: "",
    status: [
      { label: "受注データ", color: "bg-orange-500" },
      { label: "AI対応", color: "bg-gray-400" },
      { label: "顧客なし", color: "bg-gray-400" },
      { label: "在庫確認", color: "bg-blue-600" },
      { label: "管理確認", color: "bg-gray-400" },
    ],
  },
  {
    id: 201419,
    orderDate: "2025-06-02 16:25:53",
    phoneNumber: "080-3330-8231",
    paymentMethod: "後払い.COM",
    totalAmount: "4,400円",
    customerName: "",
    status: [
      { label: "受注データ", color: "bg-orange-500" },
      { label: "AI対応", color: "bg-gray-400" },
      { label: "顧客なし", color: "bg-gray-400" },
      { label: "在庫確認", color: "bg-blue-600" },
      { label: "管理確認", color: "bg-gray-400" },
    ],
  },
  {
    id: 201418,
    orderDate: "2025-06-02 16:25:21",
    phoneNumber: "080-3330-8231",
    paymentMethod: "後払い.COM",
    totalAmount: "5,857円",
    customerName: "武田a 喜一a",
    status: [
      { label: "受注データ", color: "bg-orange-500" },
      { label: "AI対応", color: "bg-gray-400" },
      { label: "顧客なし", color: "bg-gray-400" },
      { label: "在庫確認", color: "bg-blue-600" },
      { label: "管理確認", color: "bg-gray-400" },
    ],
  },
  {
    id: 201416,
    orderDate: "2025-06-02 16:24:56",
    phoneNumber: "080-3330-8231",
    paymentMethod: "後払い.COM",
    totalAmount: "5,857円",
    customerName: "武田a 喜一a",
    status: [
      { label: "受注データ", color: "bg-gray-400" },
      { label: "AI対応", color: "bg-gray-400" },
      { label: "顧客一覧登録", color: "bg-blue-600" },
      { label: "在庫確認", color: "bg-gray-400" },
      { label: "管理確認", color: "bg-gray-400" },
    ],
  },
  {
    id: 201132,
    orderDate: "2025-06-02 11:09:57",
    phoneNumber: "080-3330-8231",
    paymentMethod: "代金引換",
    totalAmount: "4,270円",
    customerName: "武田a 喜一a",
    status: [
      { label: "受注データ", color: "bg-orange-500" },
      { label: "AI対応", color: "bg-gray-400" },
      { label: "顧客一覧登録", color: "bg-blue-600" },
      { label: "在庫確認", color: "bg-gray-400" },
      { label: "管理確認", color: "bg-gray-400" },
    ],
  },
]

export default function OrdersPage() {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState("all")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(orders.map((order) => order.id))
    } else {
      setSelectedOrders([])
    }
  }

  const handleSelectOrder = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, id])
    } else {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id))
    }
  }

  const handleExportCSV = () => {
    // TODO: CSV出力機能の実装
    console.log("CSV出力")
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toString().includes(searchTerm) ||
      order.phoneNumber.includes(searchTerm) ||
      order.customerName.includes(searchTerm) ||
      order.paymentMethod.includes(searchTerm)

    return matchesSearch
  })

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          {/* ヘッダーセクション */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">注文一覧</h1>
              <div className="flex space-x-2">
                <Badge variant="secondary" className="bg-cyan-500 text-white hover:bg-cyan-600">
                  アクション
                </Badge>
                <Badge variant="secondary" className="bg-cyan-500 text-white hover:bg-cyan-600">
                  在庫連携
                </Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                追加設定
              </Button>
              <Button onClick={handleExportCSV} className="bg-blue-600 hover:bg-blue-700">
                <Download className="mr-2 h-4 w-4" />
                CSV出力
              </Button>
            </div>
          </div>

          {/* 検索・フィルタセクション */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="注文ID、電話番号、顧客名で検索..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="ステータスで絞り込み" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    <SelectItem value="received">受注データ</SelectItem>
                    <SelectItem value="processing">処理中</SelectItem>
                    <SelectItem value="completed">完了</SelectItem>
                    <SelectItem value="cancelled">キャンセル</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">検索</Button>
              </div>
            </CardContent>
          </Card>

          {/* ページネーション（上部） */}
          <div className="mb-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} />
                </PaginationItem>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink href="#" isActive={currentPage === page} onClick={() => setCurrentPage(page)}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext href="#" onClick={() => setCurrentPage(Math.min(10, currentPage + 1))} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          {/* テーブルセクション */}
          <Card>
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle>注文一覧</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <Checkbox checked={selectedOrders.length === orders.length} onCheckedChange={handleSelectAll} />
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">編集</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                        注文日時
                        <br />
                        発信番号
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                        支払方法
                        <br />
                        合計金額
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">名前</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">処理状況</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <Checkbox
                            checked={selectedOrders.includes(order.id)}
                            onCheckedChange={(checked) => handleSelectOrder(order.id, checked as boolean)}
                          />
                        </td>
                        <td className="px-4 py-4">
                          <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">
                            <Edit className="mr-1 h-3 w-3" />
                            編集
                          </Button>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">{order.orderDate}</div>
                            <div className="text-gray-600">{order.phoneNumber}</div>
                            <div className="text-xs text-gray-500">#{order.id}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm">
                            <div className="text-gray-900">{order.paymentMethod}</div>
                            <div className="font-medium text-gray-900">{order.totalAmount}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">{order.customerName || "-"}</td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-1">
                            {order.status.map((status, index) => (
                              <Badge key={index} className={`${status.color} text-white text-xs px-2 py-1`}>
                                {status.label}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* フッター */}
              <div className="px-4 py-4 border-t bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {filteredOrders.length} 件中 1-{Math.min(10, filteredOrders.length)} 件を表示
                  </span>
                  <div className="text-sm text-gray-600">ページ {currentPage} / 10</div>
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
