

const deleteLinks = document.querySelectorAll('.delete-link')

deleteLinks.forEach( (el) => 
    el.addEventListener("click", (event)=>{

        if(confirm('Are you sure?')){
           
            fetch('/admin-secret-key/delete-article',{
            method: 'delete',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                id: event.currentTarget.parentNode.id,
                category: event.currentTarget.id
            })
        })
        .then( (resp) => {
            if(resp.ok) return resp.json()
        })
        .then( (response) => {
            if(response ==='Success'){
                el.parentElement.remove()
                messageDiv.textContent = 'Article was deleted'
                setTimeout(() => {
                    messageDiv.textContent = ''
                },2000)
            }else{
                messageDiv.textContent = 'Article was not deleted'
            }
        })
        .catch((error)=>console.log(error))
        }
    })
)