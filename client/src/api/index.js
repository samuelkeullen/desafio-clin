import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:3001'
});

/*
ROTAS DE BLOGS
*/
export const criarBlog = payload => api.post(`/criar-blog`, payload)
export const getFeed = () => api.get(`/feed`)
export const getBlog = payload => api.get(`/get-blog/${payload}`)
export const getComments = payload => api.get(`/get-comments/${payload}`)
export const sendComment = payload => api.post('/send-comment', payload)
export const likeTheBlog = payload => api.get(`/like-the-blog/${payload}`)

/*
ROTA DE USUÁRIOS
*/
export const perfil = payload => api.post('/perfil', payload)
export const login = payload => api.post('/login', payload)
export const registro = payload => api.post('/registro', payload)
export const esqueciSenha = payload => api.post('/esqueci-a-senha', payload)
export const recuperarSenha = payload => api.post('/mudar-senha', payload)

const apis = {
    perfil,
    criarBlog,
    getFeed,
    getBlog,
    getComments,
    sendComment,
    likeTheBlog,
    login,
    registro,
    esqueciSenha,
    recuperarSenha
}

export default apis