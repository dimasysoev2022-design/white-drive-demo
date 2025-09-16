import { useState } from "react";
import { OTPLogin } from "@/components/auth/OTPLogin";
import { TestDriveDashboard } from "@/components/dashboard/TestDriveDashboard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
    // In real app: start 76-hour timer, track td_login_success
  };

  if (!isAuthenticated) {
    return <OTPLogin onLogin={handleLogin} />;
  }

  return <TestDriveDashboard userEmail={userEmail} />;
};

export default Index;
