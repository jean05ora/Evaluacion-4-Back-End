// ----- ENDPOINTS -----
const productosURL = "http://localhost:8000/api/productos/" // En este debe traer a todos los productos pero necesita de un token JWT
const jwt = "http://localhost:8000/api/token/" // Endpoint para obtener el token jwt


// ----- CONSTANTES -----
const form = document.querySelector('#tokenForm')


/**
 * Obtiene el Token JWT y lo guarda automaticamente en el Local Storage
 */
async function getJWT(username,pwd){
    const response = await fetch(jwt, {
        method : 'POST',
        headers :{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            'username':username,
            'password':pwd
        })
    })
    
    if (!response.ok) {
        console.log("Error al traer el token",response.status)
        if (response.status == 401){
            window.alert("Credenciales invalidas")
        }
        throw new Error("Error al traer el token",response.status)
    }
    const data = await response.json()

    if (!data.access) {
        throw new Error("Respuesta inválida: no viene 'access'")
    }
    return data

}



/**
 * Obtiene todas los productos de la Base de Datos
 * **Necesita de un token para poder funcionar**
 */
async function getProductos() {
    try{
        const token = localStorage.getItem('jwtToken')
        if (token == null){
            window.alert("Necesita de un token primero")
            return
        }

        const response = await fetch(productosURL,{
            method : 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        
        const data = await response.json()
        const area = document.querySelector("#respuesta")
        area.textContent = ""
        area.textContent = JSON.stringify(data,null,2)
    }
    catch(error){
        console.log(error)
        throw new Error(`Error al obtener todas las personas ${error}`)
    }
}


/**
 * Maneja el formulario para consultar el token
 * En caso de estar todo ok, guarda el token en localStorage
 */
form.addEventListener('submit', async function(event){
    event.preventDefault()
    const username = document.querySelector("#username").value
    const pwd = document.querySelector("#password_field").value
    try{
        
        const token = await getJWT(username,pwd)
        localStorage.setItem('jwtToken',token.access) 
        window.alert("Token obtenido y guardado!")
        form.reset()


    }
    catch (error){
        console.log(error)
        throw new Error(`Error al obtener el token ${error}`)
    }

} )
