import axiosModule, { AxiosError, AxiosInstance } from "axios";
import { Content, ContentOptions, ContentQueryOptions, Space } from "./types";

const apiUrl: string = "https://api.cms.codetum.com";

class CodetumCMS {
    private axios: AxiosInstance;

    constructor(spaceId: string, apiKey: string) {
        this.axios = axiosModule.create({
            baseURL: `${apiUrl}/spaces/${spaceId}`,
            headers: {
                "x-api-key": apiKey,
            },
        });
    }

    // Function for making requests to the API
    private async request<T>(
        url: string,
        options?: ContentOptions
    ): Promise<T> {
        try {
            const { data } = await this.axios.get(url, { params: options });

            return data;
        } catch (err) {
            const error = err as AxiosError;

            if (!error.response) {
                throw {
                    status: 500,
                    name: "unknownError",
                    message:
                        "Unknown error occurred. This is probably an issue with the API itself.",
                };
            } else {
                const { status, data } = error.response;

                throw {
                    status,
                    name: data.name,
                    message: data.message,
                };
            }
        }
    }

    /**
     * Get space information
     * @returns Promise<Space>
     */
    public async getSpace(): Promise<Space> {
        return await this.request<Space>("/");
    }

    /**
     * Get single or collection type content by content ID
     * @param id Content ID
     * @param options
     * @returns Promise<Content>
     */
    public async findById(
        id: string,
        options?: ContentOptions
    ): Promise<Content> {
        return await this.request<Content>(`/content/${id}`, options);
    }

    /**
     * Get single type content by content type slug
     * @param slug Content type slug
     * @param options
     * @returns Promise<Content>
     */
    public async findOne(
        slug: string,
        options?: ContentOptions
    ): Promise<Content> {
        return await this.request<Content>(`/single-type/${slug}`, options);
    }

    /**
     * Get collection type contents by content type slug
     * @param slug Content type slug
     * @param options
     * @returns Promise<Content[]>
     */
    public async findMany(
        slug: string,
        options?: ContentQueryOptions
    ): Promise<Content[]> {
        return await this.request(`/collection-type/${slug}`, options);
    }
}

export default CodetumCMS;
