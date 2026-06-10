export const baseUrl = "http://localhost:5000/api";

export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body
    })

    const data = await response.json()
    if (!response.ok) {
        let message

        if (data?.message) {
            message = data.message;
        } else {
            message = data;
        }
        return {
            error: true, message
        };
    }
    return data;
};

export const getRequest = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            let message = "An error occurred...";

            try {
                const data = await response.json();
                if (data?.message) {
                    message = data.message;
                } else if (typeof data === "string") {
                    message = data;
                }
            } catch (error) {
                console.log('Error parsing JSON:', error);
            }

            return { error: true, message };
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Network or other error:', error);
        return { error: true, message: "Network error occurred. Please try again." };
    }
};
