1. Introduction

Ce projet a pour objectif de développer une application web en React pour la gestion de comptes bancaires et de transactions, en consommant une API GraphQL via Apollo Client.
L’interface permet de créer des comptes, d’afficher la liste des comptes, d’ajouter des transactions (dépôts / retraits) et de consulter l’historique des transactions.

2. Prérequis

Node.js ≥ 16 et npm installés

Navigateur moderne (Chrome, Firefox, Edge)

IDE : Visual Studio Code

Backend GraphQL disponible sur l’URL /graphql

3. Installation du projet
# Cloner ou extraire le projet
cd gestion-comptes

# Installer les dépendances
npm install


Dépendances principales :

react, react-dom

@apollo/client, graphql

tailwindcss, postcss, autoprefixer

4. Configuration d’Apollo Client

Fichier src/apollo/client.js :

Création d’un ApolloClient avec :

createHttpLink pointant sur uri: '/graphql'

InMemoryCache pour la gestion du cache

defaultOptions avec fetchPolicy: 'network-only' pour toujours récupérer les données les plus récentes.

Fichier src/App.js :

L’application est encapsulée dans <ApolloProvider client={client}> afin de rendre le client GraphQL disponible dans tous les composants.

5. Organisation des requêtes et mutations GraphQL

Dossier src/graphql :

queries.js

GET_ALL_COMPTES, GET_COMPTE_BY_ID, GET_TOTAL_SOLDE,
GET_COMPTE_BY_TYPE, GET_COMPTE_TRANSACTIONS,
GET_ALL_TRANSACTIONS, GET_TRANSACTION_STATS.

mutations.js

SAVE_COMPTE (création de compte)

DELETE_COMPTE (suppression de compte)

ADD_TRANSACTION (ajout d’une transaction).

types.js

TypeCompte : COURANT, EPARGNE

TypeTransaction : DEPOT, RETRAIT.

6. Description des composants React

CreateCompte

Formulaire avec solde et type (COURANT/EPARGNE).

Utilise useMutation(SAVE_COMPTE) pour créer un compte.

Réinitialise le formulaire après succès.

CompteList

Utilise useQuery(GET_ALL_COMPTES) pour afficher tous les comptes.

Affiche id, solde, dateCreation, type.

TransactionForm

Formulaire pour ajouter une transaction (montant, type, compteId).

Utilise useMutation(ADD_TRANSACTION).

TransactionList

Utilise useQuery(GET_ALL_TRANSACTIONS) pour afficher tout l’historique des transactions, avec les infos du compte associé.

7. Lancement et tests

Pour démarrer l’application :

npm start


Application accessible sur http://localhost:3000.
