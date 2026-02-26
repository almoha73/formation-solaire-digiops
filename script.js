document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add active class to clicked item
            item.classList.add('active');

            // Get target section ID
            const targetId = item.getAttribute('data-target');

            // Hide all sections with a fade out effect
            sections.forEach(section => {
                section.style.display = 'none';
                section.classList.remove('active');
            });

            // Show target section with a fade in effect
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
                // Small delay to ensure the display:block takes effect before adding the animation class
                setTimeout(() => {
                    targetSection.classList.add('active');
                }, 10);
            }

            // Smooth scroll to top of main content or window (responsive)
            if (window.innerWidth <= 768) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                document.querySelector('.main-content').scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }

            // Sur mobile, fermer le menu après la sélection
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            if (sidebar && overlay && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });

    // Gestion du menu mobile (Hamburger & Overlay)
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (menuToggle && sidebar && overlay) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Ajustement dynamique des tooltips pour éviter de déborder de l'écran
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', () => {
            const tooltipText = tooltip.querySelector('.tooltiptext');
            if (tooltipText) {
                // Reset de la position
                tooltipText.style.left = '50%';
                tooltipText.style.right = 'auto';
                tooltipText.style.transform = 'translateX(-50%)';

                // On attend la frame suivante pour que le navigateur calcule les dimensions
                requestAnimationFrame(() => {
                    const rect = tooltipText.getBoundingClientRect();

                    // Si ça sort par la droite
                    if (rect.right > (window.innerWidth - 15)) {
                        tooltipText.style.left = 'auto';
                        tooltipText.style.right = '0';
                        tooltipText.style.transform = 'none';
                    }
                    // Si ça sort par la gauche
                    if (rect.left < 15) {
                        tooltipText.style.left = '0';
                        tooltipText.style.right = 'auto';
                        tooltipText.style.transform = 'none';
                    }
                });
            }
        });
    });

    // Simulateur de Gains SolarBoost
    const batterySlider = document.getElementById('battery-size');
    const batteryDisplay = document.getElementById('battery-size-display');
    const simDaily = document.getElementById('sim-daily');
    const simAnnual = document.getElementById('sim-annual');
    const simTotal = document.getElementById('sim-total');

    if (batterySlider) {
        batterySlider.addEventListener('input', (e) => {
            const size = parseFloat(e.target.value);
            batteryDisplay.textContent = size;

            // Ratio: On verse 0,10€ par jour par "kWh" de batterie (ex: 10 kWh = 1€/jour)
            const daily = size * 0.10;
            const annual = daily * 365;
            const total = annual * 3;

            // Format correct en euros (XX,XX € ou XXX €)
            simDaily.textContent = daily.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
            simAnnual.textContent = Math.round(annual).toLocaleString('fr-FR') + ' €';
            simTotal.textContent = Math.round(total).toLocaleString('fr-FR') + ' €';
        });
    }

    const quizData = [
        // MODULE 1 : BASES ET FONDAMENTAUX (1-10)
        {
            question: "Quelle est la principale différence entre kWc et kWh ?",
            options: [
                "kWc = consommation du client, kWh = puissance produite en crête",
                "Le kWc indique le prix, le kWh indique la taille des panneaux",
                "kWc = puissance théorique maximale du panneau, kWh = quantité d'énergie réellement produite"
            ],
            correct: 2,
            explication: "Le kWc indique la puissance du panneau dans des conditions standards (la taille de l'installation), le kWh est l'unité de l'énergie mesurable produite ou consommée."
        },
        {
            question: "L'abréviation CACSI signifie :",
            options: [
                "Contrat d'Achats et Contributions Solaires Internes",
                "Convention d'Autoconsommation Sans Injection",
                "Contrat d'Accès et d'Exploitation"
            ],
            correct: 1,
            explication: "La CACSI est la convention établie avec Enedis avec interdiction d'injecter du surplus sur le réseau."
        },
        {
            question: "Que signifie le sigle CAE dans le domaine du photovoltaïque ?",
            options: [
                "Contrat d'Autoconsommation Électrique",
                "Contrat d'Accès et d'Exploitation",
                "Certificat d'Achat d'Énergie"
            ],
            correct: 1,
            explication: "Le CAE (Contrat d'Accès et d'Exploitation) est signé avec Enedis pour permettre l'injection du surplus sur le réseau."
        },
        {
            question: "Combien y a-t-il de watts dans 3 kWc ?",
            options: [
                "3 000 Wc",
                "300 Wc",
                "30 000 Wc"
            ],
            correct: 0,
            explication: "Un kilowatt-crête (kWc) équivaut à 1 000 watts-crête (Wc)."
        },
        {
            question: "Qu'est-ce que l'albédo dans le contexte solaire ?",
            options: [
                "La perte de puissance due à la chaleur",
                "La capacité d'une surface à réfléchir la lumière",
                "L'inclinaison optimale du toit"
            ],
            correct: 1,
            explication: "L'albédo est le pouvoir réfléchissant d'une surface. Un taux élevé (comme sur la neige) augmente la lumière réfléchie, bénéfique pour les panneaux bifaciaux."
        },
        {
            question: "Qu'est-ce que l'autoconsommation individuelle ?",
            options: [
                "Consommer la production d'un parc solaire lointain",
                "Consommer l'énergie produite par sa propre installation directement sur place",
                "Vendre la totalité de son énergie à un fournisseur"
            ],
            correct: 1,
            explication: "L'autoconsommation individuelle consiste à consommer tout ou partie de l'électricité produite par sa propre centrale solaire."
        },
        {
            question: "Quelle est l'inclinaison idéale (en France) pour une production annuelle maximale ?",
            options: [
                "Environ 30 à 35 degrés",
                "Environ 60 degrés",
                "Totalement à plat (0 degré)"
            ],
            correct: 0,
            explication: "En France, une inclinaison d'environ 30° orientée plein Sud offre le meilleur rendement annuel."
        },
        {
            question: "Pourquoi l'orientation Sud est-elle considérée comme la meilleure ?",
            options: [
                "Parce qu'elle capte le soleil tout au long de la journée",
                "Parce qu'elle évite le vent du Nord",
                "Pour respecter les normes Enedis"
            ],
            correct: 0,
            explication: "Le Sud permet d'avoir une durée d'ensoleillement et une intensité maximale sur la journée dans l'hémisphère nord."
        },
        {
            question: "En général, 1 kWc installé en France produit environ :",
            options: [
                "900 à 1400 kWh/an selon la région",
                "5000 kWh/an partout",
                "100 à 200 kWh/an"
            ],
            correct: 0,
            explication: "La production dépend de l'ensoleillement (irradiation), plus fort dans le sud (1400) que dans le nord (900)."
        },
        {
            question: "Quel rôle joue la température sur un panneau photovoltaïque ?",
            options: [
                "Plus il fait chaud, plus il produit",
                "La chaleur diminue son rendement",
                "Aucun impact, seule la lumière compte"
            ],
            correct: 1,
            explication: "Au-delà de 25°C de température de cellule, le rendement du panneau baisse."
        },

        // MODULE 2 : MATÉRIEL ET TECHNOLOGIE (11-20)
        {
            question: "Quel composant transforme le courant continu (DC) en courant alternatif (AC) ?",
            options: [
                "Le compteur Linky",
                "L'onduleur ou micro-onduleur",
                "Le coffret de protection DC"
            ],
            correct: 1,
            explication: "L'onduleur permet de convertir le courant continu produit par les panneaux en courant alternatif utilisable dans la maison."
        },
        {
            question: "Quel composant pose-t-on derrière chaque panneau pour optimiser individuellement leur production ?",
            options: [
                "Une diode bypass",
                "Un EMS intelligent",
                "Un micro-onduleur (ex: Enphase)"
            ],
            correct: 2,
            explication: "Le micro-onduleur gère chaque panneau de manière indépendante, limitant l'impact de l'ombre locale."
        },
        {
            question: "Parmi les technologies de cellules, laquelle offre les meilleurs rendements aujourd'hui en résidentiel ?",
            options: [
                "Le silicium amorphe",
                "Le silicium monocristallin (Type N ou P)",
                "Le silicium polycristallin"
            ],
            correct: 1,
            explication: "Le silicium monocristallin (surtout de type N ou TOPCon) domine le marché pour son haut rendement."
        },
        {
            question: "Une batterie LFP (Lithium Fer Phosphate) présente-t-elle un risque d'emballement thermique ?",
            options: [
                "Oui, car le Lithium est très réactif",
                "Non, sa chimie la rend ultra sécurisée contre le feu",
                "Seulement si elle dépasse 15 kWh"
            ],
            correct: 1,
            explication: "La technologie LFP (LiFePO4) est l'une des plus stables et prévient l'emballement thermique."
        },
        {
            question: "À quoi sert le coffret de protection AC ?",
            options: [
                "À protéger l'installation côté alternatif (disjoncteur, parafoudre)",
                "À empêcher les coupures d'Internet",
                "À mesurer la production totale"
            ],
            correct: 0,
            explication: "Le coffret AC protège l'onduleur et la maison côté courant alternatif. Il inclut souvent un parafoudre."
        },
        {
            question: "Que fait le coffret DC ?",
            options: [
                "Il protège la partie câble entre le panneau et l'onduleur",
                "Il régule la tension de la batterie",
                "Il communique avec Enedis"
            ],
            correct: 0,
            explication: "Le coffret DC est obligatoire avec un onduleur central pour protéger des surtensions venant des panneaux."
        },
        {
            question: "Si l'ombre couvre un panneau d'une chaîne sur un onduleur central classique (sans optimiseur) :",
            options: [
                "Cela n'affecte que le panneau ombragé",
                "Toute la chaîne (le string) verra sa production chuter",
                "L'onduleur s'éteint par sécurité"
            ],
            correct: 1,
            explication: "Dans un montage en série classique, le panneau le plus faible bride la production de tous les autres."
        },
        {
            question: "La durée de vie moyenne garantie et de production d'un panneau moderne est d'environ :",
            options: [
                "10 ans",
                "15 ans",
                "25 à 30 ans"
            ],
            correct: 2,
            explication: "La plupart des bons panneaux offrent une garantie de rendement supérieur à 80% ou 85% au bout de 25 à 30 ans."
        },
        {
            question: "Comment se mesure la capacité d'une batterie résidentielle ?",
            options: [
                "En kWc",
                "En kWh",
                "En Ampères (A)"
            ],
            correct: 1,
            explication: "La capacité de stockage d'énergie se mesure en kilowattheures (kWh)."
        },
        {
            question: "En moyenne, un panneau de silicium est recyclable à quelle hauteur en France ?",
            options: [
                "Seulement 25%",
                "Environ 95% via l'organisme Soren",
                "100%"
            ],
            correct: 1,
            explication: "Soren organise la collecte et le recyclage des panneaux en France, permettant de récupérer environ 95% des matériaux (verre, aluminium, argent, silicium)."
        },

        // MODULE 3 : L'OFFRE OCTOPUS / SOLARBOOST (21-30)
        {
            question: "A quel montant s'élève le tarif d'achat de la batterie virtuelle / offre SolarBoost (généralement sur 3 ans) ?",
            options: [
                "0,13 € / kWh ",
                "0,04 € / kWh ",
                "0,20 € / kWh "
            ],
            correct: 1,
            explication: "Le rachat avec SolarBoost est d'environ 4 c€ / kWh (aligné avec la prime mais souvent avec des boosters selon l'offre contractuelle)."
        },
        {
            question: "Quelle promesse commerciale forte est portée par l'offre SolarBoost ?",
            options: [
                "L'installation d'une pompe à chaleur",
                "L'achat du surplus à 1€ le kWh la 1ère année",
                "Un coup de pouce ou des factures annulées (offre boost) la première année"
            ],
            correct: 2,
            explication: "SolarBoost est célèbre pour rémunérer l'utilisation des batteries en soutien au réseau, permettant un fort coup de pouce financier."
        },
        {
            question: "Quelle taille de batterie doit-on installer obligatoirement pour un système de 6 kWc avec SolarBoost ?",
            options: [
                "Une batterie d'au moins 6 kWh",
                "Une petite batterie de 2 kWh",
                "Pas de batterie nécessaire"
            ],
            correct: 0,
            explication: "Pour que le modèle économique de pilotage réseau (VPP) soit viable, il faut en général que la batterie soit au moins de la même taille (en kWh) que la puissance (en kWc)."
        },
        {
            question: "Qu'est-ce que l'EMS (Energy Management System) d'Octopus ?",
            options: [
                "Un système qui coupe le compteur en cas d'impayé",
                "Un logiciel intelligent qui optimise la batterie et le solaire selon les prix et besoins du marché",
                "L'application pour payer ses factures"
            ],
            correct: 1,
            explication: "L'EMS d'Octopus, via la technologie Kraken, permet de piloter la batterie pour la charger aux heures creuses ou avec le soleil, et la décharger intelligemment."
        },
        {
            question: "Avec SolarBoost, que fait Octopus de la batterie du client pendant l'hiver ?",
            options: [
                "Elle est laissée vide pour la préserver",
                "Octopus la charge sur le réseau quand l'énergie est peu chère, pour l'utiliser pendant les pics",
                "Elle est débranchée physiquement"
            ],
            correct: 1,
            explication: "Grâce à l'EMS, la batterie est arbitrée sur le réseau pendant l'hiver, car le solaire y est faible."
        },
        {
            question: "L'offre classique d'EDF OA (Guichet OA) pour la vente de surplus engage pour :",
            options: [
                "10 ans",
                "20 ans",
                "30 ans"
            ],
            correct: 1,
            explication: "Le contrat d'Obligation d'Achat (EDF OA) est signé avec une durée réglementaire de 20 ans."
        },
        {
            question: "Quelle est la principale différence entre une offre Batterie Virtuelle pure et SolarBoost ?",
            options: [
                "SolarBoost implique une vraie batterie physique pilotée chez le client",
                "La batterie virtuelle est toujours gratuite",
                "SolarBoost ne marche qu'en été"
            ],
            correct: 0,
            explication: "SolarBoost utilise une batterie physique (LFP) installée chez le client et pilotée par l'algorithme."
        },
        {
            question: "Sous quelles conditions de toiture l'offre Octopus est-elle standardisée ?",
            options: [
                "Toitures tuiles mécaniques, ardoises, max 2 étages (uniquement pentes standard)",
                "Toute toiture, même chaume et zinc",
                "Uniquement sur sol"
            ],
            correct: 0,
            explication: "Les toitures spécifiques comme le zinc, l'amiante ou les toits plats complexes demandent souvent des études sur mesure ou sont rejetées en standard."
        },
        {
            question: "Pourquoi conseiller une batterie en France malgré son coût initial ?",
            options: [
                "C'est obligatoire depuis 2022",
                "Cela permet de sécuriser son autonomie et de participer au pilotage réseau (VPP)",
                "Cela permet un passage direct en TVA 5.5%"
            ],
            correct: 1,
            explication: "La batterie favorise l'indépendance énergétique soir/nuit et, couplée au pilotage (SolarBoost), génère des revenus additionnels."
        },
        {
            question: "Que se passe-t-il avec l'offre SolarBoost si le réseau électrique général tombe en panne (Blackout) ?",
            options: [
                "L'installation s'éteint pour la sécurité des techniciens Enedis, sauf si la fonction 'Back-up' (EPS) est activée",
                "La batterie alimente automatiquement tout le quartier",
                "Les panneaux explosent"
            ],
            correct: 0,
            explication: "Par défaut, les onduleurs réseau s'éteignent à la coupure réseau (norme VDE). Une Backup box est requise pour créer un micro-réseau."
        },

        // MODULE 4 : RÉGLEMENTATION (31-40)
        {
            question: "Quelle autorisation d'urbanisme est obligatoire pour installer des panneaux sur un toit existant ?",
            options: [
                "Un Permis de Construire",
                "Une Déclaration Préalable de travaux (DP)",
                "Aucune, la loi énergie Climat l'exempte"
            ],
            correct: 1,
            explication: "Toute modification de l'aspect extérieur d'un bâtiment nécessite au moins une DP en mairie."
        },
        {
            question: "Que signifie obtenir l'accord des ABF ?",
            options: [
                "Architectes des Bâtiments de France (si en zone classée/protégée)",
                "Association des Bricoleurs Français",
                "Autorité des Batteries Fiables"
            ],
            correct: 0,
            explication: "Si la maison est en zone protégée (ex: près d'un monument historique), l'ABF doit donner un avis favorable sur la DP."
        },
        {
            question: "Quel organisme certifie la conformité électrique de l'installation ?",
            options: [
                "EDF",
                "Le CONSUEL",
                "Qualit'EnR"
            ],
            correct: 1,
            explication: "Le Comité National pour la Sécurité des Usagers de l'Electricité (CONSUEL) délivre l'attestation de conformité."
        },
        {
            question: "Peut-on injecter sur le réseau Enedis sans avoir mis son installation aux normes ?",
            options: [
                "Oui, si on a un compteur Linky",
                "Non, l'attestation Consuel visée est exigée par Enedis",
                "Uniquement pour les petites puissances"
            ],
            correct: 1,
            explication: "Enedis réclame systématiquement l'attestation Consuel pour finaliser le raccordement et la CAE."
        },
        {
            question: "Que garantit le label RGE (Reconnu Garant de l'Environnement) de l'installateur ?",
            options: [
                "Que l'installation est gratuite",
                "L'accès aux aides de l'État et aux tarifs d'achat subventionnés",
                "Que les panneaux sont fabriqués en France"
            ],
            correct: 1,
            explication: "Sans installateur RGE, impossible de bénéficier de la prime à l'autoconsommation ou d'EDF OA."
        },
        {
            question: "Combien de temps l'instruction d'une Déclaration Préalable en mairie sans ABF prend-elle légalement ?",
            options: [
                "15 jours",
                "1 mois",
                "3 mois"
            ],
            correct: 1,
            explication: "Le délai légal standard pour une DP est d'1 mois (2 mois en zone ABF)."
        },
        {
            question: "L’installation de panneaux solaires au sol de faible puissance (moins de 3 kWc, moins de 1m80) nécessite-t-elle une DP ?",
            options: [
                "Oui, systématiquement",
                "Non, c'est totalement dispensé (hors zone protégée)",
                "C'est la mairie qui choisit"
            ],
            correct: 1,
            explication: "Sous certaines conditions de hauteur et puissance, la pose au sol est dispensée de formalité. Sur toit, ce n'est jamais dispensé."
        },
        {
            question: "Quelle procédure lancer auprès d'Enedis pour mettre en service son installation ?",
            options: [
                "La PDR (Procédure de Raccordement)",
                "L'ARENH",
                "Le PDL (Point de Livraison)"
            ],
            correct: 0,
            explication: "Il faut effectuer une demande de raccordement via le portail Enedis pour créer une CRAE/CAE ou CACSI."
        },
        {
            question: "Qu'est-ce qu'un TURPE ?",
            options: [
                "Tarif d'Utilisation des Réseaux Publics d'Électricité",
                "Une marque de panneau solaire portugaise",
                "Taxe Universelle sur les Revenus de la Production Énergétique"
            ],
            correct: 0,
            explication: "Le TURPE est payé pour l'accès aux lignes et l'utilisation du réseau électrique d'Enedis."
        },
        {
            question: "Si j'installe moi-même mes panneaux solaires via un kit, ai-je droit à la prime à l'autoconsommation ?",
            options: [
                "Oui",
                "Non",
                "Seulement après un Consuel"
            ],
            correct: 1,
            explication: "Non, la pose doit impérativement être faite par un professionnel certifié QualiPV RGE pour être éligible."
        },

        // MODULE 5 : FISCALITÉ ET AIDES (41-50)
        {
            question: "Pour les impôts (TVA et Imposition), quel est le seuil de basculement réglementaire majeur ?",
            options: [
                "3 kWc (Au-delà: TVA 20% et revenus soumis à impôts)",
                "9 kWc",
                "100 kWc"
            ],
            correct: 0,
            explication: "L'installation ≤ 3 kWc bénéficie de la TVA réduite (10%) et d'une exonération d'impôt sur la revente du surplus."
        },
        {
            question: "Quelle est la TVA appliquée à une installation de 6 kWc ?",
            options: [
                "5.5 %",
                "10 %",
                "20 %"
            ],
            correct: 2,
            explication: "Au-dessus de 3 kWc, l'installation est soumise à la TVA normale de 20% (sauf cas spécifiques rares)."
        },
        {
            question: "À combien s'élève la prime à l'autoconsommation de l'État au 1er trimestre 2026 pour une installation jusqu'à 9 kWc ?",
            options: [
                "140 € / kWc",
                "80 € / kWc",
                "80 € pour toute l'installation"
            ],
            correct: 1,
            explication: "Selon le barème CRE du 1er trimestre 2026, la prime est de 80 €/kWc pour les installations ≤ 9 kWc."
        },
        {
            question: "Comment est versée la prime à l'autoconsommation aujourd'hui ?",
            options: [
                "Sur 5 ans à chaque anniversaire de connexion (pour toutes les puissances)",
                "En une fois si puissance ≤ 9 kWc, sinon 80% la 1ère année puis 5%/an sur 4 ans",
                "Déduite du devis de l'artisan immédiatement"
            ],
            correct: 1,
            explication: "Le versement se fait en 1 fois pour les installations ≤ 9 kWc, et en plusieurs fois (80% puis 4x5%) pour les plus grandes."
        },
        {
            question: "Si un client vend la TOTALITÉ de sa production (Vente Totale), touche-t-il la prime à l'autoconsommation ?",
            options: [
                "Oui, car il produit du vert",
                "Non, la prime n'est que pour l'autoconsommation AVEC vente en surplus",
                "Oui, mais elle est divisée par deux"
            ],
            correct: 1,
            explication: "En vente totale, il n'y a pas d'autoconsommation, donc pas de prime dédiée à cela. Le tarif d'achat est souvent différent."
        },
        {
            question: "Les revenus de la vente de surplus (pour une installation ≤ 3 kWc) sont-ils à déclarer sur la fiche d'impôt ?",
            options: [
                "Oui, ils sont taxés à 30%",
                "Oui, car ils constituent un bénéfice agricole",
                "Non, ils sont totalement exonérés d'impôts sur le revenu"
            ],
            correct: 2,
            explication: "Les installations jusqu'à 3 kWc maximum sont exonérées d'impôt sur les revenus tirés de la revente d'électricité."
        },
        {
            question: "Si l'installation fait 6 kWc, comment sont taxés les revenus de la revente ?",
            options: [
                "Exonérés à 100%",
                "Régime Micro-BIC avec un abattement de 71% en général",
                "Taxés comme un salaire net"
            ],
            correct: 1,
            explication: "Au-delà de 3 kWc, on déclare en Micro-BIC. L'abattement forfaitaire est de 71%, donc l'imposition reste faible (sur les 29% restants)."
        },
        {
            question: "Quel rôle joue l'assureur du client lors d'une installation solaire ?",
            options: [
                "Il finance les panneaux",
                "Le client doit déclarer l'installation à son assurance Multirisque Habitation (MRH)",
                "L'assurance annule ses garanties car c'est dangereux"
            ],
            correct: 1,
            explication: "Une extension de la MRH (souvent gratuite ou minime) est exigée, notamment en Responsabilité Civile envers le réseau Enedis."
        },
        {
            question: "Quelle est la garantie de parfait achèvement en France dans le BTP (et le photovoltaïque) ?",
            options: [
                "1 an après la livraison des travaux",
                "2 ans",
                "10 ans"
            ],
            correct: 0,
            explication: "La garantie de parfait achèvement dure 1 an. La biennale 2 ans. La décennale sur l'étanchéité dure 10 ans."
        },
        {
            question: "Qu'est-ce que l'éco-PTZ (Prêt à Taux Zéro) pour le solaire ?",
            options: [
                "Un prêt pour financer à taux zéro, mais rarement applicable en simple photovoltaïque (sauf couplage thermique)",
                "La banque donne de l'argent gratuitement",
                "Octopus prête à 0%"
            ],
            correct: 0,
            explication: "Le simple PV photovoltaïque pur ne donne pas toujours accès à MaPrimeRénov ni à l'éco-PTZ, réservés plutôt à la transition thermique et aux capteurs solaires thermiques ou hybrides."
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let quizActive = true;

    const navQuizItem = document.querySelector('a[data-target="quizz"]');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const currentQNumDisplay = document.getElementById('current-question-num');
    const scoreDisplay = document.getElementById('quiz-score-display');
    const currentScore = document.getElementById('current-score');
    const nextBtnContainer = document.getElementById('next-btn-container');
    const nextBtn = document.getElementById('next-question-btn');
    const quizContent = document.getElementById('quiz-content');
    const quizResults = document.getElementById('quiz-results');
    const finalScore = document.getElementById('final-score');
    const finalMessage = document.getElementById('final-message');
    const restartBtn = document.getElementById('restart-quiz-btn');

    // Only init if quiz exists on page
    if (questionText && optionsContainer) {
        navQuizItem.addEventListener('click', startQuiz);
        nextBtn.addEventListener('click', loadNextQuestion);
        restartBtn.addEventListener('click', startQuiz);
    }

    function startQuiz() {
        currentQuestion = 0;
        score = 0;
        quizActive = true;
        quizContent.style.display = 'block';
        quizResults.style.display = 'none';
        scoreDisplay.style.display = 'block';
        currentScore.textContent = score;
        loadQuestionData();
    }

    function loadQuestionData() {
        nextBtnContainer.style.display = 'none';
        currentQNumDisplay.textContent = currentQuestion + 1;

        const qData = quizData[currentQuestion];
        questionText.textContent = qData.question;

        // Clear old options
        optionsContainer.innerHTML = '';

        // Create new buttons
        qData.options.forEach((optStr, index) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';

            // Adding A, B, C prefixes
            const prefixArr = ['A.', 'B.', 'C.', 'D.'];

            btn.innerHTML = `<span style="color: var(--primary); font-weight: 800; width: 25px; display:inline-block;">${prefixArr[index]}</span> <span>${optStr}</span>`;

            btn.addEventListener('click', () => checkAnswer(index, btn));
            optionsContainer.appendChild(btn);
        });
    }

    function checkAnswer(selectedIndex, btnElement) {
        if (!quizActive) return;
        quizActive = false;

        const qData = quizData[currentQuestion];
        const isCorrect = (selectedIndex === qData.correct);

        const allButtons = document.querySelectorAll('.quiz-option');

        allButtons.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === qData.correct) {
                btn.classList.add('correct');
            } else if (idx === selectedIndex && !isCorrect) {
                btn.classList.add('wrong');
            }
        });

        if (isCorrect) {
            score++;
            currentScore.textContent = score;
        }

        // Show Next button
        nextBtnContainer.style.display = 'block';

        // Change text on the last question
        if (currentQuestion === quizData.length - 1) {
            nextBtn.textContent = "Voir mes résultats ➔";
            nextBtn.style.background = "var(--primary)";
        } else {
            nextBtn.textContent = "Question Suivante ➔";
            nextBtn.style.background = "rgba(255,255,255,0.1)";
        }
    }

    function loadNextQuestion() {
        quizActive = true;
        currentQuestion++;

        if (currentQuestion < quizData.length) {
            loadQuestionData();
        } else {
            showResults();
        }
    }

    function showResults() {
        quizContent.style.display = 'none';
        nextBtnContainer.style.display = 'none';
        scoreDisplay.style.display = 'none';
        quizResults.style.display = 'block';

        finalScore.textContent = `${score} / ${quizData.length}`;

        if (score === 50) {
            finalMessage.textContent = "Un Sans-Faute ! Vous êtes le roi ou la reine de la ligne de vente ! 🐙👑";
            finalScore.style.color = "var(--success)";
        } else if (score >= 40) {
            finalMessage.textContent = "Excellent score ! Vous maîtrisez presque parfaitement les offres Octopus ! 👍";
            finalScore.style.color = "var(--primary)";
        } else if (score >= 25) {
            finalMessage.textContent = "Bon début. Prenez le temps de relire les sections fiscales et techniques ! 📚";
            finalScore.style.color = "#fbbf24";
        } else {
            finalMessage.textContent = "Aïe. Un rappel des connaissances s'impose avant les appels clients ! 🚨";
            finalScore.style.color = "#ef4444";
        }
    }
});
