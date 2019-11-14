'use strict';

import Lang from '../utils/lang.js';
import Widget from '../ui/widget.js';
import Control from '../widgets/control.js';
import Array from '../utils/array.js';
import Popup from '../ui/popup.js';
import ModelInput from '../widgets/modelInput.js';

export default Lang.Templatable("Widget.ModelList", class ModelList extends Widget {

    constructor(id) {
        super(id);

        this.files = null;

        this.popup = new Popup();

        this.Node("lifeModel").addEventListener("click", this.onLifeModelClick_handler.bind(this));
        // this.Node("barberModel").addEventListener("click", this.onBarberModelClick_handler.bind(this));
        this.Node("fireModel").addEventListener("click", this.onFireModelClick_handler.bind(this));
        this.Node("cancerModel").addEventListener("click" , this.onCancerModelClick_handler.bind(this));
        this.Node("battleModel").addEventListener("click",this.onBattleModelClick_handler.bind(this));
        // this.popup.Widget = this();

        // this.Node("modelInput").addEventListener("click", this.onModelInputClick_Handler.bind(this));

        // this.Node("lifeModel").addEventListener("click", this.onLifeModelClick_handler.bind(this));

        // this.Node("lifeModel").addEventListener("click",this.onLifeModelClick_handler.bind(this));
        //console.log(this);
        // var barberModel = document.getElementById("barberModel");

        // if(barberModel){
        //     // barberModel.addEventListener("click", handleBarberListEvent);
        // }
        
    }

    onModelInputClick_Handler(){
        // this.popup.Show();
        // var unorderedList = document.getElementById("myUL"); 
        // unorderedList.style.display = "block";
        // var boxedContent = document.getElementById("modelBox");
        // boxedContent.style.display = "none";
        
    }

    onBarberModelClick_handler(ev){
        console.log("hello");
        var barberModel = "barber";
        this.getRiseModel(barberModel);
    }

    onLifeModelClick_handler(ev) {
        var lifeModel = 'LifeModel';
        this.getRiseModel(lifeModel);
    }

    onBattleModelClick_handler(ev){
        var battleModel = 'BattleModel';
        this.getRiseModel(battleModel);
    }

    onCancerModelClick_handler(ev){
        var cancerModel = 'CancerModel';
        this.getRiseModel(cancerModel);
    }

    onFireModelClick_handler(ev){
        var fireModel = 'FireModel';
        this.getRiseModel(fireModel);
    }

    getRiseModel(modelName){
        console.log("hello again");

        var xhr = new XMLHttpRequest();
        var _root = this;
   
       // //  xhr.onreadystatechange = function(){
       // //      if(this.readyState == 4 && this.status == 200){
       // //          console.log("file reading" + this.response);
       // //          var blob = new Blob([xhr.response], {type: "application/octet-stream"});
       // //          var fileName = "results.zip";
       // //          var fileValue = new File([blob], fileName, {type: 'application/zip'});
       // //      }
       // //  };
   
       xhr.onload = function(e) {
           // var responseArray = new Uint8Array(this.response);
           var blobData = new Blob([this.response],{type : "application/zip"});
           zip.createReader(new zip.BlobReader(blobData), function(zipReader){
               zipReader.getEntries(function(entries){
   
                   for(var  i = 0 ;i<entries.length;i++){
                       // console.log(entries[i]);
                   }
   
                   // console.log(entries[1].version);
                   // console.log(entries[1]);
                       
                       entries[1].getData(new zip.TextWriter(), function(text){
                               // console.log(text);
                               // console.log(entries[1].filename); 
                               
                               var newBlob = new Blob([text],{type: "text/plain"})
                               var fileName = entries[1].filename;
                               var fileValue = new File([newBlob],fileName);
   
                               // _root.files = Array.Map(fileValue, function(func){
                               //     return { name:func.name, content:null, raw:func };
                               // });
                               _root.files = [{ name:fileValue.name, content:null, raw:fileValue }];
   
                               // console.log(fileValue);
                               
                               _root.Emit("dataReady", {
                                   result : _root.files});
                               // Control.LoadSimulation(fileValue);                            
   
                               zipReader.close(function(){
   
                               });
                       },function(current,total){
                           //progress callback
                       });
               });
           },function(error){
               console.log(error);
           });
       };

       var url = `https://vs1.sce.carleton.ca:8080/cdpp/sim/workspaces/test/dcdpp/${modelName}/results.zip`;
   
        xhr.open("GET",url,true);
        xhr.setRequestHeader("Access-Control-Allow-Origin", "https://vs1.sce.carleton.ca:8080");
        xhr.setRequestHeader("Content-type","application/zip");
        xhr.responseType = 'blob';    
        xhr.send();
       
    }


    Template(){
        return "<ul id='myUL'>" +
                    "<li handle='lifeModel'>Life Model</li>" +
                    // "<li handle='barberModel'>Barber Model</li>" +S
                    "<li handle='fireModel'>Fire Model</li>" +
                    "<li handle='cancerModel'>Cancer Model</li>" +
                    "<li handle='battleModel'>Battle Model</li>" +
                "</ul>" ;
                // "<div id='modelBox' class='box d-vertical d-center'>" +
                //     "<div handle='message' class='dropzone-message'>" +
                //         "<div handle='modelInput' class='dropzone-instructions'>nls(RISE_Server_Instructions)</div>" +
                //     "</div>" +
                //     // "<button style='display: block;background-color: #008CBA;' handle='modelInput'/>" +
                // "</div>";
    }

});
