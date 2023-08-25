export interface TMockParams {
    url: string
    type: string
    data?: any
    params?: any
    response(option?: any): Record<string, unknown>
}

export interface TMockResult {
    [x: string]: any
}
