document.addEventListener('DOMContentLoaded', () => {
  const shortenForm = document.getElementById('shorten-form');
  const urlInput = document.getElementById('url-input');
  const aliasInput = document.getElementById('alias-input');
  const shortenedUrlDiv = document.getElementById('shortened-url');

  const retrieveForm = document.getElementById('retrieve-form');
  const retrieveInput = document.getElementById('retrieve-input');
  const originalUrlDiv = document.getElementById('original-url');

  const topAccessedList = document.getElementById('top-accessed');

  shortenForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = urlInput.value;
    const customAlias = aliasInput.value;
    const data = customAlias ? { URL: url, CUSTOM_ALIAS: customAlias } : { URL: url };

    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log('Parsed JSON:', result);

      if (result.ERR_CODE) {
        shortenedUrlDiv.textContent = `Error: ${result.Description}`;
      } else if (Array.isArray(result) && result.length > 0 && result[0].url) {
        shortenedUrlDiv.textContent = `Shortened URL: ${result[0].url}`;
      } else if (result.url) {
        shortenedUrlDiv.textContent = `Shortened URL: ${result.url}`;
      } else {
        console.error('Unexpected response format:', result);
        shortenedUrlDiv.textContent = 'Error shortening URL: Unexpected response format';
      }

      urlInput.value = '';
      aliasInput.value = '';
      loadTopAccessed();
    } catch (error) {
      console.error('Error:', error);
      shortenedUrlDiv.textContent = 'Error shortening URL';
    }
  });

  retrieveForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const alias = retrieveInput.value;

    try {
      const response = await fetch(`http://localhost:3000/u/${alias}`, {
        method: 'GET'
      });

      if (response.ok && response.redirected) {
        // Redirecionar no frontend
        window.location.href = response.url;
      } else if (!response.ok) {
        const result = await response.json();
        originalUrlDiv.textContent = result.Description || 'Error retrieving URL';
      }

      retrieveInput.value = '';
    } catch (error) {
      console.error('Error:', error);
      originalUrlDiv.textContent = 'Error retrieving URL';
    }
  });

  async function loadTopAccessed() {
    try {
      const response = await fetch('http://localhost:3000/top-accessed');
      const topUrls = await response.json();
      topAccessedList.innerHTML = '';
      topUrls.forEach(url => {
        const listItem = document.createElement('li');
        listItem.textContent = `${url.shortened_url} (Accessed: ${url.access_count} times)`;
        topAccessedList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error:', error);
      topAccessedList.innerHTML = 'Error loading top accessed URLs';
    }
  }

  loadTopAccessed();
});
