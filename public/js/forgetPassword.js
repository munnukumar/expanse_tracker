
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('resetPasswordForm');
   
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        if (!password || !confirmPassword) {
            alert('Please fill the both password fields.');
        }
        if (password !== confirmPassword) {
            alert('Both passwords are not matched. Please try again.');
        } else {
            try {
               const response =  await fetch(window.location.pathname, {
                    method:'POST',
                    headers:{
                        'Content-Type' : 'application/json'
                    },

                    body: JSON.stringify({password}) 
                });
                if(response.ok){
                    alert('Password reset successful.');
                    window.location.reload();

                }
            }
            catch (err) {
                console.log(err);
            }
        }
    });
});