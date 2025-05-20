:- dynamic source/2.
:- dynamic auteur/2.
:- dynamic source_fournit/3.
:- dynamic a_des_references/1.
:- dynamic utilise_style/2.
:- dynamic a_citations/2.
:- dynamic langage_emotionnel/2.
:- dynamic information/2.

% Base de faits pour le syst�me expert d'�valuation de fiabilit� des informations
% ENSA de F�s - Projet Syst�mes Experts

% ====== SOURCES D'INFORMATION MAROCAINES ET INTERNATIONALES ======
% source(Nom, Fiabilit�).
% Fiabilit�: fiable, moyenne, non_fiable
source("MAP", fiable).
source("2M.ma", fiable).
source("Hespress", moyenne).
source("Le Matin", fiable).
source("TelQuel", fiable).
source("L'economiste", fiable).
source("Bulletin Officiel", fiable).
source("CNDH", fiable).
source("HCP", fiable).
source("M�dias24", moyenne).
source("Blog Marocain", non_fiable).
source("Forums Marocains", non_fiable).
source("Reseaux sociaux", non_fiable).
source("Chaine Telegram", non_fiable).
source("Yabiladi", moyenne).

% ====== AUTEURS ======
% auteur(Nom, R�putation).
% R�putation: reconnu, anonyme, inconnu
auteur("ahmed_sefrioul", reconnu).
auteur("fatima_alaoui", reconnu).
auteur("rachid_benzakour", reconnu).
auteur("nadia_benali", reconnu).
auteur("karim_idrissi", reconnu).
auteur("maroc_info", anonyme).
auteur("verite_maroc", anonyme).
auteur("utilisateur_forum", anonyme).
auteur("journaliste_freelance", inconnu).

% ====== STYLE DE LANGAGE ======
% utilise_style(Auteur, Style).
% Style: neutre, emotionnel, technique, familier, darija
utilise_style("ahmed_sefrioul", neutre).
utilise_style("fatima_alaoui", technique).
utilise_style("rachid_benzakour", technique).
utilise_style("nadia_benali", neutre).
utilise_style("karim_idrissi", neutre).
utilise_style("maroc_info", emotionnel).
utilise_style("verite_maroc", emotionnel).
utilise_style("utilisateur_forum", familier).
utilise_style("journaliste_freelance", neutre).

% ====== REFERENCES ======
% a_des_references(Auteur).
a_des_references("ahmed_sefrioul").
a_des_references("fatima_alaoui").
a_des_references("rachid_benzakour").
a_des_references("nadia_benali").
a_des_references("karim_idrissi").

% ====== PREDICATIONS COMPLEXES ======
% source_fournit(Source, Auteur, Information).
source_fournit("MAP", "ahmed_sefrioul", "politique_eau_maroc").
source_fournit("2M.ma", "nadia_benali", "transition_energetique_maroc").
source_fournit("L'economiste", "fatima_alaoui", "investissements_casablanca").
source_fournit("Blog Marocain", "verite_maroc", "complot_ressources_maroc").
source_fournit("Forums Marocains", "utilisateur_forum", "critiques_plan_vert").
source_fournit("HCP", "rachid_benzakour", "statistiques_education_2023").
source_fournit("Hespress", "journaliste_freelance", "projet_tgv_maroc").
source_fournit("CNDH", "karim_idrissi", "rapport_droits_humains").
source_fournit("Reseaux sociaux", "maroc_info", "rumeur_economie_maroc").
source_fournit("Bulletin Officiel", "rachid_benzakour", "rapport_officiel_ressources").
source_fournit("HCP", "fatima_alaoui", "statistiques_officielles_economie").
source_fournit("M�dias24", "nadia_benali", "resultats_plan_vert_officiel").

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

% ====== INFORMATIONS A EVALUER (EXEMPLES) ======
information("politique_eau_maroc", "Nouveau plan national de l'eau au Maroc 2023-2030").
information("transition_energetique_maroc", "Projets d'energie solaire dans le sud marocain").
information("investissements_casablanca", "Bilan des investissements etrangers  Casablanca Finance City").
information("statistiques_education_2023", "Taux de reussite au baccalaureat marocain 2023").
information("projet_tgv_maroc", "Extension prevue de la ligne TGV vers Marrakech").
information("rapport_droits_humains", "Situation des droits humains au Maroc en 2023").
information("complot_ressources_maroc", "Th�orie sur l'exploitation des ressources marocaines par des entit�s �trang�res").
information("rumeur_economie_maroc", "Effondrement imminent de l'�conomie marocaine").
information("critiques_plan_vert", "Echec pr�tendu du Plan Maroc Vert").
information("rapport_officiel_ressources", "Etat des ressources naturelles du Maroc selon le minist�re").
information("statistiques_officielles_economie", "Rapport �conomique du HCP pour le premier semestre 2023").
information("resultats_plan_vert_officiel", "Bilan officiel du Plan Maroc Vert 2008-2020").

% ====== R�GLES D'INF�RENCE ======

evaluer_info(Information, Fiabilite, ScoreSource, ScoreAuteur, ScoreCitations, ScoreLangage, ScoreTotal, Explication) :-
    calculer_score_source(Information, ScoreSource),
    calculer_score_auteur(Information, ScoreAuteur),
    calculer_score_citations(Information, ScoreCitations),
    calculer_score_langage(Information, ScoreLangage),

    ScoreTotal is (ScoreSource * 0.45) + (ScoreAuteur * 0.25) +
                 (ScoreCitations * 0.2) + (ScoreLangage * 0.1),

    determiner_fiabilite(ScoreTotal, Fiabilite),

    construire_explication(Information, ScoreSource, ScoreAuteur, ScoreCitations,
                          ScoreLangage, ScoreTotal, Explication).

