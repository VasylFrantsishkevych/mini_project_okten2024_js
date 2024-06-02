function buttonCustom (className, name, container, callback) {
    let button = document.createElement('button');
    button.classList.add('btn', className);
    button.innerText = name;
    button.addEventListener('click', callback)
    container.append(button);
}