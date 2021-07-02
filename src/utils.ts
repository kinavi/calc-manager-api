export const getResponse = <T> (data?: T) => {
    return {
        status: 'ok',
        data,
    }
}

export const getResponseError = (message: string) => {
    return {
        status: 'error',
        message,
    }
}
