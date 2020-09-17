import axios from "../../config/axios";

const useRequest = endpoint => {

    const get = async () => await axios.get(endpoint);
    const post = async body => await axios.post(endpoint, body);
    const put = async body => await axios.put(endpoint, body);
    const remove = async () => await axios.put(endpoint);

    return {
        get,
        post,
        put,
        remove,
    }
};
export default useRequest;
