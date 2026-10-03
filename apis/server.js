import env from './config/env.js';
import app from './app.js';
import { sequelize } from './models/index.js';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connecté');

    // ✅ sync() SANS options : crée les tables si elles n'existent pas,
    // ne modifie JAMAIS l'existant → pas d'empilement d'index
    await sequelize.sync();
    console.log('✅ Modèles synchronisés');

    app.listen(env.PORT, () =>
      console.log(`🚀 Serveur sur http://localhost:${env.PORT}`)
    );
  } catch (err) {
    console.error('❌ Erreur démarrage :', err);
    process.exit(1);
  }
})();