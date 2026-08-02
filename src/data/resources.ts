import type { SubjectSlug } from '../types'

export interface BookResource {
  title: string
  author: string
  subject: SubjectSlug | 'General'
  description: string
  pdfFile?: string
}

export const books: BookResource[] = [
  { title: "BD Chaurasia's Human Anatomy", author: 'BD Chaurasia', subject: 'anatomy', description: 'The standard, most widely used Indian anatomy reference across all three volumes.' },
  { title: 'Textbook of Medical Physiology', author: 'Guyton & Hall', subject: 'physiology', description: 'The definitive physiology reference, covering every organ system in depth.' },
  { title: "Harper's Illustrated Biochemistry", author: 'Various (Lange series)', subject: 'biochemistry', description: 'Concise, high-yield coverage of metabolism, molecular biology, and clinical correlations.' },
  { title: 'Robbins Basic Pathology', author: 'Kumar, Abbas & Aster', subject: 'pathology', description: 'The gold-standard pathology text — general and systemic pathology with excellent clinical correlation.' },
  { title: 'Essentials of Medical Pharmacology', author: 'KD Tripathi', subject: 'pharmacology', description: 'The most widely used Indian pharmacology textbook, known for its clarity and exam-oriented style.' },
  { title: "Ananthanarayan and Paniker's Textbook of Microbiology", author: 'CK Jayaram Paniker', subject: 'microbiology', description: 'Standard Indian microbiology reference covering bacteriology, virology, and parasitology.' },
  { title: 'The Essentials of Forensic Medicine and Toxicology', author: 'KS Narayan Reddy', subject: 'forensic-medicine', description: 'The classic Indian forensic medicine and toxicology text, widely used for exam prep.' },
  { title: 'Park\'s Textbook of Preventive and Social Medicine', author: 'K Park', subject: 'community-medicine', description: 'The definitive Indian community medicine reference — epidemiology, biostatistics, and national health programs.' },
  { title: "Harrison's Principles of Internal Medicine", author: 'Various (McGraw Hill)', subject: 'medicine', description: 'The world\'s leading internal medicine reference, covering every major clinical topic in depth.' },
  { title: "Bailey & Love's Short Practice of Surgery", author: 'Norman Williams et al.', subject: 'surgery', description: 'The classic comprehensive general surgery reference used worldwide.' },
  { title: 'Williams Obstetrics', author: 'F. Gary Cunningham et al.', subject: 'obg', description: 'The definitive obstetrics reference, complemented by DC Dutta\'s Textbook of Gynecology for gynec topics.' },
  { title: 'Nelson Textbook of Pediatrics', author: 'Robert Kliegman et al.', subject: 'pediatrics', description: 'The leading global pediatrics reference, alongside Ghai Essential Pediatrics for the Indian context.' },
  { title: "Apley's System of Orthopaedics and Fractures", author: 'Louis Solomon et al.', subject: 'orthopedics', description: 'A comprehensive, clearly illustrated orthopedics and trauma reference.' },
  { title: "Dhingra's Diseases of Ear, Nose and Throat", author: 'PL Dhingra', subject: 'ent', description: 'The standard Indian ENT textbook, concise and exam-focused.' },
  { title: "Parson's Diseases of the Eye", author: 'Various (Elsevier)', subject: 'ophthalmology', description: 'A classic, comprehensive ophthalmology reference, alongside AK Khurana\'s Ophthalmology.' },
  { title: 'IADVL Textbook of Dermatology', author: 'Indian Association of Dermatologists', subject: 'dermatology', description: 'The authoritative Indian dermatology, venereology, and leprology reference.' },
  { title: "Kaplan & Sadock's Synopsis of Psychiatry", author: 'Benjamin Sadock et al.', subject: 'psychiatry', description: 'The most widely used psychiatry reference for clinical and exam preparation.' },
  { title: "Grainger & Allison's Diagnostic Radiology", author: 'Various (Elsevier)', subject: 'radiology', description: 'A comprehensive radiology reference covering imaging patterns across every organ system.' },
  { title: "Miller's Anesthesia", author: 'Ronald Miller et al.', subject: 'anesthesia', description: 'The definitive anesthesiology reference, covering general, regional, and critical care anesthesia.' },
  { title: 'Self Assessment & Review series (subject-wise)', author: 'Various authors', subject: 'General', description: 'Subject-wise MCQ review books commonly used alongside standard textbooks for exam-pattern practice.' },
]

export function bookSearchUrl(book: BookResource) {
  const q = encodeURIComponent(`${book.title} ${book.author} book`)
  return `https://www.google.com/search?q=${q}`
}

/** Where to send "Find This Book" — an in-app PDF path if available, else an external search fallback. */
export function bookLinkTarget(book: BookResource): { href: string; internal: boolean } {
  if (book.pdfFile) return { href: `/books/${book.pdfFile}`, internal: true }
  return { href: bookSearchUrl(book), internal: false }
}
