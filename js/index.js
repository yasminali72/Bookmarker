
var siteName=document.getElementById('siteName');
var siteURL=document.getElementById('siteURL');

var submitBtn=document.querySelector('.submit');
var ligthContainer=document.querySelector('.ligth-container');
var closeBtn=document.querySelector('.close');
var boxContainer=document.querySelector('.box');

submitBtn.addEventListener('click',addrow);





var rowContainer;





if(localStorage.getItem('table')==null){
    rowContainer=[];
}
else{
    rowContainer=JSON.parse(localStorage.getItem('table'));
    display(rowContainer)
}



function validateName(siteName) {
        var nameRegex = /^[\w]{3,}(\S| [\w]{1,}){0,}$/;
        return nameRegex.test(siteName.value);
    }
    
    function validateURL(siteURL) {
        var urlRegex = /^(http|https):\/\/[\w]{1,}\.[\w]{2,}[\/]?\w{0,}/i;
        return urlRegex.test(siteURL.value);
    }
    



function addrow() {


    if(siteName.value==='' || siteURL.value==='' || !validateName(siteName) || !validateURL(siteURL)){

ligthContainer.classList.replace('d-none','d-flex');
ligthContainer.addEventListener('click',close);


closeBtn.addEventListener('click',close);

boxContainer.addEventListener('click',function(e){
   e.stopPropagation()

})


    } 

 else if(validateName(siteName)&&validateURL(siteURL)){
    row = {
        name:siteName.value,
        url:siteURL.value

    }


    rowContainer.push(row);
    localStorage.setItem('table',JSON.stringify(rowContainer));

    display(rowContainer);
    clearData();

   }

}

 
function clearData() {
    siteName.value=null;
    siteURL.value=null;
}


function display(arr) {

    var rows='';
    for(var i=0;i<arr.length;i++){
        rows+= ` <tr>
        <th scope="row">${i+1}</th>
        <td>${arr[i].name}</td>
        <td><button class="btn-visit rounded-3"><a href="${arr[i].url}" target="_blank" class="text-decoration-none text-white"><i class="fa-regular fa-eye me-2"></i>Visit</a></button>
        </td>
        <td><button onclick="deleteRow(${i})" class="btn-delete rounded-3"><a href="" class="text-decoration-none text-white"><i class="fa-solid fa-trash-can me-2"></i>Delete</a></button>
        </td>
      </tr> `
    
    }

    document.getElementById('demo').innerHTML=rows 

    
}


function deleteRow(index) {
rowContainer.splice(index,1);
display(rowContainer);
localStorage.setItem('table',JSON.stringify(rowContainer))

    
}














function validation(element) {

    regex={
        siteName:/^[\w]{3,}(\S| [\w]{1,}){0,}$/,
        siteURL:/^(http|https):\/\/[\w]{1,}\.[\w]{2,}[\/]?\w{0,}/i
    }

    if(regex[element.id].test(element.value)){
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');

    }
    else{
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
    }
    
}


function close(){
    ligthContainer.classList.replace('d-flex','d-none')
}