
export function updateInstructions(data:string){

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
  
    // Your XML update instructions go here
    // For example, updating the text of an element:
    const firstElement = xmlDoc.querySelector("person");
    if (firstElement) {
      firstElement.textContent = "New Value";
    }
  
    xmlDoc.getElementsByTagName("person")[1].childNodes[0].textContent = "Test"
    const serializer = new XMLSerializer();
    data = serializer.serializeToString(xmlDoc);

return data
}