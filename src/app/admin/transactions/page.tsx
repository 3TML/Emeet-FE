import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import React from "react";

const AdminTransactionsPage: React.FC = () => (
  <Card className="max-w-2xl mx-auto mt-8">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl font-bold">
        <CreditCard className="w-6 h-6 text-indigo-600" aria-hidden="true" />
        Quản lý giao dịch
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-gray-700">
        Chức năng quản lý giao dịch (placeholder).
      </div>
    </CardContent>
  </Card>
);

export default AdminTransactionsPage;
