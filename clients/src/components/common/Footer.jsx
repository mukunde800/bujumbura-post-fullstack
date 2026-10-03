import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-white">
            Bujumbura<span className="text-accent">Post</span>
          </h3>
          <p className="mt-3 text-sm">
            Votre source d'actualités fiable au Burundi et dans la région des Grands Lacs.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-accent">Accueil</Link></li>
            <li><Link to="/articles" className="hover:text-accent">Articles</Link></li>
            <li><Link to="/about" className="hover:text-accent">À propos</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Catégories</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/categories/politique" className="hover:text-accent">Politique</Link></li>
            <li><Link to="/categories/economie" className="hover:text-accent">Économie</Link></li>
            <li><Link to="/categories/sport" className="hover:text-accent">Sport</Link></li>
            <li><Link to="/categories/culture" className="hover:text-accent">Culture</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Suivez-nous</h4>
          <div className="flex gap-3">
            <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-primary">FB</a>
            <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-primary">TW</a>
            <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-primary">IG</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-sm">
        © {new Date().getFullYear()} Bujumbura Post — Tous droits réservés
      </div>
    </footer>
  );
}