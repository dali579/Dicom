import {useState} from "react";
import ViewerToolbar from "./ViewerToolbar.jsx";
import {X} from "lucide-react";
import {getDicomImageUrl} from "../api/dicomStudyApi.js";

export default function DicomViewerPage({study,onClose}){

const [scale,setScale]=useState(1);
const [rotate,setRotate]=useState(0);
const [windowWidth, setWindowWidth] = useState(400);
const [windowLevel, setWindowLevel] = useState(40);
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
function ToolButton({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                width: "60px",
                height: "40px",
                borderRadius: "10px",
                border: "none",
                background: "#1e293b",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all .25s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#334155"}
            onMouseLeave={e => e.currentTarget.style.background = "#1e293b"}
        >
            {children}
        </button>
    );
}

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
    onRotate={() => setRotate(r => r + 90)}
    onReset={reset}

    onIncreaseWW={() => setWindowWidth(w => w + 50)}
    onDecreaseWW={() => setWindowWidth(w => Math.max(1, w - 50))}

    onIncreaseWL={() => setWindowLevel(l => l + 20)}
    onDecreaseWL={() => setWindowLevel(l => l - 20)}
/>
<div style={styles.windowToolbar}>

    <ToolButton onClick={() => setWindowWidth(w => w + 50)}>
        WW+
    </ToolButton>

    <ToolButton onClick={() => setWindowWidth(w => Math.max(1, w - 50))}>
        WW-
    </ToolButton>

    <ToolButton onClick={() => setWindowLevel(l => l + 20)}>
        WL+
    </ToolButton>

    <ToolButton onClick={() => setWindowLevel(l => l - 20)}>
        WL-
    </ToolButton>

</div>

<div style={styles.viewer}>

<img
src={getDicomImageUrl(
    study.id,
    windowWidth,
    windowLevel
)}alt="DICOM"
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
windowToolbar:{
    position:"absolute",
    bottom:"30px",
    left:"50%",
    transform:"translateX(-50%)",

    display:"flex",
    gap:"10px",

    zIndex:20,

    background:"#111827",
    padding:"10px",
    borderRadius:"14px",

    boxShadow:"0 10px 30px rgba(0,0,0,.5)"
},
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
