import { Link } from 'react-router-dom';
import { useAuthContext } from '../lib/utils';

function Navbar() {
  const { isLoggedIn, isLoading, user } = useAuthContext();
  console.log(user.name);
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
            <button className="btn btn-success">{user.name}</button>
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
