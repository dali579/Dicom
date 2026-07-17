import {useState} from "react";

import {
getDicomImageUrl
} from "../api/dicomStudyApi.js";


import ViewerToolbar from "./ViewerToolbar.jsx";


import {
formatDate,
formatDimensions,
formatPatientName
} from "../utils/format.js";



export default function StudyDetailPanel({

study

}) {



const [zoom,setZoom]=useState(1);

const [rotation,setRotation]=useState(0);

const [error,setError]=useState(false);





if(!study){


return (

<div

style={styles.empty}

>

<h2>
Aucun examen sélectionné
</h2>


<p>

Sélectionnez une étude pour afficher l'image DICOM

</p>


</div>


)

}





function reset(){

setZoom(1);

setRotation(0);

}






return (


<div style={styles.viewer}>



{/* TOOLBAR */}


<ViewerToolbar


onZoomIn={()=>
setZoom(z=>z+0.2)
}


onZoomOut={()=>
setZoom(z=>Math.max(.5,z-.2))
}


onRotate={()=>
setRotation(r=>r+90)
}


onReset={reset}


/>






{/* IMAGE AREA */}



<div

style={{

flex:1,

display:"flex",

alignItems:"center",

justifyContent:"center",

overflow:"hidden",

background:"#000"

}}

>



{

error ?

<div

style={{color:"white"}}

>

Image indisponible

</div>


:

<img


src={
getDicomImageUrl(study.id)
}


onError={()=>
setError(true)
}



style={{

maxWidth:"90%",

maxHeight:"90%",


transform:

`scale(${zoom}) rotate(${rotation}deg)`,


transition:"0.3s",


objectFit:"contain"

}}


/>


}



</div>








{/* PATIENT INFO */}



<div

style={styles.info}

>



<div>


<h3>

{formatPatientName(
study.patientName
)}

</h3>


<p>

Patient ID :
{study.patientId}

</p>


</div>



<div>


<p>

Modalité :
<b>
{study.modality}
</b>

</p>


<p>

Date :
{formatDate(
study.studyDate
)}

</p>


<p>

Dimensions :
{formatDimensions(
study.width,
study.height
)}

</p>



</div>



</div>






</div>


);


}





const styles={



viewer:{


height:"100%",

display:"flex",

flexDirection:"column",

position:"relative",

background:"#000"


},



empty:{


height:"100%",

display:"flex",

flexDirection:"column",

alignItems:"center",

justifyContent:"center",

color:"#94a3b8"


},



info:{


height:"100px",

background:"#111827",

display:"flex",

justifyContent:"space-between",

padding:"15px 25px",

color:"white",

fontSize:"14px"


}



}