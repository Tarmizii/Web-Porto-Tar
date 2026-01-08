export interface Project {
  id: string;
  title: string;
  category: string;
  role: string;
  tools: string[];
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  
  // Case Study Details
  background?: string;
  problem?: string;
  process?: string[];
  solution?: string;
  results?: string;
  artifactLink?: string;
}

export interface Service {
  title: string;
  description: string;
  outcomes: string[];
  icon: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}