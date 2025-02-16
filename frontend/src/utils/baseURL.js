const getBaseUrl = () => {
    if (process.env.NODE_ENV === "production") {
        return "https://book-store-2-server.vercel.app"; // Replace with your actual Vercel deployment URL
    }
    return "http://localhost:5000";
};

export default getBaseUrl;