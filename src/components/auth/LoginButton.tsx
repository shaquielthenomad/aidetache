import { useAuth } from '../../services/authService';

export const LoginButton = () => {
  const { login, logout, isAuthenticated, user } = useAuth();

  return (
    <button
      onClick={isAuthenticated ? logout : login}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {isAuthenticated ? (
        <div className="flex items-center space-x-2">
          {user?.picture && (
            <img
              src={user.picture}
              alt={user.name}
              className="w-6 h-6 rounded-full"
            />
          )}
          <span>Logout</span>
        </div>
      ) : (
        'Login'
      )}
    </button>
  );
}; 