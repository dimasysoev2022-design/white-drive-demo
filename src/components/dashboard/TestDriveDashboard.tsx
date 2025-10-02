import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { OverviewTab } from "./tabs/OverviewTab";

import { DocumentsTab } from "./tabs/DocumentsTab";
import { VideoTab } from "./tabs/VideoTab";
import { QuestionsTab } from "./tabs/QuestionsTab";
import { NextStepsTab } from "./tabs/NextStepsTab";
import { BarChart3, FileText, Play, HelpCircle, DollarSign, Home } from "lucide-react";

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
        <TabsList className="flex w-full gap-2 overflow-x-auto no-scrollbar sm:grid sm:grid-cols-5 sm:gap-0 sm:w-auto mb-6">
          <TabsTrigger value="overview" className="flex items-center space-x-2 min-w-max px-3 py-2">
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Обзор</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center space-x-2 min-w-max px-3 py-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Документы</span>
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center space-x-2 min-w-max px-3 py-2">
            <Play className="w-4 h-4" />
            <span className="hidden sm:inline">Видео</span>
          </TabsTrigger>
          <TabsTrigger value="questions" className="flex items-center space-x-2 min-w-max px-3 py-2">
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Вопросы</span>
          </TabsTrigger>
          <TabsTrigger value="next-steps" className="flex items-center space-x-2 min-w-max px-3 py-2">
            <DollarSign className="w-4 h-4" />
            <span className="hidden sm:inline">Тарифы</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab onGoToDocuments={() => setActiveTab('documents')} />
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