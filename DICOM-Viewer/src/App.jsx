import { useState } from "react";
import { useDicomStudies } from "./hooks/useDicomStudies.js";
import UploadZone from "./components/UploadZone.jsx";
import UploadErrors from "./components/UploadErrors.jsx";
import StudyTable from "./components/StudyTable.jsx";
import StudyDetailPanel from "./components/StudyDetailPanel.jsx";
import DicomViewerPage from "./components/DicomViewerPage.jsx";
export default function App() {
  const {
    studies,
    isLoading,
    loadError,
    isUploading,
    uploadErrors,
    uploadFiles
  } = useDicomStudies();

  const [selectedStudy, setSelectedStudy] = useState(null);
const [viewerOpen,setViewerOpen]=useState(false);
  return (
    <div className="dicom-app">

      <header className="dicom-header">
        <div className="brand">
          <div className="brand-icon">🩻</div>

          <div>
            <h1>DICOM Viewer</h1>
            <p>Medical Imaging Platform</p>
          </div>
        </div>

        <div className="header-status">
          <span className="status-online">
            ● API Connected
          </span>

          <span>
            {studies.length} examens
          </span>
        </div>
      </header>


      <main className="dicom-content">

        <section className="upload-section">
          <h2>Importer une étude DICOM</h2>

          <UploadZone
            onFilesSelected={uploadFiles}
            isUploading={isUploading}
          />

          <UploadErrors errors={uploadErrors} />
        </section>


        <section className="study-section">

          <div className="section-header">
            <h2>Examens DICOM</h2>

            {
              isLoading &&
              <span>
                Chargement...
              </span>
            }
          </div>
<StudyTable
studies={studies}
isLoading={isLoading}
loadError={loadError}
onSelect={setSelectedStudy}
selectedStudy={selectedStudy}
onView={(study)=>{
setSelectedStudy(study);
setViewerOpen(true);
}}
/>

        </section>


        

      </main>
{
viewerOpen&&selectedStudy&&
<DicomViewerPage
study={selectedStudy}
onClose={()=>setViewerOpen(false)}
/>
}
    </div>
  );
}