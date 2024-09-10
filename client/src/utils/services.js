export const baseUrl = "http://localhost:3000/api"

export const postRequest = async (url, body) => {
    const resposne = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body
    })

    const data = await resposne.json()
    if (!resposne.ok) {
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

    const resposne = await fetch(url)


    const data = await resposne.json()

    if (!resposne.ok) {
        let message = "An error Occured...."
        if (data?.message) {
            message = data.message;
        }
        return { error: true, message }
    }
    return data;

};