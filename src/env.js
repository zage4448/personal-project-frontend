const env = {
    mode: process.env.NODE_ENV,
    api: {
        SPRING_API_URL: process.env.VUE_APP_SPRING_URL,
        FAST_API_URL: process.env.VUE_APP_FAST_API_URL,
        MAIN_AWS_BUCKET_NAME: process.env.MAIN_AWS_BUCKET_NAME,
        MAIN_AWS_BUCKET_REGION: process.env.MAIN_AWS_BUCKET_REGION,
        MAIN_AWS_BUCKET_IDENTITY_POOL_ID: process.env.MAIN_AWS_BUCKET_IDENTITY_POOL_ID
    },
};

export default env;