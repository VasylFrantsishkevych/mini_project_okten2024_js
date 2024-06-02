// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html,
// котра має детальну інфу про поточний пост.

let userId = new URL(location.href).searchParams.get('id');

function renderUserDetails(user) {
    const {address, company} = user;
    const {city, street, suite, zipcode, geo: {lat, lng}} = address;
    const {name, catchPhrase, bs} = company;
    let container = document.getElementsByClassName('container')[0];
    let userDetails = document.createElement('div');
    userDetails.className = 'user-details';
    for (const userKey in user) {
        if (userKey === 'address') {
            let detail = document.createElement('div');
            detail.className = 'user-detail';
            detail.innerHTML = `
                    <strong>${userKey}</strong>
                    <div>
                    <p>
                        <b>City</b>: ${city}, 
                        <b>Street:</b> ${street}, 
                        <b>Suite:</b> ${suite}, 
                        <b>Zipcode:</b> ${zipcode}
                    </p>
                    <p><b>Lat:</b> ${lat} <b>Lng:</b> ${lng}</p>
                    </div>
                `
            userDetails.appendChild(detail);

        } else if (userKey === 'company') {
            let detail = document.createElement('div');
            detail.className = 'user-detail';
            detail.innerHTML = `
                    <strong>${userKey}</strong>
                    <div>
                        <p><b>Name</b>: ${name},</p>
                        <p><b>Catch Phrase:</b> ${catchPhrase},</p>
                        <p><b>Bs:</b> ${bs}</p>
                    </div>
                `
            userDetails.appendChild(detail);
        } else {
            let detail = document.createElement('div');
            detail.className = 'user-detail';
            detail.innerHTML = `
                <strong>${userKey}</strong>
                <span>${user[userKey]}</span>
            `
            userDetails.appendChild(detail);
        }

    }
    container.append(userDetails);
}

function renderPostsOfUser(urlPosts, postContainer) {
    let titlePostList = document.createElement('h2');
    titlePostList.className = 'post-list-title';
    titlePostList.innerText = 'Posts Of User';

    let postList = document.createElement('div');
    postList.className = 'post-list';

    fetchData(urlPosts).then(posts => {
        posts.forEach(post => {
            let postCard = document.createElement('div');
            postCard.className = 'post-card';

            let titlePostH2 = document.createElement('h2');
            titlePostH2.innerText = `${post.title}`;

            postCard.append(titlePostH2);
            //button post details
            buttonCustom('_','Details Post', postCard,() => {
                window.location.href = '../postDetails/postDetails.html?data='+ JSON.stringify(post);
            })
            postList.appendChild(postCard);
        })

        postContainer.append(titlePostList, postList);
    })
}

let container = document.getElementsByClassName('container')[0];
fetchData(getUserById(userId)).then(user => {
// create user details part
    renderUserDetails(user);

// create post part
    let postContainer = document.getElementById('post-details-container');
    //button get thу posts of the current user
    buttonCustom('button-post', 'Post Of Current User', container, () => {
        if (postContainer.children.length === 0) {
            renderPostsOfUser(getPostsOfUser(userId), postContainer);
            setTimeout(() => {
                postContainer.scrollIntoView();
            }, 300)
        } else {
            postContainer.classList.toggle('post-container-close');
            postContainer.scrollIntoView();
        }
    })
    //button to go back through history
    buttonCustom('btn-back', 'Back', container, () => {
        window.history.back();
    })

    container.append(postContainer);
})