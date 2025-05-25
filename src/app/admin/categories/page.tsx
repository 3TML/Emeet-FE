import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FolderKanban } from "lucide-react";
import React from "react";

const AdminCategoriesPage: React.FC = () => (
  <Card className="max-w-2xl mx-auto mt-8">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl font-bold">
        <FolderKanban className="w-6 h-6 text-yellow-600" aria-hidden="true" />
        Quản lý danh mục kỹ năng
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-gray-700">
        Chức năng quản lý danh mục kỹ năng (placeholder).
      </div>
    </CardContent>
  </Card>
);

export default AdminCategoriesPage;
