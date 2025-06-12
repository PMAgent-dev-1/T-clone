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
import { Plus, Save, ArrowLeft } from "lucide-react"

// サンプルデータ
const phoneNumberDetail = {
  id: 12,
  number: "050-3196-0544",
  label: "【商品タイプ変更NG】単品注文用",
  type: "050番号",
  status: "有効",
  issueDate: "2021-05-25",
  applicationDate: "2021-05-25 15:00:17",
  memo: "単品注文専用の電話番号です。商品タイプの変更はできません。",
  chatSettings: {
    initialGreeting: true,
    orderConfirmation: true,
    paymentConfirmation: true,
    shippingConfirmation: false,
    automatedResponses: true,
  },
  basicFees: [
    { item: "基本料", amount: "3,000円", tax: "300円", total: "3,300円" },
    { item: "通話料", amount: "1,000円", tax: "100円", total: "1,100円" },
    { item: "SMS料", amount: "500円", tax: "50円", total: "550円" },
  ],
  paymentFees: [
    { item: "基本料", dueDate: "2025-07-01", status: "未払" },
    { item: "通話料", dueDate: "2025-07-01", status: "未払" },
    { item: "SMS料", dueDate: "2025-06-01", status: "済" },
  ],
  voiceSettings: [
    { id: 1, type: "初回", message: "ご注文ありがとうございます", enabled: true, priority: 1 },
    { id: 2, type: "初回", message: "商品の確認をさせていただきます", enabled: true, priority: 2 },
    { id: 3, type: "リピート", message: "いつもご利用ありがとうございます", enabled: true, priority: 1 },
  ],
}

