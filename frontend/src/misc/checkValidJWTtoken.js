const checkValidJWTtoken = async (jwt) => {
    try {
        const apiUrl = import.meta.env.VITE_API_URL || "/api";
        const res = await fetch(`${apiUrl}/users/checkJWT`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        
        return !!res.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export default checkValidJWTtoken;