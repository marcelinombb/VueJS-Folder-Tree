
//const BASE_URL = "http://localhost/alfresco-api/alfresco.php?endpoint=";
const BASE_URL = "https://api-explorer.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/";
const TICKET = "https://api-explorer.alfresco.com/alfresco/api/-default-/public/authentication/versions/1/tickets";

const userId = "admin";

const password = "admin";

axios.post(TICKET,{
    userId,
    password
}
).then((response)=>{
    console.log(response.data);
});


/* {
    headers: {
        "Authorization": `Basic ${ticket}`
    }
} */