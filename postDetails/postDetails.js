
// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста
// (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

let url = new URL(location.href);
let jsonPost = url.searchParams.get('data');
let post = JSON.parse(jsonPost);

let container = document.getElementsByClassName('container')[0];

function renderPostDetails(post) {
    let postDetails = document.createElement('div');
    postDetails.className = 'post-details';

    for (const postKey in post) {
        let detail = document.createElement('div');
        detail.className = 'post-detail';
        if (postKey === 'body') {
            detail.innerHTML = `
            <strong>${postKey}</strong>
            <div>
                <p>${post[postKey]}</p>
            </div>
        `
        } else {
            detail.innerHTML = `
            <strong>${postKey}</strong>
            <span>${post[postKey]}</span>
        `
        }

        postDetails.appendChild(detail);
    }
    container.appendChild(postDetails)
}

function renderCommentsOfPost(comments) {
    let titleBlockComments = document.createElement('h2');
    titleBlockComments.className = 'comment-list-title'
    titleBlockComments.innerText = 'Comments Of Post';
    let commentsList = document.createElement('div');
    commentsList.className = 'comment-list';

    comments.forEach(comment => {
        const {name, body, email} = comment;
        let commentCard = document.createElement('div');
        commentCard.className = 'comment-card';
        commentCard.innerHTML = `
                <div>
                    <h3>${name}</h3>
                    <p>${email}</p>
                </div>
                <p>${body}</p>
            `

        commentsList.appendChild(commentCard);
    })

    postComments.append(titleBlockComments, commentsList);
}

// create block about post details
renderPostDetails(post);
// create block comments
let postComments = document.createElement('div');
fetchData(getCommentsOfPost(post.id)).then(comments => {
    renderCommentsOfPost(comments);
})
//button to go back through history
buttonCustom('btn-back', 'Back', container, () => window.history.back());

container.append(postComments);
