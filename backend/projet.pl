% Base de faits pour le système expert d'évaluation de fiabilité des informations
% ENSA de Fès - Projet Systèmes Experts

% ====== SOURCES D'INFORMATION MAROCAINES ET INTERNATIONALES ======
% source(Nom, Fiabilite).
% Fiabilite: fiable, moyenne, non_fiable
source("MAP", fiable).                 % Maghreb Arabe Presse (agence officielle marocaine)
source("2M.ma", fiable).               % Site d'information du groupe 2M
source("Hespress", moyenne).           % Site d'information marocain
source("Le Matin", fiable).            % Journal marocain
source("TelQuel", fiable).             % Magazine marocain
source("L'Économiste", fiable).        % Journal économique marocain
source("Bulletin Officiel", fiable).   % Publication officielle du Royaume du Maroc
source("CNDH", fiable).                % Conseil National des Droits de l'Homme
source("HCP", fiable).                 % Haut-Commissariat au Plan (statistiques officielles)
source("Médias24", moyenne).           % Site d'information économique marocain
source("Blog Marocain", non_fiable).   % Blogs personnels
source("Forums Marocains", non_fiable). % Forums de discussion non officiels
source("Réseaux sociaux", non_fiable). % Facebook, Twitter, etc.
source("Chaîne Telegram", non_fiable). % Chaînes de messagerie non vérifiées
source("Yabiladi", moyenne).           % Portail marocain

% ====== AUTEURS ======
% auteur(Nom, Reputation).
% Reputation: reconnu, anonyme, inconnu
auteur("ahmed_sefrioul", reconnu).         % Journaliste marocain reconnu
auteur("fatima_alaoui", reconnu).          % Experte économique marocaine
auteur("rachid_benzakour", reconnu).       % Chercheur universitaire marocain
auteur("nadia_benali", reconnu).           % Journaliste marocaine
auteur("karim_idrissi", reconnu).          % Analyste politique marocain
auteur("maroc_info", anonyme).             % Compte anonyme sur les réseaux sociaux
auteur("vérité_maroc", anonyme).           % Blogueur anonyme
auteur("utilisateur_forum", anonyme).      % Utilisateur de forum marocain
auteur("journaliste_freelance", inconnu).  % Journaliste sans affiliation connue

% ====== STYLE DE LANGAGE ======
% utilise_style(Auteur, Style).
% Style: neutre, emotionnel, technique, familier, darija
utilise_style("ahmed_sefrioul", neutre).
utilise_style("fatima_alaoui", technique).
utilise_style("rachid_benzakour", technique).
utilise_style("nadia_benali", neutre).
utilise_style("karim_idrissi", neutre).
utilise_style("maroc_info", emotionnel).
utilise_style("vérité_maroc", emotionnel).
utilise_style("utilisateur_forum", familier).
utilise_style("journaliste_freelance", neutre).

% ====== RÉFÉRENCES ======
% a_des_references(Auteur).
a_des_references("ahmed_sefrioul").
a_des_references("fatima_alaoui").
a_des_references("rachid_benzakour").
a_des_references("nadia_benali").
a_des_references("karim_idrissi").

% ====== PRÉDICATIONS COMPLEXES ======
% source_fournit(Source, Auteur, Information).
source_fournit("MAP", "ahmed_sefrioul", "politique_eau_maroc").
source_fournit("2M.ma", "nadia_benali", "transition_energetique_maroc").
source_fournit("L'Économiste", "fatima_alaoui", "investissements_casablanca").
source_fournit("Blog Marocain", "vérité_maroc", "complot_ressources_maroc").
source_fournit("Forums Marocains", "utilisateur_forum", "critiques_plan_vert").
source_fournit("HCP", "rachid_benzakour", "statistiques_education_2023").
source_fournit("Hespress", "journaliste_freelance", "projet_tgv_maroc").
source_fournit("CNDH", "karim_idrissi", "rapport_droits_humains").
source_fournit("Réseaux sociaux", "maroc_info", "rumeur_economie_maroc").

% contradiction(Info1, Info2).
contradiction("complot_ressources_maroc", "rapport_officiel_ressources").
contradiction("rumeur_economie_maroc", "statistiques_officielles_economie").
contradiction("critiques_plan_vert", "resultats_plan_vert_officiel").

