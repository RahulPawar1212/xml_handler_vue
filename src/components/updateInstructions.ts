import { IquestionStructure } from '../../interfaces';
import  wendyData  from "../../wendyData.json";

export function updateInstructions(data:string){

    let _data = wendyData as IquestionStructure[];

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    var i = 0;

    for (var Q of _data) {
      const newQEle = xmlDoc.createElement("NewQuestion"); // Create new node 'NewQuestion'  
      xmlDoc.getElementsByTagName("persons")[0].appendChild(newQEle) // Add new node to root node 'Persons'

      const newQidEle = xmlDoc.createElement("Qid"); // Create new node 'Qid'
      xmlDoc.getElementsByTagName("NewQuestion")[i].appendChild(newQidEle) // Add data to new node 
      
      xmlDoc.getElementsByTagName("NewQuestion")[i].getElementsByTagName("Qid")[0].textContent = Q.id

      console.log(i);
      console.log(Q.id)
      i++
    }
  
    // Your XML update instructions go here
    // For example, updating the text of an element:
    // const firstElement = xmlDoc.querySelector("person");
    // if (firstElement) {
    //   firstElement.textContent = _data[0].answersRowOptions[0].toString() ;
    // }
  
    // xmlDoc.getElementsByTagName("person")[1].childNodes[1].textContent = "Test"

    // const newEle = xmlDoc.createElement("NewQuestion");

    // xmlDoc.getElementsByTagName("persons")[0].appendChild(newEle)



    const serializer = new XMLSerializer();
    data = serializer.serializeToString(xmlDoc);

return data
}