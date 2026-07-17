export default function UploadErrors({ errors }) {
  if (!errors || errors.length === 0) return null;
  return (
    <div className="upload-errors" role="alert">
      <p className="upload-errors__title">
        {errors.length > 1 ? `${errors.length} fichiers rejetés` : "1 fichier rejeté"}
      </p>
      <ul>
        {errors.map((err, index) => (
          <li key={`${err.fileName}-${index}`}><span className="mono">{err.fileName}</span> — {err.message}</li>
        ))}
      </ul>
    </div>
  );
}