% date_publication(Information, Date).
% Date format: AAAA-MM-JJ
date_publication("politique_eau_maroc", "2023-06-12").
date_publication("transition_energetique_maroc", "2023-04-25").
date_publication("investissements_casablanca", "2023-02-18").
date_publication("statistiques_education_2023", "2023-03-30").
date_publication("projet_tgv_maroc", "2022-11-15").
date_publication("rapport_droits_humains", "2023-01-20").
date_publication("complot_ressources_maroc", "2023-05-05").
date_publication("rumeur_economie_maroc", "2023-07-02").
date_publication("critiques_plan_vert", "2023-05-11").
date_publication("rapport_officiel_ressources", "2023-04-10").
date_publication("statistiques_officielles_economie", "2023-06-20").
date_publication("resultats_plan_vert_officiel", "2023-04-30").

% a_citations(Information, NombreCitations).
a_citations("politique_eau_maroc", 14).
a_citations("transition_energetique_maroc", 8).
a_citations("investissements_casablanca", 12).
a_citations("statistiques_education_2023", 9).
a_citations("projet_tgv_maroc", 7).
a_citations("rapport_droits_humains", 15).
a_citations("complot_ressources_maroc", 0).
a_citations("rumeur_economie_maroc", 2).
a_citations("critiques_plan_vert", 3).
a_citations("rapport_officiel_ressources", 11).
a_citations("statistiques_officielles_economie", 18).
a_citations("resultats_plan_vert_officiel", 9).

% langage_emotionnel(Information, Niveau).
% Niveau: 0-10 (0: neutre, 10: très émotionnel)
langage_emotionnel("politique_eau_maroc", 2).
langage_emotionnel("transition_energetique_maroc", 1).
langage_emotionnel("investissements_casablanca", 0).
langage_emotionnel("statistiques_education_2023", 0).
langage_emotionnel("projet_tgv_maroc", 3).
langage_emotionnel("rapport_droits_humains", 2).
langage_emotionnel("complot_ressources_maroc", 9).
langage_emotionnel("rumeur_economie_maroc", 8).
langage_emotionnel("critiques_plan_vert", 7).
langage_emotionnel("rapport_officiel_ressources", 1).
langage_emotionnel("statistiques_officielles_economie", 0).
langage_emotionnel("resultats_plan_vert_officiel", 2).

% ====== INFORMATIONS À ÉVALUER (EXEMPLES) ======
information("politique_eau_maroc", "Nouveau plan national de l'eau au Maroc 2023-2030").
information("transition_energetique_maroc", "Projets d'énergie solaire dans le sud marocain").
information("investissements_casablanca", "Bilan des investissements étrangers à Casablanca Finance City").
information("statistiques_education_2023", "Taux de réussite au baccalauréat marocain 2023").
information("projet_tgv_maroc", "Extension prévue de la ligne TGV vers Marrakech").
information("rapport_droits_humains", "Situation des droits humains au Maroc en 2023").
information("complot_ressources_maroc", "Théorie sur l'exploitation des ressources marocaines par des entités étrangères").
information("rumeur_economie_maroc", "Effondrement imminent de l'économie marocaine").
information("critiques_plan_vert", "Échec prétendu du Plan Maroc Vert").
information("rapport_officiel_ressources", "État des ressources naturelles du Maroc selon le ministère").
information("statistiques_officielles_economie", "Rapport économique du HCP pour le premier semestre 2023").
information("resultats_plan_vert_officiel", "Bilan officiel du Plan Maroc Vert 2008-2020").

% Module d'inférence pour le système expert d'évaluation de fiabilité des informations
% ENSA de Fès - Projet Systèmes Experts

% ====== RÈGLES D'INFÉRENCE ======

% Règle principale d'évaluation de la fiabilité d'une information
evaluer_info(Information, Fiabilite, Explication) :-
    calculer_score_source(Information, ScoreSource),
    calculer_score_auteur(Information, ScoreAuteur),
    calculer_score_citations(Information, ScoreCitations),
    calculer_score_langage(Information, ScoreLangage),
    calculer_score_contradiction(Information, ScoreContradiction),

    % Application des pondérations selon le document
    ScoreTotal is (ScoreSource * 0.4) + (ScoreAuteur * 0.2) +
                 (ScoreCitations * 0.2) + (ScoreLangage * 0.1) +
                 (ScoreContradiction * 0.1),

    % Détermination du niveau de fiabilité selon l'échelle 0-100
    determiner_fiabilite(ScoreTotal, Fiabilite),

    % Génération de l'explication
    construire_explication(Information, ScoreSource, ScoreAuteur, ScoreCitations,
                           ScoreLangage, ScoreContradiction, ScoreTotal, Explication).

