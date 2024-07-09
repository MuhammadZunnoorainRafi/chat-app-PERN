import { Link, useNavigate } from 'react-router-dom';
import { errorHandler, ErrorT, useAuthContext } from '../lib/utils';
import { toast } from 'react-toastify';
import { useLogoutUser } from '../actions/auth-actions';

function Navbar() {
  const { isLoggedIn, isLoading, user } = useAuthContext();
  const { logoutUser } = useLogoutUser();
  const navigate = useNavigate();

  const logoutUserClick = async () => {
    try {
      await logoutUser();
      navigate('/');
      navigate(0);
    } catch (error) {
      toast.error(errorHandler(error as ErrorT));
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <button className="btn btn-ghost text-xl">Chat 💬</button>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : isLoggedIn ? (
            <>
              <button className="btn btn-success">{user.name}</button>
              <button onClick={logoutUserClick} className="btn btn-error ml-2">
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link className="btn btn-primary" to="/register">
                Register
              </Link>
              <Link className="btn btn-secondary" to="/">
                Login
              </Link>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
