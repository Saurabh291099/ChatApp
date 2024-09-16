export const baseUrl = "http://localhost:3000/api";

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



// export const getRequest = async (url) => {

//     const response = await fetch(url)

//     console.log('response is:',response)

//     const data = await response.json()


//     if (!response.ok) {
//         let message = "An error Occured...."
//         if (data?.message) {
//             message = data.message;
//         }
//         return { error: true, message }
//     }
//     return data;

// };


// export const getRequest = async (url) => {
//     try {
//         const response = await fetch(url);

//         if (!response.ok) {
//             const data = await response.json();
//             let message = "An error occurred.";
//             if (data?.message) {
//                 message = data.message;
//             }
//             return { error: true, message };
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         return { error: true, message: error.message };
//     }
// };





export const getRequest = async () => {

    let url = "http://localhost:3000/api/users"
    try {
        const response = await fetch(url);
        console.log('response is:', response);

        // Check if the response has an OK status code
        if (!response.ok) {
            let message = "An error occurred...";

            // Try to parse JSON if possible
            try {
                const data = await response.json();
                if (data?.message) {
                    message = data.message;
                }
            } catch (error) {
                console.log('Error parsing JSON:', error);
            }

            return { error: true, message };
        }

        // Attempt to parse JSON response if status is OK
        const data = await response.json();
        return data;

    } catch (error) {
        // Catch network or fetch-related errors
        console.error('Network or other error:', error);
        return { error: true, message: "Network error occurred. Please try again." };
    }
};