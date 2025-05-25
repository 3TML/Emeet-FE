import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserCheck } from "lucide-react";
import React from "react";

const AdminExpertsPage: React.FC = () => (
  <Card className="max-w-2xl mx-auto mt-8">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl font-bold">
        <UserCheck className="w-6 h-6 text-green-600" aria-hidden="true" />
        Quản lý chuyên gia
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-gray-700">
        Chức năng quản lý chuyên gia (placeholder).
      </div>
    </CardContent>
  </Card>
);

export default AdminExpertsPage;
