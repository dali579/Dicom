const COLORS={
CT:"#2563eb",
MR:"#7c3aed",
CR:"#16a34a",
DX:"#059669",
US:"#ea580c",
XA:"#dc2626"
};

const LABELS={
CT:"Scanner",
MR:"IRM",
CR:"Radio",
DX:"Radio Num.",
US:"Écho",
XA:"Angio"
};

export default function ModalityBadge({modality}){

if(!modality)
return <span>—</span>;

return(
<div
style={{
display:"inline-flex",
flexDirection:"column",
alignItems:"center",
background:COLORS[modality]||"#64748b",
color:"white",
padding:"5px 10px",
borderRadius:"10px",
fontSize:"12px",
fontWeight:600,
minWidth:"55px",
boxShadow:"0 2px 6px rgba(0,0,0,.15)"
}}
>
<span>{modality}</span>
<small>{LABELS[modality]||"DICOM"}</small>
</div>
);

}