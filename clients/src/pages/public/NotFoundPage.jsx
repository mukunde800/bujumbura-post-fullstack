import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-bold text-primary">404</h1>
      <p className="text-xl mt-4 mb-6">Page introuvable</p>
      <Link to="/" className="btn-primary">Retour à l'accueil</Link>
    </div>
  );
}