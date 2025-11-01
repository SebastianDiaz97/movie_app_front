import { FormData } from "../types"

const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlenVxY2pjdm94eWloa2xkcWNhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTQzMTgxOCwiZXhwIjoyMDc1MDA3ODE4fQ.LgT6_eNREeUlwpD0u7sWQSvP7BjRdMQlRBOKwllTaas'

export const signUp = async (body: FormData) => {
    const url = 'https://tezuqcjcvoxyihkldqca.supabase.co/auth/v1/signup'
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "apikey": apikey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        return response
    } catch (error) {
        console.log(error);
    }
}

export const logIn = async (body: FormData) => {
    const url = 'https://tezuqcjcvoxyihkldqca.supabase.co/auth/v1/token?grant_type=password'
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "apikey": apikey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        return response.json()
    } catch (error) {
        console.log(error);

    }
}