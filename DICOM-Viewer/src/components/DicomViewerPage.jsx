import {useState} from "react";
import ViewerToolbar from "./ViewerToolbar.jsx";
import {X} from "lucide-react";
import {getDicomImageUrl} from "../api/dicomStudyApi.js";

export default function DicomViewerPage({study,onClose}){

const [scale,setScale]=useState(1);
const [rotate,setRotate]=useState(0);

const zoomIn=()=>{
setScale(s=>s+0.2);
};

const zoomOut=()=>{
setScale(s=>Math.max(0.5,s-0.2));
};

const reset=()=>{
setScale(1);
setRotate(0);
};

return(

<div style={styles.page}>

<button
style={styles.close}
onClick={onClose}
>
<X size={22}/>
Sortir
</button>


<ViewerToolbar
onZoomIn={zoomIn}
onZoomOut={zoomOut}
onRotate={()=>setRotate(r=>r+90)}
onReset={reset}
/>


<div style={styles.viewer}>

<img
src={getDicomImageUrl(study.id)}
alt="DICOM"
style={{
transform:
`scale(${scale}) rotate(${rotate}deg)`,
transition:"0.3s",
maxWidth:"90%",
maxHeight:"90%"
}}
/>

</div>


</div>

);

}


const styles={

page:{
position:"fixed",
top:0,
left:0,
width:"100vw",
height:"100vh",
background:"#020617",
zIndex:9999,
display:"flex",
alignItems:"center",
justifyContent:"center"
},


viewer:{
width:"100%",
height:"100%",
display:"flex",
alignItems:"center",
justifyContent:"center",
overflow:"hidden"
},


close:{
position:"absolute",
top:"20px",
right:"20px",
zIndex:20,
display:"flex",
alignItems:"center",
gap:"8px",
padding:"10px 18px",
borderRadius:"12px",
border:"none",
background:"#dc2626",
color:"white",
cursor:"pointer",
fontWeight:600
}

};