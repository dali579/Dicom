# 🩻 DICOM Viewer Web Application

## 📌 Description

DICOM Viewer Web est une application web permettant la visualisation et la gestion d'images médicales au format DICOM (Digital Imaging and Communications in Medicine).

Le projet est composé de trois services principaux :

- **Backend** : API REST développée avec ASP.NET Core (.NET / C#)
- **Frontend** : Application web développée avec React(Le choix de React est motivé par sa modularité, sa rapidité de rendu et sa facilité d'intégration avec les bibliothèques de visualisation médicale.)
- **Base de données** : MySQL (MySQL a été choisi pour sa fiabilité, sa simplicité d'utilisation et sa capacité à gérer efficacement les données structurées liées aux études et métadonnées DICOM.)

L'ensemble des services est conteneurisé avec Docker afin de faciliter l'installation et le déploiement.

---

# 🏗️ Architecture du projet

```
DICOM-Viewer/
│
├── Backend/                # API ASP.NET Core (.NET / C#)
│
├── Dicom-Viewer/           # Application React
│
├── docker-compose.yml      # Configuration Docker Compose
│
└── README.md
```

---

# 🛠️ Technologies utilisées

## Backend

- ASP.NET Core (.NET 8)
- C#
- Entity Framework Core
- MySQL
- Swagger / OpenAPI
- FO-DICOM

## Frontend

- React
- JavaScript
- Vite
- Axios
- Material UI

## DevOps

- Docker
- Docker Compose
- Nginx

--- 

## Test et validation
Pour les phases de test et de validation, des fichiers DICOM de test ont été fournis par SAGA et utilisés pour vérifier l'importation, le traitement et l'affichage des images médicales dans l'application.

# 📋 Prérequis

Avant de démarrer le projet, assurez-vous d'avoir installé :

- Git
- Docker Desktop

Vérifiez que Docker est correctement installé :

```bash
docker --version
docker compose version
```

---

# 🚀 Installation

## 1. Cloner le projet

Cloner le dépôt Git sur votre machine locale :

```bash
git clone <"https://github.com/dali579/Dicom.git">
```

Puis accéder au dossier du projet :

```bash
cd Dicom
```

---

## 2. Démarrer Docker Desktop

Lancer Docker Desktop et attendre que Docker Engine soit opérationnel.

---

## 3. Lancer l'application



Depuis le dossier contenant le fichier `docker-compose.yml`:
## ⚠️ Important
Les images Docker du projet **ne sont actuellement pas publiées sur Docker Hub**.

Lors de la première exécution de la commande :
```bash
docker-compose up -d
```

Cette commande va automatiquement :

- Construire l'image du Backend ASP.NET Core
- Construire l'image du Frontend React
- Démarrer la base de données MySQL
- Démarrer l'API Backend
- Démarrer le Frontend avec Nginx
- Créer le réseau Docker nécessaire à la communication entre les services

Le premier lancement peut prendre quelques minutes, car les images Docker doivent être construites.

---

# 🌐 Accès à l'application
NB:Attendre que tous les conteneurs soient démarrés et en état de fonctionnement avant d'accéder à l'application.
Une fois tous les conteneurs démarrés, ouvrir votre navigateur et accéder à :

```
http://localhost:3000
```

L'application DICOM Viewer est alors prête à être utilisée.

---

# 📖 Documentation de l'API

La documentation Swagger est disponible à l'adresse suivante :

```
http://localhost:5000/swagger
```

Elle permet de consulter et de tester les différentes routes de l'API REST.



---

# 📂 Services disponibles

| Service | URL |
|----------|-----|
| Application Web | http://localhost:3000 |
| API Backend | http://localhost:5000 |
| Swagger | http://localhost:5000/swagger |

---

# 📌 Notes

- Le Backend, le Frontend et la base de données sont entièrement conteneurisés avec Docker.
- Aucune installation supplémentaire (.NET SDK, Node.js ou MySQL) n'est nécessaire sur la machine hôte.
- Docker Desktop doit rester démarré pendant l'utilisation de l'application.
- Lors du premier lancement, Docker télécharge les images nécessaires et construit les services, ce qui peut prendre quelques minutes.
- Les données de la base MySQL ainsi que les fichiers DICOM sont conservés grâce aux volumes Docker.

---

# 👨‍💻 Auteur

Projet développé avec ASP.NET Core (.NET), React, MySQL et Docker.