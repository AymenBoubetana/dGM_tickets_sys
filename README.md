# 1. Introduction Générale:



## 1.1. Présentation de projet:

La Direction Générale de la Météorologie (DGM) fait face à de nombreux défis liés à la gestion et au suivi des demandes internes et externes, notamment en ce qui concerne les problèmes techniques, les demandes d'information, et les questions de maintenance. Pour améliorer l'efficacité et la transparence des processus de gestion des demandes, il est essentiel de développer une application de gestion des tickets. Cette application facilitera la communication entre les différents départements, assurera un suivi précis des requêtes et améliorera le temps de réponse.


## 1.2. Objectifs du Projet:
    
1- Centraliser la Gestion des Tickets : Mettre en place une plateforme unique où toutes les demandes de tickets peuvent être enregistrées, suivies et résolues.

2- Améliorer la Communication Interne : Faciliter la communication entre les équipes techniques, les employés et les demandeurs pour assurer une résolution rapide et efficace des problèmes.

3- Optimiser le Temps de Réponse : Réduire le temps nécessaire pour traiter chaque demande en automatisant certaines étapes du processus.

4- Suivi et Reporting : Fournir des outils de suivi et de reporting pour analyser les performances, identifier les goulots d'étranglement et améliorer les processus existants.


## 1.3. Technologies Utilisées:


### Frontend :

- **React.js :** Pour créer une interface utilisateur dynamique, réactive et facile à utiliser.
- **Redux :** Pour la gestion de l'état de l'application.

### Backend :

- **Node.js :** Pour la gestion des requêtes et la logique métier.
- **Express.js :** Pour construire des API RESTful robustes.

### Base de Données :

- **MongoDB :** Pour stocker les informations relatives aux tickets et utilisateurs de manière flexible et évolutive.

### Authentification :

- **JWT :** Pour sécuriser l'accès à l'application.


# 2. Fonctionnalités de l'Application


## 2.1 Fonctionnalités Administrateur

- **Gestion des Utilisateurs :**
  - Création de comptes administrateur.
  - Ajout et gestion des membres de l'équipe.

- **Affectation des Tâches :**
  - Attribution des tâches aux utilisateurs individuels ou à des groupes.
  - Mise à jour des détails et du statut des tâches.

- **Propriétés des Tâches :**
  - Étiquetage des tâches (à faire, en cours, terminée).
  - Définition des niveaux de priorité (haute, moyenne, normale, basse).
  - Gestion des sous-tâches.

- **Gestion des Actifs :**
  - Téléchargement des ressources associées aux tâches (images, documents).

- **Contrôle des Comptes Utilisateurs :**
  - Désactivation ou activation des comptes utilisateurs.
  - Suppression définitive ou archivage des tâches.


## 2.2 Fonctionnalités Utilisateur

- **Interaction avec les Tâches :**
  - Modification du statut des tâches (en cours ou terminée).
  - Consultation des informations détaillées des tâches.

- **Communication :**
  - Ajout de commentaires ou chat dans les activités des tâches.

## 2.3 Fonctionnalités Générales

- **Authentification et Autorisation :**
  - Connexion sécurisée des utilisateurs avec contrôle d'accès basé sur les rôles.

- **Gestion du Profil :**
  - Mise à jour des profils utilisateurs.

- **Gestion des Mots de Passe :**
  - Changement de mot de passe sécurisé.

- **Tableau de Bord :**
  - Résumé des activités des utilisateurs.
  - Filtrage des tâches (à faire, en cours, terminée).

---


# 3. **Architecture Technique**

## 3.1 Architecture Frontend

- Utilisation de **React (Vite)** pour une interface réactive et performante.
- **Redux Toolkit** pour la gestion de l'état global de l'application.
- **Tailwind CSS** pour le design responsive et personnalisable.
- **Headless UI** pour les composants d'interface utilisateur accessibles et sans styles.

## 3.2 Architecture Backend

- **Node.js** avec **Express.js** pour gérer les requêtes serveur et la logique métier.
- **API RESTful** pour une communication efficace entre le frontend et le backend.

## 3.3 Base de Données

