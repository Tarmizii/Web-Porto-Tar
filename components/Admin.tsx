import React, { useState, useRef } from 'react';
import { useContent } from './ContentContext';
import { ArrowLeft, Plus, Trash2, Layout, Terminal, Image as ImageIcon, Briefcase, Wrench, Upload, Link as LinkIcon, FileText, Target, Layers, Trophy, X, Save, User, Lock, AlertTriangle, Loader2, AlertCircle, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';

const Admin: React.FC = () => {
  // --- STATE EXTENSIONS ---
  const { projects, refreshProjects } = useContent();
  const [alertInfo, setAlertInfo] = useState<{ message: string; type: 'success' | 'error' | null } | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const initialProjectState: Project = {
    id: '',
    title: '',
    category: 'UI/UX Design',
    role: '',
    tools: [],
    shortDescription: '',
    fullDescription: '',
    thumbnail: '',
    background: '',
    problem: '',
    process: [],
    solution: '',
    results: '',
    artifactLink: ''
  };
  const [formData, setFormData] = useState<Project>(initialProjectState);
  
  const [toolsInput, setToolsInput] = useState('');
  const [processInput, setProcessInput] = useState('');

  // --- AUTH CHECK ON MOUNT ---
  React.useEffect(() => {
    const checkSession = async () => {
      try {
        const { supabase } = await import('../lib/supabaseClient');
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Session check failed', err);
      }
    };
    checkSession();
  }, []);

  // --- HELPER: SHOW ALERT ---
  const showAlert = (message: string, type: 'success' | 'error') => {
    setAlertInfo({ message, type });
    setTimeout(() => setAlertInfo(null), 3000); // Auto dismiss
  };

  // --- AUTHENTICATION ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // 1. Basic Validation
    if (!username.trim() || !password.trim()) {
      setLoginError('CREDENTIALS_MISSING: Username and Password required.');
      return;
    }

    // 2. Start Loading Transition
    setIsLoading(true);

    try {
        const { supabase } = await import('../lib/supabaseClient');
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        });

        if (error) throw error;

        setIsAuthenticated(true);
    } catch (err: any) {
        console.error('Login error:', err);
        setLoginError(`ACCESS_DENIED: ${err.message || 'Invalid Credentials'}`);
        setPassword('');
    } finally {
        setIsLoading(false);
    }
  };

  // --- MODAL ACTIONS ---
  
  // Open Modal for NEW Project
  const openAddModal = () => {
    setEditingId(null);
    setFormData({ ...initialProjectState, id: `mission-${Date.now()}` });
    setToolsInput('');
    setProcessInput('');
    setIsModalOpen(true);
  };

  // Open Modal for EDIT Project
  const openEditModal = (project: Project) => {
    setEditingId(project.id);
    setFormData({ ...project });
    setToolsInput(project.tools.join(', '));
    setProcessInput(project.process ? project.process.join('\n') : '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  // Save (Create or Update)
  const handleSaveProject = async () => {
    if (!formData.title || !formData.thumbnail) {
        showAlert("System Error: Title and Thumbnail are required.", 'error');
        return;
    }

    try {
        const { supabase } = await import('../lib/supabaseClient');
        const user = (await supabase.auth.getUser()).data.user;
        
        if (!user) {
            showAlert("Authentication Error: You must be logged in.", 'error');
            return;
        }

        const projectPayload = {
            title: formData.title,
            description: formData.shortDescription,
            category: formData.category,
            image_url: formData.thumbnail,
            user_id: user.id,
            details: {
                role: formData.role,
                tools: toolsInput.split(',').map(t => t.trim()).filter(t => t !== ''),
                fullDescription: formData.fullDescription,
                background: formData.background,
                problem: formData.problem,
                process: processInput.split('\n').filter(p => p.trim() !== ''),
                solution: formData.solution,
                results: formData.results,
                artifactLink: formData.artifactLink
            }
        };

        let error;
        
        if (editingId && editingId.length === 36) {
             const { error: err } = await supabase
                .from('projects')
                .update(projectPayload)
                .eq('id', editingId);
             error = err;
        } else {
             const { error: err } = await supabase
                .from('projects')
                .insert([projectPayload]);
             error = err;
        }

        if (error) throw error;
        
        // Refresh context
        showAlert("Success: Mission Data Saved.", 'success');
        await refreshProjects();
        closeModal();
        
    } catch (err: any) {
        console.error('Error saving:', err);
        showAlert(`Error: ${err.message}`, 'error');
    }
  };

  // Image Upload handler for the Form
  const handleFormImageUpload = async (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      showAlert("File too large. Please upload an image smaller than 2MB.", 'error');
      return;
    }

    try {
        const { supabase } = await import('../lib/supabaseClient');
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('project-assets')
            .upload(filePath, file);

        if (uploadError) {
            throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('project-assets')
            .getPublicUrl(filePath);

        setFormData(prev => ({ ...prev, thumbnail: publicUrl }));
        showAlert("Image uploaded successfully!", 'success');
        
    } catch (error: any) {
        console.error('Error uploading image:', error);
        showAlert(`Upload failed: ${error.message}`, 'error');
    }
  };

  // --- DELETE LOGIC ---
  const requestDelete = (id: string) => {
    setDeleteTargetId(id);
  };

  const confirmDelete = async () => {
    if (deleteTargetId) {
        try {
            const { supabase } = await import('../lib/supabaseClient');
            
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', deleteTargetId);
                
            if (error) throw error;
            
            showAlert("Mission Deleted.", 'success');
            await refreshProjects();
        } catch (err: any) {
            console.error('Error deleting:', err);
            showAlert(`Delete failed: ${err.message}`, 'error');
        }
        setDeleteTargetId(null);
    }
  };

  // --- RENDER LOADING SCREEN ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-6 text-white font-mono">
         <div className="flex flex-col items-center gap-4">
            <Loader2 size={48} className="text-primary animate-spin" />
            <div className="text-sm tracking-[0.2em] animate-pulse text-gray-400">
               ESTABLISHING SECURE CONNECTION...
            </div>
         </div>
      </div>
    );
  }

  // --- RENDER LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-6 text-white font-mono">
        <div className="max-w-md w-full border-2 border-primary p-8 rounded-lg shadow-[0_0_20px_rgba(250,92,92,0.2)] relative overflow-hidden animate-reveal-up">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          
          <div className="flex items-center gap-2 mb-8 text-primary">
            <Terminal size={24} />
            <h1 className="text-xl font-bold tracking-widest">SYSTEM ACCESS</h1>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Error Alert */}
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/50 p-3 rounded flex items-center gap-3 text-red-400 text-xs font-bold animate-pulse">
                <AlertCircle size={16} />
                {loginError}
              </div>
            )}

            <div className="space-y-1">
              <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 mb-2">
                <User size={12} /> Username / Email
              </label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full bg-black/50 border p-3 text-white focus:outline-none transition-colors rounded-sm ${loginError ? 'border-red-500/50' : 'border-gray-700 focus:border-primary'}`}
                placeholder="admin"
              />
            </div>

            <div className="space-y-1">
              <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 mb-2">
                <Lock size={12} /> Security Code
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-black/50 border p-3 text-white focus:outline-none transition-colors rounded-sm ${loginError ? 'border-red-500/50' : 'border-gray-700 focus:border-primary'}`}
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-primary text-white py-3 font-bold uppercase tracking-widest hover:bg-red-600 transition-colors rounded-sm shadow-lg mt-4 group relative overflow-hidden"
            >
              <span className="relative z-10">Authenticate</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="w-full text-center text-xs text-gray-500 hover:text-white mt-4 transition-colors"
            >
              ABORT SEQUENCE
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER DASHBOARD ---
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-dark animate-fade-in pb-20 relative">
      
      {/* Custom Alert */}
      {alertInfo && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] px-6 py-4 rounded-lg shadow-2xl border flex items-center gap-3 animate-reveal-up ${
            alertInfo.type === 'success' 
            ? 'bg-green-100 border-green-500 text-green-800' 
            : 'bg-red-100 border-red-500 text-red-800'
        }`}>
            {alertInfo.type === 'success' ? <Trophy size={20} /> : <AlertTriangle size={20} />}
            <span className="font-bold text-sm tracking-wide uppercase">{alertInfo.message}</span>
        </div>
      )}

      {/* Admin Navbar */}
      <nav className="bg-dark text-white sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">ADMIN MODE</div>
             <h1 className="font-heading font-bold text-lg hidden md:block">CONTENT MANAGEMENT</h1>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => navigate('/')} className="flex items-center gap-2 bg-white text-dark px-4 py-2 rounded text-xs font-bold hover:bg-gray-200 transition-colors">
               <ArrowLeft size={14} /> EXIT
             </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-10">
        <div className="max-w-6xl mx-auto">
            
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-200 pb-6 gap-4">
                <div>
                    <h2 className="text-3xl font-heading font-black">PROJECT DATABASE</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage portfolio items and case studies.</p>
                </div>
                <button 
                onClick={openAddModal}
                className="flex items-center gap-2 bg-dark text-white px-6 py-3 rounded text-sm font-bold hover:bg-primary transition-colors shadow-lg group"
                >
                    <Plus size={16} className="group-hover:rotate-90 transition-transform" /> ADD NEW MISSION
                </button>
            </div>
            
            {/* Existing Projects List - READ ONLY VIEW */}
            <div className="space-y-8">
                {projects.map((project, index) => (
                    <div key={project.id} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 relative group transition-all hover:shadow-md">
                        <div className="absolute top-0 left-8 -translate-y-1/2 bg-gray-100 text-gray-500 px-3 py-1 text-[10px] font-mono font-bold rounded uppercase tracking-wider border border-gray-200">
                             ID: {project.id}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-4 mt-2">
                        
                            {/* --- COL 1: Image & Basic Metadata --- */}
                            <div className="md:col-span-4 space-y-6">
                                {/* Read-Only Image */}
                                <div>
                                    <label className="label-admin flex items-center gap-2 mb-2">
                                        <ImageIcon size={12}/> Mission Visual
                                    </label>
                                    <div className="relative w-full aspect-video bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                                        <img src={project.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                                    </div>
                                </div>

                                {/* Read-Only Metadata */}
                                <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <div>
                                        <label className="label-admin">Role</label>
                                        <div className="text-sm font-medium">{project.role}</div>
                                    </div>
                                    <div>
                                        <label className="label-admin">Category</label>
                                        <div className="text-sm font-medium">{project.category}</div>
                                    </div>
                                    <div>
                                        <label className="label-admin">Tools</label>
                                        <div className="text-sm font-medium">{project.tools.join(', ')}</div>
                                    </div>
                                    <div>
                                        <label className="label-admin flex items-center gap-1"><LinkIcon size={10}/> Artifact Link</label>
                                        <div className="text-xs font-mono text-blue-600 truncate">{project.artifactLink || 'N/A'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* --- COL 2: Main Content --- */}
                            <div className="md:col-span-8 space-y-6">
                                
                                <div className="grid grid-cols-1 gap-2">
                                    <div>
                                        <label className="label-admin">Title</label>
                                        <h3 className="font-heading font-black text-2xl text-dark">{project.title}</h3>
                                    </div>
                                    <div>
                                        <label className="label-admin">Short Description</label>
                                        <p className="text-sm text-gray-600 leading-relaxed">{project.shortDescription}</p>
                                    </div>
                                </div>

                                {/* Collapsible-style Area for Case Study Details - Read Only */}
                                <div className="border border-gray-200 rounded-lg overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                                    <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                                        <FileText size={14} className="text-gray-500" />
                                        <span className="text-xs font-bold text-gray-600 uppercase">Case Study Details (Preview)</span>
                                    </div>
                                    
                                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/50">
                                        <div className="md:col-span-2">
                                            <label className="label-admin text-primary">Briefing (Background)</label>
                                            <p className="text-xs text-gray-500 line-clamp-2">{project.background || 'No data.'}</p>
                                        </div>
                                        <div>
                                            <label className="label-admin text-red-500">Problem</label>
                                            <p className="text-xs text-gray-500 line-clamp-2">{project.problem || 'No data.'}</p>
                                        </div>
                                        <div>
                                            <label className="label-admin text-green-600">Solution</label>
                                            <p className="text-xs text-gray-500 line-clamp-2">{project.solution || 'No data.'}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="label-admin text-blue-500">Process</label>
                                            <p className="text-xs font-mono text-gray-500 line-clamp-2">{project.process ? project.process.join(', ') : 'No data.'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                             <button 
                                onClick={() => openEditModal(project)}
                                className="flex items-center gap-2 bg-gray-100 hover:bg-dark hover:text-white text-dark transition-colors text-xs font-bold uppercase tracking-widest px-4 py-2 rounded border border-gray-200 hover:border-dark"
                            >
                                <Pencil size={14} /> Edit Mission
                            </button>
                             <button 
                                onClick={() => requestDelete(project.id)}
                                className="flex items-center gap-2 text-red-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest px-4 py-2 rounded hover:bg-red-500 border border-transparent hover:border-red-600"
                            >
                                <Trash2 size={14} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* --- ADD / EDIT PROJECT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" onClick={closeModal}></div>
            <div className="bg-white w-full max-w-5xl h-[90vh] rounded-xl shadow-2xl relative z-10 flex flex-col overflow-hidden animate-reveal-up">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div>
                        <h3 className="font-heading font-black text-xl text-dark">
                            {editingId ? 'EDIT MISSION ENTRY' : 'NEW MISSION ENTRY'}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono">ID: {formData.id}</p>
                    </div>
                    <button onClick={closeModal} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={24} className="text-gray-500" />
                    </button>
                </div>

                {/* Modal Body (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50/50">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* LEFT COL: Media & Meta */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                <label className="label-admin mb-3">Thumbnail Image (Required)</label>
                                <div 
                                    className="relative w-full aspect-[4/3] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all group"
                                    onClick={() => document.getElementById('modal-file-upload')?.click()}
                                >
                                    {formData.thumbnail ? (
                                        <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center p-4 text-gray-400">
                                            <Upload className="mx-auto mb-2" />
                                            <span className="text-xs font-bold">Upload Image</span>
                                        </div>
                                    )}
                                    <input 
                                        id="modal-file-upload"
                                        type="file" 
                                        accept="image/*"
                                        className="hidden" 
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if(file) handleFormImageUpload(file);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
                                <div>
                                    <label className="label-admin">Category</label>
                                    <select 
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        className="input-admin"
                                    >
                                        <option value="UI/UX Design">UI/UX Design</option>
                                        <option value="Game Dev">Game Dev</option>
                                        <option value="Graphic Design">Graphic Design</option>
                                        <option value="Brand Design">Brand Design</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="label-admin">Role</label>
                                    <input 
                                        type="text" 
                                        value={formData.role}
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                        className="input-admin"
                                        placeholder="e.g. Lead Designer"
                                    />
                                </div>
                                <div>
                                    <label className="label-admin">Tools (Comma separated)</label>
                                    <input 
                                        type="text" 
                                        value={toolsInput}
                                        onChange={(e) => setToolsInput(e.target.value)}
                                        className="input-admin"
                                        placeholder="Figma, Unity, Photoshop"
                                    />
                                </div>
                                <div>
                                    <label className="label-admin">Artifact Link</label>
                                    <input 
                                        type="text" 
                                        value={formData.artifactLink}
                                        onChange={(e) => setFormData({...formData, artifactLink: e.target.value})}
                                        className="input-admin"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COL: Content */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-5">
                                <h4 className="font-bold text-sm text-dark uppercase border-b border-gray-100 pb-2">General Info</h4>
                                <div>
                                    <label className="label-admin">Mission Title (Required)</label>
                                    <input 
                                        type="text" 
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        className="input-admin text-lg font-bold"
                                        placeholder="Project Name"
                                    />
                                </div>
                                <div>
                                    <label className="label-admin">Short Description</label>
                                    <textarea 
                                        value={formData.shortDescription}
                                        onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                                        className="input-admin h-20"
                                        placeholder="Brief summary for the card view..."
                                    />
                                </div>
                                <div>
                                    <label className="label-admin">Full Description</label>
                                    <textarea 
                                        value={formData.fullDescription}
                                        onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                                        className="input-admin h-24"
                                        placeholder="Detailed introduction..."
                                    />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-5">
                                <h4 className="font-bold text-sm text-dark uppercase border-b border-gray-100 pb-2 flex items-center gap-2">
                                    <FileText size={14}/> Case Study Details
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="md:col-span-2">
                                        <label className="label-admin">Background</label>
                                        <textarea 
                                            value={formData.background || ''}
                                            onChange={(e) => setFormData({...formData, background: e.target.value})}
                                            className="input-admin h-20"
                                            placeholder="Context..."
                                        />
                                    </div>
                                    <div>
                                        <label className="label-admin text-red-500">Problem</label>
                                        <textarea 
                                            value={formData.problem || ''}
                                            onChange={(e) => setFormData({...formData, problem: e.target.value})}
                                            className="input-admin h-24"
                                            placeholder="Challenges faced..."
                                        />
                                    </div>
                                    <div>
                                        <label className="label-admin text-green-600">Solution</label>
                                        <textarea 
                                            value={formData.solution || ''}
                                            onChange={(e) => setFormData({...formData, solution: e.target.value})}
                                            className="input-admin h-24"
                                            placeholder="How you solved it..."
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="label-admin text-blue-500">Process (One step per line)</label>
                                        <textarea 
                                            value={processInput}
                                            onChange={(e) => setProcessInput(e.target.value)}
                                            className="input-admin h-24 font-mono text-xs"
                                            placeholder="Research&#10;Design&#10;Test"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="label-admin">Key Results</label>
                                        <input 
                                            type="text" 
                                            value={formData.results || ''}
                                            onChange={(e) => setFormData({...formData, results: e.target.value})}
                                            className="input-admin"
                                            placeholder="Success metrics..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-gray-200 bg-white flex justify-end gap-3">
                    <button 
                        onClick={closeModal}
                        className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-dark uppercase tracking-wide"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSaveProject}
                        className="px-8 py-3 bg-primary text-white text-sm font-bold uppercase tracking-wide rounded hover:bg-red-600 shadow-lg flex items-center gap-2"
                    >
                        <Save size={16} /> {editingId ? 'Update Mission' : 'Save Mission'}
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteTargetId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-dark/90 backdrop-blur-sm" onClick={() => setDeleteTargetId(null)}></div>
              <div className="bg-white rounded-lg p-8 max-w-sm w-full relative z-10 text-center shadow-2xl border-t-4 border-red-500 animate-reveal-up">
                  <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle size={32} />
                  </div>
                  <h3 className="font-heading font-black text-xl mb-2 text-dark">CONFIRM DELETION</h3>
                  <p className="text-gray-500 text-sm mb-6">
                      Are you sure you want to delete this project? This action cannot be undone.
                  </p>
                  <div className="flex gap-3 justify-center">
                      <button 
                        onClick={() => setDeleteTargetId(null)}
                        className="px-5 py-2 rounded border border-gray-300 text-gray-600 font-bold text-xs uppercase hover:bg-gray-50"
                      >
                          Cancel
                      </button>
                      <button 
                        onClick={confirmDelete}
                        className="px-5 py-2 rounded bg-red-500 text-white font-bold text-xs uppercase hover:bg-red-600 shadow-md"
                      >
                          Delete
                      </button>
                  </div>
              </div>
          </div>
      )}

      <style>{`
        .label-admin { display: block; font-size: 0.7rem; font-weight: 800; color: #666; text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.05em; }
        .input-admin { width: 100%; border: 1px solid #e5e7eb; border-radius: 0.375rem; padding: 0.75rem; font-size: 0.875rem; transition: all 0.2s; background: #fff; }
        .input-admin:focus { border-color: #fa5c5c; outline: none; box-shadow: 0 0 0 3px rgba(250,92,92,0.1); }
        
        /* Custom Scrollbar for Modal */
        .overflow-y-auto::-webkit-scrollbar { width: 8px; }
        .overflow-y-auto::-webkit-scrollbar-track { background: #f1f1f1; }
        .overflow-y-auto::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover { background: #999; }
      `}</style>
    </div>
  );
};

export default Admin;