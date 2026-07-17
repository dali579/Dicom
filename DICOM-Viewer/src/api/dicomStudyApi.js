const BASE_URL = "/api/studies";


export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function parseErrorResponse(response) {
  try {
    const body = await response.json();
    return body?.error ?? `Erreur ${response.status}`;
  } catch {
    return `Erreur ${response.status}`;
  }
}


export async function uploadDicomFile(file, { signal } = {}) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(BASE_URL, {
    method: "POST",
    body: formData,
    signal
  });

  if (!response.ok) {
    throw new ApiError(await parseErrorResponse(response), response.status);
  }

  return response.json();
}


export async function fetchDicomStudies({ signal } = {}) {
  const response = await fetch(BASE_URL, { signal });

  if (!response.ok) {
    throw new ApiError(await parseErrorResponse(response), response.status);
  }

  return response.json();
}


export function getDicomImageUrl(studyId) {
  return `${BASE_URL}/${studyId}/image`;
}
