export default () => {

    const logout = async () => {

        const jwt = await cookieStore.get("jwt");

        if(!jwt){
            location.href = "/login";
            return;
        }
        
        const apiUrl = import.meta.env.VITE_API_URL || "/api";

        fetch(`${apiUrl}/users/logoutUser`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({jwt: jwt.value}),
        });

        await cookieStore.delete("jwt");
        location.href = "/login";
    }

    return (
        <>
            <button className="btn bg-danger"onClick={logout}>Wyloguj</button>
        </>
    )
}