import li from "./li-component.js";

const BASE_URL = "http://localhost/alfresco-api/alfresco.php?endpoint=";

Vue.component("li-component",li);

const app = new Vue({
    el : "#app",
    data : {
        tree : null,
        currentContent : null,
    },
    methods : {
        getList(){
            axios.get(BASE_URL+"/nodes/-root-/children")
            .then((response)=>{
                this.tree = response.data;
            });
        }
    },
    mounted:function (){
        this.getList();
    }
})