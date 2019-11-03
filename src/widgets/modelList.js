'use strict';

import Lang from '../utils/lang.js';
import Widget from '../ui/widget.js';
import Control from '../widgets/control.js';

export default Lang.Templatable("Widget.ModelList", class ModelList extends Widget {

    constructor(id) {
        super(id);


        this.Node("lifeModel").addEventListener("click",this.onLifeModelClick_handler.bind(this));
        var barberModel = document.getElementById("barberModel");

        if(barberModel){
            barberModel.addEventListener("click", handleBarberListEvent);
        }
        
    }

    onLifeModelClick_handler() {
 
     var xhr = new XMLHttpRequest();
     var _root = this;

    //  xhr.onreadystatechange = function(){
    //      if(this.readyState == 4 && this.status == 200){
    //          console.log("file reading" + this.response);
    //          var blob = new Blob([xhr.response], {type: "application/octet-stream"});
    //          var fileName = "results.zip";
    //          var fileValue = new File([blob], fileName, {type: 'application/zip'});
    //      }
    //  };

    xhr.onload = function(e) {
        // var responseArray = new Uint8Array(this.response);
        var blobData = new Blob([this.response],{type : "application/zip"});
        zip.createReader(new zip.BlobReader(blobData), function(zipReader){
            zipReader.getEntries(function(entries){

                for(var  i = 0 ;i<entries.length;i++){
                    console.log(entries[i]);
                }

                console.log(entries[1].version);
                console.log(entries[1]);
                    
                    entries[1].getData(new zip.TextWriter(), function(text){
                            console.log(text);
                            console.log(entries[1].filename); 
                            
                            var newBlob = new Blob([text],{type: "text/plain"})
                            var fileName = entries[1].filename;
                            var fileValue = new File([newBlob],fileName,{type: 'text/plain'});

                            console.log(fileValue);
                            
                            _root.Emit("dataReady", {
                                data : fileValue});
                            Control.LoadSimulation(fileValue);

                            zipReader.close(function(){

                            });
                    }.bind(_root),function(current,total){
                        //progress callback
                    });
            }.bind(_root));
        }.bind(_root),function(error){
            console.log(error);
        });
    }.bind(_root);

     xhr.open("GET","http://vs1.sce.carleton.ca:8080/cdpp/sim/workspaces/test/dcdpp/LifeModel/results.zip",true);
     xhr.setRequestHeader("Access-Control-Allow-Origin", "http://vs1.sce.carleton.ca:8080");
     xhr.setRequestHeader("Content-type","application/zip");
     xhr.responseType = 'blob';    
     xhr.send();
}


    Template(){
        return "<ul id='myUL'>" +
                    "<li handle='lifeModel'>Life Model</li>" +
                    "<li id='barberModel'>Barber Model</li>" +
                    "<li>Fire Model</li>" +
                    "<li>Swarm Model</li>" +
                    "<li>Battle Model</li>" +
                    "<li>Cancer Model</li>" +
                "</ul>";
    }

});