- **MongoDBAtlas** pour le stockage efficace et évolutif des données relatives aux tâches et aux utilisateurs.

## 3.4 Authentification et Sécurité

- Utilisation de **JWT**  pour sécuriser l'accès à l'application.

## 3.4 Création D'un Chat bot

- Utilisation de **voiceflow** pour créer un chatbot qui facilite l'utilisation de l'application.


# 4. **Guide de Configuration**


## 4.1 Configuration du Serveur

### 4.1.1 Variables d'Environnement

- Création d'un fichier `.env` dans le dossier serveur avec les variables suivantes :
  - `MONGODB_URI`: URL de votre base de données MongoDB.
  - `JWT_SECRET`: Clé secrète pour JWT (doit être sécurisée).
  - `PORT`: Port sur lequel le serveur écoute (par exemple, 8800).
  - `NODE_ENV`: Environnement de développement ou de production (`development` ou `production`).

### 4.1.2 Mise en Place de MongoDB

1. **Création d'un Compte MongoDB Atlas :**
   - Rendez-vous sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) et créez un compte.

2. **Configuration du Cluster :**
   - Créez un nouveau cluster en choisissant un fournisseur de cloud et une région.
   - Configurez les paramètres du cluster et attendez son déploiement.
   - Créez un utilisateur de base de données et configurez la liste blanche des IP.
   - Connectez votre application au cluster et testez la connexion.

3. **Création de la Base de Données :**
   - Créez une nouvelle base de données et configurez l'URL de connexion dans le fichier `.env`.  

### 4.1.3 Démarrage du Serveur

1. Ouvrez le projet dans votre éditeur de code préféré.
2. Naviguez dans le répertoire serveur avec `cd server`.
3. Exécutez `npm install` pour installer les dépendances.
4. Lancez le serveur avec `npm start`.

- Si tout est correctement configuré, un message indiquera que le serveur fonctionne et que la base de données est connectée.

## 4.2 Configuration du Côté Client

### 4.2.1 Variables d'Environnement

- Créez un fichier `.env` dans le dossier client avec les variables suivantes :
  - `VITE_APP_BASE_URL`: URL de base de l'API, par exemple `http://localhost:8800`.
  - `VITE_APP_FIREBASE_API_KEY`: Clé API Firebase (si utilisée).

### 4.2.2 Démarrage de l'Application Client

1. Naviguez dans le répertoire client avec `cd client`.
2. Exécutez `npm install` pour installer les dépendances.
3. Lancez l'application avec `npm start`.

- Ouvrez [http://localhost:3000](http://localhost:3000) pour visualiser l'application dans votre navigateur.

---


# 5. **Planification du Développement**

## 5.1 Phases de Développement

1. **Phase de Recherche et Planification :**
   - Analyse des besoins et exigences fonctionnelles.
   - Conception de l'architecture et planification des fonctionnalités.
   - Élaboration de maquettes et prototypage initial.

2. **Phase de Développement :**
   - Développement du backend avec Node.js et Express.js.
   - Développement du frontend avec React et intégration de Redux.
   - Mise en œuvre de la base de données MongoDB et des API RESTful.

3. **Phase de Test :**
   - Tests unitaires et d'intégration.
   - Tests utilisateurs pour valider l'expérience et l'interface.
   - Ajustements basés sur les retours d'expérience.

5. **Phase de Maintenance et Évolutions Futures :**
   - Maintenance régulière pour assurer la stabilité et la sécurité.
   - Écoute des utilisateurs pour ajouter de nouvelles fonctionnalités.
   - Adaptation aux évolutions technologiques.

---


# 6. **Conclusion**

## 6.1 Bénéfices Attendus

- Amélioration de l'efficacité de la gestion des tâches grâce à une plateforme centralisée et intuitive.
- Réduction des erreurs liées aux méthodes de gestion manuelle.
- Augmentation de la productivité des équipes grâce à une meilleure organisation et communication.

## 6.2 Perspectives d'Évolution

- Intégration avec d'autres outils de collaboration.
- Développement d'une application mobile pour plus de flexibilité.
- Amélioration continue des fonctionnalités basées sur les retours des utilisateurs.
