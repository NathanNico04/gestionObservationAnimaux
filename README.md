# Framework Web 2

## Collaborateur projet

- Maximilien Goujon `maximilien.goujon@etu.univ-orleans.fr`
- Nathan Nicolessi `nathan.nicolessi@etu.univ-orleans.fr`
- Wail Demnati `wail.demnati@etu.univ-orleans.fr`
- Inouk Buigne `inouk.buigne@etu.univ-orleans.fr`

---

## Question 1

#### Programmation de l'entité `Observation`

| Nom         | Type     | Description                             |
| ----------- | -------- | --------------------------------------- |
| date        | DateTime | Date et heure de l'observation          |
| latitude    | float    | Latitude GPS                            |
| longitude   | float    | Longitude GPS                           |
| animal      | Relation | Référence à l'entité Animal (ManyToOne) |
| description | text     | Description de l'observation            |

---

## Question 2

- **Modification du fichier .env pour activer sqlite**
- `symfony console make:entity Animal`
- `symfony console make:entity Observation`
- `symfony console make:migration`
- `symfony console doctrine:migrations:migrate`

---

## Question 3

- `symfony composer require fakerphp/faker`
- `symfony composer require orm-fixtures --dev`
- `symfony console make:fixtures AppFixtures`
- Modification du fichier `src/DataFixtures/AppFixtures.php`
- `symfony console doctrine:fixtures:load`

---

## Question 4

- `cd /frontend`
- `npm install`
- `npm run start` _(modification du fichier `package.json` pour activer cette commande)_
- `ng generate component about`
- Modification du fichier `app.routes.ts` pour ajouter la route `/about`
- `ng add @angular/material`
- Modification du composant `about.component.ts` et du fichier `about.component.html` pour ajouter Material Design

---

## Question 5

- Ajout du décorateur `#[ApiResource]` dans les fichiers `Animal.php` et `Observation.php`
- Ajout dans `app.config.ts` du module `provideHttpClient`
- `ng generate interface entity/api-response`
- `ng generate interface entity/animal`
- `ng generate interface entity/observation`
- `ng generate service services/animal`
- `ng generate service services/observation`

---

## Question 6

- `ng generate component animal/animals-list` _(afficher l'ensembles des animaux + liens CRUD)_
- `ng generate component animal/animal-detail` _(afficher un animal)_
- `ng generate component animal/animal-form` _(Ajouter ou modifier un animal)_
- Modification du fichier `app.routes.ts` pour ajouter les routes `animals`, `animals/:id`, `add-animal`, `edit-animal/:id`

---

## Question 7

- `ng generate component observation/observations-list`
- `ng generate component observation/observation-details`
- `ng generate component observation/observation-form`
- Modification du fichier `app.routes.ts` pour ajouter les routes `observations`, `observations/:id`, `add-observation`, `edit-observation/:id`

---

## Question 8

- `ng generate component menu/navbar`
- Ajout du composant `navbar` dans le fichier `app.component.ts`
- Ajout du module `MatToolbarModule` dans le fichier `app.component.html`
- Stylisation des différent composants pour les animaux et les observations _(SCSS)_

---

## Question 9

#### Backend

- `symfony console make:user` _(Choix "username" pour la propriété unique)_
- `symfony composer require lexik/jwt-authentication-bundle`
- `symfony console lexik:jwt:generate-keypair` _(Passphrase : 7f490e8479c34ff6c984bb8d2ccd70dbf0421aaee40461560c3bf646c169d17f)_
- **Modification de `config/packages/security.yaml` et de `config/routes.yaml` pour ajouter le login**
- `symfony console make:migration`
- `symfony console doctrine:migrations:migrate`
- `symfony console make:listener` _(AuthenticationSuccessListener)_
- `symfony console make:controller RegistrationController`
- **Ajout du service à l'application dans `config/services.yaml`**
- **Ajout du controller dans l'api de `User.php`**
- `symfony console make:controller UserController` _(Récuperer le profil de l'utilisateur)_

#### Frontend

- `ng generate service services/auth` _(Fonctions : Login, Logout, Register)_
- `ng generate interceptor interceptor/jwt`
- `ng generate component login`
- **Création d'un dossier environnement pour séparer les urls de développement et de production**
- `ng generate component register`
- **Ajout des routes dans `app.routes.ts` pour les composants Login et Register**

---

## Question 10

#### Backend

- `symfony console make:entity Obsersvation` ajout d'une relation entre `User.php` et `Observation.php` _(ManyToOne depuis Observations)_
- `symfony console make:migration`
- `symfony console doctrine:migrations:migrate`
- `modification de la fixture pour créer des utilisateurs et les lier à des observations`
- `symfony console doctrine:fixtures:load`
- `symfony console make:state-provider`
- **Modification de `Animal.php` et de `Observation.php` pour restreindre l'accès aux utilisateurs authentifiés.**
- **Modification de `ObservationRepository.php` pour ajouter des méthodes de filtrage par utilisateur.**

#### Frontend

- **Ajout de méthodes dans `auth.service.ts`**
- **Modification de l'interface `Observation.ts`**
- `ng generate interface entity/user`

---

## Question 11

Nous avons envisagé une extension sous forme de **gamification** de l'application.
La gamification est aujourd'hui utilisée par de nombreux sites web et applications mobiles pour rendre l'expérience plus attrayante.
Si certaines applications l’utilisent à des fins douteuses (notamment dans la finance), nous souhaitons ici l'appliquer **de manière positive**, pour **inciter les utilisateurs à réaliser davantage d'observations**, **sensibiliser** et **protéger la faune**.

## Contenu de l'extension :

- **Design et performances optimisés**
- **Tableau de bord personnalisé** (profil, historique, paramètres)
- **Statistiques et classements** (nombre d'observations, leaderboard)
- **Système de badges et de récompenses** (première observation, espèces rares, etc.)

## Objectif

Renforcer l'engagement des utilisateurs et valoriser leur contribution à la protection de la biodiversité.

---

## Question 12

#### Backend

- `symfony console make:entity Badge` _(ManyToMany, plusieurs badges pour plusieurs utilisateur)_
- **Création d'un EventSubscriber `ObservationBadgeSubscriber`** _(pour ajouter/changer des badges juste en changeant un tableau)_

#### Frontend

- `ng generate service services/badge`
- `ng generate component dashboard/dashboard`