calculer_score_source(Information, Score) :-
    source_fournit(Source, _, Information),
    source(Source, Fiabilite),
    score_fiabilite_source(Fiabilite, Score), !.
calculer_score_source(_, 0).

score_fiabilite_source(fiable, 100).
score_fiabilite_source(moyenne, 50).
score_fiabilite_source(non_fiable, 10).

calculer_score_auteur(Information, Score) :-
    source_fournit(_, Auteur, Information),
    evaluer_auteur(Auteur, Score), !.
calculer_score_auteur(_, 0).

evaluer_auteur(Auteur, Score) :-
    auteur(Auteur, Reputation),
    score_reputation(Reputation, ScoreReputation),
    (a_des_references(Auteur) -> BonusReferences = 20 ; BonusReferences = 0),
    utilise_style(Auteur, Style),
    score_style(Style, ScoreStyle),
    Score is ScoreReputation + BonusReferences + ScoreStyle.

score_reputation(reconnu, 60).
score_reputation(inconnu, 30).
score_reputation(anonyme, 0).

score_style(neutre, 20).
score_style(technique, 20).
score_style(familier, 10).
score_style(emotionnel, 0).
score_style(darija, 10).

calculer_score_citations(Information, Score) :-
    a_citations(Information, NombreCitations),
    (NombreCitations > 10 -> Score = 100 ;
     NombreCitations > 5 -> Score = 75 ;
     NombreCitations > 0 -> Score = 50 ;
     Score = 0).

calculer_score_langage(Information, Score) :-
    langage_emotionnel(Information, Niveau),
    Score is 100 - (Niveau * 10).

determiner_fiabilite(Score, "Crédible") :- Score >= 61, !.
determiner_fiabilite(Score, "Douteuse") :- Score >= 31, !.
determiner_fiabilite(_, "Suspecte").

construire_explication(Information, ScoreSource, ScoreAuteur, ScoreCitations,
                      ScoreLangage, ScoreTotal, Explication) :-
    information(Information, Description),
    source_fournit(Source, Auteur, Information),
    source(Source, FiabiliteSource),
    auteur(Auteur, ReputationAuteur),
    atomic_list_concat([
        "L'information '", Description, "' a un score de fiabilit� de ", ScoreTotal, "/100.\n",
        "- Source: ", Source, " (", FiabiliteSource, ") - Score: ", ScoreSource, "/100\n",
        "- Auteur: ", Auteur, " (", ReputationAuteur, ") - Score: ", ScoreAuteur, "/100\n",
        "- Citations: Score ", ScoreCitations, "/100\n",
        "- Style de langage: Score ", ScoreLangage, "/100"
    ], Explication).

% Requ�te principale pour �valuer une information
evaluer(Information) :-
    evaluer_info(Information, Fiabilite, _, _, _, _, _, Explication),
    format("�valuation de l'information: ~w~n", [Information]),
    format("Fiabilit�: ~w~n", [Fiabilite]),
    format("Explication:~n~w~n", [Explication]).

% pr�dicat pour ajouter une source_fournit dynamique et autres faits associ�s
ajouter_nouvelle_info(Source, Fiabilite, Auteur, Reputation, References, Style, Info, Citations, Emotion) :-
    % Suppression des anciennes donn�es si elles existent
    (retract(source(Source, _)) ; true),
    assertz(source(Source, Fiabilite)),

    (retract(auteur(Auteur, _)) ; true),
    assertz(auteur(Auteur, Reputation)),

    % Gestion des r�f�rences
    (References == true ->
        (a_des_references(Auteur) -> true ; assertz(a_des_references(Auteur)))
        ; (retract(a_des_references(Auteur)) ; true)
    ),

    % Style d'�criture
    (retract(utilise_style(Auteur, _)) ; true),
    assertz(utilise_style(Auteur, Style)),

    % Relation source-auteur-info
    (retract(source_fournit(Source, Auteur, Info)) ; true),
    assertz(source_fournit(Source, Auteur, Info)),

    % Nombre de citations
    (retract(a_citations(Info, _)) ; true),
    assertz(a_citations(Info, Citations)),

    % Niveau de langage �motionnel
    (retract(langage_emotionnel(Info, _)) ; true),
    assertz(langage_emotionnel(Info, Emotion)),

    % Information (description par d�faut si non sp�cifi�e)
    (retract(information(Info, _)) ; true),
    assertz(information(Info, "Information ajout�e dynamiquement")).

% Variante qui permet de sp�cifier la description
ajouter_nouvelle_info(Source, Fiabilite, Auteur, Reputation, References, Style, Info, Citations, Emotion, Description) :-
    % Appeler la version de base
    ajouter_nouvelle_info(Source, Fiabilite, Auteur, Reputation, References, Style, Info, Citations, Emotion),
    % Puis mettre � jour la description
    (retract(information(Info, _)) ; true),
    assertz(information(Info, Description)).





% Faits ajoutés dynamiquement le 2025-05-20
source("SNRT", fiable).
auteur("mohammed_benani", reconnu).
source_fournit("SNRT", "mohammed_benani", "plan_numerique_maroc").
a_des_references("mohammed_benani").
utilise_style("mohammed_benani", neutre).
a_citations("plan_numerique_maroc", 15).
langage_emotionnel("plan_numerique_maroc", 2).
date_publication("plan_numerique_maroc", "2025-05-20").
information("plan_numerique_maroc", "Lancement du Plan Maroc Numérique 2025 avec des investissements de 5 milliards de dirhams").