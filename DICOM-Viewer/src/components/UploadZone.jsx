import {useCallback,useRef,useState} from "react";
import {UploadCloud,FileImage,ShieldCheck,Database} from "lucide-react";

export default function UploadZone({onFilesSelected,isUploading}){

const [isDragActive,setIsDragActive]=useState(false);
const [filesCount,setFilesCount]=useState(0);
const inputRef=useRef(null);

const handleFiles=useCallback((fileList)=>{

if(!fileList||fileList.length===0)return;

const files=Array.from(fileList).filter(file=>file.name.toLowerCase().endsWith(".dcm"));

if(files.length===0){
alert("Format invalide. Veuillez sélectionner des fichiers DICOM (.dcm)");
return;
}

setFilesCount(files.length);
onFilesSelected(files);

},[onFilesSelected]);

return(
<div
onDragOver={(e)=>{e.preventDefault();setIsDragActive(true)}}
onDragLeave={()=>setIsDragActive(false)}
onDrop={(e)=>{
e.preventDefault();
setIsDragActive(false);
handleFiles(e.dataTransfer.files);
}}
style={{
position:"relative",
width:"100%",
minHeight:"40px",
padding:"3px",
borderRadius:"20px",
border:isDragActive?"2px dashed #38bdf8":"2px dashed #334155",
background:isDragActive?"#082f49":"#0f172a",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
transition:"0.3s"
}}
>

{isUploading&&
<div style={{
position:"absolute",
top:0,
left:0,
height:"3px",
width:"100%",
background:"#38bdf8",
animation:"scan 1.5s infinite"
}}/>
}

<div style={{
width:"75px",
height:"75px",
borderRadius:"50%",
background:"#0284c7",
display:"flex",
alignItems:"center",
justifyContent:"center",
marginBottom:"15px"
}}>
<UploadCloud size={38} color="white"/>
</div>

<h3 style={{
margin:0,
color:"white",
fontSize:"18px",
textAlign:"center"
}}>
Importer une étude
</h3>

<p style={{
color:"#94a3b8",
textAlign:"center",
fontSize:"14px"
}}>
Glissez vos fichiers DICOM ici
</p>

<button
disabled={isUploading}
onClick={()=>inputRef.current?.click()}
style={{
marginTop:"15px",
padding:"11px 25px",
borderRadius:"12px",
border:"none",
background:"#2563eb",
color:"white",
cursor:"pointer",
fontWeight:600
}}>
Parcourir
</button>

<input
ref={inputRef}
hidden
type="file"
multiple
accept=".dcm,application/dicom"
onChange={(e)=>{
handleFiles(e.target.files);
e.target.value="";
}}
/>



{filesCount>0&&
<div style={{
marginTop:"15px",
color:"#38bdf8",
fontSize:"14px",
fontWeight:600
}}>
{filesCount} fichier(s) sélectionné(s)
</div>
}

<div style={{
marginTop:"15px",
fontSize:"13px",
color:"#94a3b8"
}}>
{isUploading?"🔄 Analyse DICOM...":"✓ Prêt"}
</div>

<style>{`
@keyframes scan{
0%{transform:translateY(0);}
50%{transform:translateY(250px);}
100%{transform:translateY(0);}
}
`}</style>

</div>
);
}

function InfoRow({icon,text}){
return(
<div style={{
display:"flex",
alignItems:"center",
gap:"8px"
}}>
{icon}
<span>{text}</span>
</div>
);
}