% Calcul du score pour la source (0-100)
calculer_score_source(Information, Score) :-
    source_fournit(Source, _, Information),
    source(Source, Fiabilite),
    score_fiabilite_source(Fiabilite, Score), !.
calculer_score_source(_, 0).  % Si la source n'est pas trouvée, score 0

% Conversion de la fiabilité de la source en valeur numérique
score_fiabilite_source(fiable, 100).
score_fiabilite_source(moyenne, 50).
score_fiabilite_source(non_fiable, 10).

% Calcul du score pour l'auteur (0-100)
calculer_score_auteur(Information, Score) :-
    source_fournit(_, Auteur, Information),
    evaluer_auteur(Auteur, Score), !.
calculer_score_auteur(_, 0).  % Si l'auteur n'est pas trouvé, score 0

% Évaluation d'un auteur
evaluer_auteur(Auteur, Score) :-
    auteur(Auteur, Reputation),
    score_reputation(Reputation, ScoreReputation),
    (a_des_references(Auteur) -> BonusReferences = 20 ; BonusReferences = 0),
    utilise_style(Auteur, Style),
    score_style(Style, ScoreStyle),
    Score is ScoreReputation + BonusReferences + ScoreStyle.

% Conversion de la réputation en score
score_reputation(reconnu, 60).
score_reputation(inconnu, 30).
score_reputation(anonyme, 0).

% Conversion du style en score
score_style(neutre, 20).
score_style(technique, 20).
score_style(familier, 10).
score_style(emotionnel, 0).
score_style(darija, 10).

% Calcul du score pour les citations (0-100)
calculer_score_citations(Information, Score) :-
    a_citations(Information, NombreCitations),
    (NombreCitations > 10 -> Score = 100 ;
     NombreCitations > 5 -> Score = 75 ;
     NombreCitations > 0 -> Score = 50 ;
     Score = 0).

% Calcul du score pour le langage utilisé (0-100)
calculer_score_langage(Information, Score) :-
    langage_emotionnel(Information, Niveau),
    Score is 100 - (Niveau * 10).

% Calcul du score pour la contradiction (0-100)
calculer_score_contradiction(Information, 0) :-
    contradiction(Information, _), !.  % Si l'information contredit une information fiable
calculer_score_contradiction(Information, 0) :-
    contradiction(_, Information), !.  % Si l'information est contredite par une information fiable
calculer_score_contradiction(_, 100).  % Pas de contradiction connue

% Détermination du niveau de fiabilité basé sur le score
determiner_fiabilite(Score, "Crédible") :- Score >= 61, !.
determiner_fiabilite(Score, "Douteuse") :- Score >= 31, !.
determiner_fiabilite(_, "Suspecte").

% Construction de l'explication détaillée
construire_explication(Information, ScoreSource, ScoreAuteur, ScoreCitations,
                       ScoreLangage, ScoreContradiction, ScoreTotal, Explication) :-
    information(Information, Description),
    source_fournit(Source, Auteur, Information),
    source(Source, FiabiliteSource),
    auteur(Auteur, ReputationAuteur),

    % Construction du message d'explication
    atomic_list_concat([
        "L'information '", Description, "' a un score de fiabilité de ", ScoreTotal, "/100.\n",
        "- Source: ", Source, " (", FiabiliteSource, ") - Score: ", ScoreSource, "/100\n",
        "- Auteur: ", Auteur, " (", ReputationAuteur, ") - Score: ", ScoreAuteur, "/100\n",
        "- Citations: Score ", ScoreCitations, "/100\n",
        "- Style de langage: Score ", ScoreLangage, "/100\n",
        "- Contradiction: Score ", ScoreContradiction, "/100"
    ], Explication).

% Requête principale pour évaluer une information
evaluer(Information) :-
    evaluer_info(Information, Fiabilite, Explication),
    format("Évaluation de l'information: ~w~n", [Information]),
    format("Fiabilité: ~w~n", [Fiabilite]),
    format("Explication:~n~w~n", [Explication]).

% Exemples d'utilisation:
% ?- evaluer("politique_eau_maroc").
% ?- evaluer("complot_ressources_maroc").
