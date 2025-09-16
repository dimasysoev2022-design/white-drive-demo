import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { OverviewTab } from "./tabs/OverviewTab";
import { DashboardsTab } from "./tabs/DashboardsTab";
import { DocumentsTab } from "./tabs/DocumentsTab";
import { VideoTab } from "./tabs/VideoTab";
import { QuestionsTab } from "./tabs/QuestionsTab";
import { NextStepsTab } from "./tabs/NextStepsTab";
import { BarChart3, FileText, Play, HelpCircle, ArrowRight, Home } from "lucide-react";

interface TestDriveDashboardProps {
  userEmail: string;
}

export const TestDriveDashboard = ({ userEmail }: TestDriveDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleContact = () => {
    // Mock contact action - in real app would open contact form/telegram
    console.log("Contact clicked");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userEmail={userEmail} onContact={handleContact} />
      
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6 mb-6">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Обзор</span>
            </TabsTrigger>
            <TabsTrigger value="dashboards" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Дашборды</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Документы</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span className="hidden sm:inline">Видео</span>
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center space-x-2">
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Вопросы</span>
            </TabsTrigger>
            <TabsTrigger value="next-steps" className="flex items-center space-x-2">
              <ArrowRight className="w-4 h-4" />
              <span className="hidden sm:inline">Далее</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="dashboards">
            <DashboardsTab />
          </TabsContent>
          <TabsContent value="documents">
            <DocumentsTab />
          </TabsContent>
          <TabsContent value="video">
            <VideoTab />
          </TabsContent>
          <TabsContent value="questions">
            <QuestionsTab />
          </TabsContent>
          <TabsContent value="next-steps">
            <NextStepsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};