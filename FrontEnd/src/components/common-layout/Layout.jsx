import { Outlet } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
export default Layout;
