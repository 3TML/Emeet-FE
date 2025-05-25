import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import React from "react";

const AdminUsersPage: React.FC = () => (
  <Card className="max-w-2xl mx-auto mt-8">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl font-bold">
        <Users className="w-6 h-6 text-blue-600" aria-hidden="true" />
        Quản lý người dùng
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-gray-700">
        Chức năng quản lý người dùng (placeholder).
      </div>
    </CardContent>
  </Card>
);

export default AdminUsersPage;
