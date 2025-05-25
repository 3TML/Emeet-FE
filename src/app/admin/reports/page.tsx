import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import React from "react";

const AdminReportsPage: React.FC = () => (
  <Card className="max-w-2xl mx-auto mt-8">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl font-bold">
        <AlertCircle className="w-6 h-6 text-red-600" aria-hidden="true" />
        Báo cáo và xử lý vi phạm
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-gray-700">
        Chức năng báo cáo và xử lý vi phạm (placeholder).
      </div>
    </CardContent>
  </Card>
);

export default AdminReportsPage;
