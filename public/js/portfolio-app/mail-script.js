const sendMessageButton = document.querySelector('#send_message_button')
const messageDiv  = document.querySelector('.info')
const contactForm = document.querySelector('#contactForm')


sendMessageButton.addEventListener('click', () =>{

        const email_field = contactForm.elements.namedItem('email')
        const name_field = contactForm.elements.namedItem('name')
        const subject_field = contactForm.elements.namedItem('subject')
        const message_field = contactForm.elements.namedItem('message')
        
        
        if(!email_field.checkValidity) return
        
        messageDiv.textContent = 'Sending a message. Please wait ...';

     /*   new Promise( (resolve) => {
           
           setTimeout(()=>{
            resolve()
           }, 1500)
            
        }).then(  ()=> {
            
        })*/

      /*  (async () => {
          await new Promise( (resolve) => setTimeout(resolve,1000) )
            messageDiv.textContent = 'Message has been sent'
        })()
*/

        fetch('email/send',{    //do tego trzeba zdefiniować ścieżkę
            method: 'post',       //routes/email  
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify({
                email: email_field.value,
                message: message_field.value,
                name: name_field.value,
                subject: subject.value
            })
        })
        .then((res) => {
            if(res.ok) return res.json()
        })
        .then((response) =>{
            if(response === 'Success') {
                messageDiv.textContent = 'Message has been sent'
               // ;setTimeout(()=>{messageDiv.textContent = '' },2000)
              ;(async () => {
                await new Promise( (resolve) => setTimeout(resolve,1000) )
                messageDiv.textContent = ''
              })()
            }else{
                messageDiv.textContent = 'There was a problem with sending your message'
                ;(async () => {
                    await new Promise( (resolve) => setTimeout(resolve,1000) )
                    messageDiv.textContent = ''
                  })()
            }
        })
        .catch( (error) => console.log(error))

     
})