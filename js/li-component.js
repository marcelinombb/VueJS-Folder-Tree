var BASE_URL = "http://localhost/alfresco-api/alfresco.php?endpoint=";

export default{
    props : ["node"],
        name : "li-component",
        data:function(){
            return {
                contentOpen : false,
                file : "link fa fa-file",
                folder : "link fa fa-folder",
                folderOpen : false,
                tree : null,
            }
        },
        methods : {
            content(nodeId){
                if(!this.contentOpen){
                    axios.get(BASE_URL+`/nodes/${nodeId}/content`)
                    .then((response)=>{
                        this.$refs[nodeId].value = response.data;
                    });
                }
                this.contentOpen = !this.contentOpen;
            },
            openFolder(nodeId){
                if(!this.folderOpen){
                    axios.get(BASE_URL+`/nodes/${nodeId}/children`)
                    .then((response)=>{
                        this.tree = response.data;
                    });
                }
                this.folderOpen = !this.folderOpen;
            }
        },
        template:`
                <li>
                    <h5>
                        <a class='link' v-if="node.entry.isFile" @click="content(node.entry.id)">
                            <i :class="[node.entry.isFile ? file : folder]"> {{node.entry.name}}</i>
                        </a>
                        <i v-else :class="[node.entry.isFile ? file : folder]" @click="openFolder(node.entry.id)"> {{node.entry.name}}</i>
                    </h5>
                    <ul v-if="folderOpen && tree">
                        <li v-if="!tree.list.entries.length">Vazio</li>
                        <li-component v-for="(node,index) in tree.list.entries" :node="node" :key="index" />
                    </ul>
                    <br>
                    <textarea v-show="contentOpen" :ref="node.entry.id"></textarea>
                </li>
        `
}
