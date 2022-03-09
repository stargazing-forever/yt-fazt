import { useAuth } from '../hooks/useAuth'

export const HomeScreen = () => {
  const { singout, user, setUser } = useAuth();

  //functions
  const handleLogout = async() => {
    try {
      await singout();
      setUser(null);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full max-w-xs m-auto text-black">
      <div className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
        <h1 className="text-xl mb-4">
          Email: {user.email}
        </h1>
        <button 
          className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4" 
          type="submit"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
