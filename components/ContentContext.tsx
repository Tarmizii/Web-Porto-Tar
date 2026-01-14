import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PROJECTS as DEFAULT_PROJECTS, SERVICES as DEFAULT_SERVICES, CONTACT_INFO as DEFAULT_CONTACT } from '../constants';
import { Project, Service } from '../types';
import { supabase } from '../lib/supabaseClient';

interface ContentContextType {
  projects: Project[];
  services: Service[];
  contactInfo: typeof DEFAULT_CONTACT;
  cvUrl: string;
  loading: boolean;
  refreshProjects: () => Promise<void>;
  updateServices: (services: Service[]) => void;
  updateContactInfo: (info: typeof DEFAULT_CONTACT) => void;
  // Kept for compatibility but might warn or be no-op if handled by refresh
  updateProjects: (projects: Project[]) => void; 
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [contactInfo, setContactInfo] = useState(DEFAULT_CONTACT);
  const [loading, setLoading] = useState(true);

  const [cvUrl, setCvUrl] = useState<string>('');

  const fetchContent = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch Projects
      const { data: projectData, error: projectError } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      
      if (projectError) console.error('Error fetching projects:', projectError);
      
      if (projectData && projectData.length > 0) {
        const mappedProjects: Project[] = projectData.map((row: any) => ({
            id: row.id,
            title: row.title,
            category: row.category || 'UI/UX Design',
            thumbnail: row.image_url || '',
            shortDescription: row.description || '',
            role: row.details?.role || '',
            tools: row.details?.tools || [],
            fullDescription: row.details?.fullDescription || '',
            background: row.details?.background || '',
            problem: row.details?.problem || '',
            process: row.details?.process || [],
            solution: row.details?.solution || '',
            results: row.details?.results || '',
            artifactLink: row.details?.artifactLink || ''
        }));
        setProjects(mappedProjects);
      }

      // 2. Fetch Profile (CV)
      const { data: profileData, error: profileError } = await supabase.from('profiles').select('cv_url').limit(1).single();
      
      if (profileError && profileError.code !== 'PGRST116') { // Ignore no rows error
         console.error('Error fetching profile:', profileError);
      }
      
      if (profileData) {
          setCvUrl(profileData.cv_url || '');
      }

    } catch (err) {
      console.error('Unexpected error fetching content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
    
    // Load other settings from localStorage
    const savedServices = localStorage.getItem('cms_services');
    const savedContact = localStorage.getItem('cms_contact');

    if (savedServices) setServices(JSON.parse(savedServices));
    if (savedContact) setContactInfo(JSON.parse(savedContact));
  }, []);

  useEffect(() => {
     // Save local-only settings
     localStorage.setItem('cms_services', JSON.stringify(services));
     localStorage.setItem('cms_contact', JSON.stringify(contactInfo));
  }, [services, contactInfo]);

  const refreshProjects = async () => {
      await fetchContent();
  };

  const updateServices = (newServices: Service[]) => setServices(newServices);
  const updateContactInfo = (newInfo: typeof DEFAULT_CONTACT) => setContactInfo(newInfo);
  
  // For backward compatibility with Admin.tsx before refactor, 
  // but really we should use refreshProjects after mutations.
  const updateProjects = (newProjects: Project[]) => {
      setProjects(newProjects);
  };

  return (
    <ContentContext.Provider value={{ 
      projects, 
      services, 
      contactInfo, 
      cvUrl,
      loading,
      refreshProjects,
      updateProjects, 
      updateServices, 
      updateContactInfo
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};