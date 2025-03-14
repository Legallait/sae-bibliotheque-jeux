const express = require('express');
const router = express.Router();
const gameListController = require('../controllers/gameListsController');
const verifyToken = require('../middleware/auth');

/**
 * @swagger
 * /game-lists:
 *   post:
 *     summary: Créer une nouvelle liste de jeux
 *     description: Crée une nouvelle liste de jeux pour l'utilisateur connecté.
 *     tags:
 *       - Game Lists
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "My Favorite Games"
 *               description:
 *                 type: string
 *                 example: "A list of games I love"
 *     responses:
 *       201:
 *         description: Liste créée avec succès
 *       400:
 *         description: Données invalides ou utilisateur non connecté
 *       500:
 *         description: Erreur serveur
 */
router.post('/', verifyToken, gameListController.createGameList);

/**
 * @swagger
 * /game-lists/{id}:
 *   put:
 *     summary: Mettre à jour une liste de jeux
 *     description: Met à jour le nom ou la description d'une liste appartenant à l'utilisateur connecté.
 *     tags:
 *       - Game Lists
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la liste à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated List Name"
 *               description:
 *                 type: string
 *                 example: "Updated List Description"
 *     responses:
 *       200:
 *         description: Liste mise à jour avec succès
 *       404:
 *         description: Liste non trouvée ou non possédée par l'utilisateur
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', verifyToken, gameListController.updateGameList);

/**
 * @swagger
 * /game-lists/{id}:
 *   delete:
 *     summary: Supprimer une liste de jeux
 *     description: Supprime une liste appartenant à l'utilisateur connecté.
 *     tags:
 *       - Game Lists
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la liste à supprimer
 *     responses:
 *       200:
 *         description: Liste supprimée avec succès
 *       404:
 *         description: Liste non trouvée ou non possédée par l'utilisateur
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', verifyToken, gameListController.deleteGameList);

/**
 * @swagger
 * /contentList/{idList}:
 *   get:
 *     summary: Récupérer les détails d'une liste de jeux
 *     description: Retourne les informations d'une liste et les données enrichies des jeux associés.
 *     tags:
 *       - Game Lists
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idList
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la liste
 *     responses:
 *       200:
 *         description: Détails de la liste récupérés avec succès
 *       404:
 *         description: Liste non trouvée ou non possédée par l'utilisateur
 *       500:
 *         description: Erreur serveur
 */
router.get('/contentList/:idList', verifyToken, gameListController.getGameListWithDetails);

/**
 * @swagger
 * /game-lists/{id}/games:
 *   post:
 *     summary: Ajouter un jeu à une liste
 *     description: Ajoute un jeu à une liste appartenant à l'utilisateur connecté.
 *     tags:
 *       - Game Lists
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la liste
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               igdb_game_id:
 *                 type: integer
 *                 example: 12345
 *     responses:
 *       201:
 *         description: Jeu ajouté avec succès
 *       400:
 *         description: Le jeu existe déjà dans la liste
 *       404:
 *         description: Liste non trouvée ou non possédée par l'utilisateur
 *       500:
 *         description: Erreur serveur
 */
router.post('/:id/games', verifyToken, gameListController.addGameToList);

/**
 * @swagger
 * /game-lists:
 *   get:
 *     summary: Récupérer les listes de jeux de l'utilisateur
 *     description: Retourne toutes les listes de jeux associées à l'utilisateur connecté, avec les détails des jeux contenus.
 *     tags:
 *       - Game Lists
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listes récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Listes récupérées avec succès"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       game_list_id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Ma liste de jeux préférés"
 *                       games:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             igdb_game_id:
 *                               type: integer
 *                               example: 12345
 *                             title:
 *                               type: string
 *                               example: "Uncharted"
 *                             cover:
 *                               type: string
 *                               example: "https://example.com/cover.jpg"
 *       404:
 *         description: Aucune liste trouvée pour cet utilisateur
 *       500:
 *         description: Erreur serveur
 */
router.get('/', verifyToken, gameListController.getUserGameLists);

module.exports = router;
