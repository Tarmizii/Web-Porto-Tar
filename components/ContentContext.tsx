import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PROJECTS as DEFAULT_PROJECTS, SERVICES as DEFAULT_SERVICES, CONTACT_INFO as DEFAULT_CONTACT } from '../constants';
import { Project, Service } from '../types';

interface ContentContextType {
  projects: Project[];
  services: Service[];
  contactInfo: typeof DEFAULT_CONTACT;
  updateProjects: (projects: Project[]) => void;
  updateServices: (services: Service[]) => void;
  updateContactInfo: (info: typeof DEFAULT_CONTACT) => void;
  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [contactInfo, setContactInfo] = useState(DEFAULT_CONTACT);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('cms_projects');
    const savedServices = localStorage.getItem('cms_services');
    const savedContact = localStorage.getItem('cms_contact');

    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedServices) setServices(JSON.parse(savedServices));
    if (savedContact) setContactInfo(JSON.parse(savedContact));
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cms_projects', JSON.stringify(projects));
      localStorage.setItem('cms_services', JSON.stringify(services));
      localStorage.setItem('cms_contact', JSON.stringify(contactInfo));
    }
  }, [projects, services, contactInfo, isLoaded]);

  const updateProjects = (newProjects: Project[]) => setProjects(newProjects);
  const updateServices = (newServices: Service[]) => setServices(newServices);
  const updateContactInfo = (newInfo: typeof DEFAULT_CONTACT) => setContactInfo(newInfo);

  const resetToDefaults = () => {
    setProjects(DEFAULT_PROJECTS);
    setServices(DEFAULT_SERVICES);
    setContactInfo(DEFAULT_CONTACT);
    localStorage.removeItem('cms_projects');
    localStorage.removeItem('cms_services');
    localStorage.removeItem('cms_contact');
  };

  return (
    <ContentContext.Provider value={{ 
      projects, 
      services, 
      contactInfo, 
      updateProjects, 
      updateServices, 
      updateContactInfo,
      resetToDefaults
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