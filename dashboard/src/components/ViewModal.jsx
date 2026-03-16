import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useState } from "react";
import Slider from "./Slider";
import { useProjectStore } from "../store/projectsStor";
import ProjectProgress from "./ProjectProgress";
import StatusBadge from "./StatusBadge";
import VolunteerCell from "./VolunteerCell"
import Description from "./Description"
import { Link } from "react-router-dom";
export function ViewModal() {
  const [modalPlacement] = useState("center");

  // Get project state from store
  const { selectedProject, isModalOpen, closeModal } = useProjectStore();

  if (!selectedProject) return null; // Avoid rendering if nothing is selected

  return (
    <Modal
      show={isModalOpen}
      position={modalPlacement}
      onClose={closeModal}
      size="5xl"
    >
      <ModalHeader className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        {selectedProject.name}
      </ModalHeader>
      <ModalBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side - Slider */}
          <div className="w-full h-fit">
            <Slider />
          </div>

          {/* Right side - Project details */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Type:
              </span>
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {selectedProject.type}
              </span>
            </div>

            <div className="flex gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Status:
              </span>
              <StatusBadge status={selectedProject.project_status} />
            </div>

            <div className="flex gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Domain:
              </span>
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {selectedProject.domain.domain_name}
              </span>
            </div>

            <div className="flex gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Goals
              </span>
              <span className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                {selectedProject.project_goals}
              </span>
            </div>

            <div className="flex gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Raised:
              </span>
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {selectedProject.project_raised}
              </span>
            </div>
             <div className="flex items-center gap:3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Progress
              </span>
        
                <div className="w-[50%]">
                        <ProjectProgress progress={selectedProject?.progress} />
                    </div>
                
            </div>
           <div className="flex items-center gap:3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Volunteers
              </span>

            <VolunteerCell volunteers = { selectedProject.volunteers}/>

            </div>
            
          </div>
        </div>

        {/* Description section */}
        <div className="mt-3">
          <Description desc = {selectedProject.description}/>

        </div>
      </ModalBody>
      <ModalFooter className="flex justify-end gap-3">
        <Link to={`/projects/edit/${selectedProject.documentId}`}>
         <Button color="blue">Edit</Button>
        </Link>

        <Button color="gray" onClick={closeModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
