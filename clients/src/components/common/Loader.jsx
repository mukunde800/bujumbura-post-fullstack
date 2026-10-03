export default function Loader({ text = 'Chargement...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-gray-500">{text}</p>
    </div>
  );
}