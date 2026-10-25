import { r, type ReservedEntry } from './helpers'

/**
 * Grand Test 3 — Pathology, Pharmacology, Microbiology, Forensic Medicine,
 * Community Medicine (64 questions). Original questions.
 * Correct answer is written first; display order is randomised.
 */

const ROBBINS = 'Robbins & Cotran Pathologic Basis of Disease'
const KDT = "KD Tripathi's Essentials of Medical Pharmacology; Goodman & Gilman's The Pharmacological Basis of Therapeutics"
const ANANTH = "Ananthanarayan & Paniker's Textbook of Microbiology"
const REDDY = "K.S. Narayan Reddy's The Essentials of Forensic Medicine and Toxicology"
const PARK = "Park's Textbook of Preventive and Social Medicine"

export const gt3Paraclinical: ReservedEntry[] = [
  // ============================================================== PATHOLOGY (14)
  r('pathology', 'hematology', 'gt3-path-01',
    'A 32-year-old woman has fever, confusion and petechiae. Hb 7.8 g/dL with many schistocytes, platelets 18,000/µL, LDH markedly raised, creatinine 1.6 mg/dL. PT and aPTT are normal. What is the underlying mechanism, and what treatment should begin urgently?',
    ['ADAMTS13 deficiency causing platelet microthrombi — start plasma exchange', 'Consumption of clotting factors after tissue factor release — give cryoprecipitate', 'Shiga-toxin damage to glomerular endothelium — supportive care and dialysis only', 'Antiplatelet antibodies destroying platelets — give an urgent platelet transfusion'],
    'Microangiopathic haemolytic anaemia with severe thrombocytopenia, neurological features, fever and renal involvement, with normal PT/aPTT, is thrombotic thrombocytopenic purpura. Acquired TTP is caused by autoantibodies against ADAMTS13, the protease that cleaves large vWF multimers. Untreated mortality is very high; plasma exchange (removing antibody, replacing enzyme) with corticosteroids, ± caplacizumab and rituximab, should start without waiting for the ADAMTS13 result. DIC prolongs PT/aPTT; Shiga-toxin HUS is mainly a childhood diarrhoeal illness; ITP has no schistocytes, and platelet transfusion can worsen TTP thrombosis.',
    { difficulty: 'Expert', type: 'clinical-case', reference: `${ROBBINS}; Harrison's Principles of Internal Medicine`, integratedSubjects: ['Pathology', 'Medicine'], system: 'Hematology', tags: ['ttp', 'adamts13', 'maha', 'plasma-exchange'] }),

  r('pathology', 'hematology', 'gt3-path-02',
    'A 12-year-old boy has intermittent jaundice, splenomegaly and gallstones; his mother had a splenectomy. Hb 10 g/dL, MCHC 37 g/dL, reticulocytes 9%, direct antiglobulin test negative, many spherocytes on the smear. Which test is most specific to confirm the diagnosis?',
    ['EMA binding test by flow cytometry', 'Hb electrophoresis by HPLC', 'Glucose-6-phosphate dehydrogenase assay', 'Sucrose lysis (sugar-water) test'],
    'Hereditary spherocytosis (usually autosomal dominant, defects in ankyrin, spectrin, band 3 or protein 4.2) causes extravascular haemolysis, a raised MCHC, gallstones and splenomegaly. EMA dye binds band 3; reduced fluorescence by flow cytometry is sensitive and specific and has largely replaced the osmotic fragility test (which is also positive in autoimmune haemolysis). A negative DAT helps exclude warm autoimmune haemolytic anaemia, which also produces spherocytes. Hb electrophoresis is for haemoglobinopathies; the sucrose lysis test was for PNH.',
    { difficulty: 'Hard', type: 'clinical-case', reference: ROBBINS, integratedSubjects: ['Pathology', 'Pediatrics'], system: 'Hematology', tags: ['hereditary-spherocytosis', 'ema-binding', 'haemolysis'] }),

  r('pathology', 'hematology', 'gt3-path-03',
    'A 55-year-old woman with active rheumatoid arthritis has Hb 9.6 g/dL, MCV 80 fL, serum iron 35 µg/dL, total iron-binding capacity 220 µg/dL (low), transferrin saturation 16% and ferritin 340 ng/mL. Which mediator chiefly explains this picture?',
    ['Hepcidin, which blocks iron export by degrading ferroportin', 'Erythropoietin excess, which suppresses intestinal iron absorption', 'Deficiency of transferrin receptors on erythroid precursors', 'Chronic occult blood loss from NSAID-induced gastropathy'],
    'Low serum iron with a LOW TIBC and a HIGH ferritin is anaemia of inflammation (chronic disease). IL-6 induces hepatic hepcidin, which binds ferroportin and causes its internalisation and degradation; iron is retained in macrophages and is not absorbed from the gut, so erythropoiesis is iron-restricted despite adequate stores. Iron deficiency from blood loss would give a high TIBC and a low ferritin (ferritin <30 ng/mL; <100 in inflammation suggests coexisting deficiency). EPO is relatively deficient, not excessive, in this condition.',
    { difficulty: 'Expert', type: 'clinical-case', reference: ROBBINS, integratedSubjects: ['Pathology', 'Medicine'], system: 'Hematology', tags: ['anaemia-of-chronic-disease', 'hepcidin', 'iron-studies'] }),

  r('pathology', 'hematology', 'gt3-path-04',
    'A 29-year-old woman with two first-trimester miscarriages develops a deep vein thrombosis. aPTT is prolonged and does not correct on mixing with normal plasma; the dilute Russell viper venom time is prolonged and corrects with excess phospholipid. Which is the best interpretation?',
    ['Lupus anticoagulant (antiphospholipid antibody)', 'Acquired factor VIII inhibitor causing her thrombosis', 'Congenital factor XII deficiency causing her miscarriages', 'Heparin contamination of the blood sample from a line'],
    'Failure of the aPTT to correct on mixing means an inhibitor; a phospholipid-dependent test (dRVVT) that corrects with excess phospholipid identifies lupus anticoagulant. Despite the prolonged in-vitro clotting time, antiphospholipid syndrome causes venous/arterial thrombosis and pregnancy loss; persistence must be shown on repeat testing at least 12 weeks apart. A factor VIII inhibitor causes bleeding, not thrombosis. Factor XII deficiency prolongs the aPTT but corrects on mixing and causes no bleeding. Heparin contamination would also prolong the thrombin time.',
    { difficulty: 'Hard', type: 'clinical-case', reference: ROBBINS, integratedSubjects: ['Pathology', 'Obstetrics & Gynecology'], system: 'Hematology', tags: ['antiphospholipid-syndrome', 'lupus-anticoagulant', 'mixing-study'] }),

  r('pathology', 'hematology', 'gt3-path-05',
    'A 23-year-old woman has a mediastinal mass and cervical lymphadenopathy. Biopsy shows bands of collagen dividing the node into nodules, containing large cells that lie in clear spaces. The large cells would typically show which immunophenotype?',
    ['CD15 positive, CD30 positive, CD45 negative', 'CD20 positive, CD45 positive, CD30 negative', 'CD3 positive, CD4 positive, CD30 negative', 'CD10 positive, BCL6 positive, CD45 positive'],
    'This is nodular sclerosis classical Hodgkin lymphoma — the commonest subtype, typical of young women with mediastinal disease. Its lacunar cells (Reed–Sternberg variants that retract in formalin-fixed tissue) are CD15+, CD30+, PAX5 weakly positive and CD45−. Strong CD20 and CD45 positivity with CD30 negativity suggests a B-cell non-Hodgkin lymphoma or the "popcorn" cells of nodular lymphocyte-predominant Hodgkin lymphoma. CD10/BCL6 indicates a germinal-centre B-cell lymphoma.',
    { difficulty: 'Medium', type: 'standard', reference: ROBBINS, system: 'Hematology', tags: ['hodgkin-lymphoma', 'reed-sternberg', 'immunophenotype'] }),

  r('pathology', 'hematology', 'gt3-path-06',
    'A 48-year-old man has fatigue and a spleen palpable 10 cm below the costal margin. WBC 180,000/µL with myelocytes, metamyelocytes and neutrophils, basophils 6%, blasts 2%, platelets 520,000/µL. Which finding confirms the diagnosis and predicts response to targeted therapy?',
    ['BCR-ABL1 fusion from t(9;22)(q34;q11) on FISH or RT-PCR', 'JAK2 V617F mutation', 'A raised leucocyte alkaline phosphatase score', 'PML-RARA fusion from t(15;17)'],
    'Marked leucocytosis with a full spectrum of myeloid maturation, basophilia, splenomegaly and few blasts is chronic myeloid leukaemia in chronic phase. The Philadelphia chromosome t(9;22) creates the constitutively active BCR-ABL1 tyrosine kinase, the target of imatinib and other TKIs; quantitative BCR-ABL1 PCR is also used to monitor response. The LAP score is LOW in CML and high in a leukaemoid reaction. JAK2 V617F is found in polycythaemia vera, essential thrombocythaemia and primary myelofibrosis. PML-RARA defines acute promyelocytic leukaemia.',
    { difficulty: 'Hard', type: 'clinical-case', reference: ROBBINS, integratedSubjects: ['Pathology', 'Pharmacology'], system: 'Hematology', tags: ['cml', 'bcr-abl', 'philadelphia-chromosome'] }),

  r('pathology', 'general-pathology', 'gt3-path-07',
    'A lymph node from a 60-year-old shows a follicular lymphoma with t(14;18). How does this translocation promote tumour growth?',
    ['Overexpressed BCL2 blocks cytochrome c release, so cells escape apoptosis', 'It activates MYC, driving rapid entry of cells into the cell cycle', 'It inactivates TP53, so cells fail to arrest after DNA damage', 'It increases Fas ligand on tumour cells, which kills infiltrating T cells'],
    'In t(14;18) the BCL2 gene on chromosome 18 is juxtaposed to the IGH locus on chromosome 14 and is constitutively overexpressed. BCL2 is an anti-apoptotic protein that prevents BAX/BAK from permeabilising the mitochondrial outer membrane, so cytochrome c is not released and the intrinsic (mitochondrial) pathway of apoptosis cannot activate caspase-9. Tumour cells accumulate because they fail to die rather than because they proliferate quickly — which is why follicular lymphoma is indolent. MYC activation by t(8;14) characterises Burkitt lymphoma.',
    { difficulty: 'Hard', type: 'standard', reference: ROBBINS, system: 'Hematology', tags: ['apoptosis', 'bcl2', 'follicular-lymphoma'] }),

  r('pathology', 'general-pathology', 'gt3-path-08',
    'A 50-year-old man with long-standing, poorly controlled rheumatoid arthritis develops heavy proteinuria. A renal biopsy shows amorphous eosinophilic glomerular deposits that give apple-green birefringence with Congo red under polarised light. What is the precursor protein of these deposits?',
    ['Serum amyloid A protein', 'Immunoglobulin light chains', 'Transthyretin', 'β2-microglobulin'],
    'Amyloidosis complicating chronic inflammation (rheumatoid arthritis, tuberculosis, bronchiectasis, familial Mediterranean fever) is AA (reactive systemic) amyloidosis: the acute-phase reactant serum amyloid A, produced by the liver under IL-1/IL-6 drive, is cleaved and deposited, commonly in the kidney. AL amyloid derives from light chains in plasma-cell dyscrasias; transthyretin causes senile cardiac and familial neuropathic amyloid; β2-microglobulin amyloid occurs in long-term dialysis.',
    { difficulty: 'Medium', type: 'clinical-case', reference: ROBBINS, system: 'Renal & urinary', tags: ['amyloidosis', 'aa-amyloid', 'congo-red'] }),

  r('pathology', 'general-pathology', 'gt3-path-09',
    'A 4-year-old with silvery hair and light skin has had recurrent staphylococcal skin and lung infections. A blood smear shows giant cytoplasmic granules in neutrophils. Which defect underlies this condition?',
    ['Mutation of LYST, impairing lysosomal trafficking and phagolysosome fusion', 'Absence of NADPH oxidase activity, preventing the respiratory burst', 'Deficiency of CD18 (β2 integrin), preventing neutrophil adhesion', 'Deficiency of myeloperoxidase'],
    'Chédiak–Higashi syndrome (autosomal recessive LYST mutation) disrupts lysosomal trafficking: neutrophils contain giant fused granules and cannot fuse phagosomes with lysosomes, melanosome transfer is faulty (partial oculocutaneous albinism), and patients have neuropathy, bleeding and an accelerated lymphohistiocytic phase. NADPH oxidase deficiency is chronic granulomatous disease (abnormal NBT/dihydrorhodamine test, catalase-positive organisms). CD18 deficiency (LAD-1) causes delayed cord separation and neutrophilia without pus. MPO deficiency is usually asymptomatic.',
    { difficulty: 'Hard', type: 'clinical-case', reference: ROBBINS, integratedSubjects: ['Pathology', 'Pediatrics'], system: 'Immune', tags: ['chediak-higashi', 'phagocyte-defect', 'immunodeficiency'] }),

  r('pathology', 'systemic-pathology', 'gt3-path-10',
    'A 52-year-old man has generalised oedema, proteinuria of 7 g/day and serum albumin 2.1 g/dL. Serum anti-phospholipase A2 receptor (PLA2R) antibody is positive. What would a renal biopsy most likely show?',
    ['Thickened capillary walls with subepithelial deposits and silver-stain spikes', 'Normal glomeruli on light microscopy with podocyte foot-process effacement only', 'Mesangial IgA deposits with mesangial proliferation', 'Crescents in most glomeruli with linear IgG along the basement membrane'],
    'Anti-PLA2R antibodies are found in about 70–80% of primary membranous nephropathy, the commonest cause of nephrotic syndrome in non-diabetic adults in many series. Antibodies form subepithelial immune complexes; the basement membrane grows between them, giving "spikes" on silver stain and granular IgG/C3 on immunofluorescence. Antibody titres also track disease activity. Isolated foot-process effacement is minimal change disease; mesangial IgA is IgA nephropathy; linear IgG with crescents is anti-GBM disease.',
    { difficulty: 'Hard', type: 'clinical-case', reference: ROBBINS, integratedSubjects: ['Pathology', 'Medicine'], system: 'Renal & urinary', tags: ['membranous-nephropathy', 'pla2r', 'nephrotic-syndrome'] }),

  r('pathology', 'systemic-pathology', 'gt3-path-11',
    'A 25-year-old smoker presents with haemoptysis and oliguria. Renal biopsy shows crescents in most glomeruli and immunofluorescence shows linear IgG along the glomerular basement membrane. Against which antigen are the antibodies directed?',
    ['α3 chain of type IV collagen', 'Proteinase-3 in neutrophil azurophil granules', 'Myeloperoxidase in neutrophil azurophil granules', 'Double-stranded DNA–histone complexes'],
    'Anti-GBM disease (Goodpasture syndrome when lungs are involved) is caused by antibodies against the NC1 domain of the α3 chain of type IV collagen in glomerular and alveolar basement membranes, giving linear IgG staining and crescentic glomerulonephritis. Smoking and inhaled hydrocarbons may expose the alveolar antigen. Proteinase-3 (c-ANCA, granulomatosis with polyangiitis) and myeloperoxidase (p-ANCA) vasculitides are pauci-immune with little or no immunoglobulin deposition. Anti-dsDNA disease gives granular "full-house" staining.',
    { difficulty: 'Medium', type: 'clinical-case', reference: ROBBINS, integratedSubjects: ['Pathology', 'Medicine'], system: 'Renal & urinary', tags: ['anti-gbm', 'goodpasture', 'crescentic-gn'] }),

  r('pathology', 'systemic-pathology', 'gt3-path-12',
    'A 38-year-old non-smoker has progressive breathlessness. CT chest shows panacinar emphysema most marked in the lower lobes. Liver biopsy shows round eosinophilic globules in periportal hepatocytes. How do these globules stain?',
    ['Periodic acid–Schiff positive and diastase resistant', 'Periodic acid–Schiff positive and diastase sensitive', 'Prussian blue positive', 'Rhodanine positive for copper'],
    'α1-antitrypsin deficiency (PiZZ) causes misfolding of the protein in the hepatocyte endoplasmic reticulum, forming periportal globules that are PAS-positive and diastase-resistant (they are glycoprotein, not glycogen) — and leading to hepatitis and cirrhosis. Lack of circulating α1-antitrypsin leaves neutrophil elastase unopposed in the lung, causing early-onset, lower-lobe panacinar emphysema. Glycogen is PAS-positive but diastase-sensitive; Prussian blue stains iron (haemochromatosis); rhodanine stains copper (Wilson disease).',
    { difficulty: 'Hard', type: 'clinical-case', reference: ROBBINS, integratedSubjects: ['Pathology', 'Medicine'], system: 'Gastrointestinal', tags: ['alpha1-antitrypsin', 'pas-diastase', 'emphysema'] }),

  r('pathology', 'systemic-pathology', 'gt3-path-13',
    'A 64-year-old heavy smoker has confusion; serum sodium is 118 mmol/L with inappropriately concentrated urine. Chest CT shows a central hilar mass. Biopsy most likely shows which feature?',
    ['Small cells with nuclear moulding that stain for chromogranin', 'Keratin pearls and intercellular bridges', 'Gland formation with mucin and TTF-1 positivity in a peripheral location', 'Large pleomorphic cells without neuroendocrine markers'],
    'Small-cell lung carcinoma is a central, smoking-related neuroendocrine tumour; it secretes ADH (SIADH, with hyponatraemia) and ACTH (ectopic Cushing), and is associated with Lambert–Eaton syndrome. Histology shows small cells with salt-and-pepper chromatin, nuclear moulding and crush artefact, staining for chromogranin, synaptophysin and CD56. Squamous cell carcinoma (keratin pearls) is also central but classically causes hypercalcaemia via PTHrP. Adenocarcinoma is usually peripheral.',
    { difficulty: 'Medium', type: 'clinical-case', reference: ROBBINS, integratedSubjects: ['Pathology', 'Medicine'], system: 'Respiratory', tags: ['small-cell-carcinoma', 'siadh', 'paraneoplastic'] }),

  r('pathology', 'systemic-pathology', 'gt3-path-14',
    'A 30-year-old woman has a thyroid nodule and diarrhoea. Serum calcitonin is high. FNAC shows spindle and polygonal cells in an amorphous stroma that stains with Congo red. Her father had an adrenal tumour removed after episodes of severe hypertension. What should be offered to her children?',
    ['Germline RET testing and prophylactic thyroidectomy', 'Annual thyroid ultrasound only, beginning at age 30 years', 'Yearly serum thyroglobulin screening from age 20', 'Radioactive iodine ablation if a nodule appears'],
    'Medullary thyroid carcinoma arises from parafollicular C cells, secretes calcitonin (amyloid stroma, diarrhoea) and with a family history of phaeochromocytoma suggests MEN 2 — an autosomal dominant syndrome caused by activating germline RET mutations. Because MTC is almost certain in carriers, at-risk relatives are offered RET testing and carriers undergo prophylactic total thyroidectomy, timed by the specific codon. Ultrasound alone would detect cancer too late; thyroglobulin is a marker for differentiated follicular-cell tumours; C cells do not take up iodine, so radio-iodine has no role.',
    { difficulty: 'Expert', type: 'clinical-case', reference: `${ROBBINS}; Bailey & Love's Short Practice of Surgery`, integratedSubjects: ['Pathology', 'Surgery'], system: 'Endocrine', tags: ['medullary-thyroid-carcinoma', 'men2', 'ret'] }),

  // ============================================================== PHARMACOLOGY (14)
  r('pharmacology', 'ans-cvs-pharm', 'gt3-pharm-01',
    'A 72-year-old on digoxin for atrial fibrillation with heart failure is started on oral verapamil for rate control. A week later she has nausea, yellow vision and ventricular ectopics; serum digoxin has doubled. What is the main mechanism of this interaction?',
    ['Inhibition of P-glycoprotein–mediated digoxin excretion', 'Induction of CYP3A4, increasing formation of an active digoxin metabolite', 'Displacement of digoxin from its binding sites on plasma albumin', 'Increased gastric absorption of digoxin due to reduced gut motility'],
    'Digoxin is eliminated largely unchanged by the kidney, partly through P-glycoprotein–mediated tubular secretion, and P-gp also limits its gut absorption. Verapamil, amiodarone, quinidine, clarithromycin and some azoles inhibit P-gp, raising digoxin levels (dose usually needs reducing by about half). Digoxin is not significantly metabolised by CYP enzymes and is only ~25% protein-bound, so displacement is unimportant. Hypokalaemia, hypomagnesaemia, hypercalcaemia and renal impairment also predispose to toxicity.',
    { difficulty: 'Hard', type: 'clinical-case', reference: KDT, integratedSubjects: ['Pharmacology', 'Medicine'], system: 'Cardiovascular', tags: ['digoxin', 'p-glycoprotein', 'drug-interaction'] }),

  r('pharmacology', 'ans-cvs-pharm', 'gt3-pharm-02',
    'In an experimental animal, intravenous adrenaline produces a rise in blood pressure. After pre-treatment with phenoxybenzamine, the same dose of adrenaline produces a fall in blood pressure. Which receptor action explains the fall?',
    ['Unopposed β2-receptor–mediated vasodilatation in skeletal-muscle vessels', 'Stimulation of presynaptic α2 receptors reducing noradrenaline release', 'Direct β1 depression of myocardial contractility', 'Muscarinic vasodilatation released by α blockade'],
    'Adrenaline stimulates α1 (vasoconstriction) and β2 (vasodilatation) receptors. Normally α1 dominates at higher doses and BP rises. After irreversible α blockade with phenoxybenzamine, only the β2 vasodilator effect remains, so BP falls — Dale\'s "vasomotor reversal". Noradrenaline has little β2 activity, so after α blockade it simply produces a smaller pressor response (no reversal); isoprenaline lowers BP regardless. β1 stimulation increases contractility; adrenaline has no muscarinic action.',
    { difficulty: 'Hard', type: 'standard', reference: KDT, system: 'Cardiovascular', tags: ['dale-vasomotor-reversal', 'adrenaline', 'alpha-blocker'] }),

  r('pharmacology', 'ans-cvs-pharm', 'gt3-pharm-03',
    'A farmer who drank an organophosphate insecticide has pinpoint pupils, profuse salivation, bronchorrhoea with crackles, bradycardia (HR 44/min) and BP 80/50 mmHg. He is being given doubling doses of IV atropine. Which is the most appropriate target to judge adequate atropinisation?',
    ['A clear chest, dry axillae, HR >80/min and systolic BP >80 mmHg', 'Full dilatation of both pupils with no reaction to light', 'Return of normal muscle power and disappearance of fasciculations', 'A heart rate above 140/min with flushed, hot skin'],
    'Atropine reverses muscarinic effects only. The aims of atropinisation are a clear chest (no bronchorrhoea), heart rate above 80/min, systolic BP above 80 mmHg, dry axillae and pupils no longer pinpoint; once achieved, an infusion is continued and titrated. Pupil size is a poor end-point (local exposure, delayed response), and aiming for full mydriasis or marked tachycardia causes atropine toxicity (delirium, hyperthermia, ileus). Atropine does not affect nicotinic receptors at the neuromuscular junction, so weakness is not a target; oximes may be considered for that.',
    { difficulty: 'Hard', type: 'clinical-case', reference: `${KDT}; Eddleston M et al., Lancet 2008 (management of acute organophosphorus pesticide poisoning)`, integratedSubjects: ['Pharmacology', 'Forensic Medicine'], system: 'Toxicology', tags: ['organophosphate', 'atropine', 'poisoning'] }),

  r('pharmacology', 'general-pharm-toxicology', 'gt3-pharm-04',
    'A 66-year-old man on warfarin for a mechanical mitral valve presents with melaena and BP 86/50 mmHg. INR is 8.5. In addition to resuscitation and stopping warfarin, what is the most appropriate reversal?',
    ['IV vitamin K plus prothrombin complex concentrate', 'Oral vitamin K 1 mg alone, rechecking INR in 24 hours', 'Intravenous protamine sulphate', 'Intravenous tranexamic acid alone'],
    'Major or life-threatening bleeding on warfarin needs immediate replacement of the vitamin K–dependent factors (II, VII, IX, X) — preferably with four-factor PCC, which acts within minutes; fresh frozen plasma is the alternative where PCC is unavailable — plus IV vitamin K to sustain the reversal, since the factors given have short half-lives. Oral low-dose vitamin K alone is for a high INR without bleeding. Protamine reverses heparin. Tranexamic acid does not replace missing clotting factors. Anticoagulation for the mechanical valve is restarted once bleeding is controlled.',
    { difficulty: 'Hard', type: 'clinical-case', reference: `${KDT}; American College of Chest Physicians antithrombotic guidelines`, integratedSubjects: ['Pharmacology', 'Medicine'], system: 'Hematology', tags: ['warfarin-reversal', 'pcc', 'vitamin-k'] }),

  r('pharmacology', 'general-pharm-toxicology', 'gt3-pharm-05',
    'A drug has a clearance of 5 L/h and an oral bioavailability of 50%. The desired average steady-state plasma concentration is 2 mg/L. What oral dose should be given every 12 hours?',
    ['240 mg', '120 mg', '60 mg', '480 mg'],
    'Maintenance dose rate = clearance × target concentration / bioavailability. Per hour: 5 L/h × 2 mg/L = 10 mg/h of drug must reach the circulation; with F = 0.5, 20 mg/h must be swallowed. Over a 12-hour interval: 20 × 12 = 240 mg. Ignoring bioavailability gives 120 mg; ignoring it and also using a 6-hour interval gives 60 mg; correcting for F twice gives 480 mg. Volume of distribution determines the loading dose, not the maintenance dose.',
    { difficulty: 'Expert', type: 'standard', reference: KDT, system: 'General pharmacology', tags: ['pharmacokinetics', 'maintenance-dose', 'clearance', 'calculation'] }),

  r('pharmacology', 'chemo-antimicrobials', 'gt3-pharm-06',
    'A 26-year-old woman starting treatment for pulmonary tuberculosis takes a combined oral contraceptive pill. What advice is most appropriate?',
    ['Switch to a non-hormonal or depot method, because rifampicin induces liver enzymes', 'Continue the pill; isoniazid inhibits the metabolism of oestrogen, so efficacy increases', 'Stop pyrazinamide, which interferes with ovulation suppression', 'No change is needed; antitubercular drugs do not interact with hormonal contraception'],
    'Rifampicin is a potent inducer of CYP3A4 and other enzymes and transporters; it accelerates metabolism of ethinyloestradiol and progestogens, causing contraceptive failure. Women on rifampicin should use a copper IUD, an LNG-IUS or depot medroxyprogesterone, or barrier methods, continuing for about 4 weeks after stopping the drug. Rifampicin similarly lowers levels of warfarin, many antiretrovirals, azoles, steroids and methadone. Isoniazid is an enzyme inhibitor but does not offset rifampicin induction.',
    { difficulty: 'Medium', type: 'clinical-case', reference: KDT, integratedSubjects: ['Pharmacology', 'Obstetrics & Gynecology'], system: 'Infectious disease', tags: ['rifampicin', 'enzyme-induction', 'contraception'] }),

  r('pharmacology', 'chemo-antimicrobials', 'gt3-pharm-07',
    'Gentamicin is now usually given once daily rather than in three divided doses. Which pharmacological property best justifies once-daily dosing?',
    ['Concentration-dependent bactericidal action with a prolonged post-antibiotic effect', 'Time-dependent killing that needs concentrations above the MIC throughout the interval', 'A long elimination half-life of about 24 hours', 'Extensive hepatic metabolism to active metabolites'],
    'Aminoglycosides kill in proportion to the peak concentration (peak/MIC ratio) and suppress regrowth for hours after levels fall below the MIC (post-antibiotic effect). A single large daily dose maximises the peak, and the long drug-free trough lets renal cortical and inner-ear uptake — which is saturable — wash out, reducing nephro- and ototoxicity. β-lactams, by contrast, show time-dependent killing. Gentamicin\'s half-life is about 2–3 hours with normal renal function, and it is excreted unchanged by glomerular filtration.',
    { difficulty: 'Hard', type: 'standard', reference: KDT, system: 'Infectious disease', tags: ['aminoglycosides', 'post-antibiotic-effect', 'pharmacodynamics'] }),

  r('pharmacology', 'chemo-antimicrobials', 'gt3-pharm-08',
    'Ten minutes into a rapid intravenous infusion of vancomycin, a patient develops flushing and an itchy erythematous rash over the face, neck and upper trunk, with mild hypotension. What is the most appropriate interpretation and action?',
    ['Rate-related histamine release — pause, give an antihistamine, restart slowly', 'IgE-mediated anaphylaxis — vancomycin must never be given to him again', 'Stevens–Johnson syndrome — stop all drugs and start systemic steroids', 'Red man syndrome caused by co-administration of rifampicin with vancomycin'],
    'Vancomycin infusion reaction ("red man" or "vancomycin flushing" syndrome) results from direct mast-cell degranulation and histamine release, related to the rate of infusion, not to IgE. Pausing the infusion, giving an H1 antihistamine and restarting over at least 60–120 minutes usually prevents recurrence. True anaphylaxis (urticaria, bronchospasm, angio-oedema, shock) is rare. SJS develops over days with mucosal involvement. Rifampicin colours body fluids orange-red but does not cause this reaction.',
    { difficulty: 'Medium', type: 'clinical-case', reference: KDT, system: 'Infectious disease', tags: ['vancomycin', 'infusion-reaction', 'adverse-drug-reaction'] }),

  r('pharmacology', 'cns-pharm', 'gt3-pharm-09',
    'A 34-year-old woman on sertraline is given tramadol after surgery. Within 8 hours she is agitated and sweating, with temperature 38.6°C, diarrhoea, dilated pupils, tremor and inducible ankle clonus that is greater in the legs. What is the most likely diagnosis and specific drug therapy?',
    ['Serotonin syndrome — stop serotonergic drugs and consider cyproheptadine', 'Neuroleptic malignant syndrome — dantrolene and bromocriptine', 'Malignant hyperthermia — dantrolene', 'Anticholinergic toxicity — physostigmine'],
    'Rapid onset after adding a second serotonergic drug (tramadol inhibits serotonin reuptake), with autonomic instability, mental-status change and neuromuscular hyperactivity — clonus and hyperreflexia, worse in the lower limbs — meets the Hunter criteria for serotonin syndrome. Management is stopping the drugs, benzodiazepines, cooling and the 5-HT2A antagonist cyproheptadine. NMS develops over days after dopamine antagonists, with lead-pipe rigidity and bradyreflexia. Malignant hyperthermia follows volatile anaesthetics or suxamethonium. Anticholinergic toxicity causes dry skin and reduced bowel sounds rather than sweating and diarrhoea.',
    { difficulty: 'Expert', type: 'clinical-case', reference: `${KDT}; Boyer & Shannon, N Engl J Med 2005 (serotonin syndrome)`, integratedSubjects: ['Pharmacology', 'Psychiatry'], system: 'Nervous', tags: ['serotonin-syndrome', 'tramadol', 'ssri', 'hunter-criteria'] }),

  r('pharmacology', 'cns-pharm', 'gt3-pharm-10',
    'A 45-year-old man stable on lithium for 5 years develops coarse tremor, vomiting, ataxia and confusion two weeks after a new medication was added for hypertension. Which added drug is most likely responsible?',
    ['Hydrochlorothiazide (thiazide diuretic)', 'Amlodipine (calcium-channel blocker)', 'Prazosin (α1-blocker)', 'Methyldopa (central α2-agonist)'],
    'Lithium is handled like sodium in the proximal tubule. Thiazides cause sodium depletion, so proximal tubular reabsorption of sodium — and lithium — increases, raising lithium levels by roughly 25–40% and precipitating toxicity (coarse tremor, GI upset, ataxia, confusion, seizures). ACE inhibitors, ARBs and NSAIDs also raise lithium levels; levels should be monitored after any such change. Amlodipine, prazosin and methyldopa are not recognised causes of raised lithium levels.',
    { difficulty: 'Hard', type: 'clinical-case', reference: KDT, integratedSubjects: ['Pharmacology', 'Psychiatry'], system: 'Nervous', tags: ['lithium-toxicity', 'thiazide', 'drug-interaction'] }),

  r('pharmacology', 'cns-pharm', 'gt3-pharm-11',
    'A child who ate seeds of Datura is delirious, with hot dry flushed skin, dilated pupils, tachycardia and urinary retention. Why is physostigmine, rather than neostigmine, used to reverse the central features?',
    ['Physostigmine is a tertiary amine that enters the brain; neostigmine does not', 'Physostigmine directly stimulates muscarinic receptors, while neostigmine is only nicotinic', 'Neostigmine is an irreversible cholinesterase inhibitor and too dangerous', 'Physostigmine has a much longer duration of action than neostigmine'],
    'Datura contains atropine and hyoscine (anticholinergic toxidrome: "hot as a hare, dry as a bone, red as a beet, blind as a bat, mad as a hatter"). Physostigmine, a lipid-soluble tertiary amine, enters the CNS and reverses the delirium by inhibiting acetylcholinesterase there. Neostigmine and pyridostigmine are charged quaternary compounds acting only peripherally. Both are reversible (carbamate) inhibitors; physostigmine is short-acting, so doses may need repeating, and it should be avoided where a tricyclic overdose with conduction abnormalities is possible.',
    { difficulty: 'Medium', type: 'clinical-case', reference: KDT, integratedSubjects: ['Pharmacology', 'Forensic Medicine'], system: 'Toxicology', tags: ['datura', 'anticholinergic', 'physostigmine'] }),

  r('pharmacology', 'immuno-targeted', 'gt3-pharm-12',
    'A patient receiving high-dose ifosfamide is also given mesna. What does mesna protect against, and how?',
    ['Haemorrhagic cystitis — it binds acrolein in the urine', 'Cardiotoxicity — it chelates iron and prevents free-radical formation', 'Nephrotoxicity — it increases renal tubular secretion of the drug', 'Methotrexate toxicity — it supplies reduced folate beyond the block'],
    'Cyclophosphamide and ifosfamide are metabolised to acrolein, which concentrates in urine and damages the urothelium. Mesna (2-mercaptoethane sulfonate) is excreted in urine, where its free sulfhydryl group binds acrolein. Adequate hydration also helps. Dexrazoxane is the iron chelator used against anthracycline cardiotoxicity; leucovorin (folinic acid) rescues methotrexate toxicity; amifostine protects against cisplatin nephrotoxicity.',
    { difficulty: 'Medium', type: 'standard', reference: KDT, system: 'Oncology', tags: ['mesna', 'ifosfamide', 'acrolein', 'chemoprotectant'] }),

  r('pharmacology', 'immuno-targeted', 'gt3-pharm-13',
    'A 58-year-old man has a 9 cm gastric mass resected. Histology shows spindle cells that stain strongly for CD117 (KIT) and DOG1; mitotic count is high. Which adjuvant drug is most appropriate, and what is its target?',
    ['Imatinib — inhibits the KIT tyrosine kinase', 'Trastuzumab — a monoclonal antibody against HER2', 'Rituximab — a monoclonal antibody against CD20', 'Cetuximab — a monoclonal antibody against EGFR'],
    'A KIT/DOG1-positive spindle-cell gastric tumour is a gastrointestinal stromal tumour, arising from interstitial cells of Cajal and usually driven by activating KIT or PDGFRA mutations. Large, high-mitotic-rate GISTs have a high risk of recurrence, and adjuvant imatinib (for about 3 years) improves survival. Imatinib was developed against BCR-ABL in CML but also inhibits KIT and PDGFR. Trastuzumab is used in HER2-positive breast and gastric adenocarcinoma, rituximab in B-cell lymphomas and cetuximab in RAS wild-type colorectal and head–neck cancers.',
    { difficulty: 'Hard', type: 'clinical-case', reference: `${KDT}; ${ROBBINS}`, integratedSubjects: ['Pharmacology', 'Pathology'], system: 'Oncology', tags: ['gist', 'imatinib', 'targeted-therapy'] }),

  r('pharmacology', 'general-pharm-toxicology', 'gt3-pharm-14',
    'On day 7 of unfractionated heparin after hip replacement, a patient\'s platelet count falls from 260,000 to 95,000/µL and he develops a swollen painful calf; ultrasound confirms DVT. Which is the most appropriate management?',
    ['Stop all heparin and start argatroban or fondaparinux', 'Switch to enoxaparin and give a platelet transfusion to prevent bleeding', 'Stop heparin and start full-dose warfarin immediately', 'Continue heparin at the same dose and add low-dose aspirin'],
    'A >50% fall in platelets 5–10 days after starting heparin, with new thrombosis, is typical of heparin-induced thrombocytopenia (type II): IgG antibodies against platelet factor 4–heparin complexes activate platelets, causing a prothrombotic state. All heparin (including LMWH, which cross-reacts, and heparin flushes) must stop and a non-heparin anticoagulant start immediately (argatroban, bivalirudin, fondaparinux or a direct oral anticoagulant), without waiting for laboratory confirmation when probability is high. Starting warfarin alone can cause venous limb gangrene through early protein C depletion; it is introduced only after platelets recover. Platelet transfusion may fuel thrombosis.',
    { difficulty: 'Expert', type: 'clinical-case', reference: `${KDT}; American Society of Hematology 2018 guidelines on heparin-induced thrombocytopenia`, integratedSubjects: ['Pharmacology', 'Pathology'], system: 'Hematology', tags: ['hit', 'heparin', 'argatroban'] }),

  // ============================================================== MICROBIOLOGY (12)
  r('microbiology', 'bacteriology', 'gt3-micro-01',
    'An unimmunised 6-year-old has fever, sore throat and a greyish membrane over the tonsils that bleeds when removed, with a "bull neck". Albert-stained smears show rods with metachromatic granules. Which test determines whether the isolate produces toxin?',
    ['Elek gel precipitation test', 'Schick skin test', 'Nagler reaction on egg-yolk agar', 'CAMP test on blood agar'],
    'Corynebacterium diphtheriae causes disease through an exotoxin encoded by a lysogenic β-phage; only toxigenic strains cause the membrane and myocarditis/neuritis. The Elek test is an in-vitro immunodiffusion test in which antitoxin on a filter-paper strip forms precipitin lines with toxin from toxigenic colonies (PCR for the tox gene is an alternative). The Schick test assessed a person\'s immunity, not the strain. The Nagler reaction detects Clostridium perfringens α-toxin; the CAMP test identifies group B streptococci and Listeria. Treatment should start on clinical suspicion with antitoxin and antibiotics.',
    { difficulty: 'Medium', type: 'clinical-case', reference: ANANTH, integratedSubjects: ['Microbiology', 'Pediatrics'], system: 'Infectious disease', tags: ['diphtheria', 'elek-test', 'toxigenicity'] }),

  r('microbiology', 'bacteriology', 'gt3-micro-02',
    'A 70-year-old on day 6 of co-amoxiclav for pneumonia has 8 watery stools a day, abdominal cramps and WBC 18,000/µL. Stool tests positive for glutamate dehydrogenase antigen and toxin B. What is the preferred treatment for this first, non-fulminant episode?',
    ['Oral fidaxomicin or oral vancomycin', 'Intravenous vancomycin', 'Oral metronidazole for all patients', 'Loperamide and continuation of co-amoxiclav'],
    'Clostridioides difficile infection is diagnosed by a two-step algorithm (GDH or nucleic-acid test plus toxin detection). Current IDSA/SHEA guidelines (2021 focused update) prefer oral fidaxomicin, or oral vancomycin, for an initial episode; metronidazole is reserved for non-severe cases when these are unavailable. Intravenous vancomycin does not reach the colonic lumen. Antimotility agents may worsen toxin retention, and the inciting antibiotic should be stopped where possible.',
    { difficulty: 'Hard', type: 'clinical-case', reference: `${ANANTH}; IDSA/SHEA Clinical Practice Guideline for C. difficile infection, 2021 focused update`, guidelineVersion: 'IDSA/SHEA C. difficile guideline, 2021 focused update', integratedSubjects: ['Microbiology', 'Medicine'], system: 'Gastrointestinal', tags: ['c-difficile', 'fidaxomicin', 'antibiotic-associated-diarrhoea'] }),

  r('microbiology', 'bacteriology', 'gt3-micro-03',
    'A 30-year-old pregnant woman who regularly eats unpasteurised soft cheese has a flu-like illness, and her baby is born septic. CSF from the neonate grows short Gram-positive rods that show tumbling motility at 25°C and are β-haemolytic. Which empirical antibiotic must be included?',
    ['Ampicillin, because cephalosporins do not cover this organism', 'Ceftriaxone alone, because it penetrates the CSF very well', 'Vancomycin alone, because the organism is Gram-positive', 'Metronidazole, because the organism is anaerobic'],
    'Listeria monocytogenes is a facultative intracellular Gram-positive bacillus that grows at refrigerator temperatures (cold enrichment), shows tumbling motility at 25°C and umbrella-shaped motility in semisolid agar, and is CAMP positive. It crosses the placenta, causing chorioamnionitis, neonatal sepsis and meningitis. Listeria is intrinsically resistant to cephalosporins, so empirical regimens for neonatal and elderly/immunocompromised meningitis include ampicillin (often with gentamicin). Co-trimoxazole is the alternative in penicillin allergy.',
    { difficulty: 'Expert', type: 'clinical-case', reference: ANANTH, integratedSubjects: ['Microbiology', 'Pediatrics', 'Pharmacology'], system: 'Infectious disease', tags: ['listeria', 'neonatal-meningitis', 'cephalosporin-resistance'] }),

  r('microbiology', 'bacteriology', 'gt3-micro-04',
    'During the monsoon, a 40-year-old paddy farmer has high fever, severe calf pain, conjunctival suffusion, jaundice and oliguria. Which test is the reference serological method for confirming the likely diagnosis?',
    ['Microscopic agglutination test', 'Weil–Felix test', 'Widal tube agglutination test', 'Paul–Bunnell heterophile test'],
    'Leptospirosis (Leptospira interrogans) is acquired through skin or mucosal contact with water contaminated by rodent urine. Severe disease (Weil disease) combines jaundice, acute kidney injury and haemorrhage; conjunctival suffusion and calf tenderness are characteristic. The microscopic agglutination test with live serovars is the serological gold standard; IgM ELISA and PCR on early blood are also used. Weil–Felix detects rickettsial antibodies, Widal enteric fever and Paul–Bunnell infectious mononucleosis. Doxycycline or penicillin is used for treatment.',
    { difficulty: 'Medium', type: 'clinical-case', reference: ANANTH, integratedSubjects: ['Microbiology', 'Community Medicine'], system: 'Infectious disease', tags: ['leptospirosis', 'mat', 'weil-disease'] }),

  r('microbiology', 'bacteriology', 'gt3-micro-05',
    'A 35-year-old from a rural hilly area has had fever for 8 days with headache and a dry cough. There is a painless black scab with a red rim in the groin and tender regional lymph nodes. Platelets are 80,000/µL and liver enzymes are raised. What is the most likely cause and treatment?',
    ['Orientia tsutsugamushi transmitted by larval trombiculid mites — doxycycline', 'Rickettsia prowazekii transmitted by body lice — chloramphenicol only', 'Bacillus anthracis from animal products — ciprofloxacin', 'Yersinia pestis transmitted by rat fleas — streptomycin'],
    'An eschar (often in hidden sites such as the groin, axilla or under the breasts), fever, regional lymphadenopathy, thrombocytopenia and transaminitis suggest scrub typhus, caused by Orientia tsutsugamushi and transmitted by chiggers (larval trombiculid mites). It is a common cause of acute undifferentiated febrile illness in India. IgM ELISA confirms it (Weil–Felix OX-K agglutination is old and insensitive). Doxycycline (or azithromycin in pregnancy and young children) is the treatment of choice. Cutaneous anthrax eschars are surrounded by marked non-pitting oedema.',
    { difficulty: 'Hard', type: 'clinical-case', reference: ANANTH, integratedSubjects: ['Microbiology', 'Medicine'], system: 'Infectious disease', tags: ['scrub-typhus', 'eschar', 'rickettsia'] }),

  r('microbiology', 'virology', 'gt3-micro-06',
    'A 28-year-old with jaundice for 3 weeks has the following hepatitis B serology: HBsAg negative, anti-HBs negative, IgM anti-HBc positive, HBeAg negative. How should these results be interpreted?',
    ['Acute hepatitis B in the window period', 'Past hepatitis B infection with natural immunity', 'Chronic hepatitis B with low replication', 'Immunity from hepatitis B vaccination'],
    'In acute infection HBsAg appears first and is cleared over weeks to months; anti-HBs may not be detectable until some time later. In the interval ("window period") the only marker may be anti-HBc, and IgM anti-HBc indicates recent infection. Past infection with immunity gives anti-HBs plus IgG anti-HBc. Chronic infection means HBsAg persisting beyond 6 months. Vaccination produces anti-HBs only, without anti-HBc.',
    { difficulty: 'Expert', type: 'standard', reference: ANANTH, integratedSubjects: ['Microbiology', 'Medicine'], system: 'Gastrointestinal', tags: ['hepatitis-b', 'serology', 'window-period'] }),

  r('microbiology', 'virology', 'gt3-micro-07',
    'A baby is born to a mother with HIV infection on antiretroviral therapy. At 6 weeks of age, which test is appropriate to diagnose HIV infection in the infant?',
    ['HIV-1 DNA PCR', 'Fourth-generation HIV antibody–antigen ELISA', 'HIV rapid antibody test', 'CD4 count and percentage'],
    'Maternal IgG anti-HIV antibodies cross the placenta and can persist up to 18 months, so antibody tests are positive in nearly all exposed infants and cannot diagnose infection. Virological tests detecting viral nucleic acid are used for early infant diagnosis (in India under NACO, typically at 6 weeks, with repeat testing per the national algorithm, and antibody testing at 18 months to confirm). A CD4 count is not diagnostic.',
    { difficulty: 'Hard', type: 'clinical-case', reference: `${ANANTH}; NACO National guidelines for HIV care and treatment`, integratedSubjects: ['Microbiology', 'Pediatrics'], system: 'Infectious disease', tags: ['hiv', 'early-infant-diagnosis', 'pcr'] }),

  r('microbiology', 'virology', 'gt3-micro-08',
    'A 22-year-old presents on the 2nd day of high fever with headache, retro-orbital pain and myalgia during a dengue outbreak. Which test is most useful for diagnosis at this stage?',
    ['NS1 antigen detection', 'IgG antibody ELISA', 'IgM antibody ELISA', 'Haemagglutination inhibition on paired sera'],
    'NS1 antigen (and RT-PCR) is detectable from day 1 to about day 5 of illness, during viraemia. IgM antibodies are usually detectable only from about day 5 onwards; IgG rises later in primary infection (and early and high in secondary infection), and paired sera are retrospective. Combining NS1 with IgM increases sensitivity across the course of illness.',
    { difficulty: 'Medium', type: 'clinical-case', reference: `${ANANTH}; National Center for Vector Borne Diseases Control (NCVBDC) dengue guidelines`, integratedSubjects: ['Microbiology', 'Medicine'], system: 'Infectious disease', tags: ['dengue', 'ns1-antigen', 'diagnosis'] }),

  r('microbiology', 'parasitology-mycology', 'gt3-micro-09',
    'A 30-year-old who returned from Odisha has fever, jaundice and is now unconscious. The peripheral smear shows many delicate ring forms, some red cells with two or more rings, and crescent-shaped gametocytes; parasitaemia is 8%. What is the drug of choice?',
    ['Intravenous artesunate', 'Oral chloroquine', 'Oral primaquine', 'Intravenous quinine as first choice in all adults'],
    'Multiple rings per cell, appliqué forms and banana-shaped gametocytes indicate Plasmodium falciparum; unconsciousness (cerebral malaria), jaundice and parasitaemia above 5% define severe malaria. Intravenous (or IM) artesunate reduces mortality compared with quinine and is the drug of choice under WHO and Indian national guidelines, followed by a full course of oral artemisinin combination therapy. Chloroquine resistance is widespread in falciparum; primaquine is a gametocytocide/hypnozoitocide, not treatment for severe disease. Quinine is used only when artesunate is unavailable.',
    { difficulty: 'Hard', type: 'clinical-case', reference: `${ANANTH}; WHO Guidelines for malaria; NCVBDC National drug policy on malaria`, guidelineVersion: 'WHO Guidelines for malaria (current consolidated edition)', integratedSubjects: ['Microbiology', 'Medicine'], system: 'Infectious disease', tags: ['falciparum', 'severe-malaria', 'artesunate'] }),

  r('microbiology', 'parasitology-mycology', 'gt3-micro-10',
    'A 54-year-old with uncontrolled diabetes and ketoacidosis develops facial swelling, a black necrotic eschar on the palate and proptosis. Biopsy shows broad, ribbon-like, mostly aseptate hyphae branching at right angles. Besides surgical debridement and correcting the ketoacidosis, which drug should be started?',
    ['Liposomal amphotericin B', 'Intravenous voriconazole', 'High-dose fluconazole', 'Caspofungin infusion'],
    'Rhino-orbito-cerebral mucormycosis (Mucorales such as Rhizopus) thrives in acidotic, hyperglycaemic patients with high free iron; the fungi invade vessels, causing necrosis. Broad, pauci-septate hyphae with right-angle branching distinguish them from Aspergillus (narrow, septate, acute-angle branching). Liposomal amphotericin B is the first-line agent, with isavuconazole or posaconazole as alternatives/step-down. Voriconazole, fluconazole and echinocandins lack reliable activity against Mucorales — voriconazole exposure even predisposes to mucormycosis.',
    { difficulty: 'Hard', type: 'clinical-case', reference: `${ANANTH}; ECMM/MSG-ERC global guideline for mucormycosis, 2019`, integratedSubjects: ['Microbiology', 'ENT'], system: 'Infectious disease', tags: ['mucormycosis', 'amphotericin-b', 'diabetes'] }),

  r('microbiology', 'parasitology-mycology', 'gt3-micro-11',
    'A 32-year-old man with HIV (CD4 count 45/µL) has had headache and fever for 2 weeks. CSF opening pressure is 34 cm H2O; India ink preparation shows round budding yeasts with wide clear haloes. Which induction treatment is recommended?',
    ['Amphotericin B with flucytosine, plus therapeutic lumbar punctures', 'Fluconazole monotherapy, starting antiretroviral therapy on the same day', 'Caspofungin with high-dose fluconazole for two weeks', 'High-dose corticosteroids to reduce the raised intracranial pressure'],
    'Cryptococcus neoformans has a polysaccharide capsule seen as a halo with India ink; CSF/serum cryptococcal antigen is the most sensitive test. Induction combines an amphotericin B formulation with flucytosine (WHO 2022 prefers a single high dose of liposomal amphotericin B with 2 weeks of flucytosine and fluconazole), followed by consolidation and maintenance fluconazole. Raised intracranial pressure is managed by repeated lumbar punctures. Antiretroviral therapy is deferred about 4–6 weeks to reduce immune reconstitution syndrome. Echinocandins have no useful activity against Cryptococcus, and steroids worsen outcomes.',
    { difficulty: 'Expert', type: 'clinical-case', reference: `${ANANTH}; WHO Guidelines for the diagnosis, prevention and management of cryptococcal disease in HIV, 2022`, guidelineVersion: 'WHO cryptococcal disease guidelines, 2022', integratedSubjects: ['Microbiology', 'Medicine'], system: 'Infectious disease', tags: ['cryptococcal-meningitis', 'hiv', 'amphotericin-b'] }),

  r('microbiology', 'parasitology-mycology', 'gt3-micro-12',
    'A shepherd who keeps dogs has a 9 cm cyst in the right lobe of the liver containing daughter cysts and "hydatid sand". In the life cycle of this parasite, what is the role of the shepherd?',
    ['Accidental intermediate (dead-end) host', 'Definitive host harbouring the adult tapeworm', 'Reservoir host transmitting infection to dogs', 'Paratenic host carrying unchanged larvae onwards'],
    'Echinococcus granulosus adult worms live in the intestine of dogs (definitive hosts); eggs passed in faeces are ingested by sheep and other livestock (intermediate hosts), in which hydatid cysts develop. Dogs are infected by eating cyst-containing offal. Humans become infected by ingesting eggs and act as accidental intermediate hosts — the cycle ends because human cysts are not eaten by dogs. Diagnostic aspiration of a suspected cyst risks anaphylaxis and spillage; treatment is albendazole with surgery or PAIR.',
    { difficulty: 'Medium', type: 'clinical-case', reference: ANANTH, integratedSubjects: ['Microbiology', 'Surgery'], system: 'Infectious disease', tags: ['hydatid-cyst', 'echinococcus', 'life-cycle'] }),

  // ============================================================== FORENSIC MEDICINE (8)
  r('forensic-medicine', 'thanatology', 'gt3-fmt-01',
    'A man is found dead in a river with weeds tightly grasped in his clenched hands; the grip cannot be relaxed without force. Other muscles are flaccid. What does this finding indicate?',
    ['Cadaveric spasm, showing he was alive on entering the water', 'Rigor mortis, indicating death 12–24 hours earlier', 'Heat stiffening from prolonged exposure to hot water', 'Cold stiffening from immersion in very cold river water'],
    'Cadaveric spasm (instantaneous rigor) is stiffening of a group of voluntary muscles at the moment of death, without a stage of primary relaxation, typically during intense emotion or exertion. It cannot be produced after death, so objects firmly grasped (weeds, a weapon) indicate that the person was alive and acting at that moment — supporting antemortem drowning or suicide with a weapon. Rigor mortis develops after a period of primary flaccidity and affects all muscles in sequence. Heat and cold stiffening are generalised.',
    { difficulty: 'Hard', type: 'clinical-case', reference: REDDY, system: 'Forensic', tags: ['cadaveric-spasm', 'drowning', 'thanatology'] }),

  r('forensic-medicine', 'thanatology', 'gt3-fmt-02',
    'At autopsy, a ligature mark on the neck runs horizontally at the level of the thyroid cartilage, completely encircles the neck with uniform depth, and has abrasions and bruising along its margins. There are scratch marks on the neck and the thyroid cartilage is fractured. Which conclusion is best supported?',
    ['Ligature strangulation, probably homicidal', 'Typical hanging with a fixed knot at the occiput', 'Throttling with the hands', 'A postmortem mark made while moving the body'],
    'In ligature strangulation the mark is usually horizontal, low on the neck (at or below the thyroid cartilage), completely encircling and of even depth, with vital reaction, and laryngeal fractures and defence or fingernail marks are common — features of homicide. In hanging the mark is oblique, high (above the thyroid cartilage), incomplete and deepest opposite the knot, where it often fades. Throttling leaves fingertip bruises and crescentic nail marks without a ligature mark. Postmortem marks lack vital reaction.',
    { difficulty: 'Expert', type: 'clinical-case', reference: REDDY, system: 'Forensic', tags: ['ligature-strangulation', 'hanging', 'asphyxia'] }),

  r('forensic-medicine', 'thanatology', 'gt3-fmt-03',
    'A firearm entry wound on the temple shows a stellate, ragged laceration with an abraded imprint of the muzzle around it and cherry-red discolouration of the underlying tissues. Which range of fire does this indicate?',
    ['Contact (muzzle pressed against the skin over bone)', 'Close range, within about 15 cm', 'Near range, within about 1 metre, with tattooing only', 'Distant range, beyond the reach of powder particles'],
    'In a hard contact wound over bone, gases enter beneath the skin, balloon it against the muzzle (leaving a muzzle imprint) and split it in a stellate pattern; carbon monoxide in the gases forms carboxyhaemoglobin/carboxymyoglobin, giving cherry-red tissues. Close-range wounds show burning, blackening and tattooing around a round entry; near-range wounds show tattooing (unburnt powder particles) without burning; distant wounds have only an abrasion collar.',
    { difficulty: 'Medium', type: 'standard', reference: REDDY, system: 'Forensic', tags: ['firearm-injury', 'contact-wound', 'range-of-fire'] }),

  r('forensic-medicine', 'medical-jurisprudence', 'gt3-fmt-04',
    'A 25-year-old woman with 80% burns is conscious and oriented. Police request a dying declaration, but the magistrate cannot arrive in time. Which statement about recording it is correct?',
    ['The doctor may record it, without oath, after certifying she is of sound mind', 'It is valid only if recorded by a magistrate in the presence of the accused', 'It must be taken on oath and attested by two independent witnesses', 'It is admissible only if she dies within 24 hours of making it'],
    'A dying declaration is a statement by a person about the cause or circumstances of their death, admissible when that person dies (Section 32(1) of the Indian Evidence Act, now Section 26 of the Bharatiya Sakshya Adhiniyam, 2023). A magistrate is preferred, but if none is available it may be recorded by a doctor or other person; the doctor first certifies that the declarant is conscious and of sound mind, records the statement as far as possible in her own words (questions and answers), and has it signed or thumb-printed and witnessed. No oath is given, the accused need not be present, and there is no time limit before death.',
    { difficulty: 'Hard', type: 'standard', reference: REDDY, guidelineVersion: 'Bharatiya Sakshya Adhiniyam, 2023 (Section 26), in force from 1 July 2024; previously Indian Evidence Act Section 32', system: 'Forensic', tags: ['dying-declaration', 'medical-jurisprudence', 'bsa-2023'] }),

  r('forensic-medicine', 'toxicology', 'gt3-fmt-05',
    'An 18-year-old took about 20 g of paracetamol 2 hours ago and is asymptomatic. When should the plasma paracetamol level be measured to decide on acetylcysteine using the treatment nomogram?',
    ['At 4 hours after ingestion', 'Immediately, at 2 hours after ingestion', 'Only if liver enzymes rise at 24 hours', 'At 12 hours, when hepatotoxicity begins'],
    'For a single acute ingestion of known time, a level taken at or after 4 hours (when absorption is essentially complete) is plotted on the treatment nomogram; earlier levels underestimate the risk and cannot be interpreted. If the 4-hour result will not be available before 8 hours post-ingestion — or the ingestion is staggered, of unknown time or very large — acetylcysteine is started without waiting, because it is almost fully protective when begun within 8 hours. Transaminases may be normal in the first 24 hours even when severe injury is evolving.',
    { difficulty: 'Hard', type: 'clinical-case', reference: `${REDDY}; Goldfrank's Toxicologic Emergencies`, integratedSubjects: ['Forensic Medicine', 'Pharmacology'], system: 'Toxicology', tags: ['paracetamol-poisoning', 'acetylcysteine', 'nomogram'] }),

  r('forensic-medicine', 'toxicology', 'gt3-fmt-06',
    'Several men become ill 18 hours after drinking illicit liquor. One has blurred vision, a hyperaemic optic disc, Kussmaul breathing, a high anion gap metabolic acidosis and a raised osmolal gap. Which metabolite is chiefly responsible for the eye damage, and what treatment is specific?',
    ['Formic acid — fomepizole and haemodialysis', 'Oxalic acid — calcium gluconate and pyridoxine', 'Acetaldehyde — disulfiram withdrawal and thiamine', 'Glycolic acid — sodium nitrite and thiosulphate'],
    'Methanol is oxidised by alcohol dehydrogenase to formaldehyde and then formic acid, which inhibits mitochondrial cytochrome oxidase in the optic nerve and retina (optic disc hyperaemia, then atrophy) and causes severe high anion gap acidosis. Fomepizole or ethanol competitively blocks alcohol dehydrogenase; haemodialysis removes methanol and formate; folinic/folic acid enhances formate breakdown; bicarbonate corrects acidosis. Oxalate and glycolate are toxic metabolites of ethylene glycol (renal failure, calcium oxalate crystals).',
    { difficulty: 'Hard', type: 'clinical-case', reference: REDDY, integratedSubjects: ['Forensic Medicine', 'Biochemistry', 'Ophthalmology'], system: 'Toxicology', tags: ['methanol', 'formic-acid', 'osmolal-gap'] }),

  r('forensic-medicine', 'toxicology', 'gt3-fmt-07',
    'A 22-year-old farm worker swallowed tablets kept in grain stores. Within an hour he is vomiting, with a garlicky odour on the breath, and develops profound hypotension unresponsive to fluids and vasopressors; ECG shows ventricular ectopics. Which statement about this poisoning is correct?',
    ['It releases phosphine; there is no specific antidote, so treatment is supportive', 'It is an organophosphate, so atropine and pralidoxime are the specific antidotes', 'It is a zinc salt, so dimercaprol (BAL) chelation is the specific antidote', 'It is a cyanide salt, so hydroxocobalamin is the specific antidote to give'],
    'Aluminium (or zinc) phosphide "celphos" tablets react with moisture and gastric acid to release phosphine, which inhibits cytochrome c oxidase and causes free-radical injury; refractory shock, myocardial toxicity, arrhythmias and acidosis carry very high mortality. A garlic or rotten-fish odour is typical, and the silver nitrate paper test turns black with phosphine. There is no specific antidote: management is supportive (gastric decontamination with care, vasopressors, magnesium, correction of acidosis, ECMO where available). Water-based lavage should be avoided as it releases more gas.',
    { difficulty: 'Expert', type: 'clinical-case', reference: REDDY, system: 'Toxicology', tags: ['aluminium-phosphide', 'phosphine', 'celphos'] }),

  r('forensic-medicine', 'toxicology', 'gt3-fmt-08',
    'A 14-year-old who slept on the floor of a hut wakes at 4 a.m. with severe abdominal pain. By morning he has bilateral ptosis, difficulty swallowing and breathlessness. No bite mark or local swelling is seen; the 20-minute whole-blood clotting test is normal. Which snake is most likely responsible?',
    ['Common krait', 'Russell\'s viper', 'Saw-scaled viper', 'Hump-nosed pit viper'],
    'The common krait (Bungarus caeruleus) is nocturnal and enters houses; it bites sleeping people on the floor, often painlessly, leaving little or no local swelling. Its presynaptic neurotoxin (β-bungarotoxin) causes descending paralysis (ptosis, ophthalmoplegia, bulbar palsy, respiratory failure) and early abdominal pain is common. Vipers (Russell\'s, saw-scaled) cause local swelling and coagulopathy, giving a positive 20WBCT; Russell\'s viper also causes acute kidney injury. Treatment is polyvalent antivenom and ventilation as needed; neostigmine responds poorly in krait bites.',
    { difficulty: 'Hard', type: 'clinical-case', reference: `${REDDY}; Ministry of Health and Family Welfare Standard Treatment Guidelines: Management of Snake Bite`, integratedSubjects: ['Forensic Medicine', 'Medicine'], system: 'Toxicology', tags: ['snake-bite', 'krait', 'neurotoxic-envenomation'] }),

  // ============================================================== COMMUNITY MEDICINE (16)
  r('community-medicine', 'epidemiology-biostatistics', 'gt3-cm-01',
    'A new rapid test for a disease has a sensitivity of 80% and a specificity of 90%. What is its positive likelihood ratio, and how should a positive result change the probability of disease?',
    ['8; a positive result substantially increases the odds of disease', '0.22; a positive result substantially increases the odds of disease', '8; a positive result decreases the odds of disease', '0.89; a positive result changes the odds very little'],
    'Positive likelihood ratio = sensitivity / (1 − specificity) = 0.80 / 0.10 = 8. Post-test odds = pre-test odds × LR, so an LR+ of 8 raises the odds of disease eightfold — a moderate-to-large shift. The negative likelihood ratio = (1 − sensitivity) / specificity = 0.20 / 0.90 ≈ 0.22, which is the figure in the distractor. Unlike predictive values, likelihood ratios do not depend on prevalence.',
    { difficulty: 'Hard', type: 'standard', reference: PARK, system: 'Community health', tags: ['likelihood-ratio', 'diagnostic-tests', 'calculation'] }),

  r('community-medicine', 'epidemiology-biostatistics', 'gt3-cm-02',
    'In a stable population, the incidence of a chronic disease is 10 per 1,000 per year and the average duration of illness is 5 years. What is the approximate prevalence?',
    ['50 per 1,000', '2 per 1,000', '10 per 1,000', '15 per 1,000'],
    'In a steady state, prevalence ≈ incidence × average duration (P = I × D) when prevalence is low. Here 10/1,000/year × 5 years = 50/1,000 (5%). Treatments that prolong survival without cure increase prevalence even if incidence is unchanged; effective cures or rapid deaths reduce it.',
    { difficulty: 'Medium', type: 'standard', reference: PARK, system: 'Community health', tags: ['prevalence', 'incidence', 'calculation'] }),

  r('community-medicine', 'epidemiology-biostatistics', 'gt3-cm-03',
    'In a case-control study of oral cancer, 40 of 100 cases and 20 of 100 controls chewed tobacco. What is the odds ratio?',
    ['2.67', '2.00', '0.37', '1.50'],
    'Odds of exposure in cases = 40/60; in controls = 20/80. Odds ratio = (40 × 80) / (60 × 20) = 3,200 / 1,200 ≈ 2.67. Dividing the proportions exposed (0.40/0.20 = 2.0) gives a risk-ratio-like figure that is not valid in a case-control design, because the investigator fixes the number of cases and controls. When the disease is rare, the odds ratio approximates the relative risk.',
    { difficulty: 'Hard', type: 'standard', reference: PARK, system: 'Community health', tags: ['odds-ratio', 'case-control', 'calculation'] }),

  r('community-medicine', 'epidemiology-biostatistics', 'gt3-cm-04',
    'Why is randomisation considered the best method of dealing with confounding in an intervention study?',
    ['It balances known and unknown confounders between groups', 'It removes the need for blinding of participants and assessors', 'It eliminates selection bias in who is enrolled in the trial', 'It guarantees that the results apply to the general population'],
    'Random allocation makes treatment assignment independent of participant characteristics, so with adequate numbers both measured and unmeasured confounders are balanced between arms. Matching, restriction, stratification and multivariable adjustment control only the confounders the investigator knows about and measures. Randomisation does not replace blinding (which reduces performance and assessment bias), does not affect who is recruited (generalisability depends on the study population), and allocation concealment is needed to protect it.',
    { difficulty: 'Medium', type: 'standard', reference: PARK, system: 'Community health', tags: ['randomisation', 'confounding', 'rct'] }),

  r('community-medicine', 'epidemiology-biostatistics', 'gt3-cm-05',
    'A new screening programme for a cancer reports that 5-year survival after diagnosis rose from 40% to 65%, yet the age-adjusted death rate from that cancer in the population has not changed. Which bias best explains the apparent benefit?',
    ['Lead-time bias', 'Berkson\'s bias', 'Recall bias', 'Hawthorne effect'],
    'Screening detects disease earlier; even if earlier treatment does not change the time of death, survival measured from diagnosis appears longer — lead-time bias. Length-time bias (screening preferentially picks up slow-growing, better-prognosis tumours) and overdiagnosis can produce the same illusion. This is why the best evidence for screening is a fall in disease-specific mortality in a randomised trial. Berkson\'s bias arises in hospital-based studies; recall bias in case-control studies; the Hawthorne effect is a change in behaviour from being observed.',
    { difficulty: 'Hard', type: 'standard', reference: PARK, system: 'Community health', tags: ['lead-time-bias', 'screening', 'bias'] }),

  r('community-medicine', 'epidemiology-biostatistics', 'gt3-cm-06',
    'In a study of 30 people, an investigator wants to test whether smoking (yes/no) is associated with chronic cough (yes/no). Two of the four cells in the 2×2 table have expected counts below 5. Which test is most appropriate?',
    ['Fisher\'s exact test', 'Pearson\'s chi-square test without correction', 'Unpaired t-test', 'Pearson correlation coefficient'],
    'Two categorical variables are compared with the chi-square test, but its approximation is unreliable when expected frequencies are small (commonly, any expected count <5 in a 2×2 table). Fisher\'s exact test calculates the exact probability and is preferred then. The t-test compares means of continuous data; Pearson correlation measures linear association between two continuous variables.',
    { difficulty: 'Hard', type: 'standard', reference: PARK, system: 'Community health', tags: ['fisher-exact-test', 'chi-square', 'statistical-tests'] }),

  r('community-medicine', 'national-health-programs', 'gt3-cm-07',
    'An auxiliary nurse midwife suspects that the vials in an ice-lined refrigerator were frozen during a power fluctuation. Which vaccine should be checked with the shake test before use?',
    ['Pentavalent (DPT–HepB–Hib) vaccine', 'Oral polio vaccine', 'Measles–rubella vaccine', 'Lyophilised BCG vaccine'],
    'Adsorbed (aluminium-adjuvanted) vaccines — DPT, pentavalent, hepatitis B, Td, PCV — lose potency if frozen, and the shake test (comparing sedimentation with a deliberately frozen control vial of the same batch) detects freezing damage; frozen vials must be discarded. OPV is the most heat-sensitive vaccine and is stored frozen at district level and above; measles–rubella and BCG (lyophilised) are heat- and light-sensitive but are not damaged by freezing. Vaccine vial monitors indicate heat exposure, not freezing.',
    { difficulty: 'Medium', type: 'clinical-case', reference: `${PARK}; MoHFW Immunization Handbook for Health Workers`, system: 'Community health', tags: ['cold-chain', 'shake-test', 'immunisation'] }),

  r('community-medicine', 'nutrition-mch', 'gt3-cm-08',
    'A healthy 9-month-old girl is brought for her scheduled visit under the Universal Immunization Programme in a district without Japanese encephalitis. Along with the first dose of measles–rubella vaccine, which supplement is due?',
    ['Vitamin A 1 lakh IU orally', 'Vitamin A 2 lakh IU orally', 'Iron–folic acid syrup daily for 100 days', 'Zinc 20 mg daily for 14 days'],
    'Under the national programme, the first dose of vitamin A (100,000 IU) is given at 9 months with MR-1; from 16–18 months, 200,000 IU is given every 6 months up to 5 years (a total of 9 doses). Iron–folic acid syrup under Anaemia Mukt Bharat is given biweekly to children 6–59 months, not as a 100-day course. Zinc with ORS is for diarrhoea treatment.',
    { difficulty: 'Medium', type: 'clinical-case', reference: `${PARK}; MoHFW Universal Immunization Programme schedule`, system: 'Community health', tags: ['vitamin-a', 'uip', 'immunisation-schedule'] }),

  r('community-medicine', 'national-health-programs', 'gt3-cm-09',
    'The district surveillance unit reports 14 cases of acute watery diarrhoea from one village in 3 days, compared with 1–2 cases a week normally. What is the first step in investigating this possible outbreak?',
    ['Verify the diagnosis and confirm that an outbreak exists', 'Start mass chemoprophylaxis for the whole village', 'Formulate and test hypotheses about the source', 'Write the final report and recommendations'],
    'Outbreak investigation begins by verifying the diagnosis (clinical review, laboratory confirmation) and confirming the existence of an epidemic by comparing the observed number with the expected number — an apparent rise may reflect better reporting, a change in case definition or misdiagnosis. Then a case definition is established, cases are found and counted, data are described by time, place and person, hypotheses are formed and tested, control measures are implemented (often in parallel) and findings are communicated.',
    { difficulty: 'Hard', type: 'clinical-case', reference: PARK, system: 'Community health', tags: ['outbreak-investigation', 'epidemic', 'surveillance'] }),

  r('community-medicine', 'national-health-programs', 'gt3-cm-10',
    'An infection has a basic reproduction number (R0) of 6. A vaccine is 90% effective in preventing infection. What proportion of the population must be vaccinated to achieve herd immunity?',
    ['About 93%', 'About 83%', 'About 75%', 'About 90%'],
    'Herd immunity threshold = 1 − 1/R0 = 1 − 1/6 ≈ 0.833 (83%) of the population must be immune. Because only 90% of vaccinated people become immune, the coverage required = 0.833 / 0.90 ≈ 0.926, i.e., about 93%. Higher R0 (e.g., measles, 12–18) and lower vaccine effectiveness push the required coverage towards or beyond 100%, which is why a second dose is used.',
    { difficulty: 'Expert', type: 'standard', reference: PARK, system: 'Community health', tags: ['herd-immunity', 'r0', 'vaccine-effectiveness', 'calculation'] }),

  r('community-medicine', 'nutrition-mch', 'gt3-cm-11',
    'Under the National Iodine Deficiency Disorders Control Programme, what is the minimum iodine content of iodised salt required at the consumer level?',
    ['15 ppm', '30 ppm', '5 ppm', '50 ppm'],
    'Indian regulations require iodised salt to contain not less than 30 ppm of iodine at the production level and not less than 15 ppm at the consumer level, allowing for losses during storage and transport. Household salt can be checked with a spot testing kit, and urinary iodine excretion is the indicator of population iodine status (median ≥100 µg/L adequate).',
    { difficulty: 'Medium', type: 'standard', reference: PARK, system: 'Community health', tags: ['iodine', 'nidddcp', 'salt-iodisation'] }),

  r('community-medicine', 'nutrition-mch', 'gt3-cm-12',
    'In a district during one year there were 25,000 live births, 24,000 women aged 15–49 years and 30 deaths from causes related to pregnancy within 42 days of its end. What is the maternal mortality ratio?',
    ['120 per 100,000 live births', '125 per 100,000 women aged 15–49', '1.2 per 1,000 live births per 100 women', '30 per 1,000 live births'],
    'Maternal mortality ratio = maternal deaths / live births × 100,000 = 30 / 25,000 × 100,000 = 120. The denominator is live births (a proxy for the number of pregnancies at risk). The maternal mortality rate uses women of reproductive age as the denominator (here 30 / 24,000 × 100,000 = 125 per 100,000 women), which reflects both obstetric risk and fertility.',
    { difficulty: 'Medium', type: 'standard', reference: PARK, system: 'Community health', tags: ['maternal-mortality-ratio', 'health-indicators', 'calculation'] }),

  r('community-medicine', 'occupational-environmental', 'gt3-cm-13',
    'A 38-year-old battery-recycling worker has colicky abdominal pain, constipation, a blue line on the gums and wrist drop. Blood film shows basophilic stippling. Which enzyme inhibition explains the anaemia and the raised urinary δ-aminolevulinic acid?',
    ['δ-Aminolevulinic acid dehydratase and ferrochelatase', 'Uroporphyrinogen decarboxylase and porphobilinogen deaminase', 'Pyrimidine 5′-nucleotidase only', 'Glucose-6-phosphate dehydrogenase'],
    'Lead inhibits ALA dehydratase (so ALA accumulates and appears in urine) and ferrochelatase (zinc protoporphyrin rises instead of haem), producing a microcytic anaemia; inhibition of pyrimidine 5′-nucleotidase causes retained RNA — basophilic stippling. Peripheral neuropathy (wrist drop), colic and the Burtonian line complete the picture. Blood lead is the best measure of recent exposure. Uroporphyrinogen decarboxylase deficiency causes porphyria cutanea tarda, and PBG deaminase deficiency acute intermittent porphyria.',
    { difficulty: 'Hard', type: 'clinical-case', reference: PARK, integratedSubjects: ['Community Medicine', 'Biochemistry'], system: 'Community health', tags: ['lead-poisoning', 'plumbism', 'occupational-health'] }),

  r('community-medicine', 'occupational-environmental', 'gt3-cm-14',
    'When drinking water is chlorinated, what level of free residual chlorine should be present after a contact period of one hour?',
    ['0.5 mg/L', '0.05 mg/L', '2 mg/L', '5 mg/L'],
    'Chlorine is added beyond the "break point" (when chlorine demand from ammonia and organic matter is met) so that a free residual remains. A minimum free residual chlorine of 0.5 mg/L after a contact time of one hour ensures water is disinfected and provides protection against recontamination in the distribution system. Orthotoluidine (or DPD) tests measure the residual. Higher doses are used for super-chlorination; 5 mg/L would make water unpalatable for routine use.',
    { difficulty: 'Medium', type: 'standard', reference: PARK, system: 'Community health', tags: ['chlorination', 'water-purification', 'residual-chlorine'] }),

  r('community-medicine', 'epidemiology-biostatistics', 'gt3-cm-15',
    'In a household of 6 people, a child develops measles. One adult in the house is already immune from past infection. Within one incubation period, two more family members develop measles. What is the secondary attack rate?',
    ['50%', '33%', '40%', '67%'],
    'Secondary attack rate = number of secondary cases among contacts within one incubation period / number of susceptible contacts × 100. Susceptible contacts = 6 total − 1 primary case − 1 immune person = 4. SAR = 2/4 = 50%. Including the immune adult in the denominator gives 40% (2/5); including the primary case gives 33% (2/6).',
    { difficulty: 'Expert', type: 'standard', reference: PARK, system: 'Community health', tags: ['secondary-attack-rate', 'measles', 'calculation'] }),

  r('community-medicine', 'national-health-programs', 'gt3-cm-16',
    'According to the population norms of the Indian Public Health Standards for the rural public health system in the plains, which population does one primary health centre serve?',
    ['30,000', '5,000', '1,20,000', '3,000'],
    'IPHS population norms (plains/hilly–tribal): sub-centre (now Ayushman Arogya Mandir–SHC) 5,000 / 3,000; primary health centre 30,000 / 20,000; community health centre 1,20,000 / 80,000. A CHC acts as a first referral unit for four PHCs.',
    { difficulty: 'Medium', type: 'standard', reference: `${PARK}; Indian Public Health Standards (IPHS) 2022`, guidelineVersion: 'Indian Public Health Standards, 2022', system: 'Community health', tags: ['iphs', 'health-system', 'phc'] }),
]
