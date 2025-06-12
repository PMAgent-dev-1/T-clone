"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Save, Check, AlertTriangle, Search, Plus, Trash } from "lucide-react"

// サンプルデータ
const orderDetail = {
  id: 201103,
  status: "有効",
  operator: "たけだきいち1",
  telAiNo: "201103",
  incomingNumber: "080-3330-8231（リピート購入者）",
  receivingNumber: "【商品タイプ変更NG】単品注文用\n050-3196-0544",
  orderStatus: "選択してください",
  orderDate: "2025-06-02",
  orderTime: "10:49:25",
  csvExport: "未",
  voice: "0件",
  ai: "0件（対応1）",
  warning: "【コールのみ】コールのみで発声せず電話を切りになりました。 - 2025-06-02 10:50:03 - テレAI",
  callHistory: [
    { id: 201118, time: "11:03:48", voice: "なし", ai: "なし", status: "有効着信" },
    { id: 201119, time: "11:04:01", voice: "なし", ai: "なし", status: "有効着信" },
    { id: 201132, time: "11:09:57", voice: "なし", ai: "なし", status: "有効着信" },
  ],
  customer: {
    name: "武田",
    nameSuffix: "喜一a",
    kana: "ﾀｹﾀﾞ",
    kanaSuffix: "ｷｲﾁ",
    phone: "080-3330-8231",
    postalCode: "1500001",
    prefecture: "東京都",
    city: "渋谷区",
    address: "神宮前",
    addressDetail: "",
    notes: "",
  },
  memo: "",
  editHistory: [
    {
      operator: "たけだきいち1",
      date: "2025-06-02",
      time: "10:59:54",
      content: "請求先 都道府県を「13」に変更しました",
    },
    {
      operator: "たけだきいち1",
      date: "2025-06-02",
      time: "10:59:54",
      content: "請求先 市区町村を「渋谷区」に変更しました",
    },
  ],
  items: [
    {
      id: 17,
      productCode: "畑数（AI）",
      productName: "畑数",
      price: "小計",
      quantity: 1,
      subtotal: 3300,
    },
  ],
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [order, setOrder] = useState(orderDetail)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // TODO: Supabaseなどでデータを保存
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const handleBack = () => {
    router.push("/orders")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          {/* ナビゲーションボタン */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                一覧に戻る
              </Button>
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                前へ
              </Button>
              <Button variant="outline">
                次へ
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
              {isSaving ? "保存中..." : "保存"}
              {!isSaving && <Save className="ml-2 h-4 w-4" />}
            </Button>
          </div>

          {/* 注文ID・警告メッセージ */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-2xl font-semibold text-gray-900">注文詳細(ID:{order.id})</h1>
            </div>
            <div className="bg-yellow-100 border border-yellow-300 p-3 rounded-md flex items-start space-x-2">
              <Checkbox id="warning-check" className="mt-1" />
              <Label htmlFor="warning-check" className="text-yellow-800">
                <AlertTriangle className="inline-block mr-2 h-4 w-4" />
                {order.warning}
              </Label>
            </div>
          </div>

          {/* 基本情報 */}
          <Card className="mb-6">
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-lg text-blue-800">基本情報</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-2 divide-x divide-y">
                <div className="p-4 bg-gray-50">
                  <Label>有効情報</Label>
                  <Select value={order.status} onValueChange={(value) => setOrder({ ...order, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="有効">有効</SelectItem>
                      <SelectItem value="無効">無効</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4">
                  <Label>担当者</Label>
                  <Input value={order.operator} readOnly className="bg-gray-50" />
                </div>
                <div className="p-4">
                  <Label>テレAINo</Label>
                  <Input value={order.telAiNo} readOnly className="bg-gray-50" />
                </div>
                <div className="p-4">
                  <Label>入電番号</Label>
                  <Input value={order.incomingNumber} readOnly className="bg-gray-50" />
                </div>
                <div className="p-4">
                  <Label>受電番号</Label>
                  <Textarea value={order.receivingNumber} readOnly className="bg-gray-50" rows={2} />
                </div>
                <div className="p-4">
                  <Label>注文ステータス</Label>
                  <Select
                    value={order.orderStatus}
                    onValueChange={(value) => setOrder({ ...order, orderStatus: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="選択してください">選択してください</SelectItem>
                      <SelectItem value="新規">新規</SelectItem>
                      <SelectItem value="処理中">処理中</SelectItem>
                      <SelectItem value="完了">完了</SelectItem>
                      <SelectItem value="キャンセル">キャンセル</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4">
                  <Label>注文日</Label>
                  <Input
                    type="date"
                    value={order.orderDate}
                    onChange={(e) => setOrder({ ...order, orderDate: e.target.value })}
                  />
                </div>
                <div className="p-4">
                  <Label>注文時間</Label>
                  <Input value={order.orderTime} readOnly className="bg-gray-50" />
                </div>
                <div className="p-4">
                  <Label>CSV出力</Label>
                  <Input value={order.csvExport} readOnly className="bg-gray-50" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 着信履歴 */}
          <Card className="mb-6">
            <CardHeader className="bg-yellow-50 border-b">
              <CardTitle className="text-lg text-yellow-800">着信履歴</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>着信入電</TableHead>
                    <TableHead>時間</TableHead>
                    <TableHead>音声</TableHead>
                    <TableHead>AI</TableHead>
                    <TableHead>着信種別</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.callHistory.map((call) => (
                    <TableRow key={call.id}>
                      <TableCell>{call.id}</TableCell>
                      <TableCell>{call.time}</TableCell>
                      <TableCell>{call.voice}</TableCell>
                      <TableCell>{call.ai}</TableCell>
                      <TableCell>
                        <Select defaultValue={call.status}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="有効着信">有効着信</SelectItem>
                            <SelectItem value="無効着信">無効着信</SelectItem>
                            <SelectItem value="不在着信">不在着信</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 顧客情報タブ */}
          <Tabs defaultValue="delivery" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="delivery" className="bg-red-100 data-[state=active]:bg-red-200">
                配送先顧客
              </TabsTrigger>
              <TabsTrigger value="billing" className="bg-green-100 data-[state=active]:bg-green-200">
                請求先顧客
              </TabsTrigger>
              <TabsTrigger value="registered" className="bg-blue-100 data-[state=active]:bg-blue-200">
                登録済み顧客
              </TabsTrigger>
            </TabsList>
            <TabsContent value="delivery">
              <Card>
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 divide-x divide-y">
                    <div className="p-4">
                      <Label>氏名</Label>
                      <div className="flex space-x-2">
                        <Input
                          value={order.customer.name}
                          onChange={(e) =>
                            setOrder({ ...order, customer: { ...order.customer, name: e.target.value } })
                          }
                        />
                        <Input
                          value={order.customer.nameSuffix}
                          onChange={(e) =>
                            setOrder({ ...order, customer: { ...order.customer, nameSuffix: e.target.value } })
                          }
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <Label>カナ</Label>
                      <div className="flex space-x-2">
                        <Input
                          value={order.customer.kana}
                          onChange={(e) =>
                            setOrder({ ...order, customer: { ...order.customer, kana: e.target.value } })
                          }
                        />
                        <Input
                          value={order.customer.kanaSuffix}
                          onChange={(e) =>
                            setOrder({ ...order, customer: { ...order.customer, kanaSuffix: e.target.value } })
                          }
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <Label>電話番号</Label>
                      <Input
                        value={order.customer.phone}
                        onChange={(e) => setOrder({ ...order, customer: { ...order.customer, phone: e.target.value } })}
                      />
                    </div>
                    <div className="p-4">
                      <Label>郵便番号</Label>
                      <div className="flex space-x-2">
                        <Input
                          value={order.customer.postalCode}
                          onChange={(e) =>
                            setOrder({ ...order, customer: { ...order.customer, postalCode: e.target.value } })
                          }
                        />
                        <Button variant="outline" size="sm">
                          <Search className="mr-1 h-4 w-4" />
                          住所から郵便番号を取得
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <Label>住所1</Label>
                      <div className="flex space-x-2 mb-2">
                        <Select
                          value={order.customer.prefecture}
                          onValueChange={(value) =>
                            setOrder({ ...order, customer: { ...order.customer, prefecture: value } })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="東京都">東京都</SelectItem>
                            <SelectItem value="大阪府">大阪府</SelectItem>
                            <SelectItem value="神奈川県">神奈川県</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          value={order.customer.city}
                          onChange={(e) =>
                            setOrder({ ...order, customer: { ...order.customer, city: e.target.value } })
                          }
                          placeholder="市区町村"
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <Label>住所2</Label>
                      <div className="flex space-x-2">
                        <Input
                          value={order.customer.address}
                          onChange={(e) =>
                            setOrder({ ...order, customer: { ...order.customer, address: e.target.value } })
                          }
                          placeholder="町域以下"
                        />
                        <Button variant="outline" size="sm">
                          <Search className="mr-1 h-4 w-4" />
                          町域以下を検索する
                        </Button>
                        <Button variant="outline" size="sm">
                          <Search className="mr-1 h-4 w-4" />
                          googleで調べる
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="billing">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-gray-500">請求先情報はここに表示されます</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="registered">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-gray-500">登録済み顧客情報はここに表示されます</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* 申し送り欄 */}
          <Card className="mb-6">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg">申し送り</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Textarea
                placeholder="申し送り事項を入力してください..."
                value={order.memo}
                onChange={(e) => setOrder({ ...order, memo: e.target.value })}
                rows={3}
              />
            </CardContent>
          </Card>

          {/* 編集履歴 */}
          <Card className="mb-6">
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">編集履歴</CardTitle>
                <Badge variant="outline" className="cursor-pointer">
                  <Check className="mr-1 h-4 w-4" />
                  送信
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>担当者</TableHead>
                    <TableHead>日付</TableHead>
                    <TableHead>時間</TableHead>
                    <TableHead>内容</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.editHistory.map((history, index) => (
                    <TableRow key={index}>
                      <TableCell>{history.operator}</TableCell>
                      <TableCell>{history.date}</TableCell>
                      <TableCell>{history.time}</TableCell>
                      <TableCell>{history.content}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 注文内容 */}
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">注文内容</CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="mr-1 h-4 w-4" />
                  商品追加
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>商品CD（AI）</TableHead>
                    <TableHead>商品CD</TableHead>
                    <TableHead>商品名（決済内容）</TableHead>
                    <TableHead>価格（税抜）</TableHead>
                    <TableHead>数量</TableHead>
                    <TableHead>小計</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.productCode}</TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const newItems = [...order.items]
                            const index = newItems.findIndex((i) => i.id === item.id)
                            newItems[index] = { ...item, quantity: Number.parseInt(e.target.value) }
                            setOrder({ ...order, items: newItems })
                          }}
                          className="w-16"
                        />
                      </TableCell>
                      <TableCell>{item.subtotal}円</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="p-4 border-t bg-gray-50 flex justify-end">
                <div className="text-right">
                  <div className="mb-2">
                    <span className="font-medium mr-4">小計:</span>
                    <span>3,000円</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-medium mr-4">消費税:</span>
                    <span>300円</span>
                  </div>
                  <div className="text-lg font-bold">
                    <span className="mr-4">合計:</span>
                    <span>3,300円</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* オンラインステータス */}
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
