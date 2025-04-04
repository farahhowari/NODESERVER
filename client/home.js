

var API_URL="http://127.0.0.1:5050/api/users"
var token =sessionStorage.getItem('authToken')
if(!token){
    window.location.href='index.html'

}
async function update(id) {
   console.log(id) 
}
async function deleteUser(id) {
 var conf= confirm('Are your sure you want to delete this user ')
    console.log(conf) 
    var DELETE_URL='http://127.0.0.1:5050/api/deleteUser'

    if(conf){
var response=await fetch(DELETE_URL+"/"+id,{
    method:"DELETE",
    headers:{
        'content-Type':'application/json',
        'Auth':token
    },
}).then(res=>res.json())
.then(data=>{
    console.log(data)
    if(data.message=='User Deleted successfully'){
        alert('User Deleted successfully')
        window.location.reload()
    }
})
    }else{
     alert('user not found')
    }
 }

async function getUsers() {
    try{
        var response =await fetch(API_URL,{
            headers:{
                 'Content-Type':"application/json",
                 'Auth':token
            },
            method:"GET",
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            var tbody=document.getElementById('tbody')
            data.map(user=>{
                console.log(user)
               
                var tr=document.createElement('tr')
                var td1=document.createElement('td')
                td1.innerHTML=user.name
                tr.appendChild(td1)
                var td2=document.createElement('td')
               td2.innerHTML=user.role
               tr.appendChild(td2)
                var td3=document.createElement('td')
                td3.innerHTML=user.email
                var td4=document.createElement('td')
                var updateButton =document.createElement('button')
                updateButton.innerHTML="update"
                updateButton.onclick=()=>update(user._id)
                td4.appendChild(updateButton)


                var deleteButton =document.createElement('button')
                deleteButton.innerHTML="delete"
                deleteButton.onclick=()=>deleteUser(user._id)
                var td5 =document.createElement('td')
                td5.appendChild(deleteButton)
               tr.appendChild(td3)
               tr.appendChild(td4)
               tr.appendChild(td5)
               tbody.appendChild(tr)
            })
            if(data){
                alert('User logged in is sucsssfully')
                 
            }else{
                alert('User not allowed')
                window.location.href="index.html"
            }
        })
    }catch(erorr){
        console.log(erorr)
        alert('User not found ')
        window.location.href='index.html'
    }
    
}


getUsers()

