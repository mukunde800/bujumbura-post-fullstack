import { sequelize, User, Author, Category, Article, Comment } from '../models/index.js';
import slugify from '../utils/slugify.js';
import bcrypt from 'bcryptjs';   

const hash = (pwd) => bcrypt.hashSync(pwd, 10);

const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};

(async () => {
  try {
    console.log('🌱 Démarrage du seeder...');

    // Réinitialiser la base (attention : supprime toutes les données)
    await sequelize.sync({force: true});
    console.log('🗑️  Base réinitialisée');

    // ============================================================
    // 1. UTILISATEURS (admin, editors, authors, readers)
    // ============================================================
    const users = await User.bulkCreate([
      {
        name: 'Administrateur Principal',
        email: 'admin@bujumbura-post.bi',
        password: hash('admin123'),
        role: 'admin',
        avatar: 'https://i.pravatar.cc/150?img=12',
        isActive: true,
      },
      {
        name: 'Claudine Niyonkuru',
        email: 'claudine@bujumbura-post.bi',
        password: hash('editor123'),
        role: 'editor',
        avatar: 'https://i.pravatar.cc/150?img=45',
        isActive: true,
      },
      {
        name: 'Éric Ndayizeye',
        email: 'eric@bujumbura-post.bi',
        password: hash('editor123'),
        role: 'editor',
        avatar: 'https://i.pravatar.cc/150?img=33',
        isActive: true,
      },
      {
        name: 'Aline Barankitse',
        email: 'aline@bujumbura-post.bi',
        password: hash('author123'),
        role: 'author',
        avatar: 'https://i.pravatar.cc/150?img=25',
        isActive: true,
      },
      {
        name: 'Jean-Claude Nkurunziza',
        email: 'jc@bujumbura-post.bi',
        password: hash('author123'),
        role: 'author',
        avatar: 'https://i.pravatar.cc/150?img=15',
        isActive: true,
      },
      {
        name: 'Fatou Niyongabo',
        email: 'fatou@bujumbura-post.bi',
        password: hash('author123') ,
        role: 'author',
        avatar: 'https://i.pravatar.cc/150?img=48',
        isActive: true,
      },
      {
        name: 'Patrick Ndayishimiye',
        email: 'patrick@bujumbura-post.bi',
        password: hash('reader123'),
        role: 'reader',
        avatar: 'https://i.pravatar.cc/150?img=52',
        isActive: true,
      },
      {
        name: 'Sandrine Uwamahoro',
        email: 'sandrine@bujumbura-post.bi',
        password: hash('reader123'),
        role: 'reader',
        avatar: 'https://i.pravatar.cc/150?img=44',
        isActive: true,
      },
      {
        name: 'Compte Désactivé',
        email: 'inactif@bujumbura-post.bi',
        password: hash('reader123') ,
        role: 'reader',
        isActive: false,
      },
    ],{ individualHooks: false });
    console.log(`✅ ${users.length} utilisateurs créés`);

    // ============================================================
    // 2. AUTEURS (journalistes/rédacteurs)
    // ============================================================
    const authors = await Author.bulkCreate([
      {
        name: 'Jean-Baptiste Ndayishimiye',
        email: 'jb.ndayishimiye@bujumbura-post.bi',
        bio: 'Journaliste politique senior, 15 ans d\'expérience. Spécialiste des institutions burundaises et des relations régionales.',
        avatar: 'https://i.pravatar.cc/150?img=13',
      },
      {
        name: 'Marie-Goretti Uwimana',
        email: 'mg.uwimana@bujumbura-post.bi',
        bio: 'Reporter économie et finances. Suit de près les marchés de la région des Grands Lacs.',
        avatar: 'https://i.pravatar.cc/150?img=47',
      },
      {
        name: 'Patrick Niyongabo',
        email: 'p.niyongabo@bujumbura-post.bi',
        bio: 'Journaliste sportif, couvre les Intamba et les compétitions internationales.',
        avatar: 'https://i.pravatar.cc/150?img=68',
      },
      {
        name: 'Clarisse Irakoze',
        email: 'c.irakoze@bujumbura-post.bi',
        bio: 'Journaliste culture et société. Passionnée de musique et de littérature burundaise.',
        avatar: 'https://i.pravatar.cc/150?img=31',
      },
      {
        name: 'Emmanuel Bizimana',
        email: 'e.bizimana@bujumbura-post.bi',
        bio: 'Correspondant régional basé à Gitega. Couvre la politique intérieure.',
        avatar: 'https://i.pravatar.cc/150?img=60',
      },
      {
        name: 'Léocadie Nkeshimana',
        email: 'l.nkeshimana@bujumbura-post.bi',
        bio: 'Journaliste environnement et développement durable.',
        avatar: 'https://i.pravatar.cc/150?img=41',
      },
    ],{ individualHooks: false });
    console.log(`✅ ${authors.length} auteurs créés`);

    // ============================================================
    // 3. CATÉGORIES
    // ============================================================
    const categories = await Category.bulkCreate([
      {
        name: 'Politique',
        slug: 'politique',
        description: 'Actualité politique nationale et régionale, institutions et gouvernance.',
        color: '#dc2626',
      },
      {
        name: 'Économie',
        slug: 'economie',
        description: 'Économie, finances, investissements et opportunités d\'affaires.',
        color: '#16a34a',
      },
      {
        name: 'Société',
        slug: 'societe',
        description: 'Faits de société, éducation, santé et vie quotidienne.',
        color: '#0891b2',
      },
      {
        name: 'Sport',
        slug: 'sport',
        description: 'Football, athlétisme, basketball et autres disciplines sportives.',
        color: '#2563eb',
      },
      {
        name: 'Culture',
        slug: 'culture',
        description: 'Musique, arts, littérature, cinéma et patrimoine burundais.',
        color: '#9333ea',
      },
      {
        name: 'Environnement',
        slug: 'environnement',
        description: 'Climat, biodiversité, développement durable et protection de la nature.',
        color: '#059669',
      },
      {
        name: 'International',
        slug: 'international',
        description: 'Actualité africaine et mondiale, diplomatie et coopération.',
        color: '#ea580c',
      },
      {
        name: 'Santé',
        slug: 'sante',
        description: 'Santé publique, recherche médicale et bien-être.',
        color: '#db2777',
      },
    ]);
    console.log(`✅ ${categories.length} catégories créées`);

    // ============================================================
    // 4. ARTICLES (variété de statuts et de dates)
    // ============================================================
    const articlesData = [
      // --- POLITIQUE ---
      {
        title: 'Le Burundi réaffirme son engagement pour la paix régionale lors du sommet de l\'EAC',
        excerpt: 'Lors du 24e sommet des chefs d\'État de la Communauté d\'Afrique de l\'Est, Bujumbura a plaidé pour une coopération renforcée.',
        content: `<p>Le président burundais a réaffirmé, lors du sommet de la Communauté d'Afrique de l'Est (EAC) tenu ce week-end, l'engagement de son pays en faveur de la paix et de la stabilité dans la région des Grands Lacs.</p>
<p>« Notre région ne peut prospérer que dans un climat de paix durable », a-t-il déclaré devant ses homologues, appelant à une intensification des efforts conjoints contre les groupes armés qui sévissent dans l'est de la RDC.</p>
<p>Les participants ont adopté une feuille de route commune prévoyant le renforcement des échanges commerciaux, la libre circulation des personnes et la mutualisation des moyens de sécurité.</p>
<p>Des observateurs saluent cette dynamique tout en soulignant les défis persistants liés à la mise en œuvre effective des accords signés.</p>`,
        status: 'published',
        publishedAt: daysAgo(1),
        categorySlug: 'politique',
        authorEmail: 'jb.ndayishimiye@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/politique1/800/500',
        views: 1245,
      },
      {
        title: 'Réforme constitutionnelle : ce qui change concrètement pour les citoyens',
        excerpt: 'Décryptage des principales dispositions de la réforme adoptée par le Parlement.',
        content: `<p>La réforme constitutionnelle récemment adoptée introduit plusieurs changements majeurs dans l'organisation des institutions.</p>
<h3>Ce qui change</h3>
<ul>
  <li>Réduction du nombre de mandats présidentiels</li>
  <li>Création d'une cour constitutionnelle élargie</li>
  <li>Renforcement des pouvoirs des collectivités locales</li>
</ul>
<p>Les partis d'opposition dénoncent une réforme taillée sur mesure, tandis que la majorité parle d'une modernisation nécessaire.</p>`,
        status: 'published',
        publishedAt: daysAgo(5),
        categorySlug: 'politique',
        authorEmail: 'e.bizimana@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/politique2/800/500',
        views: 892,
      },
      {
        title: 'Élections communales : la CENI présente le calendrier officiel',
        excerpt: 'Les élections se dérouleront en mai prochain, selon la commission électorale.',
        content: `<p>La Commission Électorale Nationale Indépendante (CENI) a présenté ce mardi le calendrier officiel des élections communales prévues pour le mois de mai.</p>
<p>Les partis politiques ont jusqu'à fin mars pour déposer leurs listes de candidats.</p>`,
        status: 'published',
        publishedAt: daysAgo(12),
        categorySlug: 'politique',
        authorEmail: 'jb.ndayishimiye@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/politique3/800/500',
        views: 456,
      },

      // --- ÉCONOMIE ---
      {
        title: 'Le café burundais s\'exporte à nouveau vers l\'Europe après trois ans d\'absence',
        excerpt: 'Une délégation d\'acheteurs européens a visité les coopératives de Ngozi et Kayanza.',
        content: `<p>Bonne nouvelle pour les caféiculteurs burundais : après trois ans d'absence, le café de spécialité du Burundi retrouve les marchés européens.</p>
<p>Une délégation d'acheteurs allemands, belges et français a séjourné une semaine dans les provinces du nord pour évaluer la qualité des récoltes.</p>
<blockquote>« Le café burundais a un potentiel énorme. Nous sommes prêts à signer des contrats pluriannuels », a déclaré un acheteur allemand.</blockquote>
<p>Cette reprise devrait générer plus de 20 millions de dollars de recettes pour la prochaine campagne.</p>`,
        status: 'published',
        publishedAt: daysAgo(2),
        categorySlug: 'economie',
        authorEmail: 'mg.uwimana@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/eco1/800/500',
        views: 2103,
      },
      {
        title: 'Inflation : le gouvernement annonce un plan de stabilisation des prix',
        excerpt: 'Le panier de la ménagère a augmenté de 8% en un an selon les derniers chiffres de l\'INSBU.',
        content: `<p>Face à la hausse continue des prix, le gouvernement a annoncé un plan d'urgence pour stabiliser les prix des produits de première nécessité.</p>
<p>Le plan prévoit la suspension temporaire des taxes à l'importation sur le riz, l'huile et le sucre, ainsi qu'un contrôle renforcé des circuits de distribution.</p>`,
        status: 'published',
        publishedAt: daysAgo(7),
        categorySlug: 'economie',
        authorEmail: 'mg.uwimana@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/eco2/800/500',
        views: 1523,
      },
      {
        title: 'Startups : le Burundi mise sur le numérique pour créer des emplois jeunes',
        excerpt: 'Un nouveau fonds d\'investissement de 5 milliards de FBu dédié aux startups voit le jour.',
        content: `<p>Le gouvernement et plusieurs partenaires internationaux ont lancé un fonds de 5 milliards de francs burundais destiné à financer des startups locales.</p>
<p>Les secteurs prioritaires sont l'agritech, la fintech, la santé numérique et l'éducation en ligne.</p>`,
        status: 'published',
        publishedAt: daysAgo(15),
        categorySlug: 'economie',
        authorEmail: 'mg.uwimana@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/eco3/800/500',
        views: 987,
      },
      {
        title: 'BUDGET 2025 : les grandes lignes du projet de loi de finances',
        excerpt: 'Le budget prévisionnel s\'élève à 2 800 milliards de FBu, en hausse de 6%.',
        content: `<p>Le projet de loi de finances pour l'exercice 2025 prévoit un budget global de 2 800 milliards de francs burundais.</p>
<p>Les priorités affichées : l'éducation (22%), la santé (15%), les infrastructures (18%) et la sécurité (12%).</p>`,
        status: 'draft',
        categorySlug: 'economie',
        authorEmail: 'mg.uwimana@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/eco4/800/500',
        views: 0,
      },

      // --- SOCIÉTÉ ---
      {
        title: 'Éducation : la rentrée scolaire sous le signe de la gratuité effective',
        excerpt: 'Plus de 2 millions d\'élèves ont repris le chemin de l\'école ce lundi.',
        content: `<p>La rentrée scolaire s'est déroulée ce lundi dans un contexte marqué par la volonté gouvernementale de rendre effective la gratuité de l'enseignement primaire.</p>
<p>Dans plusieurs provinces, des associations de parents d'élèves signalent néanmoins des frais « parallèles » qui persistent.</p>`,
        status: 'published',
        publishedAt: daysAgo(3),
        categorySlug: 'societe',
        authorEmail: 'c.irakoze@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/soc1/800/500',
        views: 1345,
      },
      {
        title: 'Santé maternelle : baisse significative de la mortalité infantile',
        excerpt: 'Les autorités sanitaires saluent les progrès réalisés ces cinq dernières années.',
        content: `<p>Le taux de mortalité infantile a baissé de 22% en cinq ans, selon les derniers chiffres du ministère de la Santé.</p>
<p>Cette amélioration est attribuée au déploiement d'infirmiers qualifiés dans les zones rurales et à la sensibilisation des mères.</p>`,
        status: 'published',
        publishedAt: daysAgo(20),
        categorySlug: 'sante',
        authorEmail: 'l.nkeshimana@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/sante1/800/500',
        views: 756,
      },
      {
        title: 'Jeunesse et emploi : 30 000 jeunes formés aux métiers du numérique',
        excerpt: 'Un programme national ambitionne de former 100 000 jeunes d\'ici 2027.',
        content: `<p>Le programme « Bujumbura Digital Skills » a déjà formé 30 000 jeunes aux métiers du numérique en deux ans.</p>
<p>Développement web, data analyse, cybersécurité : les formations sont gratuites et ouvertes aux jeunes de 18 à 35 ans.</p>`,
        status: 'published',
        publishedAt: daysAgo(9),
        categorySlug: 'societe',
        authorEmail: 'c.irakoze@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/soc2/800/500',
        views: 1102,
      },

      // --- SPORT ---
      {
        title: 'Les Intamba se qualifient pour la CAN 2025 après une victoire historique',
        excerpt: 'Victoire 2-1 face aux Étalons du Burkina Faso devant 40 000 spectateurs.',
        content: `<p>Exploit historique ! Les Intamba du Burundi se sont qualifiés pour la Coupe d'Afrique des Nations 2025 après leur victoire 2-1 face au Burkina Faso.</p>
<p>Les buts ont été inscrits par Bienvenu Kanakimana (34') et Cédric Amissi (78'), devant un stade Intwari en fusion.</p>
<blockquote>« C'est un rêve qui se réalise pour tout un peuple », a déclaré le sélectionneur en conférence de presse.</blockquote>
<p>La qualification a été célébrée dans tout le pays jusqu'au petit matin.</p>`,
        status: 'published',
        publishedAt: daysAgo(1),
        categorySlug: 'sport',
        authorEmail: 'p.niyongabo@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/sport1/800/500',
        views: 4521,
      },
      {
        title: 'Athlétisme : Francine Niyonsaba bat le record national du 3000m',
        excerpt: 'La championne burundaise continue d\'écrire l\'histoire de l\'athlétisme africain.',
        content: `<p>Francine Niyonsaba a une nouvelle fois marqué l'histoire du sport burundais en battant le record national du 3000 mètres lors du meeting de Monaco.</p>
<p>Avec un temps de 8'22"45, elle améliore son propre record de près de 5 secondes.</p>`,
        status: 'published',
        publishedAt: daysAgo(6),
        categorySlug: 'sport',
        authorEmail: 'p.niyongabo@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/sport2/800/500',
        views: 3210,
      },
      {
        title: 'Basketball : le championnat national reprend avec un nouveau format',
        excerpt: 'Dix équipes s\'affronteront dans une formule à double confrontation.',
        content: `<p>Le championnat national de basketball reprend ce week-end avec un format remanié qui promet plus de spectacle.</p>
<p>Dix équipes issues de tout le pays s'affronteront en matchs aller-retour, avec une phase de play-offs élargie.</p>`,
        status: 'published',
        publishedAt: daysAgo(18),
        categorySlug: 'sport',
        authorEmail: 'p.niyongabo@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/sport3/800/500',
        views: 654,
      },

      // --- CULTURE ---
      {
        title: 'Le festival Umuganuro célèbre la richesse culturelle du Burundi',
        excerpt: 'Trois jours de danses, musiques et expositions à Gitega.',
        content: `<p>Le festival Umuganuro, célébration ancestrale des récoltes, a rassemblé des milliers de Burundais à Gitega ce week-end.</p>
<p>Danses traditionnelles intore, tambours sacrés, expositions d'artisanat : la richesse culturelle du pays a été mise à l'honneur.</p>`,
        status: 'published',
        publishedAt: daysAgo(4),
        categorySlug: 'culture',
        authorEmail: 'c.irakoze@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/culture1/800/500',
        views: 1876,
      },
      {
        title: 'Littérature : un jeune auteur burundais primé au festival de Dakar',
        excerpt: 'Son roman « Les tambours de l\'aube » a séduit le jury international.',
        content: `<p>Le jeune écrivain burundais Éric Nshimirimana a remporté le Prix du premier roman au festival littéraire de Dakar.</p>
<p>Son ouvrage « Les tambours de l'aube » explore la mémoire d'une famille burundaise sur trois générations.</p>`,
        status: 'published',
        publishedAt: daysAgo(14),
        categorySlug: 'culture',
        authorEmail: 'c.irakoze@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/culture2/800/500',
        views: 543,
      },

      // --- ENVIRONNEMENT ---
      {
        title: 'Reforestation : 5 millions d\'arbres plantés en une saison',
        excerpt: 'Une mobilisation nationale inédite pour lutter contre la déforestation.',
        content: `<p>Cinq millions d'arbres ont été plantés à travers le pays lors de la dernière saison des pluies, un record national.</p>
<p>Chaque province a contribué à l'effort avec le soutien d'ONG environnementales et de coopératives agricoles.</p>`,
        status: 'published',
        publishedAt: daysAgo(8),
        categorySlug: 'environnement',
        authorEmail: 'l.nkeshimana@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/env1/800/500',
        views: 1420,
      },
      {
        title: 'Lac Tanganyika : un plan régional pour protéger la biodiversité',
        excerpt: 'Burundi, RDC, Tanzanie et Zambie unissent leurs efforts.',
        content: `<p>Les quatre pays riverains du lac Tanganyika ont signé un accord cadre pour la protection de la biodiversité du lac.</p>
<p>Le plan prévoit la lutte contre la surpêche, la pollution plastique et les espèces invasives.</p>`,
        status: 'published',
        publishedAt: daysAgo(22),
        categorySlug: 'environnement',
        authorEmail: 'l.nkeshimana@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/env2/800/500',
        views: 723,
      },
      {
        title: 'Climat : Bujumbura face au défi des inondations récurrentes',
        excerpt: 'Les quartiers nord de la capitale sont de nouveau sous les eaux.',
        content: `<p>Les fortes pluies des dernières semaines ont provoqué des inondations dans plusieurs quartiers du nord de Bujumbura.</p>
<p>Des centaines de familles ont été déplacées. Les autorités promettent un plan d'assainissement d'urgence.</p>`,
        status: 'archived',
        publishedAt: daysAgo(45),
        categorySlug: 'environnement',
        authorEmail: 'l.nkeshimana@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/env3/800/500',
        views: 3210,
      },

      // --- INTERNATIONAL ---
      {
        title: 'Coopération : l\'Union européenne renforce son aide au Burundi',
        excerpt: 'Un nouveau programme de 150 millions d\'euros pour les infrastructures.',
        content: `<p>L'Union européenne a annoncé un nouveau programme d'aide au Burundi d'un montant de 150 millions d'euros sur cinq ans.</p>
<p>Les secteurs ciblés : énergie, transport, agriculture durable et gouvernance.</p>`,
        status: 'published',
        publishedAt: daysAgo(10),
        categorySlug: 'international',
        authorEmail: 'jb.ndayishimiye@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/int1/800/500',
        views: 1320,
      },
      {
        title: 'ONU : le Burundi élu au Conseil des droits de l\'homme',
        excerpt: 'Une élection saluée par le gouvernement, critiquée par les ONG.',
        content: `<p>Le Burundi a été élu pour un mandat de trois ans au Conseil des droits de l'homme des Nations Unies.</p>
<p>Les organisations de défense des droits humains expriment leur scepticisme, appelant à des réformes concrètes.</p>`,
        status: 'published',
        publishedAt: daysAgo(30),
        categorySlug: 'international',
        authorEmail: 'e.bizimana@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/int2/800/500',
        views: 987,
      },

      // --- SANTÉ ---
      {
        title: 'Paludisme : une campagne de distribution de moustiquaires démarre',
        excerpt: '3 millions de moustiquaires imprégnées seront distribuées dans tout le pays.',
        content: `<p>Le ministère de la Santé lance sa campagne annuelle de distribution de moustiquaires imprégnées à longue durée d'action.</p>
<p>Objectif : réduire de 30% l'incidence du paludisme d'ici la fin de l'année.</p>`,
        status: 'published',
        publishedAt: daysAgo(11),
        categorySlug: 'sante',
        authorEmail: 'l.nkeshimana@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/sante2/800/500',
        views: 845,
      },
      {
        title: 'Vaccination : 95% des enfants de moins de 5 ans immunisés',
        excerpt: 'Le Burundi atteint les objectifs de l\'OMS pour la troisième année consécutive.',
        content: `<p>Le programme national de vaccination a atteint un taux de couverture de 95% chez les enfants de moins de 5 ans.</p>
<p>Les autorités sanitaires attribuent ce succès à la mobilisation des agents de santé communautaires.</p>`,
        status: 'published',
        publishedAt: daysAgo(26),
        categorySlug: 'sante',
        authorEmail: 'l.nkeshimana@bujumbura-post.bi',
        image: 'https://picsum.photos/seed/sante3/800/500',
        views: 612,
      },
    ];

    const articles = [];
    for (const a of articlesData) {
      const category = categories.find((c) => c.slug === a.categorySlug);
      const author = authors.find((au) => au.email === a.authorEmail);
      const user = users.find((u) => u.role === 'editor') || users[0];

      articles.push({
        title: a.title,
        slug: slugify(a.title),
        excerpt: a.excerpt,
        content: a.content,
        image: a.image,
        status: a.status,
        views: a.views || 0,
        publishedAt: a.publishedAt || null,
        categoryId: category.id,
        authorId: author.id,
        userId: user.id,
      });
    }

    const createdArticles = await Article.bulkCreate(articles);
    console.log(`✅ ${createdArticles.length} articles créés`);
    console.log(`   - ${articles.filter((a) => a.status === 'published').length} publiés`);
    console.log(`   - ${articles.filter((a) => a.status === 'draft').length} brouillons`);
    console.log(`   - ${articles.filter((a) => a.status === 'archived').length} archivés`);

    // ============================================================
    // 5. COMMENTAIRES (variés, avec/sans utilisateur)
    // ============================================================
    const published = createdArticles.filter((a) => a.status === 'published');
    const reader = users.find((u) => u.email === 'patrick@bujumbura-post.bi');
    const reader2 = users.find((u) => u.email === 'sandrine@bujumbura-post.bi');
    const editor = users.find((u) => u.email === 'claudine@bujumbura-post.bi');

    const comments = [
      {
        content: 'Excellent article, très bien documenté. Merci pour ce travail de qualité !',
        articleId: published[0].id,
        userId: reader.id,
        status: 'approved',
      },
      {
        content: 'Enfin une analyse objective de la situation politique. Continuez comme ça.',
        articleId: published[0].id,
        guestName: 'Anonyme',
        guestEmail: 'anonyme@mail.com',
        status: 'approved',
      },
      {
        content: 'Je ne suis pas d\'accord avec la conclusion, mais l\'article reste intéressant.',
        articleId: published[0].id,
        guestName: 'Jean-Pierre M.',
        guestEmail: 'jp@mail.com',
        status: 'approved',
      },
      {
        content: 'Merci pour cet article sur le café burundais. Enfin une bonne nouvelle !',
        articleId: published[1].id,
        userId: reader2.id,
        status: 'approved',
      },
      {
        content: 'Quelles sont les coopératives concernées ? J\'aimerais en savoir plus.',
        articleId: published[1].id,
        guestName: 'Coopérative Ngozi',
        guestEmail: 'coop@ngozi.bi',
        status: 'approved',
      },
      {
        content: 'Vivement la CAN ! Allez les Intamba ! 🇧🇮',
        articleId: published.find((a) => a.title.includes('Intamba')).id,
        userId: reader.id,
        status: 'approved',
      },
      {
        content: 'Félicitations aux joueurs et au staff technique. Une qualification méritée !',
        articleId: published.find((a) => a.title.includes('Intamba')).id,
        guestName: 'Supporter Intamba',
        guestEmail: 'supporter@mail.com',
        status: 'approved',
      },
      {
        content: 'Message hors sujet, à modérer.',
        articleId: published.find((a) => a.title.includes('Intamba')).id,
        guestName: 'Spam Bot',
        guestEmail: 'spam@spam.com',
        status: 'rejected',
      },
      {
        content: 'Article en attente de validation par la rédaction.',
        articleId: published[2].id,
        userId: reader2.id,
        status: 'pending',
      },
      {
        content: 'Très belle initiative pour l\'environnement. Bravo !',
        articleId: published.find((a) => a.title.includes('Reforestation')).id,
        userId: editor.id,
        status: 'approved',
      },
      {
        content: 'Combien de ces arbres ont réellement survécu ? Question essentielle.',
        articleId: published.find((a) => a.title.includes('Reforestation')).id,
        guestName: 'Écologiste',
        guestEmail: 'eco@mail.com',
        status: 'approved',
      },
      {
        content: 'Le festival Umuganuro était magnifique cette année !',
        articleId: published.find((a) => a.title.includes('Umuganuro')).id,
        userId: reader.id,
        status: 'approved',
      },
      {
        content: 'Peut-on avoir le programme de l\'année prochaine ?',
        articleId: published.find((a) => a.title.includes('Umuganuro')).id,
        guestName: 'Curieux',
        guestEmail: 'curieux@mail.com',
        status: 'approved',
      },
      {
        content: 'Article intéressant mais il manque des chiffres officiels.',
        articleId: published.find((a) => a.title.includes('Éducation')).id,
        userId: reader2.id,
        status: 'approved',
      },
      {
        content: 'La gratuité n\'est pas effective dans ma commune, je confirme.',
        articleId: published.find((a) => a.title.includes('Éducation')).id,
        guestName: 'Parent d\'élève',
        guestEmail: 'parent@mail.com',
        status: 'approved',
      },
    ];

    const createdComments = await Comment.bulkCreate(comments, { individualHooks: false });
    console.log(`✅ ${createdComments.length} commentaires créés`);
    console.log(`   - ${comments.filter((c) => c.status === 'approved').length} approuvés`);
    console.log(`   - ${comments.filter((c) => c.status === 'pending').length} en attente`);
    console.log(`   - ${comments.filter((c) => c.status === 'rejected').length} rejetés`);

    // ============================================================
    // RÉCAPITULATIF
    // ============================================================
    console.log('\n═══════════════════════════════════════════════');
    console.log('🎉 SEEDER TERMINÉ AVEC SUCCÈS');
    console.log('═══════════════════════════════════════════════');
    console.log(`👥 Utilisateurs  : ${users.length}`);
    console.log(`✍️  Auteurs       : ${authors.length}`);
    console.log(`🏷️  Catégories    : ${categories.length}`);
    console.log(`📰 Articles      : ${createdArticles.length}`);
    console.log(`💬 Commentaires  : ${createdComments.length}`);
    console.log('═══════════════════════════════════════════════');
    console.log('\n🔑 COMPTES DE TEST');
    console.log('───────────────────────────────────────────────');
    console.log('ADMIN     : admin@bujumbura-post.bi / admin123');
    console.log('EDITOR    : claudine@bujumbura-post.bi / editor123');
    console.log('EDITOR    : eric@bujumbura-post.bi / editor123');
    console.log('AUTHOR    : aline@bujumbura-post.bi / author123');
    console.log('AUTHOR    : jc@bujumbura-post.bi / author123');
    console.log('AUTHOR    : fatou@bujumbura-post.bi / author123');
    console.log('READER    : patrick@bujumbura-post.bi / reader123');
    console.log('READER    : sandrine@bujumbura-post.bi / reader123');
    console.log('INACTIF   : inactif@bujumbura-post.bi / reader123');
    console.log('═══════════════════════════════════════════════\n');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed échoué :', err);
    process.exit(1);
  }
})();