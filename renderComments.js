const renderComments = (element, userArray, like, copy) => {

    const usersHtml = userArray.map((user, index) => {

        return `<li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${user.name}</div>
            <div>${user.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${user.comment}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${user.likes}</span>
              <button id="button-user-like" class="${user.classLike}" data-index="${index}"></button>
            </div>
          </div>
        </li>`;
      })
      .join("");
    
    element.innerHTML = usersHtml;
      
    like();
    copy();

}

export default renderComments;