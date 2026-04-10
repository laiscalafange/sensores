import { useEffect, useState } from 'react';
import { SensorTypes, magnetometer, setUpdateIntervalForType } from "react-native-sensors";

export default function Bussola(){

const [graus, setGraus] = useState(0);

useEffect(() => { 
    setUpdateIntervalForType(SensorTypes.magnetometer,500);

    const subscription = magnetometer.subscribe(({x,y})) => {
        let angulo = Math.atan2(y,x) * (180 / Math.PI);
         if (angulo < 0) {
            angulo += 360;
         }

         setGraus(Math.round(angulo));
         

return()=> subscription.unsubscribe();
        
 function getDirecao(graus) {

if (graus >= 315 || graus < 45 ) return "N";
if (graus >= 135 && graus < 225 ) return "S";
if (graus >= 45 && graus < 135 ) return "L";

 }
 
}});

}