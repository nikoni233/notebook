// 获取并显示所有评论
function loadComments() {
    fetch('/comments')
        .then(response => response.json())
        .then(comments => {
            const commentsList = document.getElementById('comments-list');
            commentsList.innerHTML = '';  // 清空现有评论
            comments.forEach(({ comment, timestamp }) => {
                const li = document.createElement('li');
                li.innerHTML = `[${timestamp}] ${comment}`;  // 使用 innerHTML 来插入评论内容
                commentsList.appendChild(li);
            });
        });
}

// 提交评论
function postComment(event) {
    event.preventDefault();  // 防止表单刷新页面

    const commentInput = document.getElementById('comment-input');
    const comment = commentInput.value.trim();
    if (comment) {
        // 提交评论到服务器
        fetch('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment })
        })
        .then(response => response.json())
        .then(() => {
            // 清空输入框
            commentInput.value = '';
            // 重新加载评论
            loadComments();

            // 额外发送最新评论到 /content
            fetch('/comments/content', {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                // 将最新评论显示在页面上
                const contentDisplay = document.getElementById('latest-content');
                contentDisplay.innerHTML = `Latest Comment: ${data.content}`;
            });
        });
    }
}

// 重置评论
function resetComments() {
    fetch('/comments/reset', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        // 重新加载评论并更新最新评论
        loadComments();

        // 显示当前的最新评论
        const contentDisplay = document.getElementById('latest-content');
        contentDisplay.innerHTML = `Latest Comment: ${data[0].comment}`;  // 默认的第一条评论
    });
}

// 跳转到 /comments/content 页面
function jumpToContent() {
    window.location.href = '/comments/content';
}

// 页面加载时显示评论
window.onload = loadComments;
