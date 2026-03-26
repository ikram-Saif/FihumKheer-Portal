import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Badge, Avatar } from "flowbite-react";
import { useState } from "react";
import Slider from "./Slider";
import { useProjectStore } from "../store/projectsStor";
import { useVolunteersStore } from "../store/volunteersStor";
import ProjectProgress from "./ProjectProgress";
import StatusBadge from "./StatusBadge";
import VolunteerCell from "./VolunteerCell"
import Description from "./Description"
import { Link } from "react-router-dom";
import { 
  LuType, LuActivity, LuGlobe, LuTarget, LuCoins, LuUsers, 
  LuFileText, LuMapPin, LuBriefcase, LuPhone, LuUser, LuMail,
  LuBuilding, LuWrench, LuCalendar
} from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa';

export function ViewModal() {
  const [modalPlacement] = useState("center");

  // Get both states from stores
  const { 
    selectedProject, 
    isModalOpen: isProjectModalOpen, 
    closeModal: closeProjectModal,
    setSelectedProject
  } = useProjectStore();
  
  const { 
    selectedVolunteer, 
    isModalOpen: isVolunteerModalOpen, 
    closeModal: closeVolunteerModal,
    setSelectedVolunteer
  } = useVolunteersStore();

  const handleClose = () => {
    closeProjectModal();
    closeVolunteerModal();
    setSelectedProject(null);
    setSelectedVolunteer(null);
  };

  const isOpen = isProjectModalOpen || isVolunteerModalOpen;
  const data = selectedProject || selectedVolunteer;

  if (!data) return null;

  const isProject = !!selectedProject;

  // Safe project parsing for volunteers
  const volunteerProjects = !isProject 
    ? (Array.isArray(data.projects) ? data.projects : data.projects?.data || [])
    : [];

  return (
    <Modal
      show={isOpen}
      position={modalPlacement}
      onClose={handleClose}
      size="6xl"
      className="bg-gray-950/40 backdrop-blur-md"
    >
      <ModalHeader className="border-b border-gray-100 p-8 bg-white dark:bg-gray-900 rounded-t-3xl">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {data.name}
            </h2>
            <div className="flex items-center gap-2">
              <StatusBadge status={isProject ? data.project_status : data.working_type} />
              <span className="text-xs text-gray-400 font-medium tracking-tight uppercase">
                • {isProject ? data.type : (data.working_field || 'Freelance Volunteer')}
              </span>
            </div>
          </div>
        </div>
      </ModalHeader>

      <ModalBody className="p-0 bg-white dark:bg-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
          {/* Left Section - Visuals & Profile */}
          <div className="lg:col-span-5 bg-gray-50/50 dark:bg-gray-800/20 p-8 flex flex-col justify-center items-center border-r border-gray-100 dark:border-gray-800">
            {isProject ? (
              <>
                <div className="w-full aspect-[16/10] shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-gray-800 ring-1 ring-black/5">
                  <Slider />
                </div>
                <p className="mt-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Project Gallery
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center gap-6 w-full py-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <Avatar 
                    img={data.image?.[0]?.url ? `http://localhost:1337${data.image[0].url}` : ""} 
                    size="xl" 
                    rounded 
                    className="ring-4 ring-white dark:ring-gray-900 shadow-2xl relative"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-black text-gray-900 dark:text-gray-100">{data.name}</h3>
                  <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mt-1">
                    Verified Volunteer
                  </p>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-2"></div>
                
                {data.whatsapp && (
                  <a 
                    href={`https://wa.me/${data.whatsapp.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-green-500 text-white font-bold hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/30 group"
                  >
                    <FaWhatsapp size={20} className="group-hover:scale-110 transition-transform" />
                    <span>Contact via WhatsApp</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right Section - Content */}
          <div className="lg:col-span-7 p-8 flex flex-col gap-8">
            {isProject ? (
              <>
                {/* Project Stats */}
                <div className="grid grid-cols-2 gap-8 pb-8 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <LuTarget size={14} className="text-blue-500" /> Target Goal
                    </span>
                    <span className="text-2xl font-black text-gray-900 dark:text-white">
                      ${data.project_goals?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <LuCoins size={14} className="text-green-500" /> Total Raised
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-gray-900 dark:text-white">
                        ${data.project_raised?.toLocaleString()}
                      </span>
                      <span className="text-xs font-black text-green-500">
                        {((data.project_raised / (data.project_goals || 1)) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress & Domain */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <LuActivity size={14} className="text-blue-500" /> Efficiency
                      </span>
                      <span className="text-sm font-black text-blue-600">{data?.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <ProjectProgress progress={data?.progress} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <LuGlobe size={14} className="text-purple-500" /> Domain Scope
                    </span>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      {data.project_domain?.domain_name || data.project_domain?.name || 'Unassigned'}
                    </span>
                  </div>
                </div>

                {/* Team Snapshot */}
                <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-800">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Team Composition</span>
                    <span className="text-sm font-black text-gray-800 dark:text-gray-200">
                      {data.volunteers?.length || 0} Professional Contributors
                    </span>
                  </div>
                  <VolunteerCell volunteers={data.volunteers} />
                </div>
              </>
            ) : (
              <>
                {/* Volunteer Details - Expanded */}
                <div className="flex flex-col gap-8">
                  {/* Primary Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pb-8 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <LuUser size={14} className="text-blue-500" /> Identity
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {data.age} yrs • {data.gender}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <LuMapPin size={14} className="text-red-500" /> Location
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {data.city}, {data.country}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <LuBriefcase size={14} className="text-purple-500" /> Engagement
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {data.volunteer_type || "Permanent Volunteer"}
                      </span>
                    </div>
                  </div>

                  {/* Contact & Professional Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Digital Contact</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm font-bold text-gray-700 dark:text-gray-300">
                          <LuMail size={16} className="text-blue-500" /> {data.email || 'No email provided'}
                        </div>
                        <div className="flex items-center gap-3 text-sm font-bold text-gray-700 dark:text-gray-300">
                          <LuPhone size={16} className="text-green-500" /> {data.phone || 'No phone provided'}
                        </div>
                        {data.whatsapp && (
                          <div className="flex items-center gap-3 text-sm font-bold text-green-600">
                            <FaWhatsapp size={16} /> {data.whatsapp}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Professional Info */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Professional Footprint</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm font-bold text-gray-700 dark:text-gray-300">
                          <LuBriefcase size={16} className="text-blue-500" /> {data.current_job || 'Not specified'}
                        </div>
                        <div className="flex items-center gap-3 text-sm font-bold text-gray-700 dark:text-gray-300">
                          <LuBuilding size={16} className="text-indigo-500" /> {data.office || 'Global'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills & Logistics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Skills & Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.skills?.split(',').map((skill, sIdx) => (
                          <Badge key={sIdx} color="indigo" size="xs" className="rounded-lg px-2 py-1 font-black shadow-sm uppercase">
                            {skill.trim()}
                          </Badge>
                        )) || <span className="text-xs italic text-gray-400">No skills listed</span>}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Availability Details</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {data.available_days?.split(',').map((day, dIdx) => (
                          <Badge key={dIdx} color="success" size="xs" className="rounded-lg px-2 py-1 font-black shadow-sm">
                            {day.trim()}
                          </Badge>
                        )) || <span className="text-xs italic text-gray-400">Not specified</span>}
                      </div>
                    </div>
                  </div>

                  {/* Portfolio Snapshot */}
                  <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-4">
                      <LuTarget size={14} className="text-indigo-500" /> Active Portfolio ({volunteerProjects.length})
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {volunteerProjects.length > 0 ? (
                        volunteerProjects.map((proj, idx) => {
                          const pName = proj.name || proj.attributes?.name || "Project " + (idx + 1);
                          return (
                            <Badge 
                              key={idx} 
                              color="blue" 
                              size="sm" 
                              className="rounded-xl px-4 py-1.5 font-bold border border-blue-100 dark:border-blue-900/30 shadow-sm"
                            >
                              {pName}
                            </Badge>
                          );
                        })
                      ) : (
                        <span className="text-sm italic text-gray-400">No projects currently assigned.</span>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {/* Description Area - Only for Projects now */}
            {isProject && (
              <div className="flex flex-col gap-4 mt-auto">
                <div className="flex items-center gap-2">
                  <LuFileText size={16} className="text-blue-500" />
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Strategy & Narrative
                  </h3>
                </div>
                <div className="max-w-none prose prose-sm prose-blue dark:prose-invert italic">
                  <Description desc={data.description} />
                </div>
              </div>
            )}
          </div>
        </div>
      </ModalBody>

      <ModalFooter className="bg-gray-50/50 dark:bg-gray-800/20 border-t border-gray-100 dark:border-gray-800 p-8 flex justify-between items-center rounded-b-3xl">
        <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <div className={`w-2 h-2 rounded-full animate-pulse ${isProject ? 'bg-blue-500' : 'bg-green-500'}`}></div>
          Entity Type: {isProject ? 'Active Initiative' : 'Verified Contributor'}
        </div>
        <div className="flex gap-4">
          <Button color="gray" onClick={handleClose} className="rounded-2xl px-6 text-sm font-bold border-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-all shadow-sm">
            Close
          </Button>
          <Link to={`/${isProject ? 'projects' : 'volunteers'}/edit/${data.documentId}`}>
            <Button color="blue" className="rounded-2xl px-8 font-black shadow-lg shadow-blue-500/20 hover:scale-105 transition-all">
              Manage Entity
            </Button>
          </Link>
        </div>
      </ModalFooter>
    </Modal>
  );
}
