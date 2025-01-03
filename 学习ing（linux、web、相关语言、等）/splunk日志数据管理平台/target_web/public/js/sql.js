function sql_func(){
    var username = document.getElementById('input2').value;
    var password = document.getElementById('input3').value;
    console.log('Username:', username);
    console.log('Password:', password);
    fetch('login', {
        headers: {
            "content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ username, password }),
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message); // 显示登录成功或失败的消息
        if (data.userInfo) { // 如果有用户信息，显示在页面上
            const userInfoDiv = document.getElementById('userInfo');
            // 将用户信息转化为字符串
            userInfoDiv.innerHTML = `用户信息: ${JSON.stringify(data.userInfo)}`;
        }
    });
}