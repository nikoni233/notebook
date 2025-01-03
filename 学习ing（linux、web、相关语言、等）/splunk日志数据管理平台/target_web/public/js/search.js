document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const filename = document.getElementById('filename').value;
    
    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filename: filename })
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('result').innerHTML = data;
    })
    .catch(error => {
        document.getElementById('result').innerHTML = 'Error occurred';
    });
});
