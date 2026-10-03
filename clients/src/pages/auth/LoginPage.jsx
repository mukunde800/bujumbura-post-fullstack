import Navbar from '../../components/common/Navbar';
import LoginForm from '../../components/users/LoginForm';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <LoginForm />
          <p className="text-center mt-4 text-sm text-gray-600">
            Pas de compte ? <Link to="/register" className="text-primary hover:underline">Inscrivez-vous</Link>
          </p>
        </div>
      </main>
    </>
  );
}