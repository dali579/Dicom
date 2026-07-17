import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  RefreshCcw
} from "lucide-react";


export default function ViewerToolbar({

  onZoomIn,
  onZoomOut,
  onRotate,
  onReset

}) {


return (

<div

style={{

position:"absolute",

top:"20px",

left:"50%",

transform:"translateX(-50%)",

background:"#111827",

padding:"10px",

borderRadius:"14px",

display:"flex",

gap:"10px",

zIndex:10,

boxShadow:
"0 10px 30px rgba(0,0,0,.5)"

}}

>


<Button
icon={<ZoomIn size={20}/>}
onClick={onZoomIn}
/>


<Button
icon={<ZoomOut size={20}/>}
onClick={onZoomOut}
/>



<Button
icon={<RotateCw size={20}/>}
onClick={onRotate}
/>



<Button
icon={<RefreshCcw size={20}/>}
onClick={onReset}
/>



</div>

);

}




function Button({icon,onClick}){


return (

<button

onClick={onClick}


style={{

width:"40px",

height:"40px",

borderRadius:"10px",

border:"none",

background:"#1e293b",

color:"white",

cursor:"pointer",

display:"flex",

alignItems:"center",

justifyContent:"center"


}}

>

{icon}


</button>

)

}