const baseURL = 'https://jsonplaceholder.typicode.com';

const getUsers = `${baseURL}/users`;
const getUserById = (userId) => {
    return `${getUsers}/${userId}`
}
const getPostsOfUser = (userId) => {
    return `${getUsers}/${userId}/posts`
}
const getCommentsOfPost = (postId) => {
    return `${baseURL}/posts/${postId}/comments`;
}

async function fetchData (url) {
    try {
        return await fetch(url).then(res => res.json())
    } catch (err) {
        console.log('Fetch error', err)
    }
}