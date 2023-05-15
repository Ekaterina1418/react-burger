import {BASE_URL} from "./data";
import {IResetPassword, IResponseReset, ResponseToken} from "./types";

export const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

const refreshToken = async () => {
    const res = await fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });

    return checkResponse<ResponseToken>(res);
};

export const fetchWithRefresh = async <T>(url: string, options: RequestInit): Promise<T> => {
    try {
        const res = await fetch(url, options)
        return await checkResponse(res)
    } catch (err) {
        if ((err as { message: string }).message === 'jwt expired') {
            const refreshData = await refreshToken()
            if (!refreshData.success) {
                return Promise.reject(refreshData)
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            localStorage.setItem('accessToken', refreshData.accessToken);

            if (options.headers) {
                (options.headers as { [key: string]: string }).authorization = refreshData.accessToken;
            }

            const res = await fetch(url, options)
            return await checkResponse<T>(res)
        } else {
            return Promise.reject(err)
        }
    }
}

export const resetPassword = (form: IResetPassword) => {
    return fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form),
    })
        .then(checkResponse<IResponseReset>)
        .then((data) => {
            if (data.success) return data;
            return Promise.reject(data);
        });
}

export const forgotPassword = (email: string) => {
    return fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({email: email}),
    })
        .then(checkResponse<{ success: boolean }>)
        .then((data) => {
            if (data.success) return data;
            return Promise.reject(data);
        });
}