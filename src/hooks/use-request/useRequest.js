import axiosConfigured from "../../config/axiosConfigured";

const useRequest = endpoint => {

    const get = async () => await axiosConfigured.get(endpoint);
    const post = async body => await axiosConfigured.post(endpoint, body);
    const put = async body => await axiosConfigured.put(endpoint, body);

    return {
        get,
        post,
        put,
    }
};
export default useRequest;
