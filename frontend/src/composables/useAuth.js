import { ref, computed, onMounted } from 'vue'
import Cookies from 'js-cookie'
const isAuthenticated = ()=>{
    //cookies are not reactive so need to use a function
    //this is a very simplified version of a check that would need to be done
    const token = Cookies.get('jwtToken')
    return !!token
}
//for prototype only, the request to the server would store a cookie in the clients browser.
const bearerToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
function getToken() {
    //simulate token retrieval this should be an httpOnly cookie set from the server
    let expiration = new Date(new Date().getTime() + 30 * 60 * 1000) //expire in 30min
    Cookies.set('jwtToken', bearerToken, {
        expires: expiration
    })
}
function removeCookie() {
    //simulate cookie getting invalidated
    Cookies.remove('jwtToken')
}
function logout() {
    window.alert('logging out!')
    removeCookie()
}
export { getToken, logout, isAuthenticated }
