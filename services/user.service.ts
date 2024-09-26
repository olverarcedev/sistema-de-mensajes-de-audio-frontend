export const verifyToken = async () => {
    const response = await fetch("http://localhost:3000/auth/verify-token", {
        credentials: "include"
    }
    );
    if (!response.ok) {
        return null;
    }
    const user: User = await response.json();
    return user;
};