import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useState } from "react";
import Slider from "./Slider";
import { useProjectStore } from "../store/projectsStor";
import ProjectProgress from "./ProjectProgress";
import StatusBadge from "./StatusBadge";
import VolunteerCell from "./VolunteerCell"
import Description from "./Description"
import { Link } from "react-router-dom";
import { LuType, LuActivity, LuGlobe, LuTarget, LuCoins, LuUsers, LuFileText } from 'react-icons/lu';

export function ViewModal() {
  const [modalPlacement] = useState("center");

  // Get project state from store
  const { selectedProject, isModalOpen, closeModal } = useProjectStore();

  if (!selectedProject) return null;

  return (
    <Modal
      show={isModalOpen}
      position={modalPlacement}
      onClose={closeModal}
      size="6xl"
      className="bg-gray-950/40 backdrop-blur-md"
    >
      <ModalHeader className="border-b border-gray-100 p-8 bg-white dark:bg-gray-900 rounded-t-3xl">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {selectedProject.name}
            </h2>
            <div className="flex items-center gap-2">
              <StatusBadge status={selectedProject.project_status} />
              <span className="text-xs text-gray-400 font-medium">
                • {selectedProject.type}
              </span>
            </div>
          </div>
        </div>
      </ModalHeader>

      <ModalBody className="p-0 bg-white dark:bg-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
          {/* Left Section - Visuals */}
          <div className="lg:col-span-5 bg-gray-50/50 dark:bg-gray-800/20 p-8 flex flex-col justify-center border-r border-gray-100 dark:border-gray-800">
            <div className="w-full aspect-[16/10] shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-gray-800 ring-1 ring-black/5">
              <Slider />
            </div>
            <p className="mt-4 text-center text-[10px] font-medium text-gray-400 uppercase tracking-widest">
              Project Media Gallery
            </p>
          </div>

          {/* Right Section - Content */}
          <div className="lg:col-span-7 p-8 flex flex-col gap-8">
            {/* Minimalist Stats */}
            <div className="grid grid-cols-2 gap-8 pb-8 border-b border-gray-100 dark:border-gray-800">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <LuTarget size={14} className="text-blue-500" /> Target Goal
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${selectedProject.project_goals?.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <LuCoins size={14} className="text-green-500" /> Total Raised
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${selectedProject.project_raised?.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-green-500">
                    {((selectedProject.project_raised / (selectedProject.project_goals || 1)) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Progress & Domain Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <LuActivity size={14} className="text-blue-500" /> Efficiency
                  </span>
                  <span className="text-sm font-bold text-blue-600">{selectedProject?.progress}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <ProjectProgress progress={selectedProject?.progress} />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <LuGlobe size={14} className="text-purple-500" /> Domain Scope
                </span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {selectedProject.project_domain?.domain_name || selectedProject.project_domain?.name || 'Unassigned'}
                </span>
              </div>
            </div>

            {/* Team Snapshot */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Team</span>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  {selectedProject.volunteers?.length || 0} {selectedProject.volunteers?.length === 1 ? 'Volunteer' : 'Volunteers'}
                </span>
              </div>
              <div className="flex items-center">
                <VolunteerCell volunteers={selectedProject.volunteers} />
              </div>
            </div>
          </div>
        </div>

        {/* Simplified Description Area */}
        <div className="p-8 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <LuFileText size={16} className="text-blue-500" />
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Project Description</h3>
          </div>
          <div className="max-w-none prose prose-sm prose-blue dark:prose-invert">
            <Description desc={selectedProject.description} />
          </div>
        </div>
      </ModalBody>

      <ModalFooter className="bg-gray-50/50 dark:bg-gray-800/20 border-t border-gray-100 dark:border-gray-800 p-6 flex justify-between items-center rounded-b-3xl">
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
          Status: Operational
        </div>
        <div className="flex gap-3">
          <Button color="gray" onClick={closeModal} className="rounded-xl px-5 text-sm font-medium border-0 hover:bg-gray-200 transition-colors">
            Close
          </Button>
          <Link to={`/projects/edit/${selectedProject.documentId}`}>
            <Button color="blue" className="rounded-xl px-6 font-bold shadow-md">
              Edit Project
            </Button>
          </Link>
        </div>
      </ModalFooter>
    </Modal>
  );
}
