/* M.A.I. Consulting — site assistant (EN · FR · AR)
   Retrieval-only. Every answer is written from copy on this website; no model is called,
   so it cannot invent. It refuses only when asked something about the practice that the
   site does not cover — and then offers to send the question to the team. General chat
   (greetings, "can you speak Arabic", "who are you") is answered naturally.
   To teach it: add an entry to KB with a/fr/ar answers and keywords in the three languages. */
(function(){
"use strict";

/* ─────────────────────────── knowledge base ─────────────────────────── */
var KB=[
 {id:"services",yes:true,rel:["price","who-for","how-runs"],
  k:{"services":4,"your service":4,"what services":6,"what do you offer":6,"what do you do":6,"what you do":5,"how can you help":5,"what do you sell":6,"offer":1},
  kf:{"services":4,"vos services":6,"que proposez":6,"que faites":6,"quels services":6,"qu offrez":5,"vous faites quoi":6},
  ka:{"خدمات":4,"خدماتكم":6,"ماذا تقدمون":6,"ما الذي تقدمونه":6,"ماذا تفعلون":6,"بماذا تساعدون":5,"ما هي خدماتكم":7},
  a:{en:"Five AI services, sold singly or combined: an AI Readiness Assessment, an AI Use Policy, Team AI Training with a one-page cheatsheet per department, Custom Agents & Tools configured on the platforms you already use, and Fluency Support to keep it alive. Every engagement is fixed-price and fixed-scope, agreed in writing before we start.",
     fr:"Cinq services autour de l’IA, à la carte ou combinés : une évaluation de maturité, une politique d’utilisation de l’IA, une formation par équipe avec une fiche pratique d’une page par département, des agents et outils configurés sur les plateformes que vous utilisez déjà, et un accompagnement continu. Chaque mission est à prix fixe et périmètre fixe, convenus par écrit avant de commencer.",
     ar:"نقدّم خمس خدمات في مجال الذكاء الاصطناعي، تُشترى منفردة أو مجتمعة: تقييم الجاهزية، وسياسة استخدام الذكاء الاصطناعي، وتدريب الفِرَق مع ورقة مرجعية من صفحة واحدة لكل قسم، ووكلاء وأدوات مخصّصة نهيّئها على المنصّات التي تستعملونها أصلاً، ثم دعم مستمرّ يحفظ ما بنيناه. وكلّ مهمّة بسعر ثابت ونطاق ثابت يُتَّفق عليهما كتابةً قبل البدء."},
  l:"services/",t:{en:"See the services",fr:"Voir les services",ar:"اطّلع على الخدمات"}},

 {id:"assessment-svc",yes:true,rel:["free-assessment","price","how-runs"],
  k:{"readiness assessment":5,"assessment":3,"where do we stand":4,"diagnos":3,"baseline":3,"ten dimensions":4,"score":2,"what does the assessment":7,"measure":4,"what is measured":6,"dimensions":4,"assessment measure":7,"maturity":4},
  kf:{"evaluation":4,"diagnostic":4,"maturite":4,"ou en sommes":5,"etat des lieux":5,"dix dimensions":4,"que mesure":6,"mesure":4,"dimensions":4,"evaluation de maturite":7},
  ka:{"تقييم":4,"تقييم الجاهزية":6,"أين نقف":5,"تشخيص":4,"عشرة أبعاد":4,"مستوى الجاهزية":5,"ماذا يقيس":7,"يقيس":4,"التقييم":3,"أبعاد":4,"تقييم الجاهزية":7,"الجاهزية":5},
  a:{en:"The AI Readiness Assessment is a scored report across ten dimensions — fluency, governance, data protection, workforce impact, internal politics, psychological safety, future-readiness — with a ranked 90-day priority list, mapped to ISO/IEC 42001, the NIST AI Risk Management Framework and EU AI Act Article 4. It takes two to three weeks.",
     fr:"L’évaluation de maturité produit un rapport noté sur dix dimensions — maîtrise, gouvernance, protection des données, impact sur les équipes, dynamiques internes, sécurité psychologique, préparation à l’avenir — avec une liste de priorités à 90 jours, alignée sur ISO/IEC 42001, le cadre NIST de gestion des risques de l’IA et l’article 4 du règlement européen sur l’IA. Comptez deux à trois semaines.",
     ar:"يُنتج تقييم الجاهزية تقريراً مُقيَّماً على عشرة أبعاد: الإتقان، والحوكمة، وحماية البيانات، وأثر الذكاء الاصطناعي في القوى العاملة، والديناميات الداخلية، والأمان النفسي، والاستعداد للمستقبل؛ ويُرفَق به ترتيبٌ للأولويات على تسعين يوماً، مع مواءمةٍ لمعيار ISO/IEC 42001 وإطار NIST لإدارة مخاطر الذكاء الاصطناعي والمادة 4 من قانون الاتحاد الأوروبي للذكاء الاصطناعي. ويستغرق أسبوعين إلى ثلاثة."},
  l:"services/",t:{en:"Read about the assessment",fr:"En savoir plus",ar:"اقرأ المزيد"}},

 {id:"policy-svc",yes:true,rel:["article4","price","evidence"],
  k:{"ai policy":6,"use policy":6,"ai use policy":7,"write a policy":6,"write our policy":6,"ai policies":6,"policies":4,"governance":3,"allowed to do":5,"permitted":4,"red lines":4,"acceptable use":5,"draft a policy":6,"ai policy":8,"ai use policy":8,"policy for ai":8,"ai governance policy":8},
  kf:{"politique":5,"charte":5,"regles":4,"gouvernance":3,"autorise":4,"permis":4,"lignes rouges":5,"utilisation acceptable":5,"politique d ia":8,"politique ia":8,"politique d intelligence":8,"politique sur l ia":8,"charte ia":8},
  ka:{"سياسة":5,"سياسة استخدام":7,"سياسات":5,"حوكمة":3,"مسموح":4,"المسموح":5,"خطوط حمراء":5,"قواعد":4,"صياغة سياسة":6,"سياسة الذكاء":8,"سياسة للذكاء":8,"سياسة ذكاء":8,"سياسة استخدام الذكاء":9},
  a:{en:"The AI Use Policy is a board-ready policy that starts with permissions, not prohibitions: permitted uses by role, the red lines, a data classification table, disclosure rules for funders and beneficiaries, an escalation path and an approved tool list — written so that required work stays compliant. Three to four weeks.",
     fr:"La politique d’utilisation de l’IA est un document prêt pour le conseil d’administration qui commence par ce qui est permis, pas par les interdits : usages autorisés par fonction, lignes rouges, classification des données, règles de transparence envers bailleurs et bénéficiaires, circuit d’escalade et liste d’outils approuvés. Rédigée pour que le travail nécessaire reste conforme. Trois à quatre semaines.",
     ar:"سياسة استخدام الذكاء الاصطناعي وثيقةٌ جاهزة لمجلس الإدارة تبدأ بما هو مسموح لا بما هو محظور: الاستخدامات المُجازة بحسب الدور، والخطوط الحمراء، وجدول تصنيف البيانات، وقواعد الإفصاح للمانحين والمستفيدين، ومسار التصعيد، وقائمة الأدوات المعتمدة. وقد صيغت بحيث يبقى العمل المطلوب متوافقاً مع القواعد. وتستغرق ثلاثة إلى أربعة أسابيع."},
  l:"services/",t:{en:"Read about the policy",fr:"En savoir plus",ar:"اقرأ المزيد"}},

 {id:"training-svc",yes:true,rel:["cheatsheet","price","who-for"],
  k:{"training":4,"train":3,"workshop":3,"session":2,"lab":2,"department":3,"team training":5,"course":2,"learn":1,"train staff":5,"train our":5,"each department":7,"per department":7,"separately":4,"department by department":7,"train each":6},
  kf:{"formation":5,"former":4,"atelier":4,"seance":3,"departement":3,"equipe":3,"apprendre":2,"cours":2,"chaque departement":7,"departement":4,"formez":6,"formez-vous":7,"separement":4,"par equipe":6,"par departement":7},
  ka:{"تدريب":5,"تدريبية":4,"ورشة":4,"جلسة":3,"قسم":3,"الأقسام":4,"الفرق":3,"تعليم":2,"دورة":3,"قسم":4,"كل قسم":7,"تدربون":6,"تدريب":5,"على حدة":4,"لكل قسم":7,"تدريباً":5,"تدريبا":5},
  a:{en:"Team AI Training is one organisation-wide session on the shared ground rules, then a 90-minute lab per department built on that department’s real tasks and real documents. Each lab ends with that team’s one-page cheatsheet. Two to six weeks depending on the number of departments.",
     fr:"La formation par équipe commence par une séance commune sur les règles partagées, puis un atelier de 90 minutes par département, construit sur ses tâches et ses documents réels. Chaque atelier se termine par la fiche pratique d’une page de l’équipe. Deux à six semaines selon le nombre de départements.",
     ar:"يبدأ تدريب الفِرَق بجلسة واحدة لكل المؤسسة حول القواعد المشتركة، ثم ورشة من تسعين دقيقة لكل قسم، مبنيّة على مهامّه ووثائقه الحقيقية، وتنتهي كلّ ورشة بورقةٍ مرجعية من صفحة واحدة خاصّة بذلك الفريق. ويستغرق التدريب أسبوعين إلى ستة بحسب عدد الأقسام."},
  l:"services/",t:{en:"Read about training",fr:"En savoir plus",ar:"اقرأ المزيد"}},

 {id:"support-svc",yes:true,rel:["price","how-runs"],
  k:{"support":3,"retainer":4,"fluency support":5,"office hours":4,"decay":3,"ongoing":3,"monthly":3,"after the engagement":6,"engagement ends":7,"when it ends":5,"after the project":5,"keep it alive":4},
  kf:{"accompagnement":5,"suivi":4,"apres la mission":6,"fin de la mission":6,"mensuel":3,"permanence":4,"dans la duree":4},
  ka:{"دعم":4,"دعم مستمر":6,"متابعة":4,"بعد المشروع":6,"بعد المهمة":6,"بعد انتهاء":6,"شهري":3,"استمرار":3},
  a:{en:"Fluency Support is monthly office hours for whoever is stuck, cheatsheet updates as the tools change, coaching for your internal champions, and a re-score at six months so you can show the board what moved. Three to twelve months, billed monthly.",
     fr:"L’accompagnement continu comprend une permanence mensuelle pour qui bloque, la mise à jour des fiches quand les outils changent, du coaching pour vos relais internes, et une nouvelle évaluation à six mois pour montrer au conseil ce qui a bougé. De trois à douze mois, facturé mensuellement.",
     ar:"يشمل الدعم المستمرّ ساعاتَ مكتبيةً شهرية لمن يحتاج المساعدة، وتحديثَ الأوراق المرجعية كلّما تغيّرت الأدوات، وتوجيهَ روّاد التغيير داخل مؤسستكم، ثم إعادةَ التقييم بعد ستة أشهر لتُظهروا لمجلس الإدارة ما تحقّق. ويمتدّ من ثلاثة أشهر إلى اثني عشر شهراً، ويُفوتَر شهرياً."},
  l:"services/",t:{en:"Read about support",fr:"En savoir plus",ar:"اقرأ المزيد"}},

 {id:"agents-tools",yes:true,rel:["price","not-for","training-svc"],
  k:{"agent":5,"agents":5,"custom agent":7,"tool":3,"tools":3,"custom tool":6,"automate":4,"automation":4,"repetitive":5,"configure":4,"build an assistant":6,"chatbot for us":5,"gpt for":4,"chatbot":5,"build the chatbot":8,"build a chatbot":8,"just advise":5,"do you build":5,"assistant":3,"actually build":5},
  kf:{"agent":5,"agents":5,"outil":4,"outils":4,"automatiser":5,"automatisation":5,"repetitif":5,"repetitives":5,"configurer":4,"assistant sur mesure":6,"chatbot":5,"agent conversationnel":6,"construisez":4,"configurez":5,"agent personnalise":8,"outil personnalise":7,"automatiser":5},
  ka:{"وكيل":5,"وكلاء":5,"أداة":4,"أدوات":4,"مخصص":4,"مخصصة":5,"أتمتة":5,"متكرر":5,"المتكررة":5,"تهيئة":4,"مساعد مخصص":6,"روبوت محادثة":7,"شات بوت":7,"تبنون":4,"وكيل مخصص":8,"أداة مخصصة":7,"أتمتة":5,"مهام متكررة":6},
  a:{en:"Yes — within limits. A custom agent is a configured assistant for a role or workflow on the platform you already use: a grant-report drafter with your templates and rules built in. A custom tool is smaller — a reusable, tested set-up for one repetitive task, such as a call-for-proposals summariser. Each is tested on your documents, cleared against your policy and handed over with a one-page guide. We configure on existing platforms; we do not build software or train models.",
     fr:"Oui, dans certaines limites. Un agent sur mesure est un assistant configuré pour un rôle ou un flux de travail sur la plateforme que vous utilisez déjà — par exemple un rédacteur de rapports aux bailleurs intégrant vos modèles et vos règles. Un outil est plus petit : une configuration réutilisable et testée pour une tâche répétitive, comme le résumé d’appels à propositions. Chacun est testé sur vos documents, vérifié au regard de votre politique et livré avec un guide d’une page. Nous configurons des plateformes existantes ; nous ne développons pas de logiciel et n’entraînons pas de modèles.",
     ar:"نعم، وضمن حدود واضحة. فالوكيل المخصّص مساعدٌ نهيّئه لدورٍ أو لمسار عملٍ على المنصّة التي تستعملونها أصلاً، كمحرّرٍ لتقارير المانحين مضمَّنةٍ فيه نماذجُكم وقواعدُكم. أمّا الأداة فأصغر: إعدادٌ قابلٌ لإعادة الاستعمال ومُجرَّبٌ لمهمّة متكرّرة واحدة، كتلخيص دعوات تقديم المقترحات. ونختبر كلاً منهما على وثائقكم، ونتحقّق من مطابقته لسياستكم، ثم نسلّمه مع دليلٍ من صفحة واحدة. نحن نهيّئ منصّاتٍ قائمة، ولا نطوّر برمجيات ولا ندرّب نماذج."},
  l:"services/",t:{en:"Read about agents and tools",fr:"En savoir plus",ar:"اقرأ المزيد"}},

 {id:"cheatsheet",yes:true,rel:["training-svc","4d"],
  k:{"cheatsheet":6,"cheat sheet":6,"one page":4,"deliverable":4,"actually receive":6,"we receive":5,"what do we get":6,"what do i get":6,"end up with":5,"sample":4,"take away":4,"deliverable":5,"deliverables":6,"what do we receive":7},
  kf:{"fiche":5,"fiche pratique":7,"une page":4,"livrable":5,"qu obtient":5,"recevons":5,"exemple":4,"aide-memoire":6,"livrable":6,"livrables":6,"qu obtient":6,"que recevons":6,"recevons-nous":6},
  ka:{"ورقة مرجعية":7,"ورقة":3,"صفحة واحدة":5,"ماذا نحصل":6,"ماذا نستلم":6,"المخرج":4,"نموذج":4,"مثال":3,"المخرجات":7,"مخرجات":7,"ما نحصل عليه":6,"ماذا نحصل":7,"ماذا نستلم":7,"ورقة مرجعية":8},
  a:{en:"Each department receives one page built from its own tasks: five things to hand to AI and three never to, three prompt patterns that work on their files, the four checks before anything leaves the building, and what has to be logged and disclosed. A full sample for a fundraising team is on the site.",
     fr:"Chaque département reçoit une page construite sur ses propres tâches : cinq choses à confier à l’IA et trois à ne jamais lui confier, trois formulations qui fonctionnent sur ses fichiers, les quatre vérifications avant que quoi que ce soit ne sorte, et ce qui doit être consigné et déclaré. Un exemple complet pour une équipe de collecte de fonds est sur le site.",
     ar:"يتسلّم كلّ قسم صفحةً واحدة مبنيّة على مهامّه: خمسةُ أمورٍ تُوكَل إلى الذكاء الاصطناعي وثلاثةٌ لا تُوكَل إليه أبداً، وثلاثةُ أنماط صياغة تعمل على ملفّاته، والفحوصُ الأربعة قبل أن يخرج أيّ شيء من المؤسسة، وما يجب تسجيله والإفصاح عنه. وستجدون على الموقع نموذجاً كاملاً لفريق جمع التبرّعات."},
  l:"cheatsheet/",t:{en:"Open the sample cheatsheet",fr:"Voir l’exemple",ar:"افتح النموذج"}},

 {id:"packages",yes:true,rel:["price","services"],
  k:{"package":5,"packages":5,"bundle":3,"foundation":4,"adoption":4,"institution":4,"which option":4,"difference between foundation":8,"difference between the packages":8},
  kf:{"forfait":5,"forfaits":5,"formule":5,"formules":5,"pack":4,"offre groupee":5,"forfait":6,"forfaits":6,"offres groupees":6,"difference entre":4,"formule":5,"formules":6},
  ka:{"حزمة":5,"حزم":5,"باقة":5,"باقات":5,"عرض متكامل":4,"الحزم":7,"حزم":6,"الفرق بين الحزم":8,"باقات":6,"الباقات":7,"حزمة":5,"الباقة":5},
  a:{en:"Three ready-made scopes. Foundation: up to 50 staff, about three weeks — short assessment, one organisation-wide session, one shared cheatsheet. Adoption: 50 to 500 staff, about eight weeks — full assessment, AI Use Policy, organisation-wide session, department labs and cheatsheets, re-score at 90 days. Institution: regulated, audited or multi-site — everything in Adoption plus a governance gap plan, an Article 4 evidence file, train-the-trainer and twelve months of support. Each opens in the estimator with its components preselected.",
     fr:"Trois périmètres prêts à l’emploi. Foundation : jusqu’à 50 personnes, environ trois semaines — évaluation courte, une séance commune, une fiche partagée. Adoption : de 50 à 500 personnes, environ huit semaines — évaluation complète, politique d’utilisation, séance commune, ateliers par département avec fiches, nouvelle évaluation à 90 jours. Institution : organisations réglementées, auditées ou multisites — tout Adoption, plus un plan d’écarts de gouvernance, un dossier de preuves article 4, la formation de formateurs et douze mois d’accompagnement. Chacun s’ouvre dans l’estimateur avec ses composantes présélectionnées.",
     ar:"ثلاثةُ نطاقات جاهزة. «الأساس»: حتى خمسين موظفاً، نحو ثلاثة أسابيع؛ تقييمٌ مختصر وجلسةٌ واحدة لكل المؤسسة وورقةٌ مرجعية مشتركة. «التبنّي»: من خمسين إلى خمسمئة موظف، نحو ثمانية أسابيع؛ تقييمٌ كامل وسياسةُ استخدام وجلسةٌ عامة وورشٌ للأقسام مع أوراقها المرجعية، ثم إعادةُ تقييم بعد تسعين يوماً. «المؤسّسي»: للجهات الخاضعة للتنظيم أو التدقيق أو متعدّدة المواقع؛ كلّ ما في «التبنّي» مع خطة فجوات الحوكمة وملفّ أدلّة المادة 4 وتدريب المدرّبين واثني عشر شهراً من الدعم. ويُفتح كلّ نطاق في حاسبة التقدير ومكوّناته محدّدة سلفاً."},
  l:"services/",t:{en:"Compare the scopes",fr:"Comparer les formules",ar:"قارن النطاقات"}},

 {id:"price",yes:false,rel:["terms","packages","contact"],
  k:{"price":5,"prices":5,"cost":5,"costs":5,"how much":6,"fee":4,"fees":4,"pricing":5,"chf":4,"expensive":6,"cheap":5,"budget":3,"afford":5,"rates":3,"estimate":5,"quote":5,"quotation":5},
  kf:{"prix":6,"tarif":6,"tarifs":6,"cout":5,"couts":5,"combien":6,"cher":5,"budget":3,"devis":6,"estimation":5,"honoraires":5},
  ka:{"سعر":6,"أسعار":6,"تكلفة":6,"كلفة":6,"كم يكلف":7,"كم تكلف":7,"بكم":6,"غالي":5,"ميزانية":4,"عرض سعر":6,"تقدير":5,"رسوم":5},
  a:{en:"Prices depend on your organisation type, size and the scope you choose, so we built an estimator: pick what you need and it shows an indicative range immediately — no call required. Nonprofit and international rates are lower than public and private rates. The final number is fixed in writing after a 30-minute call, and it excludes VAT and travel.",
     fr:"Le prix dépend du type d’organisation, de sa taille et du périmètre choisi ; nous avons donc mis en ligne un estimateur : sélectionnez ce dont vous avez besoin et une fourchette indicative s’affiche aussitôt, sans appel. Les tarifs associatifs et internationaux sont inférieurs aux tarifs publics et privés. Le montant définitif est fixé par écrit après un entretien de 30 minutes, hors TVA et déplacements.",
     ar:"يعتمد السعر على نوع مؤسستكم وحجمها والنطاق الذي تختارونه، ولذلك أتحنا حاسبةَ تقدير: اختاروا ما تحتاجونه فتظهر لكم فوراً فئةٌ سعرية تقريبية دون الحاجة إلى مكالمة. وأسعار المنظمات غير الحكومية والدولية أدنى من أسعار القطاعَين العام والخاص. أمّا الرقم النهائي فيُثبَّت كتابةً بعد مكالمة من ثلاثين دقيقة، ولا يشمل ضريبة القيمة المضافة ولا تكاليف السفر."},
  l:"estimate/",t:{en:"Open the estimator",fr:"Ouvrir l’estimateur",ar:"افتح حاسبة التقدير"}},

 {id:"terms",yes:true,rel:["price","how-runs"],
  k:{"payment":5,"payment terms":7,"how do we pay":6,"invoice":3,"deposit":4,"vat":6,"charge vat":7,"include vat":7,"plus vat":7,"scope change":5,"fixed price":5,"fixed scope":5,"contract terms":4,"instalment":4,"instalment":6,"instalments":6,"installments":6,"installment":6,"pay in":5,"pay":3,"how do we pay":6,"pay upfront":6,"up front":5},
  kf:{"paiement":5,"modalites":5,"facture":4,"acompte":5,"tva":6,"prix fixe":5,"perimetre":3,"contrat":3,"payer":5,"plusieurs fois":7,"echelonn":6,"comment payer":6,"paiement":6,"acompte":6},
  ka:{"الدفع":5,"شروط الدفع":7,"فاتورة":4,"دفعة":4,"ضريبة":5,"القيمة المضافة":6,"سعر ثابت":5,"عقد":3,"أقساط":4,"بالتقسيط":8,"تقسيط":7,"ندفع":5,"كيف ندفع":7,"الدفع":6,"دفعة مقدمة":6,"مقدما":4},
  a:{en:"Every engagement is fixed-price and fixed-scope, agreed in writing before we start. Payment is 40% on signature and 60% on delivery; support retainers are billed monthly in advance. Prices exclude VAT and travel. Scope changes of more than 20% are re-quoted rather than absorbed quietly.",
     fr:"Chaque mission est à prix fixe et périmètre fixe, convenus par écrit avant de commencer. Paiement de 40 % à la signature et 60 % à la livraison ; l’accompagnement est facturé mensuellement d’avance. Hors TVA et déplacements. Toute évolution de périmètre supérieure à 20 % fait l’objet d’un nouveau devis.",
     ar:"كلّ مهمّة بسعر ثابت ونطاق ثابت يُتَّفق عليهما كتابةً قبل البدء. وتُسدَّد أربعون في المئة عند التوقيع وستون في المئة عند التسليم، ويُفوتَر الدعم المستمرّ شهرياً ومقدّماً. والأسعار لا تشمل ضريبة القيمة المضافة ولا تكاليف السفر. وأيّ تغيير في النطاق يتجاوز عشرين في المئة يُعاد تسعيره بدل أن يُمتَصّ بصمت."},
  l:"estimate/",t:{en:"See the estimator",fr:"Voir l’estimateur",ar:"حاسبة التقدير"}},

 {id:"duration",yes:true,rel:["how-runs","packages"],
  k:{"how long":6,"duration":4,"weeks":3,"timeline":5,"how quickly":5,"how fast":5,"how soon":5,"start":2,"when can you start":8,"can you start":7,"how soon can":7,"start date":6,"available":3},
  kf:{"combien de temps":7,"duree":5,"delai":5,"semaines":3,"calendrier":4,"rapidement":4,"quand commencer":5,"commencer":6,"quand pouvez-vous commencer":8,"quand pouvez":6,"demarrer":5,"disponible":3},
  ka:{"كم يستغرق":7,"كم تستغرق":7,"تستغرق":6,"يستغرق":6,"المدة":5,"مدة":5,"أسابيع":3,"الجدول الزمني":5,"متى نبدأ":5,"بسرعة":3,"متى يمكنكم البدء":8,"البدء":5,"تبدأون":6,"تبدؤون":6,"متى":3,"نبدأ":4,"متى تبدأ":7},
  a:{en:"Most engagements run three to eight weeks: the assessment two to three, the policy three to four, training two to six depending on departments, agents and tools two to six. Institution-scale work is about twelve weeks followed by twelve months of support. The estimator shows the range for your scope.",
     fr:"La plupart des missions durent de trois à huit semaines : l’évaluation deux à trois, la politique trois à quatre, la formation deux à six selon le nombre de départements, les agents et outils deux à six. Un périmètre institutionnel prend environ douze semaines, suivies de douze mois d’accompagnement.",
     ar:"تستغرق معظم المهامّ ثلاثة إلى ثمانية أسابيع: التقييم أسبوعين إلى ثلاثة، والسياسة ثلاثة إلى أربعة، والتدريب أسبوعين إلى ستة بحسب عدد الأقسام، والوكلاء والأدوات أسبوعين إلى ستة. أمّا النطاق المؤسّسي فنحو اثني عشر أسبوعاً يليها اثنا عشر شهراً من الدعم."},
  l:"services/",t:{en:"See durations by service",fr:"Voir les durées",ar:"المدد بحسب الخدمة"}},

 {id:"who-for",yes:true,rel:["private","funders","contact"],
  k:{"who is this for":6,"for whom":4,"right for":4,"suitable":4,"do you work with":5,"work with":3,"small ngo":6,"small ngos":6,"ngo":3,"ngos":4,"nonprofit":4,"un agency":6,"un agencies":6,"international organisation":5,"international organization":5,"government":4,"public institution":5,"who are your clients":5,"help a":3,"is this for us":7,"for an organisation like":6,"like ours":5,"what would you recommend":4,"our organisation":3},
  kf:{"pour qui":6,"a qui":4,"travaillez-vous avec":5,"ong":5,"association":4,"agence des nations unies":6,"organisation internationale":6,"gouvernement":4,"administration":4,"secteur public":5,"petite ong":6,"est-ce pour nous":7,"pour nous":5,"petite ong":7,"comme la notre":5},
  ka:{"لمن":5,"لمن هذه":6,"هل تعملون مع":5,"تعملون مع":4,"منظمة غير حكومية":6,"منظمات غير حكومية":6,"جمعية":4,"وكالة أمم":6,"الأمم المتحدة":5,"منظمة دولية":6,"حكومة":4,"جهة حكومية":6,"القطاع العام":5,"مناسبة لنا":7,"مناسب لنا":7,"منظمة صغيرة":7,"منظمه صغيره":7,"مؤسسة صغيرة":7,"هل خدماتكم مناسبة":8,"لمنظمتنا":5},
  a:{en:"Mission-driven and international organisations of 20 to 500 staff — NGOs, foundations, UN agencies and public institutions — with no in-house AI function and with beneficiary, donor or personal data in their daily work. We talk first to the executive director or the data protection officer. Under 20 staff, a free course will usually serve you better and we will say so. Private-sector work is taken on referral only.",
     fr:"Des organisations à mission et internationales de 20 à 500 personnes — ONG, fondations, agences des Nations unies, institutions publiques — sans fonction IA interne et qui manipulent des données de bénéficiaires, de bailleurs ou des données personnelles. Nous parlons d’abord à la direction ou au délégué à la protection des données. En dessous de 20 personnes, un cours gratuit vous servira généralement mieux, et nous vous le dirons. Le secteur privé, sur recommandation uniquement.",
     ar:"نعمل مع المنظمات ذات الرسالة والمنظمات الدولية التي يعمل فيها من عشرين إلى خمسمئة موظف: المنظمات غير الحكومية والمؤسسات ووكالات الأمم المتحدة والجهات العامة، ممّا لا وحدةَ ذكاءٍ اصطناعي داخلية لديه، ويتعامل يومياً مع بيانات المستفيدين أو المانحين أو البيانات الشخصية. ونخاطب أولاً المدير التنفيذي أو مسؤول حماية البيانات. وإن كان عدد الموظفين دون العشرين فغالباً تخدمكم دورةٌ مجانية أفضل منّا، وسنقول لكم ذلك. أمّا القطاع الخاص فنعمل معه بالتوصية فقط."},
  l:"our-clients/",t:{en:"See who we work with",fr:"Voir nos interlocuteurs",ar:"مع من نعمل"}},

 {id:"private",yes:false,rel:["who-for","price"],
  k:{"private sector":9,"private company":9,"corporate":5,"enterprise":3,"commercial":4,"for-profit":5,"business":2,"company like ours":5},
  kf:{"secteur prive":9,"entreprise privee":9,"societe":3,"commercial":4},
  ka:{"القطاع الخاص":9,"شركة خاصة":9,"شركات":4,"تجاري":3},
  a:{en:"Private-sector work is taken on referral only. It is not what this practice is built around; the offer is designed for mission-driven and international organisations. Private-sector rates are higher, and the estimator shows them.",
     fr:"Le secteur privé, sur recommandation uniquement : ce n’est pas le cœur de ce cabinet, conçu pour les organisations à mission et internationales. Les tarifs du secteur privé sont plus élevés et l’estimateur les affiche.",
     ar:"نعمل مع القطاع الخاص بالتوصية فقط، فليس هو محورَ هذه الممارسة المصمَّمة للمنظمات ذات الرسالة والمنظمات الدولية. وأسعار القطاع الخاص أعلى، وتُظهرها حاسبةُ التقدير."},
  l:"our-clients/",t:{en:"See who we work with",fr:"Voir nos interlocuteurs",ar:"مع من نعمل"}},

 {id:"funders",yes:true,rel:["price","who-for"],
  k:{"funder":7,"funders":7,"work with funders":9,"work with foundations":8,"work with donors":8,"donor":4,"donors":4,"grantee":6,"grantees":6,"portfolio":6,"philanthrop":4,"development agency":4,"cohort":3},
  kf:{"bailleur":7,"bailleurs":7,"fondation":4,"donateur":4,"beneficiaires de subvention":6,"portefeuille":6,"philanthropie":4,"agence de developpement":5,"cohorte":3},
  ka:{"مانح":6,"مانحين":6,"الجهات المانحة":8,"مؤسسة مانحة":7,"المستفيدين من المنح":6,"محفظة":6,"الشركاء المنفذين":5,"وكالة تنمية":5},
  a:{en:"Yes — foundations, donors and development agencies can fund this across a portfolio. Portfolio Baseline runs the assessment across up to 15 grantees and gives you one portfolio report. Portfolio Programme, for up to 12 grantees, adds a shared policy each grantee adapts, cohort training, a cheatsheet per organisation and a re-score. A Grantee Drawdown Fund lets grantees draw down engagements over twelve months.",
     fr:"Oui : fondations, bailleurs et agences de développement peuvent financer ce travail à l’échelle d’un portefeuille. Le Portfolio Baseline mène l’évaluation sur jusqu’à 15 bénéficiaires et vous remet un rapport de portefeuille. Le Portfolio Programme, pour jusqu’à 12 bénéficiaires, ajoute une politique commune que chacun adapte, une formation en cohorte, une fiche par organisation et une nouvelle évaluation. Un fonds de tirage permet aux bénéficiaires de solliciter des missions sur douze mois.",
     ar:"نعم؛ فبوسع المؤسسات المانحة ووكالات التنمية تمويلُ هذا العمل على مستوى محفظةٍ كاملة. يُجري «التقييم الأساسي للمحفظة» التقييمَ لدى ما يصل إلى خمس عشرة جهة مستفيدة ويقدّم لكم تقريراً واحداً عن المحفظة. ويضيف «برنامج المحفظة»، لما يصل إلى اثنتي عشرة جهة، سياسةً مشتركة تكيّفها كلّ جهة، وتدريباً جماعياً، وورقةً مرجعية لكل منظمة، ثم إعادةَ تقييم. كما يتيح «صندوق السحب» للجهات المستفيدة طلبَ المهامّ على مدى اثني عشر شهراً."},
  l:"for-funders/",t:{en:"See portfolio programmes",fr:"Voir les programmes",ar:"برامج المحافظ"}},

 {id:"not-for",yes:false,rel:["agents-tools","services"],
  k:{"build ai":6,"build an ai":6,"ai system":6,"ai systems":6,"fine-tun":6,"fine tun":6,"deployment":5,"data pipeline":6,"implement ai":5,"integrate ai":5,"train a model":6,"custom model":6,"llm":4,"develop software":6,"write code":5},
  kf:{"developper":4,"systeme ia":6,"entrainer un modele":6,"pipeline":5,"deploiement":5,"logiciel":5,"integration":4},
  ka:{"بناء نظام":6,"تطوير نظام":6,"تدريب نموذج":6,"نموذج مخصص":6,"برمجيات":5,"تطوير برمجيات":6,"خط بيانات":5,"نشر":3},
  a:{en:"No. We build no AI systems — no model fine-tuning, no data pipelines, no custom software. What we do configure are agents and tools on the platforms your teams already use, tested and documented, and that is where it stops. The five services are all about the people who use AI, not the infrastructure that runs it.",
     fr:"Non. Nous ne construisons pas de systèmes d’IA : pas d’entraînement de modèles, pas de pipelines de données, pas de logiciel sur mesure. Nous configurons en revanche des agents et des outils sur les plateformes que vos équipes utilisent déjà, testés et documentés — et cela s’arrête là. Nos cinq services concernent les personnes qui utilisent l’IA, pas l’infrastructure.",
     ar:"لا. نحن لا نبني أنظمةَ ذكاءٍ اصطناعي: لا ندرّب نماذج، ولا نبني خطوط بيانات، ولا نطوّر برمجيات مخصّصة. غير أنّنا نهيّئ وكلاءَ وأدواتٍ على المنصّات التي تستعملها فِرَقكم أصلاً، مختبَرةً وموثَّقة، وعند هذا الحدّ نتوقّف. فخدماتنا الخمس تتناول الأشخاصَ الذين يستعملون الذكاء الاصطناعي، لا البنيةَ التي يعمل عليها."},
  l:"about/",t:{en:"What the practice is and is not",fr:"Ce que nous faisons et ne faisons pas",ar:"ما نفعله وما لا نفعله"}},

 {id:"4d",yes:true,rel:["standards","cheatsheet"],
  k:{"4d":6,"four d":5,"framework":5,"delegation":5,"description":4,"discernment":5,"diligence":5,"method":4,"methodology":5,"approach":3,"how do you approach":5},
  kf:{"cadre":4,"methode":5,"methodologie":5,"approche":4,"delegation":5,"description":4,"discernement":5,"diligence":5,"quatre d":5},
  ka:{"منهجية":5,"منهج":4,"إطار":4,"الأبعاد الأربعة":6,"التفويض":5,"التوصيف":4,"التمييز":5,"الحرص":4,"كيف تعملون":4,"طريقتكم":5},
  a:{en:"Everything runs on four words: Delegation (what to hand to AI, what to keep human), Description (how to ask, with your context in the request), Discernment (how to check an output before relying on it) and Diligence (what to log, disclose and own). This is the AI Fluency framework published by Anthropic with Rick Dakan and Joseph Feller — public, so you can audit the method. The same four are the axes of your score, the sections of every cheatsheet, the clause groups of your policy and the modules of every session.",
     fr:"Tout repose sur quatre mots : Délégation (ce qu’on confie à l’IA, ce qu’on garde humain), Description (comment formuler, avec votre contexte), Discernement (comment vérifier un résultat avant de s’y fier) et Diligence (ce qu’on consigne, déclare et assume). C’est le cadre AI Fluency publié par Anthropic avec Rick Dakan et Joseph Feller — public, donc vérifiable. Ces quatre axes structurent votre score, chaque fiche, chaque politique et chaque séance.",
     ar:"يقوم كلّ عملنا على أربع كلمات: التفويض (ما يُوكَل إلى الذكاء الاصطناعي وما يبقى للإنسان)، والتوصيف (كيف نطلب وكيف نضمّن سياقَكم في الطلب)، والتمييز (كيف نتحقّق من المُخرَج قبل الاعتماد عليه)، والحرص (ما نسجّله ونفصح عنه ونتحمّل مسؤوليته). وهذا هو إطار الإتقان الذي نشرته أنثروبيك مع ريك داكان وجوزيف فيلر، وهو منشورٌ للعموم فيمكنكم مراجعة منهجنا على ضوئه. وهذه الأبعاد الأربعة نفسها هي محاور تقييمكم، وأقسام كلّ ورقة مرجعية، وفصول سياستكم، ووحدات كلّ جلسة."},
  l:"about/",t:{en:"Read about the method",fr:"Lire la méthode",ar:"اقرأ عن المنهجية"}},

 {id:"standards",yes:true,rel:["article4","assessment-svc"],
  k:{"iso":4,"42001":6,"nist":5,"rmf":4,"standard":4,"standards":5,"gdpr":4,"oecd":4,"unesco":4,"compliance":3,"aligned with":4,"certified against":4},
  kf:{"iso":4,"42001":6,"nist":5,"norme":5,"normes":5,"rgpd":5,"ocde":4,"unesco":4,"conformite":4,"aligne":3},
  ka:{"معيار":5,"معايير":5,"آيزو":5,"42001":6,"نيست":5,"اللائحة العامة":5,"حماية البيانات":4,"يونسكو":4,"منظمة التعاون":4,"الامتثال":4},
  a:{en:"The work is mapped to ISO/IEC 42001:2023, the NIST AI Risk Management Framework 1.0, the EU AI Act (Regulation (EU) 2024/1689), GDPR, the OECD AI Principles and the UNESCO Recommendation on the Ethics of AI. The Institution scope includes a governance gap plan against ISO/IEC 42001 and the NIST AI RMF.",
     fr:"Le travail est aligné sur ISO/IEC 42001:2023, le cadre NIST de gestion des risques de l’IA 1.0, le règlement européen sur l’IA (UE 2024/1689), le RGPD, les principes de l’OCDE sur l’IA et la Recommandation de l’UNESCO sur l’éthique de l’IA. Le périmètre Institution comprend un plan d’écarts de gouvernance au regard d’ISO/IEC 42001 et du cadre NIST.",
     ar:"نوائم عملنا مع معيار ISO/IEC 42001:2023، وإطار NIST لإدارة مخاطر الذكاء الاصطناعي 1.0، وقانون الاتحاد الأوروبي للذكاء الاصطناعي (اللائحة 2024/1689)، واللائحة العامة لحماية البيانات، ومبادئ منظمة التعاون والتنمية الاقتصادية للذكاء الاصطناعي، وتوصية اليونسكو بشأن أخلاقيات الذكاء الاصطناعي. ويتضمّن النطاق المؤسّسي خطةَ فجوات حوكمة قياساً بمعيار ISO/IEC 42001 وإطار NIST."},
  l:"about/",t:{en:"See the standards",fr:"Voir les normes",ar:"المعايير"}},

 {id:"article4",yes:true,rel:["policy-svc","evidence"],
  k:{"article 4":7,"art 4":6,"ai act":6,"eu ai act":7,"literacy":4,"obligation":4,"regulation":3,"legal requirement":5,"comply":3,"mandatory":4,"required by law":5},
  kf:{"article 4":7,"reglement europeen":6,"ai act":6,"obligation":5,"obligatoire":5,"litteratie":4,"la loi":3,"legalement":4},
  ka:{"المادة 4":8,"قانون الاتحاد الأوروبي":6,"قانون الذكاء الاصطناعي":7,"التزام":4,"إلزامي":5,"ملزم":5,"قانوني":3,"الإلمام":4},
  a:{en:"Since 2 February 2025, Article 4 of the EU AI Act has required organisations deploying AI to ensure that staff — and contractors acting on their behalf — have AI literacy proportionate to their role, context and risk. It is outcome-based: you have to be able to demonstrate it. Department-specific training, a documented policy and an attendance record are what that demonstration looks like. The site carries a briefing on what a 60-person organisation actually has to do.",
     fr:"Depuis le 2 février 2025, l’article 4 du règlement européen sur l’IA impose aux organisations qui déploient l’IA de garantir que leur personnel — et les prestataires agissant pour elles — dispose d’une maîtrise de l’IA proportionnée à leur rôle, au contexte et au risque. L’obligation porte sur le résultat : il faut pouvoir le démontrer. Une formation par département, une politique documentée et un registre de présence en sont la démonstration. Le site propose une note sur ce qu’une organisation de 60 personnes doit concrètement faire.",
     ar:"منذ الثاني من فبراير 2025 تُلزم المادةُ 4 من قانون الاتحاد الأوروبي للذكاء الاصطناعي المؤسساتَ التي تستعمل الذكاء الاصطناعي بأن تضمن لموظفيها، وللمتعاقدين العاملين باسمها، إلماماً بالذكاء الاصطناعي يتناسب مع أدوارهم وسياق عملهم ومستوى المخاطر. والالتزامُ قائمٌ على النتيجة، أي أنّ عليكم إثباتَه. ويتحقّق هذا الإثبات بتدريبٍ لكل قسم وسياسةٍ موثَّقة وسجلِّ حضور. وعلى الموقع إحاطةٌ عمّا يجب على مؤسسة من ستين موظفاً أن تفعله فعلاً."},
  l:"eu-ai-act-article-4/",t:{en:"Read the Article 4 briefing",fr:"Lire la note",ar:"اقرأ الإحاطة"}},

 {id:"how-runs",yes:true,rel:["duration","contact","evidence"],
  k:{"process":4,"how does the process":6,"the process":5,"process work":5,"how does it work":6,"steps":4,"engagement":3,"how do you work":6,"discovery":3,"handover":4,"what happens":4,"after we sign":7,"once we sign":7,"next steps":5,"onboarding":5,"kick off":5,"kick-off":5},
  kf:{"processus":5,"comment ca se passe":6,"comment cela se passe":6,"etapes":5,"deroulement":6,"se deroule":6,"deroule":5,"comment se passe":6,"apres signature":6,"demarrage":5},
  ka:{"كيف تسير":6,"كيف يتم":5,"الخطوات":5,"مراحل":5,"بعد التوقيع":7,"ماذا يحدث":5,"آلية العمل":6,"كيف نبدأ":5},
  a:{en:"Four steps. A 30-minute discovery call: what is already happening with AI in your organisation and which service you actually need — including none. Baseline: the assessment, plus interviews where the scope includes them. Delivery: policy drafted with your people, sessions built on your teams’ real tasks, agents and tools tested on your documents. Handover: a re-score, the evidence file and the cheatsheets in your hands. Engagements close with a capability you own, not a dependency.",
     fr:"Quatre étapes. Un entretien de découverte de 30 minutes : ce qui se passe déjà avec l’IA chez vous, et quel service il vous faut vraiment — y compris aucun. L’état des lieux : l’évaluation, plus des entretiens si le périmètre le prévoit. La réalisation : une politique rédigée avec vos équipes, des séances bâties sur leurs tâches réelles, des agents et outils testés sur vos documents. La passation : une nouvelle évaluation, le dossier de preuves et les fiches entre vos mains. Vous repartez avec une capacité, pas une dépendance.",
     ar:"أربعُ خطوات. مكالمةُ استكشاف من ثلاثين دقيقة نتبيّن فيها ما يجري فعلاً في مؤسستكم مع الذكاء الاصطناعي وأيَّ خدمةٍ تحتاجونها حقاً، وقد يكون الجواب: لا شيء. ثم خطُّ الأساس: التقييم، ومقابلاتٌ إن شملها النطاق. ثم التنفيذ: سياسةٌ تُصاغ مع فريقكم لا من أجله، وجلساتٌ مبنيّة على مهامّ فِرَقكم الحقيقية، ووكلاءُ وأدواتٌ مختبَرة على وثائقكم. وأخيراً التسليم: إعادةُ تقييم وملفُّ الأدلّة والأوراقُ المرجعية بين أيديكم. وتُختَتم المهمّة بقدرةٍ تملكونها، لا باعتمادٍ علينا."},
  l:"our-clients/",t:{en:"See how engagements run",fr:"Voir le déroulement",ar:"كيف تسير المهمّة"}},

 {id:"evidence",yes:true,rel:["article4","assessment-svc"],
  k:{"evidence":5,"audit":4,"auditor":4,"regulator":4,"prove":4,"demonstrate":4,"attendance":4,"due diligence":5,"what do we have at the end":6,"documentation":3,"proof":7,"for our board":6,"board":3,"show the board":6,"trustees":5,"what proof":8,"paper trail":6,"certificate":5,"certificates":5},
  kf:{"preuve":5,"preuves":5,"audit":4,"auditeur":4,"regulateur":4,"demontrer":4,"prouver":4,"registre":4,"diligence raisonnable":5,"preuve":7,"preuves":7,"quelle preuve":8,"conseil d administration":6,"pour l audit":7,"audit":5,"attestation":5,"certificat":5},
  ka:{"أدلة":5,"إثبات":5,"تدقيق":4,"مدقق":4,"الجهة التنظيمية":4,"نثبت":4,"سجل الحضور":5,"العناية الواجبة":5,"ملف":3,"دليل":6,"إثبات":7,"اثبات":7,"مجلس الإدارة":6,"للتدقيق":7,"تدقيق":5,"المدقق":6,"شهادة":5,"ما الدليل":8},
  a:{en:"You leave with a scored baseline, your own approved policy, one page per department, a tool inventory, an attendance record and two scores — before and at 90 days. Together they form the file a donor, an auditor or a regulator asks to see.",
     fr:"Vous repartez avec un score de départ, votre politique approuvée, une page par département, un inventaire des outils, un registre de présence et deux scores — avant et à 90 jours. Ensemble, ils constituent le dossier qu’un bailleur, un auditeur ou un régulateur demande à voir.",
     ar:"تخرجون بخطِّ أساسٍ مُقيَّم، وسياسةٍ معتمدة خاصّة بكم، وصفحةٍ لكل قسم، وجردٍ للأدوات، وسجلِّ حضور، وتقييمَين اثنين: قبل البدء وبعد تسعين يوماً. وتشكّل هذه مجتمعةً الملفَّ الذي يطلبه المانح أو المدقّق أو الجهة التنظيمية."},
  l:"services/",t:{en:"See what each scope leaves behind",fr:"Voir les livrables",ar:"المخرجات"}},

 {id:"free-assessment",yes:true,rel:["extended-assessment","assessment-svc"],
  k:{"free assessment":7,"free":3,"quiz":3,"twelve minutes":4,"12 minutes":4,"28 questions":5,"try something":4,"self-assess":5,"is there a free":6,"anything free":7,"something free":7,"try first":6,"try before":6,"for free":5,"free":4,"try it":4,"no cost":5},
  kf:{"gratuit":5,"gratuite":5,"evaluation gratuite":7,"questionnaire":4,"douze minutes":4,"28 questions":5,"essayer":3,"gratuit":5,"gratuite":5,"quelque chose de gratuit":7,"essayer":4,"tester":4,"sans frais":5},
  ka:{"مجاني":5,"مجانية":5,"تقييم مجاني":7,"اختبار":3,"اثنتا عشرة دقيقة":4,"28 سؤال":5,"أجرب":3,"استبيان":4,"مجاني":5,"شيء مجاني":7,"نجرب":5,"نجربه":5,"تجربة":3,"بدون تكلفة":5},
  a:{en:"Yes. The free AI Readiness Assessment is twenty-eight questions across the four competencies of AI fluency and takes about twelve minutes. You get a score, a breakdown by dimension and a ranked list of what to fix first — and you keep the report whether or not you ever speak to us.",
     fr:"Oui. L’évaluation gratuite compte vingt-huit questions sur les quatre compétences de la maîtrise de l’IA et prend environ douze minutes. Vous obtenez un score, une répartition par dimension et une liste priorisée de ce qu’il faut corriger d’abord — et vous gardez le rapport, que vous nous parliez ou non.",
     ar:"نعم. يتألّف التقييمُ المجاني من ثمانيةٍ وعشرين سؤالاً تغطّي الكفايات الأربع لإتقان الذكاء الاصطناعي، ويستغرق نحو اثنتي عشرة دقيقة. وتحصلون على درجةٍ إجمالية وتفصيلٍ بحسب الأبعاد وقائمةٍ مرتَّبة بما ينبغي إصلاحه أولاً، ويبقى التقريرُ لكم سواء تحدّثتم إلينا أم لا."},
  l:"explore-your-ai-readiness/",t:{en:"Take the free assessment",fr:"Faire l’évaluation gratuite",ar:"ابدأ التقييم المجاني"}},

 {id:"extended-assessment",yes:true,rel:["assessment-svc","standards"],
  k:{"extended":5,"extensive":4,"60 questions":5,"sixty":3,"ten dimension":4,"10 dimension":4,"full assessment":4,"difference between the two":5,"longer assessment":5},
  kf:{"etendue":5,"approfondie":5,"60 questions":5,"soixante":3,"dix dimensions":4,"complete":3,"difference entre":4},
  ka:{"الموسع":5,"الموسّع":5,"المفصل":5,"60 سؤال":5,"ستون":3,"عشرة أبعاد":4,"الفرق بين":4,"الكامل":3},
  a:{en:"The extended assessment is sixty questions across ten dimensions — fluency, governance, data protection and ethics, workforce impact, operations and politics, psychological safety and future-readiness — mapped to ISO/IEC 42001, the NIST AI RMF, the EU AI Act, GDPR, OECD and UNESCO instruments. It is the instrument behind the paid assessment. The free version is the shorter, 28-question one.",
     fr:"L’évaluation étendue compte soixante questions sur dix dimensions — maîtrise, gouvernance, protection des données et éthique, impact sur les équipes, dynamiques internes, sécurité psychologique, préparation à l’avenir — alignées sur ISO/IEC 42001, le cadre NIST, le règlement européen, le RGPD, l’OCDE et l’UNESCO. C’est l’instrument derrière l’évaluation payante ; la version gratuite est la courte, à 28 questions.",
     ar:"يتألّف التقييمُ الموسّع من ستّين سؤالاً على عشرة أبعاد: الإتقان، والحوكمة، وحماية البيانات والأخلاقيات، وأثر الذكاء الاصطناعي في القوى العاملة، والعمليات والديناميات الداخلية، والأمان النفسي، والاستعداد للمستقبل؛ مواءَمةً مع معيار ISO/IEC 42001 وإطار NIST وقانون الاتحاد الأوروبي واللائحة العامة لحماية البيانات ومبادئ منظمة التعاون واليونسكو. وهو الأداةُ التي يقوم عليها التقييمُ المدفوع، أمّا النسخة المجانية فهي المختصرة ذات الثمانية والعشرين سؤالاً."},
  l:"extensive-ai-readiness-analysis/",t:{en:"Open the extended assessment",fr:"Ouvrir l’évaluation étendue",ar:"افتح التقييم الموسّع"}},

 {id:"about",yes:true,rel:["clients","independent","location"],
  k:{"who are you":6,"about the practice":5,"about you":4,"boutique":4,"firm":3,"company":2,"how big":6,"your team":5,"founded":4,"history":3,"background":3,"team size":4,"how many people":4},
  kf:{"qui etes-vous":6,"qui etes vous":6,"cabinet":4,"votre structure":5,"fonde":3,"combien de personnes":5,"votre equipe":4,"presentez":4},
  ka:{"من أنتم":7,"عن الشركة":5,"عن المكتب":5,"مكتب":3,"شركة":2,"تأسست":4,"تأسس":4,"كم عددكم":6,"فريقكم":5,"عرّفوا":4},
  a:{en:"M.A.I. Consulting is a boutique practice founded in 2023 and based in Geneva. It is deliberately small — no bench, no 24-hour turnaround, finite capacity. It sells no software and takes no partner commissions. The practice is certified across the AI fluency, responsible-AI and applied-tooling curricula of Anthropic and of the United Nations College with Microsoft — including the qualifications for teaching AI fluency — and is a member of the Anthropic Claude Partner Network.",
     fr:"M.A.I. Consulting est un cabinet de niche fondé en 2023 et basé à Genève. Volontairement petit : pas d’équipe de réserve, pas de délai de 24 heures, une capacité limitée. Il ne vend aucun logiciel et ne perçoit aucune commission. Le cabinet est certifié sur les cursus de maîtrise de l’IA, d’IA responsable et d’outillage d’Anthropic et de l’UN College avec Microsoft — y compris pour l’enseignement de la maîtrise de l’IA — et est membre du Claude Partner Network d’Anthropic.",
     ar:"«إم إيه آي كونسلتنغ» مكتبُ استشاراتٍ متخصّص أُسِّس سنة 2023 ومقرُّه جنيف. وهو صغيرٌ عن قصد: لا فريقَ احتياط فيه، ولا وعدَ بالتسليم في أربعٍ وعشرين ساعة، وقدرتُه محدودة. ولا يبيع أيَّ برمجيات ولا يتقاضى عمولاتَ شراكة. وهو معتمَدٌ في مناهج إتقان الذكاء الاصطناعي والذكاء الاصطناعي المسؤول والأدوات التطبيقية لدى أنثروبيك ولدى كلية الأمم المتحدة مع مايكروسوفت، بما في ذلك مؤهّلات تعليم إتقان الذكاء الاصطناعي، وهو عضوٌ في شبكة شركاء «كلود» التابعة لأنثروبيك."},
  l:"about/",t:{en:"About the practice",fr:"À propos du cabinet",ar:"عن المكتب"}},

 {id:"location",yes:true,rel:["languages","contact"],
  k:{"where are you":6,"located":5,"location":4,"based in":5,"you based":5,"switzerland":4,"geneva":4,"your office":4,"remote":5,"remotely":5,"on-site":5,"onsite":5,"on site":5,"come to us":4,"travel to":4,"in person":5},
  kf:{"ou etes-vous":6,"ou etes vous":6,"situes":5,"bases":4,"geneve":5,"suisse":4,"a distance":6,"sur place":6,"en presentiel":6,"vous deplacez":5},
  ka:{"أين أنتم":7,"أين مقركم":7,"مقر":4,"جنيف":5,"سويسرا":4,"عن بعد":6,"عن بُعد":6,"حضوري":5,"في مكاتبنا":5,"تسافرون":4,"تأتون":4},
  a:{en:"Based in Geneva, Switzerland, and delivered anywhere — remote or on-site. Travel outside Geneva is billed at cost.",
     fr:"Basé à Genève, en Suisse, et livré partout — à distance ou sur place. Les déplacements hors de Genève sont facturés au coût réel.",
     ar:"مقرُّنا جنيف في سويسرا، ونقدّم خدماتنا في أيّ مكان، عن بُعد أو حضورياً. وتُحتسَب تكاليف السفر خارج جنيف بقيمتها الفعلية."},
  l:"about/",t:{en:"How engagements run",fr:"Le déroulement",ar:"كيف نعمل"}},

 {id:"languages",yes:true,rel:["location","who-for"],
  k:{"language":5,"languages":5,"arabic":7,"french":7,"english":4,"multilingual":4,"in my language":5,"translate":2,"speak":3},
  kf:{"langue":6,"langues":6,"arabe":7,"francais":7,"anglais":4,"en francais":7,"parlez":4,"multilingue":4},
  ka:{"لغة":5,"لغات":5,"العربية":8,"بالعربية":8,"عربي":6,"الفرنسية":6,"الإنجليزية":4,"تتكلم":4,"تتحدث":4,"تتحدثون":5},
  a:{en:"Yes. Sessions and materials are delivered in English, French or Arabic — and Arabic material is written natively, not translated. You can also write to me here in any of the three.",
     fr:"Oui. Les séances et les supports sont livrés en anglais, en français ou en arabe — et les supports en arabe sont rédigés directement en arabe, pas traduits. Vous pouvez aussi m’écrire ici dans l’une des trois langues.",
     ar:"نعم. نقدّم الجلسات والمواد بالإنجليزية أو الفرنسية أو العربية، والموادُّ العربية تُكتَب بالعربية ابتداءً لا ترجمةً. ويمكنكم مخاطبتي هنا بأيٍّ من اللغات الثلاث."},
  l:"about/",t:{en:"See delivery details",fr:"Voir les modalités",ar:"تفاصيل التقديم"}},

 {id:"independent",yes:true,rel:["not-for","about"],
  k:{"vendor":5,"independent":5,"neutral":4,"which tool":5,"which ai tool":6,"recommend a tool":5,"sell software":7,"selling software":7,"licence":4,"license":4,"resell":5,"commission":4,"partner of":4,"affiliated":4,"claude or":4,"copilot or":4,"chatgpt or":4,"commission from":7,"get commission":7,"kickback":6,"vendor neutral":7,"impartial":5},
  kf:{"independant":6,"neutre":5,"quel outil":6,"recommandez":4,"vendez":4,"logiciel":3,"licence":4,"commission":4,"affilie":4,"revendeur":5,"commission":6,"touchez":4,"editeurs":5,"fournisseur":5,"fournisseurs":5,"independant":7,"independants":7,"neutre":5,"neutres":5,"impartial":5},
  ka:{"مستقل":6,"مستقلون":6,"حيادي":5,"أي أداة":6,"أي منصة":6,"توصون":4,"تبيعون":5,"ترخيص":4,"عمولة":5,"شريك":3,"وكيل بيع":5,"عمولة":8,"مستقلون":7,"مستقلين":7,"شركات مزودة":6,"المزودة":5,"محايد":5,"محايدون":6,"مستقل":5},
  a:{en:"Yes, deliberately. We sell no licences and take no partner commissions, so if the free tier of a tool is enough for your team, we will tell you so. Tool choices come out of your own policy — the approved tool list is written for your data and your work, not for a vendor.",
     fr:"Oui, délibérément. Nous ne vendons aucune licence et ne percevons aucune commission : si la version gratuite d’un outil suffit à votre équipe, nous vous le dirons. Le choix des outils découle de votre propre politique — la liste des outils approuvés est écrite pour vos données et votre travail, pas pour un éditeur.",
     ar:"نعم، وعن قصد. فنحن لا نبيع تراخيص ولا نتقاضى عمولات، وإن كانت النسخةُ المجانية من أداةٍ ما كافيةً لفريقكم قلنا لكم ذلك. ويُشتَقّ اختيارُ الأدوات من سياستكم أنتم، فقائمةُ الأدوات المعتمدة تُكتَب لبياناتكم وعملكم لا لصالح أيّ مورّد."},
  l:"about/",t:{en:"What the practice is and is not",fr:"Ce que nous faisons et ne faisons pas",ar:"ما نفعله وما لا نفعله"}},

 {id:"clients",yes:true,rel:["about","how-runs"],
  k:{"reference":5,"references":5,"testimonial":5,"case study":5,"worked with":6,"clients":5,"who have you":5,"past clients":6,"customers":4,"track record":4,"ai for good":6,"blackbird":6},
  kf:{"references":6,"temoignage":5,"etude de cas":5,"vos clients":6,"avec qui":5,"deja travaille":6,"experience":3},
  ka:{"مراجع":5,"عملاء":5,"عملاؤكم":6,"مع من عملتم":7,"شهادات":4,"دراسة حالة":5,"سجلكم":4,"تجربتكم":4,"سابقين":4},
  a:{en:"Clients include the AI for Good Foundation and BlackBird Training Center; their words are on the Who We Work With page. The practice is young and the client list is short — we say so openly. What you can inspect before committing is the instrument, the framework, the sample cheatsheet and the estimator. Disclosure: the practice’s principal also holds a role at the AI for Good Foundation.",
     fr:"Parmi nos clients : la AI for Good Foundation et BlackBird Training Center ; leurs mots figurent sur la page « Nos interlocuteurs ». Le cabinet est jeune et la liste de clients est courte — nous le disons ouvertement. Ce que vous pouvez examiner avant de vous engager : l’instrument, le cadre, la fiche exemple et l’estimateur. Transparence : le responsable du cabinet occupe aussi une fonction au sein de la AI for Good Foundation.",
     ar:"من عملائنا مؤسسة AI for Good ومركز BlackBird للتدريب، وكلماتُهم على صفحة «مع من نعمل». والمكتبُ حديثُ النشأة وقائمةُ عملائه قصيرة، ونقول ذلك صراحةً. أمّا ما يمكنكم فحصُه قبل الالتزام فهو أداةُ التقييم والإطارُ المنهجي والنموذجُ المرجعي وحاسبةُ التقدير. وللإفصاح: يشغل مسؤولُ المكتب أيضاً منصباً في مؤسسة AI for Good."},
  l:"our-clients/",t:{en:"See client voices",fr:"Voir les témoignages",ar:"آراء العملاء"}},

 {id:"compare",yes:true,rel:["free-options","value"],
  k:{"compare":5,"comparison":5,"competitor":5,"competitors":5,"alternative":4,"alternatives":4,"versus":3,"vs":3,"other providers":5,"market":3,"why you and not":6,"pick you":7,"choose you":7,"big consultancy":7,"big four":7,"deloitte":6,"accenture":6,"pwc":6,"kpmg":6,"mckinsey":6,"why you":6,"instead of":3,"rather than":3,"over a":2,"large firm":6},
  kf:{"comparer":5,"comparaison":5,"concurrent":5,"concurrents":5,"alternative":4,"alternatives":4,"autres prestataires":5,"marche":3,"pourquoi vous":5,"pourquoi vous":7,"plutot que":4,"grand cabinet":7,"grands cabinets":7,"vous choisir":7,"plutot qu un":5},
  ka:{"مقارنة":5,"قارن":4,"منافس":5,"منافسين":5,"المنافسون":5,"بديل":4,"بدائل":5,"مقدمون آخرون":5,"السوق":3,"لماذا أنتم":6,"لماذا أنتم":7,"لماذا نختاركم":8,"نختاركم":7,"بدلا من":4,"شركة استشارات كبيرة":7,"الشركات الكبيرة":6,"مقارنة":6,"المنافسين":6,"منافسين":6},
  a:{en:"Every alternative a mission-driven organisation would consider is on the Compare page with its published price and a linked source — free cohorts, course platforms, certifications, governance consultancies, global firms, and the two most common options of all: doing nothing and doing it in-house. It also lists where we lose.",
     fr:"Toutes les alternatives qu’une organisation à mission envisagerait figurent sur la page Comparer, avec leur prix public et une source : cohortes gratuites, plateformes de cours, certifications, cabinets de gouvernance, grands cabinets, et les deux options les plus courantes — ne rien faire, ou le faire en interne. Elle indique aussi là où nous perdons.",
     ar:"تجدون على صفحة «المقارنة» كلَّ بديلٍ قد تنظر فيه منظمةٌ ذات رسالة، مع سعره المنشور ومصدرِه: البرامجُ الجماعية المجانية، ومنصّاتُ الدورات، والشهادات، ومكاتبُ استشارات الحوكمة، والشركاتُ العالمية، والخياران الأشيَعان على الإطلاق: ألّا تفعلوا شيئاً، أو أن تفعلوه داخلياً. كما تذكر الصفحةُ المواضعَ التي نخسر فيها."},
  l:"compare/",t:{en:"Compare the market",fr:"Comparer le marché",ar:"قارن السوق"}},

 {id:"free-options",yes:true,rel:["compare","who-for"],
  k:{"free course":6,"free programme":6,"free program":6,"nethope":5,"nten":5,"coursera":4,"linkedin learning":5,"why pay":6,"cheaper":4,"subsidised":4,"do it for free":6},
  kf:{"cours gratuit":6,"programme gratuit":6,"pourquoi payer":6,"moins cher":4,"subventionne":4,"gratuitement":4},
  ka:{"دورة مجانية":6,"برنامج مجاني":6,"لماذا ندفع":7,"أرخص":4,"مدعوم":4,"بالمجان":5},
  a:{en:"You should use them. Free introductory courses on this framework exist, published by the people who wrote it, and subsidised cohort programmes exist for smaller nonprofits. If one of those is the right first step, we will say so on the call. Note that the best free programme is open to US-based nonprofits only and the main subsidised accelerator caps at under 100 staff. Come to us for the four things a course or cohort cannot do: write your policy, use your team’s actual tasks, clear your own data rules, and produce the evidence a funder or regulator asks for.",
     fr:"Utilisez-les. Il existe des cours d’introduction gratuits sur ce cadre, publiés par ses auteurs, et des programmes de cohorte subventionnés pour les petites associations. Si l’un d’eux est le bon premier pas, nous vous le dirons. Notez que le meilleur programme gratuit est réservé aux associations basées aux États-Unis et que l’accélérateur subventionné principal s’arrête à 100 personnes. Venez nous voir pour ce qu’un cours ne peut pas faire : rédiger votre politique, travailler sur vos tâches réelles, valider vos règles de données et produire les preuves qu’un bailleur ou un régulateur exige.",
     ar:"استفيدوا منها. فثمّة دوراتٌ تمهيدية مجانية عن هذا الإطار نشرها واضعوه، وبرامجُ جماعية مدعومة للمنظمات الصغيرة. وإن كان أحدُها هو الخطوةَ الأولى الصحيحة قلنا لكم ذلك في المكالمة. غير أنّ أفضلَ برنامج مجاني مقصورٌ على المنظمات الأمريكية، وأهمَّ مسرّعٍ مدعوم يتوقّف عند مئة موظف. فتعالوا إلينا لما لا تقدر عليه دورةٌ ولا برنامجٌ جماعي: صياغةُ سياستكم، والعملُ على مهامّ فريقكم الفعلية، وإقرارُ قواعد بياناتكم، وإنتاجُ الأدلّة التي يطلبها المانح أو الجهة التنظيمية."},
  l:"compare/",t:{en:"See the comparison",fr:"Voir la comparaison",ar:"انظر المقارنة"}},

 {id:"value",yes:true,rel:["compare","price"],
  k:{"value":4,"roi":6,"return on":5,"worth it":6,"benefit":3,"why bother":5,"save time":4,"saving":3,"productivity":4,"hours saved":5},
  kf:{"valeur":4,"retour sur investissement":6,"rentable":5,"vaut":4,"benefice":3,"gain de temps":5,"productivite":4},
  ka:{"القيمة":4,"العائد":6,"يستحق":5,"الفائدة":4,"ما الفائدة":6,"توفير الوقت":5,"الإنتاجية":4,"ساعات":3},
  a:{en:"Four lines you can find in your own accounts: revenue at risk when a funder asks about AI governance and you have nothing to send; the per-seat arithmetic — a catalogue licence for 150 staff costs close to twice a full engagement, every year, and leaves no artefacts; proposal and report hours as the measurable saving; and the beneficiary-data exposure you cannot price. We will not quote an ROI percentage before seeing your documents — anyone who does is guessing.",
     fr:"Quatre lignes que vous retrouverez dans vos propres comptes : le chiffre d’affaires menacé quand un bailleur interroge votre gouvernance de l’IA et que vous n’avez rien à envoyer ; l’arithmétique par siège — une licence catalogue pour 150 personnes coûte près du double d’une mission complète, chaque année, sans rien laisser ; les heures de rédaction de propositions et de rapports comme économie mesurable ; et l’exposition des données de bénéficiaires, que l’on ne peut chiffrer. Nous ne citerons pas de pourcentage de retour sur investissement avant d’avoir vu vos documents — quiconque le fait devine.",
     ar:"أربعةُ بنود تجدونها في حساباتكم أنتم: إيراداتٌ مهدَّدة حين يسألكم مانحٌ عن حوكمة الذكاء الاصطناعي فلا تجدون ما ترسلونه؛ وحسابُ الرخص الفردية، فرخصةُ منصّةٍ تدريبية لمئةٍ وخمسين موظفاً تكلّف قرابةَ ضِعف مهمّةٍ كاملة كلَّ سنة ولا تترك أثراً؛ وساعاتُ كتابة المقترحات والتقارير بوصفها الوفرَ القابلَ للقياس؛ وانكشافُ بيانات المستفيدين الذي لا يُقدَّر بثمن. ولن نذكر لكم نسبةَ عائدٍ على الاستثمار قبل أن نرى وثائقكم، فمن يفعل ذلك إنما يخمّن."},
  l:"compare/",t:{en:"Read the value case",fr:"Lire l’argumentaire",ar:"اقرأ حجّة القيمة"}},

 {id:"contact",yes:true,rel:["how-runs","price"],
  k:{"contact":5,"book":5,"call":4,"meeting":4,"talk to":5,"speak to":5,"speak with":5,"talk with":5,"appointment":5,"schedule":4,"reach":3,"email":3,"phone":3,"get in touch":6,"discovery call":5,"someone":3,"a human":5,"a person":4,"your email":5,"email address":5,"how do we start":6,"get started":5,"next step":4},
  kf:{"contact":5,"contacter":6,"rendez-vous":6,"appel":5,"appeler":5,"parler a quelqu":6,"joindre":5,"courriel":5,"e-mail":5,"telephone":4,"commencer":4,"prendre rendez":6},
  ka:{"اتصال":5,"تواصل":5,"أتواصل":6,"موعد":6,"حجز":5,"مكالمة":5,"أتحدث مع":6,"شخص":3,"إنسان":5,"بريد":5,"البريد الإلكتروني":6,"هاتف":4,"كيف أبدأ":6,"نبدأ":4},
  a:{en:"Book a 30-minute call through the contact form; we reply within one business day. On the call we tell you which of the five services you need — or that you do not need us yet. You can also email q.mamdouh@mai4consulting.com. Office hours Monday to Friday, 9:00 to 18:00 CET.",
     fr:"Prenez un rendez-vous de 30 minutes via le formulaire de contact ; nous répondons sous un jour ouvré. Lors de l’appel, nous vous disons lequel des cinq services il vous faut — ou que vous n’avez pas encore besoin de nous. Vous pouvez aussi écrire à q.mamdouh@mai4consulting.com. Du lundi au vendredi, de 9 h à 18 h (heure de Genève).",
     ar:"احجزوا مكالمةً من ثلاثين دقيقة عبر نموذج التواصل، ونردّ في غضون يوم عمل واحد. ونقول لكم في المكالمة أيَّ الخدمات الخمس تحتاجون، أو أنّكم لا تحتاجوننا بعد. ويمكنكم أيضاً مراسلتنا على q.mamdouh@mai4consulting.com. أوقاتُ العمل من الاثنين إلى الجمعة، من التاسعة صباحاً إلى السادسة مساءً بتوقيت جنيف."},
  l:"contact-us/",t:{en:"Go to the contact form",fr:"Aller au formulaire",ar:"نموذج التواصل"}},

 {id:"knowledge",yes:true,rel:["cheatsheet","article4"],
  k:{"article":4,"articles":6,"blog":5,"read more":4,"resources":5,"knowledge":4,"linkedin":5,"publication":4,"publications":5,"writing":2,"newsletter":5,"what have you written":6,"read":2},
  kf:{"article":4,"articles":4,"blog":4,"lire":3,"ressources":5,"publications":4,"linkedin":4,"lettre":3,"articles":6,"article":3,"blog":5,"ressources":5,"publications":5,"lire":3,"linkedin":5},
  ka:{"مقال":4,"مقالات":5,"مدونة":4,"أقرأ":3,"موارد":5,"منشورات":4,"لينكدإن":4,"لينكد إن":4,"نشرة":3,"مقالات":7,"مقال":5,"مدونة":5,"موارد":5,"منشورات":5,"لينكدإن":5,"لينكد ان":5,"أقرأ":3},
  a:{en:"Everything published is filed under the service it belongs to on the Knowledge page — the sample cheatsheet, the EU AI Act Article 4 briefing, the two assessments and references on the tools. Articles go on LinkedIn first and are mirrored there.",
     fr:"Tout ce que nous publions est classé par service sur la page Knowledge — la fiche exemple, la note sur l’article 4, les deux évaluations et des références sur les outils. Les articles paraissent d’abord sur LinkedIn, puis y sont repris.",
     ar:"كلُّ ما ننشره مصنَّفٌ بحسب الخدمة التي يتبعها على صفحة «المعرفة»: النموذجُ المرجعي، وإحاطةُ المادة 4، والتقييمان، ومراجعُ عن الأدوات. وتُنشَر المقالاتُ على لينكدإن أولاً ثم تُنقَل إلى هناك."},
  l:"knowledge/",t:{en:"Open the Knowledge page",fr:"Ouvrir la page Knowledge",ar:"صفحة المعرفة"}},

 {id:"privacy",yes:true,rel:["contact"],
  k:{"privacy":6,"personal data":5,"with my data":7,"my information":6,"data protection":4,"do with my":6,"cookies":4,"gdpr":2,"store my":5},
  kf:{"confidentialite":6,"vie privee":6,"mes donnees":7,"donnees personnelles":6,"cookies":4,"rgpd":3,"conservez":5},
  ka:{"الخصوصية":6,"بياناتي":8,"معلوماتي":6,"البيانات الشخصية":6,"تحتفظون":5,"تخزنون":5,"كوكيز":4},
  a:{en:"The privacy policy is on its own page: what is collected through the site and the contact form, the legal basis under GDPR and Swiss law, retention, and your rights. This assistant stores nothing; a question you choose to send to the team goes by email and nowhere else.",
     fr:"La politique de confidentialité a sa propre page : ce qui est collecté via le site et le formulaire, la base légale au titre du RGPD et du droit suisse, la conservation et vos droits. Cet assistant ne stocke rien ; une question que vous choisissez d’envoyer à l’équipe part par courriel et nulle part ailleurs.",
     ar:"لسياسة الخصوصية صفحةٌ خاصّة تبيّن ما يُجمَع عبر الموقع ونموذج التواصل، والأساسَ القانوني بموجب اللائحة العامة لحماية البيانات والقانون السويسري، ومدّةَ الاحتفاظ، وحقوقَكم. ولا يحتفظ هذا المساعدُ بأيّ شيء، وما تختارون إرساله إلى الفريق يُرسَل بالبريد الإلكتروني ولا يذهب إلى أيّ مكان آخر."},
  l:"privacy/",t:{en:"Read the privacy policy",fr:"Lire la politique",ar:"سياسة الخصوصية"}},

 {id:"problem",yes:true,rel:["services","assessment-svc"],
  k:{"why does this matter":5,"shadow ai":6,"staff using":5,"already using":5,"beneficiary data":5,"risk":3,"exposure":4,"what problem":5,"pain":2},
  kf:{"pourquoi est-ce important":5,"deja utilise":5,"utilisent deja":6,"donnees de beneficiaires":5,"risque":3,"quel probleme":5,"shadow":4},
  ka:{"لماذا يهم":5,"ما المشكلة":6,"يستخدمون بالفعل":6,"يستعملون أصلا":6,"بيانات المستفيدين":6,"خطر":3,"المخاطر":4,"انكشاف":4},
  a:{en:"Programme, fundraising and operations staff are already drafting donor reports and proposals with consumer AI tools — weekly, often with beneficiary data in hand — and the organisation has no rules that permit it, no training built for their actual role, and no answer when a funder asks. We score where you stand, write a policy that permits, train each department on its own tasks, configure the repetitive parts once, and leave the evidence file.",
     fr:"Les équipes programme, collecte de fonds et opérations rédigent déjà rapports et propositions avec des outils d’IA grand public — chaque semaine, souvent avec des données de bénéficiaires — et l’organisation n’a ni règles qui l’autorisent, ni formation pour leur rôle réel, ni réponse quand un bailleur pose la question. Nous mesurons où vous en êtes, écrivons une politique qui autorise, formons chaque département sur ses tâches, configurons une fois pour toutes les parties répétitives, et laissons le dossier de preuves.",
     ar:"يكتب موظفو البرامج وجمع التبرّعات والعمليات تقاريرَ المانحين والمقترحاتَ بأدوات ذكاءٍ اصطناعي استهلاكية منذ الآن، أسبوعياً، وكثيراً ما تكون بياناتُ المستفيدين بين أيديهم؛ ولا قواعدَ في المؤسسة تجيز ذلك، ولا تدريباً مبنيّاً على أدوارهم الفعلية، ولا جواباً حين يسأل مانح. فنقيس أين تقفون، ونكتب سياسةً تجيز، وندرّب كلَّ قسم على مهامّه، ونهيّئ الأجزاءَ المتكرّرة مرّةً واحدة، ونترك لكم ملفَّ الأدلّة."},
  l:"services/",t:{en:"See how it is solved",fr:"Voir la réponse",ar:"كيف نعالجه"}}
];

/* ─────────────────────────── language ─────────────────────────── */
var FR_HINT=/\b(le|la|les|des|du|une|est|vous|nous|votre|vos|quel|quelle|quels|quelles|combien|comment|pourquoi|bonjour|merci|prix|tarif|tarifs|cout|formation|politique|avez|etes|pouvez|est-ce|qu|quoi|parlez|services|ong|c|l|d|j|ce|cette|ces|que|qui|ne|pas|je|tu|il|elle|de|mes|mon|ma|avec|pour|dans|sur|par|faire|peut|peux|ou|tres|aussi|deja|encore|quand|depuis|entre|chez|sans|sous|vers|sommes|avons|ont|proposez|travaillez|redigez|rediger|bailleur|bailleurs|equipe|donnees|fiche|reunion|rendez-vous|gratuit|gratuite|en|plusieurs|fois|payer|peut-on|notre|nos|leur|leurs|ses|cela|ca|tout|tous|toute|toutes|mais|donc|oui|suis|sont|etre|avoir|dois|doit|devons|faut|besoin|aider|aide|demande|demandez|voudrais|souhaite|souhaitons|cherche|cherchons|apres|avant|pendant|alors|comme|lequel|laquelle|celui|celle|chaque|autre|autres|nouvelle|petit|petite|grande|paiement|preuve|rendez|bureau|numero|heure|commencer|commence|separement|departement|editeurs|touchez|formez|alignes|quand|plutot|choisir|obtenir|recevons|aurons|serons|pouvons|voulons|devez|allez|etes-vous|avez-vous|pouvez-vous|est-il|y a-t-il|qu est)\b/;
function detect(q){
  if(/[؀-ۿ]/.test(q)) return "ar";
  var n=norm(q), hits=(n.match(new RegExp(FR_HINT.source,"g"))||[]).length, acc=/[àâçéèêëîïôûùüÿœ]/i.test(q);
  var enHits=(n.match(/\b(the|you|your|do|does|did|is|are|what|how|much|can|could|with|and|for|who|which|where|when|why|we|our|us|i|my|it|of|to|in|have|has|work|offer|need|want|help|this|that|there|be)\b/g)||[]).length;
  if((hits>=2||acc)&&hits>=enHits) return "fr";
  if(hits>=1&&enHits===0&&n.split(" ").length<=3) return "fr";
  return "en";
}
var UI={
 en:{title:"Site assistant",sub:"Answers come only from this website",ph:"Ask about services, prices, who it is for…",send:"Ask",
     note:"I repeat what is written on the site and cannot invent an answer. If a question about the practice is not covered here, I will offer to pass it to the team.",
     hello:"Hello! I can tell you about the services, roughly what they cost, who they are for, or how an engagement runs — in English, French or Arabic. What would you like to know?",
     dk:"That one is not on the website, and I would rather not guess. I can pass it to the team — they usually reply within a business day — or you can use the contact form.",
     off:"That is outside what I can help with here — I know this practice, its services, prices, who they are for and how it works. Ask me one of those and I will do my best.",
     sendBtn:"Send to the team",contact:"Contact form",emailPh:"Your email (optional, so they can reply)",sending:"Sending…",sent:"Sent. The team will reply",sentTo:" to ",fail:"Could not send. Please use the ",
     yes:"Yes — ",thanks:"You are welcome. If anything else is unclear, the contact form goes straight to the team.",bye:"Goodbye — and if you want the short version of all this, the estimator takes about a minute.",
     ident:"I am the assistant on this site — not a person, and not a general chatbot. I only repeat what is written here, in English, French or Arabic. For anything the site does not cover, the team is one message away.",
     cando:"I can explain the five services, show you roughly what they cost with the estimator, tell you who they are for, walk you through how an engagement runs, and point you to the free assessment or the sample cheatsheet. Ask in English, French or Arabic.",
     langyes:"Yes — write to me in English, French or Arabic and I will answer in the same language. The team delivers sessions and materials in all three as well.",
     fine:"Doing well, thank you. What can I help you find?",
     chips:["What does it cost?","Who is this for?","What is the cheatsheet?","Do you work with funders?","What is Article 4?","How do I book a call?"],
     more:"Read more"},
 fr:{title:"Assistant du site",sub:"Les réponses viennent uniquement de ce site",ph:"Services, tarifs, pour qui…",send:"Envoyer",
     note:"Je répète ce qui est écrit sur le site et ne peux rien inventer. Si une question sur le cabinet n’est pas couverte ici, je proposerai de la transmettre à l’équipe.",
     hello:"Bonjour ! Je peux vous parler des services, de leur coût approximatif, de leurs destinataires ou du déroulement d’une mission — en français, en anglais ou en arabe. Que souhaitez-vous savoir ?",
     dk:"Ce point n’est pas sur le site et je préfère ne pas deviner. Je peux le transmettre à l’équipe — elle répond en général sous un jour ouvré — ou vous pouvez utiliser le formulaire de contact.",
     off:"Cela sort de ce que je peux faire ici — je connais ce cabinet, ses services, ses tarifs, ses destinataires et son fonctionnement. Posez-moi une question sur l’un de ces sujets.",
     sendBtn:"Transmettre à l’équipe",contact:"Formulaire de contact",emailPh:"Votre courriel (facultatif, pour la réponse)",sending:"Envoi…",sent:"Envoyé. L’équipe vous répondra",sentTo:" à ",fail:"Envoi impossible. Merci d’utiliser le ",
     yes:"Oui — ",thanks:"Avec plaisir. Si quelque chose reste flou, le formulaire de contact arrive directement à l’équipe.",bye:"Au revoir — et pour la version courte de tout ceci, l’estimateur prend une minute.",
     ident:"Je suis l’assistant de ce site — pas une personne, ni un chatbot généraliste. Je ne répète que ce qui est écrit ici, en français, en anglais ou en arabe. Pour tout ce que le site ne couvre pas, l’équipe est à un message.",
     cando:"Je peux expliquer les cinq services, vous montrer leur coût approximatif avec l’estimateur, vous dire à qui ils s’adressent, décrire le déroulement d’une mission, et vous orienter vers l’évaluation gratuite ou la fiche exemple. En français, en anglais ou en arabe.",
     langyes:"Oui — écrivez-moi en français, en anglais ou en arabe et je répondrai dans la même langue. L’équipe assure aussi les séances et les supports dans ces trois langues.",
     fine:"Très bien, merci. Que puis-je vous aider à trouver ?",
     chips:["Combien ça coûte ?","Pour qui est-ce ?","La fiche pratique ?","Travaillez-vous avec des bailleurs ?","L’article 4 ?","Prendre rendez-vous"],
     more:"En savoir plus"},
 ar:{title:"مساعد الموقع",sub:"الأجوبة من هذا الموقع وحده",ph:"اسأل عن الخدمات أو الأسعار أو لمن هي…",send:"اسأل",
     note:"أكرّر ما هو مكتوبٌ على الموقع ولا أستطيع اختراعَ جواب. وإن كان سؤالٌ عن المكتب غيرَ مشمول هنا عرضتُ عليكم إحالتَه إلى الفريق.",
     hello:"أهلاً بكم! أستطيع أن أحدّثكم عن الخدمات وتكلفتها التقريبية ولمن هي وكيف تسير المهمّة، بالعربية أو الإنجليزية أو الفرنسية. ما الذي تودّون معرفته؟",
     dk:"هذا الأمر ليس على الموقع، وأُفضِّل ألّا أخمّن. أستطيع إحالتَه إلى الفريق، وهم يردّون عادةً في غضون يوم عمل، أو يمكنكم استعمال نموذج التواصل.",
     off:"هذا خارج ما أستطيع مساعدتكم فيه هنا؛ فأنا أعرف هذا المكتب وخدماته وأسعاره ولمن هي وكيف يعمل. اسألوني عن أحد هذه الأمور وسأجيبكم قدر استطاعتي.",
     sendBtn:"أحِل السؤال إلى الفريق",contact:"نموذج التواصل",emailPh:"بريدكم الإلكتروني (اختياري، ليردّوا عليكم)",sending:"جارٍ الإرسال…",sent:"أُرسل. سيردّ عليكم الفريق",sentTo:" على ",fail:"لم يتمّ الإرسال. يُرجى استعمال ",
     yes:"نعم، ",thanks:"على الرحب والسعة. وإن بقي شيءٌ غيرَ واضح فنموذجُ التواصل يصل إلى الفريق مباشرةً.",bye:"إلى اللقاء، وإن أردتم الخلاصةَ من كل هذا فحاسبةُ التقدير لا تستغرق سوى دقيقة.",
     ident:"أنا مساعدُ هذا الموقع، لستُ شخصاً ولا روبوتَ محادثةٍ عامّاً. أكرّر ما هو مكتوبٌ هنا فقط، بالعربية أو الإنجليزية أو الفرنسية. وما لا يشمله الموقع فالفريقُ على بُعد رسالة.",
     cando:"أستطيع أن أشرح الخدمات الخمس، وأن أعرض عليكم تكلفتها التقريبية عبر حاسبة التقدير، وأن أخبركم لمن هي، وأن أصف كيف تسير المهمّة، وأن أرشدكم إلى التقييم المجاني أو النموذج المرجعي. اسألوا بالعربية أو الإنجليزية أو الفرنسية.",
     langyes:"نعم، اكتبوا لي بالعربية أو الإنجليزية أو الفرنسية وسأجيب باللغة نفسها. ويقدّم الفريقُ الجلسات والمواد باللغات الثلاث أيضاً.",
     fine:"بخير، شكراً لكم. بماذا أساعدكم؟",
     chips:["كم تكلّف الخدمات؟","لمن هذه الخدمات؟","ما الورقة المرجعية؟","هل تعملون مع الجهات المانحة؟","ما المادة 4؟","كيف أحجز مكالمة؟"],
     more:"اقرأ المزيد"}
};

/* ─────────────────────────── matching ─────────────────────────── */
function norm(s){
  s=s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");           // strip Latin accents
  s=s.replace(/[ً-ْـ]/g,"").replace(/[إأآا]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي").replace(/ؤ/g,"و").replace(/ئ/g,"ي"); // Arabic normalisation
  s=s.replace(/[’'ʼ`]/g," ").replace(/[^\p{L}\p{N}%&-]/gu," ").replace(/\s+/g," ").trim();
  return s;
}
function nk(k){return norm(k);}
/* \b in JS is ASCII-only, so Arabic (and accented) words never sit on a "boundary". rx() swaps every \b for a
   unicode-aware boundary (lookbehind/lookahead on letters and digits); falls back to plain \b where lookbehind is unsupported. */
function rx(src,flags){
  try{ return new RegExp(src.replace(/\\b/g,"(?:(?<![\\p{L}\\p{N}])|(?<=(?:^|[^\\p{L}\\p{N}])(?:وال|بال|فال|كال|لل|ال|و|ب|ل|ف|ك))|(?![\\p{L}\\p{N}]))"),(flags||"")+"u"); }
  catch(e){ return new RegExp(src,flags||""); }
}
var WORLD=rx("\\b(weather|meteo|météo|الطقس|joke|blague|نكتة|capital of|capitale de|عاصمة|recipe|recette|وصفة|football|soccer|كرة القدم|match|news|actualites|actualités|الأخبار|stock market|bitcoin|crypto|movie|film|music|song|chanson|poem|poeme|poème|قصيدة|homework|devoirs|essay|what time is it|quelle heure|كم الساعة|horoscope|lottery|casino|dating|game|jeu|أغنية|فيلم|مباراة)\\b","i");
var OFFTOPIC=rx("\\b(seo|search engine|web ?site design|build (us|our|a) website|weather|meteo|météo|الطقس|ceo|founder|owner|salary|salaries|hiring|recruit|jobs?|career|careers|vacanc|intern|stage|emploi|recrut|توظيف|وظيفة|وظائف|cancel|cancellation|annulation|annuler|refund|rembours|استرجاع|إلغاء|guarantee|warranty|vat number|numero de tva|tax number|iban|bank account|company number|registration number|dubai|riyadh|cairo|london|paris|new york|spanish|german|italian|portuguese|chinese|russian|turkish|espagnol|allemand|الإسبانية|الألمانية|discount code|coupon|free trial|essai gratuit|api|sdk|integration with|plugin|zapier|salesforce|hubspot|crm|accounting software|legal advice|conseil juridique|lawyer|avocat|محامي|insurance|assurance|إلغاء|حساب بنكي|الحساب البنكي|رقم الحساب|رقم ضريبي|السجل التجاري|كود خصم|خصم|تجربة مجانية|تأمين|استشارة قانونية|الألمانية|الاسبانية|الالمانية|الإيطالية|التركية|الصينية|الروسية|الفارسية|فرع|مقر في|remboursement|reduction|réduction|code promo|numero de compte|numéro de compte|succursale|bureau a|bureau à)\\b","i");
var COMPANY=rx("\\b(you|your|yours|mai|m\\.a\\.i|practice|cabinet|consult|consultancy|service|services|price|prices|cost|fee|training|policy|assessment|cheatsheet|funder|book|call|geneva|deliver|package|estimate|agent|tool|client|work|offer|engagement|office|refund|hiring|vat|iban|bank|discount|invoice|number|company|team|staff|founder|ceo|vous|votre|vos|prix|tarif|formation|politique|evaluation|mission|bureau|remboursement|numero|numéro|tva|facture|equipe|équipe|avez|etes|êtes|pouvez|faites|proposez|خدمات|خدماتكم|سعر|أسعار|تدريب|سياسة|تقييم|أنتم|انتم|لديكم|عندكم|لكم|معكم|منكم|تقدمون|تعملون|تقبلون|مكتب|مكتبكم|عمل|رقم|حساب|ضريبة|فاتورة|استرجاع|إلغاء|الغاء|توظيف|خصم|تأمين|عمولة|فريقكم|شركتكم)\\b","i");
var AR_PFX="(?:وال|بال|فال|كال|لل|ال|و|ب|ل|ف|ك)?";
function keys(e){
  if(e._m) return e._m;
  var m={}; [e.k,e.kf,e.ka].forEach(function(set){ if(!set) return; for(var k in set){ var kk=nk(k); if(!kk) continue; if(!(kk in m)||set[k]>m[kk].w){ m[kk]={w:set[k],re:/[\u0600-\u06FF]/.test(kk)?new RegExp("(?:^| )"+kk.split(" ").map(function(w){return AR_PFX+w;}).join(" ")):null}; } } });
  e._m=m; return m;
}
function score(e,lang,nq){
  var m=keys(e), hay=" "+nq+" ", hits=[];
  for(var kk in m){ var hit=m[kk].re?m[kk].re.test(hay):hay.indexOf(" "+kk)>-1; if(hit) hits.push(kk); }
  /* longest match wins: "train" inside "training", "use policy" inside "ai use policy" are one hit, not two */
  hits=hits.filter(function(a){ return !hits.some(function(b){ return b!==a && b.length>a.length && b.indexOf(a)>-1; }); });
  var sc=0,specific=0;
  hits.forEach(function(kk){ sc+=m[kk].w; if(m[kk].w>=4) specific=Math.max(specific,m[kk].w); });
  return {s:sc,specific:specific};
}
function answer(q,lang){
  var nq=norm(q); if(!nq) return null;
  var ranked=KB.map(function(e){var r=score(e,lang,nq); return {e:e,s:r.s,specific:r.specific};}).sort(function(a,b){return (b.s-a.s)||(b.specific-a.specific);});
  var best=ranked[0], second=ranked[1]?ranked[1].s:0;
  if(!best) return null;
  if(WORLD.test(q)||WORLD.test(nq)) return null;
  if((OFFTOPIC.test(q)||OFFTOPIC.test(nq)) && best.specific<7) return null;
  if(best.specific<4) return null;
  if(best.s<5) return null;
  if(best.s-second<1.5 && best.specific<6) return null;
  return best.e;
}
/* conversational intents — answered naturally, never handed off */
var SMALL=[
 {re:rx("^(hi|hello|hey|good (morning|afternoon|evening)|salut|bonjour|bonsoir|coucou|مرحبا|أهلا|اهلا|السلام عليكم|صباح الخير|مساء الخير)\\b","i"),key:"hello"},
 {re:rx("\\b(how are you|how r u|how do you do|ca va|ça va|comment allez|comment vas|كيف حالك|كيفك|كيف الحال|شلونك)\\b","i"),key:"fine"},
 {re:rx("\\b(thanks|thank you|cheers|merci|شكرا|شكراً|مشكور)\\b","i"),key:"thanks"},
 {re:rx("^(bye|goodbye|see you|au revoir|a bientot|à bientôt|مع السلامة|وداعا|وداعاً|إلى اللقاء)\\b","i"),key:"bye"},
 {re:rx("\\b(who are you|what are you|are you (a )?(bot|robot|human|person|real)|qui es-tu|qui etes-vous|es-tu (un )?(robot|humain)|من أنت|هل أنت (روبوت|إنسان|شخص)|أنت إنسان|أنت روبوت)\\b","i"),key:"ident"},
 {re:rx("\\b(what can you do|how can you help|what do you know|que peux-tu|que sais-tu|que pouvez-vous faire|ماذا تستطيع|بماذا تساعد|ماذا تعرف)\\b","i"),key:"cando"},
 {re:rx("\\b(speak|understand|parle|parles|parlez|comprend|comprends|comprenez|تتكلم|تتكلمون|تتحدث|تتحدثون|تفهم|تفهمون|تكلم|تحكي|بتحكي|بتتكلم|هل تتحدث|تعرف|تعرفون)\\b.*\\b(arabic|french|english|arabe|francais|français|anglais|العربية|عربي|الفرنسية|فرنسي|الإنجليزية|إنجليزي|انجليزي)\\b|\\b(arabic|french|english|arabe|francais|français|anglais|العربية|عربي|الفرنسية|الإنجليزية)\\b.*\\b(speak|ok|possible|parle|parlez|ممكن|تتكلم|تتحدث)\\b|^(arabic|french|english|arabe|francais|français|anglais|بالعربية|عربي|بالعربي)\\??$","i"),key:"langyes"},
 {re:rx("\\b(help|aide|مساعدة|ساعدني)\\b","i"),key:"cando"}
];
function smallKey(q){ if(q.length>=120) return null; var n=norm(q); for(var i=0;i<SMALL.length;i++){ if(SMALL[i].re.test(q)||SMALL[i].re.test(n)) return SMALL[i].key; } return null; }
var YN=rx("^(do|does|can|could|is|are|will|would|have|has|should|est-ce|avez|etes|êtes|pouvez|faites|proposez|هل|أ|ا)\\b","i");

/* ─────────────────────────── UI ─────────────────────────── */
var P=(function(){var s=document.querySelector('script[src*="assets/chat.js"]'); if(!s) return ""; var m=s.getAttribute("src").match(/^(.*?)assets\/chat\.js/); return m?m[1]:"";})();
var CSS='\
.mai-chat-btn{position:fixed;right:1.1rem;bottom:1.1rem;z-index:950;display:flex;align-items:center;gap:.5rem;background:#C9A84C;color:#001830;border:none;border-radius:100px;padding:.75rem 1.1rem .75rem .95rem;font:700 .85rem Inter,system-ui,sans-serif;cursor:pointer;box-shadow:0 8px 24px rgba(0,24,48,.25);transition:transform .15s,background .2s}\
.mai-chat-btn:hover{background:#e8c86a;transform:translateY(-1px)}.mai-chat-btn svg{width:18px;height:18px}\
.mai-chat{position:fixed;right:1.1rem;bottom:4.6rem;z-index:951;width:min(390px,calc(100vw - 2.2rem));max-height:min(660px,calc(100vh - 6rem));display:none;flex-direction:column;background:#fff;border:1px solid rgba(0,62,138,.16);border-radius:14px;box-shadow:0 18px 50px rgba(0,24,48,.25);overflow:hidden;font-family:Inter,system-ui,sans-serif}\
.mai-chat.open{display:flex}.mai-chat[dir=rtl]{font-family:Inter,"Segoe UI",Tahoma,system-ui,sans-serif}\
.mai-chat-h{background:linear-gradient(140deg,#00122e,#003E8A);color:#fff;padding:.8rem 1rem;display:flex;align-items:center;justify-content:space-between;gap:.6rem}\
.mai-chat-h b{font:800 .95rem "Playfair Display",Georgia,serif}.mai-chat[dir=rtl] .mai-chat-h b{font-family:Inter,"Segoe UI",Tahoma,sans-serif}\
.mai-chat-h small{display:block;font-size:.66rem;color:rgba(255,255,255,.6);margin-top:.15rem;font-weight:400}\
.mai-lang{display:flex;gap:.2rem}.mai-lang button{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;border-radius:5px;font:700 .64rem Inter,sans-serif;padding:.22rem .4rem;cursor:pointer}\
.mai-lang button[aria-pressed=true]{background:#C9A84C;color:#001830;border-color:#C9A84C}\
.mai-chat-x{background:none;border:none;color:#fff;font-size:1.2rem;cursor:pointer;padding:.2rem .4rem;line-height:1}\
.mai-chat-m{flex:1;overflow-y:auto;padding:.9rem;background:#f6f8fc;display:flex;flex-direction:column;gap:.6rem}\
.mai-msg{max-width:92%;padding:.65rem .85rem;border-radius:10px;font-size:.85rem;line-height:1.65;color:#1a1a2e}\
.mai-msg.bot{background:#fff;border:1px solid rgba(0,62,138,.12);align-self:flex-start;border-bottom-left-radius:3px}\
.mai-chat[dir=rtl] .mai-msg.bot{align-self:flex-end;border-bottom-left-radius:10px;border-bottom-right-radius:3px}\
.mai-msg.user{background:#003E8A;color:#fff;align-self:flex-end;border-bottom-right-radius:3px}\
.mai-chat[dir=rtl] .mai-msg.user{align-self:flex-start;border-bottom-right-radius:10px;border-bottom-left-radius:3px}\
.mai-msg a{color:#003E8A;font-weight:700;text-decoration:none}.mai-msg a.more{display:inline-block;margin-top:.5rem;font-size:.78rem}\
.mai-chips{display:flex;flex-wrap:wrap;gap:.35rem;padding:0 .9rem .6rem;background:#f6f8fc}\
.mai-chip{background:#fff;border:1px solid rgba(0,62,138,.25);color:#003E8A;border-radius:100px;padding:.3rem .7rem;font-size:.74rem;cursor:pointer;font-family:inherit}.mai-chip:hover{background:rgba(0,62,138,.08)}\
.mai-chat-f{display:flex;gap:.4rem;padding:.6rem .7rem;border-top:1px solid rgba(0,62,138,.12);background:#fff}\
.mai-chat-f input{flex:1;border:1px solid rgba(0,62,138,.25);border-radius:8px;padding:.55rem .7rem;font:.86rem Inter,system-ui,sans-serif;color:#1a1a2e}\
.mai-chat-f button{background:#003E8A;color:#fff;border:none;border-radius:8px;padding:.55rem .85rem;font:700 .82rem Inter,system-ui,sans-serif;cursor:pointer}\
.mai-chat-n{font-size:.66rem;color:#6b7280;padding:.35rem .9rem .6rem;background:#fff;line-height:1.45}\
.mai-send{margin-top:.55rem;display:flex;flex-direction:column;gap:.4rem}.mai-send input{border:1px solid rgba(0,62,138,.25);border-radius:6px;padding:.45rem .6rem;font:.8rem Inter,system-ui,sans-serif}\
.mai-send .row{display:flex;gap:.4rem;flex-wrap:wrap}.mai-send button,.mai-send a.b{border-radius:6px;padding:.45rem .8rem;font:700 .76rem Inter,system-ui,sans-serif;cursor:pointer;text-decoration:none;display:inline-block}\
.mai-send .go{background:#C9A84C;color:#001830;border:none}.mai-send a.b{background:transparent;color:#003E8A;border:1px solid #003E8A}\
@media(max-width:560px){.mai-chat{right:.5rem;left:.5rem;width:auto;bottom:4.2rem;max-height:calc(100vh - 5.2rem)}.mai-chat-btn{right:.6rem;bottom:.6rem}}\
@media print{.mai-chat,.mai-chat-btn{display:none !important}}';

function el(t,c,h){var e=document.createElement(t); if(c) e.className=c; if(h!=null) e.innerHTML=h; return e;}
function esc(s){return s.replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
var lang="en", box, m, chips, inp, btn, hTitle, hSub, hNote, sendBtn, langBtns={};
function T(){return UI[lang];}
function setLang(l){
  lang=l; var t=T();
  box.setAttribute("dir", l==="ar"?"rtl":"ltr"); box.setAttribute("lang", l);
  hTitle.textContent=t.title; hSub.textContent=t.sub; inp.placeholder=t.ph; sendBtn.textContent=t.send; hNote.textContent=t.note;
  for(var k in langBtns) langBtns[k].setAttribute("aria-pressed", k===l?"true":"false");
}
function build(){
  var st=document.createElement("style"); st.textContent=CSS; document.head.appendChild(st);
  btn=el("button","mai-chat-btn",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-6a8 8 0 1 1 18-5z"/></svg>Ask · Demander · اسأل');
  btn.setAttribute("aria-label","Open the site assistant"); btn.setAttribute("aria-expanded","false");
  box=el("div","mai-chat"); box.setAttribute("role","dialog"); box.setAttribute("aria-label","Site assistant");
  box.innerHTML='<div class="mai-chat-h"><div><b id="mai-t"></b><small id="mai-s"></small></div><div style="display:flex;align-items:center;gap:.4rem"><div class="mai-lang" id="mai-lang"><button type="button" data-l="en">EN</button><button type="button" data-l="fr">FR</button><button type="button" data-l="ar">ع</button></div><button class="mai-chat-x" aria-label="Close">&times;</button></div></div>'+
    '<div class="mai-chat-m" id="mai-chat-m"></div><div class="mai-chips" id="mai-chips"></div>'+
    '<form class="mai-chat-f" id="mai-chat-f"><input id="mai-chat-i" type="text" autocomplete="off" aria-label="Your question"/><button type="submit" id="mai-send"></button></form>'+
    '<div class="mai-chat-n" id="mai-n"></div>';
  document.body.appendChild(btn); document.body.appendChild(box);
  m=box.querySelector("#mai-chat-m"); chips=box.querySelector("#mai-chips"); inp=box.querySelector("#mai-chat-i");
  hTitle=box.querySelector("#mai-t"); hSub=box.querySelector("#mai-s"); hNote=box.querySelector("#mai-n"); sendBtn=box.querySelector("#mai-send");
  box.querySelectorAll("#mai-lang button").forEach(function(b){ langBtns[b.getAttribute("data-l")]=b; b.onclick=function(){ setLang(b.getAttribute("data-l")); add("bot",esc(T().hello)); renderChips(T().chips); }; });
  var startLang=/^ar\b/i.test(navigator.language||"")?"ar":(/^fr\b/i.test(navigator.language||"")?"fr":"en");
  setLang(startLang);
  function add(kind,html){var d=el("div","mai-msg "+kind,html); m.appendChild(d); m.scrollTop=m.scrollHeight; return d;}
  window.__maiAdd=add;
  function renderChips(list){chips.innerHTML=""; list.forEach(function(c){var b=el("button","mai-chip",esc(c)); b.type="button"; b.onclick=function(){ask(c);}; chips.appendChild(b);});}
  function relChips(e){
    var t=T(), out=[];
    (e.rel||[]).forEach(function(id){ var r=KB.filter(function(x){return x.id===id;})[0]; if(r) out.push(r.t[lang]||r.t.en); });
    return out.length?out:t.chips;
  }
  function unanswered(q){
    var t=T();
    var d=add("bot",esc(t.dk));
    var w=el("div","mai-send",'<input type="email" placeholder="'+esc(t.emailPh)+'" aria-label="email"/><div class="row"><button type="button" class="go">'+esc(t.sendBtn)+'</button><a class="b" href="'+P+'contact-us/">'+esc(t.contact)+'</a></div>');
    d.appendChild(w);
    w.querySelector(".go").onclick=function(){
      var email=w.querySelector("input").value.trim(); var b=this; b.disabled=true; b.textContent=t.sending;
      sendToTeam(q,email,lang).then(function(){ w.innerHTML='<span style="font-size:.8rem;color:#1a7a4a;font-weight:700">'+esc(t.sent)+(email?esc(t.sentTo)+esc(email):"")+'.</span>'; })
        .catch(function(){ w.innerHTML='<span style="font-size:.8rem;color:#a8271a">'+esc(t.fail)+'<a href="'+P+'contact-us/">'+esc(t.contact)+'</a>.</span>'; });
    };
  }
  function ask(q){
    q=(q||"").trim(); if(!q) return; add("user",esc(q)); inp.value="";
    var dl=detect(q); if(dl!==lang) setLang(dl);
    var t=T(), core=q, greeted=false;
    /* a greeting in front of a real question: greet, then answer the question */
    var g=SMALL[0].re; if((g.test(q)||g.test(norm(q)))){ var rest=q.replace(g,"").replace(/^[\s,.!?;:،؟…-]+/,"").trim(); if(rest.length>10){ core=rest; greeted=true; } }
    var e=answer(core,lang);
    var sk=smallKey(core);
    /* small talk wins when it is the whole message; "help me with a policy" should still reach the policy answer */
    if(sk && (sk!=="cando" || !e) && (core.length<70 || !e)){ add("bot",esc((greeted?t.hello+" ":"")+t[sk])); renderChips(t.chips); return; }
    if(e){
      var isYN=YN.test(core.trim())||YN.test(norm(core));
      var lead=(e.yes&&isYN&&!/^(yes|oui|نعم)/i.test(e.a[lang]||e.a.en))?t.yes:"";
      add("bot",esc((greeted?t.hello.split(/[.!؟?]/)[0]+"! ":"")+lead+(e.a[lang]||e.a.en))+'<br/><a class="more" href="'+P+e.l+'">'+esc(e.t[lang]||e.t.en)+' &rarr;</a>');
      renderChips(relChips(e)); return;
    }
    if(greeted){ add("bot",esc(t.hello)); }
    if(!(WORLD.test(core)||WORLD.test(norm(core))) && (COMPANY.test(core)||COMPANY.test(norm(core)))) { unanswered(core); } else { add("bot",esc(t.off)); }
    renderChips(t.chips);
  }
  box.querySelector("#mai-chat-f").addEventListener("submit",function(ev){ev.preventDefault(); ask(inp.value);});
  function open(o){ box.classList.toggle("open",o); btn.setAttribute("aria-expanded",o?"true":"false"); if(o){ if(!m.children.length){ add("bot",esc(T().hello)); renderChips(T().chips);} inp.focus(); } }
  btn.onclick=function(){open(!box.classList.contains("open"));};
  box.querySelector(".mai-chat-x").onclick=function(){open(false);};
  document.addEventListener("keydown",function(e){ if(e.key==="Escape") open(false); });
  window.__maiChat={answer:function(q,l){return answer(q,l||detect(q));},detect:detect,KB:KB,small:smallKey,rank:function(q){var nq=norm(q);return KB.map(function(e){var r=score(e,"en",nq);return [e.id,r.s,r.specific];}).sort(function(a,b){return b[1]-a[1];}).slice(0,4);},company:function(q){return !(WORLD.test(q)||WORLD.test(norm(q)))&&(COMPANY.test(q)||COMPANY.test(norm(q)));}};
}

/* ─────────────────────────── hand-off ─────────────────────────── */
function loadEmailJS(){return new Promise(function(res,rej){ if(window.emailjs) return res(); var s=document.createElement("script"); s.src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"; s.onload=function(){res();}; s.onerror=rej; document.head.appendChild(s); });}
function sendToTeam(q,email,l){
  return loadEmailJS().then(function(){
    try{ window.emailjs.init({publicKey:"JJs3lu55OHI_pbjth"}); }catch(e){}
    return window.emailjs.send("service_an94235","template_bv6m1l3",{
      from_name:"Website assistant — unanswered question ("+l.toUpperCase()+")", from_email: email||"no-reply@mai4consulting.com",
      organization:"—", job_title:"—", sector:"—", team_size:"—", service:"Website assistant — question the assistant could not answer",
      referral:"Site assistant", preferred: email?"Email":"—",
      message:"Question the assistant could not answer ("+l+"):\n\n"+q+"\n\nPage: "+location.href+"\nTime: "+new Date().toISOString()+(email?"\nVisitor email: "+email:"\nVisitor email: not given"),
      to_email:"q.mamdouh@mai4consulting.com"});
  });
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",build); else build();
})();
