import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './store/auth';
import Login from './pages/login/LoginPage';
import RoomBoard from './pages/room-board/RoomBoardPage';
import RoomCheckin from './pages/room-checkin/RoomCheckinPage';
import ActiveSession from './pages/active-session/ActiveSessionPage';
import BillClose from './pages/bill-close/BillClosePage';
import BillDetail from './pages/bill-detail/BillDetailPage';
import Bills from './pages/bills/BillsPage';
import ManualBill from './pages/manual-bill/ManualBillPage';
import Dashboard from './pages/dashboard/DashboardPage';
import MenuList from './pages/menu-list/MenuListPage';
import MenuDetail from './pages/menu-detail/MenuDetailPage';
import RoomDetail from './pages/room-detail/RoomDetailPage';
import VenueList from './pages/venue-list/VenueListPage';
import VenueManagement from './pages/venue-management/VenueManagementPage';
import AppLayout from './components/layout/AppLayout';

function Protected({ children, role = 'VENUE_MANAGER' }: { children: React.ReactNode; role?: string }) {
  const auth = useAuth();
  if (!auth.isAuthenticated) return <Navigate to="/login" />;
  if (auth.role !== role && auth.role !== 'SUPER_ADMIN') return <Navigate to="/" />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Protected><AppLayout><RoomBoard /></AppLayout></Protected>} />
      <Route path="/checkin/:roomId" element={<Protected><AppLayout><RoomCheckin /></AppLayout></Protected>} />
      <Route path="/session/:sessionId" element={<Protected><AppLayout><ActiveSession /></AppLayout></Protected>} />
      <Route path="/bill/:sessionId" element={<Protected><AppLayout><BillClose /></AppLayout></Protected>} />
      <Route path="/bill-detail/:billId" element={<Protected><AppLayout><BillDetail /></AppLayout></Protected>} />
      <Route path="/bills" element={<Protected><AppLayout><Bills /></AppLayout></Protected>} />
      <Route path="/bills/manual" element={<Protected><AppLayout><ManualBill /></AppLayout></Protected>} />
      <Route path="/dashboard" element={<Protected><AppLayout><Dashboard /></AppLayout></Protected>} />
      <Route path="/menu" element={<Protected><AppLayout><MenuList /></AppLayout></Protected>} />
      <Route path="/menu/:itemId" element={<Protected><AppLayout><MenuDetail /></AppLayout></Protected>} />
      <Route path="/menu/new" element={<Protected><AppLayout><MenuDetail /></AppLayout></Protected>} />
      <Route path="/rooms/:roomId" element={<Protected><AppLayout><RoomDetail /></AppLayout></Protected>} />
      <Route path="/admin/venues" element={<Protected role="SUPER_ADMIN"><AppLayout><VenueList /></AppLayout></Protected>} />
      <Route path="/admin/venues/new" element={<Protected role="SUPER_ADMIN"><AppLayout><VenueManagement /></AppLayout></Protected>} />
      <Route path="/admin/venues/:venueId" element={<Protected role="SUPER_ADMIN"><AppLayout><VenueManagement /></AppLayout></Protected>} />
    </Routes>
  );
}
