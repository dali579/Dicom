import { useCallback, useEffect, useState } from "react";
import { fetchDicomStudies, uploadDicomFile, ApiError } from "../api/dicomStudyApi.js";

export function useDicomStudies() {
  const [studies, setStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [uploadErrors, setUploadErrors] = useState([]);

  const loadStudies = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await fetchDicomStudies();
      setStudies(data);
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : "Impossible de contacter le serveur.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudies();
  }, [loadStudies]);

  const uploadFiles = useCallback(async (files) => {
    const fileList = Array.from(files);
    setUploadingCount((count) => count + fileList.length);
    setUploadErrors([]);

    const results = await Promise.allSettled(fileList.map((file) => uploadDicomFile(file)));

    const failures = results
      .map((result, index) => ({ result, file: fileList[index] }))
      .filter(({ result }) => result.status === "rejected")
      .map(({ result, file }) => ({
        fileName: file.name,
        message: result.reason instanceof ApiError ? result.reason.message : "Échec de l'envoi."
      }));

    setUploadErrors(failures);
    setUploadingCount((count) => count - fileList.length);

    if (results.some((r) => r.status === "fulfilled")) {
      await loadStudies();
    }
  }, [loadStudies]);

  return { studies, isLoading, loadError, isUploading: uploadingCount > 0, uploadErrors, uploadFiles, reload: loadStudies };
}