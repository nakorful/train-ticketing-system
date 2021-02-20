export const saveToken = (token) => {
    try{
        localStorage.setItem("t@k3n", token)
    }catch (e){
        console.log("Error saving token")
    }
}

export const getToken = () => {
    return localStorage.getItem("t@k3n");
}