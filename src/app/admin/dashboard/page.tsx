import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import React from "react";

const AdminDashboardPage: React.FC = () => (
  <Card className="max-w-2xl mx-auto mt-8">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl font-bold">
        <BarChart3 className="w-6 h-6 text-purple-600" aria-hidden="true" />
        Dashboard giám sát
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-gray-700">
        Chức năng dashboard giám sát (placeholder).
      </div>
    </CardContent>
  </Card>
);

export default AdminDashboardPage;
