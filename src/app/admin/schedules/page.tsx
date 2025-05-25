import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarCheck2 } from "lucide-react";
import React from "react";

const AdminSchedulesPage: React.FC = () => (
  <Card className="max-w-2xl mx-auto mt-8">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl font-bold">
        <CalendarCheck2 className="w-6 h-6 text-cyan-600" aria-hidden="true" />
        Theo dõi lịch hẹn
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-gray-700">
        Chức năng theo dõi lịch hẹn (placeholder).
      </div>
    </CardContent>
  </Card>
);

export default AdminSchedulesPage;
