import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import Architecture from './pages/Architecture';
import Compliance from './pages/Compliance';
import ContractView from './pages/ContractView';
import Login from './pages/Login';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/agents"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Agents />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/architecture"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Architecture />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/compliance"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Compliance />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/contracts/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ContractView />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
