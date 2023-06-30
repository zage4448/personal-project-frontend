import axios from "axios";
import env from "@/env";

const axiosInst = axios.create({
    baseURL: env.api.SPRING_API_URL,
    timeout: 2500
})

const springAxiosInst = axiosInst

const fastApiAxiosInst = axios.create({
    baseURL: env.api.FAST_API_URL,
    timeout: 2500
})

export default { axiosInst, springAxiosInst, fastApiAxiosInst }