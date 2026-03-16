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
    <div className="filepond-wrapper my-4">
      <FilePond
        files={files}
        onupdatefiles={handleUpdateFiles}
        allowMultiple={true}
        maxFiles={10}
        
        // This server block is the reason images show/don't show
        server={{
          load: (source, load, error) => {
            fetch(source)
              .then((res) => res.blob())
              .then(load)
              .catch(() => error('Could not load image from Strapi'));
          },
        }}
        
        labelIdle='Drag & Drop images or <span class="filepond--label-action">Browse</span>'
        imagePreviewHeight={60}
        
      />
    </div>
  );
};

export default UploadMedia;