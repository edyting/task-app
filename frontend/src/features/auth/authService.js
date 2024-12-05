import axios from 'axios';
API_URL="/api/users"


const register = async (userdata)=>{
    
    const response = await axios.post(API_URL,userdata);

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data));
    }
    return response.data;
}


const authService = {register};
export default authService;