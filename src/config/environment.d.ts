declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            BUCKET: string;
            API_KEY: string;
        }
    }
}

export default global;