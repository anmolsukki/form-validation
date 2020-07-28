import axios from 'axios';

export const RsApi = {
    get: async (params) => {
        console.log("====params==", params)
        return executeApiRequest(async () => {
            return await axios.get(params.path)
        });
    },
};

async function executeApiRequest(func) {
    try {
        return await func();
    }
    catch (error) {
        throw error;
    }
}
