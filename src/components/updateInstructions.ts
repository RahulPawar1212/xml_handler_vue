import { IquestionStructure } from '../../interfaces';
import  wendyData  from "../../wendyData.json";

export function updateInstructions(data:string){

    let _data = wendyData as IquestionStructure[];

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
  
    // Your XML update instructions go here
    // For example, updating the text of an element:
    const firstElement = xmlDoc.querySelector("person");
    if (firstElement) {
      firstElement.textContent = _data[0].answersRowOptions[0].toString() ;
    }
  
    xmlDoc.getElementsByTagName("person")[1].childNodes[1].textContent = "Test"

    const newEle = xmlDoc.createElement("NewQuestion");

    xmlDoc.getElementsByTagName("persons")[0].appendChild(newEle)



    const serializer = new XMLSerializer();
    data = serializer.serializeToString(xmlDoc);

return data
}