export default function NumberDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [phoneData, setPhoneData] = useState(phoneNumberDetail)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // TODO: Supabaseなどでデータを保存
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const handleBack = () => {
    router.push("/numbers")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          {/* ヘッダーセクション */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-semibold text-gray-900">電話番号詳細</h1>
            </div>
            <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
              {isSaving ? "保存中..." : "保存"}
              {!isSaving && <Save className="ml-2 h-4 w-4" />}
            </Button>
          </div>

          {/* 基本情報セクション */}
          <Card className="mb-6">
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-lg text-blue-800">基本情報</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="number">電話番号</Label>
                  <Input id="number" value={phoneData.number} readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label htmlFor="label">管理名称</Label>
                  <Input
                    id="label"
                    value={phoneData.label}
                    onChange={(e) => setPhoneData({ ...phoneData, label: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="type">電話タイプ</Label>
                  <Input id="type" value={phoneData.type} readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label htmlFor="status">ステータス</Label>
                  <Select
                    value={phoneData.status}
                    onValueChange={(value) => setPhoneData({ ...phoneData, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="有効">有効</SelectItem>
                      <SelectItem value="無効">無効</SelectItem>
                      <SelectItem value="停止中">停止中</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="issueDate">発行日</Label>
                  <Input id="issueDate" value={phoneData.issueDate} readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label htmlFor="applicationDate">申請日</Label>
                  <Input id="applicationDate" value={phoneData.applicationDate} readOnly className="bg-gray-50" />
                </div>
                <div className="md:col-span-3">
                  <Label htmlFor="memo">メモ</Label>
                  <Textarea
                    id="memo"
                    value={phoneData.memo}
                    onChange={(e) => setPhoneData({ ...phoneData, memo: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* チャット設定セクション */}
          <Card className="mb-6">
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-lg text-blue-800">チャット設定</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-4">自動応答設定</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="initialGreeting"
                        checked={phoneData.chatSettings.initialGreeting}
                        onCheckedChange={(checked) =>
                          setPhoneData({
                            ...phoneData,
                            chatSettings: { ...phoneData.chatSettings, initialGreeting: checked as boolean },
                          })
                        }
                      />
                      <Label htmlFor="initialGreeting">初回挨拶メッセージを送信する</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="orderConfirmation"
                        checked={phoneData.chatSettings.orderConfirmation}
                        onCheckedChange={(checked) =>
                          setPhoneData({
                            ...phoneData,
                            chatSettings: { ...phoneData.chatSettings, orderConfirmation: checked as boolean },
                          })
                        }
                      />
                      <Label htmlFor="orderConfirmation">注文確認メッセージを送信する</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="paymentConfirmation"
                        checked={phoneData.chatSettings.paymentConfirmation}
                        onCheckedChange={(checked) =>
                          setPhoneData({
                            ...phoneData,
                            chatSettings: { ...phoneData.chatSettings, paymentConfirmation: checked as boolean },
                          })
                        }
                      />
                      <Label htmlFor="paymentConfirmation">支払い確認メッセージを送信する</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="shippingConfirmation"
                        checked={phoneData.chatSettings.shippingConfirmation}
                        onCheckedChange={(checked) =>
                          setPhoneData({
                            ...phoneData,
                            chatSettings: { ...phoneData.chatSettings, shippingConfirmation: checked as boolean },
                          })
                        }
                      />
                      <Label htmlFor="shippingConfirmation">発送確認メッセージを送信する</Label>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-4">応答設定</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="automatedResponses"
                        checked={phoneData.chatSettings.automatedResponses}
                        onCheckedChange={(checked) =>
                          setPhoneData({
                            ...phoneData,
                            chatSettings: { ...phoneData.chatSettings, automatedResponses: checked as boolean },
                          })
                        }
                      />
                      <Label htmlFor="automatedResponses">自動応答を有効にする</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 料金情報タブ */}
          <Tabs defaultValue="basicFees" className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basicFees">基本料金</TabsTrigger>
              <TabsTrigger value="paymentFees">支払予定料</TabsTrigger>
            </TabsList>
            <TabsContent value="basicFees">
              <Card>
                <CardHeader className="bg-gray-100 border-b py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">基本料金</CardTitle>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      追加
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>項目</TableHead>
                        <TableHead>金額</TableHead>
                        <TableHead>消費税</TableHead>
                        <TableHead>合計</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {phoneData.basicFees.map((fee, index) => (
                        <TableRow key={index}>
                          <TableCell>{fee.item}</TableCell>
                          <TableCell>{fee.amount}</TableCell>
                          <TableCell>{fee.tax}</TableCell>
                          <TableCell>{fee.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="paymentFees">
              <Card>
                <CardHeader className="bg-gray-100 border-b py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">支払予定料</CardTitle>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      追加
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>項目</TableHead>
                        <TableHead>支払期日</TableHead>
                        <TableHead>状態</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {phoneData.paymentFees.map((fee, index) => (
                        <TableRow key={index}>
                          <TableCell>{fee.item}</TableCell>
                          <TableCell>{fee.dueDate}</TableCell>
                          <TableCell>{fee.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* 発声設定セクション */}
          <Card className="mb-6">
            <CardHeader className="bg-blue-50 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-blue-800">発声設定</CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  追加
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">No.</TableHead>
                    <TableHead>タイプ</TableHead>
                    <TableHead>メッセージ</TableHead>
                    <TableHead className="w-20">有効</TableHead>
                    <TableHead className="w-20">優先度</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {phoneData.voiceSettings.map((setting, index) => (
                    <TableRow key={index}>
                      <TableCell>{setting.id}</TableCell>
                      <TableCell>{setting.type}</TableCell>
                      <TableCell>{setting.message}</TableCell>
                      <TableCell>
                        <Checkbox checked={setting.enabled} />
                      </TableCell>
                      <TableCell>{setting.priority}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 備考欄 */}
          <Card>
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-lg text-blue-800">備考</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Textarea
                placeholder="備考を入力してください..."
                className="min-h-[100px]"
                value={phoneData.memo}
                onChange={(e) => setPhoneData({ ...phoneData, memo: e.target.value })}
              />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
