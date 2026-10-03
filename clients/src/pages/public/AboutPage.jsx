import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">À propos de Bujumbura Post</h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          Bujumbura Post est une plateforme d'actualités et de publication en ligne dédiée à l'information
          du Burundi et de la région des Grands Lacs. Nous couvrons la politique, l'économie, la culture,
          le sport et bien plus encore.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Notre mission est de fournir une information fiable, vérifiée et accessible à tous, tout en
          donnant la parole à la jeunesse et aux acteurs locaux.
        </p>
      </main>
      <Footer />
    </>
  );
}