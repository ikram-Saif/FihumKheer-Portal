import { useState, useEffect, useRef } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Import FilePond plugins
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Register the plugin
registerPlugin(FilePondPluginImagePreview);

const UploadMedia = ({ form, mediaObjects }) => {
  const [files, setFiles] = useState([]);
  const hasInitialized = useRef(false);

  // 1. SYNC INITIAL DATA FROM STRAPI TO FILEPOND
  useEffect(() => {
    // Only run this if we have data and haven't initialized the UI yet
    if (mediaObjects && mediaObjects.length > 0 && !hasInitialized.current) {
      const formattedExisting = mediaObjects.map((img) => ({
        source: `http://localhost:1337${img.url}`,
        options: {
          type: 'local', // Tells FilePond this file exists on the server
          metadata: { strapiId: img.id }, // Important for the "Reflection" logic
        },
      }));

      setFiles(formattedExisting);
      
      // Update Formik state so it's ready for submission
      form.setFieldValue("existingMediaIds", mediaObjects.map(m => m.id));
      
      // Mark as initialized so we don't overwrite user changes on next render
      hasInitialized.current = true;
    }
  }, [mediaObjects, form]);

  // 2. HANDLE UI UPDATES (Adding/Removing)
  const handleUpdateFiles = (fileItems) => {
    setFiles(fileItems);

    // Track BRAND NEW files (Files that DO NOT have 'strapiId' metadata)
    const newFiles = fileItems
      .filter((item) => !item.getMetadata("strapiId"))
      .map((item) => item.file);

    form.setFieldValue("newMedia", newFiles);

    // Track EXISTING IDs (Files that HAVE 'strapiId' metadata)
    const keptIds = fileItems
      .map((item) => item.getMetadata("strapiId"))
      .filter((id) => id !== undefined && id !== null);

    form.setFieldValue("existingMediaIds", keptIds);
  };

  return (
    <div className="filepond-wrapper">
      {/* Custom Premium Styles for FilePond */}
      <style>{`
        .filepond--root {
          font-family: inherit;
        }
        .filepond--panel-root {
          background-color: transparent;
          border: 2px dashed #e5e7eb;
          border-radius: 1.5rem;
        }
        .filepond--drop-label {
          color: #6b7280;
          cursor: pointer;
        }
        .filepond--label-action {
          text-decoration-color: #3b82f6;
          color: #3b82f6;
          font-weight: 700;
        }
        .filepond--item-panel {
          background-color: #3b82f6;
          border-radius: 1rem;
        }
        .filepond--file-info-main {
          font-weight: 600;
        }
        .filepond--image-preview-wrapper {
          border-radius: 1rem;
        }
        .filepond--file-action-button {
          background-color: rgba(0, 0, 0, 0.5);
          cursor: pointer;
        }
        /* Style for existing images */
        .filepond--item {
          width: calc(33.33% - 0.5em);
        }
        @media (max-width: 768px) {
          .filepond--item {
            width: calc(50% - 0.5em);
          }
        }
      `}</style>
      
      <FilePond
        files={files}
        onupdatefiles={handleUpdateFiles}
        allowMultiple={true}
        maxFiles={10}
        
        server={{
          load: (source, load, error) => {
            fetch(source)
              .then((res) => res.blob())
              .then(load)
              .catch(() => error('Could not load image from Strapi'));
          },
        }}
        
        labelIdle='
          <div class="flex flex-col items-center justify-center py-4">
            <svg class="w-10 h-10 mb-2 text-blue-500 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p class="text-sm font-semibold tracking-tight text-gray-500 uppercase italic">
              Drag & Drop your assets here 
              <span class="text-blue-600 font-black not-italic ml-1 underline decoration-2 cursor-pointer">Browse Project Files</span>
            </p>
          </div>
        '
        imagePreviewHeight={100}
        imagePreviewTransparencyIndicator="grid"
      />
    </div>
  );
};

export default UploadMedia;