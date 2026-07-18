import StudyRow from "./StudyRow.jsx";

export default function StudyTable({
studies,
isLoading,
loadError,
onSelect,
selectedStudy,
onView
}){

if(loadError){
return(
<div style={styles.message}>
    Chargement des examens..
</div>
);
}

if(isLoading){
return(
<div style={styles.message}>
Chargement des examens...
</div>
);
}

if(studies.length===0){
return(
<div style={styles.message}>
<h3>Aucun examen</h3>
<p>Importez un fichier DICOM pour commencer.</p>
</div>
);
}

return(
<div style={styles.wrapper}>
<table style={styles.table}>
<thead>
<tr>
<th>Modalité</th>
<th>Patient</th>
<th>Date de l'examen</th>
<th>Dimensions</th>
<th>Fichier</th>
<th>Date importation</th>
<th>Action</th>
</tr>
</thead>

<tbody>
{
studies.map(study=>(
<StudyRow
key={study.id}
study={study}
selected={selectedStudy?.id===study.id}
onClick={()=>onSelect(study)}
onView={onView}
/>
))
}
</tbody>
</table>
</div>
);
}


const styles={

wrapper:{
width:"100%",
overflowX:"auto",
background:"#ffffff",
borderRadius:"16px",
boxShadow:"0 10px 25px rgba(0,0,0,0.08)",
border:"1px solid #e2e8f0"
},

table:{
width:"100%",
borderCollapse:"separate",
borderSpacing:"0",
fontSize:"14px",
overflow:"hidden"
},

message:{
padding:"40px",
textAlign:"center",
color:"#64748b",
background:"#f8fafc",
borderRadius:"16px"
},

messageError:{
padding:"30px",
textAlign:"center",
color:"#b91c1c",
background:"#fef2f2",
border:"1px solid #fecaca",
borderRadius:"16px"
}

};