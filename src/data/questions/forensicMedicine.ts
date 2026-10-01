import type { Topic } from '../../types'

export const forensicMedicineTopics: Topic[] = [
  {
    id: 'thanatology',
    name: 'Forensic Pathology (Thanatology)',
    description: 'Postmortem changes, time since death, and asphyxial deaths.',
    questions: [
      {
        id: 'fmt-1',
        text: 'Rigor mortis typically begins to appear (in a temperate climate) after death within approximately:',
        options: [
          '12-24 hours, complete by 48 hours',
          'Immediately at the moment of death',
          '1-2 hours, complete by 12 hours',
          '30 minutes, complete by 2 hours',
        ],
        correctIndex: 2,
        explanation:
          'Rigor mortis classically begins within 1-2 hours after death (starting in small muscles, e.g., face/jaw, per the "law of Nysten"), becomes complete by about 12 hours, persists roughly 12-24 hours more, then resolves in the same order it appeared.',
        reference: "Reddy's The Essentials of Forensic Medicine and Toxicology",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['rigor-mortis', 'time-since-death'],
      },
      {
        id: 'fmt-2',
        text: 'A drowning victim\'s autopsy shows fine, moist, mushroom-shaped froth at the mouth/nostrils. This finding is:',
        options: [
          'A classic (though not absolute) sign supportive of death by drowning',
          'Specific for poisoning',
          'Seen exclusively in postmortem submersion with no relation to cause of death',
          'Diagnostic only of strangulation',
        ],
        correctIndex: 0,
        explanation:
          'Fine, white/pink, mushroom-shaped froth at the mouth and nostrils (from mixing of air, water, mucus, and surfactant) is a classic supportive — though not absolutely pathognomonic — sign of drowning, and often reappears if wiped away.',
        reference: "Reddy's The Essentials of Forensic Medicine and Toxicology",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['drowning', 'asphyxia'],
      },
      {
        id: 'fmt-3',
        text: 'A ligature mark that is oblique, non-continuous, and situated above the thyroid cartilage is most typical of:',
        options: [
          'Hanging',
          'Strangulation by ligature',
          'Manual strangulation (throttling)',
          'Postmortem artifact from clothing',
        ],
        correctIndex: 0,
        explanation:
          'In hanging, the ligature mark is classically oblique, non-continuous (interrupted at the point of suspension), and situated above the thyroid cartilage, reflecting the upward pull of the noose by body weight — contrasting with the typically horizontal, complete mark of ligature strangulation.',
        reference: "Reddy's The Essentials of Forensic Medicine and Toxicology",
        difficulty: 'Medium',
        type: 'standard',
        tags: ['hanging', 'asphyxia'],
      },
      {
        id: 'fmt-4',
        text: "Assertion (A): Livor mortis can help estimate the time since death and detect movement of the body after death.\nReason (R): Lividity becomes fixed within about 30 minutes of death.",
        options: [
          "Both A and R are true, and R is the correct explanation of A",
          "Both A and R are true, but R is NOT the correct explanation of A",
          "A is true but R is false",
          "A is false but R is true",
        ],
        correctIndex: 2,
        explanation:
          "A is true; R is false. Lividity appears within about 30 minutes to 2 hours but usually becomes fixed (non-blanching) only after about 6–12 hours. Before fixation it shifts if the body is moved, which is why its pattern helps detect repositioning.",
        reference: "Reddy's The Essentials of Forensic Medicine and Toxicology",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['livor-mortis'],
      },
    ],
  },
  {
    id: 'medical-jurisprudence',
    name: 'Medical Jurisprudence',
    description: 'Consent, medical negligence, and documentation.',
    questions: [
      {
        id: 'fmt-5',
        text: 'The legal doctrine "res ipsa loquitur" ("the thing speaks for itself"), sometimes invoked in medical negligence cases, means:',
        options: [
          'A rule requiring double documentation of every procedure',
          'Negligence can be inferred from the very nature of the injury without direct evidence of a specific negligent act',
          'The doctrine that consent, once given, cannot be withdrawn',
          'The patient must always provide expert testimony to prove negligence',
        ],
        correctIndex: 1,
        explanation:
          'Res ipsa loquitur allows an inference of negligence purely from the occurrence of an injury that would not normally happen without negligence (e.g., a surgical instrument left inside a patient), shifting the burden to the defendant to explain.',
        reference: "Reddy's The Essentials of Forensic Medicine and Toxicology",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['negligence'],
      },
      {
        id: 'fmt-6',
        text: 'An unconscious trauma patient requires emergency life-saving surgery and cannot provide consent, with no relative available. The applicable legal principle is:',
        options: [
          'The doctrine of implied/emergency consent — treatment may proceed in the patient\'s best interest',
          'Consent must be obtained from any bystander present',
          'The hospital administrator must personally authorize every such case',
          'Treatment must be withheld until a court order is obtained',
        ],
        correctIndex: 0,
        explanation:
          'Under the emergency/implied consent doctrine, a physician may proceed with necessary life-saving treatment for an unconscious patient without explicit consent, since a reasonable person would be presumed to consent to treatment that preserves life or prevents serious harm.',
        reference: "Reddy's The Essentials of Forensic Medicine and Toxicology",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['consent', 'emergency-care'],
      },
      {
        id: 'fmt-7',
        text: 'A dying declaration recorded by a magistrate is admissible in an Indian court of law primarily because:',
        options: [
          'It requires no witness or corroboration ever',
          'It is presumed a person facing imminent death has no reason to lie',
          'It is legally equivalent to sworn courtroom testimony under oath',
          'It can only be recorded by a treating doctor, never a magistrate',
        ],
        correctIndex: 1,
        explanation:
          "A dying declaration is admissible on the principle \"nemo moriturus praesumitur mentire\" — a person facing death is presumed not to lie. In India it is covered by Section 32(1) of the Indian Evidence Act, now carried into Section 26 of the Bharatiya Sakshya Adhiniyam, 2023. Unlike English law, Indian law does not require that the declarant expected to die when making the statement. It is preferably recorded by a magistrate, but a doctor or police officer may record it if no magistrate is available; the doctor should certify that the person was conscious and fit to give the statement.",
        reference: "Reddy's The Essentials of Forensic Medicine and Toxicology",
        difficulty: 'Medium',
        type: 'standard',
        tags: ['dying-declaration'],
      },
      {
        id: 'fmt-8',
        text: "Match each medico-legal term with its correct description:",
        options: [
          "Informed consent → disclosure of the nature, risks, benefits and alternatives before a procedure; Medical certificate → a written statement of facts found on examination; Dying declaration → a statement about the cause or circumstances of the declarant's own death",
          "Informed consent → a written statement of facts found on examination; Medical certificate → disclosure of the nature, risks, benefits and alternatives before a procedure; Dying declaration → a statement about the cause or circumstances of the declarant's own death",
          "Informed consent → disclosure of the nature, risks, benefits and alternatives before a procedure; Medical certificate → a statement about the cause or circumstances of the declarant's own death; Dying declaration → a written statement of facts found on examination",
          "Informed consent → a statement about the cause or circumstances of the declarant's own death; Medical certificate → a written statement of facts found on examination; Dying declaration → disclosure of the nature, risks, benefits and alternatives before a procedure",
        ],
        correctIndex: 0,
        explanation:
          "Informed consent requires disclosing the nature, risks, benefits and alternatives of a proposed intervention. A medical certificate is a written statement of facts the doctor found on examination (fitness, illness, injury, cause of death). A dying declaration is a statement by a person about the cause of their death or the circumstances leading to it; in India (Section 26, Bharatiya Sakshya Adhiniyam, 2023) it is admissible even if the person did not expect to die.",
        reference: "Reddy's The Essentials of Forensic Medicine and Toxicology",
        difficulty: 'Medium',
        type: 'match-following',
        tags: ['medico-legal-documents'],
        matchPairs: [
          { left: 'Informed consent', right: 'Pre-procedure risk/benefit disclosure' },
          { left: 'Medical certificate', right: 'Formal statement of examined fact' },
          { left: 'Dying declaration', right: 'Statement believing death is imminent' },
        ],
      },
    ],
  },
  {
    id: 'toxicology',
    name: 'Toxicology',
    description: 'Common poisonings and their antidotes.',
    questions: [
      {
        id: 'fmt-9',
        text: 'A patient presents with pinpoint pupils, respiratory depression, and reduced consciousness after a suspected opioid overdose. The specific antidote is:',
        options: [
          'Flumazenil',
          'Naloxone',
          'N-acetylcysteine',
          'Atropine',
        ],
        correctIndex: 1,
        explanation:
          'Naloxone is a competitive opioid receptor antagonist used to reverse opioid-induced respiratory depression and CNS depression; flumazenil reverses benzodiazepines, atropine treats organophosphate/cholinergic toxicity, and N-acetylcysteine treats paracetamol overdose.',
        reference: "Reddy's The Essentials of Forensic Medicine and Toxicology",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['antidotes', 'opioid-toxicity'],
      },
      {
        id: 'fmt-10',
        text: 'A farmer presents with excessive salivation, lacrimation, urination, diarrhea, GI distress, and emesis (the "SLUDGE" syndrome) after pesticide exposure. The most likely toxin and its antidote are:',
        options: [
          'Paraquat poisoning; treated with naloxone',
          'Aluminium phosphide poisoning; treated with N-acetylcysteine',
          'Carbon monoxide poisoning; treated with atropine',
          'Organophosphate poisoning; treated with atropine and pralidoxime',
        ],
        correctIndex: 3,
        explanation:
          'Organophosphates inhibit acetylcholinesterase, causing cholinergic excess (SLUDGE symptoms plus bronchospasm/bronchorrhea). Atropine reverses muscarinic effects; pralidoxime (2-PAM) reactivates acetylcholinesterase if given early, before "aging" of the enzyme-inhibitor complex.',
        reference: "Reddy's The Essentials of Forensic Medicine and Toxicology",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['organophosphate-poisoning'],
        clinicalPearl: 'Pralidoxime is most effective when given early, before enzyme "aging" makes the block irreversible.',
      },
      {
        id: 'fmt-11',
        text: 'Cherry-red discoloration of skin/mucosa and blood at autopsy is classically associated with poisoning by:',
        options: [
          'Cyanide',
          'Arsenic',
          'Carbon monoxide',
          'Lead',
        ],
        correctIndex: 2,
        explanation:
          'Carbon monoxide poisoning classically produces cherry-red livor and blood discoloration due to carboxyhemoglobin formation (though cyanide poisoning can also occasionally show a similar cherry-red hue) — an important autopsy clue in suspected CO poisoning/fire deaths.',
        reference: "Reddy's The Essentials of Forensic Medicine and Toxicology",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['carbon-monoxide'],
      },
      {
        id: 'fmt-12',
        text: 'Assertion (A): Aluminium phosphide poisoning carries a very high mortality rate.\nReason (R): It releases phosphine gas on contact with moisture/gastric acid, causing cellular hypoxia through mitochondrial cytochrome oxidase inhibition.',
        options: [
          'Both A and R are true, and R is the correct explanation of A',
          'Both A and R are true, but R is NOT the correct explanation of A',
          'A is true but R is false',
          'A is false but R is true',
        ],
        correctIndex: 0,
        explanation:
          'Aluminium phosphide (a common grain fumigant/rodenticide) reacts with gastric HCl and moisture to release phosphine gas, which inhibits mitochondrial cytochrome c oxidase, causing severe cellular hypoxia, refractory shock, and myocarditis — with no proven specific antidote, hence very high mortality.',
        reference: "Reddy's The Essentials of Forensic Medicine and Toxicology",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['aluminium-phosphide'],
      },
    ],
  },
]
