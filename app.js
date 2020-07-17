console.log('Notes app')
showNotes();

// If a user adds a note, add it to local storage
let addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',function(){
    let addText=document.getElementById('addText');
    let addTitle=document.getElementById('addTitle');
    let notes=localStorage.getItem('notes');

    if (notes === null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes)
    }
    let myObj={
        title: addTitle.value,
        text: addText.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    addText.value="" ;  //To Reset the text area 
    addTitle.value="";
    // console.log(notesObj);
    showNotes();
})



//Function To show elements from local Storage
function showNotes(){
    let notes=localStorage.getItem('notes');
    if (notes === null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element,index) {
        html+=`<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
        </div>
      </div>`

        
    });
    let notesElem=document.getElementById('notes');
    if(notesObj!=0)
    {
        notesElem.innerHTML=html;
    }
    else{
        notesElem.innerHTML='Nothing To Show ,use add button to add a note'
    }

}


//function to delete note
function deleteNote(index){
    // console.log('Deleting',index);
    let notes=localStorage.getItem('notes')
    if(notes===null){
        notesObj=[]
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    // console.log(notesObj);
    showNotes();
}


let search=document.getElementById('searchText');
search.addEventListener('input',function(){
    
    let inputVal=search.value.toLowerCase();
    // console.log('Search',inputVal);
    let notecards=document.getElementsByClassName('noteCard');
    // console.log(notecards)
    Array.from(notecards).forEach(function(elem){
        let cardText=elem.getElementsByTagName('p')[0].innerText;
        //console.log(cardText);
        //if search text is present in card display that card else hide
        if(cardText.includes(inputVal)){
            elem.style.display='block';  
        }
        else{
            elem.style.display='none';
        }
        
    })

})