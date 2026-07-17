import ModalityBadge from "./ModalityBadge.jsx";
import {
formatDate,
formatDateTime,
formatDimensions,
formatFileSize,
formatPatientName
} from "../utils/format.js";

export default function StudyRow({
study,
selected,
onClick,
onView
}){

return(
<tr
onClick={onClick}
style={{
...styles.row,
background:selected?"#dbeafe":"white"
}}
onMouseEnter={(e)=>{
if(!selected)
e.currentTarget.style.background="#f8fafc";
}}
onMouseLeave={(e)=>{
if(!selected)
e.currentTarget.style.background="white";
}}
>

<td style={styles.cell}>
<ModalityBadge modality={study.modality}/>
</td>

<td style={styles.cell}>
<div style={styles.patient}>
{formatPatientName(study.patientName)}
</div>
<div style={styles.sub}>
ID : {study.patientId||"Inconnu"}
</div>
</td>

<td style={styles.cell}>
<span style={styles.date}>
{formatDate(study.studyDate)}
</span>
</td>

<td style={styles.cell}>
{formatDimensions(study.width,study.height)}
</td>

<td style={styles.cell}>
<div style={styles.file}>
{study.originalFileName}
</div>
<div style={styles.sub}>
{formatFileSize(study.fileSizeBytes)}
</div>
</td>

<td style={styles.cell}>
<div style={styles.sub}>
{formatDateTime(study.uploadedAt)}
</div>
</td>
<td style={styles.cell}>
<button
onClick={(e)=>{
e.stopPropagation();
onView(study);
}}
style={styles.viewButton}
>
🩻 Voir image
</button>
</td>
</tr>
);
}


const styles={
viewButton:{
padding:"11px 25px",
borderRadius:"12px",
border:"none",
background:"#2563eb",
color:"white",
cursor:"pointer",
fontWeight:600,
fontSize:"14px",
display:"flex",
alignItems:"center",
gap:"8px",
boxShadow:"0 8px 20px rgba(37,99,235,.3)",
transition:"all .25s ease"
},
viewButtonHover:{
background:"#1d4ed8"
},
row:{
cursor:"pointer",
transition:"all .2s ease",
borderBottom:"1px solid #e2e8f0"
},

cell:{
padding:"12px 16px",
verticalAlign:"middle",
color:"#334155"
},

patient:{
fontWeight:700,
color:"#0f172a",
fontSize:"14px"
},

file:{
maxWidth:"220px",
overflow:"hidden",
textOverflow:"ellipsis",
whiteSpace:"nowrap",
fontWeight:500,
color:"#1e293b"
},

date:{
fontWeight:500,
color:"#475569"
},

sub:{
fontSize:"12px",
color:"#64748b",
marginTop:"3px"
}

};