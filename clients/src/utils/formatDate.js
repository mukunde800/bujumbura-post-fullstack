export const formatDate = (date) =>
  new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

export const formatDateTime = (date) =>
  new Date(date).toLocaleString('fr-FR');