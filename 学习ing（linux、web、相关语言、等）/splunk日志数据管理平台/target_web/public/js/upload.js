document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();  // 阻止表单的默认提交行为

    const formData = new FormData(this);

    // 使用 AJAX 上传文件
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // 上传成功后的提示框
            alert('Upload Successful!');
            
            // 显示文件名和上传成功的信息
            document.getElementById('uploadResult').style.display = 'block';
            document.getElementById('uploadMessage').textContent = `${data.fileName} uploaded successfully!`;
        } else {
            alert('Upload failed: ' + data.message); // 显示上传失败的具体信息
        }
    })
    .catch(error => {
        alert('An error occurred during upload.');
        console.error('Error:', error);
    });
});
